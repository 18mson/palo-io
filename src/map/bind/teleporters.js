import * as THREE from 'three'

/**
 * Bind One-Way Teleporters System (tpA: A Short -> B Short, tpB: B Long -> A Lobby).
 * Handles detection, teleportation, yaw orientation, audio cues, and 8s cooldown.
 */
export class TeleporterSystem {
  constructor(teleporterDefs = []) {
    this.defs = teleporterDefs || []
    this.cooldowns = new WeakMap()

    // WebAudio sound effect synthesizer
    this.audioCtx = null
  }

  _getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.audioCtx = new AudioCtx()
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {})
    }
    return this.audioCtx
  }

  playTeleportSound() {
    try {
      const ctx = this._getAudioContext()
      if (!ctx) return
      const now = ctx.currentTime

      // 1. Futuristic woosh / sweep
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(140, now)
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.12)
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.38)

      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.4)

      // 2. High-energy electrical zap
      const zap = ctx.createOscillator()
      const zapGain = ctx.createGain()
      zap.type = 'square'
      zap.frequency.setValueAtTime(1200, now)
      zap.frequency.exponentialRampToValueAtTime(300, now + 0.25)
      zapGain.gain.setValueAtTime(0.18, now)
      zapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

      zap.connect(zapGain)
      zapGain.connect(ctx.destination)
      zap.start(now)
      zap.stop(now + 0.25)
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  update(time, player, bots = []) {
    const entities = []
    if (player && player.alive !== false) entities.push({ ent: player, isPlayer: true })
    if (bots && Array.isArray(bots)) {
      for (let i = 0; i < bots.length; i++) {
        const b = bots[i]
        if (b && !b.isDead) entities.push({ ent: b, isPlayer: false })
      }
    }

    for (const { ent, isPlayer } of entities) {
      const pos = ent.position
      if (!pos) continue

      const lastUsed = this.cooldowns.get(ent) || 0
      if (time - lastUsed < 8.0) continue // 8-second cooldown

      for (const tp of this.defs) {
        const [x0, z0, x1, z1] = tp.entryPad
        // Check if inside entry pad
        if (pos.x >= x0 && pos.x <= x1 && pos.z >= z0 && pos.z <= z1) {
          this.executeTeleport(ent, tp, isPlayer)
          this.cooldowns.set(ent, time)
          break
        }
      }
    }
  }

  executeTeleport(entity, tp, isPlayer) {
    const exitX = tp.exitPos[0]
    const exitZ = tp.exitPos[1]
    const exitFloorY = 0.98

    entity.position.set(exitX, exitFloorY, exitZ)
    if (entity.velocity) {
      entity.velocity.set(0, 0, 0)
    }

    // Set yaw orientation matching exitFacing
    let targetYaw = 0
    if (tp.exitFacing === 'north') targetYaw = 0
    else if (tp.exitFacing === 'south') targetYaw = Math.PI
    else if (tp.exitFacing === 'east') targetYaw = -Math.PI * 0.5
    else if (tp.exitFacing === 'west') targetYaw = Math.PI * 0.5

    if (isPlayer && entity.camera) {
      entity.camera.position.set(exitX, exitFloorY + 0.72, exitZ)
      entity.camera.rotation.order = 'YXZ'
      entity.camera.rotation.y = targetYaw
      entity.camera.rotation.z = 0
    } else if (entity.rotation) {
      entity.rotation.y = targetYaw
    }

    this.playTeleportSound()
  }
}
