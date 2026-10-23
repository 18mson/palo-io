import { bus } from '../core/EventBus.js'

const KILL_GOAL  = 30
const TIME_LIMIT = 5 * 60 * 1000  // 5 minutes in ms

/**
 * Deathmatch — game mode logic
 * First to KILL_GOAL kills OR most kills when timer expires
 */
export class Deathmatch {
  constructor() {
    this.playerKills  = 0
    this.playerDeaths = 0
    this.botKillsTotal = 0  // bots kill player
    this.startTime    = 0
    this.timeLimit    = TIME_LIMIT
    this.active       = false
    this.finished     = false

    this._setupListeners()
  }

  _setupListeners() {
    // Bot died
    bus.on('bot:died', ({ botId, botName, killer }) => {
      if (!this.active) return
      // Only reward player kill if the killer was YOU (or direct player damage)
      if (killer === 'YOU') {
        this.playerKills++
        bus.emit('dm:kill', { killer: 'YOU', victim: botName, kills: this.playerKills, goal: KILL_GOAL })
        this._checkWin()
      }
    })

    // Bot shot player
    bus.on('bot:shot_player', ({ botId, damage, isHead, botName }) => {
      if (!this.active) return
      bus.emit('player:take_damage', { amount: damage, isHead, from: botName })
    })

    // Player died
    bus.on('player:died', () => {
      if (!this.active) return
      this.playerDeaths++
      bus.emit('dm:player_died', { deaths: this.playerDeaths })
    })

    // Player shot a bot → relay damage with attacker 'YOU'
    bus.on('player:shot_bot', ({ bot, damage, isHead, point }) => {
      if (!this.active) return
      bot.takeDamage(damage, isHead, 'YOU')
      bus.emit('dm:hit', { damage, isHead, point })
    })
  }

  start() {
    this.playerKills  = 0
    this.playerDeaths = 0
    this.botKillsTotal = 0
    this.startTime    = performance.now()
    this.active       = true
    this.finished     = false
    bus.emit('dm:started')
  }

  stop() {
    this.active   = false
    this.finished = true
  }

  _checkWin() {
    if (this.playerKills >= KILL_GOAL) {
      this._end('win')
    }
  }

  _end(result) {
    if (this.finished) return
    this.active   = false
    this.finished = true
    const elapsed = performance.now() - this.startTime
    bus.emit('dm:end', {
      result,
      kills:  this.playerKills,
      deaths: this.playerDeaths,
      kd:     +(this.playerKills / Math.max(1, this.playerDeaths)).toFixed(2),
      elapsed: Math.floor(elapsed / 1000),
    })
  }

  update() {
    if (!this.active) return
    const elapsed = performance.now() - this.startTime
    const remaining = Math.max(0, this.timeLimit - elapsed)
    bus.emit('dm:tick', { remaining, kills: this.playerKills, goal: KILL_GOAL })

    if (remaining <= 0) {
      // Time's up — player wins if they have kills
      this._end(this.playerKills > 0 ? 'win' : 'lose')
    }
  }

  getStats() {
    return {
      kills:  this.playerKills,
      deaths: this.playerDeaths,
      kd:     +(this.playerKills / Math.max(1, this.playerDeaths)).toFixed(2),
    }
  }
}
