#!/usr/bin/env node
/**
 * tools/render-layout.mjs
 *
 * Renders chunk layout JSON to high-resolution PNGs:
 *  1. Pure Layout Render (docs/captures/chunk_C_render.png)
 *  2. Side-by-Side Semi-Transparent Overlay (docs/captures/chunk_C_overlay_v2.png and chunk_C_overlay.png)
 *
 * Usage:
 *   node tools/render-layout.mjs [inputPath] [outputPath]
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import zlib from 'zlib'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const inputFile = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.join(rootDir, 'src/map/layout/chunk_C.json')

const chunkBase = path.basename(inputFile, '.json')

let referenceFile = null
const refGridDir = path.join(rootDir, 'docs/reference/grid')
if (fs.existsSync(refGridDir)) {
  const files = fs.readdirSync(refGridDir)
  const match = files.find(f => f.startsWith(`${chunkBase}_`) && f.endsWith('.png'))
  if (match) {
    referenceFile = path.join(refGridDir, match)
  }
}
if (!referenceFile) {
  referenceFile = path.join(rootDir, 'docs/reference/grid/chunk_C_x-20_20_z-20_20.png')
}

const outputFile = process.argv[3]
  ? path.resolve(process.cwd(), process.argv[3])
  : path.join(rootDir, 'docs/captures', `${chunkBase}_overlay.png`)

const pureRenderFile = path.join(rootDir, 'docs/captures', `${chunkBase}_render.png`)
const legacyOverlayFile = (chunkBase === 'chunk_C') ? path.join(rootDir, 'docs/captures/chunk_C_overlay.png') : null

if (!fs.existsSync(inputFile)) {
  console.error(`Error: Layout file not found at ${inputFile}`)
  process.exit(1)
}

const outDir = path.dirname(outputFile)
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

// ── Rendering Geometry ──────────────────────────────────────────
let WIDTH = 1800
let HEIGHT = 1875

const PALETTE = {
  wallRim: [228, 218, 188],       // Pale beige ribbon top
  wallFill: [108, 100, 90],       // Wall body
  wallInner: [72, 67, 60],        // Wall interior edge
  floorStone: [58, 65, 75],       // Neutral stone pavement (defaultFloor)
  floorStoneTile: [50, 56, 65],   // Subtle tile seam
  floorTile: [92, 60, 50],        // Reddish terracotta / ceramic tile
  floorWood: [120, 82, 48],       // Wood plank flooring
  floorDark: [42, 48, 58],        // Dark courtyard pavement
  floorLowered: [28, 33, 40],     // Level -1 sunken corridor pavement
  waterPool: [32, 142, 172],      // Cyan pool water
  waterPoolWave: [80, 205, 235],  // Cyan water highlights
  waterCanal: [22, 90, 118],      // Canal deep teal water
  waterCanalFlow: [68, 185, 225], // Canal light stream
  bridgeWood: [142, 92, 45],      // Bridge deck wood
  bridgeDark: [96, 60, 28],       // Bridge planks
  stairsBase: [115, 120, 130],    // Stairs tread
  stairsRiser: [68, 72, 80],      // Stairs riser
  platform: [156, 162, 172],      // Raised platform
  platformRim: [210, 215, 225],   // Railing rim
  crateBlue: [28, 118, 152],      // Radianite crate
  crateCyan: [60, 220, 255],      // Radianite glow rim
  crateWood: [155, 105, 55],      // Wooden crate
  crateMetal: [75, 80, 85],       // Metal bracket
  treeGreen: [58, 122, 46],       // Trees/greenery
  treeHighlight: [92, 170, 72],
  outside: [18, 22, 28]           // Island void
}

// ── Buffer Utilities ────────────────────────────────────────────
function createBuffer(w, h, fill = [0, 0, 0, 255]) {
  const buf = Buffer.alloc(w * h * 4)
  for (let i = 0; i < w * h; i++) {
    buf[i * 4] = fill[0]
    buf[i * 4 + 1] = fill[1]
    buf[i * 4 + 2] = fill[2]
    buf[i * 4 + 3] = fill[3]
  }
  return buf
}

function setPixel(buf, w, h, x, y, r, g, b, a = 255) {
  if (x < 0 || x >= w || y < 0 || y >= h) return
  const idx = (y * w + x) * 4
  if (a >= 255) {
    buf[idx] = r
    buf[idx + 1] = g
    buf[idx + 2] = b
    buf[idx + 3] = 255
  } else {
    const alpha = a / 255
    const inv = 1 - alpha
    buf[idx] = Math.round(buf[idx] * inv + r * alpha)
    buf[idx + 1] = Math.round(buf[idx + 1] * inv + g * alpha)
    buf[idx + 2] = Math.round(buf[idx + 2] * inv + b * alpha)
    buf[idx + 3] = 255
  }
}

function fillRect(buf, w, h, x0, y0, rw, rh, r, g, b, a = 255) {
  const x1 = Math.min(w, x0 + rw)
  const y1 = Math.min(h, y0 + rh)
  for (let y = Math.max(0, y0); y < y1; y++) {
    for (let x = Math.max(0, x0); x < x1; x++) {
      setPixel(buf, w, h, x, y, r, g, b, a)
    }
  }
}

// ── Pure Node PNG Decoder ───────────────────────────────────────
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
  const curRow = Buffer.alloc(stride)

  for (let y = 0; y < height; y++) {
    const filter = decompressed[srcPos++]
    for (let x = 0; x < stride; x++) {
      const raw = decompressed[srcPos++]
      const a = x >= bpp ? curRow[x - bpp] : 0
      const b = prevRow[x]
      const c = x >= bpp ? prevRow[x - bpp] : 0
      let val = raw
      if (filter === 1) val = (raw + a) & 0xff
      else if (filter === 2) val = (raw + b) & 0xff
      else if (filter === 3) val = (raw + Math.floor((a + b) / 2)) & 0xff
      else if (filter === 4) val = (raw + paeth(a, b, c)) & 0xff
      curRow[x] = val
    }
    curRow.copy(prevRow)

    for (let px = 0; px < width; px++) {
      const didx = (y * width + px) * 4
      const sidx = px * bpp
      out[didx] = curRow[sidx]
      out[didx + 1] = curRow[sidx + 1]
      out[didx + 2] = curRow[sidx + 2]
      out[didx + 3] = bpp === 4 ? curRow[sidx + 3] : 255
    }
  }
  return { width, height, data: out }
}

// ── Pure Node PNG Encoder ───────────────────────────────────────
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
    const fullChunk = Buffer.concat([typeBuf, data])
    const crc = updateCRC(0, fullChunk)
    crcBuf.writeUInt32BE(crc, 0)
    return Buffer.concat([lenBuf, fullChunk, crcBuf])
  }

  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(width, 0)
  ihdrData.writeUInt32BE(height, 4)
  ihdrData[8] = 8
  ihdrData[9] = 6
  ihdrData[10] = 0
  ihdrData[11] = 0
  ihdrData[12] = 0
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

// ── Text Font ───────────────────────────────────────────────────
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
  'x': ['#...#', '.#.#.', '..#..', '.#.#.', '#...#', '.....', '.....'],
  'z': ['#####', '...#.', '..#..', '.#...', '#####', '.....', '.....'],
  '-': ['.....', '.....', '#####', '.....', '.....', '.....', '.....'],
  '+': ['.....', '..#..', '.###.', '..#..', '.....', '.....', '.....'],
  ':': ['.....', '..#..', '.....', '..#..', '.....', '.....', '.....'],
  '.': ['.....', '.....', '.....', '.....', '..#..', '.....', '.....'],
  '/': ['....#', '...#.', '..#..', '.#...', '#....', '.....', '.....'],
  '(': ['..#..', '.#...', '.#...', '.#...', '..#..', '.....', '.....'],
  ')': ['..#..', '...#.', '...#.', '...#.', '..#..', '.....', '.....'],
  '%': ['#...#', '...#.', '..#..', '.#...', '#...#', '.....', '.....'],
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
  ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....']
}

function drawChar(buf, w, h, char, startX, startY, scale, r, g, b) {
  const map = BITMAPS[char] || BITMAPS[' ']
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue
      for (let row = 0; row < 7; row++) {
        const rowStr = map[row]
        for (let col = 0; col < 5; col++) {
          if (rowStr[col] === '#') {
            const px = startX + col * scale + dx * 2
            const py = startY + row * scale + dy * 2
            fillRect(buf, w, h, px, py, scale, scale, 0, 0, 0, 220)
          }
        }
      }
    }
  }
  for (let row = 0; row < 7; row++) {
    const rowStr = map[row]
    for (let col = 0; col < 5; col++) {
      if (rowStr[col] === '#') {
        const px = startX + col * scale
        const py = startY + row * scale
        fillRect(buf, w, h, px, py, scale, scale, r, g, b, 255)
      }
    }
  }
}

function drawString(buf, w, h, text, startX, startY, scale, r, g, b) {
  let curX = startX
  for (const ch of text) {
    drawChar(buf, w, h, ch, curX, startY, scale, r, g, b)
    curX += 6 * scale
  }
}

// ── JSON Layout Renderer ────────────────────────────────────────
function renderLayoutJSON(layout) {
  const originX = layout.origin?.[0] ?? -20
  const originZ = layout.origin?.[1] ?? -20
  const sizeX = layout.size?.[0] ?? 40
  const sizeZ = layout.size?.[1] ?? 40

  function wx2px(x) {
    return Math.round(((x - originX) / sizeX) * WIDTH)
  }
  function wz2py(z) {
    return Math.round(((z - originZ) / sizeZ) * HEIGHT)
  }
  function w2pxW(w) {
    return Math.round((w / sizeX) * WIDTH)
  }
  function w2pxH(h) {
    return Math.round((h / sizeZ) * HEIGHT)
  }

  // 1. Requirement 1: Base defaultFloor = "stone" for the whole island
  // Any cell not covered by a room, court, water or platform is floor level 0.
  // Navy/black undefined areas must not exist!
  const defaultFloorCol = PALETTE.floorStone
  const buf = createBuffer(WIDTH, HEIGHT, [defaultFloorCol[0], defaultFloorCol[1], defaultFloorCol[2], 255])

  // Subtle 2m stone tile grid on the default floor
  for (let c = 0; c <= sizeX; c += 2) {
    const gx = Math.round((c / sizeX) * WIDTH)
    for (let y = 0; y < HEIGHT; y++) {
      setPixel(buf, WIDTH, HEIGHT, gx, y, PALETTE.floorStoneTile[0], PALETTE.floorStoneTile[1], PALETTE.floorStoneTile[2], 80)
    }
  }
  for (let r = 0; r <= sizeZ; r += 2) {
    const gy = Math.round((r / sizeZ) * HEIGHT)
    for (let x = 0; x < WIDTH; x++) {
      setPixel(buf, WIDTH, HEIGHT, x, gy, PALETTE.floorStoneTile[0], PALETTE.floorStoneTile[1], PALETTE.floorStoneTile[2], 80)
    }
  }

  // Voids (only for real gaps outside the island)
  for (const v of (layout.voids || [])) {
    const x0 = wx2px(v.x0)
    const y0 = wz2py(v.z0)
    const rw = wx2px(v.x1) - x0
    const rh = wz2py(v.z1) - y0
    fillRect(buf, WIDTH, HEIGHT, x0, y0, rw, rh, PALETTE.outside[0], PALETTE.outside[1], PALETTE.outside[2])
  }

  // 2. Open Courts & Lowered Courts (level -1)
  for (const court of (layout.openCourts || [])) {
    const x0 = wx2px(court.x0)
    const y0 = wz2py(court.z0)
    const rw = wx2px(court.x1) - x0
    const rh = wz2py(court.z1) - y0
    const isLevelNeg1 = court.level === -1
    const color = isLevelNeg1 ? PALETTE.floorLowered : (court.floor === 'dark_tile' ? PALETTE.floorDark : PALETTE.floorStone)
    fillRect(buf, WIDTH, HEIGHT, x0, y0, rw, rh, color[0], color[1], color[2])

    // Level -1 court sunken inner retaining bevel
    if (isLevelNeg1) {
      fillRect(buf, WIDTH, HEIGHT, x0, y0, rw, 4, 15, 18, 22, 190)
      fillRect(buf, WIDTH, HEIGHT, x0, y0, 4, rh, 15, 18, 22, 190)
      fillRect(buf, WIDTH, HEIGHT, x0, y0 + rh - 4, rw, 4, 15, 18, 22, 140)
      fillRect(buf, WIDTH, HEIGHT, x0 + rw - 4, y0, 4, rh, 15, 18, 22, 140)
    }
  }

  // 3. Water Bodies (Central canal stream and A Site cyan pool)
  for (const water of (layout.water || [])) {
    const x0 = wx2px(water.x0)
    const y0 = wz2py(water.z0)
    const rw = wx2px(water.x1) - x0
    const rh = wz2py(water.z1) - y0
    const isCanal = water.id && water.id.includes('canal')

    if (isCanal) {
      // Central thin water line in canal trench
      fillRect(buf, WIDTH, HEIGHT, x0, y0, rw, rh, PALETTE.waterCanal[0], PALETTE.waterCanal[1], PALETTE.waterCanal[2])
      fillRect(buf, WIDTH, HEIGHT, x0, y0, 3, rh, PALETTE.wallInner[0], PALETTE.wallInner[1], PALETTE.wallInner[2])
      fillRect(buf, WIDTH, HEIGHT, x0 + rw - 3, y0, 3, rh, PALETTE.wallInner[0], PALETTE.wallInner[1], PALETTE.wallInner[2])
      const midX = x0 + Math.floor(rw / 2)
      fillRect(buf, WIDTH, HEIGHT, midX - 2, y0, 4, rh, PALETTE.waterCanalFlow[0], PALETTE.waterCanalFlow[1], PALETTE.waterCanalFlow[2])
    } else {
      // Cyan pool water (e.g. A Site)
      fillRect(buf, WIDTH, HEIGHT, x0, y0, rw, rh, PALETTE.waterPool[0], PALETTE.waterPool[1], PALETTE.waterPool[2])
      fillRect(buf, WIDTH, HEIGHT, x0, y0, rw, 3, PALETTE.wallInner[0], PALETTE.wallInner[1], PALETTE.wallInner[2])
      fillRect(buf, WIDTH, HEIGHT, x0, y0 + rh - 3, rw, 3, PALETTE.wallInner[0], PALETTE.wallInner[1], PALETTE.wallInner[2])
      fillRect(buf, WIDTH, HEIGHT, x0, y0, 3, rh, PALETTE.wallInner[0], PALETTE.wallInner[1], PALETTE.wallInner[2])
      fillRect(buf, WIDTH, HEIGHT, x0 + rw - 3, y0, 3, rh, PALETTE.wallInner[0], PALETTE.wallInner[1], PALETTE.wallInner[2])
      for (let y = y0 + 15; y < y0 + rh - 10; y += 28) {
        fillRect(buf, WIDTH, HEIGHT, x0 + 10, y, rw - 20, 2, PALETTE.waterPoolWave[0], PALETTE.waterPoolWave[1], PALETTE.waterPoolWave[2], 160)
      }
    }
  }

  // 4. Platforms
  for (const plat of (layout.platforms || [])) {
    const x0 = wx2px(plat.x0)
    const y0 = wz2py(plat.z0)
    const rw = wx2px(plat.x1) - x0
    const rh = wz2py(plat.z1) - y0
    fillRect(buf, WIDTH, HEIGHT, x0, y0, rw, rh, PALETTE.platform[0], PALETTE.platform[1], PALETTE.platform[2])
    if (plat.rail) {
      fillRect(buf, WIDTH, HEIGHT, x0, y0, rw, 4, PALETTE.platformRim[0], PALETTE.platformRim[1], PALETTE.platformRim[2])
      fillRect(buf, WIDTH, HEIGHT, x0, y0 + rh - 4, rw, 4, PALETTE.platformRim[0], PALETTE.platformRim[1], PALETTE.platformRim[2])
      fillRect(buf, WIDTH, HEIGHT, x0, y0, 4, rh, PALETTE.platformRim[0], PALETTE.platformRim[1], PALETTE.platformRim[2])
      fillRect(buf, WIDTH, HEIGHT, x0 + rw - 4, y0, 4, rh, PALETTE.platformRim[0], PALETTE.platformRim[1], PALETTE.platformRim[2])
    }
  }

  // 5. Bridges
  for (const br of (layout.bridges || [])) {
    const x0 = wx2px(br.x0)
    const y0 = wz2py(br.z0)
    const rw = wx2px(br.x1) - x0
    const rh = wz2py(br.z1) - y0
    fillRect(buf, WIDTH, HEIGHT, x0, y0, rw, rh, PALETTE.bridgeWood[0], PALETTE.bridgeWood[1], PALETTE.bridgeWood[2])
    for (let py = y0 + 6; py < y0 + rh; py += 10) {
      fillRect(buf, WIDTH, HEIGHT, x0, py, rw, 2, PALETTE.bridgeDark[0], PALETTE.bridgeDark[1], PALETTE.bridgeDark[2])
    }
    fillRect(buf, WIDTH, HEIGHT, x0, y0, rw, 4, PALETTE.platformRim[0], PALETTE.platformRim[1], PALETTE.platformRim[2])
    fillRect(buf, WIDTH, HEIGHT, x0, y0 + rh - 4, rw, 4, PALETTE.platformRim[0], PALETTE.platformRim[1], PALETTE.platformRim[2])
  }

  // 6. Stairs
  for (const st of (layout.stairs || [])) {
    const fromX = st.from[0], fromZ = st.from[1]
    const toX = st.to[0], toZ = st.to[1]
    const widthM = st.width || 2.0
    const dx = toX - fromX
    const dz = toZ - fromZ
    const isAxisZ = Math.abs(dz) >= Math.abs(dx)

    if (isAxisZ) {
      const z0 = Math.min(fromZ, toZ)
      const z1 = Math.max(fromZ, toZ)
      const x0 = fromX - widthM / 2
      const px0 = wx2px(x0)
      const py0 = wz2py(z0)
      const pw = w2pxW(widthM)
      const ph = wz2py(z1) - py0
      fillRect(buf, WIDTH, HEIGHT, px0, py0, pw, ph, PALETTE.stairsBase[0], PALETTE.stairsBase[1], PALETTE.stairsBase[2])
      for (let s = 1; s <= 5; s++) {
        const sy = py0 + Math.floor((ph * s) / 6)
        fillRect(buf, WIDTH, HEIGHT, px0, sy, pw, 2, PALETTE.stairsRiser[0], PALETTE.stairsRiser[1], PALETTE.stairsRiser[2])
      }
    } else {
      const x0 = Math.min(fromX, toX)
      const x1 = Math.max(fromX, toX)
      const z0 = fromZ - widthM / 2
      const px0 = wx2px(x0)
      const py0 = wz2py(z0)
      const pw = wx2px(x1) - px0
      const ph = w2pxH(widthM)
      fillRect(buf, WIDTH, HEIGHT, px0, py0, pw, ph, PALETTE.stairsBase[0], PALETTE.stairsBase[1], PALETTE.stairsBase[2])
      for (let s = 1; s <= 5; s++) {
        const sx = px0 + Math.floor((pw * s) / 6)
        fillRect(buf, WIDTH, HEIGHT, sx, py0, 2, ph, PALETTE.stairsRiser[0], PALETTE.stairsRiser[1], PALETTE.stairsRiser[2])
      }
    }
  }

  // 7. Rooms (Thin walls around perimeter + interior floor + doors)
  for (const room of (layout.rooms || [])) {
    const rx0 = wx2px(room.x0)
    const rz0 = wz2py(room.z0)
    const rx1 = wx2px(room.x1)
    const rz1 = wz2py(room.z1)
    const rw = rx1 - rx0
    const rh = rz1 - rz0

    const wallThicknessM = room.wall ?? 1.0
    const wxThick = w2pxW(wallThicknessM)
    const wzThick = w2pxH(wallThicknessM)

    // Interior Floor
    const floorColor = room.floor === 'wood' ? PALETTE.floorWood : (room.floor === 'tile' ? PALETTE.floorTile : PALETTE.floorStone)
    const innerX0 = rx0 + wxThick
    const innerZ0 = rz0 + wzThick
    const innerW = rw - 2 * wxThick
    const innerH = rh - 2 * wzThick
    if (innerW > 0 && innerH > 0) {
      fillRect(buf, WIDTH, HEIGHT, innerX0, innerZ0, innerW, innerH, floorColor[0], floorColor[1], floorColor[2])
    }

    // Door check helpers
    const doorsN = (room.doors || []).filter(d => d.side === 'N')
    const doorsS = (room.doors || []).filter(d => d.side === 'S')
    const doorsW = (room.doors || []).filter(d => d.side === 'W')
    const doorsE = (room.doors || []).filter(d => d.side === 'E')

    function isDoorCutX(doorList, wx) {
      for (const d of doorList) {
        if (Math.abs(wx - d.at) <= (d.w / 2)) return true
      }
      return false
    }
    function isDoorCutZ(doorList, wz) {
      for (const d of doorList) {
        if (Math.abs(wz - d.at) <= (d.w / 2)) return true
      }
      return false
    }

    // North Wall: [rx0, rx1] x [rz0, rz0 + wzThick]
    for (let px = rx0; px < rx1; px++) {
      const curWx = originX + (px / WIDTH) * sizeX
      if (!isDoorCutX(doorsN, curWx)) {
        for (let py = rz0; py < rz0 + wzThick; py++) {
          const isOuterRim = (py - rz0) < 4
          const isInnerRim = (rz0 + wzThick - py) < 2
          const col = isOuterRim ? PALETTE.wallRim : (isInnerRim ? PALETTE.wallInner : PALETTE.wallFill)
          setPixel(buf, WIDTH, HEIGHT, px, py, col[0], col[1], col[2])
        }
      } else {
        for (let py = rz0; py < rz0 + wzThick; py++) {
          setPixel(buf, WIDTH, HEIGHT, px, py, floorColor[0], floorColor[1], floorColor[2])
        }
      }
    }

    // South Wall: [rx0, rx1] x [rz1 - wzThick, rz1]
    for (let px = rx0; px < rx1; px++) {
      const curWx = originX + (px / WIDTH) * sizeX
      if (!isDoorCutX(doorsS, curWx)) {
        for (let py = rz1 - wzThick; py < rz1; py++) {
          const isOuterRim = (rz1 - py) <= 4
          const isInnerRim = (py - (rz1 - wzThick)) < 2
          const col = isOuterRim ? PALETTE.wallRim : (isInnerRim ? PALETTE.wallInner : PALETTE.wallFill)
          setPixel(buf, WIDTH, HEIGHT, px, py, col[0], col[1], col[2])
        }
      } else {
        for (let py = rz1 - wzThick; py < rz1; py++) {
          setPixel(buf, WIDTH, HEIGHT, px, py, floorColor[0], floorColor[1], floorColor[2])
        }
      }
    }

    // West Wall: [rx0, rx0 + wxThick] x [rz0, rz1]
    for (let py = rz0; py < rz1; py++) {
      const curWz = originZ + (py / HEIGHT) * sizeZ
      if (!isDoorCutZ(doorsW, curWz)) {
        for (let px = rx0; px < rx0 + wxThick; px++) {
          const isOuterRim = (px - rx0) < 4
          const isInnerRim = (rx0 + wxThick - px) < 2
          const col = isOuterRim ? PALETTE.wallRim : (isInnerRim ? PALETTE.wallInner : PALETTE.wallFill)
          setPixel(buf, WIDTH, HEIGHT, px, py, col[0], col[1], col[2])
        }
      } else {
        for (let px = rx0; px < rx0 + wxThick; px++) {
          setPixel(buf, WIDTH, HEIGHT, px, py, floorColor[0], floorColor[1], floorColor[2])
        }
      }
    }

    // East Wall: [rx1 - wxThick, rx1] x [rz0, rz1]
    for (let py = rz0; py < rz1; py++) {
      const curWz = originZ + (py / HEIGHT) * sizeZ
      if (!isDoorCutZ(doorsE, curWz)) {
        for (let px = rx1 - wxThick; px < rx1; px++) {
          const isOuterRim = (rx1 - px) <= 4
          const isInnerRim = (px - (rx1 - wxThick)) < 2
          const col = isOuterRim ? PALETTE.wallRim : (isInnerRim ? PALETTE.wallInner : PALETTE.wallFill)
          setPixel(buf, WIDTH, HEIGHT, px, py, col[0], col[1], col[2])
        }
      } else {
        for (let px = rx1 - wxThick; px < rx1; px++) {
          setPixel(buf, WIDTH, HEIGHT, px, py, floorColor[0], floorColor[1], floorColor[2])
        }
      }
    }
  }

  // 8. Requirement 2: Render Ribbons (Thin 1m standalone wall lines)
  // Each ribbon: {"id", "from": [x, z], "to": [x, z], "wall": 1, "height": 5, "doors": [...]}
  for (const rb of (layout.ribbons || [])) {
    const fromX = rb.from[0], fromZ = rb.from[1]
    const toX = rb.to[0], toZ = rb.to[1]
    const wallThickM = rb.wall ?? 1.0
    const doors = rb.doors || []

    const dx = toX - fromX
    const dz = toZ - fromZ
    const isAxisZ = Math.abs(dz) >= Math.abs(dx)

    if (isAxisZ) {
      // Ribbon runs along Z at x = fromX
      const centerWx = fromX
      const minWz = Math.min(fromZ, toZ)
      const maxWz = Math.max(fromZ, toZ)

      const px0 = wx2px(centerWx - wallThickM / 2)
      const px1 = wx2px(centerWx + wallThickM / 2)
      const py0 = wz2py(minWz)
      const py1 = wz2py(maxWz)

      for (let py = py0; py <= py1; py++) {
        const curWz = originZ + (py / HEIGHT) * sizeZ
        let inDoor = false
        for (const d of doors) {
          if (Math.abs(curWz - d.at) <= (d.w / 2)) {
            inDoor = true
            break
          }
        }
        if (!inDoor) {
          for (let px = px0; px <= px1; px++) {
            // Pale beige ribbon top along center/edges
            const distFromCenter = Math.abs(px - (px0 + px1) / 2)
            const isRim = distFromCenter <= 3
            const col = isRim ? PALETTE.wallRim : PALETTE.wallFill
            setPixel(buf, WIDTH, HEIGHT, px, py, col[0], col[1], col[2])
          }
        }
      }
    } else {
      // Ribbon runs along X at z = fromZ
      const centerWz = fromZ
      const minWx = Math.min(fromX, toX)
      const maxWx = Math.max(fromX, toX)

      const py0 = wz2py(centerWz - wallThickM / 2)
      const py1 = wz2py(centerWz + wallThickM / 2)
      const px0 = wx2px(minWx)
      const px1 = wx2px(maxWx)

      for (let px = px0; px <= px1; px++) {
        const curWx = originX + (px / WIDTH) * sizeX
        let inDoor = false
        for (const d of doors) {
          if (Math.abs(curWx - d.at) <= (d.w / 2)) {
            inDoor = true
            break
          }
        }
        if (!inDoor) {
          for (let py = py0; py <= py1; py++) {
            const distFromCenter = Math.abs(py - (py0 + py1) / 2)
            const isRim = distFromCenter <= 3
            const col = isRim ? PALETTE.wallRim : PALETTE.wallFill
            setPixel(buf, WIDTH, HEIGHT, px, py, col[0], col[1], col[2])
          }
        }
      }
    }
  }

  // 9. Foliage
  for (const fol of (layout.foliage || [])) {
    if (fol.type === 'tree') {
      const cx = wx2px(fol.x)
      const cy = wz2py(fol.z)
      const radPx = w2pxW(fol.radius || 1.5)
      for (let dy = -radPx; dy <= radPx; dy++) {
        for (let dx = -radPx; dx <= radPx; dx++) {
          const distSq = dx * dx + dy * dy
          if (distSq <= radPx * radPx) {
            const isHighlight = distSq <= (radPx * radPx * 0.4)
            const c = isHighlight ? PALETTE.treeHighlight : PALETTE.treeGreen
            setPixel(buf, WIDTH, HEIGHT, cx + dx, cy + dy, c[0], c[1], c[2])
          }
        }
      }
    } else {
      const x0 = fol.x !== undefined ? wx2px(fol.x - fol.w / 2) : wx2px(fol.x0)
      const y0 = fol.z !== undefined ? wz2py(fol.z - fol.d / 2) : wz2py(fol.z0)
      const rw = fol.w !== undefined ? w2pxW(fol.w) : (wx2px(fol.x1) - x0)
      const rh = fol.d !== undefined ? w2pxH(fol.d) : (wz2py(fol.z1) - y0)
      fillRect(buf, WIDTH, HEIGHT, x0, y0, rw, rh, PALETTE.treeGreen[0], PALETTE.treeGreen[1], PALETTE.treeGreen[2])
      fillRect(buf, WIDTH, HEIGHT, x0 + 4, y0 + 4, rw - 8, rh - 8, PALETTE.treeHighlight[0], PALETTE.treeHighlight[1], PALETTE.treeHighlight[2])
    }
  }

  // 10. Crates
  for (const cr of (layout.crates || [])) {
    const x0 = wx2px(cr.x - cr.w / 2)
    const y0 = wz2py(cr.z - cr.d / 2)
    const rw = w2pxW(cr.w)
    const rh = w2pxH(cr.d)
    const isRadianite = cr.type === 'radianite'
    if (isRadianite) {
      fillRect(buf, WIDTH, HEIGHT, x0, y0, rw, rh, PALETTE.crateBlue[0], PALETTE.crateBlue[1], PALETTE.crateBlue[2])
      fillRect(buf, WIDTH, HEIGHT, x0 + 3, y0 + 3, rw - 6, rh - 6, 20, 80, 105)
      fillRect(buf, WIDTH, HEIGHT, x0, y0, 5, 5, PALETTE.crateCyan[0], PALETTE.crateCyan[1], PALETTE.crateCyan[2])
      fillRect(buf, WIDTH, HEIGHT, x0 + rw - 5, y0, 5, PALETTE.crateCyan[0], PALETTE.crateCyan[1], PALETTE.crateCyan[2])
      fillRect(buf, WIDTH, HEIGHT, x0 + rw - 5, y0 + rh - 5, 5, PALETTE.crateCyan[0], PALETTE.crateCyan[1], PALETTE.crateCyan[2])
      fillRect(buf, WIDTH, HEIGHT, x0, y0 + rh - 5, 5, PALETTE.crateCyan[0], PALETTE.crateCyan[1], PALETTE.crateCyan[2])
    } else {
      fillRect(buf, WIDTH, HEIGHT, x0, y0, rw, rh, PALETTE.crateWood[0], PALETTE.crateWood[1], PALETTE.crateWood[2])
      fillRect(buf, WIDTH, HEIGHT, x0 + 3, y0 + 3, rw - 6, rh - 6, 115, 75, 40)
      fillRect(buf, WIDTH, HEIGHT, x0, y0, 4, 4, PALETTE.crateMetal[0], PALETTE.crateMetal[1], PALETTE.crateMetal[2])
      fillRect(buf, WIDTH, HEIGHT, x0 + rw - 4, y0, 4, PALETTE.crateMetal[0], PALETTE.crateMetal[1], PALETTE.crateMetal[2])
      fillRect(buf, WIDTH, HEIGHT, x0 + rw - 4, y0 + rh - 4, 4, PALETTE.crateMetal[0], PALETTE.crateMetal[1], PALETTE.crateMetal[2])
      fillRect(buf, WIDTH, HEIGHT, x0, y0 + rh - 4, 4, PALETTE.crateMetal[0], PALETTE.crateMetal[1], PALETTE.crateMetal[2])
    }
  }

  // 11. Overlay Yellow X & Cyan Z Blueprint Grid Lines
  for (let c = 0; c <= sizeX; c += 2) {
    const gx = Math.round((c / sizeX) * WIDTH)
    const is10m = (c % 10 === 0)
    const alpha = is10m ? 180 : 110
    const thick = is10m ? 2 : 1
    for (let t = 0; t < thick; t++) {
      const x = gx + t
      if (x < WIDTH) {
        for (let y = 0; y < HEIGHT; y++) {
          setPixel(buf, WIDTH, HEIGHT, x, y, 240, 220, 50, alpha)
        }
      }
    }
  }
  for (let r = 0; r <= sizeZ; r += 2) {
    const gy = Math.round((r / sizeZ) * HEIGHT)
    const is10m = (r % 10 === 0)
    const alpha = is10m ? 180 : 110
    const thick = is10m ? 2 : 1
    for (let t = 0; t < thick; t++) {
      const y = gy + t
      if (y < HEIGHT) {
        for (let x = 0; x < WIDTH; x++) {
          setPixel(buf, WIDTH, HEIGHT, x, y, 40, 230, 240, alpha)
        }
      }
    }
  }

  // 12. Axis Text Labels
  for (let x = originX + 5; x <= originX + sizeX - 5; x += 5) {
    if (x % 10 === 0) {
      const label = `x${x}`
      drawString(buf, WIDTH, HEIGHT, label, wx2px(x) - 15, 4, 3, 255, 235, 40)
    }
  }
  for (let z = originZ + 5; z <= originZ + sizeZ - 5; z += 5) {
    if (z % 10 === 0) {
      const label = `z${z}`
      drawString(buf, WIDTH, HEIGHT, label, 4, wz2py(z) - 10, 3, 40, 240, 255)
    }
  }

  return buf
}

// ── Main Pipeline ───────────────────────────────────────────────
console.log('===============================================================')
console.log('         Palo-IO Layout Renderer & Blueprint Overlay (v2)      ')
console.log('===============================================================')
console.log(`Input : ${path.relative(process.cwd(), inputFile)}`)

let layoutData = null
if (inputFile.endsWith('.json')) {
  layoutData = JSON.parse(fs.readFileSync(inputFile, 'utf8'))
} else {
  console.error('Error: render-layout expects a .json layout structure.')
  process.exit(1)
}

// 1. Decode Reference Image first to obtain exact WIDTH and HEIGHT
console.log(`Loading blueprint reference: ${referenceFile}...`)
const refImg = decodePNG(referenceFile)
WIDTH = refImg.width
HEIGHT = refImg.height
console.log(`Reference canvas dimensions: ${WIDTH} x ${HEIGHT}`)

// 2. Generate Pure Layout Render Buffer
console.log('Rendering JSON layout with defaultFloor and ribbons...')
const layoutBuf = renderLayoutJSON(layoutData)

// Save pure render
const purePng = encodePNG(WIDTH, HEIGHT, layoutBuf)
fs.writeFileSync(pureRenderFile, purePng)
console.log(`✓ Saved pure layout render: ${pureRenderFile} (${(purePng.length / 1024).toFixed(1)} KB)`)

// 3. Create Semi-Transparent Overlay Buffer (55% Layout, 45% Reference)
console.log('Creating semi-transparent layout overlay...')
const overlayBuf = Buffer.alloc(WIDTH * HEIGHT * 4)
const alphaLayout = 0.55
const alphaRef = 0.45

for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    const idx = (y * WIDTH + x) * 4
    const rRef = refImg.data[idx]
    const gRef = refImg.data[idx + 1]
    const bRef = refImg.data[idx + 2]

    const rLay = layoutBuf[idx]
    const gLay = layoutBuf[idx + 1]
    const bLay = layoutBuf[idx + 2]

    overlayBuf[idx] = Math.round(rRef * alphaRef + rLay * alphaLayout)
    overlayBuf[idx + 1] = Math.round(gRef * alphaRef + gLay * alphaLayout)
    overlayBuf[idx + 2] = Math.round(bRef * alphaRef + bLay * alphaLayout)
    overlayBuf[idx + 3] = 255
  }
}

// 4. Create Side-by-Side Composite: [Reference] | [Overlay]
const COMP_W = WIDTH * 2
const COMP_H = HEIGHT
console.log(`Assembling side-by-side composite (${COMP_W} x ${COMP_H})...`)
const compBuf = Buffer.alloc(COMP_W * COMP_H * 4)

for (let y = 0; y < HEIGHT; y++) {
  refImg.data.copy(compBuf, (y * COMP_W) * 4, y * WIDTH * 4, (y + 1) * WIDTH * 4)
  overlayBuf.copy(compBuf, (y * COMP_W + WIDTH) * 4, y * WIDTH * 4, (y + 1) * WIDTH * 4)
}

// Separator border between panels
for (let y = 0; y < HEIGHT; y++) {
  for (let dx = -2; dx <= 2; dx++) {
    const idx = (y * COMP_W + (WIDTH + dx)) * 4
    compBuf[idx] = 255
    compBuf[idx + 1] = 230
    compBuf[idx + 2] = 50
    compBuf[idx + 3] = 255
  }
}

// Header Labels
drawString(compBuf, COMP_W, COMP_H, `REFERENCE BLUEPRINT (${chunkBase.toUpperCase()})`, 50, 20, 4, 255, 235, 40)
drawString(compBuf, COMP_W, COMP_H, `${chunkBase.toUpperCase()} JSON OVERLAY (55% BLEND)`, WIDTH + 50, 20, 4, 40, 240, 255)

// 5. Encode Composite to PNG
console.log('Encoding composite PNG...')
const overlayPng = encodePNG(COMP_W, COMP_H, compBuf)
fs.writeFileSync(outputFile, overlayPng)
if (legacyOverlayFile) {
  fs.writeFileSync(legacyOverlayFile, overlayPng)
  console.log(`✓ Updated legacy overlay: ${legacyOverlayFile}`)
}
console.log(`✓ Saved overlay comparison: ${outputFile} (${(overlayPng.length / 1024).toFixed(1)} KB)`)
console.log(`✓ Updated legacy overlay: ${legacyOverlayFile}`)
console.log('===============================================================')
