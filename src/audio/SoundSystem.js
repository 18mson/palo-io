/**
 * SoundSystem — 100% native Web Audio API synthesizer for FPS SFX
 * Zero external audio files, zero CORS/download issues, instant playback.
 */
class SoundSystem {
  constructor() {
    this.ctx = null
    this.enabled = true
    this._initialized = false
  }

  _init() {
    if (this._initialized) return
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    this.ctx = new AudioContext()
    this._initialized = true
  }

  _resume() {
    this._init()
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  // ── Gunfire ──────────────────────────────────────────
  playShoot(weaponType = 'vandal') {
    this._resume()
    if (!this.ctx) return

    const now = this.ctx.currentTime

    switch (weaponType) {
      case 'operator':
        this._playHeavyBoom(now)
        break
      case 'spectre':
        this._playRapidSmg(now)
        break
      case 'odin':
        this._playHeavyChug(now)
        break
      case 'bucky':
        this._playShotgunBlast(now)
        break
      case 'classic':
        this._playPistolPop(now)
        break
      case 'vandal':
      default:
        this._playRifleShot(now)
        break
    }
  }

  _playRifleShot(now) {
    // Vandal: 7.62mm tactical rifle — punchy mechanical crack + sub-bass punch
    const osc = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(260, now)
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.13)

    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(140, now)
    osc2.frequency.exponentialRampToValueAtTime(32, now + 0.15)

    gain.gain.setValueAtTime(0.42, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

    osc.connect(gain)
    osc2.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc2.start(now)
    osc.stop(now + 0.15)
    osc2.stop(now + 0.15)

    // Explosive muzzle crack + mechanical bolt ping
    this._playNoise(now, 0.09, 0.45, 3200)
    this._playClick(now, 2400, 0.03, 0.25)
  }

  _playPistolPop(now) {
    // Classic: 9mm semi-auto — snappy slide action + crisp pop
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(360, now)
    osc.frequency.exponentialRampToValueAtTime(75, now + 0.08)

    gain.gain.setValueAtTime(0.32, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(now)
    osc.stop(now + 0.08)

    this._playNoise(now, 0.05, 0.28, 3800)
    this._playClick(now + 0.015, 3200, 0.02, 0.2)
  }

  _playRapidSmg(now) {
    // Spectre: Suppressed 9mm SMG — muted, low gas puff + fast slide thwack
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(190, now)
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.06)

    gain.gain.setValueAtTime(0.28, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(now)
    osc.stop(now + 0.06)

    // Heavily muffled high-cut gas suppressor hiss
    this._playNoise(now, 0.045, 0.26, 1600)
    this._playClick(now, 1800, 0.015, 0.15)
  }

  _playHeavyBoom(now) {
    // Operator: Heavy .50 Cal Sniper — thunderous shockwave + supersonic blast + canyon echo
    const subOsc = this.ctx.createOscillator()
    const bodyOsc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    subOsc.type = 'sine'
    subOsc.frequency.setValueAtTime(150, now)
    subOsc.frequency.exponentialRampToValueAtTime(20, now + 0.45)

    bodyOsc.type = 'sawtooth'
    bodyOsc.frequency.setValueAtTime(210, now)
    bodyOsc.frequency.exponentialRampToValueAtTime(35, now + 0.3)

    gain.gain.setValueAtTime(0.75, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45)

    subOsc.connect(gain)
    bodyOsc.connect(gain)
    gain.connect(this.ctx.destination)

    subOsc.start(now)
    bodyOsc.start(now)
    subOsc.stop(now + 0.45)
    bodyOsc.stop(now + 0.45)

    // Deafening supersonic air displacement crack + rolling echo
    this._playNoise(now, 0.32, 0.7, 2800)
    setTimeout(() => {
      if (this.ctx) this._playNoise(this.ctx.currentTime, 0.25, 0.25, 1200)
    }, 90)
  }

  _playHeavyChug(now) {
    // Odin: Heavy LMG — rapid mechanical piston chug + deep heavy bark
    const osc = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'square'
    osc.frequency.setValueAtTime(190, now)
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.09)

    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(95, now)
    osc2.frequency.exponentialRampToValueAtTime(30, now + 0.11)

    gain.gain.setValueAtTime(0.38, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11)

    osc.connect(gain)
    osc2.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc2.start(now)
    osc.stop(now + 0.11)
    osc2.stop(now + 0.11)

    this._playNoise(now, 0.07, 0.38, 2600)
    this._playClick(now, 3400, 0.02, 0.22)
  }

  _playShotgunBlast(now) {
    // Bucky: 12-Gauge Magnum Shotgun — multi-pellet explosive wallop + shell casing rattle
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(175, now)
    osc.frequency.exponentialRampToValueAtTime(28, now + 0.22)

    gain.gain.setValueAtTime(0.62, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(now)
    osc.stop(now + 0.22)

    this._playNoise(now, 0.22, 0.65, 1800)
    this._playClick(now, 1400, 0.04, 0.35)
  }

  _playClick(now, freq, duration, vol) {
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, now + duration)
    gain.gain.setValueAtTime(vol, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration)
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(now)
    osc.stop(now + duration)
  }

  _playNoise(now, duration, volume, filterFreq) {
    const bufferSize = Math.floor(this.ctx.sampleRate * duration)
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(filterFreq, now)
    filter.frequency.exponentialRampToValueAtTime(300, now + duration)

    const gain = this.ctx.createGain()
    gain.gain.setValueAtTime(volume, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(this.ctx.destination)

    noise.start(now)
    noise.stop(now + duration)
  }

  // ── Hitmarker & Headshot Sounds (Krunker/Valorant ding) ──
  playHit(isHead = false) {
    this._resume()
    if (!this.ctx) return

    const now = this.ctx.currentTime

    if (isHead) {
      // Crisp metallic chime "dink!" ala Valorant headshot
      const osc1 = this.ctx.createOscillator()
      const osc2 = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc1.type = 'sine'
      osc2.type = 'triangle'
      osc1.frequency.setValueAtTime(1760, now) // A6
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.18)
      osc2.frequency.setValueAtTime(2640, now) // E7
      osc2.frequency.exponentialRampToValueAtTime(1320, now + 0.15)

      gain.gain.setValueAtTime(0.4, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(this.ctx.destination)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + 0.2)
      osc2.stop(now + 0.2)
    } else {
      // Satisfying hitmarker click/bell
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(880, now)
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.08)

      gain.gain.setValueAtTime(0.25, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.08)
    }
  }

  // ── Movement & Tactical Sounds ──
  playSlide() {
    this._resume()
    if (!this.ctx) return
    const now = this.ctx.currentTime
    this._playNoise(now, 0.35, 0.15, 900)
  }

  playJump() {
    this._resume()
    if (!this.ctx) return
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(120, now)
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.1)

    gain.gain.setValueAtTime(0.18, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(now)
    osc.stop(now + 0.12)
  }

  playReload() {
    this._resume()
    if (!this.ctx) return
    const now = this.ctx.currentTime
    // Mag release click
    this._playNoise(now, 0.05, 0.28, 2600)
    // Mag slap in
    setTimeout(() => {
      if (this.ctx) {
        this.playMagSlap()
      }
    }, 350)
  }

  playMagSlap() {
    this._resume()
    if (!this.ctx) return
    const now = this.ctx.currentTime
    // Solid mechanical slap: low thump + crisp metal latch
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(260, now)
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.08)
    gain.gain.setValueAtTime(0.35, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(now)
    osc.stop(now + 0.08)
    this._playNoise(now, 0.06, 0.35, 3400)
  }

  playBoltCycle() {
    this._resume()
    if (!this.ctx) return
    const now = this.ctx.currentTime
    // Phase 1: Bolt pull back (crisp metal click)
    this._playNoise(now, 0.04, 0.28, 4200)
    // Phase 2: Shell eject clink
    setTimeout(() => {
      if (!this.ctx) return
      const t = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1400, t)
      osc.frequency.exponentialRampToValueAtTime(900, t + 0.05)
      gain.gain.setValueAtTime(0.2, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(t)
      osc.stop(t + 0.05)
      this._playNoise(t, 0.03, 0.2, 3800)
    }, 180)
    // Phase 3: Bolt slide forward and lock into battery
    setTimeout(() => {
      if (!this.ctx) return
      const t = this.ctx.currentTime
      this._playNoise(t, 0.05, 0.35, 4500)
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(320, t)
      osc.frequency.exponentialRampToValueAtTime(110, t + 0.06)
      gain.gain.setValueAtTime(0.25, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(t)
      osc.stop(t + 0.06)
    }, 380)
  }

  playPumpCycle() {
    this._resume()
    if (!this.ctx) return
    const now = this.ctx.currentTime
    // Pump slide rack back
    this._playNoise(now, 0.06, 0.3, 2600)
    // Pump slide forward
    setTimeout(() => {
      if (this.ctx) this._playNoise(this.ctx.currentTime, 0.07, 0.35, 3000)
    }, 160)
  }

  playKill() {
    this._resume()
    if (!this.ctx) return
    const now = this.ctx.currentTime
    // Valorant kill guitar riff-like harmonic chord
    [523.25, 659.25, 783.99].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(freq, now + idx * 0.03)
      gain.gain.setValueAtTime(0.2, now + idx * 0.03)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(now + idx * 0.03)
      osc.stop(now + 0.5)
    })
  }

  playFootstep(isLoud = false) {
    this._resume()
    if (!this.ctx) return
    const now = this.ctx.currentTime
    const vol = isLoud ? 0.28 : 0.14
    // Natural stone paving boot thud
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(140 + Math.random() * 20, now)
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.07)
    gain.gain.setValueAtTime(vol, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(now)
    osc.stop(now + 0.08)

    // Micro boot sole grit friction
    this._playNoise(now, 0.035, vol * 0.6, 2200)
  }
}

export const sounds = new SoundSystem()
