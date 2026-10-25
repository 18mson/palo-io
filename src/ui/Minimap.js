/**
 * Minimap — Valorant-style Tactical Minimap & Full Tactical Map View
 * Features:
 *  - Circular high-contrast HUD radar with rotating / fixed orientation
 *  - Player FOV vision cone & directional chevron tracking live camera aim
 *  - Live bot tracking with firing shockwaves & dead state
 *  - Real-time zone detection & callout badge (e.g. "MID COURTYARD", "A SITE")
 *  - Continuous connected walkable route floorplan (rooms, corridors, stairs, teleporters)
 *  - Bomb sites A and B with plant zones, edge clamping & directional arrows
 *  - Full Tactical Map modal (Hotkey [M] or expand button) with zone labels,
 *    cursor coordinates, interactive click-to-ping / click-to-teleport
 */

import * as THREE from 'three'
import bindLayout from '../map/bind/bind.layout.json'
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
    this.engine     = options.engine || null
    this.layout     = options.layout || bindLayout
    this.mapBounds  = options.mapBounds || { minX: -60, maxX: 60, minZ: -56, maxZ: 56 }
    this.imageSrc   = options.imageSrc || null

    // Build zones list from regions and connectors
    const regions = (this.layout?.regions || []).map(r => ({
      id: r.id,
      name: r.name || r.id,
      minX: r.rect[0],
      minZ: r.rect[1],
      maxX: r.rect[2],
      maxZ: r.rect[3],
      level: r.level || 0
    }))
    const connectors = (this.layout?.connectors || []).map(c => {
      const n0 = c.between?.[0] || ''
      const n1 = c.between?.[1] || ''
      return {
        id: c.id,
        name: c.name || `${n0} to ${n1}`,
        minX: c.rect[0],
        minZ: c.rect[1],
        maxX: c.rect[2],
        maxZ: c.rect[3],
        level: c.level || 0
      }
    })
    this.zones = options.zones && options.zones.length > 0 ? options.zones : [...regions, ...connectors]

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

    // Offscreen Canvas for caching vector map background
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
    if (zones && zones.length > 0) {
      this.zones = zones
    }
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
    if (this.layout?.plantZones) {
      if (this.layout.plantZones.A) {
        const [x0, z0, x1, z1] = this.layout.plantZones.A
        list.push({ id: 'A', x: (x0 + x1) / 2, z: (z0 + z1) / 2, color: '#06b6d4', bg: '#083344' })
      }
      if (this.layout.plantZones.B) {
        const [x0, z0, x1, z1] = this.layout.plantZones.B
        list.push({ id: 'B', x: (x0 + x1) / 2, z: (z0 + z1) / 2, color: '#f59e0b', bg: '#451a03' })
      }
    }
    if (list.length === 0) {
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
    }
    return list
  }

  // ── Procedural Vector Base Map (Continuous Tactical Routes) ──────
  _buildProceduralMapBase() {
    const ctx = this.mapBgCanvas.getContext('2d')
    const size = 1024
    ctx.clearRect(0, 0, size, size)

    // 1. Deep Tactical Space Background
    ctx.fillStyle = '#070c14'
    ctx.fillRect(0, 0, size, size)

    // Uniform 8.0 px/m scale:
    // Map bounds: X [-60, 60] (span 120m), Z [-56, 56] (span 112m)
    // 120m * 8.0 = 960px, 112m * 8.0 = 896px. Center in 1024x1024:
    const ppm = 8.0
    const offX = 32
    const offY = 64
    const toBgX = (wx) => offX + (wx - (-60)) * ppm
    const toBgY = (wz) => offY + (wz - (-56)) * ppm
    const toBgW = (rw) => rw * ppm
    const toBgH = (rh) => rh * ppm

    // Subtle 10-meter grid lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)'
    ctx.lineWidth = 1
    for (let gx = -60; gx <= 60; gx += 10) {
      const cx = toBgX(gx)
      ctx.beginPath(); ctx.moveTo(cx, offY); ctx.lineTo(cx, offY + 896); ctx.stroke()
    }
    for (let gz = -56; gz <= 56; gz += 10) {
      const cy = toBgY(gz)
      ctx.beginPath(); ctx.moveTo(offX, cy); ctx.lineTo(offX + 960, cy); ctx.stroke()
    }

    // Outer Map Bounds Frame
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.16)'
    ctx.lineWidth = 2
    ctx.strokeRect(offX, offY, 960, 896)

    // 2. CONNECTORS (Corridors connecting rooms into seamless routes)
    const connectors = this.layout?.connectors || []
    for (const c of connectors) {
      const [x0, z0, x1, z1] = c.rect
      const bx = toBgX(x0)
      const by = toBgY(z0)
      const bw = toBgW(x1 - x0)
      const bh = toBgH(z1 - z0)

      // Tactical corridor floor fill
      ctx.fillStyle = '#141e2b'
      ctx.fillRect(bx, by, bw, bh)
      // Corridor edge walls
      ctx.strokeStyle = '#27384e'
      ctx.lineWidth = 1.5
      ctx.strokeRect(bx, by, bw, bh)
    }

    // 3. REGIONS (Rooms, Halls, Sites, Spawns)
    const regions = this.layout?.regions || []
    for (const r of regions) {
      const [x0, z0, x1, z1] = r.rect
      const bx = toBgX(x0)
      const by = toBgY(z0)
      const bw = toBgW(x1 - x0)
      const bh = toBgH(z1 - z0)

      let fillColor = '#172333'
      let strokeColor = '#2b3f58'

      if (r.id === 'attackerSpawn' || r.id === 'attackerCave') {
        fillColor = '#241419'
        strokeColor = 'rgba(239, 68, 68, 0.45)'
      } else if (r.id === 'defenderSpawn') {
        fillColor = '#122033'
        strokeColor = 'rgba(59, 130, 246, 0.45)'
      } else if (r.id === 'aSite') {
        fillColor = '#0f2738'
        strokeColor = 'rgba(6, 182, 212, 0.5)'
      } else if (r.id === 'bSite') {
        fillColor = '#291e12'
        strokeColor = 'rgba(245, 158, 11, 0.5)'
      } else if (r.level === 1) {
        // Elevated areas (A Heaven, B Hookah)
        fillColor = '#21182b'
        strokeColor = 'rgba(168, 85, 247, 0.55)'
      }

      ctx.fillStyle = fillColor
      ctx.fillRect(bx, by, bw, bh)
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = 2
      ctx.strokeRect(bx, by, bw, bh)
    }

    // 4. STAIRS (Directional Hatch Lines)
    const stairs = this.layout?.stairs || []
    for (const s of stairs) {
      const [x0, z0, x1, z1] = s.rect
      const bx = toBgX(x0)
      const by = toBgY(z0)
      const bw = toBgW(x1 - x0)
      const bh = toBgH(z1 - z0)

      ctx.fillStyle = '#3a2512'
      ctx.fillRect(bx, by, bw, bh)
      ctx.strokeStyle = '#d97706'
      ctx.lineWidth = 1.5
      ctx.strokeRect(bx, by, bw, bh)

      // Hatch steps
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.65)'
      ctx.lineWidth = 1.5
      const d = s.ascendsToward
      if (d === 'west' || d === 'east') {
        const stepCount = (x1 - x0) * 2
        for (let i = 1; i < stepCount; i++) {
          const hx = toBgX(x0 + i * 0.5)
          ctx.beginPath(); ctx.moveTo(hx, by); ctx.lineTo(hx, by + bh); ctx.stroke()
        }
      } else {
        const stepCount = (z1 - z0) * 2
        for (let i = 1; i < stepCount; i++) {
          const hy = toBgY(z0 + i * 0.5)
          ctx.beginPath(); ctx.moveTo(bx, hy); ctx.lineTo(bx + bw, hy); ctx.stroke()
        }
      }
    }

    // 5. WINDOWS (Viewports / Ledges)
    const windows = this.layout?.windows || []
    for (const wnd of windows) {
      const [x0, z0, x1, z1] = wnd.rect
      const bx = toBgX(x0)
      const by = toBgY(z0)
      const bw = toBgW(x1 - x0)
      const bh = toBgH(z1 - z0)

      ctx.strokeStyle = '#06b6d4'
      ctx.lineWidth = 3
      ctx.strokeRect(bx, by, bw, bh)
    }

    // 6. SPIKE PLANT ZONES (A & B)
    if (this.layout?.plantZones) {
      const pzDefs = [
        { key: 'A', rect: this.layout.plantZones.A, color: '#facc15' },
        { key: 'B', rect: this.layout.plantZones.B, color: '#facc15' }
      ]
      for (const p of pzDefs) {
        if (!p.rect) continue
        const [x0, z0, x1, z1] = p.rect
        const bx = toBgX(x0)
        const by = toBgY(z0)
        const bw = toBgW(x1 - x0)
        const bh = toBgH(z1 - z0)

        // Semi-transparent yellow zone
        ctx.fillStyle = 'rgba(250, 204, 21, 0.12)'
        ctx.fillRect(bx, by, bw, bh)

        // Dashed border
        ctx.strokeStyle = p.color
        ctx.lineWidth = 2.5
        ctx.setLineDash([6, 5])
        ctx.strokeRect(bx, by, bw, bh)
        ctx.setLineDash([])
      }
    }

    // 7. TELEPORTERS & TELEPORT ROUTES
    const teleporters = this.layout?.teleporters || []
    for (const tp of teleporters) {
      if (tp.entryPad) {
        const [x0, z0, x1, z1] = tp.entryPad
        const bx = toBgX(x0)
        const by = toBgY(z0)
        const bw = toBgW(x1 - x0)
        const bh = toBgH(z1 - z0)

        // Portal entry pad (Glowing violet)
        ctx.fillStyle = 'rgba(168, 85, 247, 0.45)'
        ctx.fillRect(bx, by, bw, bh)
        ctx.strokeStyle = '#c084fc'
        ctx.lineWidth = 2.5
        ctx.strokeRect(bx, by, bw, bh)

        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 10px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('PORTAL', bx + bw / 2, by + bh / 2)
      }

      if (tp.exitPad) {
        const [x0, z0, x1, z1] = tp.exitPad
        const bx = toBgX(x0)
        const by = toBgY(z0)
        const bw = toBgW(x1 - x0)
        const bh = toBgH(z1 - z0)

        // Portal exit pad (Teal)
        ctx.fillStyle = 'rgba(20, 184, 166, 0.35)'
        ctx.fillRect(bx, by, bw, bh)
        ctx.strokeStyle = '#2dd4bf'
        ctx.lineWidth = 2.5
        ctx.strokeRect(bx, by, bw, bh)

        ctx.fillStyle = '#2dd4bf'
        ctx.font = 'bold 10px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('EXIT', bx + bw / 2, by + bh / 2)
      }

      // Route dashed arc connecting entrance to exit
      if (tp.entryPad && tp.exitPad) {
        const enX = toBgX((tp.entryPad[0] + tp.entryPad[2]) / 2)
        const enY = toBgY((tp.entryPad[1] + tp.entryPad[3]) / 2)
        const exX = toBgX((tp.exitPad[0] + tp.exitPad[2]) / 2)
        const exY = toBgY((tp.exitPad[1] + tp.exitPad[3]) / 2)

        ctx.save()
        ctx.strokeStyle = 'rgba(192, 132, 252, 0.35)'
        ctx.lineWidth = 2
        ctx.setLineDash([4, 6])
        ctx.beginPath()
        ctx.moveTo(enX, enY)
        const midY = Math.min(enY, exY) - 30
        ctx.quadraticCurveTo((enX + exX) / 2, midY, exX, exY)
        ctx.stroke()
        ctx.restore()
      }
    }

    // 8. PROPS / COVER (Crates, Containers, Pillars)
    const props = this.layout?.props || []
    for (const p of props) {
      const [x0, z0, x1, z1] = p.rect
      const bx = toBgX(x0)
      const by = toBgY(z0)
      const bw = toBgW(x1 - x0)
      const bh = toBgH(z1 - z0)

      ctx.fillStyle = '#0b111a'
      ctx.fillRect(bx, by, bw, bh)
      ctx.strokeStyle = '#334155'
      ctx.lineWidth = 1.2
      ctx.strokeRect(bx, by, bw, bh)

      // Crate cross
      if (p.type === 'crate') {
        ctx.strokeStyle = '#1e293b'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(bx, by); ctx.lineTo(bx + bw, by + bh)
        ctx.moveTo(bx + bw, by); ctx.lineTo(bx, by + bh)
        ctx.stroke()
      }
    }

    // 9. STRATEGIC CALLOUT LABELS ON THE MAP
    const callouts = [
      { name: 'ATTACKER SPAWN', x: 0, z: 49, color: '#f87171' },
      { name: 'DEFENDER SPAWN', x: 0, z: -49, color: '#60a5fa' },
      { name: 'A SITE', x: -40, z: -13, color: '#38bdf8' },
      { name: 'B SITE', x: 37, z: -14, color: '#fbbf24' },
      { name: 'A SHORT', x: -28, z: 18, color: '#94a3b8' },
      { name: 'A BATH', x: -51, z: 30, color: '#94a3b8' },
      { name: 'A LOBBY', x: -36, z: 46, color: '#94a3b8' },
      { name: 'B LOBBY', x: 36, z: 46, color: '#94a3b8' },
      { name: 'B LONG', x: 47, z: 24, color: '#94a3b8' },
      { name: 'B HOOKAH', x: 30, z: -1, color: '#c084fc' },
      { name: 'A HEAVEN', x: -48, z: -18, color: '#c084fc' },
      { name: 'MARKET', x: 0, z: -28, color: '#94a3b8' },
      { name: 'B ELBOW', x: 21, z: -16, color: '#94a3b8' }
    ]

    for (const c of callouts) {
      const cx = toBgX(c.x)
      const cy = toBgY(c.z)

      ctx.font = 'bold 11px sans-serif'
      const textMetrics = ctx.measureText(c.name)
      const pw = textMetrics.width + 12
      const ph = 18

      // Pill background
      ctx.fillStyle = 'rgba(7, 12, 20, 0.82)'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(cx - pw / 2, cy - ph / 2, pw, ph, 4)
      ctx.fill()
      ctx.stroke()

      // Text
      ctx.fillStyle = c.color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(c.name, cx, cy)
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

    ctx.fillStyle = '#071018'
    ctx.fillRect(0, 0, size, size)
    ctx.drawImage(img, 0, 0, size, size)

    ctx.save()
    ctx.fillStyle = 'rgba(10, 20, 30, 0.15)'
    ctx.fillRect(0, 0, size, size)

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)'
    ctx.lineWidth = 1
    const step = size / 11
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

        const size = 600
        const pad = 24
        const availW = size - pad * 2
        const availH = size - pad * 2
        const scale = Math.min(availW / 120, availH / 112)
        const renderedW = 120 * scale
        const renderedH = 112 * scale
        const offX = pad + (availW - renderedW) * 0.5
        const offY = pad + (availH - renderedH) * 0.5

        const wx = -60 + (mouseX - offX) / scale
        const wz = -56 + (mouseY - offY) / scale

        if (wx >= -60 && wx <= 60 && wz >= -56 && wz <= 56) {
          this.hoverWorldCoords = { x: wx, z: wz }
          const zone = getZoneAtPosition(wx, wz, this.zones)
          this.hoverZoneName = zone ? (zone.name || zone.id || '').toUpperCase() : 'TACTICAL SECTOR'

          if (this.tacticalCoordsEl) {
            this.tacticalCoordsEl.textContent = `X: ${wx.toFixed(1)}, Z: ${wz.toFixed(1)} (${this.hoverZoneName})`
          }
        } else {
          this.hoverWorldCoords = null
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
        this.btnMode.title = 'Mode: Berputar dengan Karakter (Rotate with Player Aim)'
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

    // Compute player aim angle from camera world direction vector
    // Looking North (-Z): Math.atan2(-1, 0) = -Math.PI / 2
    // Looking East (+X):  Math.atan2(0, 1)  = 0
    // Looking South (+Z): Math.atan2(1, 0)  = Math.PI / 2
    // Looking West (-X):  Math.atan2(0, -1) = Math.PI
    let aimAngle = -Math.PI / 2
    if (this.player.camera) {
      const lookDir = new THREE.Vector3()
      this.player.camera.getWorldDirection(lookDir)
      aimAngle = Math.atan2(lookDir.z, lookDir.x)
    }

    // Update Current Location Callout every 150ms
    if (now - this.lastZoneCheckTime > 150) {
      this.lastZoneCheckTime = now
      const zone = getZoneAtPosition(px, pz, this.zones)
      this.currentZoneName = zone ? (zone.name || zone.id || '').toUpperCase() : 'TIDE MARKET'
      if (this.zoneBadgeEl) {
        this.zoneBadgeEl.textContent = `📍 ${this.currentZoneName}`
      }
      if (this.tacticalZoneEl && !this.hoverZoneName) {
        this.tacticalZoneEl.textContent = this.currentZoneName
      }
    }

    // 1. Render HUD Minimap Radar
    if (this.ctx && this.hudEl && !this.hudEl.classList.contains('hidden')) {
      this._renderRadar(px, pz, aimAngle, now)
    }

    // 2. Render Full Tactical Map Modal (if open)
    if (this.isExpanded && this.tacticalCtx) {
      this._renderTacticalMap(px, pz, aimAngle, now)
    }
  }

  // ── 1. HUD Radar Rendering ─────────────────────────────
  _renderRadar(px, pz, aimAngle, now) {
    const ctx = this.ctx
    const w = 200
    const h = 200
    const cx = 100
    const cy = 100
    const R = 94 // Radar radius

    ctx.clearRect(0, 0, w, h)

    const mode = this.modes[this.modeIndex]
    const zoom = this.zooms[this.zoomIndex]

    // Scale calculation (pixels per world meter)
    let scale = 3.2 * zoom
    if (mode === 'full') {
      scale = (2 * R) / 120 // Whole map fits in radar radius
    }

    ctx.save()

    // Circular clip with anti-aliasing
    ctx.beginPath()
    ctx.arc(cx, cy, R, 0, Math.PI * 2)
    ctx.clip()

    // Dark radar background
    ctx.fillStyle = '#080e18'
    ctx.fillRect(0, 0, w, h)

    // Apply orientation & translation
    ctx.translate(cx, cy)

    // Save unrotated state centered at (cx, cy)
    ctx.save()

    // In rotate mode: rotate world so player aim direction is always straight UP (-Math.PI / 2)
    const radarRotation = mode === 'rotate' ? (-aimAngle - Math.PI / 2) : 0
    if (radarRotation !== 0) {
      ctx.rotate(radarRotation)
    }

    // Draw background map
    ctx.save()
    // mapBgCanvas has uniform scale 8.0 px/m with map centered at (512, 512)
    const bgScale = scale / 8.0
    ctx.scale(bgScale, bgScale)

    if (mode === 'full') {
      ctx.drawImage(this.mapBgCanvas, -512, -512)
    } else {
      // Player pos on mapBgCanvas: X in [-60, 60] -> 32 + (px + 60)*8, Z in [-56, 56] -> 64 + (pz + 56)*8
      const playerBgX = 32 + (px + 60) * 8.0
      const playerBgY = 64 + (pz + 56) * 8.0
      ctx.drawImage(this.mapBgCanvas, -playerBgX, -playerBgY)
    }
    ctx.restore()

    // Draw Concentric Tactical Range Rings (15m & 30m)
    if (mode !== 'full') {
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)'
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

      this._drawSiteBadge(ctx, drawX, drawY, site.id, site.color, site.bg, isClamped, mode === 'rotate' ? -radarRotation : 0)
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

        // Bot Directional Pip (local frame inside rotated ctx)
        const botYaw = bot.rotation || 0
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

    // Restore world rotation so coordinate space returns to unrotated screen space at (cx, cy)
    ctx.restore()

    // Draw Player Marker & Aim View Area in screen space
    let playerDrawX = 0
    let playerDrawY = 0
    // In rotate mode: player is centered and aim is ALWAYS straight UP (-Math.PI / 2) on screen!
    let playerDrawAngle = -Math.PI / 2

    if (mode === 'fixed') {
      playerDrawAngle = aimAngle
    } else if (mode === 'full') {
      playerDrawX = px * scale
      playerDrawY = pz * scale
      playerDrawAngle = aimAngle
    }

    this._drawPlayerMarker(ctx, playerDrawX, playerDrawY, playerDrawAngle, scale)

    ctx.restore() // Restore circular clip & translation back to canvas root

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
      northAngle = -Math.PI / 2 + radarRotation
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
    const coneLen = Math.min(26 * scale, 95)

    // Glowing FOV Wedge Gradient
    const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, coneLen)
    grad.addColorStop(0.0, 'rgba(0, 240, 255, 0.45)')
    grad.addColorStop(0.35, 'rgba(0, 240, 255, 0.22)')
    grad.addColorStop(0.7, 'rgba(0, 240, 255, 0.08)')
    grad.addColorStop(1.0, 'rgba(0, 240, 255, 0.0)')

    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, coneLen, angle - fovHalf, angle + fovHalf)
    ctx.closePath()
    ctx.fill()

    // Crisp Vision Perimeter Edge Rays (Tactical Look)
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)'
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(Math.cos(angle - fovHalf) * coneLen, Math.sin(angle - fovHalf) * coneLen)
    ctx.moveTo(0, 0)
    ctx.lineTo(Math.cos(angle + fovHalf) * coneLen, Math.sin(angle + fovHalf) * coneLen)
    ctx.stroke()

    // Player Directional Arrow / Chevron
    ctx.rotate(angle + Math.PI / 2) // Orient arrow pointing up local

    // Halo glow
    ctx.fillStyle = 'rgba(0, 240, 255, 0.35)'
    ctx.beginPath()
    ctx.arc(0, 0, 8, 0, Math.PI * 2)
    ctx.fill()

    // Player Base Dot
    ctx.fillStyle = '#00f0ff'
    ctx.beginPath()
    ctx.arc(0, 0, 3.5, 0, Math.PI * 2)
    ctx.fill()

    // Chevron Shape
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#00f0ff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, -10)     // Tip pointing forward
    ctx.lineTo(6.5, 6)     // Right wing
    ctx.lineTo(0, 2.5)     // Inner notch
    ctx.lineTo(-6.5, 6)    // Left wing
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
  _renderTacticalMap(px, pz, aimAngle, now) {
    const ctx = this.tacticalCtx
    const size = 600
    const pad = 24
    const availW = size - pad * 2 // 552 px
    const availH = size - pad * 2 // 552 px

    ctx.clearRect(0, 0, size, size)

    // Dark high-tech frame background
    ctx.fillStyle = '#060e16'
    ctx.fillRect(0, 0, size, size)

    // Map bounds: X [-60, 60] (120m), Z [-56, 56] (112m)
    // Uniform scale with letterboxing:
    const scale = Math.min(availW / 120, availH / 112) // 4.6 px/m
    const renderedW = 120 * scale // 552 px
    const renderedH = 112 * scale // 515.2 px
    const offX = pad + (availW - renderedW) * 0.5 // 24 px
    const offY = pad + (availH - renderedH) * 0.5 // 42.4 px

    ctx.save()

    // Draw background map texture from source rect (32, 64, 960, 896) to destination
    ctx.drawImage(this.mapBgCanvas, 32, 64, 960, 896, offX, offY, renderedW, renderedH)

    // World to Tactical Canvas Pos
    const toTactical = (wx, wz) => {
      const tx = offX + (wx - (-60)) * scale
      const tz = offY + (wz - (-56)) * scale
      return { tx, tz }
    }

    // Coordinate grid overlay
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.10)'
    ctx.lineWidth = 1
    ctx.fillStyle = '#64748b'
    ctx.font = '9px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    for (let gx = -60; gx <= 60; gx += 10) {
      const p = toTactical(gx, -56)
      ctx.beginPath(); ctx.moveTo(p.tx, offY); ctx.lineTo(p.tx, offY + renderedH); ctx.stroke()
      if (gx !== -60 && gx !== 60) {
        ctx.fillText(`${gx}m`, p.tx, offY - 10)
      }
    }
    for (let gz = -56; gz <= 56; gz += 10) {
      const p = toTactical(-60, gz)
      ctx.beginPath(); ctx.moveTo(offX, p.tz); ctx.lineTo(offX + renderedW, p.tz); ctx.stroke()
      if (gz !== -56 && gz !== 56) {
        ctx.fillText(`${gz}m`, offX - 14, p.tz)
      }
    }

    // Highlight hovered zone
    if (this.hoverZoneName) {
      for (const z of this.zones) {
        const zName = (z.name || z.id || '').toUpperCase()
        if (zName === this.hoverZoneName) {
          const minX = z.minX ?? (z.rect ? z.rect[0] : 0)
          const minZ = z.minZ ?? (z.rect ? z.rect[1] : 0)
          const maxX = z.maxX ?? (z.rect ? z.rect[2] : 0)
          const maxZ = z.maxZ ?? (z.rect ? z.rect[3] : 0)

          const p0 = toTactical(minX, minZ)
          const p1 = toTactical(maxX, maxZ)
          const zw = p1.tx - p0.tx
          const zh = p1.tz - p0.tz

          ctx.fillStyle = 'rgba(0, 240, 255, 0.18)'
          ctx.fillRect(p0.tx, p0.tz, zw, zh)
          ctx.strokeStyle = '#00f0ff'
          ctx.lineWidth = 2
          ctx.strokeRect(p0.tx, p0.tz, zw, zh)
        }
      }
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

    // Player Marker & Vision Area on Tactical Map
    const playerP = toTactical(px, pz)
    const playerAngle = aimAngle
    this._drawPlayerMarker(ctx, playerP.tx, playerP.tz, playerAngle, scale)

    // Cursor Crosshair Guide if mouse inside canvas
    if (this.hoverWorldCoords) {
      const cp = toTactical(this.hoverWorldCoords.x, this.hoverWorldCoords.z)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)'
      ctx.lineWidth = 1
      ctx.setLineDash([2, 4])
      ctx.beginPath()
      ctx.moveTo(cp.tx, offY); ctx.lineTo(cp.tx, offY + renderedH); ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(offX, cp.tz); ctx.lineTo(offX + renderedW, cp.tz); ctx.stroke()
      ctx.setLineDash([])

      ctx.fillStyle = '#00f0ff'
      ctx.beginPath()
      ctx.arc(cp.tx, cp.tz, 4, 0, Math.PI * 2)
      ctx.fill()
    }

    // Outer Tactical Border
    ctx.strokeStyle = '#00f0ff'
    ctx.lineWidth = 2
    ctx.strokeRect(offX - 1, offY - 1, renderedW + 2, renderedH + 2)

    ctx.restore()
  }

  destroy() {
    this.closeTacticalMap()
  }
}
