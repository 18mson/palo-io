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

  _playNoise(now, duration, volume, filterFreq, dest = null) {
    if (!this.ctx) return
    const targetDest = dest || this.ctx.destination
    const bufferSize = Math.max(1, Math.floor(this.ctx.sampleRate * duration))
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
    filter.frequency.exponentialRampToValueAtTime(Math.min(300, filterFreq), now + duration)

    const gain = this.ctx.createGain()
    gain.gain.setValueAtTime(volume, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(targetDest)

    noise.start(now)
    noise.stop(now + duration)
  }

  // ── Hitmarker & Headshot Sounds (Iconic Valorant Headshot Dink) ──
  playHit(isHead = false) {
    this._resume()
    if (!this.ctx) return

    const now = this.ctx.currentTime

    if (isHead) {
      // 1. Sharp mechanical impact crack
      this._playClick(now, 4800, 0.025, 0.35)
      this._playNoise(now, 0.035, 0.30, 6000)

      // 2. Legendary Valorant high-frequency metallic "DINK!" chime
      const osc1 = this.ctx.createOscillator()
      const osc2 = this.ctx.createOscillator()
      const osc3 = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc1.type = 'sine'
      osc2.type = 'triangle'
      osc3.type = 'sine'

      // Bright resonant bell harmonics
      osc1.frequency.setValueAtTime(2349, now) // D7
      osc1.frequency.exponentialRampToValueAtTime(1174, now + 0.22)
      osc2.frequency.setValueAtTime(3520, now) // A7
      osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.18)
      osc3.frequency.setValueAtTime(4698, now) // D8
      osc3.frequency.exponentialRampToValueAtTime(2349, now + 0.12)

      gain.gain.setValueAtTime(0.55, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26)

      osc1.connect(gain)
      osc2.connect(gain)
      osc3.connect(gain)
      gain.connect(this.ctx.destination)

      osc1.start(now)
      osc2.start(now)
      osc3.start(now)
      osc1.stop(now + 0.26)
      osc2.stop(now + 0.26)
      osc3.stop(now + 0.26)
    } else {
      // Crisp satisfying body hitmarker
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(980, now)
      osc.frequency.exponentialRampToValueAtTime(490, now + 0.08)

      gain.gain.setValueAtTime(0.28, now)
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

  playReloadPart(weaponId, part) {
    this._resume()
    if (!this.ctx) return
    const now = this.ctx.currentTime

    switch (`${weaponId}:${part}`) {
      // ── VANDAL ──
      case 'vandal:eject': {
        this._playNoise(now, 0.05, 0.28, 2800)
        this._playClick(now, 2200, 0.03, 0.25)
        break
      }
      case 'vandal:slap': {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(320, now)
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.09)
        gain.gain.setValueAtTime(0.42, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now)
        osc.stop(now + 0.09)
        this._playNoise(now, 0.07, 0.38, 3200)
        this._playClick(now + 0.04, 1800, 0.03, 0.22)
        break
      }
      case 'vandal:bolt': {
        this._playNoise(now, 0.04, 0.30, 4200)
        setTimeout(() => {
          if (this.ctx) {
            const t = this.ctx.currentTime
            this._playNoise(t, 0.06, 0.38, 4800)
            this._playClick(t, 1600, 0.03, 0.30)
          }
        }, 120)
        break
      }

      // ── SPECTRE ──
      case 'spectre:eject': {
        this._playClick(now, 2600, 0.03, 0.25)
        this._playNoise(now, 0.04, 0.22, 3400)
        break
      }
      case 'spectre:insert': {
        this._playNoise(now, 0.05, 0.26, 2600)
        this._playClick(now + 0.03, 2800, 0.02, 0.28)
        break
      }
      case 'spectre:hkslap': {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(450, now)
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.08)
        gain.gain.setValueAtTime(0.45, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now)
        osc.stop(now + 0.08)
        this._playNoise(now, 0.08, 0.42, 4500)
        break
      }

      // ── OPERATOR ──
      case 'operator:bolt_up': {
        this._playClick(now, 900, 0.06, 0.32)
        this._playNoise(now, 0.05, 0.30, 2400)
        break
      }
      case 'operator:bolt_back': {
        this._playNoise(now, 0.06, 0.35, 3800)
        this._playClick(now + 0.05, 1400, 0.04, 0.25)
        break
      }
      case 'operator:mag_out': {
        this._playNoise(now, 0.07, 0.32, 2200)
        this._playClick(now, 800, 0.05, 0.30)
        break
      }
      case 'operator:mag_in': {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(220, now)
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.12)
        gain.gain.setValueAtTime(0.48, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now)
        osc.stop(now + 0.12)
        this._playNoise(now, 0.08, 0.40, 2800)
        break
      }
      case 'operator:bolt_forward': {
        this._playNoise(now, 0.07, 0.32, 3400)
        break
      }
      case 'operator:bolt_lock': {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(280, now)
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.08)
        gain.gain.setValueAtTime(0.40, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now)
        osc.stop(now + 0.08)
        this._playClick(now, 1600, 0.04, 0.35)
        break
      }

      // ── ODIN ──
      case 'odin:cover_open': {
        this._playClick(now, 1100, 0.05, 0.35)
        this._playNoise(now, 0.08, 0.32, 2400)
        break
      }
      case 'odin:drum_out': {
        this._playNoise(now, 0.10, 0.35, 1800)
        this._playClick(now, 700, 0.06, 0.30)
        break
      }
      case 'odin:drum_in': {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(180, now)
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.14)
        gain.gain.setValueAtTime(0.50, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now)
        osc.stop(now + 0.14)
        this._playNoise(now, 0.08, 0.42, 2600)
        break
      }
      case 'odin:cover_slam': {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(240, now)
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.16)
        gain.gain.setValueAtTime(0.60, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now)
        osc.stop(now + 0.16)
        this._playNoise(now, 0.12, 0.55, 3600)
        this._playClick(now, 2400, 0.03, 0.40)
        break
      }
      case 'odin:rack': {
        this._playNoise(now, 0.08, 0.38, 4200)
        setTimeout(() => {
          if (this.ctx) {
            const t = this.ctx.currentTime
            this._playNoise(t, 0.09, 0.45, 4500)
            this._playClick(t, 1800, 0.04, 0.35)
          }
        }, 140)
        break
      }

      // ── BUCKY ──
      case 'bucky:shell_insert': {
        this._playNoise(now, 0.04, 0.25, 2400)
        this._playClick(now + 0.02, 1900, 0.03, 0.32)
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(420, now + 0.02)
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.07)
        gain.gain.setValueAtTime(0.25, now + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now + 0.02)
        osc.stop(now + 0.07)
        break
      }
      case 'bucky:pump': {
        this.playPumpCycle()
        break
      }

      // ── CLASSIC ──
      case 'classic:eject': {
        this._playClick(now, 2800, 0.025, 0.24)
        this._playNoise(now, 0.035, 0.20, 3600)
        break
      }
      case 'classic:insert': {
        this._playNoise(now, 0.04, 0.22, 2800)
        break
      }
      case 'classic:slap': {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(340, now)
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.07)
        gain.gain.setValueAtTime(0.38, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now)
        osc.stop(now + 0.07)
        this._playNoise(now, 0.05, 0.32, 3400)
        break
      }
      case 'classic:slide_release': {
        this._playClick(now, 3200, 0.02, 0.35)
        this._playNoise(now, 0.05, 0.36, 4600)
        break
      }

      default: {
        this.playMagSlap()
        break
      }
    }
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

  playKill(streak = 1, isHeadshot = false) {
    this._resume()
    if (!this.ctx) return
    const now = this.ctx.currentTime

    // 1. Heavy bass impact thump (tactical kill punch)
    const subOsc = this.ctx.createOscillator()
    const subGain = this.ctx.createGain()
    subOsc.type = 'triangle'
    subOsc.frequency.setValueAtTime(140, now)
    subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.16)
    subGain.gain.setValueAtTime(0.45, now)
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16)
    subOsc.connect(subGain)
    subGain.connect(this.ctx.destination)
    subOsc.start(now)
    subOsc.stop(now + 0.16)

    // 2. Escalating multi-kill chord progression (Valorant tier chimes)
    let chordFreqs = [523.25, 659.25, 783.99] // 1: C5, E5, G5
    if (streak === 2) {
      chordFreqs = [587.33, 739.99, 880.00]   // 2: D5, F#5, A5 (Double Kill)
    } else if (streak === 3) {
      chordFreqs = [659.25, 830.61, 987.77]   // 3: E5, G#5, B5 (Triple Kill)
    } else if (streak === 4) {
      chordFreqs = [783.99, 987.77, 1174.66]  // 4: G5, B5, D6 (Quadra Kill)
    } else if (streak >= 5) {
      chordFreqs = [523.25, 659.25, 783.99, 1046.50, 1318.51] // 5: ACE Grand Major Chord!
    }

    chordFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = streak >= 5 ? 'sawtooth' : 'triangle'
      osc.frequency.setValueAtTime(freq, now + idx * 0.025)
      gain.gain.setValueAtTime(streak >= 5 ? 0.28 : 0.22, now + idx * 0.025)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.48)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(now + idx * 0.025)
      osc.stop(now + 0.52)
    })

    // 3. Extra crunchy high-frequency skull snap if killed by headshot
    if (isHeadshot) {
      this._playClick(now, 3800, 0.03, 0.35)
      this._playNoise(now, 0.04, 0.32, 5400)
    }
  }

  playFootstep(isLoud = false, isRightFoot = false) {
    this._resume()
    if (!this.ctx) return
    const now = this.ctx.currentTime

    // Alternating pitch & subtle stereo panning for left/right combat boots (Valorant binaural realism)
    const pitchMod = isRightFoot ? 1.05 : 0.95
    const panVal = isRightFoot ? 0.12 : -0.12

    let outputNode = this.ctx.destination
    if (typeof this.ctx.createStereoPanner === 'function') {
      try {
        const panner = this.ctx.createStereoPanner()
        panner.pan.setValueAtTime(panVal, now)
        panner.connect(this.ctx.destination)
        outputNode = panner
      } catch (e) {
        outputNode = this.ctx.destination
      }
    }

    if (isLoud) {
      // ── RUNNING STEP: Tactile Valorant Combat Boot on Stone/Tiles ──
      // 1. Damped sub-bass heel strike (gives bodily mass & floor impact)
      const subOsc = this.ctx.createOscillator()
      const subGain = this.ctx.createGain()
      subOsc.type = 'triangle'
      subOsc.frequency.setValueAtTime(95 * pitchMod, now)
      subOsc.frequency.exponentialRampToValueAtTime(36, now + 0.075)
      subGain.gain.setValueAtTime(0.38, now)
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.075)
      subOsc.connect(subGain)
      subGain.connect(outputNode)
      subOsc.start(now)
      subOsc.stop(now + 0.08)

      // 2. Mid sole click (hard vulcanized rubber slap on pavement)
      const midOsc = this.ctx.createOscillator()
      const midGain = this.ctx.createGain()
      midOsc.type = 'sine'
      midOsc.frequency.setValueAtTime(280 * pitchMod, now)
      midOsc.frequency.exponentialRampToValueAtTime(70, now + 0.045)
      midGain.gain.setValueAtTime(0.26, now)
      midGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045)
      midOsc.connect(midGain)
      midGain.connect(outputNode)
      midOsc.start(now)
      midOsc.stop(now + 0.05)

      // 3. Crisp cobblestone grit / pavement friction transient
      this._playNoise(now, 0.038, 0.22, 3600 * pitchMod, outputNode)

      // 4. Subtle military nylon vest / tactical belt jingle flutter
      this._playNoise(now, 0.045, 0.06, 5800, outputNode)
    } else {
      // ── STEALTH WALK STEP: Soft, muffled toe roll (Silent Shift-walk in Valorant) ──
      const walkOsc = this.ctx.createOscillator()
      const walkGain = this.ctx.createGain()
      walkOsc.type = 'sine'
      walkOsc.frequency.setValueAtTime(75 * pitchMod, now)
      walkOsc.frequency.exponentialRampToValueAtTime(32, now + 0.055)
      walkGain.gain.setValueAtTime(0.12, now)
      walkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.055)
      walkOsc.connect(walkGain)
      walkGain.connect(outputNode)
      walkOsc.start(now)
      walkOsc.stop(now + 0.06)

      // Very soft, muffled shoe tread touch
      this._playNoise(now, 0.024, 0.05, 1600 * pitchMod, outputNode)
    }
  }
}

export const sounds = new SoundSystem()
