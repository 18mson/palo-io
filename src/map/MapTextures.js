import * as THREE from 'three'

/**
 * Procedural Canvas Textures for Valorant / Krunker tactical environment
 */
export function createFloorTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  // Base warm Venetian grout / mortar (crisp, clearly defined stone joints)
  ctx.fillStyle = '#8f8072'
  ctx.fillRect(0, 0, 1024, 1024)

  // Flagstone paving grid (8x8 tiles per 1024px)
  const tileSize = 128
  // Bright sun-bleached Italian limestone / travertine pavers
  const stoneTones = [
    '#f4ede2', '#ebdccb', '#f7f1e6', '#e7dabf',
    '#efe5d6', '#f2e8da', '#e2d3be', '#eadecd'
  ]

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const x = col * tileSize
      const y = row * tileSize
      const colorIdx = (row * 3 + col * 5 + row * col) % stoneTones.length

      // Base tile surface with bright sunlit limestone tone
      ctx.fillStyle = stoneTones[colorIdx]
      ctx.fillRect(x + 4, y + 4, tileSize - 8, tileSize - 8)

      // Surface shading gradient across each paver (subtle sunlight bounce)
      const tileGrad = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize)
      tileGrad.addColorStop(0, 'rgba(255, 255, 255, 0.55)')
      tileGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.10)')
      tileGrad.addColorStop(1, 'rgba(120, 100, 80, 0.14)')
      ctx.fillStyle = tileGrad
      ctx.fillRect(x + 4, y + 4, tileSize - 8, tileSize - 8)

      // 3D Bevel highlight (sun facing top & left)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
      ctx.fillRect(x + 4, y + 4, tileSize - 8, 3)
      ctx.fillRect(x + 4, y + 4, 3, tileSize - 8)

      // 3D Bevel shadow (bottom & right grout lines)
      ctx.fillStyle = 'rgba(90, 75, 60, 0.38)'
      ctx.fillRect(x + 4, y + tileSize - 7, tileSize - 8, 3)
      ctx.fillRect(x + tileSize - 7, y + 4, 3, tileSize - 8)

      // Running bond divider line in alternating orientation
      ctx.fillStyle = '#9a8b7c'
      if ((row + col) % 2 === 0) {
        ctx.fillRect(x + tileSize / 2 - 1, y + 4, 3, tileSize - 8)
        // subtle highlight on divider
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
        ctx.fillRect(x + tileSize / 2 + 2, y + 4, 1, tileSize - 8)
      } else {
        ctx.fillRect(x + 4, y + tileSize / 2 - 1, tileSize - 8, 3)
        // subtle highlight on divider
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
        ctx.fillRect(x + 4, y + tileSize / 2 + 2, tileSize - 8, 1)
      }
    }
  }

  // Realistic natural limestone speckle and aggregate grain
  for (let i = 0; i < 22000; i++) {
    const rx = Math.random() * 1024
    const ry = Math.random() * 1024
    const isLight = Math.random() > 0.4
    ctx.fillStyle = isLight ? 'rgba(255, 255, 255, 0.35)' : 'rgba(140, 120, 100, 0.18)'
    ctx.fillRect(rx, ry, 2, 2)
  }

  // Tactical lane markings & painted hazard chevron stripes (Valorant site branding)
  ctx.strokeStyle = '#f59e0b' // Valorant yellow
  ctx.lineWidth = 8
  ctx.setLineDash([36, 20])
  ctx.beginPath()
  ctx.moveTo(64, 512); ctx.lineTo(960, 512)
  ctx.stroke()
  ctx.setLineDash([])

  // White boundary court lines with crisp contrast
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)'
  ctx.lineWidth = 6
  ctx.strokeRect(128, 128, 768, 768)

  // Inner site red boundary accents
  ctx.strokeStyle = 'rgba(255, 70, 85, 0.65)'
  ctx.lineWidth = 4
  ctx.strokeRect(144, 144, 736, 736)

  // Corner neon cyan crosshair decals
  ctx.strokeStyle = '#00f0ff'
  ctx.lineWidth = 3
  const marks = [256, 512, 768]
  for (const mx of marks) {
    for (const my of marks) {
      ctx.beginPath()
      ctx.moveTo(mx - 20, my); ctx.lineTo(mx + 20, my)
      ctx.moveTo(mx, my - 20); ctx.lineTo(mx, my + 20)
      ctx.stroke()
      ctx.strokeRect(mx - 8, my - 8, 16, 16)
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(12, 12)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Procedural stylized Valorant-style Starburst Muzzle Flash Texture
 */
export function createMuzzleFlashTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  const cx = 128
  const cy = 128

  // Outer radial energy burst
  const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 120)
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
  grad.addColorStop(0.12, 'rgba(255, 235, 100, 0.95)')
  grad.addColorStop(0.35, 'rgba(255, 130, 20, 0.7)')
  grad.addColorStop(0.7, 'rgba(255, 50, 10, 0.25)')
  grad.addColorStop(1, 'rgba(255, 0, 0, 0)')

  // 8-Pointed Star Spikes
  ctx.save()
  ctx.translate(cx, cy)

  // 4 Primary long sharp spikes
  for (let i = 0; i < 4; i++) {
    ctx.rotate(Math.PI / 2)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(-10, 20)
    ctx.lineTo(0, 122)
    ctx.lineTo(10, 20)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()
  }

  // 4 Diagonal secondary spikes
  for (let i = 0; i < 4; i++) {
    ctx.rotate(Math.PI / 2)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(-6, 12)
    ctx.lineTo(0, 80)
    ctx.lineTo(6, 12)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()
  }

  // Brilliant diamond core
  ctx.beginPath()
  ctx.moveTo(0, -38)
  ctx.lineTo(38, 0)
  ctx.lineTo(0, 38)
  ctx.lineTo(-38, 0)
  ctx.closePath()
  ctx.fillStyle = '#ffffff'
  ctx.fill()

  // Inner circular glow
  const coreGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 42)
  coreGrad.addColorStop(0, '#ffffff')
  coreGrad.addColorStop(0.4, 'rgba(255, 248, 190, 0.95)')
  coreGrad.addColorStop(1, 'rgba(255, 170, 30, 0)')
  ctx.fillStyle = coreGrad
  ctx.beginPath()
  ctx.arc(0, 0, 42, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

export function createWallTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  // Venetian sandstone base
  ctx.fillStyle = '#c5a47e'
  ctx.fillRect(0, 0, 1024, 1024)

  // Italian brick coursing (high resolution 1024x1024)
  const brickH = 48
  const brickW = 112
  const brickShades = ['#b8946e', '#be9b74', '#c9a882', '#b38f69', '#caa67f']

  for (let y = 0; y <= 1024; y += brickH) {
    const isOdd = Math.floor(y / brickH) % 2 === 1
    const offset = isOdd ? brickW / 2 : 0

    // Horizontal mortar groove
    ctx.fillStyle = 'rgba(40, 30, 20, 0.35)'
    ctx.fillRect(0, y, 1024, 5)

    for (let x = -brickW + offset; x <= 1024; x += brickW) {
      const shade = brickShades[Math.abs((Math.floor(x / 40) + Math.floor(y / 20))) % brickShades.length]
      ctx.fillStyle = shade
      ctx.fillRect(x + 3, y + 4, brickW - 6, brickH - 7)

      // Brick top highlight & bottom shadow
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)'
      ctx.fillRect(x + 3, y + 4, brickW - 6, 3)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
      ctx.fillRect(x + 3, y + brickH - 6, brickW - 6, 3)

      // Vertical mortar groove
      ctx.fillStyle = 'rgba(40, 30, 20, 0.35)'
      ctx.fillRect(x + brickW - 3, y, 5, brickH)
    }
  }

  // Stucco speckle, weathering and plaster degradation
  for (let i = 0; i < 8000; i++) {
    const rx = Math.random() * 1024
    const ry = Math.random() * 1024
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
    ctx.fillRect(rx, ry, 2, 2)
  }

  // Lower stone baseboard trim with beveled edge
  ctx.fillStyle = '#6b543d'
  ctx.fillRect(0, 930, 1024, 94)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.22)'
  ctx.fillRect(0, 930, 1024, 6)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
  ctx.fillRect(0, 936, 1024, 4)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

export function createRadianiteTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Deep dark emerald titanium composite frame
  ctx.fillStyle = '#042f24'
  ctx.fillRect(0, 0, 512, 512)

  // Outer bevel
  ctx.fillStyle = 'rgba(52, 211, 153, 0.15)'
  ctx.fillRect(10, 10, 492, 492)
  ctx.fillStyle = '#064e3b'
  ctx.fillRect(24, 24, 464, 464)

  // Glowing center Radianite core diamond
  const grad = ctx.createRadialGradient(256, 256, 15, 256, 256, 220)
  grad.addColorStop(0, '#6ee7b7')
  grad.addColorStop(0.35, '#10b981')
  grad.addColorStop(0.7, '#059669')
  grad.addColorStop(1, '#022c22')
  ctx.fillStyle = grad

  ctx.beginPath()
  ctx.moveTo(256, 60)
  ctx.lineTo(452, 256)
  ctx.lineTo(256, 452)
  ctx.lineTo(60, 256)
  ctx.closePath()
  ctx.fill()

  // High-tech sci-fi chevron border
  ctx.strokeStyle = '#a7f3d0'
  ctx.lineWidth = 6
  ctx.stroke()

  // Inner radiant prism lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(256, 110); ctx.lineTo(402, 256); ctx.lineTo(256, 402); ctx.lineTo(110, 256); ctx.closePath()
  ctx.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Authentic Italian Red Terracotta Clay Brickwork (for Wine, archways, and B Site)
 */
export function createBrickTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  // Dark weathered mortar bed
  ctx.fillStyle = '#4a3d35'
  ctx.fillRect(0, 0, 1024, 1024)

  const brickH = 44
  const brickW = 108
  const brickTones = ['#a8432c', '#983b24', '#b54e35', '#8c331d', '#9e3e27', '#af462f']

  for (let y = 0; y <= 1024; y += brickH) {
    const isOdd = Math.floor(y / brickH) % 2 === 1
    const offset = isOdd ? brickW / 2 : 0

    // Mortar groove
    ctx.fillStyle = '#3a2d24'
    ctx.fillRect(0, y, 1024, 5)

    for (let x = -brickW + offset; x <= 1024; x += brickW) {
      const idx = Math.abs(Math.floor(x / 37) + Math.floor(y / 21)) % brickTones.length
      ctx.fillStyle = brickTones[idx]
      ctx.fillRect(x + 3, y + 4, brickW - 6, brickH - 7)

      // Sunlit bevel edge & shadow
      ctx.fillStyle = 'rgba(255, 255, 255, 0.14)'
      ctx.fillRect(x + 3, y + 4, brickW - 6, 2)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)'
      ctx.fillRect(x + 3, y + brickH - 6, brickW - 6, 2)

      // Vertical mortar gap
      ctx.fillStyle = '#3a2d24'
      ctx.fillRect(x + brickW - 3, y, 4, brickH)
    }
  }

  // Weathering noise & kiln soot
  for (let i = 0; i < 9000; i++) {
    const rx = Math.random() * 1024
    const ry = Math.random() * 1024
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.12)'
    ctx.fillRect(rx, ry, 2, 2)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Authentic Tactical Wooden Shipping Crate (Kingdom Logistics)
 */
export function createWoodCrateTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Rich warm wood planks
  ctx.fillStyle = '#8b5a2b'
  ctx.fillRect(0, 0, 512, 512)

  // 4 horizontal wood planks
  const plankH = 128
  const plankColors = ['#966332', '#8c5929', '#a06a37', '#855224']
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = plankColors[i]
    ctx.fillRect(4, i * plankH + 4, 504, plankH - 8)

    // Wood grain lines
    ctx.fillStyle = 'rgba(60, 30, 10, 0.15)'
    for (let g = 0; g < 12; g++) {
      const gy = i * plankH + 10 + g * 9
      ctx.fillRect(4, gy, 504, 2)
    }

    // Plank seams
    ctx.fillStyle = '#42240c'
    ctx.fillRect(0, i * plankH, 512, 4)
  }

  // Steel reinforced corner brackets
  ctx.fillStyle = '#334155'
  const bracketSize = 80
  // Top-left
  ctx.fillRect(0, 0, bracketSize, 28); ctx.fillRect(0, 0, 28, bracketSize)
  // Top-right
  ctx.fillRect(512 - bracketSize, 0, bracketSize, 28); ctx.fillRect(512 - 28, 0, 28, bracketSize)
  // Bottom-left
  ctx.fillRect(0, 512 - 28, bracketSize, 28); ctx.fillRect(0, 512 - bracketSize, 28, bracketSize)
  // Bottom-right
  ctx.fillRect(512 - bracketSize, 512 - 28, bracketSize, 28); ctx.fillRect(512 - 28, 512 - bracketSize, 28, bracketSize)

  // Rivet bolts on brackets
  ctx.fillStyle = '#cbd5e1'
  const boltPositions = [
    [14, 14], [50, 14], [14, 50],
    [512 - 14, 14], [512 - 50, 14], [512 - 14, 50],
    [14, 512 - 14], [50, 512 - 14], [14, 512 - 50],
    [512 - 14, 512 - 14], [512 - 50, 512 - 14], [512 - 14, 512 - 50],
  ]
  for (const [bx, by] of boltPositions) {
    ctx.beginPath()
    ctx.arc(bx, by, 4, 0, Math.PI * 2)
    ctx.fill()
  }

  // Kingdom stencil markings
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)'
  ctx.font = 'bold 28px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('KINGDOM', 256, 230)
  ctx.font = 'bold 18px sans-serif'
  ctx.fillText('RADIANITE CARGO // ASCENT', 256, 265)
  ctx.strokeRect(100, 190, 312, 95)

  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Kingdom High-Tech Radianite Generator Turbine Texture (A Site landmark)
 */
export function createGeneratorTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  // Deep matte gunmetal carbon chassis
  ctx.fillStyle = '#1e2632'
  ctx.fillRect(0, 0, 1024, 1024)

  // Modular armor plates
  ctx.fillStyle = '#2b3544'
  ctx.fillRect(32, 32, 960, 440)
  ctx.fillRect(32, 520, 960, 472)

  // Horizontal ventilation exhaust grilles
  ctx.fillStyle = '#0f172a'
  for (let y = 80; y < 440; y += 32) {
    ctx.fillRect(64, y, 896, 16)
    // Cyan LED exhaust glow behind grilles
    ctx.fillStyle = 'rgba(6, 182, 212, 0.45)'
    ctx.fillRect(80, y + 4, 864, 8)
    ctx.fillStyle = '#0f172a'
  }

  // Central power conduit bus bar
  ctx.fillStyle = '#06b6d4'
  ctx.fillRect(64, 480, 896, 32)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(64, 492, 896, 8)

  // Circular containment turbine core
  const coreGrad = ctx.createRadialGradient(512, 750, 20, 512, 750, 180)
  coreGrad.addColorStop(0, '#67e8f9')
  coreGrad.addColorStop(0.3, '#06b6d4')
  coreGrad.addColorStop(0.7, '#0891b2')
  coreGrad.addColorStop(1, '#0e3a47')
  ctx.fillStyle = coreGrad
  ctx.beginPath()
  ctx.arc(512, 750, 180, 0, Math.PI * 2)
  ctx.fill()

  // High-voltage warning chevrons
  ctx.fillStyle = '#f59e0b'
  for (let i = 0; i < 8; i++) {
    ctx.beginPath()
    ctx.moveTo(120 + i * 100, 40)
    ctx.lineTo(160 + i * 100, 40)
    ctx.lineTo(130 + i * 100, 70)
    ctx.lineTo(90 + i * 100, 70)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Ascent Switchable Security Blast Door (Green / Slate Steel with Hazard Stripes)
 */
export function createMetalDoorTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  // Tactical Venetian dark teal / slate steel
  ctx.fillStyle = '#1c3330'
  ctx.fillRect(0, 0, 512, 1024)

  // Heavy horizontal reinforcing steel ribs
  for (let y = 60; y < 1000; y += 120) {
    ctx.fillStyle = '#274743'
    ctx.fillRect(24, y, 464, 88)

    // Rib 3D highlights & shadows
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
    ctx.fillRect(24, y, 464, 6)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(24, y + 82, 464, 6)

    // Heavy industrial hex bolts
    ctx.fillStyle = '#94a3b8'
    for (let x = 60; x <= 450; x += 130) {
      ctx.beginPath()
      ctx.arc(x, y + 44, 7, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Yellow & black hazard warning stripe block in center
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(24, 480, 464, 70)
  ctx.fillStyle = '#facc15'
  for (let x = 0; x < 500; x += 50) {
    ctx.beginPath()
    ctx.moveTo(x + 24, 480)
    ctx.lineTo(x + 50, 480)
    ctx.lineTo(x + 20, 550)
    ctx.lineTo(x - 6, 550)
    ctx.fill()
  }

  // Hydraulic lock mechanism in center
  ctx.fillStyle = '#475569'
  ctx.fillRect(220, 440, 72, 150)
  ctx.fillStyle = '#ef4444' // Red lock indicator LED
  ctx.beginPath()
  ctx.arc(256, 515, 12, 0, Math.PI * 2)
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Authentic Market Striped Canvas Awning (Italian Green/White/Red)
 */
export function createMarketAwningTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  const stripeW = 64
  const colors = ['#15803d', '#f8fafc', '#dc2626', '#f8fafc'] // Green, White, Red, White

  for (let x = 0; x < 512; x += stripeW) {
    const idx = Math.floor(x / stripeW) % colors.length
    ctx.fillStyle = colors[idx]
    ctx.fillRect(x, 0, stripeW, 512)

    // Fabric weave gradient shadow
    const grad = ctx.createLinearGradient(x, 0, x + stripeW, 0)
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.25)')
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)')
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.25)')
    ctx.fillStyle = grad
    ctx.fillRect(x, 0, stripeW, 512)
  }

  // Scalloped wavy bottom fringe
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)'
  ctx.fillRect(0, 490, 512, 22)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 1)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Venetian Curved Clay Roof Tiles
 */
export function createRoofTileTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#b94827'
  ctx.fillRect(0, 0, 512, 512)

  const tileW = 32
  const tileH = 64

  for (let y = 0; y < 512; y += tileH) {
    for (let x = 0; x < 512; x += tileW) {
      // Barrel curve shading
      const grad = ctx.createLinearGradient(x, y, x + tileW, y)
      grad.addColorStop(0, '#782611')
      grad.addColorStop(0.3, '#d45d39')
      grad.addColorStop(0.7, '#ea6e48')
      grad.addColorStop(1, '#66200d')
      ctx.fillStyle = grad
      ctx.fillRect(x, y, tileW, tileH - 4)

      // Tile overlap drop shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)'
      ctx.fillRect(x, y + tileH - 6, tileW, 6)
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(3, 3)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Creates a rich atmospheric sky dome with volumetric clouds and Venetian skyline
 */
export function createSkyDome(scene) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  // Smooth atmospheric Italian sunny daylight gradient (zenith to below horizon)
  const grad = ctx.createLinearGradient(0, 0, 0, 1024)
  grad.addColorStop(0, '#1b6bd6')     // Rich Mediterranean azure zenith
  grad.addColorStop(0.25, '#3b8fee')  // Vibrant sunny daylight blue
  grad.addColorStop(0.48, '#70b2fa')  // Bright sky
  grad.addColorStop(0.62, '#b2d9fc')  // Soft horizon transition
  grad.addColorStop(0.70, '#e2f0fe')  // Sunlit horizon haze
  grad.addColorStop(0.74, '#ebe2d5')  // Venetian distant stone horizon
  grad.addColorStop(1.00, '#d2c4b0')  // Warm sunlit limestone ground tone below horizon
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1024, 1024)

  // Procedural stylized fluffy white cumulus clouds across the sky
  const cloudBands = [
    { fill: 'rgba(255, 255, 255, 0.85)', shadow: 'rgba(180, 210, 245, 0.45)', y: 220, r: 55 },
    { fill: 'rgba(255, 255, 255, 0.75)', shadow: 'rgba(185, 215, 245, 0.40)', y: 350, r: 75 },
    { fill: 'rgba(255, 255, 255, 0.60)', shadow: 'rgba(200, 225, 250, 0.35)', y: 480, r: 90 },
  ]

  for (const c of cloudBands) {
    for (let i = 0; i < 14; i++) {
      const cx = (i * 85 + Math.sin(i * 3.7) * 40) % 1024
      const cy = c.y + Math.cos(i * 4.2) * 30
      const rad = c.r + (i % 3) * 18

      // Cloud soft under-shadow
      ctx.fillStyle = c.shadow
      ctx.beginPath()
      ctx.arc(cx, cy + 8, rad, 0, Math.PI * 2)
      ctx.arc(cx + rad * 0.7, cy + rad * 0.1, rad * 0.75, 0, Math.PI * 2)
      ctx.arc(cx - rad * 0.7, cy + rad * 0.15, rad * 0.7, 0, Math.PI * 2)
      ctx.fill()

      // Cloud bright top puff
      ctx.fillStyle = c.fill
      ctx.beginPath()
      ctx.arc(cx, cy, rad, 0, Math.PI * 2)
      ctx.arc(cx + rad * 0.7, cy - rad * 0.2, rad * 0.75, 0, Math.PI * 2)
      ctx.arc(cx - rad * 0.7, cy - rad * 0.1, rad * 0.7, 0, Math.PI * 2)
      ctx.arc(cx + rad * 1.3, cy + rad * 0.1, rad * 0.6, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Brilliant Mediterranean sun flare
  const sunGrad = ctx.createRadialGradient(760, 240, 10, 760, 240, 260)
  sunGrad.addColorStop(0, 'rgba(255, 255, 240, 1.0)')
  sunGrad.addColorStop(0.15, 'rgba(255, 245, 180, 0.75)')
  sunGrad.addColorStop(0.40, 'rgba(255, 215, 130, 0.35)')
  sunGrad.addColorStop(0.75, 'rgba(255, 190, 100, 0.10)')
  sunGrad.addColorStop(1, 'rgba(255, 190, 100, 0)')
  ctx.fillStyle = sunGrad
  ctx.beginPath()
  ctx.arc(760, 240, 260, 0, Math.PI * 2)
  ctx.fill()

  const skyTex = new THREE.CanvasTexture(canvas)
  skyTex.needsUpdate = true

  // Full 360-degree sphere dome (covers zenith to horizon and down to ground)
  const skyGeo = new THREE.SphereGeometry(450, 36, 24)
  const skyMat = new THREE.MeshBasicMaterial({
    map: skyTex,
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: true
  })
  const skyMesh = new THREE.Mesh(skyGeo, skyMat)
  skyMesh.position.y = 0
  skyMesh.renderOrder = -100
  scene.add(skyMesh)

  // Distant warm sunlit Venetian skyline (terracotta stucco, campanile towers & red-tile roofs)
  const bgGroup = new THREE.Group()

  const wallColors = [0xd6a878, 0xdeb48c, 0xc89768, 0xe4c39e]
  const roofColors = [0xc24e2c, 0xb84424, 0xce5c38]

  const wallMaterials = wallColors.map(c => new THREE.MeshStandardMaterial({
    color: c,
    roughness: 0.75,
    metalness: 0.1
  }))

  const roofMaterials = roofColors.map(c => new THREE.MeshStandardMaterial({
    color: c,
    roughness: 0.65,
    metalness: 0.15
  }))

  for (let i = 0; i < 44; i++) {
    const angle = (i / 44) * Math.PI * 2
    const r = 135 + (i % 4) * 22
    const bw = 14 + (i % 4) * 6
    const bh = (i === 6 || i === 28) ? 46 : (20 + (i % 5) * 10)
    const bd = 14 + (i % 2) * 6

    const bldgMat = wallMaterials[i % wallMaterials.length]
    const bGeo = new THREE.BoxGeometry(bw, bh, bd)
    const bMesh = new THREE.Mesh(bGeo, bldgMat)
    bMesh.position.set(Math.cos(angle) * r, bh / 2 - 0.5, Math.sin(angle) * r)
    bMesh.receiveShadow = true
    bgGroup.add(bMesh)

    // Venetian Bell Tower Spire (Campanile di San Marco) or Pitched Roof
    if (i === 6 || i === 28) {
      // Tall Campanile pyramid spire with copper patina green cap
      const spireMat = new THREE.MeshStandardMaterial({ color: 0x3d7068, roughness: 0.4, metalness: 0.3 })
      const spireGeo = new THREE.ConeGeometry(bw * 0.75, 16, 4)
      const spireMesh = new THREE.Mesh(spireGeo, spireMat)
      spireMesh.position.set(Math.cos(angle) * r, bh + 7.5, Math.sin(angle) * r)
      spireMesh.rotation.y = Math.PI / 4
      bgGroup.add(spireMesh)
    } else if (bh > 22) {
      const roofMat = roofMaterials[i % roofMaterials.length]
      const roofGeo = new THREE.ConeGeometry(bw * 0.72, 8, 4)
      const roofMesh = new THREE.Mesh(roofGeo, roofMat)
      roofMesh.position.set(Math.cos(angle) * r, bh + 3.5, Math.sin(angle) * r)
      roofMesh.rotation.y = Math.PI / 4
      roofMesh.receiveShadow = true
      bgGroup.add(roofMesh)
    }
  }

  // ── Authentic Valorant Ascent Floating Sky Islands ──
  const rockMat = new THREE.MeshStandardMaterial({
    color: 0x544738, // Craggy brownish-slate volcanic earth
    roughness: 0.85,
    metalness: 0.15
  })
  const turfMat = new THREE.MeshStandardMaterial({
    color: 0xd4a373, // Venetian limestone & stone ruins on top
    roughness: 0.70,
    metalness: 0.10
  })
  const radCoreMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x34d399,
    emissiveIntensity: 1.2,
    roughness: 0.2
  })

  // 10 floating islands around the void perimeter (Ascent floating city lore)
  const islandConfigs = [
    { angle: 0.3,  dist: 175, y: 32, scale: 1.2 },
    { angle: 0.9,  dist: 210, y: 48, scale: 1.6 },
    { angle: 1.6,  dist: 185, y: 28, scale: 1.0 },
    { angle: 2.3,  dist: 230, y: 62, scale: 2.0 },
    { angle: 3.1,  dist: 180, y: 35, scale: 1.3 },
    { angle: 3.8,  dist: 220, y: 55, scale: 1.7 },
    { angle: 4.5,  dist: 195, y: 30, scale: 1.1 },
    { angle: 5.2,  dist: 240, y: 68, scale: 2.2 },
    { angle: 5.8,  dist: 180, y: 40, scale: 1.4 },
    { angle: 6.2,  dist: 215, y: 52, scale: 1.5 }
  ]

  for (const cfg of islandConfigs) {
    const isGroup = new THREE.Group()
    const ix = Math.cos(cfg.angle) * cfg.dist
    const iz = Math.sin(cfg.angle) * cfg.dist
    isGroup.position.set(ix, cfg.y, iz)
    isGroup.scale.set(cfg.scale, cfg.scale, cfg.scale)

    // Inverted rocky mountain cone (sharp jagged underside)
    const coneGeo = new THREE.ConeGeometry(18, 22, 6)
    coneGeo.rotateX(Math.PI)
    const coneMesh = new THREE.Mesh(coneGeo, rockMat)
    coneMesh.position.y = -10
    isGroup.add(coneMesh)

    // Flat stone top plateau
    const topGeo = new THREE.CylinderGeometry(18.5, 17.5, 3.5, 7)
    const topMesh = new THREE.Mesh(topGeo, turfMat)
    topMesh.position.y = 1
    isGroup.add(topMesh)

    // Venetian stone ruin structure / arches on top of floating island
    const ruinGeo = new THREE.BoxGeometry(7, 8, 7)
    const ruinMesh = new THREE.Mesh(ruinGeo, turfMat)
    ruinMesh.position.set(2, 6, -1)
    isGroup.add(ruinMesh)

    const ruinArchGeo = new THREE.CylinderGeometry(2.2, 2.2, 5, 8, 1, false, 0, Math.PI)
    const ruinArch = new THREE.Mesh(ruinArchGeo, turfMat)
    ruinArch.rotation.z = Math.PI / 2
    ruinArch.position.set(2, 10, -1)
    isGroup.add(ruinArch)

    // Glowing anti-gravity Radianite core crystal embedded underneath
    const radCoreGeo = new THREE.OctahedronGeometry(3.5, 0)
    const radCore = new THREE.Mesh(radCoreGeo, radCoreMat)
    radCore.position.y = -20
    isGroup.add(radCore)

    bgGroup.add(isGroup)
  }

  scene.add(bgGroup)

  return { skyMesh, bgGroup }
}

/**
 * Procedural Realistic Stone Stairs Texture with Travertine Grain & Brass Safety Bullnose
 */
export function createStoneStairsTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Warm Venetian travertine limestone base
  ctx.fillStyle = '#dfd3c3'
  ctx.fillRect(0, 0, 512, 512)

  // 4 horizontal step treads per texture tile
  const stepH = 128
  for (let s = 0; s < 4; s++) {
    const y = s * stepH

    // Stone tread surface gradient (sunlight highlight fading to back)
    const treadGrad = ctx.createLinearGradient(0, y, 0, y + stepH)
    treadGrad.addColorStop(0, '#f5efe6')   // Bright travertine front edge
    treadGrad.addColorStop(0.3, '#ebdccb') // Subtle body tone
    treadGrad.addColorStop(0.9, '#ddcebc') // Back of the step
    treadGrad.addColorStop(1.0, '#b8a795') // Dark mortar joint under riser
    ctx.fillStyle = treadGrad
    ctx.fillRect(0, y, 512, stepH)

    // Micro-veining & stone flecks
    ctx.fillStyle = 'rgba(160, 140, 120, 0.12)'
    for (let f = 0; f < 30; f++) {
      const fx = (f * 37 + s * 83) % 512
      const fy = y + 15 + (f * 19) % (stepH - 30)
      ctx.fillRect(fx, fy, (f % 5) + 3, 2)
    }

    // Heavy cast shadow under the preceding step nose
    ctx.fillStyle = 'rgba(70, 55, 45, 0.45)'
    ctx.fillRect(0, y + stepH - 8, 512, 8)
    ctx.fillStyle = 'rgba(50, 40, 30, 0.65)'
    ctx.fillRect(0, y + stepH - 3, 512, 3)

    // FRONT EDGE: Solid Brass / Bronze anti-slip safety bullnose strip (Valorant tactical step edge)
    const brassGrad = ctx.createLinearGradient(0, y, 0, y + 16)
    brassGrad.addColorStop(0, '#fde68a') // Specular gold highlight
    brassGrad.addColorStop(0.35, '#d97706') // Warm amber brass
    brassGrad.addColorStop(0.8, '#b45309') // Dark bronze bevel
    brassGrad.addColorStop(1.0, '#78350f') // Underside lip shadow
    ctx.fillStyle = brassGrad
    ctx.fillRect(0, y, 512, 14)

    // Diamond grip grooves on the brass tread strip
    ctx.fillStyle = 'rgba(60, 30, 10, 0.45)'
    for (let g = 0; g < 512; g += 16) {
      ctx.fillRect(g, y + 2, 2, 10)
    }

    // Top crisp specular glint line
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
    ctx.fillRect(0, y, 512, 2)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 1)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Procedural Weathered Italian Walnut / Wood Stairs Texture
 */
export function createWoodStairsTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#4a2f1b'
  ctx.fillRect(0, 0, 512, 512)

  const stepH = 128
  for (let s = 0; s < 4; s++) {
    const y = s * stepH

    const plankGrad = ctx.createLinearGradient(0, y, 0, y + stepH)
    plankGrad.addColorStop(0, '#8c5936')
    plankGrad.addColorStop(0.4, '#704426')
    plankGrad.addColorStop(1.0, '#422513')
    ctx.fillStyle = plankGrad
    ctx.fillRect(0, y, 512, stepH)

    ctx.strokeStyle = 'rgba(30, 15, 5, 0.25)'
    ctx.lineWidth = 1.5
    for (let w = 0; w < 12; w++) {
      ctx.beginPath()
      const startY = y + 10 + w * 10
      ctx.moveTo(0, startY)
      ctx.bezierCurveTo(150, startY + 4, 350, startY - 4, 512, startY + 2)
      ctx.stroke()
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
    ctx.fillRect(0, y, 512, 3)
    ctx.fillStyle = 'rgba(20, 10, 5, 0.65)'
    ctx.fillRect(0, y + stepH - 6, 512, 6)

    ctx.fillStyle = '#262626'
    ctx.beginPath(); ctx.arc(24, y + 20, 4, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc(488, y + 20, 4, 0, Math.PI * 2); ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 1)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Procedural Wet Venetian Canal Cobblestone Pavers (B Site & Boathouse)
 */
export function createCobblestoneTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#2d3339'
  ctx.fillRect(0, 0, 512, 512)

  const cols = 8
  const rows = 12
  const cw = 512 / cols
  const ch = 512 / rows

  const cobbleTones = ['#4f5861', '#5d6771', '#454c54', '#66717d', '#545d66']

  for (let r = 0; r < rows; r++) {
    const offsetX = (r % 2) * (cw / 2)
    for (let c = -1; c <= cols; c++) {
      const x = c * cw + offsetX
      const y = r * ch
      const colorIdx = (r * 7 + c * 11) % cobbleTones.length

      ctx.fillStyle = cobbleTones[colorIdx]
      ctx.beginPath()
      ctx.roundRect(x + 4, y + 3, cw - 8, ch - 6, 6)
      ctx.fill()

      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
      ctx.beginPath()
      ctx.roundRect(x + 5, y + 4, cw - 14, 3, 2)
      ctx.fill()

      ctx.fillStyle = 'rgba(20, 25, 30, 0.45)'
      ctx.beginPath()
      ctx.roundRect(x + 6, y + ch - 7, cw - 12, 3, 2)
      ctx.fill()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(3, 3)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Procedural Terracotta Red Ceramic Tiles (Market & Interior Walkways)
 */
export function createTerracottaTileTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#c7b7a6'
  ctx.fillRect(0, 0, 512, 512)

  const tileSize = 64
  const terraTones = ['#b85d43', '#c4664a', '#a85038', '#cf7153', '#bf6247']

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const x = c * tileSize
      const y = r * tileSize
      const colorIdx = (r * 3 + c * 5) % terraTones.length

      ctx.fillStyle = terraTones[colorIdx]
      ctx.fillRect(x + 3, y + 3, tileSize - 6, tileSize - 6)

      const grad = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize)
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.25)')
      grad.addColorStop(1, 'rgba(60, 20, 10, 0.20)')
      ctx.fillStyle = grad
      ctx.fillRect(x + 3, y + 3, tileSize - 6, tileSize - 6)

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      ctx.fillRect(x + 3, y + 3, tileSize - 6, 2)
      ctx.fillRect(x + 3, y + 3, 2, tileSize - 6)
      ctx.fillStyle = 'rgba(70, 25, 15, 0.4)'
      ctx.fillRect(x + 3, y + tileSize - 5, tileSize - 6, 2)
      ctx.fillRect(x + tileSize - 5, y + 3, 2, tileSize - 6)
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(3, 3)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Procedural Tactical Site Plant Inlay (Valorant A & B Inlay Floor)
 */
export function createSiteInlayTexture(siteLetter = 'A') {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#e8dec8'
  ctx.fillRect(0, 0, 512, 512)

  const isA = siteLetter === 'A'
  const primaryColor = isA ? '#06b6d4' : '#10b981'
  const glowColor    = isA ? 'rgba(6, 182, 212, 0.25)' : 'rgba(16, 185, 129, 0.25)'

  ctx.strokeStyle = primaryColor
  ctx.lineWidth = 14
  ctx.beginPath()
  ctx.arc(256, 256, 210, 0, Math.PI * 2)
  ctx.stroke()

  ctx.fillStyle = glowColor
  ctx.beginPath()
  ctx.arc(256, 256, 203, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = '#f8fafc'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(256, 256, 175, 0, Math.PI * 2)
  ctx.stroke()

  ctx.strokeStyle = primaryColor
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.moveTo(256, 30); ctx.lineTo(256, 90)
  ctx.moveTo(256, 422); ctx.lineTo(256, 482)
  ctx.moveTo(30, 256); ctx.lineTo(90, 256)
  ctx.moveTo(422, 256); ctx.lineTo(482, 256)
  ctx.stroke()

  ctx.font = '900 160px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = primaryColor
  ctx.fillText(siteLetter, 256, 256)

  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 3
  ctx.strokeText(siteLetter, 256, 256)

  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Procedural Venetian Pastel Teal / Cyan Painted Wooden Louvers & Shutters
 */
export function createTealAccentTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#2a6372'
  ctx.fillRect(0, 0, 512, 512)

  const slatH = 32
  for (let s = 0; s < 16; s++) {
    const y = s * slatH

    const slatGrad = ctx.createLinearGradient(0, y, 0, y + slatH)
    slatGrad.addColorStop(0, '#438a9c')
    slatGrad.addColorStop(0.5, '#357788')
    slatGrad.addColorStop(1.0, '#1c4a56')
    ctx.fillStyle = slatGrad
    ctx.fillRect(8, y + 2, 496, slatH - 4)

    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)'
    ctx.fillRect(8, y + 2, 496, 2)
  }

  ctx.strokeStyle = '#183c46'
  ctx.lineWidth = 12
  ctx.strokeRect(6, 6, 500, 500)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Procedural Lush Mediterranean Climbing Ivy Vine Foliage
 */
export function createIvyTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, 512, 512)

  ctx.strokeStyle = '#2d5a27'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(100, 0); ctx.bezierCurveTo(120, 180, 80, 320, 110, 512)
  ctx.moveTo(250, 0); ctx.bezierCurveTo(230, 150, 270, 340, 240, 512)
  ctx.moveTo(400, 0); ctx.bezierCurveTo(420, 200, 380, 360, 410, 512)
  ctx.stroke()

  const leafColors = ['#1e4620', '#2d6a2e', '#3b833c', '#4da14e', '#235326']

  for (let i = 0; i < 90; i++) {
    const lx = 40 + Math.random() * 432
    const ly = 20 + Math.random() * 472
    const size = 16 + Math.random() * 22
    const angle = Math.random() * Math.PI * 2

    ctx.save()
    ctx.translate(lx, ly)
    ctx.rotate(angle)

    ctx.fillStyle = leafColors[i % leafColors.length]
    ctx.beginPath()
    ctx.moveTo(0, -size)
    ctx.bezierCurveTo(size * 0.8, -size * 0.8, size * 0.9, size * 0.3, 0, size)
    ctx.bezierCurveTo(-size * 0.9, size * 0.3, -size * 0.8, -size * 0.8, 0, -size)
    ctx.fill()

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.7)
    ctx.lineTo(0, size * 0.6)
    ctx.stroke()

    ctx.restore()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 2)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Procedural soft radial contact shadow texture to ground characters & props firmly
 */
export function createContactShadowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')

  const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 62)
  grad.addColorStop(0, 'rgba(20, 25, 35, 0.70)')
  grad.addColorStop(0.35, 'rgba(20, 25, 35, 0.45)')
  grad.addColorStop(0.70, 'rgba(20, 25, 35, 0.15)')
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(64, 64, 62, 0, Math.PI * 2)
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * Procedural Turquoise Water Caustics Texture for ACCENT Canal & Water Basins
 */
export function createWaterTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Shimmering Mediterranean turquoise water body
  const waterGrad = ctx.createLinearGradient(0, 0, 512, 512)
  waterGrad.addColorStop(0, '#0284c7')    // Azure deep blue
  waterGrad.addColorStop(0.35, '#06b6d4') // Radiant cyan
  waterGrad.addColorStop(0.70, '#0891b2') // Tropical turquoise
  waterGrad.addColorStop(1.0, '#0369a1')  // Deep tone
  ctx.fillStyle = waterGrad
  ctx.fillRect(0, 0, 512, 512)

  // Procedural Voronoi / Caustic light ripple webs
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)'
  ctx.lineWidth = 3
  for (let i = 0; i < 36; i++) {
    const cx = (i * 73) % 512
    const cy = (i * 97) % 512
    const r = 24 + (i % 5) * 8

    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.stroke()

    ctx.fillStyle = 'rgba(190, 242, 255, 0.20)'
    ctx.beginPath()
    ctx.arc(cx + 6, cy + 6, r * 0.7, 0, Math.PI * 2)
    ctx.fill()
  }

  // Sparkling sun glint points
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
  for (let s = 0; s < 45; s++) {
    const sx = (s * 41 + 13) % 512
    const sy = (s * 59 + 29) % 512
    ctx.fillRect(sx, sy, 3, 3)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4, 4)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Procedural Asian Cedar / Pagoda Timber Texture for Bridges, Towers & Beams
 */
export function createPagodaWoodTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Deep rich crimson-toned cedar wood
  ctx.fillStyle = '#4a1d0f'
  ctx.fillRect(0, 0, 512, 512)

  const beamH = 64
  for (let b = 0; b < 8; b++) {
    const y = b * beamH

    const grad = ctx.createLinearGradient(0, y, 0, y + beamH)
    grad.addColorStop(0, '#7c2d12')   // Warm cedar highlight
    grad.addColorStop(0.4, '#6c2810') // Mid timber
    grad.addColorStop(1.0, '#431407') // Shadow joint
    ctx.fillStyle = grad
    ctx.fillRect(0, y, 512, beamH)

    // Wood grains
    ctx.strokeStyle = 'rgba(30, 8, 4, 0.35)'
    ctx.lineWidth = 1.8
    for (let g = 0; g < 6; g++) {
      ctx.beginPath()
      const gy = y + 8 + g * 9
      ctx.moveTo(0, gy)
      ctx.bezierCurveTo(160, gy + 3, 340, gy - 3, 512, gy + 1)
      ctx.stroke()
    }

    // Top bevel highlight & joint
    ctx.fillStyle = 'rgba(255, 200, 160, 0.25)'
    ctx.fillRect(0, y, 512, 2)
    ctx.fillStyle = '#1c0702'
    ctx.fillRect(0, y + beamH - 3, 512, 3)

    // Wooden peg / joint fasteners on alternating sides
    ctx.fillStyle = '#260a03'
    ctx.beginPath(); ctx.arc(28, y + beamH / 2, 4.5, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc(484, y + beamH / 2, 4.5, 0, Math.PI * 2); ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Procedural Asian Ceramic Roof Tiles with Curved Ridge & Golden Eave Edge
 */
export function createAsianRoofTileTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Dark terracotta underlay
  ctx.fillStyle = '#581c1c'
  ctx.fillRect(0, 0, 512, 512)

  const rowH = 64
  const colW = 32

  for (let r = 0; r < 8; r++) {
    const y = r * rowH
    for (let c = 0; c < 16; c++) {
      const x = c * colW

      // Cylindrical barrel tile gradient (curved Chinese / Japanese / Venetian tile)
      const tileGrad = ctx.createLinearGradient(x, 0, x + colW, 0)
      tileGrad.addColorStop(0, '#7f1d1d')   // Left curve shadow
      tileGrad.addColorStop(0.3, '#b91c1c') // Bright red ceramic ridge
      tileGrad.addColorStop(0.7, '#991b1b') // Body red
      tileGrad.addColorStop(1.0, '#450a0a') // Right shadow gutter
      ctx.fillStyle = tileGrad
      ctx.fillRect(x + 1, y, colW - 2, rowH - 3)

      // Specular highlight on tile crest
      ctx.fillStyle = 'rgba(255, 200, 200, 0.40)'
      ctx.fillRect(x + 8, y, 4, rowH - 3)

      // Bottom curved drip edge highlight
      ctx.fillStyle = '#f59e0b' // Gold tipped eave lip
      ctx.fillRect(x + 2, y + rowH - 4, colW - 4, 3)
    }

    // Heavy shadow under tile course
    ctx.fillStyle = '#260404'
    ctx.fillRect(0, y + rowH - 2, 512, 2)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

/**
 * Procedural ACCENT Light Sandstone Pavement Texture
 */
export function createAccentPavementTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Light warm Venetian sandstone
  ctx.fillStyle = '#c5b8a5'
  ctx.fillRect(0, 0, 512, 512)

  const sz = 64
  const stoneTones = ['#ede5d8', '#e5dacb', '#f2ece2', '#ddd1bf', '#e8dfd1']

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const x = c * sz
      const y = r * sz
      const idx = (r * 5 + c * 7) % stoneTones.length

      ctx.fillStyle = stoneTones[idx]
      ctx.fillRect(x + 2, y + 2, sz - 4, sz - 4)

      // Sunlit surface bevel
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.fillRect(x + 2, y + 2, sz - 4, 2)
      ctx.fillRect(x + 2, y + 2, 2, sz - 4)

      ctx.fillStyle = 'rgba(80, 70, 60, 0.35)'
      ctx.fillRect(x + 2, y + sz - 3, sz - 4, 2)
      ctx.fillRect(x + sz - 3, y + 2, 2, sz - 4)
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(3, 3)
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}
