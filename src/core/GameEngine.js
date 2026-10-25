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
      preserveDrawingBuffer: false
    })
    this.controls = null
    this.clock    = new THREE.Clock()
    this.running  = false
    this._frameId = null
    this._updateFns = []
    this._isRecording = false

    // Ensure camera is added to scene so attached objects are rendered
    this.scene.add(this.camera)

    // Dedicated Viewmodel Overlay Scene & Camera (Valorant First-Person Zero Wall-Clipping)
    this.viewmodelScene  = new THREE.Scene()
    this.viewmodelCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 50)
    this.viewmodelScene.add(this.viewmodelCamera)

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
    this.renderer.info.autoReset = false
    this.scene.background = new THREE.Color(0x70b2fa)

    const wrapper = document.getElementById('canvas-wrapper')
    if (wrapper) {
      wrapper.innerHTML = ''
      wrapper.appendChild(this.renderer.domElement)
    }
  }

  _initControls() {
    this.controls = new PointerLockControls(this.camera, this.renderer.domElement)
    this.overrideCamera = null

    this.controls.addEventListener('lock', () => {
      bus.emit('controls:locked')
    })
    this.controls.addEventListener('unlock', () => {
      bus.emit('controls:unlocked')
    })

    const gameEl = document.getElementById('game-container')
    gameEl.addEventListener('click', (e) => {
      if (this.overrideCamera) return // Prevent locking cursor in top-down / debug override modes
      const overlay = document.getElementById('play-overlay')
      if (overlay && !overlay.classList.contains('hidden')) return
      if (e.target.closest('button') || e.target.closest('#po-play-btn') || e.target.closest('input')) return
      if (!this.controls.isLocked) {
        this.controls.lock()
      }
    })
  }

  setOverrideCamera(cam) {
    this.overrideCamera = cam
    if (cam) {
      this.unlockPointer()
    }
  }

  _handleResize() {
    window.addEventListener('resize', () => this.resize())
  }

  resize() {
    const width = window.innerWidth
    const height = window.innerHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.viewmodelCamera.aspect = width / height
    this.viewmodelCamera.updateProjectionMatrix()
    if (this.overrideCamera && this.overrideCamera.isOrthographicCamera) {
      const aspect = width / height
      const fH = this.overrideCamera._frustumHeight || 130
      this.overrideCamera.left = (-fH * aspect) / 2
      this.overrideCamera.right = (fH * aspect) / 2
      this.overrideCamera.top = fH / 2
      this.overrideCamera.bottom = -fH / 2
      this.overrideCamera.updateProjectionMatrix()
    }
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

    // Dual-Pass Valorant Viewmodel Rendering:
    // 1. Render World Scene (Map, Skybox, Bots, Tracers)
    // 2. Clear Depth Buffer
    // 3. Render Viewmodel Overlay (Weapon, Arms, MuzzleFlash)
    // Guarantees first-person weapon NEVER clips into walls or map geometry!
    this.renderer.info.reset()
    this.renderer.autoClear = false
    this.renderer.clear()
    const activeCamera = this.overrideCamera || this.camera
    this.renderer.render(this.scene, activeCamera)
    if (!this.overrideCamera) {
      this.renderer.clearDepth()
      this.renderer.render(this.viewmodelScene, this.viewmodelCamera)
    }
  }

  get isLocked() {
    return this.controls?.isLocked ?? false
  }

  lockPointer()   { this.controls?.lock() }
  unlockPointer() { this.controls?.unlock() }

  captureScreenshot() {
    try {
      this.renderer.autoClear = false
      this.renderer.clear()
      this.renderer.render(this.scene, this.camera)
      this.renderer.clearDepth()
      this.renderer.render(this.viewmodelScene, this.viewmodelCamera)
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

  recordClip(durationMs = 3000, onProgress = null) {
    if (this._isRecording) return false
    const canvas = this.renderer?.domElement
    if (!canvas) return false

    try {
      const stream = canvas.captureStream ? canvas.captureStream(60) : (canvas.mozCaptureStream ? canvas.mozCaptureStream(60) : null)
      if (!stream) {
        console.warn('captureStream is not supported in this browser.')
        return false
      }

      // Universal Web & Chat Upload Video Priority:
      // Prioritize standard MP4 / H.264 so videos can be uploaded and played directly in chat windows
      const preferredMimeTypes = [
        'video/mp4;codecs=avc1',
        'video/mp4;codecs=h264',
        'video/mp4',
        'video/webm;codecs=h264',
        'video/webm;codecs=vp8',
        'video/webm;codecs=vp9',
        'video/webm'
      ]

      let mimeType = ''
      if (window.MediaRecorder && typeof MediaRecorder.isTypeSupported === 'function') {
        for (const type of preferredMimeTypes) {
          if (MediaRecorder.isTypeSupported(type)) {
            mimeType = type
            break
          }
        }
      }

      // Compact 4 Mbps bitrate: produces crisp 60FPS video under ~1.5 MB for instant chat upload
      const options = mimeType ? { mimeType, videoBitsPerSecond: 4000000 } : undefined
      const recorder = new MediaRecorder(stream, options)
      const chunks = []
      this._isRecording = true

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data)
        }
      }

      const startTime = performance.now()
      let progressTimer = null

      if (onProgress) {
        onProgress(durationMs / 1000)
        progressTimer = setInterval(() => {
          const elapsed = performance.now() - startTime
          const remaining = Math.max(0, (durationMs - elapsed) / 1000)
          onProgress(remaining)
        }, 100)
      }

      recorder.onstop = () => {
        this._isRecording = false
        if (progressTimer) clearInterval(progressTimer)
        try {
          const actualType = recorder.mimeType || mimeType || 'video/mp4'
          const isMp4 = actualType.toLowerCase().includes('mp4')
          const ext = isMp4 ? 'mp4' : 'webm'
          const blob = new Blob(chunks, { type: actualType })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          const timeStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
          a.download = `palo-io-clip-${timeStr}.${ext}`
          a.href = url
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          setTimeout(() => URL.revokeObjectURL(url), 10000)
          bus.emit('record:completed', { durationMs, ext })
        } catch (err) {
          console.error('Error saving recorded video:', err)
        }
      }

      recorder.start(100)
      bus.emit('record:started', { durationMs })

      setTimeout(() => {
        if (recorder.state !== 'inactive') {
          recorder.stop()
        }
      }, durationMs)

      return true
    } catch (err) {
      this._isRecording = false
      console.error('Failed to start recording clip:', err)
      return false
    }
  }
}
