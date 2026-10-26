import * as THREE from 'three'
import bindLayout from './bind.layout.json'

/**
 * 12 Spec Camera Checkpoints from docs/map/BIND_BLUEPRINT.md section 9.
 * yaw 0 = North (-Z), yaw 90 = East (+X), yaw 180 = South (+Z).
 */
export const CAMERA_CHECKPOINTS = [
  { id: 'spawnA',     name: 'Attacker Spawn', pos: [0, 1.65, 50],     yaw: 0,   eyeHeight: 1.65, desc: 'two exit corridors, cave door' },
  { id: 'aShort',     name: 'A Short',        pos: [-33, 1.65, 34],   yaw: 0,   eyeHeight: 1.65, desc: 'corridor, 2m wide walls both sides, teleporter room door' },
  { id: 'aTele',      name: 'A Teleporter',   pos: [-34, 1.65, 22],   yaw: 0,   eyeHeight: 1.65, desc: 'teleporter pad, crate, door north' },
  { id: 'aSiteShort', name: 'A Site (Short)', pos: [-27, 1.65, -1],   yaw: 0,   eyeHeight: 1.65, desc: 'A Box, site, Heaven stairs in far-left corner' },
  { id: 'aSiteBath',  name: 'A Site (Bath)',  pos: [-45, 1.65, -1],   yaw: 0,   eyeHeight: 1.65, desc: 'site from Bath entrance, pillar' },
  { id: 'aHeaven',    name: 'A Heaven (L1)',  pos: [-48, 5.15, -18],  yaw: 90,  eyeHeight: 5.15, desc: 'site seen from +3.5m, rails' },
  { id: 'market',     name: 'Market Plaza',   pos: [0, 1.65, -34],    yaw: 180, eyeHeight: 1.65, desc: 'stalls, doors left/right' },
  { id: 'bLong',      name: 'B Long',         pos: [50, 1.65, 46],    yaw: 0,   eyeHeight: 1.65, desc: 'fountain, teleporter pad, long corridor' },
  { id: 'bGarden',    name: 'B Garden',       pos: [46, 1.65, 4],     yaw: 0,   eyeHeight: 1.65, desc: 'planters, doorway into B Site' },
  { id: 'hookah',     name: 'B Hookah (L1)',  pos: [30, 5.15, -1],    yaw: 0,   eyeHeight: 5.15, desc: 'window overlooking B Site' },
  { id: 'bSiteHall',  name: 'B Site (Hall)',  pos: [39, 1.65, -26],   yaw: 180, eyeHeight: 1.65, desc: 'container, box, pillar, hall door' },
  { id: 'spawnD',     name: 'Defender Spawn', pos: [0, 1.65, -50],   yaw: 180, eyeHeight: 1.65, desc: 'exits east/west, link south' }
]

/**
 * Short Callout Names matching docs/map/bind_topdown.png.
 */
export const CALLOUT_SHORT_NAMES = {
  attackerSpawn: 'ATTACKER SPAWN',
  defenderSpawn: 'DEFENDER SPAWN',
  aLobby: 'A LOBBY',
  bLobby: 'B LOBBY',
  attackerCave: 'CAVE',
  aShort1: 'A SHORT',
  aTeleRoom: 'A TELE',
  aShort2: 'A SHORT',
  aShowers: 'A SHOWERS',
  aBath1: 'A BATH',
  aBath2: 'A BATH',
  aBath3: 'A BATH',
  aSite: 'A SITE',
  aHeaven: 'A HEAVEN (L1)',
  aCubby: 'CUBBY',
  aCT: 'A CT',
  aExit: 'A EXIT',
  aLamps1: 'LAMPS',
  aLamps2: 'LAMPS',
  market: 'MARKET',
  dsLink: 'LINK',
  bLink: 'B LINK',
  bElbow: 'B ELBOW',
  bSite: 'B SITE',
  bHall: 'B HALL',
  bExit: 'B EXIT',
  bGarden: 'B GARDEN',
  bHookah: 'HOOKAH (L1)',
  bShortRoom: 'B SHORT',
  bShort1: 'B SHORT',
  bLong1: 'B LONG',
  bLong2: 'B LONG'
}

/**
 * Debug Tools for the Bind Map ("Tide Market").
 * Handles F4 (Top-Down Ortho View), F5 (Level Colors & Topology),
 * F6 (Camera Checkpoints Teleport Panel), and F7 (Collision Wireframes).
 */
export class BindDebugTools {
  constructor({ engine, getActiveMap, getPlayer }) {
    this.engine = engine
    this.getActiveMap = getActiveMap
    this.getPlayer = getPlayer
    this.layout = bindLayout

    this.f4Active = false
    this.f5Active = false
    this.f6Active = false
    this.f7Active = false

    this.wireframeMesh = null
    this.orthoCamera = null
    this.topdownCanvas = null
    this.topdownCtx = null
    this.cursorWorld = { x: 0, z: 0, zone: 'None' }

    this._initDom()
    this._initKeybindings()
  }

  // ── Key Listener ──────────────────────────────────────────────────────────
  _initKeybindings() {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'F4') {
        e.preventDefault()
        this.toggleF4()
      } else if (e.code === 'F5') {
        e.preventDefault()
        this.toggleF5()
      } else if (e.code === 'F6') {
        e.preventDefault()
        this.toggleF6()
      } else if (e.code === 'F7') {
        e.preventDefault()
        this.toggleF7()
      }
    })
  }

  // ── DOM Construction ──────────────────────────────────────────────────────
  _initDom() {
    // Inject debug styles
    const style = document.createElement('style')
    style.id = 'bind-debug-styles'
    style.textContent = `
      .bind-debug-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        pointer-events: auto;
        display: none;
        background: rgba(11, 15, 20, 0.94);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
      }
      .bind-debug-overlay.active {
        display: flex;
        flex-direction: column;
      }
      .bind-topdown-header {
        position: absolute;
        top: 14px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(18, 24, 32, 0.88);
        border: 1px solid rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(8px);
        padding: 8px 18px;
        border-radius: 8px;
        color: #fff;
        font-size: 13px;
        display: flex;
        gap: 16px;
        align-items: center;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        z-index: 10000;
      }
      .bind-coord-badge {
        color: #38bdf8;
        font-weight: 700;
        font-family: monospace;
      }
      .bind-zone-badge {
        color: #facc15;
        font-weight: 600;
      }
      .bind-close-btn {
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #fff;
        padding: 3px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      }
      .bind-close-btn:hover {
        background: #ef4444;
      }

      /* F5 Level Topology Panel */
      .bind-f5-panel, .bind-f6-panel {
        position: fixed;
        right: 20px;
        top: 60px;
        width: 440px;
        max-height: 80vh;
        background: rgba(15, 20, 26, 0.94);
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 10px;
        backdrop-filter: blur(12px);
        box-shadow: 0 10px 32px rgba(0, 0, 0, 0.55);
        color: #f3f4f6;
        z-index: 9998;
        display: none;
        flex-direction: column;
        overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      .bind-f5-panel.active, .bind-f6-panel.active {
        display: flex;
      }
      .bind-panel-titlebar {
        padding: 12px 16px;
        background: rgba(255, 255, 255, 0.06);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .bind-panel-titlebar h3 {
        margin: 0;
        font-size: 14px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .bind-panel-body {
        padding: 12px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .bind-level-pill {
        display: inline-block;
        padding: 2px 7px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 700;
        font-family: monospace;
      }
      .bind-level-0 {
        background: #4b5563;
        color: #e5e7eb;
      }
      .bind-level-1 {
        background: #ea580c;
        color: #fff;
      }
      .bind-zone-row {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 6px;
        padding: 8px 10px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .bind-zone-row:hover {
        background: rgba(255, 255, 255, 0.07);
      }
      .bind-zone-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .bind-zone-name {
        font-weight: 600;
        font-size: 13px;
      }
      .bind-zone-stairs {
        font-size: 11px;
        color: #9ca3af;
      }
      .bind-zone-stairs b {
        color: #f97316;
      }

      /* F6 Checkpoints Buttons */
      .bind-cp-btn {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        padding: 9px 12px;
        color: #f3f4f6;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 3px;
        text-align: left;
        transition: all 0.15s ease;
      }
      .bind-cp-btn:hover {
        background: rgba(56, 189, 248, 0.15);
        border-color: #38bdf8;
        transform: translateY(-1px);
      }
      .bind-cp-title {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        font-weight: 600;
      }
      .bind-cp-coords {
        font-family: monospace;
        font-size: 11px;
        color: #38bdf8;
      }
      .bind-cp-desc {
        font-size: 11px;
        color: #9ca3af;
      }

      /* Toast Notification */
      .bind-debug-toast {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(17, 24, 39, 0.92);
        border: 1px solid rgba(56, 189, 248, 0.4);
        border-radius: 8px;
        padding: 8px 18px;
        color: #f3f4f6;
        font-size: 13px;
        font-weight: 600;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        z-index: 10001;
        transition: opacity 0.25s ease;
        pointer-events: none;
      }
      .bind-debug-toast.hidden {
        opacity: 0;
      }
    `
    document.head.appendChild(style)

    // 1. F4 Top-Down Overlay Element
    this.f4Container = document.createElement('div')
    this.f4Container.id = 'bind-topdown-overlay'
    this.f4Container.className = 'bind-debug-overlay'
    this.f4Container.innerHTML = `
      <div class="bind-topdown-header">
        <span>🗺️ <b>F4 TOP-DOWN BLUEPRINT VIEW</b></span>
        <span>World: <span id="bind-readout-coords" class="bind-coord-badge">X: 0.00, Z: 0.00</span></span>
        <span>Zone: <span id="bind-readout-zone" class="bind-zone-badge">Defender Spawn</span></span>
        <button id="bind-btn-close-f4" class="bind-close-btn">Close (F4)</button>
      </div>
      <canvas id="bind-topdown-canvas" style="width: 100%; height: 100%; display: block;"></canvas>
    `
    document.body.appendChild(this.f4Container)
    this.topdownCanvas = document.getElementById('bind-topdown-canvas')
    this.topdownCtx = this.topdownCanvas.getContext('2d')

    document.getElementById('bind-btn-close-f4').addEventListener('click', () => this.toggleF4(false))

    // Handle cursor tracking on canvas
    this.topdownCanvas.addEventListener('mousemove', (e) => this._onCanvasMouseMove(e))
    this.topdownCanvas.addEventListener('click', (e) => this._onCanvasClick(e))
    window.addEventListener('resize', () => {
      if (this.f4Active) this._renderTopdownMap()
    })

    // 2. F5 Level Topology Panel Element
    this.f5Panel = document.createElement('div')
    this.f5Panel.id = 'bind-f5-panel'
    this.f5Panel.className = 'bind-f5-panel'
    this.f5Panel.innerHTML = `
      <div class="bind-panel-titlebar">
        <h3>📊 LEVEL TOPOLOGY (F5)</h3>
        <button id="bind-btn-close-f5" class="bind-close-btn">✕</button>
      </div>
      <div style="padding: 10px 14px; background: rgba(0,0,0,0.25); border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 12px; display: flex; gap: 12px;">
        <div><span class="bind-level-pill bind-level-0">Level 0</span> 0.0 m (34 zones)</div>
        <div><span class="bind-level-pill bind-level-1">Level 1</span> +3.5 m (2 zones)</div>
      </div>
      <div class="bind-panel-body" id="bind-f5-list"></div>
    `
    document.body.appendChild(this.f5Panel)
    document.getElementById('bind-btn-close-f5').addEventListener('click', () => this.toggleF5(false))
    this._populateF5List()

    // 3. F6 Checkpoints Panel Element
    this.f6Panel = document.createElement('div')
    this.f6Panel.id = 'bind-f6-panel'
    this.f6Panel.className = 'bind-f6-panel'
    this.f6Panel.innerHTML = `
      <div class="bind-panel-titlebar">
        <h3>📍 CAMERA CHECKPOINTS (F6)</h3>
        <button id="bind-btn-close-f6" class="bind-close-btn">✕</button>
      </div>
      <div style="padding: 8px 14px; background: rgba(0,0,0,0.25); font-size: 11px; color: #9ca3af; border-bottom: 1px solid rgba(255,255,255,0.08);">
        12 Spec Checkpoints (BIND_BLUEPRINT §9). Click to teleport.
      </div>
      <div class="bind-panel-body" id="bind-f6-list"></div>
    `
    document.body.appendChild(this.f6Panel)
    document.getElementById('bind-btn-close-f6').addEventListener('click', () => this.toggleF6(false))
    this._populateF6List()

    // 4. Toast
    this.toast = document.createElement('div')
    this.toast.className = 'bind-debug-toast hidden'
    document.body.appendChild(this.toast)
  }

  showToast(msg, duration = 2200) {
    this.toast.textContent = msg
    this.toast.classList.remove('hidden')
    clearTimeout(this._toastTimer)
    this._toastTimer = setTimeout(() => this.toast.classList.add('hidden'), duration)
  }

  // ── F4: Top-Down Orthographic View ────────────────────────────────────────
  toggleF4(forceState) {
    this.f4Active = forceState !== undefined ? forceState : !this.f4Active

    if (this.f4Active) {
      this.f4Container.classList.add('active')
      // Create Orthographic Camera in Three.js with uniform scale and letterboxing
      const aspect = (window.innerWidth || 1) / (window.innerHeight || 1)
      const mapAspect = 120 / 112
      let halfW, halfH
      if (aspect > mapAspect) {
        halfH = 56
        halfW = 56 * aspect
      } else {
        halfW = 60
        halfH = 60 / aspect
      }

      if (!this.orthoCamera) {
        this.orthoCamera = new THREE.OrthographicCamera(-halfW, halfW, halfH, -halfH, 1, 300)
        this.orthoCamera.position.set(0, 140, 0)
        this.orthoCamera.lookAt(0, 0, 0)
        this.orthoCamera.rotation.z = Math.PI
      } else {
        this.orthoCamera.left = -halfW
        this.orthoCamera.right = halfW
        this.orthoCamera.top = halfH
        this.orthoCamera.bottom = -halfH
        this.orthoCamera.updateProjectionMatrix()
      }

      this.engine.setOverrideCamera(this.orthoCamera)
      this._renderTopdownMap()
      this.showToast('F4: Top-Down Orthographic Blueprint Active')
    } else {
      this.f4Container.classList.remove('active')
      this.engine.setOverrideCamera(null)
      this.showToast('F4: Returned to First-Person View')
    }
  }

  _onCanvasMouseMove(e) {
    if (!this.f4Active || !this.topdownCanvas) return
    const rect = this.topdownCanvas.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top

    const w = rect.width
    const h = rect.height
    const scale = Math.min(w / 120, h / 112)
    const offsetX = (w - 120 * scale) * 0.5
    const offsetY = (h - 112 * scale) * 0.5

    // Map bounds: X [-60, 60] (span 120), Z [-56, 56] (span 112)
    const worldX = -60 + (px - offsetX) / scale
    const worldZ = -56 + (py - offsetY) / scale

    let currentZone = 'Outside Map'
    if (worldX >= -60 && worldX <= 60 && worldZ >= -56 && worldZ <= 56) {
      currentZone = 'Outside / Wall'
      for (const r of this.layout.regions || []) {
        if (worldX >= r.rect[0] && worldX <= r.rect[2] && worldZ >= r.rect[1] && worldZ <= r.rect[3]) {
          currentZone = `${r.name} (L${r.level || 0})`
          break
        }
      }
    }

    this.cursorWorld = { x: worldX, z: worldZ, zone: currentZone, px, py }
    const coordsEl = document.getElementById('bind-readout-coords')
    const zoneEl = document.getElementById('bind-readout-zone')
    if (coordsEl) coordsEl.textContent = `X: ${worldX.toFixed(2)}, Z: ${worldZ.toFixed(2)}`
    if (zoneEl) zoneEl.textContent = currentZone

    // Re-render map with cursor
    this._renderTopdownMap()
  }

  _onCanvasClick(e) {
    const player = this.getPlayer?.()
    if (!player) return
    const rect = this.topdownCanvas.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top

    const w = rect.width
    const h = rect.height
    const scale = Math.min(w / 120, h / 112)
    const offsetX = (w - 120 * scale) * 0.5
    const offsetY = (h - 112 * scale) * 0.5

    const worldX = -60 + (px - offsetX) / scale
    const worldZ = -56 + (py - offsetY) / scale

    if (worldX < -60 || worldX > 60 || worldZ < -56 || worldZ > 56) return

    // Check region height
    let targetY = 0.98
    for (const r of this.layout.regions || []) {
      if (worldX >= r.rect[0] && worldX <= r.rect[2] && worldZ >= r.rect[1] && worldZ <= r.rect[3]) {
        targetY = r.level ? 4.48 : 0.98
        break
      }
    }
    player.teleportTo(worldX, targetY, worldZ)
    this.showToast(`Teleported player to [${worldX.toFixed(1)}, ${targetY.toFixed(1)}, ${worldZ.toFixed(1)}]`)
    this._renderTopdownMap()
  }

  _renderTopdownMap() {
    const canvas = this.topdownCanvas
    if (!canvas) return
    const ctx = this.topdownCtx
    const w = canvas.clientWidth || window.innerWidth
    const h = canvas.clientHeight || window.innerHeight

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }

    ctx.clearRect(0, 0, w, h)

    // Map bounds: X [-60, 60] (span 120m), Z [-56, 56] (span 112m)
    // 1. Keep a uniform scale: pixels-per-meter must be identical on x and z.
    // Fit the 120 x 112 m map into the viewport with letterboxing (min(viewW/120, viewH/112)), centered.
    const scale = Math.min(w / 120, h / 112)
    const renderedW = 120 * scale
    const renderedH = 112 * scale
    const offsetX = (w - renderedW) * 0.5
    const offsetY = (h - renderedH) * 0.5

    const toCanvasX = (wx) => offsetX + (wx - (-60)) * scale
    const toCanvasY = (wz) => offsetY + (wz - (-56)) * scale
    const toCanvasW = (rw) => rw * scale
    const toCanvasH = (rh) => rh * scale

    // 1. Viewport background (letterboxing bars)
    ctx.fillStyle = '#080c12'
    ctx.fillRect(0, 0, w, h)

    // 2. Blueprint map bounds background
    ctx.fillStyle = '#0d1117'
    ctx.fillRect(offsetX, offsetY, renderedW, renderedH)
    ctx.strokeStyle = '#21262d'
    ctx.lineWidth = 1
    ctx.strokeRect(offsetX, offsetY, renderedW, renderedH)

    // 3. 10-meter Blueprint Grid Lines & Labels using the uniform scale
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 1
    ctx.fillStyle = '#38bdf8'
    ctx.font = '10px monospace'

    for (let gx = -60; gx <= 60; gx += 10) {
      const cx = toCanvasX(gx)
      ctx.beginPath()
      ctx.moveTo(cx, offsetY)
      ctx.lineTo(cx, offsetY + renderedH)
      ctx.stroke()
      ctx.fillText(`x${gx}`, cx + 2, offsetY + 12)
    }

    for (let gz = -56; gz <= 56; gz += 10) {
      const cy = toCanvasY(gz)
      ctx.beginPath()
      ctx.moveTo(offsetX, cy)
      ctx.lineTo(offsetX + renderedW, cy)
      ctx.stroke()
      ctx.fillText(`z${gz}`, offsetX + 4, cy - 3)
    }

    // 4. Connectors
    for (const c of this.layout.connectors || []) {
      const [x0, z0, x1, z1] = c.rect
      const cx0 = toCanvasX(x0)
      const cy0 = toCanvasY(z0)
      const cw = toCanvasW(x1 - x0)
      const ch = toCanvasH(z1 - z0)

      ctx.fillStyle = '#8b8478'
      ctx.fillRect(cx0, cy0, cw, ch)
      ctx.strokeStyle = '#6e675c'
      ctx.lineWidth = 1
      ctx.strokeRect(cx0, cy0, cw, ch)
    }

    // 5. Regions (clean shapes without old region name pills)
    for (const r of this.layout.regions || []) {
      const [x0, z0, x1, z1] = r.rect
      const cx0 = toCanvasX(x0)
      const cy0 = toCanvasY(z0)
      const cw = toCanvasW(x1 - x0)
      const ch = toCanvasH(z1 - z0)

      let fillColor = '#6e6b66'
      let strokeColor = '#575450'

      if (r.id === 'attackerSpawn' || r.id === 'defenderSpawn') {
        fillColor = '#b84a4a'
        strokeColor = '#d9534f'
      } else if (r.id === 'aSite' || r.id === 'bSite') {
        fillColor = '#2563eb'
        strokeColor = '#3b82f6'
      } else if (r.level === 1) {
        fillColor = '#ea580c'
        strokeColor = '#f97316'
      }

      ctx.fillStyle = fillColor
      ctx.fillRect(cx0, cy0, cw, ch)
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = 1.5
      ctx.strokeRect(cx0, cy0, cw, ch)
    }

    // 6. Stairs Hatch
    for (const s of this.layout.stairs || []) {
      const [x0, z0, x1, z1] = s.rect
      const cx0 = toCanvasX(x0)
      const cy0 = toCanvasY(z0)
      const cw = toCanvasW(x1 - x0)
      const ch = toCanvasH(z1 - z0)

      ctx.fillStyle = '#f59e0b'
      ctx.fillRect(cx0, cy0, cw, ch)
      ctx.strokeStyle = '#b45309'
      ctx.lineWidth = 1.5
      ctx.strokeRect(cx0, cy0, cw, ch)

      // Hatch lines perpendicular to ascend direction
      const d = s.ascendsToward
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)'
      ctx.lineWidth = 1.5

      if (d === 'west' || d === 'east') {
        const stepCount = (x1 - x0) * 2
        for (let i = 1; i < stepCount; i++) {
          const hx = toCanvasX(x0 + i * 0.5)
          ctx.beginPath()
          ctx.moveTo(hx, cy0)
          ctx.lineTo(hx, cy0 + ch)
          ctx.stroke()
        }
      } else {
        const stepCount = (z1 - z0) * 2
        for (let i = 1; i < stepCount; i++) {
          const hy = toCanvasY(z0 + i * 0.5)
          ctx.beginPath()
          ctx.moveTo(cx0, hy)
          ctx.lineTo(cx0 + cw, hy)
          ctx.stroke()
        }
      }
    }

    // 7. Windows
    for (const wnd of this.layout.windows || []) {
      const [x0, z0, x1, z1] = wnd.rect
      const cx0 = toCanvasX(x0)
      const cy0 = toCanvasY(z0)
      const cw = toCanvasW(x1 - x0)
      const ch = toCanvasH(z1 - z0)

      ctx.strokeStyle = '#06b6d4'
      ctx.lineWidth = 2.5
      ctx.strokeRect(cx0, cy0, cw, ch)
    }

    // 8. Plant Zones (Yellow Outline)
    if (this.layout.plantZones) {
      const pzs = [this.layout.plantZones.A, this.layout.plantZones.B]
      for (const pz of pzs) {
        if (!pz) continue
        const [x0, z0, x1, z1] = pz
        const cx0 = toCanvasX(x0)
        const cy0 = toCanvasY(z0)
        const cw = toCanvasW(x1 - x0)
        const ch = toCanvasH(z1 - z0)

        ctx.strokeStyle = '#facc15'
        ctx.lineWidth = 2.5
        ctx.strokeRect(cx0, cy0, cw, ch)
      }
    }

    // 9. Props
    for (const p of this.layout.props || []) {
      const [x0, z0, x1, z1] = p.rect
      const cx0 = toCanvasX(x0)
      const cy0 = toCanvasY(z0)
      const cw = toCanvasW(x1 - x0)
      const ch = toCanvasH(z1 - z0)

      let pColor = '#78350f'
      if (p.type === 'container') pColor = '#0f766e'
      else if (p.type === 'pillar') pColor = '#374151'
      else if (p.type === 'fountain') pColor = '#0284c7'
      else if (p.type === 'planter') pColor = '#15803d'
      else if (p.type === 'stall') pColor = '#9a3412'

      ctx.fillStyle = pColor
      ctx.fillRect(cx0, cy0, cw, ch)
      ctx.strokeStyle = 'rgba(0,0,0,0.4)'
      ctx.lineWidth = 1
      ctx.strokeRect(cx0, cy0, cw, ch)
    }

    // 10. Teleporter Pads & Connecting Line
    for (const tp of this.layout.teleporters || []) {
      const [en0, en1, en2, en3] = tp.entryPad
      const [ex0, ex1, ex2, ex3] = tp.exitPad

      // Entry Pad (Purple)
      const ecx0 = toCanvasX(en0), ecy0 = toCanvasY(en1)
      const ecw = toCanvasW(en2 - en0), ech = toCanvasH(en3 - en1)
      ctx.strokeStyle = '#c084fc'
      ctx.lineWidth = 2.5
      ctx.strokeRect(ecx0, ecy0, ecw, ech)

      // Exit Pad (Cyan)
      const xcx0 = toCanvasX(ex0), xcy0 = toCanvasY(ex1)
      const xcw = toCanvasW(ex2 - ex0), xch = toCanvasH(ex3 - ex1)
      ctx.strokeStyle = '#2dd4bf'
      ctx.lineWidth = 2.5
      ctx.strokeRect(xcx0, xcy0, xcw, xch)

      // Arrow connecting entry to exit
      const fromX = ecx0 + ecw * 0.5
      const fromY = ecy0 + ech * 0.5
      const toX = xcx0 + xcw * 0.5
      const toY = xcy0 + xch * 0.5

      ctx.strokeStyle = '#c084fc'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(fromX, fromY)
      ctx.lineTo(toX, toY)
      ctx.stroke()

      // Arrowhead
      const angle = Math.atan2(toY - fromY, toX - fromX)
      ctx.fillStyle = '#c084fc'
      ctx.beginPath()
      ctx.moveTo(toX, toY)
      ctx.lineTo(toX - 10 * Math.cos(angle - Math.PI / 6), toY - 10 * Math.sin(angle - Math.PI / 6))
      ctx.lineTo(toX - 10 * Math.cos(angle + Math.PI / 6), toY - 10 * Math.sin(angle + Math.PI / 6))
      ctx.closePath()
      ctx.fill()
    }

    // 11. Spawn Dots
    const atkSpawns = this.layout.spawns?.points?.attacker || []
    for (const [sx, sz] of atkSpawns) {
      const cx = toCanvasX(sx)
      const cy = toCanvasY(sz)
      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.arc(cx, cy, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#7f1d1d'
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    const defSpawns = this.layout.spawns?.points?.defender || []
    for (const [sx, sz] of defSpawns) {
      const cx = toCanvasX(sx)
      const cy = toCanvasY(sz)
      ctx.fillStyle = '#3b82f6'
      ctx.beginPath()
      ctx.arc(cx, cy, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#1e3a8a'
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    // 12. Callout Labels (Short names, dark background, anchored at callout pos, nudge up to 3m away from spawn dots / stairs, or skip)
    const allSpawns = [...atkSpawns, ...defSpawns]
    const stairsList = this.layout.stairs || []
    const dotRadiusM = Math.max(0.6, 5 / scale)

    ctx.font = 'bold 10px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Candidate offsets for nudging (0m first, then 0.5m to 3.0m in 8 directions)
    const candidateOffsets = [[0, 0]]
    for (let d = 0.5; d <= 3.01; d += 0.5) {
      candidateOffsets.push([0, d])
      candidateOffsets.push([0, -d])
      candidateOffsets.push([-d, 0])
      candidateOffsets.push([d, 0])
      const diag = d * 0.7071
      candidateOffsets.push([-diag, -diag])
      candidateOffsets.push([diag, -diag])
      candidateOffsets.push([-diag, diag])
      candidateOffsets.push([diag, diag])
    }

    for (const [calloutKey, [origX, origZ]] of Object.entries(this.layout.callouts || {})) {
      const labelText = CALLOUT_SHORT_NAMES[calloutKey] || calloutKey.toUpperCase()
      const metrics = ctx.measureText(labelText)
      const textW = metrics.width
      const padX = 4
      const padY = 2.5
      const pillW = textW + padX * 2
      const pillH = 15
      const halfWm = (pillW * 0.5) / scale
      const halfHm = (pillH * 0.5) / scale

      let finalPos = null

      for (const [dx, dz] of candidateOffsets) {
        const candX = origX + dx
        const candZ = origZ + dz

        const bX0 = candX - halfWm
        const bX1 = candX + halfWm
        const bZ0 = candZ - halfHm
        const bZ1 = candZ + halfHm

        // Check spawn dots overlap
        let collides = false
        for (const [sx, sz] of allSpawns) {
          if (sx >= bX0 - dotRadiusM && sx <= bX1 + dotRadiusM &&
              sz >= bZ0 - dotRadiusM && sz <= bZ1 + dotRadiusM) {
            collides = true
            break
          }
        }
        if (collides) continue

        // Check stairs rect overlap
        for (const st of stairsList) {
          const [sx0, sz0, sx1, sz1] = st.rect
          if (bX0 < sx1 && bX1 > sx0 && bZ0 < sz1 && bZ1 > sz0) {
            collides = true
            break
          }
        }
        if (collides) continue

        finalPos = [candX, candZ]
        break
      }

      // If no valid position found within 3 m nudge, skip label
      if (!finalPos) continue

      const [anchorX, anchorZ] = finalPos
      const cx = toCanvasX(anchorX)
      const cy = toCanvasY(anchorZ)

      const pillX = cx - pillW * 0.5
      const pillY = cy - pillH * 0.5

      ctx.fillStyle = 'rgba(15, 20, 28, 0.78)'
      ctx.fillRect(pillX, pillY, pillW, pillH)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.lineWidth = 1
      ctx.strokeRect(pillX, pillY, pillW, pillH)

      ctx.fillStyle = '#ffffff'
      ctx.fillText(labelText, cx, cy)
    }

    // 13. Player Position & Orientation Cone
    const player = this.getPlayer?.()
    if (player && player.position) {
      const px = toCanvasX(player.position.x)
      const py = toCanvasY(player.position.z)
      const yaw = player.camera ? player.camera.rotation.y : 0

      // View cone
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)'
      ctx.beginPath()
      ctx.moveTo(px, py)
      ctx.arc(px, py, 26, -yaw - Math.PI * 0.5 - 0.45, -yaw - Math.PI * 0.5 + 0.45)
      ctx.closePath()
      ctx.fill()

      // Player dot
      ctx.fillStyle = '#38bdf8'
      ctx.beginPath()
      ctx.arc(px, py, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // 14. Cursor Reticle & Live Coordinate Tooltip
    if (this.cursorWorld.px !== undefined) {
      const cx = this.cursorWorld.px
      const cy = this.cursorWorld.py

      // Clamp crosshair lines to map bounds
      if (cx >= offsetX && cx <= offsetX + renderedW && cy >= offsetY && cy <= offsetY + renderedH) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)'
        ctx.lineWidth = 1
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.moveTo(cx, offsetY); ctx.lineTo(cx, offsetY + renderedH)
        ctx.moveTo(offsetX, cy); ctx.lineTo(offsetX + renderedW, cy)
        ctx.stroke()
        ctx.setLineDash([])

        // Floating coordinate tooltip
        const tooltipText = `X: ${this.cursorWorld.x.toFixed(1)}, Z: ${this.cursorWorld.z.toFixed(1)}`
        ctx.font = 'bold 12px monospace'
        const m = ctx.measureText(tooltipText)
        const tx = Math.min(cx + 14, offsetX + renderedW - m.width - 16)
        const ty = Math.max(cy - 12, offsetY + 24)

        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)'
        ctx.strokeStyle = '#38bdf8'
        ctx.lineWidth = 1
        ctx.fillRect(tx - 4, ty - 14, m.width + 8, 20)
        ctx.strokeRect(tx - 4, ty - 14, m.width + 8, 20)

        ctx.fillStyle = '#38bdf8'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        ctx.fillText(tooltipText, tx, ty - 4)
      }
    }

    // 15. Legend Footer Bar
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)'
    ctx.fillRect(0, h - 26, w, 26)
    ctx.fillStyle = '#e2e8f0'
    ctx.font = '11px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Bind-inspired layout • 1 cell = 1 m • yellow outline = plant zone • purple = teleporter entry/exit • cyan = window • orange = Level 1 (+3.5 m)', w * 0.5, h - 13)
  }

  // ── F5: Level Color Toggle & Topology List ────────────────────────────────
  toggleF5(forceState) {
    this.f5Active = forceState !== undefined ? forceState : !this.f5Active
    const map = this.getActiveMap?.()
    if (map && typeof map.setLevelDebugMode === 'function') {
      map.setLevelDebugMode(this.f5Active)
    }

    if (this.f5Active) {
      this.f5Panel.classList.add('active')
      this.showToast('F5: Level Coloring Active (0=Gray, 1=Orange)')
    } else {
      this.f5Panel.classList.remove('active')
      this.showToast('F5: Level Coloring Disabled')
    }
  }

  _populateF5List() {
    const listEl = document.getElementById('bind-f5-list')
    if (!listEl) return

    listEl.innerHTML = ''
    const regions = this.layout.regions || []

    // Sort: Level 1 first, then alphabetical
    const sorted = [...regions].sort((a, b) => (b.level || 0) - (a.level || 0) || a.name.localeCompare(b.name))

    for (const r of sorted) {
      const isL1 = (r.level === 1)
      let reachDesc = 'Ground-level corridors and connectors'

      if (r.id === 'aHeaven') {
        reachDesc = 'Stairs: <b>st_heaven</b> (from A Site L0 -> A Heaven L1; ascends West, 6m run, rise 3.5m)'
      } else if (r.id === 'bHookah') {
        reachDesc = 'Stairs: <b>st_hookah_up</b> (from B Short L0 -> Hookah L1) & <b>st_hookah_down</b> (to B Garden L0)'
      } else if (r.id === 'aSite') {
        reachDesc = 'Direct ground level + Heaven stairs access'
      }

      const row = document.createElement('div')
      row.className = 'bind-zone-row'
      row.innerHTML = `
        <div class="bind-zone-header">
          <span class="bind-zone-name">${r.name}</span>
          <span class="bind-level-pill ${isL1 ? 'bind-level-1' : 'bind-level-0'}">${isL1 ? 'Level 1 (+3.5m)' : 'Level 0 (0.0m)'}</span>
        </div>
        <div class="bind-zone-stairs">${reachDesc}</div>
      `
      listEl.appendChild(row)
    }
  }

  // ── F6: Camera Checkpoints Panel ──────────────────────────────────────────
  toggleF6(forceState) {
    this.f6Active = forceState !== undefined ? forceState : !this.f6Active
    if (this.f6Active) {
      this.f6Panel.classList.add('active')
      this.showToast('F6: Camera Checkpoints Panel Opened')
    } else {
      this.f6Panel.classList.remove('active')
    }
  }

  _populateF6List() {
    const listEl = document.getElementById('bind-f6-list')
    if (!listEl) return

    listEl.innerHTML = ''
    for (const cp of CAMERA_CHECKPOINTS) {
      const btn = document.createElement('button')
      btn.className = 'bind-cp-btn'
      btn.innerHTML = `
        <div class="bind-cp-title">
          <span>${cp.id} — ${cp.name}</span>
          <span class="bind-cp-coords">[${cp.pos.join(', ')}]</span>
        </div>
        <div class="bind-cp-desc">Eye: ${cp.eyeHeight}m | Yaw: ${cp.yaw}° • ${cp.desc}</div>
      `
      btn.addEventListener('click', () => this.teleportToCheckpoint(cp))
      listEl.appendChild(btn)
    }
  }

  teleportToCheckpoint(cpIdOrObj) {
    const indoorAliases = {
      aShowers: { id: 'aShowers', name: 'A Showers (Bath)', pos: [-50, 1.65, 13], yaw: 0, eyeHeight: 1.65, desc: 'showers interior' },
      bShort: { id: 'bShort', name: 'B Short Room', pos: [32, 1.65, 16], yaw: 0, eyeHeight: 1.65, desc: 'teleporter exit room' },
      bShortRoom: { id: 'bShortRoom', name: 'B Short Room', pos: [32, 1.65, 16], yaw: 0, eyeHeight: 1.65, desc: 'teleporter exit room' }
    }
    const cp = typeof cpIdOrObj === 'string'
      ? (CAMERA_CHECKPOINTS.find(c => c.id === cpIdOrObj) || indoorAliases[cpIdOrObj])
      : cpIdOrObj
    if (!cp) return false
    const player = this.getPlayer?.()
    if (!player) return false
    const feetY = cp.eyeHeight - 0.72
    player.teleportTo(cp.pos[0], feetY, cp.pos[2])
    if (player.camera) {
      player.camera.rotation.order = 'YXZ'
      player.camera.rotation.set(0, -THREE.MathUtils.degToRad(cp.yaw), 0)
    }
    this.engine.setOverrideCamera(null)
    this.showToast(`Teleported to ${cp.id} (${cp.name}) - Yaw ${cp.yaw}°`)
    return true
  }

  // ── F7: Collision Boxes Wireframe ─────────────────────────────────────────
  toggleF7(forceState) {
    this.f7Active = forceState !== undefined ? forceState : !this.f7Active
    const map = this.getActiveMap?.()
    const colliders = map?.getColliders?.() || []

    if (this.f7Active) {
      if (!this.wireframeMesh) {
        this.wireframeMesh = this._buildCollisionWireframes(colliders)
      }
      this.engine.scene.add(this.wireframeMesh)
      this.showToast(`F7: Collision Wireframes ON (${colliders.length} boxes)`)
    } else {
      if (this.wireframeMesh) {
        this.engine.scene.remove(this.wireframeMesh)
      }
      this.showToast('F7: Collision Wireframes OFF')
    }
  }

  _buildCollisionWireframes(boxes) {
    const positions = []

    for (const b of boxes) {
      const x0 = b.minX, x1 = b.maxX
      const y0 = b.bottomY, y1 = b.topY
      const z0 = b.minZ, z1 = b.maxZ

      // 12 line segments of an AABB box (24 vertices)
      // Bottom 4 edges
      positions.push(x0, y0, z0, x1, y0, z0)
      positions.push(x1, y0, z0, x1, y0, z1)
      positions.push(x1, y0, z1, x0, y0, z1)
      positions.push(x0, y0, z1, x0, y0, z0)

      // Top 4 edges
      positions.push(x0, y1, z0, x1, y1, z0)
      positions.push(x1, y1, z0, x1, y1, z1)
      positions.push(x1, y1, z1, x0, y1, z1)
      positions.push(x0, y1, z1, x0, y1, z0)

      // Vertical 4 pillars
      positions.push(x0, y0, z0, x0, y1, z0)
      positions.push(x1, y0, z0, x1, y1, z0)
      positions.push(x1, y0, z1, x1, y1, z1)
      positions.push(x0, y0, z1, x0, y1, z1)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const mat = new THREE.LineBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.65
    })

    const lines = new THREE.LineSegments(geo, mat)
    lines.name = 'bind-collision-wireframes'
    return lines
  }

  update(dt) {
    if (this.f4Active) {
      this._renderTopdownMap()
    }
  }

  destroy() {
    this.f4Container?.remove()
    this.f5Panel?.remove()
    this.f6Panel?.remove()
    this.toast?.remove()
    if (this.wireframeMesh) {
      this.engine.scene.remove(this.wireframeMesh)
      this.wireframeMesh.geometry.dispose()
      this.wireframeMesh.material.dispose()
    }
  }
}
