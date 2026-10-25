import * as THREE from 'three'
import { getWeapon } from '../weapons/WeaponRegistry.js'
import { bus } from '../core/EventBus.js'
import { sounds } from '../audio/SoundSystem.js'
import {
  createMuzzleFlashTexture,
  createCarbonFiberTexture,
  createBrushedSteelTexture,
  createPolymerGripTexture,
  createRadiantCrystalTexture,
  createHoloReticleTexture,
  createScopeLensTexture
} from '../weapons/WeaponTextures.js'
import { weaponModelLoader } from '../weapons/WeaponModelLoader.js'

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
  constructor(camera, mapCollision, scene, tracerManager, viewmodelCamera = null) {
    this.camera        = camera
    this.viewmodelCamera = viewmodelCamera
    this.viewmodelTarget = viewmodelCamera || camera
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

    // Debug & Map Exploration State
    this.isNoclip       = false
    this.noclipSpeed    = 18
    this.isGodMode      = false
    this.isInfiniteAmmo = false

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

    // Tactical Patrol Carry & Movement Animation Physics
    this.defaultGunPosition = new THREE.Vector3(0.22, -0.21, -0.44)
    this.defaultGunRotation = new THREE.Euler(-0.02, -0.035, 0.02, 'YXZ')
    this.currentBobOffset   = new THREE.Vector3(0, 0, 0)
    this.targetBobOffset    = new THREE.Vector3(0, 0, 0)
    this.currentBobRot      = new THREE.Euler(0, 0, 0, 'YXZ')
    this.targetBobRot       = new THREE.Euler(0, 0, 0, 'YXZ')
    this.bobPhase           = 0
    this.bobWeight          = 0
    this.idleTime           = 0
    this.mouseSwayX         = 0
    this.mouseSwayY         = 0
    this.mouseSwayRotZ      = 0
    this.mouseSwayRotX      = 0
    this._mouseDeltaX       = 0
    this._mouseDeltaY       = 0
    this.mouseVelX          = 0
    this.mouseVelY          = 0
    this.strafeRoll         = 0
    this.currentLandDip     = 0
    this.jumpDip            = 0

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
    if (this.isReloading) {
      clearTimeout(this.reloadTimer)
      this.isReloading = false
      this._resetReloadParts()
    }
    this._activateSlot(slot)
  }

  // ── First-Person Weapon Model ────────────────────────
  // ── First-Person Weapon Model & Dynamic Modular Mesh ────────────────────────
  _createGunModel() {
    this.gunMesh = new THREE.Group()
    this.gunBasePos = this.defaultGunPosition
    this.gunBaseRot = this.defaultGunRotation
    this.gunMesh.position.copy(this.defaultGunPosition)
    this.gunMesh.rotation.copy(this.defaultGunRotation)
    this.viewmodelTarget.add(this.gunMesh)

    // Dedicated Viewmodel Lighting:
    // In Valorant, first-person viewmodels have dedicated rim, key, and ambient lights
    // so metallic receivers, carbon finishes, fluted barrels, and optics look crisp in all environments
    const gunKeyLight = new THREE.DirectionalLight(0xffffff, 1.25)
    gunKeyLight.position.set(0.35, 0.55, 0.25)
    this.viewmodelTarget.add(gunKeyLight)

    const gunRimLight = new THREE.DirectionalLight(0x93c5fd, 0.60)
    gunRimLight.position.set(-0.45, -0.20, -0.35)
    this.viewmodelTarget.add(gunRimLight)

    const gunAmbient = new THREE.AmbientLight(0xffffff, 0.85)
    this.viewmodelTarget.add(gunAmbient)

    // Dedicated dynamic reload parts
    this.magMesh = null
    this.boltMesh = null
    this.coverMesh = null
    this.beltMesh = null
    this.shellMesh = null
    this.magBasePos = null
    this.boltBasePos = null
    this.boltBaseRot = null
    this.coverBasePos = null
    this.coverBaseRot = null
    this.shellBasePos = null
    this.reloadSoundTriggers = new Set()

    // Build initial weapon model
    if (this.weaponData) {
      this._buildDistinctWeaponMesh(this.weaponData.id)
    }
  }

  _resetReloadParts() {
    if (this.magMesh) {
      if (this.magBasePos) this.magMesh.position.copy(this.magBasePos)
      this.magMesh.rotation.set(0, 0, 0)
      this.magMesh.visible = true
    }
    if (this.boltMesh) {
      if (this.boltBasePos) this.boltMesh.position.copy(this.boltBasePos)
      if (this.boltBaseRot) this.boltMesh.rotation.copy(this.boltBaseRot)
      else this.boltMesh.rotation.set(0, 0, 0)
    }
    if (this.coverMesh) {
      if (this.coverBaseRot) this.coverMesh.rotation.copy(this.coverBaseRot)
      else this.coverMesh.rotation.set(0, 0, 0)
    }
    if (this.beltMesh) {
      this.beltMesh.visible = true
    }
    if (this.shellMesh) {
      this.shellMesh.visible = false
    }
    this.reloadSoundTriggers.clear()
  }

  _buildDistinctWeaponMesh(weaponId) {
    if (!this.gunMesh) return

    // Cleanly dispose previous geometries and materials to avoid GPU buffer leaks or broken polygon artifacts
    this.gunMesh.traverse(child => {
      if (child.isMesh) {
        if (child.geometry) child.geometry.dispose()
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach(m => m.dispose())
          else child.material.dispose()
        }
      }
    })

    this.gunMesh.clear()
    this.magMesh = null
    this.boltMesh = null
    this.coverMesh = null
    this.beltMesh = null
    this.shellMesh = null
    this.magBasePos = null
    this.boltBasePos = null
    this.boltBaseRot = null
    this.coverBasePos = null
    this.coverBaseRot = null
    this.shellBasePos = null

    // ── Universal Base Materials with High-Fidelity PBR Textures ──
    const metalDark = new THREE.MeshStandardMaterial({
      color: 0x161d26,
      roughness: 0.35,
      metalness: 0.85,
      map: createCarbonFiberTexture()
    })
    const gripMat   = new THREE.MeshStandardMaterial({
      color: 0x111620,
      roughness: 0.80,
      metalness: 0.15,
      map: createPolymerGripTexture()
    })
    const steelDark = new THREE.MeshStandardMaterial({
      color: 0x141b24,
      roughness: 0.35,
      metalness: 0.90,
      map: createBrushedSteelTexture()
    })

    switch (weaponId) {
      case 'vandal': {
        // ── VANDAL: Prime / Dragon King Skin (Obsidian Carbon, 24K Gold, Pearlescent White & Fiery Crimson) ──
        const vandalCarbon = new THREE.MeshStandardMaterial({
          color: 0x18202c,
          roughness: 0.35,
          metalness: 0.85,
          map: createCarbonFiberTexture()
        })
        const vandalWhite  = new THREE.MeshStandardMaterial({
          color: 0xf8fafc,
          roughness: 0.28,
          metalness: 0.30
        })
        const vandalGold   = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          roughness: 0.20,
          metalness: 0.95,
          map: createBrushedSteelTexture()
        })
        const vandalFlame  = new THREE.MeshStandardMaterial({
          color: 0xff4655,
          emissive: 0xff4655,
          emissiveIntensity: 1.1,
          roughness: 0.20,
          map: createRadiantCrystalTexture('#ff4655')
        })

        // Upper receiver with angled top crest
        const upper = new THREE.Mesh(new THREE.BoxGeometry(0.070, 0.080, 0.46), vandalCarbon)
        upper.position.set(0, 0.02, 0)
        this.gunMesh.add(upper)

        // Lower receiver with flared magwell
        const lower = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.065, 0.24), vandalCarbon)
        lower.position.set(0, -0.04, 0.04)
        this.gunMesh.add(lower)

        // Pearlescent white top canopy cover
        const cover = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.038, 0.36), vandalWhite)
        cover.position.set(0, 0.075, -0.03)
        this.gunMesh.add(cover)

        // Right-side ejection port recess (darkened interior)
        const ejPort = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.032, 0.09), steelDark)
        ejPort.position.set(0.035, 0.035, 0.02)
        this.gunMesh.add(ejPort)

        // Picatinny top optic rail with cross teeth
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.012, 0.32), steelDark)
        rail.position.set(0, 0.095, -0.03)
        this.gunMesh.add(rail)
        for (let i = 0; i < 7; i++) {
          const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.006, 0.016), vandalGold)
          tooth.position.set(0, 0.103, -0.15 + i * 0.04)
          this.gunMesh.add(tooth)
        }

        // Tactical Holographic Reflex Sight with glowing cyan reticle
        const holoBase = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.022, 0.08), steelDark)
        holoBase.position.set(0, 0.110, -0.04)
        const holoHood = new THREE.Mesh(new THREE.BoxGeometry(0.040, 0.036, 0.014), vandalGold)
        holoHood.position.set(0, 0.134, -0.01)
        const holoGlass = new THREE.Mesh(
          new THREE.PlaneGeometry(0.032, 0.028),
          new THREE.MeshBasicMaterial({
            map: createHoloReticleTexture('#00f0ff', 'circle-dot'),
            transparent: true,
            opacity: 0.95,
            side: THREE.DoubleSide
          })
        )
        holoGlass.position.set(0, 0.134, -0.012)
        this.gunMesh.add(holoBase)
        this.gunMesh.add(holoHood)
        this.gunMesh.add(holoGlass)

        // Iron sights: rear aperture and hooded front post
        const rearSight = new THREE.Mesh(new THREE.BoxGeometry(0.030, 0.024, 0.015), vandalGold)
        rearSight.position.set(0, 0.11, 0.11)
        this.gunMesh.add(rearSight)

        const frontSight = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.032, 0.015), vandalGold)
        frontSight.position.set(0, 0.08, -0.44)
        this.gunMesh.add(frontSight)

        // Gas block & gas tube above barrel
        const gasBlock = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.045, 0.05), steelDark)
        gasBlock.position.set(0, 0.045, -0.40)
        this.gunMesh.add(gasBlock)
        const gasTube = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.28, 8), steelDark)
        gasTube.geometry.rotateX(Math.PI / 2)
        gasTube.position.set(0, 0.05, -0.25)
        this.gunMesh.add(gasTube)

        // Fluted carbine barrel
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 0.36, 10), vandalCarbon)
        barrel.geometry.rotateX(Math.PI / 2)
        barrel.position.set(0, 0.015, -0.40)
        this.gunMesh.add(barrel)

        // Multi-port tactical compensator / muzzle brake with dark hollow bore
        const brake = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.042, 0.08), vandalGold)
        brake.position.set(0, 0.015, -0.60)
        const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.03, 10), new THREE.MeshBasicMaterial({ color: 0x050505 }))
        bore.geometry.rotateX(Math.PI / 2)
        bore.position.set(0, 0.015, -0.64)
        this.gunMesh.add(brake)
        this.gunMesh.add(bore)

        // Skeletonized tactical stock with cheek riser and rubber recoil pad
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.09, 0.26), vandalCarbon)
        stock.position.set(0, -0.01, 0.34)
        const stockPad = new THREE.Mesh(new THREE.BoxGeometry(0.058, 0.11, 0.025), steelDark)
        stockPad.position.set(0, -0.01, 0.47)
        const stockGoldTrim = new THREE.Mesh(new THREE.BoxGeometry(0.060, 0.016, 0.22), vandalGold)
        stockGoldTrim.position.set(0, 0.045, 0.34)
        this.gunMesh.add(stock)
        this.gunMesh.add(stockPad)
        this.gunMesh.add(stockGoldTrim)

        // Ergonomic 22° raked pistol grip
        const grip = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.16, 0.075), gripMat)
        grip.geometry.rotateX(0.28)
        grip.position.set(0, -0.12, 0.14)
        this.gunMesh.add(grip)

        // Trigger guard loop and curved steel trigger
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.020, 0.050, 0.085), steelDark)
        guard.position.set(0, -0.085, 0.06)
        const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.032, 0.014), vandalGold)
        trigger.geometry.rotateX(0.3)
        trigger.position.set(0, -0.080, 0.06)
        this.gunMesh.add(guard)
        this.gunMesh.add(trigger)

        // Side-mounted dynamic charging handle (Bolt Mesh)
        const boltGroup = new THREE.Group()
        const boltStem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.03, 8), steelDark)
        boltStem.geometry.rotateZ(Math.PI / 2)
        const boltKnob = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.018, 0.04), vandalGold)
        boltKnob.position.set(0.02, 0, 0)
        boltGroup.add(boltStem)
        boltGroup.add(boltKnob)
        this.boltBasePos = new THREE.Vector3(0.042, 0.04, -0.04)
        this.boltBaseRot = new THREE.Euler(0, 0, 0)
        boltGroup.position.copy(this.boltBasePos)
        this.gunMesh.add(boltGroup)
        this.boltMesh = boltGroup

        // 30-round curved banana magazine with horizontal stamping ribs
        const magGroup = new THREE.Group()
        const magBody = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.24, 0.095), vandalCarbon)
        magBody.geometry.rotateX(-0.25)
        magBody.position.set(0, -0.10, 0)
        magGroup.add(magBody)
        for (let r = 0; r < 3; r++) {
          const rib = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.012, 0.098), vandalGold)
          rib.geometry.rotateX(-0.25)
          rib.position.set(0, -0.06 - r * 0.05, -0.01 + r * 0.015)
          magGroup.add(rib)
        }
        const magPlate = new THREE.Mesh(new THREE.BoxGeometry(0.054, 0.025, 0.11), vandalGold)
        magPlate.geometry.rotateX(-0.25)
        magPlate.position.set(0, -0.21, 0.025)
        magGroup.add(magPlate)
        this.magBasePos = new THREE.Vector3(0, -0.06, -0.05)
        magGroup.position.copy(this.magBasePos)
        this.gunMesh.add(magGroup)
        this.magMesh = magGroup

        // Glowing dragon energy crimson side laser stripe
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.074, 0.020, 0.36), vandalFlame)
        stripe.position.set(0, 0.02, -0.02)
        this.gunMesh.add(stripe)
        break
      }

      case 'spectre': {
        // ── SPECTRE: Magepunk / Ion Skin (Alpine Ice White, Electric Cyan Radiant Glow & Titanium) ──
        const spectreWhite = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.25, metalness: 0.35 })
        const spectreTitan = new THREE.MeshStandardMaterial({
          color: 0x94a3b8,
          roughness: 0.28,
          metalness: 0.88,
          map: createBrushedSteelTexture()
        })
        const spectreCyan  = new THREE.MeshStandardMaterial({
          color: 0x00f0ff,
          emissive: 0x00f0ff,
          emissiveIntensity: 1.2,
          roughness: 0.20,
          map: createRadiantCrystalTexture('#00f0ff')
        })
        const spectreNavy  = new THREE.MeshStandardMaterial({
          color: 0x1e293b,
          roughness: 0.65,
          metalness: 0.20,
          map: createPolymerGripTexture()
        })

        // Sleek white submachine upper body
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.064, 0.09, 0.34), spectreWhite)
        body.position.set(0, 0.02, 0)
        this.gunMesh.add(body)

        // Top Picatinny rail with micro reflex optic
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.030, 0.012, 0.26), steelDark)
        rail.position.set(0, 0.075, -0.02)
        this.gunMesh.add(rail)

        const smgOpticBase = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.018, 0.065), steelDark)
        smgOpticBase.position.set(0, 0.088, -0.02)
        const smgOpticGlass = new THREE.Mesh(
          new THREE.PlaneGeometry(0.028, 0.024),
          new THREE.MeshBasicMaterial({
            map: createHoloReticleTexture('#00f0ff', 'circle-dot'),
            transparent: true,
            opacity: 0.95,
            side: THREE.DoubleSide
          })
        )
        smgOpticGlass.position.set(0, 0.106, -0.01)
        this.gunMesh.add(smgOpticBase)
        this.gunMesh.add(smgOpticGlass)

        // Right-side ejection port
        const ejPort = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.028, 0.07), steelDark)
        ejPort.position.set(0.032, 0.03, 0.01)
        this.gunMesh.add(ejPort)

        // Integrated cylindrical sound suppressor with knurling and tapered crown
        const silencer = new THREE.Mesh(new THREE.CylinderGeometry(0.030, 0.030, 0.34, 14), spectreTitan)
        silencer.geometry.rotateX(Math.PI / 2)
        silencer.position.set(0, 0.015, -0.32)
        this.gunMesh.add(silencer)

        const silencerCap = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.030, 0.04, 14), steelDark)
        silencerCap.geometry.rotateX(Math.PI / 2)
        silencerCap.position.set(0, 0.015, -0.50)
        const silencerBore = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.03, 10), new THREE.MeshBasicMaterial({ color: 0x050505 }))
        silencerBore.geometry.rotateX(Math.PI / 2)
        silencerBore.position.set(0, 0.015, -0.52)
        this.gunMesh.add(silencerCap)
        this.gunMesh.add(silencerBore)

        // Dual glowing electric cyan energy plasma rings
        const ringGeo = new THREE.CylinderGeometry(0.033, 0.033, 0.032, 14)
        ringGeo.rotateX(Math.PI / 2)
        const ring1 = new THREE.Mesh(ringGeo, spectreCyan)
        ring1.position.set(0, 0.015, -0.24)
        const ring2 = ring1.clone()
        ring2.position.z = -0.38
        this.gunMesh.add(ring1)
        this.gunMesh.add(ring2)

        // HK-style cocking tube & handle (Bolt Mesh) at 11 o'clock
        const boltGroup = new THREE.Group()
        const cockTube = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.18, 8), steelDark)
        cockTube.geometry.rotateX(Math.PI / 2)
        const cockHandle = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.018, 0.035), spectreTitan)
        cockHandle.position.set(-0.025, 0.015, 0)
        boltGroup.add(cockTube)
        boltGroup.add(cockHandle)
        this.boltBasePos = new THREE.Vector3(-0.035, 0.055, -0.14)
        this.boltBaseRot = new THREE.Euler(0, 0, 0)
        boltGroup.position.copy(this.boltBasePos)
        this.gunMesh.add(boltGroup)
        this.boltMesh = boltGroup

        // Compact straight 30-round 9mm stick magazine with cyan witness window
        const magGroup = new THREE.Group()
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.24, 0.055), spectreWhite)
        mag.position.set(0, -0.10, 0)
        const magStripe = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.08, 0.015), spectreCyan)
        magStripe.position.set(0, -0.09, 0.026)
        const magBase = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.025, 0.065), spectreTitan)
        magBase.position.set(0, -0.21, 0)
        magGroup.add(mag)
        magGroup.add(magStripe)
        magGroup.add(magBase)
        this.magBasePos = new THREE.Vector3(0, -0.04, 0.02)
        magGroup.position.copy(this.magBasePos)
        this.gunMesh.add(magGroup)
        this.magMesh = magGroup

        // Tactical skeleton stock & foregrip
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.06, 0.18), spectreNavy)
        stock.position.set(0, -0.01, 0.24)
        const buttPlate = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.10, 0.02), steelDark)
        buttPlate.position.set(0, -0.02, 0.33)
        this.gunMesh.add(stock)
        this.gunMesh.add(buttPlate)

        const foregrip = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.10, 0.05), spectreNavy)
        foregrip.geometry.rotateX(0.25)
        foregrip.position.set(0, -0.08, -0.12)
        this.gunMesh.add(foregrip)

        // Pistol grip
        const grip = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.16, 0.07), gripMat)
        grip.geometry.rotateX(0.25)
        grip.position.set(0, -0.11, 0.12)
        this.gunMesh.add(grip)

        // Trigger guard & match trigger
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.045, 0.075), steelDark)
        guard.position.set(0, -0.07, 0.08)
        const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.028, 0.012), spectreCyan)
        trigger.position.set(0, -0.065, 0.08)
        this.gunMesh.add(guard)
        this.gunMesh.add(trigger)
        break
      }

      case 'operator': {
        // ── OPERATOR: Singularity / Cosmic Skin (Royal Violet Nebula, Silver Titanium & Gold Accents) ──
        const cosmicViolet = new THREE.MeshStandardMaterial({
          color: 0x581c87,
          roughness: 0.32,
          metalness: 0.65,
          map: createCarbonFiberTexture()
        })
        const cosmicDark   = new THREE.MeshStandardMaterial({
          color: 0x1e1233,
          roughness: 0.40,
          metalness: 0.75,
          map: createCarbonFiberTexture()
        })
        const chromeSteel  = new THREE.MeshStandardMaterial({
          color: 0xcfd8dc,
          roughness: 0.20,
          metalness: 0.92,
          map: createBrushedSteelTexture()
        })
        const cosmicGold   = new THREE.MeshStandardMaterial({
          color: 0xfbbf24,
          roughness: 0.18,
          metalness: 0.95,
          map: createBrushedSteelTexture()
        })
        const lensMat = new THREE.MeshBasicMaterial({
          map: createScopeLensTexture(),
          transparent: true,
          opacity: 0.94,
          side: THREE.DoubleSide
        })
        const reticleMat = new THREE.MeshBasicMaterial({
          map: createHoloReticleTexture('#06b6d4', 'sniper-cross'),
          transparent: true,
          opacity: 0.90,
          side: THREE.DoubleSide
        })

        // Heavy monolithic royal violet sniper chassis
        const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.080, 0.12, 0.68), cosmicViolet)
        chassis.position.set(0, 0.01, 0)
        this.gunMesh.add(chassis)

        // Spiral fluted heavy chrome barrel
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.020, 0.68, 12), chromeSteel)
        barrel.geometry.rotateX(Math.PI / 2)
        barrel.position.set(0, 0.035, -0.66)
        this.gunMesh.add(barrel)

        // Massive dual-chamber baffle muzzle brake
        const brake = new THREE.Mesh(new THREE.BoxGeometry(0.058, 0.060, 0.13), cosmicDark)
        brake.position.set(0, 0.035, -1.04)
        const brakeTrim = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.02, 0.09), cosmicGold)
        brakeTrim.position.set(0, 0.035, -1.04)
        const opBore = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.04, 12), new THREE.MeshBasicMaterial({ color: 0x030303 }))
        opBore.geometry.rotateX(Math.PI / 2)
        opBore.position.set(0, 0.035, -1.10)
        this.gunMesh.add(brake)
        this.gunMesh.add(brakeTrim)
        this.gunMesh.add(opBore)

        // Folded tactical bipod legs mounted under forward chassis
        const bipodMount = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.03, 0.06), steelDark)
        bipodMount.position.set(0, -0.06, -0.28)
        this.gunMesh.add(bipodMount)
        const legL = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.016, 0.26), chromeSteel)
        legL.position.set(-0.04, -0.07, -0.40)
        const legR = legL.clone()
        legR.position.x = 0.04
        this.gunMesh.add(legL)
        this.gunMesh.add(legR)

        // High-magnification sniper scope with cantilever mount
        const mount = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.05, 0.18), steelDark)
        mount.position.set(0, 0.085, -0.04)
        this.gunMesh.add(mount)

        const scopeTube = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.038, 0.38, 14), cosmicDark)
        scopeTube.geometry.rotateX(Math.PI / 2)
        scopeTube.position.set(0, 0.14, -0.04)
        const scopeGoldRing = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.025, 14), cosmicGold)
        scopeGoldRing.geometry.rotateX(Math.PI / 2)
        scopeGoldRing.position.set(0, 0.14, -0.04)
        this.gunMesh.add(scopeTube)
        this.gunMesh.add(scopeGoldRing)

        // Scope elevation & windage turrets
        const turretTop = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.025, 8), cosmicGold)
        turretTop.position.set(0, 0.185, -0.04)
        const turretSide = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.025, 8), cosmicGold)
        turretSide.geometry.rotateZ(Math.PI / 2)
        turretSide.position.set(0.045, 0.14, -0.04)
        this.gunMesh.add(turretTop)
        this.gunMesh.add(turretSide)

        const lens = new THREE.Mesh(new THREE.CircleGeometry(0.034, 16), lensMat)
        lens.position.set(0, 0.14, 0.15)
        const reticle = new THREE.Mesh(new THREE.CircleGeometry(0.033, 16), reticleMat)
        reticle.position.set(0, 0.14, 0.149)
        this.gunMesh.add(lens)
        this.gunMesh.add(reticle)

        // Polished 24K Gold Bolt Action Assembly (Bolt Mesh)
        const boltGroup = new THREE.Group()
        const boltCylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.16, 10), chromeSteel)
        boltCylinder.geometry.rotateX(Math.PI / 2)
        const boltHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.08, 8), cosmicGold)
        boltHandle.geometry.rotateZ(Math.PI / 3)
        const boltKnob = new THREE.Mesh(new THREE.SphereGeometry(0.018, 10, 10), cosmicGold)
        boltKnob.position.set(0.065, 0.032, 0)
        boltGroup.add(boltCylinder)
        boltGroup.add(boltHandle)
        boltGroup.add(boltKnob)
        this.boltBasePos = new THREE.Vector3(0.042, 0.065, 0.06)
        this.boltBaseRot = new THREE.Euler(0, 0, 0)
        boltGroup.position.copy(this.boltBasePos)
        this.gunMesh.add(boltGroup)
        this.boltMesh = boltGroup

        // Heavy stamped steel 5-round box magazine with cosmic violet shell
        const magGroup = new THREE.Group()
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.060, 0.20, 0.14), cosmicDark)
        mag.position.set(0, -0.08, 0)
        const magLip = new THREE.Mesh(new THREE.BoxGeometry(0.064, 0.02, 0.15), cosmicGold)
        magLip.position.set(0, -0.17, 0)
        magGroup.add(mag)
        magGroup.add(magLip)
        this.magBasePos = new THREE.Vector3(0, -0.05, 0.04)
        magGroup.position.copy(this.magBasePos)
        this.gunMesh.add(magGroup)
        this.magMesh = magGroup

        // Precision sniper buttstock with cheek riser and thick rubber recoil pad
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.11, 0.32), cosmicViolet)
        stock.position.set(0, -0.01, 0.44)
        const riser = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.03, 0.16), cosmicDark)
        riser.position.set(0, 0.06, 0.40)
        const buttPad = new THREE.Mesh(new THREE.BoxGeometry(0.066, 0.13, 0.035), steelDark)
        buttPad.position.set(0, -0.01, 0.60)
        this.gunMesh.add(stock)
        this.gunMesh.add(riser)
        this.gunMesh.add(buttPad)

        // Precision vertical grip & match trigger
        const grip = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.16, 0.07), gripMat)
        grip.geometry.rotateX(0.12)
        grip.position.set(0, -0.11, 0.18)
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.020, 0.05, 0.09), steelDark)
        guard.position.set(0, -0.075, 0.11)
        const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.03, 0.014), cosmicGold)
        trigger.position.set(0, -0.07, 0.11)
        this.gunMesh.add(grip)
        this.gunMesh.add(guard)
        this.gunMesh.add(trigger)
        break
      }

      case 'odin': {
        // ── ODIN: BlastX / Heavy Industry Skin (Vibrant Hazard Orange, Gunmetal, 24K Brass Drum & Chevrons) ──
        const odinOrange = new THREE.MeshStandardMaterial({
          color: 0xea580c,
          roughness: 0.35,
          metalness: 0.50,
          map: createCarbonFiberTexture()
        })
        const odinGun    = new THREE.MeshStandardMaterial({
          color: 0x334155,
          roughness: 0.35,
          metalness: 0.88,
          map: createBrushedSteelTexture()
        })
        const odinGold   = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          roughness: 0.22,
          metalness: 0.95,
          map: createBrushedSteelTexture()
        })
        const odinYellow = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.30, metalness: 0.40 })

        // Giant industrial orange receiver housing
        const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.14, 0.52), odinOrange)
        receiver.position.set(0, 0.01, 0)
        this.gunMesh.add(receiver)

        // Quad vented rotary gunmetal barrels with front brace
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2
          const b = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.44, 8), odinGun)
          b.geometry.rotateX(Math.PI / 2)
          b.position.set(Math.cos(angle) * 0.028, Math.sin(angle) * 0.028 + 0.02, -0.48)
          this.gunMesh.add(b)
        }
        const barrelBrace = new THREE.Mesh(new THREE.CylinderGeometry(0.046, 0.046, 0.04, 12), odinGold)
        barrelBrace.geometry.rotateX(Math.PI / 2)
        barrelBrace.position.set(0, 0.02, -0.66)
        this.gunMesh.add(barrelBrace)
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2
          const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.03, 8), new THREE.MeshBasicMaterial({ color: 0x050505 }))
          bore.geometry.rotateX(Math.PI / 2)
          bore.position.set(Math.cos(angle) * 0.028, Math.sin(angle) * 0.028 + 0.02, -0.68)
          this.gunMesh.add(bore)
        }

        // Heavy carry handle with yellow hazard band
        const handle = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.08, 0.24), odinGun)
        handle.position.set(0, 0.15, -0.05)
        const handleStripe = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.025, 0.10), odinYellow)
        handleStripe.position.set(0, 0.18, -0.05)
        this.gunMesh.add(handle)
        this.gunMesh.add(handleStripe)

        // Top hinged feed tray cover (Cover Mesh) - pivots open on reload!
        const coverGroup = new THREE.Group()
        const coverPlate = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.032, 0.26), odinGun)
        coverPlate.position.set(0, 0, 0.13)
        const coverLatch = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.018, 0.03), odinGold)
        coverLatch.position.set(0, 0.015, 0.25)
        coverGroup.add(coverPlate)
        coverGroup.add(coverLatch)
        this.coverBasePos = new THREE.Vector3(0, 0.08, -0.14)
        this.coverBaseRot = new THREE.Euler(0, 0, 0)
        coverGroup.position.copy(this.coverBasePos)
        this.gunMesh.add(coverGroup)
        this.coverMesh = coverGroup

        // Articulated brass bullet link belt on feed tray
        const beltGroup = new THREE.Group()
        for (let b = 0; b < 4; b++) {
          const bullet = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.04, 8), odinGold)
          bullet.geometry.rotateZ(Math.PI / 2)
          bullet.position.set(-0.06 + b * 0.02, 0.065, -0.02)
          beltGroup.add(bullet)
        }
        this.gunMesh.add(beltGroup)
        this.beltMesh = beltGroup

        // Massive 100-round side-mounted polished brass ammo drum (Mag Mesh)
        const drumGroup = new THREE.Group()
        const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.105, 0.13, 16), odinGold)
        drum.geometry.rotateZ(Math.PI / 2)
        const drumRim = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.03, 16), odinOrange)
        drumRim.geometry.rotateZ(Math.PI / 2)
        drumGroup.add(drum)
        drumGroup.add(drumRim)
        this.magBasePos = new THREE.Vector3(-0.13, -0.08, 0.02)
        drumGroup.position.copy(this.magBasePos)
        this.gunMesh.add(drumGroup)
        this.magMesh = drumGroup

        // Heavy side cocking lever (Bolt Mesh)
        const boltGroup = new THREE.Group()
        const boltLever = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.018, 0.08), steelDark)
        const boltKnob = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.04, 0.025), odinGold)
        boltKnob.position.set(0.02, 0, 0.03)
        boltGroup.add(boltLever)
        boltGroup.add(boltKnob)
        this.boltBasePos = new THREE.Vector3(0.065, 0.03, 0.04)
        boltGroup.position.copy(this.boltBasePos)
        this.gunMesh.add(boltGroup)
        this.boltMesh = boltGroup

        // Heavy rear grip & trigger
        const grip = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.18, 0.08), gripMat)
        grip.geometry.rotateX(0.24)
        grip.position.set(0, -0.11, 0.20)
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.06, 0.09), steelDark)
        guard.position.set(0, -0.075, 0.13)
        this.gunMesh.add(grip)
        this.gunMesh.add(guard)
        break
      }

      case 'bucky': {
        // ── BUCKY: Oni Blood Skin (Lacquered Cherry Red, Carved Ivory & Ornamental Gold) ──
        const buckyRed   = new THREE.MeshStandardMaterial({
          color: 0xdc2626,
          roughness: 0.25,
          metalness: 0.45,
          map: createCarbonFiberTexture()
        })
        const buckyIvory = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.40, metalness: 0.15 })
        const buckyGold  = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          roughness: 0.22,
          metalness: 0.95,
          map: createBrushedSteelTexture()
        })
        const buckySteel = new THREE.MeshStandardMaterial({
          color: 0x1e293b,
          roughness: 0.35,
          metalness: 0.88,
          map: createBrushedSteelTexture()
        })

        // Lacquered cherry red receiver
        const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.11, 0.42), buckyRed)
        receiver.position.set(0, 0.01, 0)
        this.gunMesh.add(receiver)

        // Right side ejection port & bottom loading gate
        const ejPort = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.035, 0.09), steelDark)
        ejPort.position.set(0.038, 0.02, 0.02)
        const loadGate = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.012, 0.08), buckyGold)
        loadGate.position.set(0, -0.05, -0.04)
        this.gunMesh.add(ejPort)
        this.gunMesh.add(loadGate)

        // Wide 12-gauge magnum top smoothbore barrel with brass bead sight and dark bore
        const barrelTop = new THREE.Mesh(new THREE.CylinderGeometry(0.020, 0.020, 0.42, 12), buckySteel)
        barrelTop.geometry.rotateX(Math.PI / 2)
        barrelTop.position.set(0, 0.035, -0.42)
        const frontBead = new THREE.Mesh(new THREE.SphereGeometry(0.006, 8, 8), buckyGold)
        frontBead.position.set(0, 0.06, -0.62)
        const buckyBore = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.03, 12), new THREE.MeshBasicMaterial({ color: 0x050505 }))
        buckyBore.geometry.rotateX(Math.PI / 2)
        buckyBore.position.set(0, 0.035, -0.63)
        this.gunMesh.add(barrelTop)
        this.gunMesh.add(frontBead)
        this.gunMesh.add(buckyBore)

        // Bottom magazine tube with knurled end cap & barrel clamp
        const magTube = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 0.38, 12), buckySteel)
        magTube.geometry.rotateX(Math.PI / 2)
        magTube.position.set(0, -0.02, -0.40)
        const clamp = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.075, 0.025), buckyGold)
        clamp.position.set(0, 0.01, -0.56)
        this.gunMesh.add(magTube)
        this.gunMesh.add(clamp)

        // Sliding carved ivory pump grip with gold filigree rings (Bolt Mesh)
        const pumpGroup = new THREE.Group()
        const pump = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.075, 0.18), buckyIvory)
        const pumpRing1 = new THREE.Mesh(new THREE.BoxGeometry(0.072, 0.078, 0.025), buckyGold)
        pumpRing1.position.z = -0.06
        const pumpRing2 = new THREE.Mesh(new THREE.BoxGeometry(0.072, 0.078, 0.025), buckyGold)
        pumpRing2.position.z = 0.06
        pumpGroup.add(pump)
        pumpGroup.add(pumpRing1)
        pumpGroup.add(pumpRing2)
        this.boltBasePos = new THREE.Vector3(0, -0.02, -0.32)
        pumpGroup.position.copy(this.boltBasePos)
        this.gunMesh.add(pumpGroup)
        this.boltMesh = pumpGroup

        // Realistic 12-gauge shotgun shell (Shell Mesh) for reload animation
        const shellGroup = new THREE.Group()
        const shellHull = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.055, 10), buckyRed)
        shellHull.geometry.rotateX(Math.PI / 2)
        const shellHead = new THREE.Mesh(new THREE.CylinderGeometry(0.0115, 0.0115, 0.020, 10), buckyGold)
        shellHead.geometry.rotateX(Math.PI / 2)
        shellHead.position.z = 0.022
        shellGroup.add(shellHull)
        shellGroup.add(shellHead)
        shellGroup.visible = false
        this.shellMesh = shellGroup
        this.gunMesh.add(shellGroup)

        // Carved ivory buttstock with cherry trim
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.064, 0.11, 0.28), buckyIvory)
        stock.position.set(0, -0.025, 0.32)
        const stockBand = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.035, 0.03), buckyGold)
        stockBand.position.set(0, -0.025, 0.22)
        const buttPad = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.12, 0.025), steelDark)
        buttPad.position.set(0, -0.025, 0.46)
        this.gunMesh.add(stock)
        this.gunMesh.add(stockBand)
        this.gunMesh.add(buttPad)

        // Trigger guard & curved trigger
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.020, 0.05, 0.08), steelDark)
        guard.position.set(0, -0.075, 0.06)
        const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.03, 0.012), buckyGold)
        trigger.position.set(0, -0.07, 0.06)
        this.gunMesh.add(guard)
        this.gunMesh.add(trigger)
        break
      }

      case 'classic':
      default: {
        // ── CLASSIC: Glitchpop Skin (Electric Neon Cyan Slide, Carbon Frame & Hot Magenta Dots) ──
        const classicCyan = new THREE.MeshStandardMaterial({
          color: 0x06b6d4,
          roughness: 0.22,
          metalness: 0.70,
          map: createBrushedSteelTexture()
        })
        const classicDark = new THREE.MeshStandardMaterial({
          color: 0x141a24,
          roughness: 0.65,
          metalness: 0.25,
          map: createCarbonFiberTexture()
        })
        const classicPink = new THREE.MeshStandardMaterial({
          color: 0xec4899,
          emissive: 0xec4899,
          emissiveIntensity: 1.0,
          roughness: 0.2,
          map: createRadiantCrystalTexture('#ec4899')
        })
        const sightWhite  = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.1 })

        // Carbon fiber polymer lower frame with accessory rail under dustcover
        const frame = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.09, 0.26), classicDark)
        frame.position.set(0, -0.015, 0)
        this.gunMesh.add(frame)

        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.012, 0.08), steelDark)
        rail.position.set(0, -0.05, -0.08)
        this.gunMesh.add(rail)

        // Electric neon cyan slide with cocking serrations and 3-dot combat sights (Bolt Mesh)
        const slideGroup = new THREE.Group()
        const slide = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.060, 0.28), classicCyan)
        const ejPortCut = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.025, 0.06), steelDark)
        ejPortCut.position.set(0.022, 0.015, 0.01)
        const slideStripe = new THREE.Mesh(new THREE.BoxGeometry(0.057, 0.012, 0.16), classicPink)
        slideStripe.position.set(0, 0.02, 0)

        // 3-dot combat sights on slide
        const frontPost = new THREE.Mesh(new THREE.BoxGeometry(0.010, 0.018, 0.012), steelDark)
        frontPost.position.set(0, 0.038, -0.12)
        const frontDot = new THREE.Mesh(new THREE.SphereGeometry(0.003, 6, 6), sightWhite)
        frontDot.position.set(0, 0.040, -0.11)

        const rearSight = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.016, 0.014), steelDark)
        rearSight.position.set(0, 0.036, 0.12)
        const rearDotL = new THREE.Mesh(new THREE.SphereGeometry(0.0025, 6, 6), sightWhite)
        rearDotL.position.set(-0.008, 0.038, 0.125)
        const rearDotR = new THREE.Mesh(new THREE.SphereGeometry(0.0025, 6, 6), sightWhite)
        rearDotR.position.set(0.008, 0.038, 0.125)

        slideGroup.add(slide)
        slideGroup.add(ejPortCut)
        slideGroup.add(slideStripe)
        slideGroup.add(frontPost)
        slideGroup.add(frontDot)
        slideGroup.add(rearSight)
        slideGroup.add(rearDotL)
        slideGroup.add(rearDotR)

        this.boltBasePos = new THREE.Vector3(0, 0.055, -0.01)
        slideGroup.position.copy(this.boltBasePos)
        this.gunMesh.add(slideGroup)
        this.boltMesh = slideGroup

        // Recessed 9mm barrel crown inside slide
        const classicBore = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.04, 10), new THREE.MeshBasicMaterial({ color: 0x050505 }))
        classicBore.geometry.rotateX(Math.PI / 2)
        classicBore.position.set(0, 0.055, -0.16)
        this.gunMesh.add(classicBore)

        // Pistol grip with ergonomic front/back strap texturing
        const grip = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.18, 0.075), gripMat)
        grip.geometry.rotateX(0.24)
        grip.position.set(0, -0.11, 0.08)
        this.gunMesh.add(grip)

        // Trigger guard & flat-face tactical trigger
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.048, 0.075), steelDark)
        guard.position.set(0, -0.07, 0.04)
        const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.028, 0.012), classicCyan)
        trigger.position.set(0, -0.065, 0.04)
        this.gunMesh.add(guard)
        this.gunMesh.add(trigger)

        // Drop-free 9mm magazine with cyan baseplate (Mag Mesh)
        const magGroup = new THREE.Group()
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.18, 0.055), steelDark)
        mag.geometry.rotateX(0.24)
        const magBase = new THREE.Mesh(new THREE.BoxGeometry(0.040, 0.02, 0.065), classicCyan)
        magBase.position.set(0, -0.10, 0)
        magGroup.add(mag)
        magGroup.add(magBase)
        this.magBasePos = new THREE.Vector3(0, -0.11, 0.08)
        magGroup.position.copy(this.magBasePos)
        this.gunMesh.add(magGroup)
        this.magMesh = magGroup

        // Hot pink radiant power dot indicator
        const dot = new THREE.Mesh(new THREE.BoxGeometry(0.054, 0.016, 0.06), classicPink)
        dot.position.set(0, 0.01, -0.04)
        this.gunMesh.add(dot)
        break
      }
    }

    // ── Build Stylized First-Person Arms & Tactical Gloves Gripping the Weapon ──
    this._buildFirstPersonArms(weaponId)

    // Seamless check for custom .glb models placed in /models/{weaponId}.glb
    weaponModelLoader.loadModel(weaponId).then(customGroup => {
      if (customGroup && this.weaponData?.id === weaponId && this.gunMesh) {
        const arms = this.gunMesh.getObjectByName('firstPersonArms')
        this.gunMesh.clear()
        this.gunMesh.add(customGroup)
        if (arms) this.gunMesh.add(arms)

        // Find reload components inside the loaded custom hierarchy
        let foundMag = null
        let foundBolt = null
        customGroup.traverse(c => {
          if (!foundMag && /mag|magazine/i.test(c.name)) foundMag = c
          if (!foundBolt && /bolt|slide|cock/i.test(c.name)) foundBolt = c
        })
        this.magMesh = foundMag
        this.boltMesh = foundBolt
        if (this.magMesh) this.magBasePos = this.magMesh.position.clone()
        if (this.boltMesh) {
          this.boltBasePos = this.boltMesh.position.clone()
          this.boltBaseRot = this.boltMesh.rotation.clone()
        }
        this.coverMesh = customGroup.getObjectByName('cover') || null
        this.shellMesh = customGroup.getObjectByName('shell') || null

        this.gunMesh.traverse(child => {
          if (child.isMesh) {
            child.castShadow = false
            child.receiveShadow = false
          }
        })
      }
    })

    // Explicitly disable shadows on viewmodel to eliminate shadow acne, flickering, and ground shadow
    this.gunMesh.traverse(child => {
      if (child.isMesh) {
        child.castShadow = false
        child.receiveShadow = false
      }
    })
  }

  _buildFirstPersonArms(weaponId) {
    const sleeveMat  = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.70,
      metalness: 0.10,
      map: createCarbonFiberTexture()
    }) // Tactical dark combat jacket
    const gloveMat   = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.60,
      metalness: 0.20,
      map: createPolymerGripTexture()
    }) // Reinforced shooting glove
    const knuckleMat = new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.40, metalness: 0.35 }) // Composite knuckle guard

    const armsGroup = new THREE.Group()
    armsGroup.name = 'firstPersonArms'

    // ── 1. RIGHT ARM (Firmly gripping the pistol grip & trigger) ──
    const rightArm = new THREE.Group()
    const rForearmGeo = new THREE.CylinderGeometry(0.044, 0.054, 0.38, 10)
    rForearmGeo.rotateZ(0.38)
    rForearmGeo.rotateX(-0.45)
    const rForearm = new THREE.Mesh(rForearmGeo, sleeveMat)
    rForearm.position.set(0.14, -0.22, 0.26)
    rightArm.add(rForearm)

    // Right glove palm wrapped around grip
    const rHandGroup = new THREE.Group()
    const rPalmGeo = new THREE.BoxGeometry(0.062, 0.075, 0.08)
    const rPalm = new THREE.Mesh(rPalmGeo, gloveMat)
    const rKnuckleGeo = new THREE.BoxGeometry(0.066, 0.022, 0.055)
    const rKnuckle = new THREE.Mesh(rKnuckleGeo, knuckleMat)
    rKnuckle.position.set(0.025, 0.015, -0.01)

    // Trigger finger bent into trigger guard
    const rTriggerFinger = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.016, 0.055), gloveMat)
    rTriggerFinger.position.set(0.015, 0.02, -0.055)
    rTriggerFinger.rotation.x = 0.2

    // Thumb wrapped around left side of receiver
    const rThumb = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.018, 0.045), gloveMat)
    rThumb.position.set(-0.035, 0.025, -0.01)
    rThumb.rotation.y = 0.4

    rHandGroup.add(rPalm)
    rHandGroup.add(rKnuckle)
    rHandGroup.add(rTriggerFinger)
    rHandGroup.add(rThumb)

    // Position right hand at the weapon's pistol grip
    let rGripPos = new THREE.Vector3(0, -0.10, 0.13)
    if (weaponId === 'operator') rGripPos.set(0, -0.10, 0.16)
    else if (weaponId === 'odin') rGripPos.set(0, -0.10, 0.18)
    else if (weaponId === 'classic') rGripPos.set(0, -0.09, 0.07)
    else if (weaponId === 'spectre') rGripPos.set(0, -0.10, 0.11)

    rHandGroup.position.copy(rGripPos)
    rHandGroup.rotation.x = 0.24
    rightArm.add(rHandGroup)
    armsGroup.add(rightArm)

    // ── 2. LEFT ARM (Supporting the front handguard / forend) ──
    const leftArm = new THREE.Group()
    this.leftArmMesh = leftArm

    if (weaponId === 'classic') {
      // Pistol Two-Handed Combat Hold (Left hand wraps around front of right hand)
      const lForearmGeo = new THREE.CylinderGeometry(0.042, 0.050, 0.36, 10)
      lForearmGeo.rotateZ(-0.45)
      lForearmGeo.rotateX(-0.40)
      const lForearm = new THREE.Mesh(lForearmGeo, sleeveMat)
      lForearm.position.set(-0.13, -0.21, 0.22)
      leftArm.add(lForearm)

      const lHandGroup = new THREE.Group()
      const lPalm = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.070, 0.075), gloveMat)
      const lKnuckle = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.020, 0.05), knuckleMat)
      lKnuckle.position.set(-0.02, 0.015, -0.01)
      lHandGroup.add(lPalm)
      lHandGroup.add(lKnuckle)
      lHandGroup.position.set(-0.02, -0.10, 0.06)
      lHandGroup.rotation.z = -0.3
      lHandGroup.rotation.x = 0.22
      leftArm.add(lHandGroup)
    } else {
      // Long Guns: Left hand reaches forward and cradles front handguard
      let lSupportPos = new THREE.Vector3(-0.02, -0.07, -0.22) // default rifle (Vandal)
      if (weaponId === 'spectre') lSupportPos.set(-0.02, -0.08, -0.12)
      else if (weaponId === 'operator') lSupportPos.set(-0.02, -0.07, -0.26)
      else if (weaponId === 'odin') lSupportPos.set(-0.02, -0.08, -0.18)
      else if (weaponId === 'bucky') lSupportPos.set(0, -0.04, -0.32)

      const lForearmGeo = new THREE.CylinderGeometry(0.042, 0.050, 0.42, 10)
      lForearmGeo.rotateZ(-0.42)
      lForearmGeo.rotateX(-0.55)
      const lForearm = new THREE.Mesh(lForearmGeo, sleeveMat)
      lForearm.position.set(-0.16, -0.20, lSupportPos.z + 0.30)
      leftArm.add(lForearm)

      const lHandGroup = new THREE.Group()
      const lPalm = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.055, 0.085), gloveMat)
      const lKnuckle = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.018, 0.055), knuckleMat)
      lKnuckle.position.set(-0.025, -0.02, 0)
      const lFingers = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.065, 0.065), gloveMat)
      lFingers.position.set(0.035, 0.015, 0)
      const lThumb = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.020, 0.050), gloveMat)
      lThumb.position.set(-0.035, 0.025, 0)

      lHandGroup.add(lPalm)
      lHandGroup.add(lKnuckle)
      lHandGroup.add(lFingers)
      lHandGroup.add(lThumb)
      lHandGroup.position.copy(lSupportPos)
      lHandGroup.rotation.z = -0.15

      // For Bucky, attach hand to pump slide so it slides during pump action!
      if (weaponId === 'bucky' && this.boltMesh) {
        lHandGroup.position.set(0, -0.02, 0)
        this.boltMesh.add(lHandGroup)
      } else {
        leftArm.add(lHandGroup)
      }
    }

    armsGroup.add(leftArm)
    this.gunMesh.add(armsGroup)
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
    this.viewmodelTarget.add(this.muzzleFlash)
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
    if (!this.isInfiniteAmmo) {
      this.ammoMag--
      this.weaponSlots[this.activeSlot].mag = this.ammoMag
    }
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

    // ── Krunker-Style Error Firing & Pinpoint Hitscan Precision ──
    // Zero random movement error: bullets go true to crosshair while moving/jumping!
    for (let p = 0; p < pellets; p++) {
      let spreadX = 0
      let spreadY = 0

      if (pellets > 1) {
        // Shotgun (Bucky): Pellet 0 is guaranteed dead-center laser, rest in tight circular buckshot ring
        if (p > 0) {
          const angle = ((p - 1) / (pellets - 1)) * Math.PI * 2 + (Math.random() - 0.5) * 0.35
          const r = Math.sqrt(Math.random()) * 0.036
          spreadX = Math.cos(angle) * r
          spreadY = Math.sin(angle) * r
        }
      } else {
        // Rifles / Snipers / SMG / Pistol (Krunker Accuracy):
        // 1. First shots & tap-firing are 100% laser pinpoint (zero RNG spread!)
        // 2. Scoped sniper is true 100% pinpoint hitscan
        // 3. Sustained full-auto spray has tight, controllable bloom
        if (isSniper || this.isScoped || this.recoilShots <= 1) {
          spreadX = 0
          spreadY = 0
        } else {
          const spraySpread = Math.min(0.0055, (this.recoilShots - 1) * 0.0010)
          spreadX = (Math.random() - 0.5) * spraySpread * 2
          spreadY = (Math.random() - 0.5) * spraySpread * 2
        }
      }

      const dir = new THREE.Vector3(spreadX, spreadY, -1).normalize()
      dir.applyQuaternion(this.camera.quaternion)

      this.raycaster.set(this.camera.position, dir)

      // 1. Raycast solid world collision first to see if a wall or obstacle blocks the shot
      const wallHit = this.collision.raycast(this.camera.position, dir, def.range)
      const wallDist = wallHit ? this.camera.position.distanceTo(wallHit.point) : Infinity

      // 2. Raycast ONLY against exact anatomical body hitboxes (head, torso, arms, legs)
      // Never test cosmetic meshes, enemy diamonds, healthbars, or ground shadows!
      const activeBots = bots.filter(b => b && !b.isDead)
      const activeHitboxes = []
      for (const b of activeBots) {
        if (b.hitboxes && b.hitboxes.length > 0) {
          for (const hb of b.hitboxes) {
            hb.userData.bot = b
            activeHitboxes.push(hb)
          }
        }
      }

      // Non-recursive test against exact physical body geometry only
      const hits = this.raycaster.intersectObjects(activeHitboxes, false)

      let hitPoint = null
      let hitNormal = new THREE.Vector3(0, 1, 0)
      let isBotHit = false

      if (hits.length > 0) {
        const hit = hits[0]
        if (hit.distance < wallDist) {
          hitPoint = hit.point.clone()
          const hitObj = hit.object
          const bot = hitObj.userData.bot

          if (bot && !bot.isDead) {
            isBotHit = true
            // Exact hitbox determination directly from mesh userData
            const isHead = hitObj.userData.hitPart === 'head' || hitObj.userData.isHead === true
            const isLeg  = hitObj.userData.hitPart === 'leg'  || hitObj.userData.isLeg === true

            const dmg = isHead ? def.damageHead : (isLeg ? (def.damageLeg ?? def.damageBody) : def.damageBody)
            // Play satisfying hit / headshot sound
            sounds.playHit(isHead)
            bus.emit('player:shot_bot', { bot, damage: dmg, isHead, point: hitPoint })

            if (this.tracerManager) {
              if (isHead) {
                this.tracerManager.addHeadshotSparks(hitPoint, this.camera)
              } else {
                this.tracerManager.addSparks(hitPoint)
              }
            }
          }
        }
      }

      // If didn't hit bot, check wall collision for spark FX
      if (!isBotHit) {
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
    this.actionCycleTimer = 0
    this.actionCycleType = null
    this.reloadStartTime = performance.now()
    this.reloadDuration  = this.weaponData.reloadTime
    this._resetReloadParts()
    if (this.isScoped) this.setScoped(false)
    bus.emit('weapon:reload_start', { weapon: this.weaponData })
  }

  takeDamage(amount) {
    if (!this.alive || this.isGodMode) return
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

  // ── Physics / Movement & Viewmodel Pipeline ──────────────────────────────
  update(dt, bots = []) {
    if (!this.alive) return

    const delta = Math.min(dt, 0.05)

    // Ensure camera never tilts sideways or flips upside down
    this.camera.rotation.order = 'YXZ'
    this.camera.rotation.z = 0
    this.camera.rotation.x = Math.max(-1.45, Math.min(1.45, this.camera.rotation.x))

    // ── 1. MOVEMENT PHYSICS & CAMERA SETTLING (Runs FIRST so camera position is settled) ──
    if (this.isNoclip) {
      // 3D Free-Fly Noclip (Camera Direction Vectors)
      const lookDir = new THREE.Vector3()
      this.camera.getWorldDirection(lookDir)
      const rightDir = new THREE.Vector3().crossVectors(lookDir, new THREE.Vector3(0, 1, 0)).normalize()

      const flyMove = new THREE.Vector3()
      if (this.keys.w) flyMove.add(lookDir)
      if (this.keys.s) flyMove.sub(lookDir)
      if (this.keys.d) flyMove.add(rightDir)
      if (this.keys.a) flyMove.sub(rightDir)
      if (this.keys.space) flyMove.y += 1.0
      if (this.keys.ctrl)  flyMove.y -= 1.0

      if (flyMove.lengthSq() > 0) flyMove.normalize()

      const flySpeed = this.keys.shift ? (this.noclipSpeed * 2.5) : this.noclipSpeed
      this.position.addScaledVector(flyMove, flySpeed * delta)
      this.velocity.set(0, 0, 0)
      this.onGround = false

      const eyeHeight = 0.72 - (this.crouchProgress * 0.40)
      this.camera.position.x = this.position.x
      this.camera.position.y = this.position.y + eyeHeight
      this.camera.position.z = this.position.z
      this.keys.space = false
    } else {
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

      // Valorant Tactical Movement Timers
      if (this.taggingTimer > 0) this.taggingTimer -= delta
      if (this.landingTimer > 0) this.landingTimer -= delta

      this.isWalking  = this.keys.shift
      this.isCrouched = this.keys.ctrl

      // Smooth crouch eye-height transition (0.72 standing down to 0.32 crouched)
      const targetCrouch = this.isCrouched ? 1 : 0
      this.crouchProgress += (targetCrouch - this.crouchProgress) * Math.min(1, delta * 16)

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
      this.velocity.x += (targetVx - this.velocity.x) * Math.min(1, delta * accel)
      this.velocity.z += (targetVz - this.velocity.z) * Math.min(1, delta * accel)

      // Ladder Climbing Mechanics
      const ladders = this.collision?.getLadders?.() || []
      let onLadder = false
      const footY = this.position.y - 0.45
      const headY = this.position.y + 0.45

      for (let i = 0; i < ladders.length; i++) {
        const lad = ladders[i]
        const dx = Math.abs(this.position.x - lad.x)
        const dz = Math.abs(this.position.z - lad.z)
        const reach = (lad.width || 0.8) / 2 + 0.5
        if (dx <= reach && dz <= reach && footY <= (lad.y1 + 0.4) && headY >= (lad.y0 - 0.2)) {
          onLadder = true
          break
        }
      }

      if (onLadder) {
        let climbSpeed = 0
        if (this.keys.w || this.keys.space) climbSpeed += 3.5
        if (this.keys.s) climbSpeed -= 3.5
        this.velocity.y = climbSpeed
        this.velocity.x *= 0.5
        this.velocity.z *= 0.5
        this.onGround = true
      } else {
        // Valorant Jump (fixed height, no bunny-hop speed spam)
        if (this.keys.space && this.onGround && !this.isCrouched) {
          sounds.playJump()
          this.velocity.y = JUMP_FORCE
          this.onGround = false
        }

        if (!this.onGround) {
          this.velocity.y += GRAVITY * delta
        }
      }

      const prevYVel = this.velocity.y
      const allowGlide = (this.keys.a || this.keys.d) ? true : false
      const displacement = this.velocity.clone().multiplyScalar(delta)
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

      // Landing tag recovery penalty & Krunker landing bounce dip (only if falling with real velocity)
      if (!wasOnGround && this.onGround && prevYVel < -3.0) {
        this.landingTimer = LANDING_SLOW_DUR
        this.triggerLandDip(prevYVel)
      }

      // Camera world position is now 100% updated and settled for this frame!
      const eyeHeight = 0.72 - (this.crouchProgress * 0.40)
      this.camera.position.x = this.position.x
      const targetCamY = this.position.y + eyeHeight
      if (this.onGround && Math.abs(targetCamY - this.camera.position.y) <= 0.45 && !this.isNoclip) {
        // Silky smooth dampening for step-up curbs, stairs, and floor seams
        this.camera.position.y = THREE.MathUtils.damp(this.camera.position.y, targetCamY, 30, delta)
      } else {
        this.camera.position.y = targetCamY
      }
      this.camera.position.z = this.position.z
      this.keys.space = false
    }

    // ── 2. WEAPON FIRING & ACTION LOGIC ──
    const now = performance.now()
    if (this.isFiring && this.weaponData) {
      this._tryFire(bots, now)
    }

    if (this.recoilPitch > 0) {
      this.recoilPitch = Math.max(0, this.recoilPitch - delta * 6)
    }

    // ── 3. PROCEDURAL WEAPON BOBBING & ANIMATIONS ──
    const animPos = new THREE.Vector3()
    const animRot = new THREE.Vector3()

    // 3a. Weapon-Specific Reload Animation System with Physical Parts & Audio Triggers
    if (this.isReloading) {
      const elapsed = now - this.reloadStartTime
      const progress = Math.min(1, elapsed / this.reloadDuration)

      if (progress >= 1) {
        this.ammoMag = this.weaponData.magazineSize
        this.weaponSlots[this.activeSlot].mag = this.ammoMag
        this.isReloading = false
        this.recoilShots = 0
        this._resetReloadParts()
        bus.emit('weapon:reload_done', { mag: this.ammoMag })
      } else {
        const weaponId = this.weaponData.id

        // Helper for audio triggers (fires once per phase)
        const triggerSound = (tag) => {
          if (!this.reloadSoundTriggers.has(tag)) {
            this.reloadSoundTriggers.add(tag)
            sounds.playReloadPart(weaponId, tag)
          }
        }

        switch (weaponId) {
          case 'vandal': {
            // VANDAL: Rock-and-Lock Banana Mag + Side Cocking Handle Pull
            if (progress < 0.22) {
              // Phase 1: Gun rolls right, drops empty banana mag
              const t = progress / 0.22
              animPos.x -= 0.04 * t
              animPos.y -= 0.14 * Math.sin(t * Math.PI * 0.5)
              animRot.z -= 0.25 * t
              animRot.x -= 0.15 * t
              if (this.magMesh && this.magBasePos) {
                this.magMesh.position.y = this.magBasePos.y - t * 0.40
                this.magMesh.position.z = this.magBasePos.z - t * 0.15
                this.magMesh.rotation.x = -t * 0.5
              }
              triggerSound('eject')
            } else if (progress < 0.55) {
              // Phase 2: Fresh mag brought up from below
              const t = (progress - 0.22) / 0.33
              animPos.x -= 0.04
              animPos.y -= 0.14
              animRot.z -= 0.25
              animRot.x -= 0.15
              if (this.magMesh && this.magBasePos) {
                this.magMesh.position.y = this.magBasePos.y - (1 - t) * 0.35
                this.magMesh.position.z = this.magBasePos.z - (1 - t) * 0.10
                this.magMesh.rotation.x = -(1 - t) * 0.3
              }
            } else if (progress < 0.75) {
              // Phase 3: Rock-and-lock palm SLAP into magwell!
              const t = (progress - 0.55) / 0.20
              if (this.magMesh && this.magBasePos) {
                this.magMesh.position.copy(this.magBasePos)
                this.magMesh.rotation.set(0, 0, 0)
              }
              const slap = Math.sin(t * Math.PI) * 0.05
              animPos.y -= 0.14 - slap
              animRot.x -= 0.15 - slap * 2.5
              animRot.z -= 0.25 * (1 - t * 0.3)
              triggerSound('slap')
            } else {
              // Phase 4: Rack side charging handle back and snap forward into battery
              const t = (progress - 0.75) / 0.25
              if (t < 0.5) {
                const pullT = t / 0.5
                if (this.boltMesh && this.boltBasePos) {
                  this.boltMesh.position.z = this.boltBasePos.z + pullT * 0.12
                }
                animPos.z += 0.05 * pullT
                animRot.z -= 0.12 * pullT
                triggerSound('bolt')
              } else {
                const snapT = (t - 0.5) / 0.5
                if (this.boltMesh && this.boltBasePos) {
                  this.boltMesh.position.z = this.boltBasePos.z + (1 - snapT) * 0.12
                }
                animPos.z += 0.05 * (1 - snapT)
                animPos.y -= 0.14 * (1 - snapT)
                animRot.z -= 0.18 * (1 - snapT)
                animRot.x -= 0.15 * (1 - snapT)
              }
            }
            break
          }

          case 'spectre': {
            // SPECTRE: Straight SMG Mag Drop + Fresh Stick Mag Insert + Iconic HK Slap
            if (progress < 0.20) {
              // Phase 1: Fast mag drop straight down
              const t = progress / 0.20
              animRot.z += 0.28 * t
              animRot.y -= 0.12 * t
              animPos.y -= 0.08 * t
              if (this.magMesh && this.magBasePos) {
                this.magMesh.position.y = this.magBasePos.y - t * 0.45
              }
              triggerSound('eject')
            } else if (progress < 0.55) {
              // Phase 2: Fresh stick mag inserted
              const t = (progress - 0.20) / 0.35
              animRot.z = 0.28
              animRot.y = -0.12
              animPos.y = -0.08
              if (this.magMesh && this.magBasePos) {
                this.magMesh.position.y = this.magBasePos.y - (1 - t) * 0.35
              }
              if (t > 0.8) triggerSound('insert')
            } else if (progress < 0.82) {
              // Phase 3: Lock HK cocking handle back, then HK SLAP down!
              const t = (progress - 0.55) / 0.27
              if (this.magMesh && this.magBasePos) {
                this.magMesh.position.copy(this.magBasePos)
              }
              if (t < 0.4) {
                const cockT = t / 0.4
                if (this.boltMesh && this.boltBasePos) {
                  this.boltMesh.position.z = this.boltBasePos.z + cockT * 0.08
                  this.boltMesh.rotation.z = cockT * 0.4
                }
              } else {
                // Slap!
                const slapT = (t - 0.4) / 0.6
                if (this.boltMesh && this.boltBasePos) {
                  this.boltMesh.position.z = this.boltBasePos.z
                  this.boltMesh.rotation.z = (1 - slapT) * 0.4
                }
                const impact = Math.sin(slapT * Math.PI) * 0.04
                animPos.y -= 0.08 + impact
                animRot.z -= impact * 2
                triggerSound('hkslap')
              }
            } else {
              // Phase 4: Return to ready
              const t = (progress - 0.82) / 0.18
              animRot.z = 0.28 * (1 - t)
              animRot.y = -0.12 * (1 - t)
              animPos.y = -0.08 * (1 - t)
            }
            break
          }

          case 'operator': {
            // OPERATOR: Heavy Sniper Bolt Lift -> Bolt Back (Brass Eject) -> Heavy Mag Drop -> Mag In -> Bolt Forward -> Bolt Lock Down
            if (progress < 0.18) {
              // Phase 1: Lift bolt handle UP 90 degrees
              const t = progress / 0.18
              animPos.x -= 0.05 * t
              animRot.z -= 0.15 * t
              if (this.boltMesh && this.boltBaseRot) {
                this.boltMesh.rotation.z = this.boltBaseRot.z + t * (Math.PI / 2)
              }
              triggerSound('bolt_up')
            } else if (progress < 0.36) {
              // Phase 2: Pull bolt BACK straight, ejecting brass casing
              const t = (progress - 0.18) / 0.18
              animPos.x -= 0.05
              animRot.z -= 0.15
              if (this.boltMesh && this.boltBasePos) {
                this.boltMesh.position.z = this.boltBasePos.z + t * 0.16
              }
              triggerSound('bolt_back')
            } else if (progress < 0.54) {
              // Phase 3: Heavy box magazine drops downwards
              const t = (progress - 0.36) / 0.18
              if (this.magMesh && this.magBasePos) {
                this.magMesh.position.y = this.magBasePos.y - t * 0.45
              }
              triggerSound('mag_out')
            } else if (progress < 0.72) {
              // Phase 4: Fresh heavy magazine slammed up into magwell
              const t = (progress - 0.54) / 0.18
              if (this.magMesh && this.magBasePos) {
                this.magMesh.position.y = this.magBasePos.y - (1 - t) * 0.45
              }
              triggerSound('mag_in')
            } else if (progress < 0.88) {
              // Phase 5: Push heavy bolt FORWARD into chamber
              const t = (progress - 0.72) / 0.16
              if (this.magMesh && this.magBasePos) this.magMesh.position.copy(this.magBasePos)
              if (this.boltMesh && this.boltBasePos) {
                this.boltMesh.position.z = this.boltBasePos.z + (1 - t) * 0.16
              }
              triggerSound('bolt_forward')
            } else {
              // Phase 6: Lock bolt handle DOWN into locked battery
              const t = (progress - 0.88) / 0.12
              if (this.boltMesh && this.boltBaseRot) {
                this.boltMesh.rotation.z = this.boltBaseRot.z + (1 - t) * (Math.PI / 2)
              }
              animPos.x = -0.05 * (1 - t)
              animRot.z = -0.15 * (1 - t)
              triggerSound('bolt_lock')
            }
            break
          }

          case 'odin': {
            // ODIN: Heavy LMG: Feed Tray Cover Pop Open -> Detach 100-Round Drum -> Fresh Drum Mount -> Cover SLAM Down -> Rack Charging Lever
            if (progress < 0.20) {
              // Phase 1: Lower gun, feed tray cover pops open 60 deg
              const t = progress / 0.20
              animPos.y -= 0.16 * t
              animRot.x -= 0.25 * t
              if (this.coverMesh) {
                this.coverMesh.rotation.x = -t * 1.05
              }
              triggerSound('cover_open')
            } else if (progress < 0.45) {
              // Phase 2: Detach empty 100-round side drum
              const t = (progress - 0.20) / 0.25
              animPos.y -= 0.16
              animRot.x -= 0.25
              if (this.coverMesh) this.coverMesh.rotation.x = -1.05
              if (this.magMesh && this.magBasePos) {
                this.magMesh.position.y = this.magBasePos.y - t * 0.45
                this.magMesh.position.x = this.magBasePos.x - t * 0.20
              }
              if (this.beltMesh) this.beltMesh.visible = false
              triggerSound('drum_out')
            } else if (progress < 0.70) {
              // Phase 3: Lock fresh 100-round brass drum in place
              const t = (progress - 0.45) / 0.25
              if (this.magMesh && this.magBasePos) {
                this.magMesh.position.y = this.magBasePos.y - (1 - t) * 0.35
                this.magMesh.position.x = this.magBasePos.x - (1 - t) * 0.15
              }
              if (t > 0.8) {
                if (this.beltMesh) this.beltMesh.visible = true
                triggerSound('drum_in')
              }
            } else if (progress < 0.86) {
              // Phase 4: SLAM feed tray cover back down with violent impact!
              const t = (progress - 0.70) / 0.16
              if (this.magMesh && this.magBasePos) this.magMesh.position.copy(this.magBasePos)
              if (this.coverMesh) {
                this.coverMesh.rotation.x = -(1 - t) * 1.05
              }
              const slam = Math.sin(t * Math.PI) * 0.08
              animPos.y -= 0.16 + slam
              animRot.x -= 0.25 - slam * 2.0
              triggerSound('cover_slam')
            } else {
              // Phase 5: Rack heavy side cocking handle and return to ready
              const t = (progress - 0.86) / 0.14
              if (this.coverMesh) this.coverMesh.rotation.x = 0
              if (t < 0.5) {
                const rackT = t / 0.5
                if (this.boltMesh && this.boltBasePos) {
                  this.boltMesh.position.z = this.boltBasePos.z + rackT * 0.14
                }
                triggerSound('rack')
              } else {
                const snapT = (t - 0.5) / 0.5
                if (this.boltMesh && this.boltBasePos) {
                  this.boltMesh.position.z = this.boltBasePos.z + (1 - snapT) * 0.14
                }
              }
              animPos.y = -0.16 * (1 - t)
              animRot.x = -0.25 * (1 - t)
            }
            break
          }

          case 'bucky': {
            // BUCKY: Shotgun Tilt -> Shell 1 Push -> Shell 2 Push -> Combat Pump Rack
            if (progress < 0.20) {
              // Phase 1: Invert shotgun to expose bottom loading gate
              const t = progress / 0.20
              animRot.z += 0.55 * t
              animRot.x -= 0.20 * t
              animPos.x -= 0.05 * t
              if (this.shellMesh) this.shellMesh.visible = false
            } else if (progress < 0.45) {
              // Phase 2: Insert 12-gauge Shell 1
              const t = (progress - 0.20) / 0.25
              animRot.z = 0.55
              animRot.x = -0.20
              animPos.x = -0.05
              if (this.shellMesh) {
                this.shellMesh.visible = true
                this.shellMesh.position.set(0, -0.18 + t * 0.14, -0.18 + t * 0.12)
                this.shellMesh.rotation.x = -0.3 + t * 0.3
              }
              triggerSound('shell_insert')
            } else if (progress < 0.70) {
              // Phase 3: Insert 12-gauge Shell 2
              const t = (progress - 0.45) / 0.25
              if (this.shellMesh) {
                this.shellMesh.visible = true
                this.shellMesh.position.set(0, -0.18 + t * 0.14, -0.18 + t * 0.12)
                this.shellMesh.rotation.x = -0.3 + t * 0.3
              }
              if (t > 0.4) triggerSound('shell_insert')
            } else if (progress < 0.92) {
              // Phase 4: Level out and vigorous pump rack back and forward!
              const t = (progress - 0.70) / 0.22
              if (this.shellMesh) this.shellMesh.visible = false
              animRot.z = 0.55 * (1 - t)
              animRot.x = -0.20 * (1 - t)
              animPos.x = -0.05 * (1 - t)
              const pump = Math.sin(t * Math.PI)
              if (this.boltMesh && this.boltBasePos) {
                this.boltMesh.position.z = this.boltBasePos.z + pump * 0.14
              }
              animPos.z += pump * 0.04
              triggerSound('pump')
            } else {
              // Phase 5: Return to ready
              if (this.boltMesh && this.boltBasePos) this.boltMesh.position.copy(this.boltBasePos)
              if (this.shellMesh) this.shellMesh.visible = false
            }
            break
          }

          case 'classic': {
            // CLASSIC: Tactical Retention Pull -> 9mm Mag Drop -> Fresh Mag Insert -> Heel Slap -> Slide Release Snap
            if (progress < 0.22) {
              // Phase 1: Pull gun closer, drop 9mm mag out bottom of grip
              const t = progress / 0.22
              animPos.z += 0.10 * t
              animPos.y -= 0.08 * t
              animRot.z -= 0.25 * t
              if (this.magMesh && this.magBasePos) {
                this.magMesh.position.y = this.magBasePos.y - t * 0.42
                this.magMesh.position.z = this.magBasePos.z + t * 0.12
              }
              if (this.boltMesh && this.boltBasePos) {
                // Slide locks back
                this.boltMesh.position.z = this.boltBasePos.z + t * 0.045
              }
              triggerSound('eject')
            } else if (progress < 0.55) {
              // Phase 2: Fresh magazine slides up into grip well
              const t = (progress - 0.22) / 0.33
              animPos.z = 0.10
              animPos.y = -0.08
              animRot.z = -0.25
              if (this.magMesh && this.magBasePos) {
                this.magMesh.position.y = this.magBasePos.y - (1 - t) * 0.35
                this.magMesh.position.z = this.magBasePos.z + (1 - t) * 0.10
              }
              if (t > 0.8) triggerSound('insert')
            } else if (progress < 0.76) {
              // Phase 3: Palm heel slap drives magazine home
              const t = (progress - 0.55) / 0.21
              if (this.magMesh && this.magBasePos) this.magMesh.position.copy(this.magBasePos)
              const slap = Math.sin(t * Math.PI) * 0.04
              animPos.y += slap
              animRot.x -= slap * 1.5
              triggerSound('slap')
            } else if (progress < 0.90) {
              // Phase 4: Slide release snap! Slide flies forward into battery!
              const t = (progress - 0.76) / 0.14
              if (this.boltMesh && this.boltBasePos) {
                this.boltMesh.position.z = this.boltBasePos.z + (1 - t) * 0.045
              }
              const kick = Math.sin(t * Math.PI) * 0.02
              animPos.z += kick
              triggerSound('slide_release')
            } else {
              // Phase 5: Push pistol forward back into two-handed shooting stance
              const t = (progress - 0.90) / 0.10
              if (this.boltMesh && this.boltBasePos) this.boltMesh.position.copy(this.boltBasePos)
              animPos.z = 0.10 * (1 - t)
              animPos.y = -0.08 * (1 - t)
              animRot.z = -0.25 * (1 - t)
            }
            break
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
          animRot.z -= 0.30 * Math.sin(t * Math.PI * 0.5)
          animRot.y += 0.12 * Math.sin(t * Math.PI * 0.5)
          animPos.z += 0.06 * t
          if (this.boltMesh && this.boltBaseRot) {
            this.boltMesh.rotation.z = this.boltBaseRot.z + t * (Math.PI / 2)
          }
        } else if (p < 0.65) {
          const t = (p - 0.35) / 0.30
          animRot.z -= 0.30
          animRot.y += 0.12
          animPos.z += 0.06
          if (this.boltMesh && this.boltBasePos) {
            this.boltMesh.position.z = this.boltBasePos.z + t * 0.15
          }
        } else {
          const t = (p - 0.65) / 0.35
          animRot.z -= 0.30 * (1 - t)
          animRot.y += 0.12 * (1 - t)
          animPos.z += 0.06 * (1 - t)
          if (this.boltMesh && this.boltBasePos && this.boltBaseRot) {
            this.boltMesh.position.z = this.boltBasePos.z + (1 - t) * 0.15
            this.boltMesh.rotation.z = this.boltBaseRot.z + (1 - t) * (Math.PI / 2)
          }
        }
      } else if (this.actionCycleType === 'pump') {
        const pump = Math.sin(p * Math.PI)
        animPos.z += 0.07 * pump
        animPos.y -= 0.03 * pump
        animRot.x += 0.10 * pump
        if (this.boltMesh && this.boltBasePos) {
          this.boltMesh.position.z = this.boltBasePos.z + pump * 0.14
        }
      }

      if (this.actionCycleTimer <= 0) {
        this.actionCycleTimer = 0
        this.actionCycleType = null
        if (this.boltMesh) {
          if (this.boltBasePos) this.boltMesh.position.copy(this.boltBasePos)
          if (this.boltBaseRot) this.boltMesh.rotation.copy(this.boltBaseRot)
        }
      }
    }

    // 3c. Update isolated weapon bobbing & viewmodel transform (zero-jitter pipeline)
    this._updateWeaponBobbing(delta, animPos, animRot)
  }

  _updateWeaponBobbing(delta, animPos, animRot) {
    if (!this.gunMesh) return

    const hSpeed = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2)
    const isMovingOnGround = this.onGround && hSpeed > 0.40

    // 1. Damped weight transition (smooth exponential glide when starting or stopping)
    const targetWeight = isMovingOnGround ? Math.min(1.0, (hSpeed - 0.40) / (this.isWalking ? 2.5 : 4.5)) : 0.0
    this.bobWeight = THREE.MathUtils.damp(this.bobWeight, targetWeight, 8.0, delta)

    // 2. Continuous human stride phase (never hard-reset to prevent snap jitter)
    const strideFreq = this.isWalking ? 5.8 : 7.2
    const prevPhase = this.bobPhase
    if (this.bobWeight > 0.001) {
      this.bobPhase += delta * strideFreq
      if (this.bobPhase > Math.PI * 200) this.bobPhase %= (Math.PI * 2)

      // Synchronized footstep audio at step bottoms
      if (this.bobWeight > 0.35) {
        const isRunning = !this.isWalking && hSpeed > 5.0
        if (Math.sin(prevPhase) < 0 && Math.sin(this.bobPhase) >= 0) {
          sounds.playFootstep(isRunning, false)
        } else if (Math.sin(prevPhase) >= 0 && Math.sin(this.bobPhase) < 0) {
          sounds.playFootstep(isRunning, true)
        }
      }
    }

    // 3. Isolated harmonic locomotion offsets (Natural human stride & sway)
    const dipY  = (Math.cos(this.bobPhase * 2) - 1.0) * 0.5 * 0.018 * this.bobWeight
    const swayX = Math.sin(this.bobPhase) * 0.015 * this.bobWeight
    const swayZ = Math.cos(this.bobPhase) * 0.008 * this.bobWeight

    const rollZ  = -Math.sin(this.bobPhase) * 0.024 * this.bobWeight
    const yawY   = Math.sin(this.bobPhase) * 0.014 * this.bobWeight
    const pitchX = Math.sin(this.bobPhase * 2) * 0.008 * this.bobWeight

    // 4. Smooth cross-fade to idle breathing when stopped
    this.idleTime += delta
    const idleFactor = 1.0 - this.bobWeight
    const idleY = Math.sin(this.idleTime * 1.5) * 0.0012 * idleFactor
    const idleX = Math.cos(this.idleTime * 0.75) * 0.0008 * idleFactor
    const idlePitch = Math.sin(this.idleTime * 1.5) * 0.0015 * idleFactor

    // Direct mathematical wave calculation (Zero lagging lerp chase)
    this.currentBobOffset.set(
      swayX + idleX,
      dipY + idleY,
      swayZ
    )
    this.currentBobRot.set(
      pitchX + idlePitch,
      yawY,
      rollZ
    )

    // 5. Strafe banking (A / D)
    let targetStrafe = 0
    if (this.keys.a && !this.keys.d) targetStrafe = -0.040
    else if (this.keys.d && !this.keys.a) targetStrafe = 0.040
    this.strafeRoll = THREE.MathUtils.damp(this.strafeRoll, targetStrafe, 8.0, delta)

    // 6. Jump lift & Land bounce
    if (!this.onGround) {
      const targetJumpDip = Math.max(-0.016, Math.min(0.024, -this.velocity.y * 0.003))
      this.jumpDip = THREE.MathUtils.damp(this.jumpDip, targetJumpDip, 8.0, delta)
    } else {
      this.jumpDip = THREE.MathUtils.damp(this.jumpDip, 0, 10.0, delta)
    }

    this.currentLandDip = THREE.MathUtils.damp(this.currentLandDip, 0, 9.0, delta)

    // 7. Filtered Mouse Look Inertia (Smooth moving velocity, zero sub-pixel jitter)
    const mx = Math.max(-30, Math.min(30, this._mouseDeltaX))
    const my = Math.max(-30, Math.min(30, this._mouseDeltaY))
    this._mouseDeltaX = 0
    this._mouseDeltaY = 0

    this.mouseVelX = THREE.MathUtils.damp(this.mouseVelX, mx, 14.0, delta)
    this.mouseVelY = THREE.MathUtils.damp(this.mouseVelY, my, 14.0, delta)
    this.mouseVelX = THREE.MathUtils.damp(this.mouseVelX, 0, 7.0, delta)
    this.mouseVelY = THREE.MathUtils.damp(this.mouseVelY, 0, 7.0, delta)

    this.mouseSwayX = -this.mouseVelX * 0.00018
    this.mouseSwayY = this.mouseVelY * 0.00018
    this.mouseSwayRotZ = -this.mouseVelX * 0.00045

    // 8. Recoil spring recovery
    this.gunRecoilOffset.lerp(new THREE.Vector3(0, 0, 0), Math.min(1, delta * 18))
    if (this.gunRecoilOffset.lengthSq() < 0.000005) this.gunRecoilOffset.set(0, 0, 0)
    this.gunRecoilRot.x = THREE.MathUtils.lerp(this.gunRecoilRot.x, 0, delta * 18)
    this.gunRecoilRot.y = THREE.MathUtils.lerp(this.gunRecoilRot.y, 0, delta * 18)
    this.gunRecoilRot.z = THREE.MathUtils.lerp(this.gunRecoilRot.z, 0, delta * 18)

    // 9. Final Isolated Transform Application: defaultPosition + currentOffset
    this.gunMesh.position.copy(this.defaultGunPosition)
      .add(this.currentBobOffset)
      .add(animPos)
      .add(this.gunRecoilOffset)
    this.gunMesh.position.x += this.mouseSwayX - this.strafeRoll * 0.20
    this.gunMesh.position.y += this.mouseSwayY - this.jumpDip - this.currentLandDip
    if (this.crouchProgress > 0.01) {
      this.gunMesh.position.y -= 0.010 * this.crouchProgress
      this.gunMesh.position.z += 0.018 * this.crouchProgress
    }

    this.gunMesh.rotation.set(
      this.defaultGunRotation.x + this.currentBobRot.x + animRot.x + this.gunRecoilRot.x + this.jumpDip * 0.70 - this.currentLandDip * 0.55,
      this.defaultGunRotation.y + this.currentBobRot.y + animRot.y + this.gunRecoilRot.y,
      this.defaultGunRotation.z + this.currentBobRot.z + animRot.z + this.gunRecoilRot.z + this.strafeRoll + this.mouseSwayRotZ
    )

    this.gunMesh.visible = !this.isScoped
  }

  triggerLandDip(fallSpeed = -6.0) {
    if (fallSpeed >= -3.0) return
    const intensity = Math.min(0.035, (Math.abs(fallSpeed) - 3.0) * 0.005)
    this.currentLandDip = intensity
  }

  setScoped(v) {
    this.isScoped = v
    const zoomFov = (this.weaponData?.scopeMultiplier > 1) ? (90 / this.weaponData.scopeMultiplier) : 70
    this.camera.fov = v ? zoomFov : 90
    this.camera.updateProjectionMatrix()
    bus.emit('player:scope', { scoped: v })
  }

  // ── Map Exploration & Debug Mode API ──────────────────────
  setNoclip(enabled) {
    this.isNoclip = enabled
    if (enabled) {
      this.velocity.set(0, 0, 0)
      this.onGround = false
    }
  }

  toggleNoclip() {
    this.setNoclip(!this.isNoclip)
    return this.isNoclip
  }

  teleportTo(x, y, z) {
    this.position.set(x, y, z)
    this.velocity.set(0, 0, 0)
    const eyeHeight = 0.72 - (this.crouchProgress * 0.40)
    this.camera.position.set(x, y + eyeHeight, z)
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

    // Capture mouse movement for Krunker weapon inertia sway and flick roll tilt
    document.addEventListener('mousemove', (e) => {
      if (document.pointerLockElement) {
        this._mouseDeltaX += e.movementX
        this._mouseDeltaY += e.movementY
      }
    })
  }
}
