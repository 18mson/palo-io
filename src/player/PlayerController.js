import * as THREE from 'three'
import { getWeapon } from '../weapons/WeaponRegistry.js'
import { bus } from '../core/EventBus.js'
import { sounds } from '../audio/SoundSystem.js'
import { createMuzzleFlashTexture } from '../map/MapTextures.js'

const GRAVITY            = -24
const JUMP_FORCE         = 7.4
const VALORANT_RUN_SPEED   = 7.85  // Fast responsive tactical running speed
const VALORANT_WALK_MULT   = 0.58  // Shift walking speed (~4.5 m/s)
const VALORANT_CROUCH_MULT  = 0.44  // Crouch walking speed (~3.4 m/s)
const ACCEL_GROUND       = 32    // Ultra snappy counter-strafe stop
const ACCEL_AIR          = 4     // Responsive air adjustments
const LANDING_SLOW_DUR   = 0.12  // Crisp landing recovery

/**
 * PlayerController — Valorant tactical movement, deadzone counter-strafing, shooting, and tracers
 */
export class PlayerController {
  constructor(camera, mapCollision, scene, tracerManager) {
    this.camera        = camera
    this.collision     = mapCollision
    this.scene         = scene
    this.tracerManager = tracerManager

    this.position      = new THREE.Vector3(0, 0.9, -28)
    this.velocity      = new THREE.Vector3()
    this.onGround      = true

    this.health        = 100
    this.maxHealth     = 100
    this.shield        = 50
    this.alive         = true
    this.isInvulnerable = false
    this.invulnTimer   = 0

    // Valorant Tactical Movement State
    this.keys          = { w: false, s: false, a: false, d: false, space: false, ctrl: false, shift: false }
    this.isCrouched    = false
    this.crouchProgress = 0 // 0 = standing, 1 = crouched
    this.isWalking     = false // Shift walking (silent footsteps)
    this.taggingTimer  = 0     // Bullet tagging slowdown
    this.landingTimer  = 0     // Jump landing slowdown
    this.speedMult     = 1.0

    // Weapon state
    this.weaponSlots   = [null, null]
    this.activeSlot    = 0
    this.weaponData    = null
    this.ammoMag       = 0
    this.isReloading   = false
    this.reloadTimer   = null
    this.lastFireTime  = 0
    this.isFiring      = false
    this.isScoped      = false

    // Recoil & Procedural Weapon Animation
    this.recoilPitch   = 0
    this.recoilShots   = 0
    this.gunRecoilOffset = new THREE.Vector3()
    this.gunRecoilRot    = new THREE.Euler(0, 0, 0, 'YXZ')

    // Reload animation
    this.reloadStartTime = 0
    this.reloadDuration  = 2500

    // Weapon Action Cycle (Sniper bolt-action & shotgun pump)
    this.actionCycleType  = null
    this.actionCycleTimer = 0
    this.actionCycleTotal = 0
    this.wasScopedBeforeCycle = false

    // Viewmodel bobbing
    this.walkBobPhase     = 0

    // Raycaster
    this.raycaster     = new THREE.Raycaster()

    // Footstep timer
    this.footstepTimer = 0

    // Weapon model & muzzle flash
    this.gunMesh       = null
    this.muzzleFlash   = null
    this._createGunModel()
    this._createMuzzleFlash()

    this._bindKeys()
    this._triggerSpawnProtection(3000)
  }

  setTracerManager(tm) {
    this.tracerManager = tm
  }

  setAgent(agent) {
    this.speedMult  = agent.speed
    this.maxHealth  = agent.health
    this.health     = agent.health
    this.shield     = 50
    this._triggerSpawnProtection(3000)
  }

  _triggerSpawnProtection(durationMs = 3000) {
    this.isInvulnerable = true
    this.invulnTimer = durationMs
    bus.emit('player:spawn_shield', { active: true, durationMs })
    setTimeout(() => {
      this.isInvulnerable = false
      bus.emit('player:spawn_shield', { active: false })
    }, durationMs)
  }

  equipWeapon(weaponId, slot = 0) {
    const def = getWeapon(weaponId)
    this.weaponSlots[slot] = { def, mag: def.magazineSize }
    if (this.activeSlot === slot) this._activateSlot(slot)
  }

  _activateSlot(slot) {
    this.activeSlot  = slot
    const w = this.weaponSlots[slot]
    if (!w) return
    this.weaponData  = w.def
    this.ammoMag     = w.mag
    this.isReloading = false
    clearTimeout(this.reloadTimer)

    this._updateGunAppearance(w.def)
    bus.emit('weapon:switch', { slot, weapon: w.def, mag: w.mag })
  }

  switchSlot(slot) {
    if (slot === this.activeSlot) return
    if (!this.weaponSlots[slot]) return
    if (this.isReloading) { clearTimeout(this.reloadTimer); this.isReloading = false }
    this._activateSlot(slot)
  }

  // ── First-Person Weapon Model ────────────────────────
  // ── First-Person Weapon Model & Dynamic Modular Mesh ────────────────────────
  _createGunModel() {
    this.gunMesh = new THREE.Group()
    this.gunBasePos = new THREE.Vector3(0.24, -0.22, -0.46)
    this.gunMesh.position.copy(this.gunBasePos)
    this.camera.add(this.gunMesh)

    // Dedicated dynamic reload parts
    this.magMesh = null
    this.boltMesh = null

    // Build initial weapon model
    if (this.weaponData) {
      this._buildDistinctWeaponMesh(this.weaponData.id)
    }
  }

  _buildDistinctWeaponMesh(weaponId) {
    if (!this.gunMesh) return
    this.gunMesh.clear()
    this.magMesh = null
    this.boltMesh = null

    // ── Universal Base Materials ──
    const metalDark = new THREE.MeshStandardMaterial({ color: 0x18202c, roughness: 0.35, metalness: 0.85 })
    const metalMid  = new THREE.MeshStandardMaterial({ color: 0x2e3b4e, roughness: 0.40, metalness: 0.70 })
    const gripMat   = new THREE.MeshStandardMaterial({ color: 0x141b24, roughness: 0.80, metalness: 0.15 })
    const goldMat   = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.25, metalness: 0.90 })
    const glassMat  = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.85 })
    const accentHex = this.weaponData?.color ?? 0xff4655
    const accentMat = new THREE.MeshStandardMaterial({
      color: accentHex,
      emissive: accentHex,
      emissiveIntensity: 0.75,
      roughness: 0.25
    })
    this.gunAccentMat = accentMat

    switch (weaponId) {
      case 'vandal': {
        // ── VANDAL: Prime / Dragon King Skin (Obsidian Carbon, 24K Gold, Pearlescent White & Fiery Crimson) ──
        const vandalCarbon = new THREE.MeshStandardMaterial({ color: 0x1a2230, roughness: 0.35, metalness: 0.80 })
        const vandalWhite  = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.30, metalness: 0.30 })
        const vandalGold   = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.22, metalness: 0.95 })
        const vandalFlame  = new THREE.MeshStandardMaterial({ color: 0xff4655, emissive: 0xff4655, emissiveIntensity: 0.90, roughness: 0.20 })

        // Primary receiver (Carbon black with white top crest)
        const receiverGeo = new THREE.BoxGeometry(0.075, 0.12, 0.46)
        const receiver = new THREE.Mesh(receiverGeo, vandalCarbon)
        this.gunMesh.add(receiver)

        // Pearlescent white top hood cover
        const coverGeo = new THREE.BoxGeometry(0.066, 0.045, 0.36)
        const cover = new THREE.Mesh(coverGeo, vandalWhite)
        cover.position.set(0, 0.07, -0.02)
        this.gunMesh.add(cover)

        // Fluted barrel & 24K Gold muzzle brake
        const barrelGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.34, 8)
        barrelGeo.rotateX(Math.PI / 2)
        const barrel = new THREE.Mesh(barrelGeo, vandalCarbon)
        barrel.position.set(0, 0.03, -0.38)
        this.gunMesh.add(barrel)

        const brakeGeo = new THREE.BoxGeometry(0.040, 0.048, 0.09)
        const brake = new THREE.Mesh(brakeGeo, vandalGold)
        brake.position.set(0, 0.03, -0.56)
        this.gunMesh.add(brake)

        // Gold inlay stock with carbon cheekrest
        const stockGeo = new THREE.BoxGeometry(0.062, 0.10, 0.26)
        const stock = new THREE.Mesh(stockGeo, vandalCarbon)
        stock.position.set(0, -0.02, 0.32)
        const stockTrim = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.02, 0.22), vandalGold)
        stockTrim.position.set(0, 0.035, 0.32)
        this.gunMesh.add(stock)
        this.gunMesh.add(stockTrim)

        // Ergonomic pistol grip
        const gripGeo = new THREE.BoxGeometry(0.05, 0.16, 0.07)
        gripGeo.rotateX(0.28)
        const grip = new THREE.Mesh(gripGeo, gripMat)
        grip.position.set(0, -0.12, 0.12)
        this.gunMesh.add(grip)

        // Curved 7.62 banana magazine with gold baseplate
        const magGroup = new THREE.Group()
        const magGeo = new THREE.BoxGeometry(0.05, 0.24, 0.10)
        magGeo.rotateX(-0.25)
        const magMesh = new THREE.Mesh(magGeo, vandalCarbon)
        magMesh.position.set(0, -0.10, 0)
        const magPlate = new THREE.Mesh(new THREE.BoxGeometry(0.054, 0.03, 0.11), vandalGold)
        magPlate.geometry.rotateX(-0.25)
        magPlate.position.set(0, -0.21, 0.02)
        magGroup.add(magMesh)
        magGroup.add(magPlate)
        magGroup.position.set(0, -0.05, -0.06)
        this.gunMesh.add(magGroup)
        this.magMesh = magGroup

        // Glowing dragon energy crimson side laser stripe
        const stripeGeo = new THREE.BoxGeometry(0.080, 0.022, 0.34)
        const stripe = new THREE.Mesh(stripeGeo, vandalFlame)
        stripe.position.set(0, 0.03, -0.04)
        this.gunMesh.add(stripe)
        break
      }

      case 'spectre': {
        // ── SPECTRE: Magepunk / Ion Skin (Alpine Ice White, Electric Cyan Radiant Glow & Titanium) ──
        const spectreWhite = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.25, metalness: 0.35 })
        const spectreTitan = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.35, metalness: 0.85 })
        const spectreCyan  = new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 1.1, roughness: 0.2 })
        const spectreNavy  = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6, metalness: 0.2 })

        // Sleek white submachine body
        const bodyGeo = new THREE.BoxGeometry(0.068, 0.10, 0.32)
        const body = new THREE.Mesh(bodyGeo, spectreWhite)
        this.gunMesh.add(body)

        // Large cylindrical titanium suppressor
        const silencerGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.32, 12)
        silencerGeo.rotateX(Math.PI / 2)
        const silencer = new THREE.Mesh(silencerGeo, spectreTitan)
        silencer.position.set(0, 0.02, -0.30)
        this.gunMesh.add(silencer)

        // Dual glowing electric cyan energy plasma rings
        const ringGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.035, 12)
        ringGeo.rotateX(Math.PI / 2)
        const ring1 = new THREE.Mesh(ringGeo, spectreCyan)
        ring1.position.set(0, 0.02, -0.22)
        const ring2 = ring1.clone()
        ring2.position.z = -0.36
        this.gunMesh.add(ring1)
        this.gunMesh.add(ring2)

        // Compact white & cyan magazine
        const magGroup = new THREE.Group()
        const magGeo = new THREE.BoxGeometry(0.045, 0.22, 0.06)
        const mag = new THREE.Mesh(magGeo, spectreWhite)
        mag.position.set(0, -0.09, 0)
        const magStripe = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.03, 0.065), spectreCyan)
        magStripe.position.set(0, -0.16, 0)
        magGroup.add(mag)
        magGroup.add(magStripe)
        magGroup.position.set(0, -0.04, 0.02)
        this.gunMesh.add(magGroup)
        this.magMesh = magGroup

        // Navy tactical skeleton stock & foregrip
        const stockGeo = new THREE.BoxGeometry(0.04, 0.06, 0.18)
        const stock = new THREE.Mesh(stockGeo, spectreNavy)
        stock.position.set(0, -0.01, 0.24)
        this.gunMesh.add(stock)

        const foregripGeo = new THREE.BoxGeometry(0.04, 0.10, 0.05)
        foregripGeo.rotateX(0.2)
        const foregrip = new THREE.Mesh(foregripGeo, spectreNavy)
        foregrip.position.set(0, -0.08, -0.12)
        this.gunMesh.add(foregrip)
        break
      }

      case 'operator': {
        // ── OPERATOR: Singularity / Cosmic Skin (Royal Violet Nebula, Silver Titanium & Gold Accents) ──
        const cosmicViolet = new THREE.MeshStandardMaterial({ color: 0x6b21a8, roughness: 0.35, metalness: 0.65 })
        const cosmicDark   = new THREE.MeshStandardMaterial({ color: 0x24113e, roughness: 0.40, metalness: 0.75 })
        const chromeSteel  = new THREE.MeshStandardMaterial({ color: 0xcfd8dc, roughness: 0.25, metalness: 0.90 })
        const cosmicGold   = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.20, metalness: 0.95 })
        const laserCyan    = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 1.0, roughness: 0.2 })

        // Massive royal violet heavy sniper chassis
        const chassisGeo = new THREE.BoxGeometry(0.085, 0.14, 0.65)
        const chassis = new THREE.Mesh(chassisGeo, cosmicViolet)
        this.gunMesh.add(chassis)

        // Polished chrome fluted barrel
        const barrelGeo = new THREE.CylinderGeometry(0.025, 0.022, 0.62, 10)
        barrelGeo.rotateX(Math.PI / 2)
        const barrel = new THREE.Mesh(barrelGeo, chromeSteel)
        barrel.position.set(0, 0.04, -0.62)
        this.gunMesh.add(barrel)

        // Arrow-head muzzle brake with gold trim
        const brakeGeo = new THREE.BoxGeometry(0.062, 0.065, 0.12)
        const brake = new THREE.Mesh(brakeGeo, cosmicDark)
        const brakeTrim = new THREE.Mesh(new THREE.BoxGeometry(0.066, 0.02, 0.08), cosmicGold)
        brakeTrim.position.set(0, 0.04, -0.96)
        brake.position.set(0, 0.04, -0.96)
        this.gunMesh.add(brake)
        this.gunMesh.add(brakeTrim)

        // Tactical high-magnification scope with gold ring and glowing cyan lens
        const scopeTubeGeo = new THREE.CylinderGeometry(0.038, 0.042, 0.36, 12)
        scopeTubeGeo.rotateX(Math.PI / 2)
        const scopeTube = new THREE.Mesh(scopeTubeGeo, cosmicDark)
        scopeTube.position.set(0, 0.14, -0.06)
        const scopeGoldRing = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.044, 0.03, 12), cosmicGold)
        scopeGoldRing.geometry.rotateX(Math.PI / 2)
        scopeGoldRing.position.set(0, 0.14, -0.06)
        this.gunMesh.add(scopeTube)
        this.gunMesh.add(scopeGoldRing)

        const lensGeo = new THREE.CircleGeometry(0.036, 12)
        const lens = new THREE.Mesh(lensGeo, laserCyan)
        lens.position.set(0, 0.14, 0.12)
        this.gunMesh.add(lens)

        // Polished 24K Gold Bolt Action Handle (cycles dynamically)
        const boltGroup = new THREE.Group()
        const boltHandleGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.08)
        boltHandleGeo.rotateZ(Math.PI / 3)
        const boltHandle = new THREE.Mesh(boltHandleGeo, cosmicGold)
        const boltKnobGeo = new THREE.SphereGeometry(0.02, 8, 8)
        const boltKnob = new THREE.Mesh(boltKnobGeo, cosmicGold)
        boltKnob.position.set(0.06, 0.03, 0)
        boltGroup.add(boltHandle)
        boltGroup.add(boltKnob)
        boltGroup.position.set(0.045, 0.08, 0.08)
        this.gunMesh.add(boltGroup)
        this.boltMesh = boltGroup

        // Heavy box magazine with cosmic violet shell
        const magGroup = new THREE.Group()
        const magGeo = new THREE.BoxGeometry(0.065, 0.20, 0.14)
        const mag = new THREE.Mesh(magGeo, cosmicDark)
        mag.position.set(0, -0.08, 0)
        magGroup.add(mag)
        magGroup.position.set(0, -0.06, 0.05)
        this.gunMesh.add(magGroup)
        this.magMesh = magGroup
        break
      }

      case 'odin': {
        // ── ODIN: BlastX / Heavy Industry Skin (Vibrant Hazard Orange, Gunmetal, 24K Brass Drum & Chevrons) ──
        const odinOrange = new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.35, metalness: 0.50 })
        const odinGun    = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.40, metalness: 0.85 })
        const odinGold   = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.25, metalness: 0.95 })
        const odinYellow = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.30, metalness: 0.40 })

        // Industrial orange heavy receiver
        const receiverGeo = new THREE.BoxGeometry(0.12, 0.16, 0.52)
        const receiver = new THREE.Mesh(receiverGeo, odinOrange)
        this.gunMesh.add(receiver)

        // Quad vented gunmetal barrels
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2
          const bGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.42, 6)
          bGeo.rotateX(Math.PI / 2)
          const b = new THREE.Mesh(bGeo, odinGun)
          b.position.set(Math.cos(angle) * 0.03, Math.sin(angle) * 0.03 + 0.03, -0.46)
          this.gunMesh.add(b)
        }

        // Heavy carry-handle with yellow hazard band
        const handleGeo = new THREE.BoxGeometry(0.04, 0.08, 0.26)
        const handle = new THREE.Mesh(handleGeo, odinGun)
        handle.position.set(0, 0.16, -0.05)
        const handleStripe = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.025, 0.12), odinYellow)
        handleStripe.position.set(0, 0.19, -0.05)
        this.gunMesh.add(handle)
        this.gunMesh.add(handleStripe)

        // Massive 100-round side-mounted polished brass ammo drum
        const drumGroup = new THREE.Group()
        const drumGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.14, 16)
        drumGeo.rotateZ(Math.PI / 2)
        const drum = new THREE.Mesh(drumGeo, odinGold)
        drumGroup.add(drum)
        drumGroup.position.set(-0.12, -0.10, 0.02)
        this.gunMesh.add(drumGroup)
        this.magMesh = drumGroup

        // Brass cartridge feeder link
        const beltGeo = new THREE.BoxGeometry(0.08, 0.04, 0.06)
        const belt = new THREE.Mesh(beltGeo, odinGold)
        belt.position.set(-0.06, -0.02, 0.02)
        this.gunMesh.add(belt)
        break
      }

      case 'bucky': {
        // ── BUCKY: Oni Blood Skin (Lacquered Cherry Red, Carved Ivory & Ornamental Gold) ──
        const buckyRed   = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.25, metalness: 0.45 })
        const buckyIvory = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.40, metalness: 0.15 })
        const buckyGold  = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.25, metalness: 0.90 })
        const buckySteel = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35, metalness: 0.85 })

        // Lacquered cherry red receiver
        const receiverGeo = new THREE.BoxGeometry(0.08, 0.12, 0.42)
        const receiver = new THREE.Mesh(receiverGeo, buckyRed)
        this.gunMesh.add(receiver)

        // Wide 12-gauge magnum dual blued steel barrels
        const barrelTopGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.38, 10)
        barrelTopGeo.rotateX(Math.PI / 2)
        const barrelTop = new THREE.Mesh(barrelTopGeo, buckySteel)
        barrelTop.position.set(0, 0.04, -0.38)
        this.gunMesh.add(barrelTop)

        const magTubeGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.36, 10)
        magTubeGeo.rotateX(Math.PI / 2)
        const magTube = new THREE.Mesh(magTubeGeo, buckySteel)
        magTube.position.set(0, -0.02, -0.36)
        this.gunMesh.add(magTube)

        // Sliding carved ivory pump grip with gold filigree rings
        const pumpGroup = new THREE.Group()
        const pumpGeo = new THREE.BoxGeometry(0.075, 0.08, 0.18)
        const pump = new THREE.Mesh(pumpGeo, buckyIvory)
        const pumpRing = new THREE.Mesh(new THREE.BoxGeometry(0.078, 0.084, 0.03), buckyGold)
        pumpGroup.add(pump)
        pumpGroup.add(pumpRing)
        pumpGroup.position.set(0, -0.02, -0.32)
        this.gunMesh.add(pumpGroup)
        this.boltMesh = pumpGroup

        // Carved ivory buttstock with cherry trim
        const stockGeo = new THREE.BoxGeometry(0.07, 0.12, 0.28)
        const stock = new THREE.Mesh(stockGeo, buckyIvory)
        stock.position.set(0, -0.03, 0.32)
        const stockBand = new THREE.Mesh(new THREE.BoxGeometry(0.074, 0.04, 0.03), buckyGold)
        stockBand.position.set(0, -0.03, 0.22)
        this.gunMesh.add(stock)
        this.gunMesh.add(stockBand)
        break
      }

      case 'classic':
      default: {
        // ── CLASSIC: Glitchpop Skin (Electric Neon Cyan Slide, Carbon Frame & Hot Magenta Dots) ──
        const classicCyan = new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.25, metalness: 0.65 })
        const classicDark = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.50, metalness: 0.30 })
        const classicPink = new THREE.MeshStandardMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.90, roughness: 0.2 })

        // Carbon fiber polymer lower frame
        const frameGeo = new THREE.BoxGeometry(0.055, 0.12, 0.26)
        const frame = new THREE.Mesh(frameGeo, classicDark)
        frame.position.set(0, -0.02, 0)
        this.gunMesh.add(frame)

        // Electric neon cyan slide (moves back on recoil)
        const slideGroup = new THREE.Group()
        const slideGeo = new THREE.BoxGeometry(0.058, 0.065, 0.28)
        const slide = new THREE.Mesh(slideGeo, classicCyan)
        const slideStripe = new THREE.Mesh(new THREE.BoxGeometry(0.060, 0.015, 0.18), classicPink)
        slideStripe.position.set(0, 0.02, 0)
        slideGroup.add(slide)
        slideGroup.add(slideStripe)
        slideGroup.position.set(0, 0.06, -0.01)
        this.gunMesh.add(slideGroup)
        this.boltMesh = slideGroup

        // Pistol grip
        const gripGeo = new THREE.BoxGeometry(0.048, 0.18, 0.08)
        gripGeo.rotateX(0.24)
        const grip = new THREE.Mesh(gripGeo, classicDark)
        grip.position.set(0, -0.12, 0.08)
        this.gunMesh.add(grip)

        // Drop-free 9mm magazine with cyan base
        const magGroup = new THREE.Group()
        const magGeo = new THREE.BoxGeometry(0.038, 0.18, 0.06)
        magGeo.rotateX(0.24)
        const mag = new THREE.Mesh(magGeo, classicDark)
        const magBase = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.02, 0.07), classicCyan)
        magBase.position.set(0, -0.10, 0)
        magGroup.add(mag)
        magGroup.add(magBase)
        magGroup.position.set(0, -0.12, 0.08)
        this.gunMesh.add(magGroup)
        this.magMesh = magGroup

        // Hot pink radiant power dot indicator
        const dotGeo = new THREE.BoxGeometry(0.06, 0.018, 0.08)
        const dot = new THREE.Mesh(dotGeo, classicPink)
        dot.position.set(0, 0.07, -0.04)
        this.gunMesh.add(dot)
        break
      }
    }
        break
      }
    }
  }

  _updateGunAppearance(def) {
    if (!this.gunMesh) return
    this._buildDistinctWeaponMesh(def.id)
  }

  _createMuzzleFlash() {
    const geo = new THREE.PlaneGeometry(0.36, 0.36)
    const tex = createMuzzleFlashTexture()
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: 0,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    })
    this.muzzleFlash = new THREE.Mesh(geo, mat)
    this.muzzleFlash.position.set(0.24, -0.16, -0.75)
    this.camera.add(this.muzzleFlash)
  }

  _showMuzzleFlash() {
    if (this.muzzleFlash && !this.isScoped) {
      // Dynamic star burst orientation & scale
      this.muzzleFlash.rotation.z = Math.random() * Math.PI * 2
      const s = 0.85 + Math.random() * 0.35
      this.muzzleFlash.scale.set(s, s, s)
      this.muzzleFlash.material.opacity = 1

      setTimeout(() => {
        if (this.muzzleFlash) this.muzzleFlash.material.opacity = 0
      }, 35)
    }
  }

  // ── Firing ──────────────────────────────────────────
  startFire() { this.isFiring = true }
  stopFire()  { this.isFiring = false; this.recoilShots = 0 }

  _tryFire(bots, now) {
    if (!this.weaponData || !this.alive || this.isReloading) return
    if (this.actionCycleTimer > 0) return // Cycling bolt or pump

    const interval = 1000 / this.weaponData.fireRate
    if (now - this.lastFireTime < interval) return
    if (this.ammoMag <= 0) { this.reload(); return }

    this.lastFireTime = now
    this.ammoMag--
    this.weaponSlots[this.activeSlot].mag = this.ammoMag
    bus.emit('weapon:fire', { mag: this.ammoMag, weapon: this.weaponData })

    // Play synthesized gunfire sound
    sounds.playShoot(this.weaponData.id)

    this._doShoot(bots)
    this._applyRecoil()
    this._showMuzzleFlash()

    if (!this.weaponData.isAuto) { this.isFiring = false }
  }

  _doShoot(bots) {
    const def = this.weaponData
    const pellets = def.pellets ?? 1
    const isSniper = def.id === 'operator'
    // Valorant movement error: high spread while running/jumping, accurate while standing/walking/crouching
    const hSpeed = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2)
    let movePenalty = 1.0
    if (!this.onGround) {
      movePenalty = isSniper ? 8.0 : 4.0
    } else if (hSpeed > 2.0 && !this.isWalking && !this.isCrouched) {
      movePenalty = isSniper ? 6.0 : 2.8
    } else if (this.isCrouched) {
      movePenalty = 0.75
    }

    for (let p = 0; p < pellets; p++) {
      const baseSpread = this.isScoped ? (def.spreadScoped ?? 0.0001) : def.spread
      const spread = baseSpread * movePenalty
      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * spread * 2,
        (Math.random() - 0.5) * spread * 2,
        -1
      ).normalize()
      dir.applyQuaternion(this.camera.quaternion)

      this.raycaster.set(this.camera.position, dir)

      // Test bot hitboxes
      const botMeshes = bots.flatMap(b => b.hitboxes ?? [b.mesh]).filter(Boolean)
      const hits = this.raycaster.intersectObjects(botMeshes, false)

      let hitPoint = null
      let hitNormal = new THREE.Vector3(0, 1, 0)
      let isBotHit = false

      if (hits.length > 0) {
        const hit = hits[0]
        hitPoint = hit.point.clone()
        const isHead = hit.object.userData.isHead
        const bot = bots.find(b =>
          b.mesh === hit.object ||
          (b.hitboxes && b.hitboxes.includes(hit.object))
        )
        if (bot && !bot.isDead) {
          isBotHit = true
          const dmg = isHead ? def.damageHead : def.damageBody
          // Play hitmarker sound
          sounds.playHit(isHead)
          bus.emit('player:shot_bot', { bot, damage: dmg, isHead, point: hitPoint })
        }
      }

      // If didn't hit bot, check wall collision for spark FX
      if (!isBotHit) {
        const wallHit = this.collision.raycast(this.camera.position, dir, def.range)
        if (wallHit) {
          hitPoint = wallHit.point
          if (this.tracerManager) {
            this.tracerManager.addSparks(hitPoint, hitNormal)
          }
        } else {
          // Tracer travels into the distance
          hitPoint = this.camera.position.clone().addScaledVector(dir, 80)
        }
      }

      // Tracer origin: when scoped or sniper, start straight in front of camera
      // to eliminate parallax ghosting and double-line appearance
      let muzzlePos
      if (this.isScoped || isSniper) {
        muzzlePos = this.camera.position.clone().addScaledVector(dir, 0.45)
      } else {
        muzzlePos = new THREE.Vector3(0.24, -0.16, -0.55)
        muzzlePos.applyQuaternion(this.camera.quaternion).add(this.camera.position)
      }

      // Add visual bullet tracer streak
      if (this.tracerManager && hitPoint) {
        this.tracerManager.addTracer(muzzlePos, hitPoint, false, isSniper)
      }
    }

    this.recoilShots++
  }

  _applyRecoil() {
    if (!this.weaponData) return
    const pattern = this.weaponData.recoilPattern
    const idx = Math.min(this.recoilShots, pattern.length - 1)
    this.recoilPitch += (pattern[idx] ?? 0.015)

    const id = this.weaponData.id
    switch (id) {
      case 'operator':
        this.gunRecoilOffset.z = 0.20
        this.gunRecoilOffset.y = 0.05
        this.gunRecoilRot.x = 0.32
        this.gunRecoilRot.y = 0.04
        // Bolt-action cycle after sniper shot
        this.actionCycleType = 'bolt'
        this.actionCycleTotal = 0.85
        this.actionCycleTimer = 0.85
        sounds.playBoltCycle()
        if (this.isScoped) {
          this.wasScopedBeforeCycle = true
          this.setScoped(false)
        }
        break
      case 'bucky':
        this.gunRecoilOffset.z = 0.15
        this.gunRecoilOffset.y = 0.04
        this.gunRecoilRot.x = 0.24
        // Pump-action cycle after shotgun shot
        this.actionCycleType = 'pump'
        this.actionCycleTotal = 0.42
        this.actionCycleTimer = 0.42
        sounds.playPumpCycle()
        break
      case 'odin':
        this.gunRecoilOffset.z = 0.08
        this.gunRecoilOffset.y = (Math.random() - 0.5) * 0.025
        this.gunRecoilRot.x = 0.12
        this.gunRecoilRot.y = (Math.random() - 0.5) * 0.05
        this.gunRecoilRot.z = (Math.random() - 0.5) * 0.06
        break
      case 'spectre':
        this.gunRecoilOffset.z = 0.05
        this.gunRecoilOffset.y = 0.015
        this.gunRecoilRot.x = 0.08
        this.gunRecoilRot.y = (Math.random() - 0.5) * 0.03
        break
      case 'classic':
        this.gunRecoilOffset.z = 0.06
        this.gunRecoilOffset.y = 0.03
        this.gunRecoilRot.x = 0.22
        this.gunRecoilRot.y = (Math.random() - 0.5) * 0.03
        if (this.boltMesh) {
          this.boltMesh.position.z = 0.04
          setTimeout(() => { if (this.boltMesh) this.boltMesh.position.z = -0.01 }, 45)
        }
        break
      case 'vandal':
      default:
        this.gunRecoilOffset.z = 0.11
        this.gunRecoilOffset.y = 0.035
        this.gunRecoilRot.x = 0.17
        this.gunRecoilRot.y = (Math.random() - 0.5) * 0.04
        this.gunRecoilRot.z = (Math.random() - 0.5) * 0.04
        break
    }
  }

  reload() {
    if (!this.weaponData || this.isReloading) return
    if (this.ammoMag >= this.weaponData.magazineSize) return
    this.isReloading = true
    this.reloadStartTime = performance.now()
    this.reloadDuration  = this.weaponData.reloadTime
    if (this.isScoped) this.setScoped(false)
    sounds.playReload()
    bus.emit('weapon:reload_start', { weapon: this.weaponData })
  }

  takeDamage(amount) {
    if (!this.alive) return
    // Spawn protection grace period
    if (this.isInvulnerable) return

    if (this.shield > 0) {
      const absorbed = Math.min(this.shield, amount * 0.5)
      this.shield -= absorbed * 2
      amount -= absorbed
      if (this.shield < 0) this.shield = 0
    }
    this.health = Math.max(0, this.health - amount)
    // Valorant bullet tagging effect: slows movement when struck
    this.taggingTimer = 0.38
    bus.emit('player:damaged', { health: this.health, shield: this.shield })
    if (this.health <= 0) {
      this.alive = false
      bus.emit('player:died', { currentWeaponId: this.weaponData?.id ?? 'vandal' })
    }
  }

  respawn(position) {
    this.health    = this.maxHealth
    this.shield    = 50
    this.alive     = true
    this.velocity.set(0, 0, 0)
    this.position.copy(position)
    this.camera.position.copy(position)
    this.camera.position.y += 0.72

    // Completely reset camera rotation on respawn (no tilt or flip)
    this.camera.rotation.order = 'YXZ'
    this.camera.rotation.set(0, 0, 0)
    this.recoilPitch = 0
    this.recoilShots = 0

    this._triggerSpawnProtection(3000)
    bus.emit('player:respawn', { health: this.health })
  }

  // ── Physics / Movement ──────────────────────────────
  update(dt, bots) {
    if (!this.alive) return

    // Ensure camera never tilts sideways or flips upside down
    this.camera.rotation.order = 'YXZ'
    this.camera.rotation.z = 0
    this.camera.rotation.x = Math.max(-1.45, Math.min(1.45, this.camera.rotation.x))

    const now = performance.now()

    if (this.isFiring && this.weaponData) {
      this._tryFire(bots, now)
    }

    // ── Procedural Viewmodel Animation System ──
    const animPos = new THREE.Vector3()
    const animRot = new THREE.Vector3()

    // 1. Reload Animation with physical Magazine Drop & Slap Insert
    if (this.isReloading) {
      const elapsed = now - this.reloadStartTime
      const progress = Math.min(1, elapsed / this.reloadDuration)

      if (progress >= 1) {
        this.ammoMag = this.weaponData.magazineSize
        this.weaponSlots[this.activeSlot].mag = this.ammoMag
        this.isReloading = false
        this.recoilShots = 0
        if (this.magMesh) {
          this.magMesh.position.y = this.magBaseY ?? this.magMesh.position.y
          this.magMesh.rotation.z = 0
        }
        bus.emit('weapon:reload_done', { mag: this.ammoMag })
      } else {
        if (this.magBaseY === undefined && this.magMesh) {
          this.magBaseY = this.magMesh.position.y
        }

        if (progress < 0.25) {
          // Phase 1: Gun lowers and tilts left
          const t = progress / 0.25
          animPos.y -= 0.18 * Math.sin(t * Math.PI * 0.5)
          animPos.x -= 0.05 * t
          animRot.z -= 0.45 * t
          animRot.x -= 0.22 * t
        } else if (progress < 0.60) {
          // Phase 2: Mag dropped downwards out of weapon well
          const magT = (progress - 0.25) / 0.35
          animPos.y -= 0.18
          animPos.x -= 0.05
          animRot.z -= 0.45
          animRot.x -= 0.22
          if (this.magMesh) {
            // Drop magazine down and tilt
            this.magMesh.position.y = (this.magBaseY ?? -0.06) - Math.min(0.35, magT * 0.6)
            this.magMesh.rotation.z = magT * 0.4
          }
        } else if (progress < 0.78) {
          // Phase 3: Fresh mag slammed in!
          const slapT = (progress - 0.60) / 0.18
          const snapIn = Math.min(1, slapT * 1.5)
          if (this.magMesh) {
            this.magMesh.position.y = (this.magBaseY ?? -0.06) - (1 - snapIn) * 0.35
            this.magMesh.rotation.z = (1 - snapIn) * 0.4
          }
          const slap = Math.sin(slapT * Math.PI) * 0.06
          animPos.y -= 0.18 - slap
          animPos.x -= 0.05 * (1 - slapT * 0.6)
          animRot.z -= 0.45 * (1 - slapT * 0.4)
          animRot.x -= 0.22 - slap * 2
        } else {
          // Phase 4: Bolt pull / return to ready
          const retT = (progress - 0.78) / 0.22
          const ease = 1 - Math.cos(retT * Math.PI * 0.5)
          animPos.y -= 0.18 * (1 - ease)
          animPos.x -= 0.02 * (1 - ease)
          animRot.z -= 0.27 * (1 - ease)
          animRot.x -= 0.13 * (1 - ease)
          if (this.magMesh) {
            this.magMesh.position.y = this.magBaseY ?? this.magMesh.position.y
            this.magMesh.rotation.z = 0
          }
        }
      }
    }

    // 2. Action Cycle (Sniper Bolt-Action / Shotgun Pump / Pistol Slide)
    if (this.actionCycleTimer > 0) {
      this.actionCycleTimer -= dt
      const p = 1 - Math.max(0, this.actionCycleTimer / this.actionCycleTotal)

      if (this.actionCycleType === 'bolt') {
        if (p < 0.35) {
          const t = p / 0.35
          animRot.z -= 0.40 * Math.sin(t * Math.PI * 0.5)
          animRot.y += 0.16 * Math.sin(t * Math.PI * 0.5)
          animPos.z += 0.08 * t
          if (this.boltMesh) this.boltMesh.rotation.z = Math.PI / 3 + t * 0.6
        } else if (p < 0.65) {
          animRot.z -= 0.40
          animRot.y += 0.16
          animPos.z += 0.08
          if (this.boltMesh) this.boltMesh.position.z = 0.08 + (p - 0.35) * 0.15
        } else {
          const t = (p - 0.65) / 0.35
          animRot.z -= 0.40 * (1 - t)
          animRot.y += 0.16 * (1 - t)
          animPos.z += 0.08 * (1 - t)
          if (this.boltMesh) {
            this.boltMesh.position.z = 0.08
            this.boltMesh.rotation.z = Math.PI / 3 + (1 - t) * 0.6
          }
        }
      } else if (this.actionCycleType === 'pump') {
        const pump = Math.sin(p * Math.PI)
        animPos.z += 0.07 * pump
        animPos.y -= 0.03 * pump
        animRot.x += 0.10 * pump
        if (this.boltMesh) {
          this.boltMesh.position.z = -0.32 + pump * 0.12
        }
      }

      if (this.actionCycleTimer <= 0) {
        this.actionCycleTimer = 0
        this.actionCycleType = null
        if (this.boltMesh && this.weaponData?.id === 'bucky') {
          this.boltMesh.position.z = -0.32
        }
      }
    }

    // 3. Movement Bobbing & Tactile Footstep Sounds
    const hSpeed = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2)
    if (this.onGround && hSpeed > 0.5) {
      const prevPhase = this.walkBobPhase ?? 0
      this.walkBobPhase = prevPhase + dt * (this.isWalking ? 7 : 11)
      animPos.x += Math.cos(this.walkBobPhase) * 0.007
      animPos.y += Math.abs(Math.sin(this.walkBobPhase)) * 0.006

      // Play footstep when foot impacts the ground (silent when shift-walking)
      if (!this.isWalking && Math.sin(prevPhase) < 0 && Math.sin(this.walkBobPhase) >= 0) {
        sounds.playFootstep(hSpeed > 6.0)
      }
    }

    // 4. Spring recovery on recoil
    this.gunRecoilOffset.lerp(new THREE.Vector3(0, 0, 0), dt * 16)
    this.gunRecoilRot.x += (0 - this.gunRecoilRot.x) * Math.min(1, dt * 16)
    this.gunRecoilRot.y += (0 - this.gunRecoilRot.y) * Math.min(1, dt * 16)
    this.gunRecoilRot.z += (0 - this.gunRecoilRot.z) * Math.min(1, dt * 16)

    // 5. Update viewmodel transform directly (crisp, locked to camera with zero motion ghosting)
    if (this.gunMesh) {
      this.gunMesh.position.copy(this.gunBasePos)
        .add(this.gunRecoilOffset)
        .add(animPos)
      this.gunMesh.rotation.set(
        this.gunRecoilRot.x + animRot.x,
        this.gunRecoilRot.y + animRot.y,
        this.gunRecoilRot.z + animRot.z
      )
      this.gunMesh.visible = !this.isScoped
    }

    if (this.recoilPitch > 0) {
      this.recoilPitch = Math.max(0, this.recoilPitch - dt * 6)
    }

    const forward = new THREE.Vector3()
    const right   = new THREE.Vector3()
    this.camera.getWorldDirection(forward)
    forward.y = 0; forward.normalize()
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize()

    const moveDir = new THREE.Vector3()
    if (this.keys.w) moveDir.add(forward)
    if (this.keys.s) moveDir.sub(forward)
    if (this.keys.d) moveDir.add(right)
    if (this.keys.a) moveDir.sub(right)
    if (moveDir.length() > 1) moveDir.normalize()

    // ── Valorant Tactical Movement Model ──
    if (this.taggingTimer > 0) this.taggingTimer -= dt
    if (this.landingTimer > 0) this.landingTimer -= dt

    this.isWalking  = this.keys.shift
    this.isCrouched = this.keys.ctrl

    // Smooth crouch eye-height transition (0.72 standing down to 0.32 crouched)
    const targetCrouch = this.isCrouched ? 1 : 0
    this.crouchProgress += (targetCrouch - this.crouchProgress) * Math.min(1, dt * 16)

    let currentSpeed = VALORANT_RUN_SPEED * this.speedMult
    if (this.isScoped) {
      currentSpeed *= 0.45
    } else if (this.isCrouched) {
      currentSpeed *= VALORANT_CROUCH_MULT
    } else if (this.isWalking) {
      currentSpeed *= VALORANT_WALK_MULT
    }

    // Apply bullet tagging penalty (slowed when struck by gunfire)
    if (this.taggingTimer > 0) {
      const tagSlow = 0.35 + (1 - this.taggingTimer / 0.38) * 0.65
      currentSpeed *= tagSlow
    }

    // Apply landing tag penalty (brief slowdown upon touching ground from jump)
    if (this.landingTimer > 0) {
      currentSpeed *= 0.65
    }

    const targetVx = moveDir.x * currentSpeed
    const targetVz = moveDir.z * currentSpeed
    const accel = this.onGround ? ACCEL_GROUND : ACCEL_AIR

    // Deadzoning & instant counter-strafe stop
    this.velocity.x += (targetVx - this.velocity.x) * Math.min(1, dt * accel)
    this.velocity.z += (targetVz - this.velocity.z) * Math.min(1, dt * accel)

    // Valorant Jump (fixed height, no bunny-hop speed spam)
    if (this.keys.space && this.onGround && !this.isCrouched) {
      sounds.playJump()
      this.velocity.y = JUMP_FORCE
      this.onGround = false
    }

    if (!this.onGround) {
      this.velocity.y += GRAVITY * dt
    }

    const allowGlide = (this.keys.a || this.keys.d) ? true : false
    const displacement = this.velocity.clone().multiplyScalar(dt)
    const result = this.collision.resolve(this.position, displacement, 0.4, 0.9, allowGlide)
    const wasOnGround = this.onGround

    this.position.copy(result.position)
    this.onGround = result.onGround
    if (this.onGround && this.velocity.y < 0) {
      this.velocity.y = 0
    }

    if (result.collidedX) this.velocity.x = 0
    if (result.collidedZ) this.velocity.z = 0
    if (!allowGlide && (result.collidedX || result.collidedZ)) {
      this.velocity.x = 0
      this.velocity.z = 0
    }

    // Landing tag recovery penalty
    if (!wasOnGround && this.onGround) {
      this.landingTimer = LANDING_SLOW_DUR
    }

    // Smooth crouch eye-height
    const eyeHeight = 0.72 - (this.crouchProgress * 0.40)
    this.camera.position.x = this.position.x
    this.camera.position.y = this.position.y + eyeHeight
    this.camera.position.z = this.position.z

    this.keys.space = false
  }

  setScoped(v) {
    this.isScoped = v
    const zoomFov = (this.weaponData?.scopeMultiplier > 1) ? (90 / this.weaponData.scopeMultiplier) : 70
    this.camera.fov = v ? zoomFov : 90
    this.camera.updateProjectionMatrix()
    bus.emit('player:scope', { scoped: v })
  }

  _bindKeys() {
    const setKey = (e, val) => {
      switch (e.code) {
        case 'KeyW': this.keys.w = val; break
        case 'KeyS': this.keys.s = val; break
        case 'KeyA': this.keys.a = val; break
        case 'KeyD': this.keys.d = val; break
        case 'Space':   if (val) this.keys.space = true; break
        case 'ControlLeft': case 'ControlRight': this.keys.ctrl = val; break
        case 'ShiftLeft':   case 'ShiftRight':   this.keys.shift = val; break
      }
    }
    document.addEventListener('keydown', e => setKey(e, true))
    document.addEventListener('keyup',   e => setKey(e, false))

    document.addEventListener('keydown', e => {
      if (e.code === 'Digit1') this.switchSlot(0)
      if (e.code === 'Digit2') this.switchSlot(1)
      if (e.code === 'KeyR')   this.reload()
    })

    document.addEventListener('wheel', e => {
      const next = e.deltaY > 0 ? 1 : 0
      this.switchSlot(next)
    })
  }
}
