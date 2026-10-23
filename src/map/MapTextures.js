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
  const skyGeo = new THREE.SphereGeometry(280, 36, 24)
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

  // Distant warm sunlit Venetian skyline (terracotta stucco & red-tile roofs)
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

  for (let i = 0; i < 36; i++) {
    const angle = (i / 36) * Math.PI * 2
    const r = 85 + (i % 4) * 16
    const bw = 12 + (i % 4) * 6
    const bh = 18 + (i % 5) * 10
    const bd = 12 + (i % 2) * 6

    const bldgMat = wallMaterials[i % wallMaterials.length]
    const bGeo = new THREE.BoxGeometry(bw, bh, bd)
    const bMesh = new THREE.Mesh(bGeo, bldgMat)
    // Sink slightly into the ground so there is zero hover/gap under buildings
    bMesh.position.set(Math.cos(angle) * r, bh / 2 - 0.5, Math.sin(angle) * r)
    bMesh.receiveShadow = true
    bgGroup.add(bMesh)

    // Pitched Venetian terracotta roof on taller buildings
    if (bh > 22) {
      const roofMat = roofMaterials[i % roofMaterials.length]
      const roofGeo = new THREE.ConeGeometry(bw * 0.72, 7, 4)
      const roofMesh = new THREE.Mesh(roofGeo, roofMat)
      roofMesh.position.set(Math.cos(angle) * r, bh + 3.0, Math.sin(angle) * r)
      roofMesh.rotation.y = Math.PI / 4
      roofMesh.receiveShadow = true
      bgGroup.add(roofMesh)
    }
  }
  scene.add(bgGroup)

  return { skyMesh, bgGroup }
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
