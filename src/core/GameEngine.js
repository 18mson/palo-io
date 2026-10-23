import * as THREE from 'three'
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js'
import { bus } from './EventBus.js'

/**
 * GameEngine — Three.js renderer, scene, camera, and game loop
 */
export class GameEngine {
  constructor() {
    this.scene    = new THREE.Scene()
    this.camera   = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.05, 500)
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    })
    this.controls = null
    this.clock    = new THREE.Clock()
    this.running  = false
    this._frameId = null
    this._updateFns = []

    // Ensure camera is added to scene so attached objects (gun, flash) are rendered
    this.scene.add(this.camera)

    this._initRenderer()
    this._initControls()
    this._handleResize()
  }

  _initRenderer() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.10
    this.renderer.setClearColor(0x70b2fa, 1.0)
    this.scene.background = new THREE.Color(0x70b2fa)

    const wrapper = document.getElementById('canvas-wrapper')
    if (wrapper) {
      wrapper.innerHTML = ''
      wrapper.appendChild(this.renderer.domElement)
    }
  }

  _initControls() {
    this.controls = new PointerLockControls(this.camera, this.renderer.domElement)

    this.controls.addEventListener('lock', () => {
      bus.emit('controls:locked')
    })
    this.controls.addEventListener('unlock', () => {
      bus.emit('controls:unlocked')
    })

    const gameEl = document.getElementById('game-container')
    gameEl.addEventListener('click', (e) => {
      const overlay = document.getElementById('play-overlay')
      if (overlay && !overlay.classList.contains('hidden')) return
      if (e.target.closest('button') || e.target.closest('#po-play-btn')) return
      if (!this.controls.isLocked) {
        this.controls.lock()
      }
    })
  }

  _handleResize() {
    window.addEventListener('resize', () => this.resize())
  }

  resize() {
    const width = window.innerWidth
    const height = window.innerHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  addUpdateFn(fn) {
    this._updateFns.push(fn)
  }

  removeUpdateFn(fn) {
    this._updateFns = this._updateFns.filter(f => f !== fn)
  }

  start() {
    if (this.running) return
    this.running = true
    this.clock.start()
    this.resize()
    this._loop()
  }

  stop() {
    this.running = false
    if (this._frameId) cancelAnimationFrame(this._frameId)
    this._frameId = null
  }

  _loop() {
    this._frameId = requestAnimationFrame(() => this._loop())
    const dt = Math.min(this.clock.getDelta(), 0.05)
    for (const fn of this._updateFns) fn(dt)
    this.renderer.render(this.scene, this.camera)
  }

  get isLocked() {
    return this.controls?.isLocked ?? false
  }

  lockPointer()   { this.controls?.lock() }
  unlockPointer() { this.controls?.unlock() }

  captureScreenshot() {
    try {
      this.renderer.render(this.scene, this.camera)
      const dataUrl = this.renderer.domElement.toDataURL('image/png')
      const a = document.createElement('a')
      const timeStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
      a.download = `palo-io-screenshot-${timeStr}.png`
      a.href = dataUrl
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      bus.emit('screenshot:taken')
      return true
    } catch (err) {
      console.error('Failed to capture screenshot:', err)
      return false
    }
  }
}
