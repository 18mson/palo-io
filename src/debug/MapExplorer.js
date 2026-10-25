import * as THREE from 'three'
import ascentMap from '../map/maps/ascent.json'
import { makeDraggable } from '../ui/draggable.js'

/**
 * MapExplorer — Special Map Exploration & Debug Mode
 * Features:
 *  - 3D Free-Fly / Noclip mode through walls and floors
 *  - Real-time Zone Detection & XYZ coordinate telemetry
 *  - 3D Wireframe Collision & Ramp Slope visualizer
 *  - Instant Teleportation to all 12 key tactical zones
 *  - Bot Control (Freeze / Passive / Active) for testing hitboxes & sightlines
 *  - God Mode & Infinite Ammo
 *  - On-screen debug HUD & Interactive Teleport bar
 */

export function buildTeleportZones(zones) {
  const defaultKeys = {
    'siteA': '1',
    'aHeaven': '2',
    'aHell': '3',
    'midCourtyard': '5',
    'midCanal': '7',
    'siteB': '8',
    'bHeaven': '9',
    'bHell': '0',
    'westAlley': '-',
    'eastAlley': '=',
    'attackerSpawn': '[',
    'defenderSpawn': ']'
  }

  return (zones || []).map((z, idx) => {
    const cx = (z.minX + z.maxX) / 2
    const cz = (z.minZ + z.maxZ) / 2
    const cy = z.y ?? (z.minY != null ? (z.minY + 0.9) : 0.9)
    const key = z.key || defaultKeys[z.id] || String((idx + 1) % 10)
    return {
      id: z.id,
      name: z.name,
      x: cx,
      y: cy,
      z: cz,
      key,
      minX: z.minX,
      maxX: z.maxX,
      minZ: z.minZ,
      maxZ: z.maxZ,
      minY: z.minY,
      maxY: z.maxY,
      color: z.color,
      desc: z.desc
    }
  })
}

export const TELEPORT_ZONES = buildTeleportZones(ascentMap.zones)

export class MapExplorer {
  constructor(scene, camera, player, mapLoader, bots, renderer = null, engine = null) {
    this.scene       = scene
    this.camera      = camera
    this.player      = player
    this.mapLoader   = mapLoader
    this.bots        = bots
    this.renderer    = renderer
    this.engine      = engine

    this.zones         = this.mapLoader?.getZones?.() || ascentMap.zones || []
    this.teleportZones = buildTeleportZones(this.zones)

    this.isActive       = false
    this.showWireframe  = false
    this.botState       = 'frozen' // 'frozen' | 'passive' | 'active'
    this.wireframeGroup = null

    // Top-down Orthographic Mode & Blueprint Calibration
    this.isTopdown            = false
    this.topdownFrustumHeight = 130
    this.topdownPan           = { x: 0, z: 0 }
    this.topdownCamera        = null
    this.topdownGroup         = null
    this.blueprintGroup       = null
    this.blueprintMesh        = null
    this.blueprintMaterial    = null
    this.zonesGroup           = null
    this.cursorWorldPos       = { x: 0, z: 0 }

    const savedCalib = JSON.parse(localStorage.getItem('palo_topdown_calibration') || '{}')
    this.calibration = {
      offsetX: Number(savedCalib.offsetX ?? 0.0),
      offsetZ: Number(savedCalib.offsetZ ?? 0.0),
      scale: Number(savedCalib.scale ?? 1.0),
      rotation: Number(savedCalib.rotation ?? 0.0),
      opacity: Number(savedCalib.opacity ?? 0.5),
      showZones: Boolean(savedCalib.showZones ?? true)
    }

    // Telemetry & FPS
    this.lastFpsUpdate = performance.now()
    this.framesCount   = 0
    this.currentFps    = 60

    this._initTopdownComponents()
    this._createUI()
    this._bindEvents()
  }

  // ── Activation / Deactivation ───────────────────────────
  enable() {
    this.isActive = true
    if (this.player) {
      this.player.isGodMode = true
      this.player.isInfiniteAmmo = true
    }
    this.setBotState('frozen')
    if (this.overlayEl) this.overlayEl.style.display = 'block'
    this._updateHUD()
  }

  disable() {
    this.isActive = false
    if (this.isTopdown) {
      this.setTopdown(false)
    }
    if (this.player) {
      this.player.setNoclip(false)
      this.player.isGodMode = false
      this.player.isInfiniteAmmo = false
    }
    this.setBotState('active')
    this.setWireframeVisible(false)
    if (this.overlayEl) this.overlayEl.style.display = 'none'
  }

  toggle() {
    if (this.isActive) this.disable()
    else this.enable()
    return this.isActive
  }

  // ── Bot State Control ───────────────────────────────────
  setBotState(state) {
    this.botState = state
    if (!this.bots) return

    if (state === 'frozen') {
      this.bots.setFrozen(true)
      this.bots.setPassive(true)
    } else if (state === 'passive') {
      this.bots.setFrozen(false)
      this.bots.setPassive(true)
    } else {
      this.bots.setFrozen(false)
      this.bots.setPassive(false)
    }
    this._updateHUD()
  }

  cycleBotState() {
    const next = this.botState === 'frozen' ? 'passive' : (this.botState === 'passive' ? 'active' : 'frozen')
    this.setBotState(next)
  }

  // ── Noclip / Fly Control ────────────────────────────────
  toggleNoclip() {
    if (!this.player) return false
    const noclip = this.player.toggleNoclip()
    this._updateHUD()
    return noclip
  }

  // ── 3D Wireframe Collider & Ramp Visualizer ─────────────
  setWireframeVisible(visible) {
    this.showWireframe = visible
    if (!visible) {
      if (this.wireframeGroup) {
        this.scene.remove(this.wireframeGroup)
        this.wireframeGroup.traverse(child => {
          if (child.geometry) child.geometry.dispose()
          if (child.material) child.material.dispose()
        })
        this.wireframeGroup = null
      }
      this._updateHUD()
      return
    }

    if (this.wireframeGroup) {
      this.scene.remove(this.wireframeGroup)
    }

    const group = new THREE.Group()

    const wallMat  = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 })
    const boxMat   = new THREE.LineBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.75 })
    const waterMat = new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.80 })
    const rampMat  = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.90 })
    const spawnMat = new THREE.LineBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.85 })

    // 1. Standard AABB Colliders
    const colliders = this.mapLoader?.getColliders() || []
    for (const item of colliders) {
      if (item.isRamp) continue // Handled separately with angled slope geometry
      const { box, type } = item
      const mat = (type === 'box' || type === 'radianite') ? boxMat : (type === 'water' ? waterMat : wallMat)
      const helper = new THREE.Box3Helper(box, mat.color)
      group.add(helper)
    }

    // 2. Continuous Ramps (Tanjakan & Turunan Angled Wireframes)
    const ramps = this.mapLoader?.getRamps() || []
    for (const r of ramps) {
      const w = r.maxX - r.minX
      const d = r.maxZ - r.minZ
      const midX = (r.minX + r.maxX) / 2
      const midZ = (r.minZ + r.maxZ) / 2
      const midY = (r.startY + r.endY) / 2
      const length = r.axis === 'z' ? d : w
      const heightDiff = r.endY - r.startY
      const hypotenuse = Math.sqrt(length * length + heightDiff * heightDiff)
      const angle = Math.atan2(heightDiff, length)

      const geo = new THREE.BoxGeometry(
        r.axis === 'z' ? w : hypotenuse,
        0.35,
        r.axis === 'z' ? hypotenuse : d
      )
      const wire = new THREE.LineSegments(new THREE.EdgesGeometry(geo), rampMat)
      wire.position.set(midX, midY, midZ)
      if (r.axis === 'z') {
        wire.rotation.x = -angle
      } else {
        wire.rotation.z = angle
      }
      group.add(wire)
    }

    // 3. Spawn Point Markers
    const spawns = this.mapLoader?.getSpawnPoints?.({ spawn: TELEPORT_ZONES.map(z => [z.x, z.y, z.z]) }) || []
    const spawnGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.8, 8)
    for (const sp of spawns) {
      const spWire = new THREE.LineSegments(new THREE.EdgesGeometry(spawnGeo), spawnMat)
      spWire.position.set(sp.x, sp.y, sp.z)
      group.add(spWire)
    }

    this.wireframeGroup = group
    this.scene.add(this.wireframeGroup)
    this._updateHUD()
  }

  toggleWireframe() {
    this.setWireframeVisible(!this.showWireframe)
    return this.showWireframe
  }

  // ── Top-Down Orthographic Blueprint Mode ────────────────
  _initTopdownComponents() {
    // 1. Orthographic Camera positioned at Y=150 looking straight down at (0, 0, 0)
    const aspect = window.innerWidth / window.innerHeight
    const fH = this.topdownFrustumHeight
    this.topdownCamera = new THREE.OrthographicCamera(
      (-fH * aspect) / 2,
      (fH * aspect) / 2,
      fH / 2,
      -fH / 2,
      1,
      1000
    )
    this.topdownCamera._frustumHeight = fH
    this.topdownCamera.position.set(0, 150, 0)
    // Up is (0, 0, -1) so Attacker Spawn (-Z) is at top of screen, Defender Spawn (+Z) is at bottom
    this.topdownCamera.up.set(0, 0, -1)
    this.topdownCamera.lookAt(0, 0, 0)

    // 2. Container Group for all topdown visual aids
    this.topdownGroup = new THREE.Group()
    this.topdownGroup.visible = false
    this.scene.add(this.topdownGroup)

    // 3. Blueprint Texture & Mesh (110x110m map island centered at 0,0)
    const texLoader = new THREE.TextureLoader()
    const tex = texLoader.load('/docs/reference/topdown.png')
    tex.colorSpace = THREE.SRGBColorSpace
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter

    const planeGeo = new THREE.PlaneGeometry(110, 110)
    this.blueprintMaterial = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: this.calibration.opacity,
      depthWrite: false,
      side: THREE.DoubleSide
    })
    this.blueprintMesh = new THREE.Mesh(planeGeo, this.blueprintMaterial)
    // Rotate -90 deg on X so local +Y maps to world -Z (attacker spawn at top)
    this.blueprintMesh.rotation.x = -Math.PI / 2

    this.blueprintGroup = new THREE.Group()
    this.blueprintGroup.add(this.blueprintMesh)
    this.topdownGroup.add(this.blueprintGroup)

    // 4. Zone Rectangles Group
    this.zonesGroup = new THREE.Group()
    this._buildZoneRectangles()
    this.topdownGroup.add(this.zonesGroup)

    this._updateBlueprintTransform()
  }

  _buildZoneRectangles() {
    if (!this.zonesGroup) return
    while (this.zonesGroup.children.length > 0) {
      const child = this.zonesGroup.children[0]
      this.zonesGroup.remove(child)
      if (child.geometry) child.geometry.dispose()
      if (child.material) {
        if (child.material.map) child.material.map.dispose()
        child.material.dispose()
      }
    }

    const list = (this.mapLoader?.getZones?.() && this.mapLoader.getZones().length > 0)
      ? this.mapLoader.getZones()
      : (this.zones?.length ? this.zones : ascentMap.zones || [])

    for (const z of list) {
      const w = z.maxX - z.minX
      const d = z.maxZ - z.minZ
      const cx = (z.minX + z.maxX) / 2
      const cz = (z.minZ + z.maxZ) / 2
      const col = z.color || '#00f0ff'

      // 1. Boundary outline (line on Y=14.8 above map blocks)
      const pts = [
        new THREE.Vector3(z.minX, 14.8, z.minZ),
        new THREE.Vector3(z.maxX, 14.8, z.minZ),
        new THREE.Vector3(z.maxX, 14.8, z.maxZ),
        new THREE.Vector3(z.minX, 14.8, z.maxZ),
        new THREE.Vector3(z.minX, 14.8, z.minZ)
      ]
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts)
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(col),
        transparent: true,
        opacity: 0.95,
        linewidth: 2
      })
      const line = new THREE.Line(lineGeo, lineMat)
      this.zonesGroup.add(line)

      // 2. Semi-transparent fill plane
      const fillGeo = new THREE.PlaneGeometry(w, d)
      const fillMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(col),
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
        side: THREE.DoubleSide
      })
      const fillMesh = new THREE.Mesh(fillGeo, fillMat)
      fillMesh.position.set(cx, 14.75, cz)
      fillMesh.rotation.x = -Math.PI / 2
      this.zonesGroup.add(fillMesh)

      // 3. Crisp Zone Label Sprite
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 64
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)'
      ctx.beginPath()
      ctx.roundRect(4, 4, 248, 56, 8)
      ctx.fill()
      ctx.strokeStyle = col
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 22px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(z.name.toUpperCase(), 128, 32)

      const spriteTex = new THREE.CanvasTexture(canvas)
      const spriteMat = new THREE.SpriteMaterial({
        map: spriteTex,
        transparent: true,
        depthTest: false
      })
      const sprite = new THREE.Sprite(spriteMat)
      sprite.position.set(cx, 15.1, cz)
      const sW = Math.max(8, Math.min(w * 0.75, 16))
      const sH = sW * (64 / 256)
      sprite.scale.set(sW, sH, 1)
      this.zonesGroup.add(sprite)
    }

    this.zonesGroup.visible = this.calibration.showZones
  }

  _updateBlueprintTransform() {
    if (this.blueprintGroup) {
      this.blueprintGroup.position.set(this.calibration.offsetX, 14.5, this.calibration.offsetZ)
      this.blueprintGroup.rotation.y = THREE.MathUtils.degToRad(this.calibration.rotation)
      this.blueprintGroup.scale.set(this.calibration.scale, 1, this.calibration.scale)
    }
    if (this.blueprintMaterial) {
      this.blueprintMaterial.opacity = this.calibration.opacity
    }
    if (this.zonesGroup) {
      this.zonesGroup.visible = this.calibration.showZones
    }

    // Sync UI inputs if created
    const opacitySlider = document.getElementById('topdown-opacity')
    const opacityVal = document.getElementById('topdown-opacity-val')
    const oxInput = document.getElementById('topdown-ox')
    const ozInput = document.getElementById('topdown-oz')
    const scaleInput = document.getElementById('topdown-scale')
    const rotInput = document.getElementById('topdown-rot')
    const btnToggleZones = document.getElementById('btn-topdown-zones')

    if (opacitySlider) opacitySlider.value = this.calibration.opacity
    if (opacityVal) opacityVal.textContent = `${Math.round(this.calibration.opacity * 100)}%`
    if (oxInput) oxInput.value = this.calibration.offsetX.toFixed(1)
    if (ozInput) ozInput.value = this.calibration.offsetZ.toFixed(1)
    if (scaleInput) scaleInput.value = this.calibration.scale.toFixed(3)
    if (rotInput) rotInput.value = this.calibration.rotation.toFixed(1)
    if (btnToggleZones) {
      btnToggleZones.classList.toggle('active', this.calibration.showZones)
      btnToggleZones.innerHTML = `<span>📐 Zona: <b>${this.calibration.showZones ? 'ON' : 'OFF'}</b></span>`
    }

    localStorage.setItem('palo_topdown_calibration', JSON.stringify(this.calibration))
  }

  toggleTopdown() {
    this.setTopdown(!this.isTopdown)
    return this.isTopdown
  }

  setTopdown(active) {
    this.isTopdown = active
    if (this.isTopdown) {
      if (!this.isActive) this.enable()
      this.topdownGroup.visible = true
      if (this.topdownContainer) this.topdownContainer.style.display = 'block'
      this.engine?.setOverrideCamera(this.topdownCamera)
      this.engine?.unlockPointer()
      this._updateTopdownCameraFrustum()
      this._updateBlueprintTransform()
      this._showToast('TOP-DOWN CAMERA: ON [F4]')
    } else {
      this.topdownGroup.visible = false
      if (this.topdownContainer) this.topdownContainer.style.display = 'none'
      if (this.cursorTooltipEl) this.cursorTooltipEl.style.display = 'none'
      this.engine?.setOverrideCamera(null)
      this._showToast('TOP-DOWN CAMERA: OFF')
    }
    this._updateHUD()
  }

  _updateTopdownCameraFrustum() {
    if (!this.topdownCamera) return
    const aspect = window.innerWidth / window.innerHeight
    const fH = this.topdownFrustumHeight
    this.topdownCamera.left = (-fH * aspect) / 2
    this.topdownCamera.right = (fH * aspect) / 2
    this.topdownCamera.top = fH / 2
    this.topdownCamera.bottom = -fH / 2
    this.topdownCamera._frustumHeight = fH
    this.topdownCamera.position.set(this.topdownPan.x, 150, this.topdownPan.z)
    this.topdownCamera.lookAt(this.topdownPan.x, 0, this.topdownPan.z)
    this.topdownCamera.updateProjectionMatrix()
  }

  _updateCursorCoords(x, z, mouseScreenX, mouseScreenY) {
    this.cursorWorldPos = { x, z }
    const snapX = Math.round(x * 2) / 2
    const snapZ = Math.round(z * 2) / 2
    const zone = this.detectZone({ x, y: 0, z })

    const coordValEl = document.getElementById('topdown-coord-val')
    const gridValEl = document.getElementById('topdown-grid-val')
    const zoneBadgeEl = document.getElementById('topdown-zone-badge')

    if (coordValEl) coordValEl.textContent = `X: ${x >= 0 ? '+' : ''}${x.toFixed(2)} | Z: ${z >= 0 ? '+' : ''}${z.toFixed(2)}`
    if (gridValEl) gridValEl.textContent = `Grid(0.5): [${snapX >= 0 ? '+' : ''}${snapX.toFixed(1)}, ${snapZ >= 0 ? '+' : ''}${snapZ.toFixed(1)}]`
    if (zoneBadgeEl) {
      zoneBadgeEl.textContent = zone.name
      zoneBadgeEl.style.color = zone.color
      zoneBadgeEl.style.borderColor = zone.color
    }

    if (this.cursorTooltipEl) {
      this.cursorTooltipEl.style.display = 'block'
      this.cursorTooltipEl.style.left = `${mouseScreenX}px`
      this.cursorTooltipEl.style.top = `${mouseScreenY}px`
      this.cursorTooltipEl.textContent = `X: ${x.toFixed(2)}, Z: ${z.toFixed(2)} [${zone.name}]`
    }
  }

  // ── Teleportation ───────────────────────────────────────
  teleportTo(x, y, z, zoneName = null) {
    if (!this.player) return
    this.player.teleportTo(x, y, z)
    if (zoneName) {
      this._showToast(`TELEPORTED TO: ${zoneName.toUpperCase()}`)
    }
  }

  teleportByZoneId(zoneId) {
    const list = (this.teleportZones && this.teleportZones.length > 0) ? this.teleportZones : TELEPORT_ZONES
    const zone = list.find(z => z.id === zoneId)
    if (zone) this.teleportTo(zone.x, zone.y, zone.z, zone.name)
  }

  // ── Zone Detection Logic ────────────────────────────────
  detectZone(pos) {
    const zones = (this.mapLoader?.getZones?.() && this.mapLoader.getZones().length > 0)
      ? this.mapLoader.getZones()
      : (this.zones?.length ? this.zones : ascentMap.zones || [])

    const { x, y, z } = pos

    // Sort by volume ascending so specific sub-zones take precedence (e.g. aHeaven/aHell or midCanal)
    const sortedZones = [...zones].sort((a, b) => {
      const areaA = (a.maxX - a.minX) * (a.maxZ - a.minZ)
      const areaB = (b.maxX - b.minX) * (b.maxZ - b.minZ)
      return areaA - areaB
    })

    const colorPalette = {
      attackerSpawn: '#38bdf8',
      defenderSpawn: '#ff4655',
      midCourtyard: '#e2e8f0',
      midCanal: '#06b6d4',
      siteA: '#00f0ff',
      siteB: '#00f0ff',
      aHeaven: '#f59e0b',
      aHell: '#ef4444',
      bHeaven: '#f59e0b',
      bHell: '#ef4444',
      westAlley: '#94a3b8',
      eastAlley: '#94a3b8'
    }

    for (const zone of sortedZones) {
      if (x >= zone.minX && x <= zone.maxX && z >= zone.minZ && z <= zone.maxZ) {
        if (zone.minY != null && y < zone.minY) continue
        if (zone.maxY != null && y > zone.maxY) continue
        return {
          name: zone.name.toUpperCase(),
          color: zone.color || colorPalette[zone.id] || '#00f0ff',
          desc: zone.desc || `Tactical Sector: ${zone.name}`
        }
      }
    }

    return { name: 'MAP FLANK CORRIDOR', color: '#94a3b8', desc: 'Outer Rotation Alley' }
  }

  // ── Update Tick ─────────────────────────────────────────
  update() {
    if (!this.isActive || !this.player) return

    // Calculate real-time FPS
    this.framesCount++
    const now = performance.now()
    if (now - this.lastFpsUpdate >= 500) {
      this.currentFps = Math.round((this.framesCount * 1000) / (now - this.lastFpsUpdate))
      this.framesCount = 0
      this.lastFpsUpdate = now
    }

    this._updateHUD()
  }

  // ── UI Construction ─────────────────────────────────────
  _createUI() {
    const existing = document.getElementById('debug-explorer-overlay')
    if (existing) existing.remove()

    const overlay = document.createElement('div')
    overlay.id = 'debug-explorer-overlay'
    overlay.className = 'debug-explorer-container'
    overlay.style.display = 'none'

    overlay.innerHTML = `
      <!-- Top Telemetry Header -->
      <div class="explorer-card telemetry-card">
        <div class="explorer-header-row" title="Klik & drag untuk memindahkan panel (Double click untuk reset)">
          <div class="explorer-badge"><span class="drag-grip-icon" title="Drag to move">⠿</span> 🛠️ MAP EXPLORER & DEBUG</div>
          <div class="explorer-stats-group">
            <div class="explorer-stat-badge explorer-fps-badge" id="exp-fps">60 FPS</div>
            <div class="explorer-stat-badge explorer-calls-badge" id="exp-calls">0 DC</div>
            <div class="explorer-stat-badge explorer-tris-badge" id="exp-tris">0 TRIS</div>
          </div>
          <button class="explorer-close-btn" id="btn-exp-close" title="Tutup / Sembunyikan [F1]">✕</button>
        </div>
        <div class="explorer-zone-row">
          <div class="zone-pin-icon">📍</div>
          <div class="zone-name" id="exp-zone-name">LOADING ZONE...</div>
        </div>
        <div class="zone-desc" id="exp-zone-desc">Detecting player coordinates</div>

        <div class="explorer-coords-grid">
          <div class="coord-item">
            <span class="coord-label">X:</span>
            <span class="coord-val" id="exp-coord-x">0.00</span>
          </div>
          <div class="coord-item">
            <span class="coord-label">Y (Mata):</span>
            <span class="coord-val" id="exp-coord-y">0.00</span>
          </div>
          <div class="coord-item">
            <span class="coord-label">Z:</span>
            <span class="coord-val" id="exp-coord-z">0.00</span>
          </div>
        </div>

        <!-- Action Control Buttons -->
        <div class="explorer-btn-grid">
          <button class="exp-action-btn" id="btn-toggle-noclip">
            <span class="btn-icon">✈️</span>
            <span class="btn-text">Fly/Noclip: <b id="exp-noclip-status">OFF</b></span>
            <span class="btn-key">[F]</span>
          </button>
          <button class="exp-action-btn" id="btn-toggle-wire">
            <span class="btn-icon">📐</span>
            <span class="btn-text">Wireframe: <b id="exp-wire-status">OFF</b></span>
            <span class="btn-key">[H]</span>
          </button>
          <button class="exp-action-btn" id="btn-toggle-bots">
            <span class="btn-icon">🤖</span>
            <span class="btn-text">Bot: <b id="exp-bot-status">BEKU</b></span>
            <span class="btn-key">[B]</span>
          </button>
          <button class="exp-action-btn" id="btn-toggle-god">
            <span class="btn-icon">🛡️</span>
            <span class="btn-text">God Mode: <b id="exp-god-status">ON</b></span>
            <span class="btn-key">[G]</span>
          </button>
          <button class="exp-action-btn" id="btn-toggle-topdown">
            <span class="btn-icon">🗺️</span>
            <span class="btn-text">Top-Down: <b id="exp-topdown-status">OFF</b></span>
            <span class="btn-key">[F4]</span>
          </button>
          <button class="exp-action-btn secondary" id="btn-respawn-bots">
            <span class="btn-icon">🔄</span>
            <span class="btn-text">Respawn Bot</span>
            <span class="btn-key">[K]</span>
          </button>
          <button class="exp-action-btn secondary" id="btn-copy-pos">
            <span class="btn-icon">📋</span>
            <span class="btn-text">Copy Posisi</span>
            <span class="btn-key">[P]</span>
          </button>
        </div>
      </div>

      <!-- Bottom Quick Teleport Bar -->
      <div class="explorer-card teleport-card">
        <div class="teleport-title">
          <span>⚡ INSTANT TELEPORT TO ZONE (Click / Alt + Key):</span>
          <button class="help-btn-pill" id="btn-exp-help" title="Panduan Shortcut [F1]">❓ BANTUAN</button>
        </div>
        <div class="teleport-pills-row" id="teleport-pills-container">
          <!-- Populated dynamically from TELEPORT_ZONES -->
        </div>
      </div>

      <!-- Toast Notification -->
      <div id="explorer-toast" class="explorer-toast"></div>

      <!-- Help Modal -->
      <div id="explorer-help-modal" class="explorer-help-modal" style="display:none">
        <div class="modal-card">
          <div class="modal-header">
            <div class="modal-title">🛠️ PANDUAN MODE EKSPLORASI & DEBUG MAP</div>
            <button class="modal-close" id="btn-close-help">✕</button>
          </div>
          <div class="modal-body">
            <div class="help-section">
              <div class="help-sec-title">✈️ KONTROL TERBANG / NOCLIP ([F])</div>
              <ul>
                <li><b>W / A / S / D</b>: Terbang bebas mengikuti arah pandangan kamera (termasuk naik/turun sesuai sudut bidikan).</li>
                <li><b>Space</b>: Melayang naik vertikal ke atas.</li>
                <li><b>Ctrl / C</b>: Melayang turun vertikal ke bawah.</li>
                <li><b>Tahan Shift</b>: Turbo Speed (kecepatan terbang 2.5x lebih kencang).</li>
              </ul>
            </div>
            <div class="help-section">
              <div class="help-sec-title">📐 INSPECTOR WIREFRAME KOLISI ([H])</div>
              <ul>
                <li><b>Garis Biru Muda</b>: Dinding dan lantai solid AABB.</li>
                <li><b>Garis Emas / Kuning</b>: Lereng tanjakan dan turunan kontinu (*continuous ramps*).</li>
                <li><b>Garis Oranye</b>: Peti dan boks taktis jump-boost.</li>
                <li><b>Garis Hijau</b>: Titik spawn pemain dan bot.</li>
              </ul>
            </div>
            <div class="help-section">
              <div class="help-sec-title">🤖 KONTROL BOT ([B])</div>
              <ul>
                <li><b>BEKU (FROZEN)</b>: Bot diam mematung untuk inspeksi model, uji tembak kepala, dan cek jarak.</li>
                <li><b>PASIF (PASSIVE)</b>: Bot bergerak/patroli tanpa menembak Anda.</li>
                <li><b>AKTIF (ACTIVE)</b>: Bot kembali bertarung normal.</li>
              </ul>
            </div>
            <div class="help-section">
              <div class="help-sec-title">⚡ SHORTCUT TELEPORT CEPAT</div>
              <ul>
                <li>Klik tombol zona di bilah bawah, atau tekan <b>Alt + Angka (1 - 0)</b> untuk teleport instan.</li>
                <li>Tekan <b>[P]</b> untuk menyalin koordinat X, Y, Z ke clipboard untuk dicatat.</li>
              </ul>
            </div>
            <div class="help-section">
              <div class="help-sec-title">🗺️ KAMERA TOP-DOWN BLUEPRINT ([F4])</div>
              <ul>
                <li><b>F4</b>: Toggle kamera orthographic tampak atas (top-down view).</li>
                <li><b>Blueprint docs/reference/topdown.png</b>: Terproyeksi semi-transparan pada area 110x110m centered di (0,0).</li>
                <li><b>Attacker Spawn di atas (Z = -46), Defender Spawn di bawah (Z = +46)</b>.</li>
                <li><b>Koordinat Cursor Real-time</b>: Arahkan mouse untuk membaca posisi dunia riil (X, Z) dan grid 0.5m.</li>
                <li><b>Klik di Map</b>: Langsung menyalin koordinat X, Z ke clipboard.</li>
                <li><b>Scroll Mouse</b>: Zoom in / Zoom out.</li>
                <li><b>Klik Kanan / Shift + Drag</b>: Geser / Pan kamera.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(overlay)
    this.overlayEl = overlay

    // Top-down Blueprint Container (Header Bar + Calibration Card + Cursor Tooltip)
    const topdownContainer = document.createElement('div')
    topdownContainer.id = 'topdown-blueprint-container'
    topdownContainer.className = 'topdown-container'
    topdownContainer.style.display = 'none'

    topdownContainer.innerHTML = `
      <!-- Fixed Header Bar at Top Center -->
      <div class="topdown-header-bar">
        <div class="topdown-title-pill">
          <span>🗺️</span> TOP-DOWN BLUEPRINT
        </div>
        <div class="topdown-coord-display">
          <span class="topdown-coord-val" id="topdown-coord-val">X: 0.00 | Z: 0.00</span>
          <span class="topdown-grid-val" id="topdown-grid-val">Grid(0.5): [0.0, 0.0]</span>
          <span class="topdown-zone-badge" id="topdown-zone-badge">MID COURTYARD</span>
        </div>
        <button class="topdown-exit-btn" id="btn-topdown-exit">✕ Keluar [F4]</button>
      </div>

      <!-- Left Floating Blueprint Calibration Card -->
      <div class="topdown-calib-card">
        <div class="calib-header">
          <div class="calib-title">⚙️ BLUEPRINT CALIBRATION</div>
          <button class="calib-action-btn" id="btn-calib-reset" title="Reset Kalibrasi">🔄 Reset</button>
        </div>

        <!-- Opacity Slider -->
        <div class="calib-row">
          <span class="calib-label">Opacity:</span>
          <div class="calib-controls" style="flex:1">
            <input type="range" min="0" max="1" step="0.01" class="calib-slider" id="topdown-opacity" value="${this.calibration.opacity}">
            <span class="calib-val-badge" id="topdown-opacity-val">${Math.round(this.calibration.opacity * 100)}%</span>
          </div>
        </div>

        <!-- Offset X -->
        <div class="calib-row">
          <span class="calib-label">Offset X (m):</span>
          <div class="calib-controls">
            <button class="calib-btn-step" id="btn-ox-minus">-</button>
            <input type="number" step="0.5" class="calib-input" id="topdown-ox" value="${this.calibration.offsetX.toFixed(1)}">
            <button class="calib-btn-step" id="btn-ox-plus">+</button>
          </div>
        </div>

        <!-- Offset Z -->
        <div class="calib-row">
          <span class="calib-label">Offset Z (m):</span>
          <div class="calib-controls">
            <button class="calib-btn-step" id="btn-oz-minus">-</button>
            <input type="number" step="0.5" class="calib-input" id="topdown-oz" value="${this.calibration.offsetZ.toFixed(1)}">
            <button class="calib-btn-step" id="btn-oz-plus">+</button>
          </div>
        </div>

        <!-- Scale -->
        <div class="calib-row">
          <span class="calib-label">Scale:</span>
          <div class="calib-controls">
            <button class="calib-btn-step" id="btn-scale-minus">-</button>
            <input type="number" step="0.005" class="calib-input" id="topdown-scale" value="${this.calibration.scale.toFixed(3)}">
            <button class="calib-btn-step" id="btn-scale-plus">+</button>
          </div>
        </div>

        <!-- Rotation -->
        <div class="calib-row">
          <span class="calib-label">Rotation (°):</span>
          <div class="calib-controls">
            <button class="calib-btn-step" id="btn-rot-minus">-</button>
            <input type="number" step="0.5" class="calib-input" id="topdown-rot" value="${this.calibration.rotation.toFixed(1)}">
            <button class="calib-btn-step" id="btn-rot-plus">+</button>
          </div>
        </div>

        <!-- Buttons Row -->
        <div class="calib-btn-group">
          <button class="calib-action-btn ${this.calibration.showZones ? 'active' : ''}" id="btn-topdown-zones">
            <span>📐 Zona: <b>${this.calibration.showZones ? 'ON' : 'OFF'}</b></span>
          </button>
          <button class="calib-action-btn" id="btn-topdown-center" title="Kembalikan pandangan ke tengah (0,0)">
            <span>🔍 Reset View</span>
          </button>
        </div>
      </div>

      <!-- Floating Cursor Tooltip -->
      <div class="topdown-cursor-tooltip" id="topdown-cursor-tooltip">X: 0.00, Z: 0.00</div>
    `

    document.body.appendChild(topdownContainer)
    this.topdownContainer = topdownContainer
    this.cursorTooltipEl = topdownContainer.querySelector('#topdown-cursor-tooltip')

    // Topdown Calibration Event Listeners
    const opacitySlider = topdownContainer.querySelector('#topdown-opacity')
    opacitySlider?.addEventListener('input', (e) => {
      this.calibration.opacity = parseFloat(e.target.value)
      this._updateBlueprintTransform()
    })

    const oxInput = topdownContainer.querySelector('#topdown-ox')
    oxInput?.addEventListener('change', (e) => {
      this.calibration.offsetX = parseFloat(e.target.value) || 0
      this._updateBlueprintTransform()
    })
    topdownContainer.querySelector('#btn-ox-minus')?.addEventListener('click', () => {
      this.calibration.offsetX = Math.round((this.calibration.offsetX - 0.5) * 10) / 10
      this._updateBlueprintTransform()
    })
    topdownContainer.querySelector('#btn-ox-plus')?.addEventListener('click', () => {
      this.calibration.offsetX = Math.round((this.calibration.offsetX + 0.5) * 10) / 10
      this._updateBlueprintTransform()
    })

    const ozInput = topdownContainer.querySelector('#topdown-oz')
    ozInput?.addEventListener('change', (e) => {
      this.calibration.offsetZ = parseFloat(e.target.value) || 0
      this._updateBlueprintTransform()
    })
    topdownContainer.querySelector('#btn-oz-minus')?.addEventListener('click', () => {
      this.calibration.offsetZ = Math.round((this.calibration.offsetZ - 0.5) * 10) / 10
      this._updateBlueprintTransform()
    })
    topdownContainer.querySelector('#btn-oz-plus')?.addEventListener('click', () => {
      this.calibration.offsetZ = Math.round((this.calibration.offsetZ + 0.5) * 10) / 10
      this._updateBlueprintTransform()
    })

    const scaleInput = topdownContainer.querySelector('#topdown-scale')
    scaleInput?.addEventListener('change', (e) => {
      this.calibration.scale = Math.max(0.1, parseFloat(e.target.value) || 1.0)
      this._updateBlueprintTransform()
    })
    topdownContainer.querySelector('#btn-scale-minus')?.addEventListener('click', () => {
      this.calibration.scale = Math.max(0.1, Math.round((this.calibration.scale - 0.005) * 1000) / 1000)
      this._updateBlueprintTransform()
    })
    topdownContainer.querySelector('#btn-scale-plus')?.addEventListener('click', () => {
      this.calibration.scale = Math.round((this.calibration.scale + 0.005) * 1000) / 1000
      this._updateBlueprintTransform()
    })

    const rotInput = topdownContainer.querySelector('#topdown-rot')
    rotInput?.addEventListener('change', (e) => {
      this.calibration.rotation = parseFloat(e.target.value) || 0
      this._updateBlueprintTransform()
    })
    topdownContainer.querySelector('#btn-rot-minus')?.addEventListener('click', () => {
      this.calibration.rotation = Math.round((this.calibration.rotation - 0.5) * 10) / 10
      this._updateBlueprintTransform()
    })
    topdownContainer.querySelector('#btn-rot-plus')?.addEventListener('click', () => {
      this.calibration.rotation = Math.round((this.calibration.rotation + 0.5) * 10) / 10
      this._updateBlueprintTransform()
    })

    topdownContainer.querySelector('#btn-calib-reset')?.addEventListener('click', () => {
      this.calibration.offsetX = 0.0
      this.calibration.offsetZ = 0.0
      this.calibration.scale = 1.0
      this.calibration.rotation = 0.0
      this.calibration.opacity = 0.5
      this._updateBlueprintTransform()
      this._showToast('KALIBRASI DI-RESET KE DEFAULT')
    })

    topdownContainer.querySelector('#btn-topdown-zones')?.addEventListener('click', () => {
      this.calibration.showZones = !this.calibration.showZones
      this._updateBlueprintTransform()
    })

    topdownContainer.querySelector('#btn-topdown-center')?.addEventListener('click', () => {
      this.topdownPan = { x: 0, z: 0 }
      this.topdownFrustumHeight = 130
      this._updateTopdownCameraFrustum()
      this._showToast('PANDANGAN DIKEMBALIKAN KE TENGAH (0,0)')
    })

    topdownContainer.querySelector('#btn-topdown-exit')?.addEventListener('click', () => {
      this.setTopdown(false)
    })

    this._initTopdownRaycasting()

    // Render Teleport Pills
    const pillsContainer = overlay.querySelector('#teleport-pills-container')
    const pillZones = (this.teleportZones && this.teleportZones.length > 0) ? this.teleportZones : TELEPORT_ZONES
    for (const z of pillZones) {
      const pill = document.createElement('button')
      pill.className = 'teleport-pill'
      pill.innerHTML = `<span class="pill-key">${z.key}</span> ${z.name}`
      pill.addEventListener('click', (e) => {
        e.stopPropagation()
        this.teleportTo(z.x, z.y, z.z, z.name)
      })
      pillsContainer.appendChild(pill)
    }

    // Attach Button Listeners
    overlay.querySelector('#btn-toggle-noclip').addEventListener('click', () => this.toggleNoclip())
    overlay.querySelector('#btn-toggle-wire').addEventListener('click', () => this.toggleWireframe())
    overlay.querySelector('#btn-toggle-bots').addEventListener('click', () => this.cycleBotState())
    overlay.querySelector('#btn-toggle-topdown')?.addEventListener('click', () => this.toggleTopdown())
    overlay.querySelector('#btn-toggle-god').addEventListener('click', () => {
      if (this.player) {
        this.player.isGodMode = !this.player.isGodMode
        this.player.isInfiniteAmmo = this.player.isGodMode
        this._updateHUD()
        this._showToast(`GOD MODE & AMMO: ${this.player.isGodMode ? 'AKTIF' : 'NONAKTIF'}`)
      }
    })
    overlay.querySelector('#btn-respawn-bots').addEventListener('click', () => {
      if (this.bots) {
        this.bots.respawnAll()
        this._showToast('SEMUA BOT TELAH DI-RESPAWN')
      }
    })
    overlay.querySelector('#btn-copy-pos').addEventListener('click', () => this._copyPosition())
    overlay.querySelector('#btn-exp-close').addEventListener('click', () => this.disable())
    overlay.querySelector('#btn-exp-help').addEventListener('click', () => {
      const modal = overlay.querySelector('#explorer-help-modal')
      modal.style.display = 'flex'
    })
    overlay.querySelector('#btn-close-help').addEventListener('click', () => {
      const modal = overlay.querySelector('#explorer-help-modal')
      modal.style.display = 'none'
    })

    // Enable Smooth Dragging on Popups
    const telemetryCard = overlay.querySelector('.telemetry-card')
    const headerRow = overlay.querySelector('.explorer-header-row')
    makeDraggable(telemetryCard, headerRow, 'palo_explorer_pos')

    const calibCard = topdownContainer.querySelector('.topdown-calib-card')
    const calibHeader = topdownContainer.querySelector('.calib-header')
    if (calibCard && calibHeader) {
      calibHeader.setAttribute('title', 'Klik & drag untuk memindahkan panel (Double click untuk reset)')
      makeDraggable(calibCard, calibHeader, 'palo_topdown_calib_pos')
    }
  }

  // ── Top-Down Raycasting & Cursor Telemetry ─────────────
  _initTopdownRaycasting() {
    const raycaster = new THREE.Raycaster()
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const mouseVec = new THREE.Vector2()
    const hitPoint = new THREE.Vector3()

    window.addEventListener('mousemove', (e) => {
      if (!this.isTopdown || !this.topdownCamera) return
      mouseVec.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseVec.y = -(e.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouseVec, this.topdownCamera)
      if (raycaster.ray.intersectPlane(groundPlane, hitPoint)) {
        this._updateCursorCoords(hitPoint.x, hitPoint.z, e.clientX, e.clientY)
      }
    })

    window.addEventListener('click', (e) => {
      if (!this.isTopdown || !this.topdownCamera) return
      if (e.target.closest('button') || e.target.closest('input')) return
      mouseVec.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseVec.y = -(e.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouseVec, this.topdownCamera)
      if (raycaster.ray.intersectPlane(groundPlane, hitPoint)) {
        const snapX = Math.round(hitPoint.x * 2) / 2
        const snapZ = Math.round(hitPoint.z * 2) / 2
        const text = `X: ${hitPoint.x.toFixed(2)}, Z: ${hitPoint.z.toFixed(2)} (Grid: ${snapX.toFixed(1)}, ${snapZ.toFixed(1)})`
        navigator.clipboard?.writeText(text).catch(() => {})
        this._showToast(`KOORDINAT DISALIN: ${text}`)
      }
    })

    window.addEventListener('wheel', (e) => {
      if (!this.isTopdown) return
      e.preventDefault()
      const zoomDelta = e.deltaY > 0 ? 10 : -10
      this.topdownFrustumHeight = Math.max(30, Math.min(260, this.topdownFrustumHeight + zoomDelta))
      this._updateTopdownCameraFrustum()
    }, { passive: false })

    let isPanning = false
    let lastMouse = { x: 0, y: 0 }
    window.addEventListener('mousedown', (e) => {
      if (!this.isTopdown) return
      if (e.button === 2 || e.button === 1 || (e.button === 0 && e.shiftKey)) {
        isPanning = true
        lastMouse.x = e.clientX
        lastMouse.y = e.clientY
      }
    })

    window.addEventListener('mousemove', (e) => {
      if (!this.isTopdown || !isPanning) return
      const dx = e.clientX - lastMouse.x
      const dy = e.clientY - lastMouse.y
      lastMouse.x = e.clientX
      lastMouse.y = e.clientY
      const aspect = window.innerWidth / window.innerHeight
      const fH = this.topdownFrustumHeight
      const fW = fH * aspect
      // Topdown up vector is (0, 0, -1), right vector is (1, 0, 0)
      this.topdownPan.x -= (dx / window.innerWidth) * fW
      this.topdownPan.z -= (dy / window.innerHeight) * fH
      this._updateTopdownCameraFrustum()
    })

    window.addEventListener('mouseup', () => {
      isPanning = false
    })

    window.addEventListener('contextmenu', (e) => {
      if (this.isTopdown) {
        e.preventDefault()
      }
    })

    window.addEventListener('resize', () => {
      if (this.isTopdown) {
        this._updateTopdownCameraFrustum()
      }
    })
  }

  // ── Keyboard Shortcuts Binding ──────────────────────────
  _bindEvents() {
    window.addEventListener('keydown', (e) => {
      // Toggle Exploration Mode on/off with F1 or F3
      if (e.code === 'F1' || e.code === 'F3') {
        e.preventDefault()
        this.toggle()
        return
      }

      // Toggle Top-down Blueprint Camera on/off with F4
      if (e.code === 'F4') {
        e.preventDefault()
        this.toggleTopdown()
        return
      }

      if (!this.isActive) return

      // Don't intercept if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      if (e.code === 'KeyF') {
        e.preventDefault()
        this.toggleNoclip()
      } else if (e.code === 'KeyH') {
        e.preventDefault()
        this.toggleWireframe()
      } else if (e.code === 'KeyB') {
        e.preventDefault()
        this.cycleBotState()
      } else if (e.code === 'KeyG') {
        e.preventDefault()
        if (this.player) {
          this.player.isGodMode = !this.player.isGodMode
          this.player.isInfiniteAmmo = this.player.isGodMode
          this._updateHUD()
          this._showToast(`GOD MODE: ${this.player.isGodMode ? 'AKTIF' : 'NONAKTIF'}`)
        }
      } else if (e.code === 'KeyK') {
        e.preventDefault()
        this.bots?.respawnAll()
        this._showToast('SEMUA BOT TELAH DI-RESPAWN')
      } else if (e.code === 'KeyP') {
        e.preventDefault()
        this._copyPosition()
      }

      // Quick Teleport via Alt + Key (matches zone.key from top-level zones)
      if (e.altKey) {
        const list = (this.teleportZones && this.teleportZones.length > 0) ? this.teleportZones : TELEPORT_ZONES
        const matched = list.find(z => z.key === e.key)
        if (matched) {
          e.preventDefault()
          this.teleportTo(matched.x, matched.y, matched.z, matched.name)
        }
      }
    })
  }

  // ── Update HUD Elements ─────────────────────────────────
  _updateHUD() {
    if (!this.overlayEl || !this.isActive) return

    const pos = this.player ? this.player.position : this.camera.position
    const zone = this.detectZone(pos)

    const zoneNameEl = this.overlayEl.querySelector('#exp-zone-name')
    const zoneDescEl = this.overlayEl.querySelector('#exp-zone-desc')
    if (zoneNameEl) {
      zoneNameEl.textContent = zone.name
      zoneNameEl.style.color = zone.color
    }
    if (zoneDescEl) {
      zoneDescEl.textContent = zone.desc
    }

    const coordX = this.overlayEl.querySelector('#exp-coord-x')
    const coordY = this.overlayEl.querySelector('#exp-coord-y')
    const coordZ = this.overlayEl.querySelector('#exp-coord-z')
    if (coordX) coordX.textContent = pos.x.toFixed(2)
    if (coordY) coordY.textContent = (pos.y + 0.72).toFixed(2)
    if (coordZ) coordZ.textContent = pos.z.toFixed(2)

    const fpsEl = this.overlayEl.querySelector('#exp-fps')
    if (fpsEl) fpsEl.textContent = `${this.currentFps} FPS`

    if (this.renderer?.info?.render) {
      const callsEl = this.overlayEl.querySelector('#exp-calls')
      if (callsEl) {
        callsEl.textContent = `${this.renderer.info.render.calls} DC`
      }
      const trisEl = this.overlayEl.querySelector('#exp-tris')
      if (trisEl) {
        const tris = this.renderer.info.render.triangles
        trisEl.textContent = tris >= 1000 ? `${(tris / 1000).toFixed(1)}k TRIS` : `${tris} TRIS`
      }
    }

    // Status Badges
    const noclipStatus = this.overlayEl.querySelector('#exp-noclip-status')
    if (noclipStatus) {
      const isFly = this.player?.isNoclip
      noclipStatus.textContent = isFly ? 'TERBANG (FLY)' : 'JALAN (OFF)'
      noclipStatus.style.color = isFly ? '#22c55e' : '#94a3b8'
    }

    const wireStatus = this.overlayEl.querySelector('#exp-wire-status')
    if (wireStatus) {
      wireStatus.textContent = this.showWireframe ? 'ON' : 'OFF'
      wireStatus.style.color = this.showWireframe ? '#00f0ff' : '#94a3b8'
    }

    const botStatus = this.overlayEl.querySelector('#exp-bot-status')
    if (botStatus) {
      const text = this.botState === 'frozen' ? 'BEKU (FROZEN)' : (this.botState === 'passive' ? 'PASIF' : 'AKTIF')
      const col  = this.botState === 'frozen' ? '#38bdf8' : (this.botState === 'passive' ? '#f59e0b' : '#ff4655')
      botStatus.textContent = text
      botStatus.style.color = col
    }

    const godStatus = this.overlayEl.querySelector('#exp-god-status')
    if (godStatus) {
      const isGod = this.player?.isGodMode
      godStatus.textContent = isGod ? 'AKTIF' : 'OFF'
      godStatus.style.color = isGod ? '#eab308' : '#94a3b8'
    }

    const topdownStatus = this.overlayEl.querySelector('#exp-topdown-status')
    if (topdownStatus) {
      topdownStatus.textContent = this.isTopdown ? 'ON' : 'OFF'
      topdownStatus.style.color = this.isTopdown ? '#00f0ff' : '#94a3b8'
    }
  }

  _copyPosition() {
    if (!this.player) return
    const pos = this.player.position
    const text = `X: ${pos.x.toFixed(2)}, Y: ${(pos.y + 0.72).toFixed(2)}, Z: ${pos.z.toFixed(2)}`
    navigator.clipboard?.writeText(text).catch(() => {})
    this._showToast(`POSISI DISALIN: ${text}`)
  }

  _showToast(msg) {
    const toast = this.overlayEl?.querySelector('#explorer-toast')
    if (!toast) return
    toast.textContent = msg
    toast.classList.add('active')
    clearTimeout(this._toastTimer)
    this._toastTimer = setTimeout(() => {
      toast.classList.remove('active')
    }, 2400)
  }
}
