import * as THREE from 'three'
import { bus } from '../core/EventBus.js'
import { getWeapon } from '../weapons/WeaponRegistry.js'
import { sounds } from '../audio/SoundSystem.js'
import { AgentModelBuilder } from '../characters/AgentModelBuilder.js'
import { createContactShadowTexture } from '../weapons/WeaponTextures.js'

const BOT_SPEED     = 5.8
const SHOOT_RANGE   = 32
const DETECT_RANGE  = 52
const WANDER_RADIUS = 18
const RESPAWN_DELAY = 1200

const STATE = { IDLE: 0, WANDER: 1, CHASE: 2, SHOOT: 3, DEAD: 4 }

let _botIdCounter = 0

/**
 * BotAI — Smart bot with detailed 3D model, wall collision, line-of-sight raycast, and tracers
 */
export class BotAI {
  constructor(scene, spawnPos, agent, weaponId, tracerManager) {
    this.id            = _botIdCounter++
    this.scene         = scene
    this.spawnPos      = spawnPos.clone()
    this.agent         = agent
    this.weaponDef     = getWeapon(weaponId)
    this.tracerManager = tracerManager
    this.name          = `BOT_${['CIPHER','SCOPE','RAMPART','PHANTOM','BLAZE'][this.id % 5]}`

    this.position      = spawnPos.clone()
    this.velocity      = new THREE.Vector3()
    this.rotation      = 0
    this.targetRotation = 0
    this.health        = agent.health
    this.maxHealth     = agent.health

    this.state         = STATE.IDLE
    this.isDead        = false
    this.kills         = 0

    // Shooting
    this.ammo           = this.weaponDef.magazineSize
    this.lastFire       = 0
    this.isReloading    = false
    this.spottedTimer   = 0
    this.burstRemaining = 0
    this.burstCooldown  = 0

    // Wander
    this.wanderTarget   = spawnPos.clone()
    this.wanderTimer    = 0
    this.stuckTimer     = 0
    this.lastStuckPos   = spawnPos.clone()

    // Animation & Jump physics
    this.animTime       = Math.random() * 10
    this.isMoving       = false
    this.flinchTimer    = 0
    this.deathFallTimer = 0
    this.jumpTimer      = 0
    this.jumpCooldown   = 2.5 + Math.random() * 3.0
    this.verticalVel    = 0
    this.isJumping      = false
    this.botLandDip     = 0

    // Model references
    this.mesh       = null
    this.hitboxes   = []
    this.legL       = null
    this.legR       = null
    this.kneeL      = null
    this.kneeR      = null
    this.armL       = null
    this.armR       = null
    this.torso      = null
    this.headGroup  = null
    this.gunGroup   = null
    this.healthBar  = null
    this.recoilKick = 0
    this.isHeadshotDeath = false
    this.isFrozen = false
    this.isPassive = false

    this._buildModel()
  }

  _buildModel() {
    const model = AgentModelBuilder.build(this.agent, this.weaponDef)
    this.mesh      = model.root
    this.hitboxes  = model.hitboxes || []
    for (const hb of this.hitboxes) {
      hb.userData.bot = this
    }
    this.legL      = model.legL
    this.legR      = model.legR
    this.kneeL     = model.kneeL
    this.kneeR     = model.kneeR
    this.armL      = model.armL
    this.armR      = model.armR
    this.torso     = model.torso
    this.headGroup = model.headGroup
    this.gunGroup  = model.gunGroup

    // Disable raycasting on cosmetic gun group
    if (this.gunGroup) {
      this.gunGroup.traverse(child => {
        child.raycast = () => {}
      })
    }

    // Health bar container with dark border above head (Disabled from raycasting)
    const hbBgGeo = new THREE.PlaneGeometry(1.04, 0.14)
    const hbBgMat = new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.85, depthTest: false })
    const hbBg = new THREE.Mesh(hbBgGeo, hbBgMat)
    hbBg.position.y = 1.15
    hbBg.rotation.x = -0.3
    hbBg.raycast = () => {}
    this.mesh.add(hbBg)

    const hbGeo = new THREE.PlaneGeometry(1, 0.1)
    const hbMat = new THREE.MeshBasicMaterial({ color: 0x00ff87, transparent: true, opacity: 0.95, depthTest: false })
    this.healthBar = new THREE.Mesh(hbGeo, hbMat)
    this.healthBar.position.set(0, 1.15, 0.01)
    this.healthBar.rotation.x = -0.3
    this.healthBar.raycast = () => {}
    this.mesh.add(this.healthBar)

    // Floating Valorant Enemy Indicator Diamond (Disabled from raycasting)
    const diaGeo = new THREE.ConeGeometry(0.11, 0.18, 4)
    diaGeo.rotateX(Math.PI) // point downwards toward head
    const diaMat = new THREE.MeshBasicMaterial({ color: 0xff3b52, depthTest: false })
    const diaMesh = new THREE.Mesh(diaGeo, diaMat)
    diaMesh.position.y = 1.28
    diaMesh.raycast = () => {}
    this.mesh.add(diaMesh)

    // Soft ambient occlusion contact shadow disc on the ground directly beneath feet (Disabled from raycasting)
    const shadowGeo = new THREE.PlaneGeometry(0.95, 0.95)
    const shadowMat = new THREE.MeshBasicMaterial({
      map: createContactShadowTexture(),
      transparent: true,
      opacity: 0.65,
      depthWrite: false
    })
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat)
    shadowMesh.rotation.x = -Math.PI / 2
    shadowMesh.position.y = -0.895 // Exactly at ground level (y=0) when root is at y=0.9
    shadowMesh.raycast = () => {}
    this.mesh.add(shadowMesh)

    this.mesh.position.copy(this.position)
    this.scene.add(this.mesh)
  }

  _updateHealthBar() {
    if (!this.healthBar) return
    const ratio = this.health / this.maxHealth
    this.healthBar.scale.x = Math.max(0, ratio)
    const c = new THREE.Color()
    c.setHSL(ratio * 0.33, 1, 0.5)
    this.healthBar.material.color.copy(c)
  }

  update(dt, playerPosition, mapCollision, isPlayerAlive, playerVelocity, allBots = []) {
    if (this.isFrozen) {
      if (this.mesh) this.mesh.position.copy(this.position)
      this._updateHealthBar()
      return
    }

    if (this.isDead) {
      if (this.deathFallTimer > 0) {
        this.deathFallTimer -= dt
        if (this.isHeadshotDeath) {
          // Dynamic Headshot Crumple: Head snaps back violently, knees buckle, body collapses
          if (this.headGroup) this.headGroup.rotation.x = THREE.MathUtils.lerp(this.headGroup.rotation.x, -0.95, dt * 18)
          if (this.torso) {
            this.torso.rotation.x = THREE.MathUtils.lerp(this.torso.rotation.x, -0.45, dt * 15)
            this.torso.rotation.y = THREE.MathUtils.lerp(this.torso.rotation.y, 0.35, dt * 12)
          }
          if (this.kneeL) this.kneeL.rotation.x = THREE.MathUtils.lerp(this.kneeL.rotation.x, 1.45, dt * 15)
          if (this.kneeR) this.kneeR.rotation.x = THREE.MathUtils.lerp(this.kneeR.rotation.x, 1.30, dt * 15)
          if (this.legL) this.legL.rotation.x = THREE.MathUtils.lerp(this.legL.rotation.x, -0.6, dt * 15)
          if (this.legR) this.legR.rotation.x = THREE.MathUtils.lerp(this.legR.rotation.x, -0.4, dt * 15)
          if (this.armL) this.armL.rotation.x = THREE.MathUtils.lerp(this.armL.rotation.x, 0.4, dt * 12)
          if (this.armR) this.armR.rotation.x = THREE.MathUtils.lerp(this.armR.rotation.x, 0.6, dt * 12)
          if (this.mesh) {
            this.mesh.position.y = THREE.MathUtils.lerp(this.mesh.position.y, this.spawnPos.y - 0.70, dt * 14)
            this.mesh.rotation.x = THREE.MathUtils.lerp(this.mesh.rotation.x, -0.65, dt * 10)
          }
        } else {
          // Dynamic Body Shot Knockdown: Torso folds forward, knees collapse, falls to floor
          if (this.torso) this.torso.rotation.x = THREE.MathUtils.lerp(this.torso.rotation.x, 0.85, dt * 16)
          if (this.headGroup) this.headGroup.rotation.x = THREE.MathUtils.lerp(this.headGroup.rotation.x, 0.55, dt * 16)
          if (this.kneeL) this.kneeL.rotation.x = THREE.MathUtils.lerp(this.kneeL.rotation.x, 1.35, dt * 15)
          if (this.kneeR) this.kneeR.rotation.x = THREE.MathUtils.lerp(this.kneeR.rotation.x, 1.20, dt * 15)
          if (this.armL) this.armL.rotation.x = THREE.MathUtils.lerp(this.armL.rotation.x, -0.2, dt * 10)
          if (this.armR) this.armR.rotation.x = THREE.MathUtils.lerp(this.armR.rotation.x, -0.1, dt * 10)
          if (this.mesh) {
            this.mesh.position.y = THREE.MathUtils.lerp(this.mesh.position.y, this.spawnPos.y - 0.72, dt * 14)
            this.mesh.rotation.x = THREE.MathUtils.lerp(this.mesh.rotation.x, 0.85, dt * 10)
          }
        }
      }
      return
    }

    const now = performance.now()

    // ── 1. Target Evaluation (FFA: evaluate player + all other alive bots) ──
    let bestTarget = null
    let bestDist = Infinity

    // Check Player
    if (isPlayerAlive) {
      const pDist = this.position.distanceTo(playerPosition)
      if (pDist < DETECT_RANGE && this._hasLineOfSight(playerPosition, mapCollision)) {
        bestTarget = {
          isPlayer: true,
          position: playerPosition,
          velocity: playerVelocity,
          distance: pDist,
          name: 'YOU',
          entity: null
        }
        bestDist = pDist
      }
    }

    // Check Other Bots
    if (Array.isArray(allBots)) {
      for (const other of allBots) {
        if (!other || other === this || other.isDead) continue
        const bDist = this.position.distanceTo(other.position)
        if (bDist < DETECT_RANGE && bDist < bestDist) {
          if (this._hasLineOfSight(other.position, mapCollision)) {
            bestTarget = {
              isPlayer: false,
              position: other.position,
              velocity: other.velocity,
              distance: bDist,
              name: other.name,
              entity: other
            }
            bestDist = bDist
          }
        }
      }
    }

    this.currentTarget = bestTarget

    if (bestTarget) {
      this.spottedTimer += dt
      if (bestDist < SHOOT_RANGE && this.spottedTimer > 0.28) {
        this.state = STATE.SHOOT
      } else {
        this.state = STATE.CHASE
      }
    } else {
      this.spottedTimer = 0
      if (this.state === STATE.SHOOT || this.state === STATE.CHASE) {
        this.state = STATE.WANDER
      }
    }

    // ── 2. State Actions with Wall Collision ──
    this.isMoving = false

    switch (this.state) {
      case STATE.IDLE:
        this.wanderTimer -= dt * 1000
        if (this.wanderTimer <= 0) {
          this.state = STATE.WANDER
          this._pickWanderTarget(playerPosition)
        }
        break

      case STATE.WANDER:
        this.isMoving = true
        this._moveToward(this.wanderTarget, BOT_SPEED * 0.65, dt, mapCollision)
        if (this.position.distanceTo(this.wanderTarget) < 1.5) {
          this._pickWanderTarget(playerPosition)
          this.state = STATE.IDLE
          this.wanderTimer = 800 + Math.random() * 1500
        }
        // Anti-stuck
        this.stuckTimer += dt * 1000
        if (this.stuckTimer > 1800) {
          if (this.position.distanceTo(this.lastStuckPos) < 0.6) {
            this._pickWanderTarget(playerPosition)
          }
          this.lastStuckPos.copy(this.position)
          this.stuckTimer = 0
        }
        break

      case STATE.CHASE:
        this.isMoving = true
        this._moveToward(bestTarget.position, BOT_SPEED, dt, mapCollision)
        this._aimAt(bestTarget.position)
        break

      case STATE.SHOOT:
        this._strafeAround(bestTarget.position, dt, mapCollision)
        this._aimAt(bestTarget.position)
        this._tryShootTarget(bestTarget, now)
        break
    }

    // ── 3. Smooth Yaw & Pitch Rotation ──
    let diff = this.targetRotation - this.rotation
    while (diff < -Math.PI) diff += Math.PI * 2
    while (diff > Math.PI)  diff -= Math.PI * 2
    this.rotation += diff * Math.min(1, dt * 14)

    // Smooth combat banking lean into turns
    const targetBanking = -diff * 0.18
    this.mesh.rotation.z = THREE.MathUtils.lerp(this.mesh.rotation.z, targetBanking, dt * 10)

    // ── 3b. Natural Bot Jump & Vertical Physics ──
    this.jumpTimer += dt
    if (this.jumpTimer > this.jumpCooldown && (this.state === STATE.CHASE || this.state === STATE.SHOOT) && !this.isJumping) {
      if (Math.random() < 0.45) {
        this.isJumping = true
        this.verticalVel = 5.2
      }
      this.jumpTimer = 0
      this.jumpCooldown = 2.0 + Math.random() * 2.8
    }

    if (this.isJumping) {
      this.verticalVel -= 18 * dt
      this.position.y += this.verticalVel * dt
      if (this.position.y <= this.spawnPos.y) {
        this.position.y = this.spawnPos.y
        this.verticalVel = 0
        this.isJumping = false
        this.botLandDip = 0.08
      }
    } else {
      this.position.y = this.spawnPos.y
    }

    this.mesh.position.copy(this.position)
    this.mesh.rotation.y = this.rotation

    // Pitch head toward target height
    if (bestTarget && (this.headGroup || this.torso)) {
      const dy = (bestTarget.position.y + 0.72) - (this.position.y + 0.84)
      const distFlat = Math.hypot(bestTarget.position.x - this.position.x, bestTarget.position.z - this.position.z)
      const pitch = -Math.atan2(dy, Math.max(0.1, distFlat))
      if (this.headGroup) this.headGroup.rotation.x = THREE.MathUtils.lerp(this.headGroup.rotation.x, pitch * 0.7, dt * 10)
    } else if (this.headGroup) {
      this.headGroup.rotation.x = THREE.MathUtils.lerp(this.headGroup.rotation.x, 0, dt * 6)
    }

    // ── 4. Detailed Character Animation (Stride, Jump Tuck, Lean, Flinch, Breathing) ──
    this._animateBot(dt)

    this._updateHealthBar()
  }

  _hasLineOfSight(targetPos, mapCollision) {
    const eyePos = this.position.clone()
    eyePos.y += 0.84

    const targetEye = targetPos.clone()
    targetEye.y += 0.72

    const dir = new THREE.Vector3().subVectors(targetEye, eyePos)
    const totalDist = dir.length()
    dir.normalize()

    const hit = mapCollision.raycast(eyePos, dir, totalDist - 0.2)
    return hit === null
  }

  _animateBot(dt) {
    this.animTime += dt * (this.isMoving ? 11.5 : 2.5)

    // Damage flinch recovery
    if (this.flinchTimer > 0) {
      this.flinchTimer -= dt
    }

    // Recoil kick recovery
    if (this.recoilKick > 0) {
      this.recoilKick = THREE.MathUtils.lerp(this.recoilKick, 0, dt * 16)
    }

    // Land impact spring recovery
    if (this.botLandDip > 0) {
      this.botLandDip = THREE.MathUtils.lerp(this.botLandDip, 0, dt * 14)
      if (this.botLandDip < 0.001) this.botLandDip = 0
    }

    if (this.isJumping) {
      // Natural aerial jump tuck: knees bent up, thighs slightly forward, arms braced
      if (this.legL) this.legL.rotation.x = THREE.MathUtils.lerp(this.legL.rotation.x, -0.40, dt * 14)
      if (this.legR) this.legR.rotation.x = THREE.MathUtils.lerp(this.legR.rotation.x, -0.32, dt * 14)
      if (this.kneeL) this.kneeL.rotation.x = THREE.MathUtils.lerp(this.kneeL.rotation.x, 0.70, dt * 14)
      if (this.kneeR) this.kneeR.rotation.x = THREE.MathUtils.lerp(this.kneeR.rotation.x, 0.60, dt * 14)
      if (this.armL) this.armL.rotation.x = THREE.MathUtils.lerp(this.armL.rotation.x, -Math.PI / 3, dt * 12)
      if (this.armR) this.armR.rotation.x = THREE.MathUtils.lerp(this.armR.rotation.x, -Math.PI / 3, dt * 12)
      if (this.torso) {
        this.torso.rotation.x = THREE.MathUtils.lerp(this.torso.rotation.x, 0.12, dt * 10)
        this.torso.rotation.z = THREE.MathUtils.lerp(this.torso.rotation.z, 0, dt * 10)
      }
    } else if (this.isMoving) {
      // Fluid Biped Locomotion Cycle:
      const strideL = Math.sin(this.animTime)
      const strideR = Math.sin(this.animTime + Math.PI)

      // Hip forward/back swing
      if (this.legL) this.legL.rotation.x = strideL * 0.56
      if (this.legR) this.legR.rotation.x = strideR * 0.56

      // Knee flexion: natural bend on the recovery swing
      const kneePhaseL = Math.sin(this.animTime - 0.4)
      const kneePhaseR = Math.sin(this.animTime + Math.PI - 0.4)
      if (this.kneeL) this.kneeL.rotation.x = Math.max(0.04, -kneePhaseL * 0.78)
      if (this.kneeR) this.kneeR.rotation.x = Math.max(0.04, -kneePhaseR * 0.78)

      // Torso bobbing & hip sway
      if (this.torso) {
        // Vertical step bounce (two bounces per full gait cycle) minus land impact
        this.torso.position.y = (Math.abs(Math.sin(this.animTime)) * 0.035) - this.botLandDip
        // Pelvic sway opposite to stepping foot
        this.torso.rotation.z = Math.cos(this.animTime) * 0.035
        // Combat forward lean
        this.torso.rotation.x = 0.07
        // Slight torso twist
        this.torso.rotation.y = -strideL * 0.06
      }

      // Arms swing naturally while holding weapon
      if (this.armL) this.armL.rotation.x = -Math.PI / 4 + strideL * 0.15
      if (this.armR) this.armR.rotation.x = -Math.PI / 4 + strideR * 0.10

      // Weapon slight sway with stride
      if (this.gunGroup) {
        this.gunGroup.position.y = (0.44 + Math.abs(Math.sin(this.animTime)) * 0.015) - this.botLandDip
        this.gunGroup.rotation.z = Math.cos(this.animTime) * 0.025
        this.gunGroup.rotation.x = -this.recoilKick
      }
    } else {
      // Idle breathing posture
      const breath = Math.sin(this.animTime) * 0.012
      if (this.legL) this.legL.rotation.x = THREE.MathUtils.lerp(this.legL.rotation.x, 0, dt * 10)
      if (this.legR) this.legR.rotation.x = THREE.MathUtils.lerp(this.legR.rotation.x, 0, dt * 10)
      if (this.kneeL) this.kneeL.rotation.x = THREE.MathUtils.lerp(this.kneeL.rotation.x, 0.04, dt * 10)
      if (this.kneeR) this.kneeR.rotation.x = THREE.MathUtils.lerp(this.kneeR.rotation.x, 0.04, dt * 10)
      if (this.armL) this.armL.rotation.x = THREE.MathUtils.lerp(this.armL.rotation.x, -Math.PI / 4 + breath, dt * 10)
      if (this.armR) this.armR.rotation.x = THREE.MathUtils.lerp(this.armR.rotation.x, -Math.PI / 4 + breath, dt * 10)
      if (this.torso) {
        this.torso.position.y = THREE.MathUtils.lerp(this.torso.position.y, breath - this.botLandDip, dt * 8)
        this.torso.rotation.z = THREE.MathUtils.lerp(this.torso.rotation.z, 0, dt * 10)
        this.torso.rotation.x = THREE.MathUtils.lerp(this.torso.rotation.x, 0, dt * 10)
        this.torso.rotation.y = THREE.MathUtils.lerp(this.torso.rotation.y, 0, dt * 10)
      }
      if (this.gunGroup) {
        this.gunGroup.position.y = THREE.MathUtils.lerp(this.gunGroup.position.y, 0.44 - this.botLandDip, dt * 8)
        this.gunGroup.rotation.z = THREE.MathUtils.lerp(this.gunGroup.rotation.z, 0, dt * 10)
        this.gunGroup.rotation.x = -this.recoilKick
      }
    }

    // Apply flinch jerk if recently hit
    if (this.flinchTimer > 0 && this.torso) {
      this.torso.rotation.x = -0.15 * (this.flinchTimer / 0.18)
    }

    // Tactical reload posture when changing magazines
    if (this.isReloading) {
      if (this.gunGroup) {
        this.gunGroup.position.y = THREE.MathUtils.lerp(this.gunGroup.position.y, 0.48, dt * 10)
        this.gunGroup.rotation.x = THREE.MathUtils.lerp(this.gunGroup.rotation.x, 0.28, dt * 10)
      }
      if (this.armL) {
        this.armL.rotation.x = THREE.MathUtils.lerp(this.armL.rotation.x, -0.15, dt * 10)
        this.armL.rotation.y = THREE.MathUtils.lerp(this.armL.rotation.y, 0.35, dt * 10)
      }
    }
  }

  _moveToward(target, speed, dt, mapCollision) {
    const dir = new THREE.Vector3().subVectors(target, this.position)
    dir.y = 0
    if (dir.length() < 0.1) return
    dir.normalize()

    // ── Safe Movement with MapCollision (No Wall Clipping!) ──
    const disp = dir.clone().multiplyScalar(speed * dt)
    if (mapCollision) {
      const res = mapCollision.resolve(this.position, disp, 0.45, 0.9)
      this.position.copy(res.position)
      // If hit wall while wandering, pick a new path
      if (this.state === STATE.WANDER && res.displacement.x === 0 && res.displacement.z === 0) {
        this._pickWanderTarget()
      }
    } else {
      this.position.add(disp)
    }

    this.targetRotation = Math.atan2(dir.x, dir.z)
  }

  _strafeAround(target, dt, mapCollision) {
    const dir = new THREE.Vector3().subVectors(target, this.position)
    dir.y = 0
    const dist = dir.length()
    const idealDist = 11

    const disp = new THREE.Vector3()

    if (dist > idealDist + 2) {
      dir.normalize()
      disp.addScaledVector(dir, BOT_SPEED * 0.5 * dt)
      this.isMoving = true
    } else if (dist < idealDist - 2) {
      dir.normalize()
      disp.addScaledVector(dir, -BOT_SPEED * 0.4 * dt)
      this.isMoving = true
    }

    const perp = new THREE.Vector3(-dir.z, 0, dir.x).normalize()
    const side = Math.sin(performance.now() * 0.002 + this.id * 2)
    disp.addScaledVector(perp, side * BOT_SPEED * 0.45 * dt)
    if (Math.abs(side) > 0.2) this.isMoving = true

    // Resolve with wall collision
    if (mapCollision && disp.lengthSq() > 0) {
      const res = mapCollision.resolve(this.position, disp, 0.45, 0.9)
      this.position.copy(res.position)
    } else {
      this.position.add(disp)
    }
  }

  _aimAt(target) {
    const dir = new THREE.Vector3().subVectors(target, this.position)
    this.targetRotation = Math.atan2(dir.x, dir.z)
  }

  _pickWanderTarget(playerPosition = null) {
    // 70% of the time, patrol towards map center / player vicinity for non-stop action
    if (Math.random() < 0.7) {
      const targetBase = playerPosition ? playerPosition : new THREE.Vector3(0, this.spawnPos.y, 0)
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 22,
        0,
        (Math.random() - 0.5) * 22
      )
      this.wanderTarget.copy(targetBase).add(offset)
      this.wanderTarget.y = this.spawnPos.y
    } else {
      const angle = Math.random() * Math.PI * 2
      const r     = Math.random() * WANDER_RADIUS
      this.wanderTarget.set(
        this.position.x + Math.cos(angle) * r,
        this.spawnPos.y,
        this.position.z + Math.sin(angle) * r
      )
    }
  }

  _tryShootTarget(targetInfo, now) {
    if (this.isPassive || this.isFrozen) return
    if (this.isReloading) return
    if (this.ammo <= 0) { this._reload(); return }

    if (this.burstCooldown > 0) {
      this.burstCooldown -= 0.016
      return
    }

    const interval = 1000 / (this.weaponDef.fireRate * 0.55)
    if (now - this.lastFire < interval) return

    this.lastFire = now
    this.ammo--
    this.recoilKick = 0.16

    const muzzlePos = this.position.clone()
    muzzlePos.y += 0.85
    const fwd = new THREE.Vector3(Math.sin(this.rotation), 0, Math.cos(this.rotation)).normalize()
    const right = new THREE.Vector3(fwd.z, 0, -fwd.x)
    muzzlePos.addScaledVector(fwd, 0.45).addScaledVector(right, 0.25)

    const targetPos = targetInfo.position.clone()
    targetPos.y += targetInfo.isPlayer ? 0.72 : 0.85

    const pSpeed = targetInfo.velocity ? Math.sqrt(targetInfo.velocity.x ** 2 + targetInfo.velocity.z ** 2) : 0
    const spreadAmount = 0.55 + pSpeed * 0.08
    const spread = new THREE.Vector3(
      (Math.random() - 0.5) * spreadAmount,
      (Math.random() - 0.5) * spreadAmount * 0.4,
      (Math.random() - 0.5) * spreadAmount
    )
    const bulletEnd = targetPos.clone().add(spread)

    if (this.tracerManager) {
      this.tracerManager.addTracer(muzzlePos, bulletEnd, true)
    }

    sounds.playShoot(this.weaponDef.id)

    const dist = this.position.distanceTo(targetInfo.position)
    const hitTolerance = 0.75 + (dist < 10 ? 0.35 : 0)
    const isHit = bulletEnd.distanceTo(targetPos) < hitTolerance

    if (isHit) {
      const isHead = Math.random() < 0.12
      const rawDmg = isHead ? this.weaponDef.damageHead : this.weaponDef.damageBody

      if (targetInfo.isPlayer) {
        // Damage player
        const dmg = rawDmg * 0.32
        const angleToBot = Math.atan2(this.position.x - targetInfo.position.x, this.position.z - targetInfo.position.z)
        bus.emit('bot:shot_player', {
          botId: this.id,
          damage: dmg,
          isHead,
          botName: this.name,
          botPos: this.position.clone(),
          angle: angleToBot
        })
      } else if (targetInfo.entity && !targetInfo.entity.isDead) {
        // Damage other bot in FFA deathmatch
        const otherBot = targetInfo.entity
        const dmg = rawDmg * 0.45
        otherBot.takeDamage(dmg, isHead, this.name)
      }
    }

    this.burstRemaining++
    if (this.burstRemaining >= 3 + Math.floor(Math.random() * 2)) {
      this.burstRemaining = 0
      this.burstCooldown = 0.35 + Math.random() * 0.3
    }
  }

  _reload() {
    if (this.isReloading) return
    this.isReloading = true
    setTimeout(() => {
      this.ammo = this.weaponDef.magazineSize
      this.isReloading = false
    }, this.weaponDef.reloadTime * 0.8)
  }

  takeDamage(amount, isHead, attackerName = null) {
    if (this.isDead) return
    this.health -= amount
    this.flinchTimer = 0.18

    if (this.health <= 0) {
      this.health = 0
      this._die(attackerName, isHead)
    } else {
      this.state = STATE.CHASE
    }
  }

  _die(attackerName = null, isHead = false) {
    if (this.isDead) return
    this.isDead = true
    this.isHeadshotDeath = !!isHead
    this.deathTime = performance.now()
    this.deathFallTimer = 0.65
    this.state = STATE.DEAD

    // Emit event with attacker info (if killer was another bot or player)
    if (attackerName && attackerName !== 'YOU') {
      bus.emit('bot:killed_bot', {
        killer: attackerName,
        victim: this.name,
        weapon: this.weaponDef.id,
        isHead
      })
    }

    bus.emit('bot:died', { botId: this.id, botName: this.name, killer: attackerName, isHead })
    setTimeout(() => {
      if (this.mesh) this.mesh.visible = false
    }, 650)

    setTimeout(() => {
      if (this.isDead) this._respawn()
    }, 1200)
  }

  _respawn() {
    if (this.onGetSafeSpawn) {
      const safePos = this.onGetSafeSpawn()
      this.position.copy(safePos)
      this.spawnPos.copy(safePos)
    } else {
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        0,
        (Math.random() - 0.5) * 6
      )
      this.position.copy(this.spawnPos).add(offset)
    }
    this.position.y = this.spawnPos.y
    this.mesh.position.copy(this.position)

    this._pickWanderTarget()
    this.health      = this.maxHealth
    this.isDead      = false
    this.isHeadshotDeath = false
    this.deathTime   = 0
    this.state       = STATE.WANDER
    this.ammo        = this.weaponDef.magazineSize
    this.isReloading = false
    this.mesh.rotation.set(0, this.rotation, 0)
    this.mesh.visible = true
    this.deathFallTimer = 0
    this.flinchTimer = 0
    this.recoilKick = 0

    // Reset joint positions and rotations to natural ready pose
    if (this.headGroup) this.headGroup.rotation.set(0, 0, 0)
    if (this.torso) {
      this.torso.rotation.set(0, 0, 0)
      this.torso.position.set(0, 0, 0)
    }
    if (this.kneeL) this.kneeL.rotation.set(0.04, 0, 0)
    if (this.kneeR) this.kneeR.rotation.set(0.04, 0, 0)
    if (this.legL) this.legL.rotation.set(0, 0, 0)
    if (this.legR) this.legR.rotation.set(0, 0, 0)
    if (this.armL) this.armL.rotation.set(-Math.PI / 4, 0, Math.PI / 12)
    if (this.armR) this.armR.rotation.set(-Math.PI / 4, 0, -Math.PI / 12)
    if (this.gunGroup) {
      this.gunGroup.position.set(0.18, 0.44, 0.34)
      this.gunGroup.rotation.set(0, 0, 0)
    }

    this._updateHealthBar()
    bus.emit('bot:respawned', { botId: this.id })
  }

  destroy() {
    this.scene.remove(this.mesh)
  }
}
