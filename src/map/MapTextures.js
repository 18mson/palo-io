import * as THREE from 'three'

/**
 * Procedural 16-32px Pixel-Style Canvas Textures for Voxel / Tactical Look
 * Uses nearest neighbor filtering (THREE.NearestFilter) for crisp, clean pixel art.
 */

function makePixelTexture(canvas) {
  const tex = new THREE.CanvasTexture(canvas)
  tex.magFilter = THREE.NearestFilter
  tex.minFilter = THREE.NearestFilter
  tex.generateMipmaps = false
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  return tex
}

export function createFloorTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  // Grout mortar base
  ctx.fillStyle = '#7c6f62'
  ctx.fillRect(0, 0, 32, 32)

  // 4x4 stone flagstone pavers (each 8x8 minus 1px grout)
  const tones = ['#f4ede2', '#ebdccb', '#f7f1e6', '#e7dabf', '#efe5d6', '#e2d3be']
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const x = c * 8
      const y = r * 8
      const col = tones[(r * 3 + c * 5) % tones.length]
      ctx.fillStyle = col
      ctx.fillRect(x + 1, y + 1, 6, 6)

      // 1px beveled sunlight highlight top/left
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(x + 1, y + 1, 6, 1)
      ctx.fillRect(x + 1, y + 1, 1, 6)

      // 1px bevel shadow bottom/right
      ctx.fillStyle = '#b8a692'
      ctx.fillRect(x + 1, y + 6, 6, 1)
      ctx.fillRect(x + 6, y + 1, 1, 6)
    }
  }

  // Tactical lane dashes
  ctx.fillStyle = '#f59e0b'
  ctx.fillRect(0, 15, 4, 2)
  ctx.fillRect(8, 15, 4, 2)
  ctx.fillRect(16, 15, 4, 2)
  ctx.fillRect(24, 15, 4, 2)

  return makePixelTexture(canvas)
}

export function createWallTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  // Mortar base
  ctx.fillStyle = '#6b5a49'
  ctx.fillRect(0, 0, 32, 32)

  // 4 brick courses (each 8px high)
  const shades = ['#cbb497', '#bea88b', '#d6c0a5', '#b69e82', '#cdb69b']
  for (let row = 0; row < 4; row++) {
    const y = row * 8
    const offset = (row % 2 === 1) ? 8 : 0
    for (let x = -8 + offset; x < 32; x += 16) {
      const idx = Math.abs((x + row * 7)) % shades.length
      ctx.fillStyle = shades[idx]
      ctx.fillRect(x + 1, y + 1, 14, 6)

      // Top highlight
      ctx.fillStyle = '#dfccaF'
      ctx.fillRect(x + 1, y + 1, 14, 1)
      // Bottom shadow
      ctx.fillStyle = '#9b846c'
      ctx.fillRect(x + 1, y + 6, 14, 1)
    }
  }

  return makePixelTexture(canvas)
}

export function createBrickTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  // Mortar base
  ctx.fillStyle = '#543026'
  ctx.fillRect(0, 0, 32, 32)

  const brickShades = ['#b85842', '#a84c37', '#c46650', '#9c3f2b']
  for (let row = 0; row < 4; row++) {
    const y = row * 8
    const offset = (row % 2 === 1) ? 8 : 0
    for (let x = -8 + offset; x < 32; x += 16) {
      const idx = Math.abs((x + row * 5)) % brickShades.length
      ctx.fillStyle = brickShades[idx]
      ctx.fillRect(x + 1, y + 1, 14, 6)

      // Top highlight
      ctx.fillStyle = '#d2755e'
      ctx.fillRect(x + 1, y + 1, 14, 1)
      // Bottom shadow
      ctx.fillStyle = '#7a3322'
      ctx.fillRect(x + 1, y + 6, 14, 1)
    }
  }

  return makePixelTexture(canvas)
}

export function createAccentPavementTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  // Joint base
  ctx.fillStyle = '#8a7d6e'
  ctx.fillRect(0, 0, 32, 32)

  // 2x2 large chiselled stone slabs (each 16x16 minus 1px joint)
  const tones = ['#f4ede4', '#eae2d6', '#eee5da', '#e4dcd0']
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      const x = c * 16
      const y = r * 16
      ctx.fillStyle = tones[(r * 2 + c) % tones.length]
      ctx.fillRect(x + 1, y + 1, 14, 14)

      // Top/left highlight
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(x + 1, y + 1, 14, 1)
      ctx.fillRect(x + 1, y + 1, 1, 14)

      // Bottom/right shadow
      ctx.fillStyle = '#bab0a2'
      ctx.fillRect(x + 1, y + 14, 14, 1)
      ctx.fillRect(x + 14, y + 1, 1, 14)
    }
  }

  return makePixelTexture(canvas)
}

export function createPagodaWoodTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  // Seam line background
  ctx.fillStyle = '#3a1b0b'
  ctx.fillRect(0, 0, 32, 32)

  // 4 vertical timber planks (each 8px wide)
  const woods = ['#8d4d29', '#7e411f', '#9a5933', '#703818']
  for (let col = 0; col < 4; col++) {
    const x = col * 8
    ctx.fillStyle = woods[col]
    ctx.fillRect(x + 1, 0, 6, 32)

    // Wood grain lines
    ctx.fillStyle = '#5c2d13'
    ctx.fillRect(x + 3, 0, 1, 32)

    // Highlight edge
    ctx.fillStyle = '#aa663e'
    ctx.fillRect(x + 1, 0, 1, 32)
  }

  return makePixelTexture(canvas)
}

export function createAsianRoofTileTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  // Tile grout base
  ctx.fillStyle = '#1e2933'
  ctx.fillRect(0, 0, 32, 32)

  // 4 rows of scalloped curved tiles (each 8px high)
  for (let r = 0; r < 4; r++) {
    const y = r * 8
    for (let c = 0; c < 4; c++) {
      const x = c * 8
      ctx.fillStyle = '#334654'
      ctx.fillRect(x, y + 1, 8, 6)

      // Tile curve highlight
      ctx.fillStyle = '#567389'
      ctx.fillRect(x + 1, y + 1, 6, 2)

      // Tile under-shadow
      ctx.fillStyle = '#22303b'
      ctx.fillRect(x, y + 6, 8, 1)
    }
  }

  return makePixelTexture(canvas)
}

export function createWaterTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 16
  canvas.height = 16
  const ctx = canvas.getContext('2d')

  // Vibrant turquoise canal base
  ctx.fillStyle = '#0288d1'
  ctx.fillRect(0, 0, 16, 16)

  // Pixel ripple pattern
  ctx.fillStyle = '#29b6f6'
  ctx.fillRect(2, 2, 4, 2)
  ctx.fillRect(10, 4, 4, 2)
  ctx.fillRect(4, 10, 5, 2)
  ctx.fillRect(11, 12, 3, 2)

  // Light cyan shimmer pixels
  ctx.fillStyle = '#80deea'
  ctx.fillRect(3, 2, 2, 1)
  ctx.fillRect(11, 4, 2, 1)
  ctx.fillRect(5, 10, 2, 1)

  // Deep shadow ripples
  ctx.fillStyle = '#01579b'
  ctx.fillRect(2, 4, 4, 1)
  ctx.fillRect(10, 6, 4, 1)
  ctx.fillRect(4, 12, 5, 1)

  return makePixelTexture(canvas)
}

export function createWoodCrateTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  // Dark border frame
  ctx.fillStyle = '#543116'
  ctx.fillRect(0, 0, 32, 32)

  // Inner wooden planks
  ctx.fillStyle = '#8a5629'
  ctx.fillRect(3, 3, 26, 26)

  // Plank divider horizontal lines
  ctx.fillStyle = '#6e411b'
  ctx.fillRect(3, 11, 26, 2)
  ctx.fillRect(3, 19, 26, 2)

  // Diagonal brace
  ctx.fillStyle = '#7a481f'
  for (let i = 4; i < 28; i++) {
    ctx.fillRect(i, i, 2, 2)
  }

  // Steel corner brackets
  ctx.fillStyle = '#334155'
  ctx.fillRect(0, 0, 4, 4)
  ctx.fillRect(28, 0, 4, 4)
  ctx.fillRect(0, 28, 4, 4)
  ctx.fillRect(28, 28, 4, 4)

  // Rivet dots
  ctx.fillStyle = '#94a3b8'
  ctx.fillRect(1, 1, 2, 2)
  ctx.fillRect(29, 1, 2, 2)
  ctx.fillRect(1, 29, 2, 2)
  ctx.fillRect(29, 29, 2, 2)

  return makePixelTexture(canvas)
}

export function createRadianiteTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  // Outer carbon casing
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, 32, 32)

  // Inner dark emerald containment chamber
  ctx.fillStyle = '#064e3b'
  ctx.fillRect(3, 3, 26, 26)

  // Glowing Radianite crystal center
  ctx.fillStyle = '#059669'
  ctx.fillRect(7, 7, 18, 18)

  ctx.fillStyle = '#10b981'
  ctx.fillRect(10, 10, 12, 12)

  // Core brilliant diamond
  ctx.fillStyle = '#6ee7b7'
  ctx.fillRect(13, 13, 6, 6)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(14, 14, 4, 4)

  // Energy circuit trace lines
  ctx.fillStyle = '#34d399'
  ctx.fillRect(15, 3, 2, 4)
  ctx.fillRect(15, 25, 2, 4)
  ctx.fillRect(3, 15, 4, 2)
  ctx.fillRect(25, 15, 4, 2)

  return makePixelTexture(canvas)
}

export function createMarketAwningTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  // 4 alternating vertical stripes
  ctx.fillStyle = '#dc2626'
  ctx.fillRect(0, 0, 32, 32)

  ctx.fillStyle = '#fef3c7'
  ctx.fillRect(8, 0, 8, 32)
  ctx.fillRect(24, 0, 8, 32)

  // Subtle bottom fringe shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
  ctx.fillRect(0, 30, 32, 2)

  return makePixelTexture(canvas)
}

export function createRoofTileTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#78350f'
  ctx.fillRect(0, 0, 32, 32)

  for (let r = 0; r < 4; r++) {
    const y = r * 8
    ctx.fillStyle = '#92400e'
    ctx.fillRect(0, y + 1, 32, 6)
    ctx.fillStyle = '#b45309'
    ctx.fillRect(0, y + 1, 32, 2)
    ctx.fillStyle = '#451a03'
    ctx.fillRect(0, y + 7, 32, 1)
  }

  return makePixelTexture(canvas)
}

export function createStoneStairsTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#78695c'
  ctx.fillRect(0, 0, 32, 32)

  for (let r = 0; r < 4; r++) {
    const y = r * 8
    // Tread
    ctx.fillStyle = '#eae2d5'
    ctx.fillRect(0, y + 1, 32, 5)
    // Brass safety bullnose strip
    ctx.fillStyle = '#f59e0b'
    ctx.fillRect(0, y + 1, 32, 1)
    // Riser shadow
    ctx.fillStyle = '#5c4e43'
    ctx.fillRect(0, y + 6, 32, 2)
  }

  return makePixelTexture(canvas)
}

export function createWoodStairsTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#3a1b0b'
  ctx.fillRect(0, 0, 32, 32)

  for (let r = 0; r < 4; r++) {
    const y = r * 8
    // Wood plank tread
    ctx.fillStyle = '#8d4d29'
    ctx.fillRect(0, y + 1, 32, 5)
    // Highlight lip
    ctx.fillStyle = '#aa663e'
    ctx.fillRect(0, y + 1, 32, 1)
    // Riser shadow
    ctx.fillStyle = '#5c2d13'
    ctx.fillRect(0, y + 6, 32, 2)
  }

  return makePixelTexture(canvas)
}

export function createCobblestoneTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#42372f'
  ctx.fillRect(0, 0, 32, 32)

  const stones = ['#8f8174', '#7d7064', '#9d8f82', '#6c6055']
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const x = c * 8
      const y = r * 8
      ctx.fillStyle = stones[(r * 3 + c * 5) % stones.length]
      ctx.fillRect(x + 1, y + 1, 6, 6)

      // Rounded pixel corners
      ctx.fillStyle = '#42372f'
      ctx.fillRect(x + 1, y + 1, 1, 1)
      ctx.fillRect(x + 6, y + 1, 1, 1)
      ctx.fillRect(x + 1, y + 6, 1, 1)
      ctx.fillRect(x + 6, y + 6, 1, 1)
    }
  }

  return makePixelTexture(canvas)
}

export function createTerracottaTileTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#632918'
  ctx.fillRect(0, 0, 32, 32)

  const tiles = ['#c76342', '#b35535', '#d1704f']
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const x = c * 8
      const y = r * 8
      ctx.fillStyle = tiles[(r * 2 + c) % tiles.length]
      ctx.fillRect(x + 1, y + 1, 6, 6)
      ctx.fillStyle = '#df8364'
      ctx.fillRect(x + 1, y + 1, 6, 1)
    }
  }

  return makePixelTexture(canvas)
}

export function createSiteInlayTexture(siteLetter = 'A') {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  // Base stone floor
  ctx.fillStyle = '#e8decb'
  ctx.fillRect(0, 0, 32, 32)

  // Outer circular ring in tactical color
  ctx.strokeStyle = siteLetter === 'A' ? '#ef4444' : '#0ea5e9'
  ctx.lineWidth = 2
  ctx.strokeRect(3, 3, 26, 26)

  // Center letter glyph
  ctx.fillStyle = siteLetter === 'A' ? '#ef4444' : '#0ea5e9'
  ctx.font = 'bold 18px monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(siteLetter, 16, 16)

  return makePixelTexture(canvas)
}

export function createTealAccentTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0891b2'
  ctx.fillRect(0, 0, 32, 32)
  ctx.fillStyle = '#0e7490'
  ctx.fillRect(0, 0, 32, 4)
  ctx.fillStyle = '#22d3ee'
  ctx.fillRect(0, 28, 32, 4)

  return makePixelTexture(canvas)
}

export function createIvyTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, 32, 32)

  // Pixel ivy clusters
  const greens = ['#2e7d32', '#1b5e20', '#388e3c', '#4caf50']
  for (let y = 2; y < 30; y += 4) {
    for (let x = 2; x < 30; x += 4) {
      if ((x * y) % 3 === 0) {
        ctx.fillStyle = greens[(x + y) % greens.length]
        ctx.fillRect(x, y, 3, 3)
        ctx.fillRect(x + 1, y - 1, 2, 2)
      }
    }
  }

  return makePixelTexture(canvas)
}

export function createGeneratorTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  // Industrial casing
  ctx.fillStyle = '#1e293b'
  ctx.fillRect(0, 0, 32, 32)

  // Radiator vent grill
  ctx.fillStyle = '#0f172a'
  for (let y = 4; y < 28; y += 4) {
    ctx.fillRect(4, y, 24, 2)
  }

  // Cyan warning indicator
  ctx.fillStyle = '#06b6d4'
  ctx.fillRect(14, 2, 4, 2)

  return makePixelTexture(canvas)
}

export function createMetalDoorTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#1e293b'
  ctx.fillRect(0, 0, 32, 32)

  // 2 recessed metal panels
  ctx.fillStyle = '#334155'
  ctx.fillRect(3, 3, 26, 11)
  ctx.fillRect(3, 17, 26, 12)

  // Metal panel highlights
  ctx.fillStyle = '#475569'
  ctx.fillRect(3, 3, 26, 1)
  ctx.fillRect(3, 17, 26, 1)

  // Handle
  ctx.fillStyle = '#f59e0b'
  ctx.fillRect(25, 14, 2, 4)

  return makePixelTexture(canvas)
}

export function createSkyDome(scene) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  // Bright Mediterranean sunny sky gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 256)
  grad.addColorStop(0, '#2563eb')
  grad.addColorStop(0.35, '#60a5fa')
  grad.addColorStop(0.65, '#93c5fd')
  grad.addColorStop(0.78, '#dbeafe')
  grad.addColorStop(1.0, '#e2e8f0')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 256, 256)

  const skyTex = makePixelTexture(canvas)
  const skyGeo = new THREE.SphereGeometry(320, 16, 16)
  const skyMat = new THREE.MeshBasicMaterial({
    map: skyTex,
    side: THREE.BackSide,
    fog: false
  })
  const skyMesh = new THREE.Mesh(skyGeo, skyMat)
  scene.add(skyMesh)

  return { mesh: skyMesh, texture: skyTex }
}

export function createMuzzleFlashTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(14, 0, 4, 32)
  ctx.fillRect(0, 14, 32, 4)
  ctx.fillStyle = '#f59e0b'
  ctx.fillRect(12, 12, 8, 8)
  return makePixelTexture(canvas)
}

export function createContactShadowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 16
  canvas.height = 16
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
  ctx.fillRect(2, 2, 12, 12)
  return makePixelTexture(canvas)
}
