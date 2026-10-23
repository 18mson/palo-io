import * as THREE from 'three'

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

export const TELEPORT_ZONES = [
  { id: 'a_site',       name: 'A Site (Plant)',       x: -34.0, y: 0.90, z: -4.0,  key: '1' },
  { id: 'a_heaven',     name: 'A Heaven (Balcony)',   x: -44.0, y: 4.70, z: -4.0,  key: '2' },
  { id: 'a_hell',       name: 'A Hell (Under)',       x: -46.0, y: 0.90, z: -4.0,  key: '3' },
  { id: 'a_gen',        name: 'A Generator (Boost)',  x: -32.5, y: 3.40, z: -14.0, key: '4' },
  { id: 'mid_bridge',   name: 'Mid Bridge (High)',    x: 0.0,   y: 4.35, z: 0.0,   key: '5' },
  { id: 'mid_catwalk',  name: 'Mid Catwalk (Terrace)',x: -9.5,  y: 2.70, z: -13.0, key: '6' },
  { id: 'mid_canal',    name: 'Mid Canal (Water)',    x: 0.0,   y: 0.50, z: 0.0,   key: '7' },
  { id: 'b_site',       name: 'B Site (Plant)',       x: 34.0,  y: 0.90, z: -4.0,  key: '8' },
  { id: 'b_heaven',     name: 'B Heaven (Window)',    x: 40.0,  y: 4.30, z: 14.0,  key: '9' },
  { id: 'b_hell',       name: 'B Hell (Under Window)',x: 42.0,  y: 0.90, z: 14.0,  key: '0' },
  { id: 'b_backsite',   name: 'B Backsite Deck',      x: 42.0,  y: 1.85, z: -8.0,  key: '-' },
  { id: 'atk_spawn',    name: 'Attacker Spawn',       x: 0.0,   y: 0.90, z: -46.0, key: '[' },
  { id: 'def_spawn',    name: 'Defender Spawn',       x: 0.0,   y: 0.90, z: 46.0,  key: ']' }
]

export class MapExplorer {
  constructor(scene, camera, player, mapLoader, bots) {
    this.scene       = scene
    this.camera      = camera
    this.player      = player
    this.mapLoader   = mapLoader
    this.bots        = bots

    this.isActive       = false
    this.showWireframe  = false
    this.botState       = 'frozen' // 'frozen' | 'passive' | 'active'
    this.wireframeGroup = null

    // Telemetry & FPS
    this.lastFpsUpdate = performance.now()
    this.framesCount   = 0
    this.currentFps    = 60

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

  // ── Teleportation ───────────────────────────────────────
  teleportTo(x, y, z, zoneName = null) {
    if (!this.player) return
    this.player.teleportTo(x, y, z)
    if (zoneName) {
      this._showToast(`TELEPORTED TO: ${zoneName.toUpperCase()}`)
    }
  }

  teleportByZoneId(zoneId) {
    const zone = TELEPORT_ZONES.find(z => z.id === zoneId)
    if (zone) this.teleportTo(zone.x, zone.y, zone.z, zone.name)
  }

  // ── Zone Detection Logic ────────────────────────────────
  detectZone(pos) {
    const { x, y, z } = pos

    // North / South Spawns
    if (z <= -35) return { name: 'ATTACKER SPAWN', color: '#38bdf8', desc: 'North Entrance Pavilion' }
    if (z >= 35)  return { name: 'DEFENDER SPAWN', color: '#ff4655', desc: 'South Defense Pavilion' }

    // Central Mid Area
    if (x >= -18 && x <= 18) {
      if (y >= 3.0 && Math.abs(z) <= 3.5) {
        return { name: 'MID BRIDGE (HIGH GROUND)', color: '#f59e0b', desc: 'Elevated Deck Over Canal' }
      }
      if (x <= -6.5 && z >= -22 && z <= -5) {
        return { name: 'MID CATWALK (TERRACE)', color: '#a855f7', desc: 'Elevated Lane to A Short' }
      }
      if (Math.abs(x) <= 4.5 && Math.abs(z) <= 22 && y <= 1.0) {
        return { name: 'MID WATER CANAL (SUB-LEVEL)', color: '#06b6d4', desc: 'Sunken Turquoise Water Bed' }
      }
      if (x >= 9 && Math.abs(z) <= 8 && y >= 1.0) {
        return { name: 'MID MARKET (DOORWAY)', color: '#10b981', desc: 'Raised Market Connection' }
      }
      return { name: 'MID COURTYARD', color: '#e2e8f0', desc: 'Central Open Courtyard' }
    }

    // A Site Section (West)
    if (x < -18) {
      if (x <= -40 && y >= 3.2 && z >= -14 && z <= 6) {
        return { name: 'A HEAVEN (SNIPER BALCONY)', color: '#f59e0b', desc: 'Level 2 Overlook over Site A' }
      }
      if (x <= -40 && y <= 3.0 && z >= -14 && z <= 6) {
        return { name: 'A HELL (UNDER HEAVEN)', color: '#ef4444', desc: 'Covered Ground Floor Refuge' }
      }
      if (x >= -35 && x <= -29 && z <= -12 && y >= 2.0) {
        return { name: 'A GENERATOR (BOOST ROOF)', color: '#a855f7', desc: 'Tiered High-Ground Boost' }
      }
      if (z <= -20) {
        return { name: 'A MAIN & A WINE', color: '#64748b', desc: 'Chokepoint & Sunken Alcove' }
      }
      return { name: 'A SITE (PLANT ZONE)', color: '#00f0ff', desc: 'Open Courtyard & Water Basin' }
    }

    // B Site Section (East)
    if (x > 18) {
      if (x >= 36 && z >= 8 && z <= 20 && y >= 3.0) {
        return { name: 'B HEAVEN (SNIPER WINDOW)', color: '#f59e0b', desc: 'Pagoda Tower Upper Window' }
      }
      if (x >= 36 && z >= 8 && z <= 20 && y <= 2.8) {
        return { name: 'B HELL (UNDER WINDOW)', color: '#ef4444', desc: 'Ground Floor Tower Alcove' }
      }
      if (x >= 36 && z <= -2 && y >= 0.8) {
        return { name: 'B BACKSITE (RAISED DECK)', color: '#a855f7', desc: 'Elevated Wooden Hold Deck' }
      }
      if (z <= -20) {
        return { name: 'B MAIN & CORRIDOR', color: '#64748b', desc: 'Tight Flank Approach' }
      }
      return { name: 'B SITE (PLANT ZONE)', color: '#00f0ff', desc: 'Tight Yard & Triple Box' }
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
        <div class="explorer-header-row">
          <div class="explorer-badge">🛠️ MAP EXPLORER & DEBUG</div>
          <div class="explorer-fps-badge" id="exp-fps">60 FPS</div>
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
          </div>
        </div>
      </div>
    `

    document.body.appendChild(overlay)
    this.overlayEl = overlay

    // Render Teleport Pills
    const pillsContainer = overlay.querySelector('#teleport-pills-container')
    for (const z of TELEPORT_ZONES) {
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

      // Quick Teleport via Alt + Number (or direct Key in noclip)
      if (e.altKey) {
        const keyMap = {
          'Digit1': 'a_site',
          'Digit2': 'a_heaven',
          'Digit3': 'a_hell',
          'Digit4': 'a_gen',
          'Digit5': 'mid_bridge',
          'Digit6': 'mid_catwalk',
          'Digit7': 'mid_canal',
          'Digit8': 'b_site',
          'Digit9': 'b_heaven',
          'Digit0': 'b_hell',
          'Minus':  'b_backsite',
          'BracketLeft':  'atk_spawn',
          'BracketRight': 'def_spawn'
        }
        const zoneId = keyMap[e.code]
        if (zoneId) {
          e.preventDefault()
          this.teleportByZoneId(zoneId)
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
