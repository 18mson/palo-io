import * as THREE from 'three'

/**
 * WeaponTextures — High-fidelity procedural PBR textures for Valorant-style tactical weapons
 * Includes: Carbon fiber weave, brushed gunmetal, stippled polymer grip,
 * Radianite glowing crystal, holographic reticles, optical scope lens, and brass ammunition.
 */

// Cached singletons to prevent GPU memory bloat
const _textureCache = new Map()

function getCached(key, generatorFn) {
  if (_textureCache.has(key)) return _textureCache.get(key)
  const tex = generatorFn()
  _textureCache.set(key, tex)
  return tex
}

/**
 * Procedural Woven 2x2 Twill Carbon Fiber Texture
 */
export function createCarbonFiberTexture() {
  return getCached('carbon_fiber', () => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#14181f'
    ctx.fillRect(0, 0, 256, 256)

    const tileSize = 16
    for (let y = 0; y < 256; y += tileSize) {
      for (let x = 0; x < 256; x += tileSize) {
        const isOffset = ((x / tileSize) + (y / tileSize)) % 2 === 0
        const grad = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize)
        if (isOffset) {
          grad.addColorStop(0, '#1f2937')
          grad.addColorStop(0.5, '#2e3d4f')
          grad.addColorStop(1, '#111827')
        } else {
          grad.addColorStop(0, '#111827')
          grad.addColorStop(0.5, '#1e293b')
          grad.addColorStop(1, '#0f172a')
        }
        ctx.fillStyle = grad
        ctx.fillRect(x, y, tileSize, tileSize)

        // Micro fiber strands
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, y + tileSize / 2)
        ctx.lineTo(x + tileSize, y + tileSize / 2)
        ctx.stroke()
      }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)
    texture.anisotropy = 8
    texture.needsUpdate = true
    return texture
  })
}

/**
 * Procedural Brushed Gunmetal Steel Texture with Micro-Machining Streaks
 */
export function createBrushedSteelTexture() {
  return getCached('brushed_steel', () => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#1e242d'
    ctx.fillRect(0, 0, 256, 256)

    // Horizontal micro scratches
    for (let i = 0; i < 400; i++) {
      const y = Math.random() * 256
      const len = 40 + Math.random() * 180
      const x = Math.random() * 256
      const alpha = 0.04 + Math.random() * 0.12
      const isHighlight = Math.random() > 0.45

      ctx.strokeStyle = isHighlight ? `rgba(226, 232, 240, ${alpha})` : `rgba(15, 23, 42, ${alpha * 1.5})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + len, y)
      ctx.stroke()
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2)
    texture.anisotropy = 8
    texture.needsUpdate = true
    return texture
  })
}

/**
 * Procedural Tactical Polymer Grip Stippling (Stippled / Knurled Non-Slip Texture)
 */
export function createPolymerGripTexture() {
  return getCached('polymer_grip', () => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#11141a'
    ctx.fillRect(0, 0, 128, 128)

    // Stipple dots
    for (let y = 2; y < 128; y += 4) {
      for (let x = 2; x < 128; x += 4) {
        const jitterX = (Math.random() - 0.5) * 1.5
        const jitterY = (Math.random() - 0.5) * 1.5
        const bright = Math.random() > 0.5

        ctx.fillStyle = bright ? 'rgba(55, 65, 81, 0.75)' : 'rgba(0, 0, 0, 0.85)'
        ctx.beginPath()
        ctx.arc(x + jitterX, y + jitterY, 1.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)
    texture.anisotropy = 8
    texture.needsUpdate = true
    return texture
  })
}

/**
 * Procedural Glowing Radianite Crystal Texture (Valorant Radiant Core Lines)
 */
export function createRadiantCrystalTexture(colorHex = '#00f0ff') {
  const cacheKey = `radiant_${colorHex}`
  return getCached(cacheKey, () => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#0a1018'
    ctx.fillRect(0, 0, 256, 256)

    // Internal radiant crystal facets
    ctx.strokeStyle = colorHex
    ctx.lineWidth = 3
    ctx.shadowColor = colorHex
    ctx.shadowBlur = 12

    for (let i = 0; i < 18; i++) {
      const x1 = (i * 47) % 256
      const y1 = (i * 61) % 256
      const x2 = (x1 + 60) % 256
      const y2 = (y1 + 80) % 256

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    ctx.shadowBlur = 0
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2)
    texture.needsUpdate = true
    return texture
  })
}

/**
 * Procedural Holographic Reflex Reticle Texture
 */
export function createHoloReticleTexture(colorHex = '#00f0ff', style = 'circle-dot') {
  const cacheKey = `reticle_${colorHex}_${style}`
  return getCached(cacheKey, () => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, 256, 256)

    const cx = 128
    const cy = 128

    ctx.shadowColor = colorHex
    ctx.shadowBlur = 10
    ctx.strokeStyle = colorHex
    ctx.fillStyle = colorHex

    if (style === 'circle-dot') {
      // Outer subtle ring
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(cx, cy, 54, 0, Math.PI * 2)
      ctx.stroke()

      // 4 Cardinal ticks
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(cx, cy - 64); ctx.lineTo(cx, cy - 44)
      ctx.moveTo(cx, cy + 44); ctx.lineTo(cx, cy + 64)
      ctx.moveTo(cx - 64, cy); ctx.lineTo(cx - 44, cy)
      ctx.moveTo(cx + 44, cy); ctx.lineTo(cx + 64, cy)
      ctx.stroke()

      // Center crisp dot
      ctx.beginPath()
      ctx.arc(cx, cy, 6, 0, Math.PI * 2)
      ctx.fill()
    } else if (style === 'sniper-cross') {
      // Sniper precision crosshair lines
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(cx, 0); ctx.lineTo(cx, 256)
      ctx.moveTo(0, cy); ctx.lineTo(256, cy)
      ctx.stroke()

      // Range mil dots
      for (let d = -60; d <= 60; d += 20) {
        if (d === 0) continue
        ctx.beginPath()
        ctx.arc(cx + d, cy, 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(cx, cy + d, 3, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.beginPath()
      ctx.arc(cx, cy, 4, 0, Math.PI * 2)
      ctx.fill()
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  })
}

/**
 * Procedural Optical Sniper Scope Lens Glass Texture
 */
export function createScopeLensTexture() {
  return getCached('scope_lens', () => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')

    // High-index optical glass with emerald green anti-reflection coating
    const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 128)
    grad.addColorStop(0, 'rgba(6, 182, 212, 0.45)')
    grad.addColorStop(0.65, 'rgba(16, 185, 129, 0.65)')
    grad.addColorStop(1, 'rgba(15, 23, 42, 0.95)')

    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 256, 256)

    // Glass glare curve
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.arc(128, 128, 105, -Math.PI / 4, Math.PI / 8)
    ctx.stroke()

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  })
}
