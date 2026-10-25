/**
 * Minimap — Valorant-style Tactical Minimap & Full Tactical Map View
 * Features:
 *  - Circular high-contrast HUD radar with rotating / fixed orientation
 *  - Player FOV vision cone & directional chevron
 *  - Live bot tracking with firing shockwaves & dead state
 *  - Real-time zone detection & callout badge (e.g. "MID COURTYARD", "A SITE")
 *  - Bomb sites A and B with edge clamping & directional arrows
 *  - Full Tactical Map modal (Hotkey [M] or expand button) with zone labels,
 *    cursor coordinates, interactive click-to-ping / click-to-teleport
 */

import { makeDraggable } from './draggable.js'

export function getZoneAtPosition(x, z, zones = []) {
  if (!zones || zones.length === 0) return null
  // Sort smallest area first for more specific sub-zones
  const sorted = [...zones].sort((a, b) => {
    const areaA = (a.maxX - a.minX) * (a.maxZ - a.minZ)
    const areaB = (b.maxX - b.minX) * (b.maxZ - b.minZ)
    return areaA - areaB
  })
  for (const zone of sorted) {
    if (x >= zone.minX && x <= zone.maxX && z >= zone.minZ && z <= zone.maxZ) {
      return zone
    }
  }
  return null
}

export class Minimap {
  constructor(options = {}) {
    this.player     = options.player || null
    this.bots       = options.bots || null
    this.zones      = options.zones || []
    this.engine     = options.engine || null
    this.mapBounds  = options.mapBounds || { minX: -60, maxX: 60, minZ: -56, maxZ: 56 }
    this.imageSrc   = options.imageSrc || null

    // Configuration & State
    this.modes = ['rotate', 'fixed', 'full']
    this.modeIndex = 0
    const savedMode = localStorage.getItem('palo_minimap_mode')
    if (savedMode && this.modes.includes(savedMode)) {
      this.modeIndex = this.modes.indexOf(savedMode)
    }

    this.zooms = [1.0, 1.4, 1.8]
    this.zoomIndex = 0
    const savedZoom = parseFloat(localStorage.getItem('palo_minimap_zoom'))
    if (savedZoom && this.zooms.includes(savedZoom)) {
      this.zoomIndex = this.zooms.indexOf(savedZoom)
    }

    this.isExpanded         = false
    this.currentZoneName    = 'TIDE MARKET'
    this.hoverWorldCoords   = null
    this.hoverZoneName      = null
    this.pingMarker         = null // { x, z, time, color }
    this.lastZoneCheckTime  = 0

    // DOM Elements
    this.hudEl          = document.getElementById('minimap-hud')
    this.canvas         = document.getElementById('minimap-canvas')
    this.zoneBadgeEl    = document.getElementById('minimap-zone-badge')
    this.btnMode        = document.getElementById('minimap-btn-mode')
    this.btnZoom        = document.getElementById('minimap-btn-zoom')
    this.btnExpand      = document.getElementById('minimap-btn-expand')

    // Tactical Map Modal Elements
    this.modalEl        = document.getElementById('tactical-map-modal')
    this.tacticalCanvas = document.getElementById('tactical-map-canvas')
    this.tacticalZoneEl = document.getElementById('tactical-map-zone')
    this.tacticalCoordsEl = document.getElementById('tactical-map-coords')
    this.btnCloseModal  = document.getElementById('btn-tactical-close')

    // Contexts & Retina Scaling
    this.ctx = null
    this.tacticalCtx = null
    this._setupCanvases()

    // Offscreen Canvas for caching map image & vector map
    this.mapBgCanvas = document.createElement('canvas')
    this.mapBgCanvas.width = 1024
    this.mapBgCanvas.height = 1024
    this.bgLoaded = false
    this._buildProceduralMapBase()
    this._loadMapImage()

    // Event Bindings
    this._setupEvents()
    this._updateButtonsUI()
  }

  setPlayer(player) {
    this.player = player
  }

  setBots(bots) {
    this.bots = bots
  }

  setZones(zones) {
    this.zones = zones || []
    this._buildProceduralMapBase()
    if (this.bgImage) {
      this._drawMapImageOnBg(this.bgImage)
    }
  }

  // ── Canvas Setup with Retina Display Support ─────────
  _setupCanvases() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    if (this.canvas) {
      const cssSize = 200
      this.canvas.width = cssSize * dpr
      this.canvas.height = cssSize * dpr
      this.canvas.style.width = `${cssSize}px`
      this.canvas.style.height = `${cssSize}px`
      this.ctx = this.canvas.getContext('2d')
      this.ctx.scale(dpr, dpr)
    }

    if (this.tacticalCanvas) {
      const cssSize = 600
      this.tacticalCanvas.width = cssSize * dpr
      this.tacticalCanvas.height = cssSize * dpr
      this.tacticalCanvas.style.width = `${cssSize}px`
      this.tacticalCanvas.style.height = `${cssSize}px`
      this.tacticalCtx = this.tacticalCanvas.getContext('2d')
      this.tacticalCtx.scale(dpr, dpr)
    }
  }

  _getSites() {
    const list = []
    for (const z of this.zones) {
      const zid = (z.id || '').toLowerCase()
      const zname = (z.name || '').toUpperCase()
      const minX = z.minX ?? (z.rect ? z.rect[0] : 0)
      const minZ = z.minZ ?? (z.rect ? z.rect[1] : 0)
      const maxX = z.maxX ?? (z.rect ? z.rect[2] : 0)
      const maxZ = z.maxZ ?? (z.rect ? z.rect[3] : 0)
      const cx = (minX + maxX) / 2
      const cz = (minZ + maxZ) / 2

      if (zid === 'asite' || (zid.includes('site') && zid.includes('a')) || zname === 'A SITE') {
        list.push({ id: 'A', x: cx, z: cz, color: '#06b6d4', bg: '#083344' })
      } else if (zid === 'bsite' || (zid.includes('site') && zid.includes('b')) || zname === 'B SITE') {
        list.push({ id: 'B', x: cx, z: cz, color: '#f59e0b', bg: '#451a03' })
      }
    }
    return list
  }

  // ── Procedural Vector Base Map (Instant Fallback) ──────
  _buildProceduralMapBase() {
    const ctx = this.mapBgCanvas.getContext('2d')
    const size = 1024
    ctx.clearRect(0, 0, size, size)

    // Dark void sky background
    ctx.fillStyle = '#060d14'
    ctx.fillRect(0, 0, size, size)

    const bounds = this.mapBounds || { minX: -60, maxX: 60, minZ: -56, maxZ: 56 }
    const spanX = bounds.maxX - bounds.minX
    const spanZ = bounds.maxZ - bounds.minZ

    // Border
    ctx.save()
    ctx.fillStyle = '#0f1a24'
    ctx.strokeStyle = '#00f0ff33'
    ctx.lineWidth = 4
    ctx.strokeRect(16, 16, size - 32, size - 32)
    ctx.restore()

    // Draw Zone Outlines & Soft Fills from this.zones
    for (const z of this.zones) {
      const minX = z.minX ?? (z.rect ? z.rect[0] : 0)
      const minZ = z.minZ ?? (z.rect ? z.rect[1] : 0)
      const maxX = z.maxX ?? (z.rect ? z.rect[2] : 0)
      const maxZ = z.maxZ ?? (z.rect ? z.rect[3] : 0)

      const x0 = ((minX - bounds.minX) / spanX) * size
      const y0 = ((minZ - bounds.minZ) / spanZ) * size
      const w  = ((maxX - minX) / spanX) * size
      const h  = ((maxZ - minZ) / spanZ) * size

      let fillColor = 'rgba(255, 255, 255, 0.03)'
      let strokeColor = 'rgba(255, 255, 255, 0.15)'

      const zid = (z.id || '').toLowerCase()
      if (zid.includes('site') || zid.includes('plant') || zid.includes('heaven')) {
        fillColor = zid.includes('a') ? 'rgba(6, 182, 212, 0.08)' : 'rgba(245, 158, 11, 0.08)'
        strokeColor = zid.includes('a') ? 'rgba(6, 182, 212, 0.4)' : 'rgba(245, 158, 11, 0.4)'
      } else if (zid.includes('attacker') || zid.includes('spawn')) {
        fillColor = 'rgba(34, 197, 94, 0.06)'
        strokeColor = 'rgba(34, 197, 94, 0.3)'
      } else if (zid.includes('defender')) {
        fillColor = 'rgba(239, 68, 68, 0.06)'
        strokeColor = 'rgba(239, 68, 68, 0.3)'
      }

      ctx.fillStyle = fillColor
      ctx.fillRect(x0, y0, w, h)
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = 2
      ctx.strokeRect(x0, y0, w, h)
    }
  }

  // ── Load Map Image ──────────────────────────────────────
  _loadMapImage() {
    if (!this.imageSrc) {
      this.bgLoaded = true
      return
    }
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      this.bgImage = img
      this._drawMapImageOnBg(img)
      this.bgLoaded = true
    }
    img.onerror = () => {
      console.warn('Minimap: Failed to load map image texture, using procedural base.')
      this.bgLoaded = true
    }
    img.src = this.imageSrc
  }

  _drawMapImageOnBg(img) {
    const ctx = this.mapBgCanvas.getContext('2d')
    const size = 1024

    // Dark backdrop tint
    ctx.fillStyle = '#071018'
    ctx.fillRect(0, 0, size, size)

    // Draw map image stretched across bounds
    ctx.drawImage(img, 0, 0, size, size)

    // Blend high-tech tactical contrast layer
    ctx.save()
    ctx.fillStyle = 'rgba(10, 20, 30, 0.15)'
    ctx.fillRect(0, 0, size, size)

    // Subtle coordinate grid markings
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)'
    ctx.lineWidth = 1
    const step = size / 11 // Every 10 meters
    for (let i = 0; i <= size; i += step) {
      ctx.beginPath()
      ctx.moveTo(i, 0); ctx.lineTo(i, size); ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke()
    }
    ctx.restore()
  }

  // ── UI Events & Interactions ───────────────────────────
  _setupEvents() {
    // Mode Button: Rotate -> Fixed -> Full Map
    this.btnMode?.addEventListener('click', (e) => {
      e.stopPropagation()
      this.modeIndex = (this.modeIndex + 1) % this.modes.length
      localStorage.setItem('palo_minimap_mode', this.modes[this.modeIndex])
      this._updateButtonsUI()
    })

    // Zoom Button: 1.0x -> 1.4x -> 1.8x
    this.btnZoom?.addEventListener('click', (e) => {
      e.stopPropagation()
      this.zoomIndex = (this.zoomIndex + 1) % this.zooms.length
      localStorage.setItem('palo_minimap_zoom', this.zooms[this.zoomIndex])
      this._updateButtonsUI()
    })

    // Expand Button or Click on Radar Frame
    this.btnExpand?.addEventListener('click', (e) => {
      e.stopPropagation()
      this.toggleTacticalMap()
    })

    const radarFrame = document.getElementById('minimap-radar-frame')
    radarFrame?.addEventListener('click', () => {
      this.toggleTacticalMap()
    })

    // Make HUD Minimap and Tactical Dialog Draggable
    if (this.hudEl) {
      const header = this.hudEl.querySelector('.minimap-header')
      if (header) {
        header.setAttribute('title', 'Klik & drag untuk memindahkan minimap (Double click untuk reset)')
        makeDraggable(this.hudEl, header, 'palo_minimap_pos')
      }
    }

    if (this.modalEl) {
      const dialog = this.modalEl.querySelector('.tactical-map-dialog')
      const header = this.modalEl.querySelector('.tactical-map-header')
      if (dialog && header) {
        header.setAttribute('title', 'Klik & drag untuk memindahkan peta (Double click untuk reset)')
        makeDraggable(dialog, header, 'palo_tactical_dialog_pos')
      }
    }

    // Close Modal Button
    this.btnCloseModal?.addEventListener('click', () => {
      this.closeTacticalMap()
    })

    // Tactical Map Canvas Mouse Tracking & Interaction
    if (this.tacticalCanvas) {
      this.tacticalCanvas.addEventListener('mousemove', (e) => {
        const rect = this.tacticalCanvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const bounds = this.mapBounds || { minX: -60, maxX: 60, minZ: -56, maxZ: 56 }
        const spanX = bounds.maxX - bounds.minX
        const spanZ = bounds.maxZ - bounds.minZ
        const wx = bounds.minX + normX * spanX
        const wz = bounds.minZ + normZ * spanZ
        this.hoverWorldCoords = { x: wx, z: wz }

        const zone = getZoneAtPosition(wx, wz, this.zones)
        this.hoverZoneName = zone ? zone.name.toUpperCase() : 'OPEN AREA'

        if (this.tacticalCoordsEl) {
          this.tacticalCoordsEl.textContent = `X: ${wx.toFixed(1)}, Z: ${wz.toFixed(1)} (${this.hoverZoneName})`
        }
      })

      this.tacticalCanvas.addEventListener('mouseleave', () => {
        this.hoverWorldCoords = null
        this.hoverZoneName = null
        if (this.tacticalCoordsEl && this.player) {
          this.tacticalCoordsEl.textContent = `X: ${this.player.position.x.toFixed(1)}, Z: ${this.player.position.z.toFixed(1)}`
        }
      })

      this.tacticalCanvas.addEventListener('click', (e) => {
        if (!this.hoverWorldCoords) return
        const { x, z } = this.hoverWorldCoords

        // Shift+Click: Teleport
        if (e.shiftKey) {
          if (this.player && typeof this.player.teleportTo === 'function') {
            this.player.teleportTo(x, 1.2, z)
            this._showToast(`TELEPORTED TO (${x.toFixed(1)}, ${z.toFixed(1)})`)
          }
        } else {
          // Normal click: Place tactical ping marker
          this.setPing(x, z, 'PING')
        }
      })
    }

    // Global Key Listener: Press [M] to toggle full tactical map
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyM') {
        // Prevent toggle if player is typing in an input
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return
        this.toggleTacticalMap()
      } else if (e.code === 'Escape' && this.isExpanded) {
        this.closeTacticalMap()
      }
    })
  }

  _updateButtonsUI() {
    const currentMode = this.modes[this.modeIndex]
    const currentZoom = this.zooms[this.zoomIndex]

    if (this.btnMode) {
      if (currentMode === 'rotate') {
        this.btnMode.textContent = '🧭'
        this.btnMode.title = 'Mode: Berputar dengan Karakter (Rotate with Player)'
      } else if (currentMode === 'fixed') {
        this.btnMode.textContent = '⬆️'
        this.btnMode.title = 'Mode: Tetap ke Utara (Fixed North-Up, Centered)'
      } else {
        this.btnMode.textContent = '🗺️'
        this.btnMode.title = 'Mode: Peta Penuh (Full Map Overview)'
      }
    }

    if (this.btnZoom) {
      this.btnZoom.textContent = `${currentZoom}x`
      this.btnZoom.title = `Zoom Level: ${currentZoom}x`
    }
  }

  setPing(x, z, label = 'PING') {
    this.pingMarker = {
      x,
      z,
      label,
      time: performance.now(),
      color: '#00f0ff'
    }
  }

  toggleTacticalMap() {
    if (this.isExpanded) {
      this.closeTacticalMap()
    } else {
      this.openTacticalMap()
    }
  }

  openTacticalMap() {
    this.isExpanded = true
    if (this.modalEl) {
      this.modalEl.classList.remove('hidden')
    }
    // Unlock pointer so mouse can interact with tactical map
    if (this.engine && typeof this.engine.unlockPointer === 'function') {
      this.engine.unlockPointer()
    }
  }

  closeTacticalMap() {
    this.isExpanded = false
    if (this.modalEl) {
      this.modalEl.classList.add('hidden')
    }
    // Re-lock pointer back to game controls
    if (this.engine && typeof this.engine.lockPointer === 'function') {
      this.engine.lockPointer()
    }
  }

  _showToast(msg) {
    const toast = document.getElementById('screenshot-toast')
    if (toast) {
      toast.textContent = msg
      toast.classList.remove('hidden')
      clearTimeout(this._toastTimer)
      this._toastTimer = setTimeout(() => toast.classList.add('hidden'), 2200)
    }
  }

  // ── Main Render Loop (Called Every Frame) ─────────────
  update(dt = 0.016) {
    if (!this.player) return

    const now = performance.now()
    const px = this.player.position.x
    const pz = this.player.position.z
    const pyaw = this.player.camera ? this.player.camera.rotation.y : 0

    // Update Current Location Callout every 150ms
    if (now - this.lastZoneCheckTime > 150) {
      this.lastZoneCheckTime = now
      const zone = getZoneAtPosition(px, pz, this.zones)
      this.currentZoneName = zone ? zone.name.toUpperCase() : 'TIDE MARKET'
      if (this.zoneBadgeEl) {
        this.zoneBadgeEl.textContent = `📍 ${this.currentZoneName}`
      }
      if (this.tacticalZoneEl && !this.hoverZoneName) {
        this.tacticalZoneEl.textContent = this.currentZoneName
      }
    }

    // 1. Render HUD Minimap Radar
    if (this.ctx && this.hudEl && !this.hudEl.classList.contains('hidden')) {
      this._renderRadar(px, pz, pyaw, now)
    }

    // 2. Render Full Tactical Map Modal (if open)
    if (this.isExpanded && this.tacticalCtx) {
      this._renderTacticalMap(px, pz, pyaw, now)
    }
  }

  // ── 1. HUD Radar Rendering ─────────────────────────────
  _renderRadar(px, pz, pyaw, now) {
    const ctx = this.ctx
    const w = 200
    const h = 200
    const cx = 100
    const cy = 100
    const R = 94 // Radar radius

    ctx.clearRect(0, 0, w, h)

    const mode = this.modes[this.modeIndex]
    const zoom = this.zooms[this.zoomIndex]

    // Scale calculation
    let scale = 3.2 * zoom // px per world meter
    if (mode === 'full') {
      scale = (2 * R) / 110 // Whole map fits in radar
    }

    ctx.save()

    // Circular clip with anti-aliasing
    ctx.beginPath()
    ctx.arc(cx, cy, R, 0, Math.PI * 2)
    ctx.clip()

    // Dark radar background
    ctx.fillStyle = '#09111a'
    ctx.fillRect(0, 0, w, h)

    // Apply orientation & translation
    ctx.translate(cx, cy)

    if (mode === 'rotate') {
      // Rotate world so player forward direction is straight UP
      ctx.rotate(pyaw)
    }

    // Draw background map
    ctx.save()
    if (mode === 'full') {
      // Fixed at (0, 0)
      const bgScale = scale / (1024 / 110)
      ctx.scale(bgScale, bgScale)
      ctx.drawImage(this.mapBgCanvas, -512, -512)
    } else {
      // Centered on player (px, pz)
      const bgScale = scale / (1024 / 110)
      const bx = ((px + 55) / 110) * 1024
      const by = ((pz + 55) / 110) * 1024
      ctx.scale(bgScale, bgScale)
      ctx.drawImage(this.mapBgCanvas, -bx, -by)
    }
    ctx.restore()

    // Draw Concentric Tactical Range Rings (15m & 30m)
    if (mode !== 'full') {
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)'
      ctx.lineWidth = 1
      ctx.setLineDash([3, 4])
      ctx.beginPath()
      ctx.arc(0, 0, 15 * scale, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(0, 0, 30 * scale, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Helper: World pos to Radar relative pos
    const worldToRadar = (wx, wz) => {
      let dx = wx - px
      let dz = wz - pz
      if (mode === 'full') {
        dx = wx
        dz = wz
      }
      return { rx: dx * scale, ry: dz * scale }
    }

    // Draw Tactical Ping Marker if active
    if (this.pingMarker) {
      const elapsed = now - this.pingMarker.time
      if (elapsed < 6000) {
        const { rx, ry } = worldToRadar(this.pingMarker.x, this.pingMarker.z)
        const pulse = (elapsed % 1000) / 1000
        const pulseR = 6 + pulse * 14
        const alpha = Math.max(0, 1 - pulse)

        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(rx, ry, pulseR, 0, Math.PI * 2)
        ctx.stroke()

        ctx.fillStyle = '#00f0ff'
        ctx.beginPath()
        ctx.arc(rx, ry, 3.5, 0, Math.PI * 2)
        ctx.fill()
      } else {
        this.pingMarker = null
      }
    }

    // Draw Bomb Sites (A & B) with Edge Clamping
    const sites = this._getSites()

    for (const site of sites) {
      const { rx, ry } = worldToRadar(site.x, site.z)
      const dist = Math.hypot(rx, ry)
      let drawX = rx
      let drawY = ry
      let isClamped = false

      if (dist > R - 14) {
        isClamped = true
        const angle = Math.atan2(ry, rx)
        drawX = Math.cos(angle) * (R - 14)
        drawY = Math.sin(angle) * (R - 14)
      }

      this._drawSiteBadge(ctx, drawX, drawY, site.id, site.color, site.bg, isClamped, mode === 'rotate' ? -pyaw : 0)
    }

    // Draw Bots / Enemies
    const botList = this.bots?.getAll?.() || this.bots?.bots || []
    for (const bot of botList) {
      const { rx, ry } = worldToRadar(bot.position.x, bot.position.z)
      const dist = Math.hypot(rx, ry)
      if (dist > R - 4 && mode !== 'full') continue // Outside radar

      ctx.save()
      ctx.translate(rx, ry)

      if (bot.isDead) {
        // Dead: Dimmed Grey X
        ctx.strokeStyle = '#94a3b8'
        ctx.lineWidth = 2
        const s = 4
        ctx.beginPath()
        ctx.moveTo(-s, -s); ctx.lineTo(s, s)
        ctx.moveTo(s, -s); ctx.lineTo(-s, s)
        ctx.stroke()
      } else {
        // Shooting shockwave wave
        if (bot.lastFire && (now - bot.lastFire < 350)) {
          const shootPulse = (now - bot.lastFire) / 350
          ctx.strokeStyle = `rgba(255, 70, 85, ${1 - shootPulse})`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(0, 0, 7 + shootPulse * 12, 0, Math.PI * 2)
          ctx.stroke()
        }

        // Alive: Glowing Red Enemy Blip
        ctx.fillStyle = '#ff4655'
        ctx.beginPath()
        ctx.arc(0, 0, 4.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 1.2
        ctx.stroke()

        // Bot Directional Pip
        let botYaw = bot.rotation || 0
        if (mode === 'rotate') botYaw -= pyaw
        const pipDist = 7
        const pipX = -Math.sin(botYaw) * pipDist
        const pipY = -Math.cos(botYaw) * pipDist
        ctx.strokeStyle = '#ff4655'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(pipX, pipY)
        ctx.stroke()
      }
      ctx.restore()
    }

    // Draw Player
    let playerDrawX = 0
    let playerDrawY = 0
    let playerDrawAngle = -Math.PI / 2 // Straight up in rotate mode

    if (mode === 'fixed') {
      playerDrawAngle = -pyaw - Math.PI / 2
    } else if (mode === 'full') {
      playerDrawX = px * scale
      playerDrawY = pz * scale
      playerDrawAngle = -pyaw - Math.PI / 2
    }

    this._drawPlayerMarker(ctx, playerDrawX, playerDrawY, playerDrawAngle, scale)

    ctx.restore() // Restore from clip & rotation

    // ── Radar Outer Reticle & Compass Needle ───────────────
    ctx.save()

    // Outer Glowing Border Ring
    ctx.strokeStyle = '#00f0ff'
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.arc(cx, cy, R, 0, Math.PI * 2)
    ctx.stroke()

    // Radar subtle inner ring
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(cx, cy, R - 4, 0, Math.PI * 2)
    ctx.stroke()

    // 4 Cardinal Quadrant Ticks (Every 90 deg)
    ctx.strokeStyle = '#00f0ff88'
    ctx.lineWidth = 1.5
    const ticks = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]
    for (const t of ticks) {
      const tx0 = cx + Math.cos(t) * (R - 6)
      const ty0 = cy + Math.sin(t) * (R - 6)
      const tx1 = cx + Math.cos(t) * (R + 1)
      const ty1 = cy + Math.sin(t) * (R + 1)
      ctx.beginPath()
      ctx.moveTo(tx0, ty0)
      ctx.lineTo(tx1, ty1)
      ctx.stroke()
    }

    // North Indicator "N"
    let northAngle = -Math.PI / 2 // North is up by default
    if (mode === 'rotate') {
      northAngle = -Math.PI / 2 + pyaw
    }
    const nx = cx + Math.cos(northAngle) * (R - 10)
    const ny = cy + Math.sin(northAngle) * (R - 10)

    ctx.fillStyle = '#00f0ff'
    ctx.font = 'bold 11px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('N', nx, ny)

    ctx.restore()
  }

  // ── 2. Player Vision Cone & Chevron ─────────────────────
  _drawPlayerMarker(ctx, x, y, angle, scale) {
    ctx.save()
    ctx.translate(x, y)

    // Forward Vision Cone (FOV ~70 deg, length ~26m)
    const fovHalf = (35 * Math.PI) / 180
    const coneLen = Math.min(26 * scale, 90)

    const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, coneLen)
    grad.addColorStop(0.0, 'rgba(0, 240, 255, 0.38)')
    grad.addColorStop(0.6, 'rgba(0, 240, 255, 0.12)')
    grad.addColorStop(1.0, 'rgba(0, 240, 255, 0.0)')

    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, coneLen, angle - fovHalf, angle + fovHalf)
    ctx.closePath()
    ctx.fill()

    // Player Directional Arrow / Chevron
    ctx.rotate(angle + Math.PI / 2) // Orient arrow pointing up local

    // Halo glow
    ctx.fillStyle = 'rgba(0, 240, 255, 0.35)'
    ctx.beginPath()
    ctx.arc(0, 0, 8, 0, Math.PI * 2)
    ctx.fill()

    // Chevron Shape
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#00f0ff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, -9)      // Tip pointing forward
    ctx.lineTo(6, 6)       // Right wing
    ctx.lineTo(0, 3)       // Inner notch
    ctx.lineTo(-6, 6)      // Left wing
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.restore()
  }

  // ── 3. Bomb Site Badges with Edge Arrows ───────────────
  _drawSiteBadge(ctx, x, y, label, color, bg, isClamped = false, counterAngle = 0) {
    ctx.save()
    ctx.translate(x, y)

    // Counter-rotate text so letters always stay upright
    if (counterAngle) {
      ctx.rotate(counterAngle)
    }

    // Diamond Background
    const r = 9
    ctx.fillStyle = bg
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, -r)
    ctx.lineTo(r, 0)
    ctx.lineTo(0, r)
    ctx.lineTo(-r, 0)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Letter "A" or "B"
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 11px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, 0, 1)

    // If clamped to edge, add subtle directional arrow
    if (isClamped) {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(0, 0, 2.5, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.restore()
  }

  // ── 4. Full Tactical Map Modal Rendering ([M]) ──────────
  _renderTacticalMap(px, pz, pyaw, now) {
    const ctx = this.tacticalCtx
    const size = 600
    const pad = 24
    const mapSize = size - pad * 2 // 552 px
    const scale = mapSize / 110   // ~5.018 px/m

    ctx.clearRect(0, 0, size, size)

    // Dark high-tech frame background
    ctx.fillStyle = '#060e16'
    ctx.fillRect(0, 0, size, size)

    ctx.save()
    ctx.translate(pad, pad)

    // Draw background map texture
    ctx.drawImage(this.mapBgCanvas, 0, 0, mapSize, mapSize)

    // Coordinate grid overlay (every 10 meters)
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)'
    ctx.lineWidth = 1
    const step = mapSize / 11
    ctx.fillStyle = '#94a3b8'
    ctx.font = '9px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const bounds = this.mapBounds || { minX: -60, maxX: 60, minZ: -56, maxZ: 56 }
    const spanX = bounds.maxX - bounds.minX
    const spanZ = bounds.maxZ - bounds.minZ

    for (let i = 0; i <= 12; i++) {
      const coord = Math.round(bounds.minX + (i / 12) * spanX)
      const pos = (i / 12) * mapSize
      // Grid lines
      ctx.beginPath(); ctx.moveTo(pos, 0); ctx.lineTo(pos, mapSize); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, pos); ctx.lineTo(mapSize, pos); ctx.stroke()
      // Labels along top and left
      if (i > 0 && i < 12) {
        ctx.fillText(`${coord}m`, pos, -10)
        ctx.fillText(`${coord}m`, -14, pos)
      }
    }

    // World to Tactical Canvas Pos
    const toTactical = (wx, wz) => {
      const tx = ((wx - bounds.minX) / spanX) * mapSize
      const tz = ((wz - bounds.minZ) / spanZ) * mapSize
      return { tx, tz }
    }

    // Delineate Zones with Subtle Callout Tags
    for (const z of this.zones) {
      const minX = z.minX ?? (z.rect ? z.rect[0] : 0)
      const minZ = z.minZ ?? (z.rect ? z.rect[1] : 0)
      const maxX = z.maxX ?? (z.rect ? z.rect[2] : 0)
      const maxZ = z.maxZ ?? (z.rect ? z.rect[3] : 0)

      const p0 = toTactical(minX, minZ)
      const p1 = toTactical(maxX, maxZ)
      const zw = p1.tx - p0.tx
      const zh = p1.tz - p0.tz

      // Highlight zone if hovered
      const zName = z.name || z.id || ''
      const isHovered = this.hoverZoneName && this.hoverZoneName === zName.toUpperCase()
      if (isHovered) {
        ctx.fillStyle = 'rgba(0, 240, 255, 0.18)'
        ctx.fillRect(p0.tx, p0.tz, zw, zh)
        ctx.strokeStyle = '#00f0ff'
        ctx.lineWidth = 2
        ctx.strokeRect(p0.tx, p0.tz, zw, zh)
      }

      // Zone Title Label in Center
      const cx = p0.tx + zw / 2
      const cy = p0.tz + zh / 2

      ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.75)'
      ctx.font = isHovered ? 'bold 11px sans-serif' : '10px sans-serif'
      ctx.fillText(zName.toUpperCase(), cx, cy)
    }

    // Sites A & B Diamonds
    const sites = this._getSites()
    for (const s of sites) {
      const p = toTactical(s.x, s.z)
      this._drawSiteBadge(ctx, p.tx, p.tz, s.id, s.color, s.bg, false, 0)
    }

    // Tactical Ping Marker
    if (this.pingMarker) {
      const p = toTactical(this.pingMarker.x, this.pingMarker.z)
      const elapsed = now - this.pingMarker.time
      const pulse = (elapsed % 1000) / 1000
      ctx.strokeStyle = `rgba(0, 240, 255, ${Math.max(0, 1 - pulse)})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(p.tx, p.tz, 8 + pulse * 18, 0, Math.PI * 2)
      ctx.stroke()
      ctx.fillStyle = '#00f0ff'
      ctx.beginPath()
      ctx.arc(p.tx, p.tz, 4, 0, Math.PI * 2)
      ctx.fill()
    }

    // Bots / Enemies
    const botList = this.bots?.getAll?.() || this.bots?.bots || []
    for (const bot of botList) {
      const bp = toTactical(bot.position.x, bot.position.z)
      ctx.save()
      ctx.translate(bp.tx, bp.tz)

      if (bot.isDead) {
        ctx.strokeStyle = '#64748b'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(-4, -4); ctx.lineTo(4, 4)
        ctx.moveTo(4, -4); ctx.lineTo(-4, 4)
        ctx.stroke()
      } else {
        ctx.fillStyle = '#ff4655'
        ctx.beginPath()
        ctx.arc(0, 0, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 1.2
        ctx.stroke()

        // Bot Direction Tip
        const botYaw = bot.rotation || 0
        const tipX = -Math.sin(botYaw) * 9
        const tipY = -Math.cos(botYaw) * 9
        ctx.strokeStyle = '#ff4655'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, 0); ctx.lineTo(tipX, tipY); ctx.stroke()

        // Bot Name Tag
        ctx.fillStyle = '#f8fafc'
        ctx.font = '9px sans-serif'
        ctx.fillText(bot.name || 'BOT', 0, -8)
      }
      ctx.restore()
    }

    // Player Marker on Tactical Map
    const playerP = toTactical(px, pz)
    const playerAngle = -pyaw - Math.PI / 2
    this._drawPlayerMarker(ctx, playerP.tx, playerP.tz, playerAngle, scale)

    // Cursor Crosshair Guide if mouse inside canvas
    if (this.hoverWorldCoords) {
      const cp = toTactical(this.hoverWorldCoords.x, this.hoverWorldCoords.z)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)'
      ctx.lineWidth = 1
      ctx.setLineDash([2, 4])
      ctx.beginPath()
      ctx.moveTo(cp.tx, 0); ctx.lineTo(cp.tx, mapSize); ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, cp.tz); ctx.lineTo(mapSize, cp.tz); ctx.stroke()
      ctx.setLineDash([])

      ctx.fillStyle = '#00f0ff'
      ctx.beginPath()
      ctx.arc(cp.tx, cp.tz, 4, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.restore()

    // Outer Tactical Border
    ctx.strokeStyle = '#00f0ff'
    ctx.lineWidth = 2
    ctx.strokeRect(pad - 1, pad - 1, mapSize + 2, mapSize + 2)
  }

  destroy() {
    this.closeTacticalMap()
  }
}
