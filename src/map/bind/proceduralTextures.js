import * as THREE from 'three'

/**
 * Procedural Pixel Texture Generators (16–32px, Nearest filtering, no metalness)
 * Conforming to docs/map/BIND_BLUEPRINT.md section 8.
 */

function parseHex(hex) {
  if (typeof hex === 'number') {
    return [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255]
  }
  const clean = hex.replace('#', '')
  const num = parseInt(clean, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function clampByte(val) {
  return Math.max(0, Math.min(255, Math.round(val)))
}

function hexFromRgb(r, g, b) {
  return `rgb(${clampByte(r)}, ${clampByte(g)}, ${clampByte(b)})`
}

// Pseudo-random deterministic hash for pixel grain
function pnoise(x, y, seed = 42) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453
  return n - Math.floor(n)
}

function makeCanvas(size = 32) {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  return canvas
}

function buildTexture(canvas, repeatX = 1, repeatY = 1) {
  if (!canvas) return null
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  texture.repeat.set(repeatX, repeatY)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.generateMipmaps = false
  return texture
}

/**
 * 1. Stone Floor Tiles Texture (32x32 px)
 * Tile size 1 m (16x16 px in 2m repeat), grout only ~20% darker than tile, +-4% brightness noise.
 */
export function createStoneFloorTexture(baseHex, groutHex = null, size = 32) {
  const canvas = makeCanvas(size)
  if (!canvas) return null
  const ctx = canvas.getContext('2d')
  const [br, bg, bb] = parseHex(baseHex)

  const tileSize = 16 // 1 m tile in a 2 m (32 px) repeat = 2x2 tiles
  for (let ty = 0; ty < size; ty += tileSize) {
    for (let tx = 0; tx < size; tx += tileSize) {
      // Subtle per-tile brightness noise of +-4%
      const noiseFactor = 1.0 + (pnoise(tx, ty, 101) * 2 - 1) * 0.04
      const tr = clampByte(br * noiseFactor)
      const tg = clampByte(bg * noiseFactor)
      const tb = clampByte(bb * noiseFactor)

      // Grout color only ~20% darker than the tile (not black)
      const [gr, gg, gb] = groutHex
        ? parseHex(groutHex)
        : [clampByte(tr * 0.80), clampByte(tg * 0.80), clampByte(tb * 0.80)]

      for (let dy = 0; dy < tileSize; dy++) {
        for (let dx = 0; dx < tileSize; dx++) {
          const x = tx + dx
          const y = ty + dy
          // 1 px grout line at top and left of tile
          const isGrout = (dx === 0 || dy === 0)
          if (isGrout) {
            ctx.fillStyle = hexFromRgb(gr, gg, gb)
          } else {
            const grain = (pnoise(x, y, 7) - 0.5) * 6
            ctx.fillStyle = hexFromRgb(tr + grain, tg + grain, tb + grain)
          }
          ctx.fillRect(x, y, 1, 1)
        }
      }
    }
  }
  return buildTexture(canvas, 1, 1)
}

/**
 * Common running-bond brick texture generator (32x32 px).
 * 1 course = 0.25 m high (4 px in 32 px), 0.5 m long (8 px in 32 px), 2 m x 2 m repeat.
 * Mortar lines 1 px in 32 px texture, mortar color only ~15% darker than the brick.
 */
function createBrickTexture(baseHex, mortarHex = null, size = 32, seed = 55) {
  const canvas = makeCanvas(size)
  if (!canvas) return null
  const ctx = canvas.getContext('2d')
  const [br, bg, bb] = parseHex(baseHex)

  // Default mortar: only ~15% darker than brick
  const [mr, mg, mb] = mortarHex
    ? parseHex(mortarHex)
    : [clampByte(br * 0.85), clampByte(bg * 0.85), clampByte(bb * 0.85)]

  const courseHeight = 4 // 8 courses in 32 px (0.25 m high in 2 m repeat)
  const brickLength = 8  // 4 bricks in 32 px (0.5 m long in 2 m repeat)

  for (let row = 0; row < 8; row++) {
    const y0 = row * courseHeight
    const offset = (row % 2 === 1) ? 4 : 0 // running bond shift by half-brick

    for (let col = 0; col < 5; col++) {
      const x0 = (col * brickLength + offset) % size
      const blockHash = (pnoise(row, col, seed) - 0.5) * 8

      for (let dy = 0; dy < courseHeight; dy++) {
        for (let dx = 0; dx < brickLength; dx++) {
          const px = (x0 + dx) % size
          const py = y0 + dy
          // 1 px mortar line at top and left of brick
          const isMortar = (dy === 0 || dx === 0)

          if (isMortar) {
            ctx.fillStyle = hexFromRgb(mr, mg, mb)
          } else {
            const grain = (pnoise(px, py, 13) - 0.5) * 5
            ctx.fillStyle = hexFromRgb(br + blockHash + grain, bg + blockHash + grain, bb + blockHash + grain)
          }
          ctx.fillRect(px, py, 1, 1)
        }
      }
    }
  }
  return buildTexture(canvas, 1, 1)
}

/**
 * 2. Sandstone Wall Texture (32x32 px)
 * Brick courses: 0.25 m high x 0.5 m long, 1 px mortar 15% darker than brick.
 */
export function createSandstoneTexture(baseHex = '#c9b08a', mortarHex = null, size = 32) {
  return createBrickTexture(baseHex, mortarHex, size, 88)
}

/**
 * 3. Plaster Wall Texture (32x32 px)
 * Soft Mediterranean stucco/plaster with gentle fine stippling.
 */
export function createPlasterTexture(baseHex = '#d8cfc0', grainHex = null, size = 32) {
  const canvas = makeCanvas(size)
  if (!canvas) return null
  const ctx = canvas.getContext('2d')
  const [br, bg, bb] = parseHex(baseHex)

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const grain = (pnoise(x, y, 99) - 0.5) * 12
      const patch = (Math.sin(x * 0.2) + Math.cos(y * 0.2)) * 3
      ctx.fillStyle = hexFromRgb(br + grain + patch, bg + grain + patch, bb + grain + patch)
      ctx.fillRect(x, y, 1, 1)
    }
  }
  return buildTexture(canvas, 1, 1)
}

/**
 * 4. Terracotta Brick Wall Texture (32x32 px)
 * Brick courses: 0.25 m high x 0.5 m long, 1 px mortar 15% darker than brick.
 */
export function createTerracottaTexture(baseHex = '#b8654a', mortarHex = null, size = 32) {
  return createBrickTexture(baseHex, mortarHex, size, 55)
}

/**
 * 5. Wood Plank Texture (32x32 px)
 * Horizontal wood planks with grain lines and soft seams (e.g. for roof underside, L1 floors & trim).
 */
export function createWoodPlankTexture(baseHex = '#a07850', seamHex = null, size = 32) {
  const canvas = makeCanvas(size)
  if (!canvas) return null
  const ctx = canvas.getContext('2d')
  const [br, bg, bb] = parseHex(baseHex)
  const [sr, sg, sb] = seamHex
    ? parseHex(seamHex)
    : [clampByte(br * 0.75), clampByte(bg * 0.75), clampByte(bb * 0.75)]

  const plankH = 8 // 4 planks in 32px
  for (let p = 0; p < 4; p++) {
    const y0 = p * plankH
    const plankTint = (pnoise(p, 0, 77) - 0.5) * 12

    for (let dy = 0; dy < plankH; dy++) {
      const isSeam = (dy === 0)
      for (let x = 0; x < size; x++) {
        if (isSeam) {
          ctx.fillStyle = hexFromRgb(sr, sg, sb)
        } else {
          // Horizontal grain streaks
          const grain = (Math.sin(x * 0.8 + p * 3.14) > 0.4 ? 4 : -3) + (pnoise(x, dy, 33) - 0.5) * 4
          ctx.fillStyle = hexFromRgb(br + plankTint + grain, bg + plankTint + grain, bb + plankTint + grain)
        }
        ctx.fillRect(x, y0 + dy, 1, 1)
      }
    }
  }
  return buildTexture(canvas, 1, 1)
}

/**
 * 6. Roof Tile Texture (32x32 px)
 * Blue-gray roof tiles with beveled edge and subtle shadow line.
 */
export function createRoofTileTexture(baseHex = '#5d7388', darkHex = '#3b4c5c', size = 32) {
  const canvas = makeCanvas(size)
  if (!canvas) return null
  const ctx = canvas.getContext('2d')
  const [br, bg, bb] = parseHex(baseHex)
  const [dr, dg, db] = parseHex(darkHex)

  const tileH = 8
  for (let r = 0; r < 4; r++) {
    const y0 = r * tileH
    const xOff = (r % 2 === 1) ? 8 : 0

    for (let c = 0; c < 3; c++) {
      const x0 = (c * 16 + xOff) % size
      const tileHash = (pnoise(r, c, 63) - 0.5) * 12

      for (let dy = 0; dy < tileH; dy++) {
        for (let dx = 0; dx < 16; dx++) {
          const px = (x0 + dx) % size
          const py = y0 + dy
          const isBottomShadow = (dy === tileH - 1 || dy === tileH - 2)
          const isTopHighlight = (dy === 0)

          if (isBottomShadow) {
            ctx.fillStyle = hexFromRgb(dr, dg, db)
          } else if (isTopHighlight) {
            ctx.fillStyle = hexFromRgb(br + 18, bg + 18, bb + 18)
          } else {
            const grain = (pnoise(px, py, 41) - 0.5) * 6
            ctx.fillStyle = hexFromRgb(br + tileHash + grain, bg + tileHash + grain, bb + tileHash + grain)
          }
          ctx.fillRect(px, py, 1, 1)
        }
      }
    }
  }
  return buildTexture(canvas, 1, 1)
}

/**
 * 7. Trim Band Texture (32x32 px)
 * Dark architectural molding band with bevel highlights and shadows.
 */
export function createTrimTexture(baseHex, darkHex, size = 32) {
  const canvas = makeCanvas(size)
  if (!canvas) return null
  const ctx = canvas.getContext('2d')
  const [br, bg, bb] = parseHex(baseHex)
  const [dr, dg, db] = parseHex(darkHex)

  for (let y = 0; y < size; y++) {
    const isTopBevel = (y <= 2)
    const isBottomGroove = (y >= size - 3)

    for (let x = 0; x < size; x++) {
      const grain = (pnoise(x, y, 17) - 0.5) * 6
      if (isTopBevel) {
        ctx.fillStyle = hexFromRgb(br + 22, bg + 22, bb + 22)
      } else if (isBottomGroove) {
        ctx.fillStyle = hexFromRgb(dr - 10, dg - 10, db - 10)
      } else {
        ctx.fillStyle = hexFromRgb(br + grain, bg + grain, bb + grain)
      }
      ctx.fillRect(x, y, 1, 1)
    }
  }
  return buildTexture(canvas, 1, 1)
}
