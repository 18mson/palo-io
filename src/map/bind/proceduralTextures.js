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

/**
 * 8. Crate Texture (32x32 px)
 * Wooden planks with darker perimeter frame and corner iron brackets.
 */
export function createCrateTexture(baseHex = '#8c7355', darkHex = '#574229', size = 32) {
  const canvas = makeCanvas(size)
  if (!canvas) return null
  const ctx = canvas.getContext('2d')
  const [br, bg, bb] = parseHex(baseHex)
  const [dr, dg, db] = parseHex(darkHex)

  // 1. Draw horizontal planks base
  const plankH = 8
  for (let y = 0; y < size; y++) {
    const p = Math.floor(y / plankH)
    const isSeam = (y % plankH === 0)
    for (let x = 0; x < size; x++) {
      if (isSeam) {
        ctx.fillStyle = hexFromRgb(dr, dg, db)
      } else {
        const grain = (pnoise(x, y, 51) - 0.5) * 8
        ctx.fillStyle = hexFromRgb(br + grain, bg + grain, bb + grain)
      }
      ctx.fillRect(x, y, 1, 1)
    }
  }

  // 2. Darker outer border frame (2px)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const isBorder = (x < 2 || x >= size - 2 || y < 2 || y >= size - 2)
      if (isBorder) {
        const grain = (pnoise(x, y, 73) - 0.5) * 6
        ctx.fillStyle = hexFromRgb(dr + grain, dg + grain, db + grain)
        ctx.fillRect(x, y, 1, 1)
      }
    }
  }

  return buildTexture(canvas, 1, 1)
}

/**
 * 9. Steel Shipping Container Texture (32x32 px)
 * Corrugated vertical ridges with subtle metallic highlight and shadow groove.
 */
export function createContainerTexture(baseHex = '#2f5a6b', ribHex = '#1e3d4a', size = 32) {
  const canvas = makeCanvas(size)
  if (!canvas) return null
  const ctx = canvas.getContext('2d')
  const [br, bg, bb] = parseHex(baseHex)
  const [rr, rg, rb] = parseHex(ribHex)

  // Vertical corrugated wave: 4 px cycle (1 highlight, 1 flat, 1 shadow, 1 groove)
  for (let x = 0; x < size; x++) {
    const phase = x % 4
    let r = br, g = bg, b = bb
    if (phase === 0) {
      r = clampByte(br + 22)
      g = clampByte(bg + 22)
      b = clampByte(bb + 22)
    } else if (phase === 1) {
      r = br; g = bg; b = bb
    } else if (phase === 2) {
      r = rr; g = rg; b = rb
    } else {
      r = clampByte(rr - 15)
      g = clampByte(rg - 15)
      b = clampByte(rb - 15)
    }

    for (let y = 0; y < size; y++) {
      const isTopBottomFrame = (y < 2 || y >= size - 2)
      if (isTopBottomFrame) {
        ctx.fillStyle = hexFromRgb(rr - 10, rg - 10, rb - 10)
      } else {
        const grain = (pnoise(x, y, 99) - 0.5) * 5
        ctx.fillStyle = hexFromRgb(r + grain, g + grain, b + grain)
      }
      ctx.fillRect(x, y, 1, 1)
    }
  }

  return buildTexture(canvas, 1, 1)
}

/**
 * 10. Water Plane Texture (32x32 px)
 * Cyan / turquoise fountain water with soft ripple foam lines.
 */
export function createWaterTexture(size = 32) {
  const canvas = makeCanvas(size)
  if (!canvas) return null
  const ctx = canvas.getContext('2d')

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const wave = Math.sin((x + y * 0.5) * 0.6) + Math.cos((x * 0.7 - y) * 0.5)
      let r, g, b
      if (wave > 1.2) {
        // Soft white-cyan ripple crest
        r = 160; g = 230; b = 250
      } else if (wave > 0.2) {
        // Bright turquoise water
        r = 0; g = 180; b = 216
      } else {
        // Deep cyan shadow
        r = 0; g = 119; b = 182
      }
      ctx.fillStyle = hexFromRgb(r, g, b)
      ctx.fillRect(x, y, 1, 1)
    }
  }

  return buildTexture(canvas, 2, 2)
}

/**
 * 11. Ivy Foliage Texture (32x32 px with Alpha)
 * Clustered pixel vines and leaves with transparent background.
 */
export function createIvyTexture(size = 32) {
  const canvas = makeCanvas(size)
  if (!canvas) return null
  const ctx = canvas.getContext('2d')

  // Transparent clear
  ctx.clearRect(0, 0, size, size)

  // Generate organic leaf clusters
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n1 = pnoise(x * 0.3, y * 0.3, 12)
      const n2 = pnoise(x * 0.15, y * 0.2, 45)
      const isLeaf = (n1 > 0.42 && n2 > 0.35) || (Math.sin(x * 0.8 + y * 0.5) > 0.6 && n1 > 0.3)

      if (isLeaf) {
        const shade = pnoise(x, y, 88)
        if (shade > 0.65) {
          ctx.fillStyle = 'rgba(76, 175, 80, 0.95)' // bright leaf green
        } else if (shade > 0.3) {
          ctx.fillStyle = 'rgba(46, 125, 50, 0.95)' // medium forest green
        } else {
          ctx.fillStyle = 'rgba(27, 94, 32, 0.95)'  // deep dark green
        }
        ctx.fillRect(x, y, 1, 1)
      } else if (n1 > 0.38 && n2 > 0.45 && Math.random() < 0.2) {
        // Thin brown stem
        ctx.fillStyle = 'rgba(78, 52, 46, 0.9)'
        ctx.fillRect(x, y, 1, 1)
      }
    }
  }

  const texture = buildTexture(canvas, 1, 1)
  if (texture) {
    texture.format = THREE.RGBAFormat
  }
  return texture
}

/**
 * 12. Plant Site Banner Texture (64x64 px)
 * Woven fabric banner with decorative border and site emblem ('A', 'B', 'attacker', 'defender').
 */
export function createBannerTexture(site = 'A', size = 64) {
  const canvas = makeCanvas(size)
  if (!canvas) return null
  const ctx = canvas.getContext('2d')

  let baseBg, accent, gold, label
  if (site === 'attacker') {
    baseBg = [68, 22, 22]       // Deep crimson
    accent = [239, 68, 68]      // Bright red
    gold   = [245, 158, 11]     // Warm gold border
    label  = 'ATK'
  } else if (site === 'defender') {
    baseBg = [20, 35, 60]       // Deep navy
    accent = [59, 130, 246]     // Bright blue
    gold   = [203, 213, 225]    // Silver/steel border
    label  = 'DEF'
  } else if (site === 'A') {
    baseBg = [15, 23, 42]       // Deep slate blue
    accent = [0, 212, 255]      // Bright cyan
    gold   = [56, 189, 248]
    label  = 'A'
  } else {
    baseBg = [41, 25, 12]       // Dark mahogany
    accent = [245, 158, 11]     // Bright amber
    gold   = [251, 191, 36]
    label  = 'B'
  }

  // Fabric background with fine vertical thread weave
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const thread = (x % 2 === 0 ? 6 : -6) + (pnoise(x, y, 14) - 0.5) * 8
      ctx.fillStyle = hexFromRgb(baseBg[0] + thread, baseBg[1] + thread, baseBg[2] + thread)
      ctx.fillRect(x, y, 1, 1)
    }
  }

  // Gold decorative border (3 px)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const isBorder = (x >= 4 && x <= 6) || (x >= size - 7 && x <= size - 5) ||
                       (y >= 4 && y <= 6) || (y >= size - 8 && y <= size - 6)
      if (isBorder) {
        ctx.fillStyle = hexFromRgb(gold[0], gold[1], gold[2])
        ctx.fillRect(x, y, 1, 1)
      }
    }
  }

  // Draw Site Emblem in Center
  ctx.fillStyle = hexFromRgb(accent[0], accent[1], accent[2])
  ctx.font = (label.length > 1) ? 'bold 22px monospace' : 'bold 34px monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, size * 0.5, size * 0.48)

  // Decorative diamond underneath
  const midX = size * 0.5
  const midY = size * 0.76
  for (let dy = -4; dy <= 4; dy++) {
    const span = 4 - Math.abs(dy)
    for (let dx = -span; dx <= span; dx++) {
      ctx.fillRect(midX + dx, midY + dy, 1, 1)
    }
  }

  return buildTexture(canvas, 1, 1)
}

/**
 * 12b. Hanging Door Sign Texture (32x32 px)
 * Weathered wood or enamel sign for Market and Teleporter entries.
 */
export function createSignTexture(type = 'market', size = 32) {
  const canvas = makeCanvas(size)
  if (!canvas) return null
  const ctx = canvas.getContext('2d')

  if (type === 'market') {
    // Terracotta and parchment bazaar market sign
    ctx.fillStyle = '#4a2618' // dark wood rim
    ctx.fillRect(0, 0, size, size)
    ctx.fillStyle = '#b8654a' // terracotta body
    ctx.fillRect(2, 2, size - 4, size - 4)
    ctx.fillStyle = '#e8d8be' // parchment center
    ctx.fillRect(4, 4, size - 8, size - 8)

    // Stylized market stall canopy symbol in center
    ctx.fillStyle = '#7a3520'
    ctx.fillRect(8, 10, 16, 4)
    ctx.fillRect(10, 14, 12, 8)
    ctx.fillStyle = '#e0b050'
    ctx.fillRect(10, 11, 4, 3)
    ctx.fillRect(18, 11, 4, 3)
  } else {
    // Glowing portal glyph on obsidian plate
    ctx.fillStyle = '#181b22' // obsidian/slate frame
    ctx.fillRect(0, 0, size, size)
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(2, 2, size - 4, size - 4)

    // Concentric glowing cyan portal rings
    ctx.fillStyle = '#0284c7'
    ctx.beginPath()
    ctx.arc(size * 0.5, size * 0.5, 9, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#38bdf8'
    ctx.beginPath()
    ctx.arc(size * 0.5, size * 0.5, 6, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#f0f9ff'
    ctx.beginPath()
    ctx.arc(size * 0.5, size * 0.5, 3, 0, Math.PI * 2)
    ctx.fill()
  }

  return buildTexture(canvas, 1, 1)
}

/**
 * 13. Market Awning Striped Canopy Texture (32x32 px)
 * Alternating gold-yellow and cream stripes with soft shadow bevel.
 */
export function createAwningTexture(color1 = '#e0b050', color2 = '#f5eedb', size = 32) {
  const canvas = makeCanvas(size)
  if (!canvas) return null
  const ctx = canvas.getContext('2d')
  const [c1r, c1g, c1b] = parseHex(color1)
  const [c2r, c2g, c2b] = parseHex(color2)

  const stripeW = 8 // 4 stripes per 32 px
  for (let x = 0; x < size; x++) {
    const isStripe1 = Math.floor(x / stripeW) % 2 === 0
    const [br, bg, bb] = isStripe1 ? [c1r, c1g, c1b] : [c2r, c2g, c2b]

    for (let y = 0; y < size; y++) {
      // Gentle shadow at edge of each stripe
      const edgeDist = Math.min(x % stripeW, stripeW - 1 - (x % stripeW))
      const shadow = (edgeDist === 0) ? -18 : (edgeDist === 1 ? -8 : 0)
      const grain = (pnoise(x, y, 31) - 0.5) * 5

      ctx.fillStyle = hexFromRgb(br + shadow + grain, bg + shadow + grain, bb + shadow + grain)
      ctx.fillRect(x, y, 1, 1)
    }
  }

  return buildTexture(canvas, 1, 1)
}

/**
 * 14. Foliage Texture (32x32 px)
 * Organic green clusters for bushes and trees.
 */
export function createFoliageTexture(size = 32) {
  const canvas = makeCanvas(size)
  if (!canvas) return null
  const ctx = canvas.getContext('2d')

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = pnoise(x * 0.25, y * 0.25, 77)
      let r = 46, g = 125, b = 50
      if (n > 0.7) {
        r = 76; g = 175; b = 80 // bright leaf
      } else if (n > 0.35) {
        r = 46; g = 125; b = 50 // medium leaf
      } else {
        r = 27; g = 94; b = 32   // deep shadow leaf
      }
      const grain = (pnoise(x, y, 92) - 0.5) * 8
      ctx.fillStyle = hexFromRgb(r + grain, g + grain, b + grain)
      ctx.fillRect(x, y, 1, 1)
    }
  }

  return buildTexture(canvas, 1, 1)
}
