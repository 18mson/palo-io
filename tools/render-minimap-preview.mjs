#!/usr/bin/env node
/**
 * tools/render-minimap-preview.mjs
 *
 * Generates high-fidelity visual preview renders of:
 *  1. docs/captures/minimap_radar_preview.png (HUD Minimap Radar View)
 *  2. docs/captures/tactical_map_preview.png (Full Tactical Map Modal View)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import zlib from 'zlib'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const topdownPath = path.join(rootDir, 'public/docs/reference/topdown.png')
const ascentPath = path.join(rootDir, 'src/map/maps/ascent.json')

const ascentData = JSON.parse(fs.readFileSync(ascentPath, 'utf8'))
const zones = ascentData.zones || []

// ── Minimal PNG Decoder / Encoder ─────────────────────────
function decodePNG(filePath) {
  const fileBuf = fs.readFileSync(filePath)
  let pos = 8
  let width, height, bitDepth, colorType
  const idatParts = []
  while (pos < fileBuf.length) {
    const len = fileBuf.readUInt32BE(pos)
    const type = fileBuf.toString('ascii', pos + 4, pos + 8)
    const data = fileBuf.subarray(pos + 8, pos + 8 + len)
    if (type === 'IHDR') {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
      bitDepth = data[8]
      colorType = data[9]
    } else if (type === 'IDAT') {
      idatParts.push(data)
    }
    pos += 12 + len
  }
  const decompressed = zlib.inflateSync(Buffer.concat(idatParts))
  const bpp = colorType === 6 ? 4 : (colorType === 2 ? 3 : 1)
  const stride = width * bpp
  const out = Buffer.alloc(width * height * 4)
  let srcPos = 0

  function paeth(a, b, c) {
    const p = a + b - c
    const pa = Math.abs(p - a)
    const pb = Math.abs(p - b)
    const pc = Math.abs(p - c)
    if (pa <= pb && pa <= pc) return a
    if (pb <= pc) return b
    return c
  }

  const prevRow = Buffer.alloc(stride)
  const currRow = Buffer.alloc(stride)

  for (let y = 0; y < height; y++) {
    const filter = decompressed[srcPos++]
    decompressed.copy(currRow, 0, srcPos, srcPos + stride)
    srcPos += stride

    for (let i = 0; i < stride; i++) {
      const left = i >= bpp ? currRow[i - bpp] : 0
      const up = prevRow[i]
      const upLeft = i >= bpp ? prevRow[i - bpp] : 0
      if (filter === 1) currRow[i] = (currRow[i] + left) & 0xff
      else if (filter === 2) currRow[i] = (currRow[i] + up) & 0xff
      else if (filter === 3) currRow[i] = (currRow[i] + Math.floor((left + up) / 2)) & 0xff
      else if (filter === 4) currRow[i] = (currRow[i] + paeth(left, up, upLeft)) & 0xff
    }

    for (let x = 0; x < width; x++) {
      const dstIdx = (y * width + x) * 4
      if (colorType === 6) {
        out[dstIdx] = currRow[x * 4]
        out[dstIdx + 1] = currRow[x * 4 + 1]
        out[dstIdx + 2] = currRow[x * 4 + 2]
        out[dstIdx + 3] = currRow[x * 4 + 3]
      } else if (colorType === 2) {
        out[dstIdx] = currRow[x * 3]
        out[dstIdx + 1] = currRow[x * 3 + 1]
        out[dstIdx + 2] = currRow[x * 3 + 2]
        out[dstIdx + 3] = 255
      } else {
        const v = currRow[x]
        out[dstIdx] = v; out[dstIdx + 1] = v; out[dstIdx + 2] = v; out[dstIdx + 3] = 255
      }
    }
    currRow.copy(prevRow)
  }
  return { width, height, data: out }
}

function encodePNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  const crcTable = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1)
      else c = c >>> 1
    }
    crcTable[n] = c
  }
  function updateCRC(crc, b) {
    let c = crc ^ -1
    for (let i = 0; i < b.length; i++) {
      c = crcTable[(c ^ b[i]) & 0xff] ^ (c >>> 8)
    }
    return (c ^ -1) >>> 0
  }
  function makeChunk(type, data) {
    const typeBuf = Buffer.from(type, 'ascii')
    const lenBuf = Buffer.alloc(4)
    lenBuf.writeUInt32BE(data.length, 0)
    const crcBuf = Buffer.alloc(4)
    let crc = updateCRC(0, typeBuf)
    crc = updateCRC(crc, data)
    crcBuf.writeUInt32BE(crc, 0)
    return Buffer.concat([lenBuf, typeBuf, data, crcBuf])
  }

  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(width, 0)
  ihdrData.writeUInt32BE(height, 4)
  ihdrData[8] = 8
  ihdrData[9] = 6 // RGBA
  ihdrData[10] = 0; ihdrData[11] = 0; ihdrData[12] = 0
  const ihdrChunk = makeChunk('IHDR', ihdrData)

  const scanlines = Buffer.alloc((width * 4 + 1) * height)
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (width * 4 + 1)
    scanlines[rowOffset] = 0
    rgbaBuffer.copy(scanlines, rowOffset + 1, y * width * 4, (y + 1) * width * 4)
  }

  const compressed = zlib.deflateSync(scanlines, { level: 6 })
  const idatChunk = makeChunk('IDAT', compressed)
  const iendChunk = makeChunk('IEND', Buffer.alloc(0))
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk])
}

// ── Drawing Primitives ────────────────────────────────────
function createBuffer(w, h, fill = [0, 0, 0, 255]) {
  const buf = Buffer.alloc(w * h * 4)
  for (let i = 0; i < w * h; i++) {
    buf[i * 4]     = fill[0]
    buf[i * 4 + 1] = fill[1]
    buf[i * 4 + 2] = fill[2]
    buf[i * 4 + 3] = fill[3]
  }
  return buf
}

function setPixel(buf, w, h, x, y, r, g, b, a = 255) {
  x = Math.round(x); y = Math.round(y)
  if (x < 0 || x >= w || y < 0 || y >= h) return
  const idx = (y * w + x) * 4
  if (a >= 255) {
    buf[idx] = r; buf[idx + 1] = g; buf[idx + 2] = b; buf[idx + 3] = 255
  } else {
    const na = a / 255
    const oa = (1 - na)
    buf[idx] = Math.round(r * na + buf[idx] * oa)
    buf[idx + 1] = Math.round(g * na + buf[idx + 1] * oa)
    buf[idx + 2] = Math.round(b * na + buf[idx + 2] * oa)
    buf[idx + 3] = 255
  }
}

function fillRect(buf, w, h, x, y, rw, rh, r, g, b, a = 255) {
  const x0 = Math.max(0, Math.floor(x))
  const y0 = Math.max(0, Math.floor(y))
  const x1 = Math.min(w, Math.ceil(x + rw))
  const y1 = Math.min(h, Math.ceil(y + rh))
  for (let cy = y0; cy < y1; cy++) {
    for (let cx = x0; cx < x1; cx++) {
      setPixel(buf, w, h, cx, cy, r, g, b, a)
    }
  }
}

function strokeRect(buf, w, h, x, y, rw, rh, thickness, r, g, b, a = 255) {
  fillRect(buf, w, h, x, y, rw, thickness, r, g, b, a)
  fillRect(buf, w, h, x, y + rh - thickness, rw, thickness, r, g, b, a)
  fillRect(buf, w, h, x, y, thickness, rh, r, g, b, a)
  fillRect(buf, w, h, x + rw - thickness, y, thickness, rh, r, g, b, a)
}

function drawCircle(buf, w, h, cx, cy, radius, r, g, b, a = 255) {
  const x0 = Math.max(0, Math.floor(cx - radius))
  const x1 = Math.min(w, Math.ceil(cx + radius))
  const y0 = Math.max(0, Math.floor(cy - radius))
  const y1 = Math.min(h, Math.ceil(cy + radius))
  const r2 = radius * radius
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const d2 = (x - cx) * (x - cx) + (y - cy) * (y - cy)
      if (d2 <= r2) {
        setPixel(buf, w, h, x, y, r, g, b, a)
      }
    }
  }
}

function strokeCircle(buf, w, h, cx, cy, radius, thickness, r, g, b, a = 255) {
  const x0 = Math.max(0, Math.floor(cx - radius - thickness))
  const x1 = Math.min(w, Math.ceil(cx + radius + thickness))
  const y0 = Math.max(0, Math.floor(cy - radius - thickness))
  const y1 = Math.min(h, Math.ceil(cy + radius + thickness))
  const inner2 = (radius - thickness) * (radius - thickness)
  const outer2 = (radius + thickness) * (radius + thickness)
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const d2 = (x - cx) * (x - cx) + (y - cy) * (y - cy)
      if (d2 >= inner2 && d2 <= outer2) {
        setPixel(buf, w, h, x, y, r, g, b, a)
      }
    }
  }
}

function drawLine(buf, w, h, x0, y0, x1, y1, r, g, b, a = 255, thickness = 1) {
  const dx = Math.abs(x1 - x0)
  const dy = Math.abs(y1 - y0)
  const steps = Math.max(dx, dy, 1)
  const xInc = (x1 - x0) / steps
  const yInc = (y1 - y0) / steps
  let cx = x0
  let cy = y0
  for (let i = 0; i <= steps; i++) {
    if (thickness <= 1) {
      setPixel(buf, w, h, cx, cy, r, g, b, a)
    } else {
      drawCircle(buf, w, h, cx, cy, thickness / 2, r, g, b, a)
    }
    cx += xInc
    cy += yInc
  }
}

// ── Text Font ─────────────────────────────────────────────
const BITMAPS = {
  'A': ['..#..', '.#.#.', '#...#', '#####', '#...#', '#...#', '#...#'],
  'B': ['####.', '#...#', '####.', '#...#', '####.', '.....', '.....'],
  'C': ['.####', '#....', '#....', '#....', '.####', '.....', '.....'],
  'D': ['####.', '#...#', '#...#', '#...#', '####.', '.....', '.....'],
  'E': ['#####', '#....', '####.', '#....', '#####', '.....', '.....'],
  'F': ['#####', '#....', '####.', '#....', '#....', '.....', '.....'],
  'G': ['.####', '#....', '#.###', '#...#', '.####', '.....', '.....'],
  'H': ['#...#', '#...#', '#####', '#...#', '#...#', '.....', '.....'],
  'I': ['#####', '..#..', '..#..', '..#..', '#####', '.....', '.....'],
  'J': ['...##', '....#', '....#', '#...#', '.###.', '.....', '.....'],
  'K': ['#...#', '#..#.', '###..', '#..#.', '#...#', '.....', '.....'],
  'L': ['#....', '#....', '#....', '#....', '#####', '.....', '.....'],
  'M': ['#...#', '##.##', '#.#.#', '#...#', '#...#', '.....', '.....'],
  'N': ['#...#', '##..#', '#.#.#', '#..##', '#...#', '.....', '.....'],
  'O': ['.###.', '#...#', '#...#', '#...#', '.###.', '.....', '.....'],
  'P': ['####.', '#...#', '####.', '#....', '#....', '.....', '.....'],
  'Q': ['.###.', '#...#', '#.#.#', '#..#.', '.##.#', '.....', '.....'],
  'R': ['####.', '#...#', '####.', '#..#.', '#...#', '.....', '.....'],
  'S': ['.####', '#....', '.###.', '....#', '####.', '.....', '.....'],
  'T': ['#####', '..#..', '..#..', '..#..', '..#..', '.....', '.....'],
  'U': ['#...#', '#...#', '#...#', '#...#', '.###.', '.....', '.....'],
  'V': ['#...#', '#...#', '#...#', '.#.#.', '..#..', '.....', '.....'],
  'W': ['#...#', '#...#', '#.#.#', '##.##', '#...#', '.....', '.....'],
  'X': ['#...#', '.#.#.', '..#..', '.#.#.', '#...#', '.....', '.....'],
  'Y': ['#...#', '.#.#.', '..#..', '..#..', '..#..', '.....', '.....'],
  'Z': ['#####', '...#.', '..#..', '.#...', '#####', '.....', '.....'],
  '0': ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
  '1': ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  '2': ['.###.', '#...#', '....#', '..##.', '.#...', '#....', '#####'],
  '3': ['####.', '....#', '..##.', '....#', '####.', '.....', '.....'],
  '4': ['#...#', '#...#', '#####', '....#', '....#', '.....', '.....'],
  '5': ['#####', '#....', '####.', '....#', '####.', '.....', '.....'],
  '6': ['.###.', '#....', '####.', '#...#', '.###.', '.....', '.....'],
  '7': ['#####', '....#', '...#.', '..#..', '..#..', '.....', '.....'],
  '8': ['.###.', '#...#', '.###.', '#...#', '.###.', '.....', '.....'],
  '9': ['.###.', '#...#', '.####', '....#', '.###.', '.....', '.....'],
  '-': ['.....', '.....', '#####', '.....', '.....', '.....', '.....'],
  '+': ['.....', '..#..', '.###.', '..#..', '.....', '.....', '.....'],
  ':': ['.....', '..#..', '.....', '..#..', '.....', '.....', '.....'],
  '.': ['.....', '.....', '.....', '.....', '..#..', '.....', '.....'],
  '[': ['..###', '..#..', '..#..', '..#..', '..###', '.....', '.....'],
  ']': ['###..', '..#..', '..#..', '..#..', '###..', '.....', '.....'],
  '(': ['..#..', '.#...', '.#...', '.#...', '..#..', '.....', '.....'],
  ')': ['..#..', '...#.', '...#.', '...#.', '..#..', '.....', '.....'],
  '/': ['....#', '...#.', '..#..', '.#...', '#....', '.....', '.....'],
  ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....']
}

function drawString(buf, w, h, str, startX, startY, scale, r, g, b, a = 255) {
  let cx = startX
  for (let i = 0; i < str.length; i++) {
    const ch = str[i].toUpperCase()
    const map = BITMAPS[ch] || BITMAPS[' ']
    for (let row = 0; row < 7; row++) {
      const rStr = map[row]
      for (let col = 0; col < 5; col++) {
        if (rStr[col] === '#') {
          fillRect(buf, w, h, cx + col * scale, startY + row * scale, scale, scale, r, g, b, a)
        }
      }
    }
    cx += 6 * scale
  }
}

// ── 1. Render HUD Minimap Radar View ───────────────────────
console.log('Loading blueprint image for minimap previews...')
const topdownImg = decodePNG(topdownPath)
console.log(`Blueprint decoded: ${topdownImg.width} x ${topdownImg.height}`)

console.log('Generating HUD Minimap Radar Preview...')
const radarW = 440
const radarH = 460
const radarBuf = createBuffer(radarW, radarH, [8, 14, 22, 255])

// Header bar
fillRect(radarBuf, radarW, radarH, 20, 16, 260, 28, 15, 25, 38, 240)
strokeRect(radarBuf, radarW, radarH, 20, 16, 260, 28, 1, 0, 240, 255, 120)
drawString(radarBuf, radarW, radarH, 'MID COURTYARD', 32, 22, 2, 0, 240, 255)

// Control buttons
fillRect(radarBuf, radarW, radarH, 290, 16, 32, 28, 15, 25, 38, 240)
strokeRect(radarBuf, radarW, radarH, 290, 16, 32, 28, 1, 0, 240, 255, 100)
drawString(radarBuf, radarW, radarH, 'N', 302, 22, 2, 255, 255, 255)

fillRect(radarBuf, radarW, radarH, 330, 16, 40, 28, 15, 25, 38, 240)
strokeRect(radarBuf, radarW, radarH, 330, 16, 40, 28, 1, 0, 240, 255, 100)
drawString(radarBuf, radarW, radarH, '1.4X', 335, 22, 1, 200, 220, 240)

fillRect(radarBuf, radarW, radarH, 380, 16, 36, 28, 15, 25, 38, 240)
strokeRect(radarBuf, radarW, radarH, 380, 16, 36, 28, 1, 0, 240, 255, 100)
drawString(radarBuf, radarW, radarH, '[M]', 386, 22, 1, 0, 240, 255)

// Radar Circle Area
const rcx = 220
const rcy = 250
const rRad = 180

// Fill radar inner background
drawCircle(radarBuf, radarW, radarH, rcx, rcy, rRad, 10, 18, 26, 255)

// Sample blueprint into radar circle (player at Mid: x=3.0, z=-2.0, yaw=0.2 rad)
const px = 3.0
const pz = -2.0
const pyaw = 0.35 // facing slightly towards A site
const rScale = 6.2 // px/meter in retina 400x400

for (let y = rcy - rRad; y <= rcy + rRad; y++) {
  for (let x = rcx - rRad; x <= rcx + rRad; x++) {
    const rx = x - rcx
    const ry = y - rcy
    const d2 = rx * rx + ry * ry
    if (d2 <= rRad * rRad) {
      // Rotate world by pyaw so player faces UP
      const cosY = Math.cos(-pyaw)
      const sinY = Math.sin(-pyaw)
      const wx = px + (rx * cosY - ry * sinY) / rScale
      const wz = pz + (rx * sinY + ry * cosY) / rScale

      if (wx >= -55 && wx <= 55 && wz >= -55 && wz <= 55) {
        const u = (wx + 55) / 110
        const v = (wz + 55) / 110
        const bx = Math.min(topdownImg.width - 1, Math.max(0, Math.floor(u * topdownImg.width)))
        const by = Math.min(topdownImg.height - 1, Math.max(0, Math.floor(v * topdownImg.height)))
        const bIdx = (by * topdownImg.width + bx) * 4
        const r = topdownImg.data[bIdx]
        const g = topdownImg.data[bIdx + 1]
        const b = topdownImg.data[bIdx + 2]
        setPixel(radarBuf, radarW, radarH, x, y, Math.round(r * 0.9), Math.round(g * 0.95), Math.round(b * 1.05), 255)
      }
    }
  }
}

// Radar range rings (15m, 30m)
strokeCircle(radarBuf, radarW, radarH, rcx, rcy, 15 * rScale, 1, 0, 240, 255, 60)
strokeCircle(radarBuf, radarW, radarH, rcx, rcy, 28 * rScale, 1, 0, 240, 255, 45)

// Draw Bots on Radar (e.g. Bot in Canal, Bot in Yard)
const sampleBots = [
  { x: 10.0, z: -5.0, yaw: 1.5, firing: true, dead: false },
  { x: -12.0, z: 2.0, yaw: -0.5, firing: false, dead: false },
  { x: 14.0, z: 12.0, yaw: 0.0, firing: false, dead: true }
]

sampleBots.forEach(bot => {
  const dx = bot.x - px
  const dz = bot.z - pz
  const cosY = Math.cos(pyaw)
  const sinY = Math.sin(pyaw)
  const rx = (dx * cosY - dz * sinY) * rScale
  const ry = (dx * sinY + dz * cosY) * rScale
  const bx = rcx + rx
  const by = rcy + ry

  if (Math.hypot(rx, ry) < rRad - 10) {
    if (bot.dead) {
      drawLine(radarBuf, radarW, radarH, bx - 6, by - 6, bx + 6, by + 6, 140, 160, 180, 220, 2)
      drawLine(radarBuf, radarW, radarH, bx + 6, by - 6, bx - 6, by + 6, 140, 160, 180, 220, 2)
    } else {
      if (bot.firing) {
        strokeCircle(radarBuf, radarW, radarH, bx, by, 18, 2, 255, 70, 85, 180)
        strokeCircle(radarBuf, radarW, radarH, bx, by, 26, 1, 255, 70, 85, 100)
      }
      drawCircle(radarBuf, radarW, radarH, bx, by, 8, 255, 70, 85, 255)
      strokeCircle(radarBuf, radarW, radarH, bx, by, 8, 2, 255, 255, 255, 255)
      // Bot facing tip
      const bYawRel = bot.yaw - pyaw
      const tipX = bx - Math.sin(bYawRel) * 14
      const tipY = by - Math.cos(bYawRel) * 14
      drawLine(radarBuf, radarW, radarH, bx, by, tipX, tipY, 255, 70, 85, 255, 2)
    }
  }
})

// Draw Site A & B Indicators
const sampleSites = [
  { id: 'A', x: -35.0, z: -1.5, col: [6, 182, 212] },
  { id: 'B', x: 43.5, z: 0.0, col: [245, 158, 11] }
]
sampleSites.forEach(s => {
  const dx = s.x - px
  const dz = s.z - pz
  const cosY = Math.cos(pyaw)
  const sinY = Math.sin(pyaw)
  const rx = (dx * cosY - dz * sinY) * rScale
  const ry = (dx * sinY + dz * cosY) * rScale
  let sx = rcx + rx
  let sy = rcy + ry
  const d = Math.hypot(rx, ry)
  if (d > rRad - 20) {
    const a = Math.atan2(ry, rx)
    sx = rcx + Math.cos(a) * (rRad - 20)
    sy = rcy + Math.sin(a) * (rRad - 20)
  }
  // Diamond badge
  const rad = 14
  fillRect(radarBuf, radarW, radarH, sx - rad, sy - rad, rad * 2, rad * 2, 10, 20, 30, 240)
  strokeRect(radarBuf, radarW, radarH, sx - rad, sy - rad, rad * 2, rad * 2, 2, s.col[0], s.col[1], s.col[2], 255)
  drawString(radarBuf, radarW, radarH, s.id, sx - 4, sy - 6, 2, 255, 255, 255)
})

// Player Vision Cone (straight UP)
for (let y = rcy - 120; y <= rcy; y++) {
  for (let x = rcx - 90; x <= rcx + 90; x++) {
    const rx = x - rcx
    const ry = y - rcy
    const dist = Math.hypot(rx, ry)
    if (dist <= 120 && ry < 0) {
      const angle = Math.atan2(ry, rx) // -PI to 0
      const diff = Math.abs(angle - (-Math.PI / 2))
      if (diff <= 0.6) { // ~35 deg half-FOV
        const falloff = (1 - dist / 120) * (1 - diff / 0.6)
        setPixel(radarBuf, radarW, radarH, x, y, 0, 240, 255, Math.round(falloff * 90))
      }
    }
  }
}

// Player Chevron in Center
drawCircle(radarBuf, radarW, radarH, rcx, rcy, 12, 0, 240, 255, 80)
drawCircle(radarBuf, radarW, radarH, rcx, rcy, 8, 255, 255, 255, 255)
drawLine(radarBuf, radarW, radarH, rcx, rcy - 16, rcx - 9, rcy + 8, 0, 240, 255, 255, 3)
drawLine(radarBuf, radarW, radarH, rcx, rcy - 16, rcx + 9, rcy + 8, 0, 240, 255, 255, 3)
drawLine(radarBuf, radarW, radarH, rcx - 9, rcy + 8, rcx, rcy + 4, 0, 240, 255, 255, 2)
drawLine(radarBuf, radarW, radarH, rcx + 9, rcy + 8, rcx, rcy + 4, 0, 240, 255, 255, 2)

// Radar Outer Frame & Reticle
strokeCircle(radarBuf, radarW, radarH, rcx, rcy, rRad, 4, 0, 240, 255, 255)
strokeCircle(radarBuf, radarW, radarH, rcx, rcy, rRad - 6, 1, 0, 240, 255, 70)

// North Indicator on perimeter
const northAngle = -Math.PI / 2 + pyaw
const nx = rcx + Math.cos(northAngle) * (rRad - 14)
const ny = rcy + Math.sin(northAngle) * (rRad - 14)
drawCircle(radarBuf, radarW, radarH, nx, ny, 10, 10, 25, 40, 240)
strokeCircle(radarBuf, radarW, radarH, nx, ny, 10, 1, 0, 240, 255, 220)
drawString(radarBuf, radarW, radarH, 'N', nx - 4, ny - 6, 2, 0, 240, 255)

// Quadrant tick lines
for (const ang of [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2]) {
  const x0 = rcx + Math.cos(ang) * (rRad - 10)
  const y0 = rcy + Math.sin(ang) * (rRad - 10)
  const x1 = rcx + Math.cos(ang) * (rRad + 2)
  const y1 = rcy + Math.sin(ang) * (rRad + 2)
  drawLine(radarBuf, radarW, radarH, x0, y0, x1, y1, 0, 240, 255, 200, 2)
}

const radarPng = encodePNG(radarW, radarH, radarBuf)
const radarOutFile = path.join(rootDir, 'docs/captures/minimap_radar_preview.png')
fs.writeFileSync(radarOutFile, radarPng)
console.log(`✓ Saved minimap radar preview: ${radarOutFile} (${(radarPng.length / 1024).toFixed(1)} KB)`)


// ── 2. Render Full Tactical Map Modal View ─────────────────
console.log('Generating Full Tactical Map Modal Preview...')
const tacW = 760
const tacH = 800
const tacBuf = createBuffer(tacW, tacH, [6, 12, 18, 255])

// Modal Container Window Box
const winX = 30
const winY = 20
const winW = 700
const winH = 760
fillRect(tacBuf, tacW, tacH, winX, winY, winW, winH, 11, 21, 32, 255)
strokeRect(tacBuf, tacW, tacH, winX, winY, winW, winH, 2, 0, 240, 255, 255)

// Header
fillRect(tacBuf, tacW, tacH, winX, winY, winW, 46, 16, 28, 42, 255)
strokeRect(tacBuf, tacW, tacH, winX, winY + 45, winW, 1, 1, 0, 240, 255, 120)

// Tag & Title
fillRect(tacBuf, tacW, tacH, winX + 16, winY + 12, 60, 22, 255, 70, 85, 255)
drawString(tacBuf, tacW, tacH, 'ASCENT', winX + 22, winY + 15, 2, 255, 255, 255)
drawString(tacBuf, tacW, tacH, 'TACTICAL MAP OVERVIEW', winX + 86, winY + 16, 2, 240, 245, 255)

// Location badge in header
drawString(tacBuf, tacW, tacH, 'LOCATION: MID COURTYARD (X: 3.0, Z: -2.0)', winX + 330, winY + 17, 1, 0, 240, 255)

// Close button
fillRect(tacBuf, tacW, tacH, winX + winW - 38, winY + 10, 26, 26, 255, 70, 85, 220)
drawString(tacBuf, tacW, tacH, 'X', winX + winW - 30, winY + 15, 2, 255, 255, 255)

// Tactical Map Canvas inside Modal
const mapX = winX + 40
const mapY = winY + 65
const mapSize = 620

// Blit high-res blueprint
for (let y = 0; y < mapSize; y++) {
  const v = y / mapSize
  const by = Math.min(topdownImg.height - 1, Math.floor(v * topdownImg.height))
  for (let x = 0; x < mapSize; x++) {
    const u = x / mapSize
    const bx = Math.min(topdownImg.width - 1, Math.floor(u * topdownImg.width))
    const bIdx = (by * topdownImg.width + bx) * 4
    const r = topdownImg.data[bIdx]
    const g = topdownImg.data[bIdx + 1]
    const b = topdownImg.data[bIdx + 2]
    setPixel(tacBuf, tacW, tacH, mapX + x, mapY + y, Math.round(r * 0.95), Math.round(g * 0.98), Math.round(b * 1.05), 255)
  }
}

// 10m Grid overlay
const gStep = mapSize / 11
for (let i = 0; i <= 11; i++) {
  const gx = mapX + i * gStep
  const gy = mapY + i * gStep
  drawLine(tacBuf, tacW, tacH, gx, mapY, gx, mapY + mapSize, 0, 240, 255, 45, 1)
  drawLine(tacBuf, tacW, tacH, mapX, gy, mapX + mapSize, gy, 0, 240, 255, 45, 1)
  if (i > 0 && i < 11) {
    const val = -55 + i * 10
    drawString(tacBuf, tacW, tacH, `${val}M`, gx - 10, mapY + 6, 1, 140, 160, 180, 200)
  }
}

// Highlight all 12 zones with stylish boundary boxes and labels
zones.forEach(z => {
  const u0 = (z.minX + 55) / 110
  const v0 = (z.minZ + 55) / 110
  const u1 = (z.maxX + 55) / 110
  const v1 = (z.maxZ + 55) / 110
  const zx = mapX + u0 * mapSize
  const zy = mapY + v0 * mapSize
  const zw = (u1 - u0) * mapSize
  const zh = (v1 - v0) * mapSize

  strokeRect(tacBuf, tacW, tacH, zx, zy, zw, zh, 1, 0, 240, 255, 120)

  // Label in center
  const lX = zx + zw / 2 - (z.name.length * 6) / 2
  const lY = zy + zh / 2 - 4
  fillRect(tacBuf, tacW, tacH, lX - 4, lY - 2, z.name.length * 6 + 8, 14, 10, 20, 30, 200)
  strokeRect(tacBuf, tacW, tacH, lX - 4, lY - 2, z.name.length * 6 + 8, 14, 1, 0, 240, 255, 100)
  drawString(tacBuf, tacW, tacH, z.name.toUpperCase(), lX, lY + 2, 1, 240, 250, 255)
})

// Draw Site A and B Badges
sampleSites.forEach(s => {
  const u = (s.x + 55) / 110
  const v = (s.z + 55) / 110
  const sx = mapX + u * mapSize
  const sy = mapY + v * mapSize
  const r = 16
  fillRect(tacBuf, tacW, tacH, sx - r, sy - r, r * 2, r * 2, 10, 25, 40, 240)
  strokeRect(tacBuf, tacW, tacH, sx - r, sy - r, r * 2, r * 2, 2, s.col[0], s.col[1], s.col[2], 255)
  drawString(tacBuf, tacW, tacH, s.id, sx - 5, sy - 8, 2, 255, 255, 255)
})

// Draw Bots on Tactical Map
sampleBots.forEach(bot => {
  const u = (bot.x + 55) / 110
  const v = (bot.z + 55) / 110
  const bx = mapX + u * mapSize
  const by = mapY + v * mapSize

  if (bot.dead) {
    drawLine(tacBuf, tacW, tacH, bx - 6, by - 6, bx + 6, by + 6, 120, 140, 160, 240, 2)
    drawLine(tacBuf, tacW, tacH, bx + 6, by - 6, bx - 6, by + 6, 120, 140, 160, 240, 2)
  } else {
    drawCircle(tacBuf, tacW, tacH, bx, by, 7, 255, 70, 85, 255)
    strokeCircle(tacBuf, tacW, tacH, bx, by, 7, 2, 255, 255, 255, 255)
    const tipX = bx - Math.sin(bot.yaw) * 12
    const tipY = by - Math.cos(bot.yaw) * 12
    drawLine(tacBuf, tacW, tacH, bx, by, tipX, tipY, 255, 70, 85, 255, 2)
  }
})

// Draw Player Marker & Vision Cone on Tactical Map
const pu = (px + 55) / 110
const pv = (pz + 55) / 110
const plx = mapX + pu * mapSize
const ply = mapY + pv * mapSize

// Vision Cone towards player yaw
const fovR = 80
for (let y = ply - fovR; y <= ply + fovR; y++) {
  for (let x = plx - fovR; x <= plx + fovR; x++) {
    const rx = x - plx
    const ry = y - ply
    const dist = Math.hypot(rx, ry)
    if (dist <= fovR) {
      const angle = Math.atan2(ry, rx)
      // Player angle in canvas space: -pyaw - PI/2
      const targetAngle = -pyaw - Math.PI / 2
      let diff = Math.abs(angle - targetAngle)
      while (diff > Math.PI) diff = Math.abs(diff - 2 * Math.PI)
      if (diff <= 0.6) {
        const falloff = (1 - dist / fovR) * (1 - diff / 0.6)
        setPixel(tacBuf, tacW, tacH, x, y, 0, 240, 255, Math.round(falloff * 110))
      }
    }
  }
}

// Player Chevron
drawCircle(tacBuf, tacW, tacH, plx, ply, 10, 0, 240, 255, 120)
drawCircle(tacBuf, tacW, tacH, plx, ply, 6, 255, 255, 255, 255)
const pAngle = -pyaw - Math.PI / 2
const pTipX = plx + Math.cos(pAngle) * 16
const pTipY = ply + Math.sin(pAngle) * 16
drawLine(tacBuf, tacW, tacH, plx, ply, pTipX, pTipY, 0, 240, 255, 255, 3)

// Crosshair guide at simulated mouse cursor
const curX = mapX + 380
const curY = mapY + 280
drawLine(tacBuf, tacW, tacH, curX, mapY, curX, mapY + mapSize, 0, 240, 255, 90, 1)
drawLine(tacBuf, tacW, tacH, mapX, curY, mapX + mapSize, curY, 0, 240, 255, 90, 1)
drawCircle(tacBuf, tacW, tacH, curX, curY, 5, 0, 240, 255, 255)

// Outer frame for map
strokeRect(tacBuf, tacW, tacH, mapX - 1, mapY - 1, mapSize + 2, mapSize + 2, 2, 0, 240, 255, 255)

// Legend Bar at bottom
const legY = mapY + mapSize + 14
drawString(tacBuf, tacW, tacH, 'LEGEND:', winX + 40, legY, 1, 148, 163, 184)
drawCircle(tacBuf, tacW, tacH, winX + 115, legY + 4, 4, 0, 240, 255, 255)
drawString(tacBuf, tacW, tacH, 'YOU (VISION)', winX + 126, legY, 1, 240, 245, 255)

drawCircle(tacBuf, tacW, tacH, winX + 230, legY + 4, 4, 255, 70, 85, 255)
drawString(tacBuf, tacW, tacH, 'ENEMY BOT', winX + 242, legY, 1, 240, 245, 255)

fillRect(tacBuf, tacW, tacH, winX + 340, legY - 2, 12, 12, 8, 51, 68, 255)
strokeRect(tacBuf, tacW, tacH, winX + 340, legY - 2, 12, 12, 1, 6, 182, 212, 255)
drawString(tacBuf, tacW, tacH, 'A', winX + 344, legY, 1, 255, 255, 255)
drawString(tacBuf, tacW, tacH, 'A SITE', winX + 358, legY, 1, 6, 182, 212)

fillRect(tacBuf, tacW, tacH, winX + 430, legY - 2, 12, 12, 69, 26, 3, 255)
strokeRect(tacBuf, tacW, tacH, winX + 430, legY - 2, 12, 12, 1, 245, 158, 11, 255)
drawString(tacBuf, tacW, tacH, 'B', winX + 434, legY, 1, 255, 255, 255)
drawString(tacBuf, tacW, tacH, 'B SITE', winX + 448, legY, 1, 245, 158, 11)

drawString(tacBuf, tacW, tacH, 'PRESS [M] TO TOGGLE  CLICK TO PING  SHIFT+CLICK TO TELEPORT', winX + 150, legY + 22, 1, 100, 116, 139)

const tacPng = encodePNG(tacW, tacH, tacBuf)
const tacOutFile = path.join(rootDir, 'docs/captures/tactical_map_preview.png')
fs.writeFileSync(tacOutFile, tacPng)
console.log(`✓ Saved tactical map preview: ${tacOutFile} (${(tacPng.length / 1024).toFixed(1)} KB)`)
console.log('Minimap preview generation complete!')
