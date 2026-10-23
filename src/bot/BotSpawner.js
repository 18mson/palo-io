import { BotAI } from './BotAI.js'
import { AGENT_LIST } from '../agents/AgentRegistry.js'
import { getSafeSpawnPoint } from '../core/SpawnSystem.js'
import * as THREE from 'three'

const BOT_CONFIGS = [
  { agentId: 'cipher',  weapon: 'spectre'  },
  { agentId: 'scope',   weapon: 'operator' },
  { agentId: 'rampart', weapon: 'odin'     },
  { agentId: 'phantom', weapon: 'bucky'    },
  { agentId: 'blaze',   weapon: 'vandal'   },
]

/**
 * BotSpawner — manages all bots in the scene with tracer support and safe spawn selection
 */
export class BotSpawner {
  constructor(scene, tracerManager) {
    this.scene         = scene
    this.tracerManager = tracerManager
    this.bots          = []
    this.spawnPoints   = []
    this.playerRef     = null
  }

  setTracerManager(tm) {
    this.tracerManager = tm
  }

  spawn(count, spawnPoints, player = null) {
    this.clearAll()
    this.spawnPoints = spawnPoints
    this.playerRef   = player
    const agentList  = AGENT_LIST

    for (let i = 0; i < count; i++) {
      const cfg    = BOT_CONFIGS[i % BOT_CONFIGS.length]
      const agent  = agentList.find(a => a.id === cfg.agentId) ?? agentList[0]

      const activeEntities = []
      if (this.playerRef) activeEntities.push(this.playerRef)
      for (const b of this.bots) activeEntities.push(b)

      const pos = getSafeSpawnPoint(this.spawnPoints, activeEntities, 18)
      const bot = new BotAI(this.scene, pos, agent, cfg.weapon, this.tracerManager)

      // Provide dynamic safe spawn locator when bot dies and respawns
      bot.onGetSafeSpawn = () => {
        const currentActive = []
        if (this.playerRef) currentActive.push(this.playerRef)
        for (const b of this.bots) {
          if (b !== bot && !b.isDead) currentActive.push(b)
        }
        return getSafeSpawnPoint(this.spawnPoints, currentActive, 20)
      }

      this.bots.push(bot)
    }
    return this.bots
  }

  update(dt, playerPosition, mapCollision, isPlayerAlive, playerVelocity) {
    const now = performance.now()
    for (const bot of this.bots) {
      bot.update(dt, playerPosition, mapCollision, isPlayerAlive, playerVelocity, this.bots)

      // Watchdog: If bot died and wasn't revived after 2.2s, force respawn
      if (bot.isDead && bot.deathTime > 0 && (now - bot.deathTime > 2200)) {
        bot._respawn()
      }
    }
  }

  getAll()    { return this.bots }
  getLiving() { return this.bots.filter(b => !b.isDead) }

  setFrozen(val) {
    for (const b of this.bots) {
      b.isFrozen = val
    }
  }

  setPassive(val) {
    for (const b of this.bots) {
      b.isPassive = val
    }
  }

  respawnAll() {
    for (const b of this.bots) {
      b.isDead = false
      b.health = b.maxHealth
      b._respawn()
    }
  }

  clearAll() {
    for (const bot of this.bots) bot.destroy()
    this.bots = []
  }
}
