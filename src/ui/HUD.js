import { bus } from '../core/EventBus.js'
import { sounds } from '../audio/SoundSystem.js'

/**
 * HUD — In-game DOM overlay manager with unified play & loadout overlay
 */
export class HUD {
  constructor() {
    this.elTimer          = document.getElementById('hud-timer')
    this.elKills          = document.getElementById('hud-kills')
    this.elHealth         = document.getElementById('hud-health-value')
    this.elHealthBar      = document.getElementById('hud-health-bar')
    this.elShield         = document.getElementById('hud-shield-value')
    this.elAmmoMag        = document.getElementById('hud-ammo-mag')
    this.elReload         = document.getElementById('hud-reload-label')
    this.elAgentIcon      = document.getElementById('hud-agent-icon')
    this.elAgentName      = document.getElementById('hud-agent-name')
    this.elSlot1Name      = document.getElementById('slot-1-name')
    this.elSlot2Name      = document.getElementById('slot-2-name')
    this.elSlot1          = document.getElementById('slot-1')
    this.elSlot2          = document.getElementById('slot-2')
    this.elHitInd         = document.getElementById('hit-indicator')
    this.elDamageVig      = document.getElementById('damage-vignette')
    this.killFeedEl       = document.getElementById('kill-feed')
    this.elHitmarker      = document.getElementById('hitmarker')
    this.elDmgIndicator   = document.getElementById('damage-indicator')
    this.elSpawnShield    = document.getElementById('spawn-shield-badge')

    // Valorant Kill Banner & Multi-Kill HUD
    this.elKillBanner     = document.getElementById('kill-banner')
    this.elKbBadge        = document.getElementById('kb-streak-badge')
    this.elKbVictim       = document.getElementById('kb-victim')
    this.elKbStars        = document.getElementById('kb-stars')
    this.elKillVig        = document.getElementById('kill-vignette')
    this.killStreak       = 0
    this.lastKillTime     = 0
    this.killBannerTimer  = null

    // Unified Play & Loadout Overlay
    this.elPlayOverlay    = document.getElementById('play-overlay')
    this.elPoTitle        = document.getElementById('po-title')
    this.elPoSubtitle     = document.getElementById('po-subtitle')
    this.elPoPlayBtn      = document.getElementById('po-play-btn')
    this.elPoPlayText     = document.getElementById('po-play-text')
    this.elWeaponPicker   = document.getElementById('death-weapon-picker')

    this.maxHealth        = 100
    this._setupListeners()
  }

  setAgent(agent) {
    this.maxHealth               = agent.health
    this.elAgentIcon.textContent = agent.emoji
    this.elAgentName.textContent = agent.name
    this.elAgentIcon.style.background = agent.color + '33'
    this.elAgentIcon.style.borderColor = agent.color + '66'
  }

  setWeaponSlot(slot, weapon) {
    if (slot === 0) {
      this.elSlot1Name.textContent = weapon ? weapon.shortName : '—'
      // Highlight weapon in loadout picker
      if (this.elWeaponPicker && weapon) {
        this.elWeaponPicker.querySelectorAll('.death-weapon-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.weapon === weapon.id)
        })
      }
    }
    if (slot === 1) {
      this.elSlot2Name.textContent = weapon ? weapon.shortName : '—'
    }
  }

  hide() {
    const top = document.getElementById('hud-top')
    const bottom = document.getElementById('hud-bottom')
    if (top) top.style.display = 'none'
    if (bottom) bottom.style.display = 'none'
  }

  show() {
    const top = document.getElementById('hud-top')
    const bottom = document.getElementById('hud-bottom')
    if (top) top.style.display = ''
    if (bottom) bottom.style.display = ''
  }

  _setupListeners() {
    bus.on('player:damaged', ({ health, shield }) => {
      this.setHealth(health, shield)
      this._flashDamage()
    })

    bus.on('player:spawn_shield', ({ active }) => {
      if (this.elSpawnShield) {
        this.elSpawnShield.classList.toggle('hidden', !active)
      }
    })

    bus.on('player:respawn', ({ health }) => {
      this.setHealth(health, 50)
      this.hidePlayOverlay()
    })

    bus.on('player:died', (data) => {
      this.showPlayOverlay({
        title: 'ELIMINATED',
        subtitle: 'CHOOSE WEAPON & CLICK TO RESPAWN',
        playText: 'CLICK TO RESPAWN',
        weaponId: data?.currentWeaponId ?? 'vandal'
      })
    })

    bus.on('controls:locked', () => {
      this.hidePlayOverlay()
    })

    bus.on('controls:unlocked', () => {
      // If game container is active, show pause / deploy overlay
      const gameContainer = document.getElementById('game-container')
      if (gameContainer && gameContainer.classList.contains('active')) {
        this.showPlayOverlay({
          title: 'TACTICAL LOADOUT',
          subtitle: 'CHOOSE WEAPON & CLICK TO DEPLOY',
          playText: 'CLICK TO PLAY',
        })
      }
    })

    // Loadout weapon selection click
    if (this.elWeaponPicker) {
      this.elWeaponPicker.addEventListener('click', (e) => {
        const btn = e.target.closest('.death-weapon-btn')
        if (btn) {
          this.elWeaponPicker.querySelectorAll('.death-weapon-btn').forEach(b => b.classList.remove('active'))
          btn.classList.add('active')
          bus.emit('player:select_weapon', { weaponId: btn.dataset.weapon })
        }
      })
    }

    // Click to Play / Respawn Zone
    if (this.elPoPlayBtn) {
      this.elPoPlayBtn.addEventListener('click', () => {
        bus.emit('player:click_to_play')
      })
    }

    bus.on('weapon:fire', ({ mag }) => {
      this.setAmmo(mag)
    })

    bus.on('weapon:switch', ({ slot, weapon, mag }) => {
      this.setAmmo(mag)
      this.setActiveSlot(slot)
    })

    bus.on('weapon:reload_start', () => {
      this.elReload.textContent = 'RELOADING...'
    })

    bus.on('weapon:reload_done', ({ mag }) => {
      this.setAmmo(mag)
      this.elReload.textContent = ''
    })

    bus.on('dm:tick', ({ remaining, kills, goal }) => {
      this.setTimer(remaining)
      this.setKills(kills, goal)
    })

    bus.on('dm:kill', ({ killer, victim, kills, goal, isHead }) => {
      this.addKillFeed(killer, victim, '', isHead)
      this.setKills(kills, goal)
      if (killer === 'YOU') {
        this.triggerKillBanner(victim, isHead)
      }
    })

    bus.on('dm:hit', ({ isHead }) => {
      this.flashHitIndicator(isHead)
      this.flashHitmarker(isHead)
    })

    bus.on('player:scope', ({ scoped }) => {
      const scopeEl = document.getElementById('sniper-scope')
      if (scopeEl) scopeEl.classList.toggle('active', scoped)
      document.getElementById('crosshair').style.opacity = scoped ? 0 : 1
    })
  }

  showPlayOverlay({ title = 'ELIMINATED', subtitle = 'CHOOSE WEAPON & CLICK TO RESPAWN', playText = 'CLICK TO PLAY', weaponId } = {}) {
    if (!this.elPlayOverlay) return
    this.elPoTitle.textContent    = title
    this.elPoSubtitle.textContent = subtitle
    this.elPoPlayText.textContent = playText

    if (weaponId && this.elWeaponPicker) {
      this.elWeaponPicker.querySelectorAll('.death-weapon-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.weapon === weaponId)
      })
    }

    this.elPlayOverlay.classList.remove('hidden')
  }

  hidePlayOverlay() {
    if (this.elPlayOverlay) {
      this.elPlayOverlay.classList.add('hidden')
    }
  }

  flashHitmarker(isHead) {
    if (!this.elHitmarker) return
    this.elHitmarker.classList.toggle('headshot', isHead)
    this.elHitmarker.classList.remove('active')
    void this.elHitmarker.offsetWidth
    this.elHitmarker.classList.add('active')
  }

  flashDirectionalDamage(angleRad, playerYaw) {
    if (!this.elDmgIndicator) return
    const relAngle = (angleRad - playerYaw) * (180 / Math.PI)
    this.elDmgIndicator.style.transform = `translate(-50%, -50%) rotate(${relAngle}deg)`
    this.elDmgIndicator.classList.remove('flash')
    void this.elDmgIndicator.offsetWidth
    this.elDmgIndicator.classList.add('flash')
  }

  setHealth(hp, shield) {
    hp = Math.max(0, hp)
    this.elHealth.textContent    = Math.ceil(hp)
    this.elShield.textContent    = `🛡 ${Math.ceil(shield ?? 0)}`
    const pct = (hp / this.maxHealth) * 100
    this.elHealthBar.style.width = pct + '%'
    this.elHealthBar.style.background =
      pct > 50 ? '#00ff87' :
      pct > 25 ? '#ffb347' : '#ff4655'
  }

  setAmmo(mag) {
    this.elAmmoMag.textContent = mag
  }

  setTimer(ms) {
    const s  = Math.ceil(ms / 1000)
    const m  = Math.floor(s / 60)
    const ss = String(s % 60).padStart(2, '0')
    this.elTimer.textContent = `${m}:${ss}`
    if (s <= 30) this.elTimer.style.color = '#ff4655'
    else          this.elTimer.style.color = ''
  }

  setKills(kills, goal) {
    this.elKills.textContent = `${kills} / ${goal}`
  }

  setActiveSlot(slot) {
    this.elSlot1.classList.toggle('active', slot === 0)
    this.elSlot2.classList.toggle('active', slot === 1)
  }

  addKillFeed(killer, victim, weapon = '', isHead = false) {
    const entry = document.createElement('div')
    entry.className = `kill-entry${isHead ? ' headshot' : ''}`
    entry.innerHTML = `
      <span class="kill-killer">${killer}</span>
      <span class="kill-icon">${isHead ? '💀' : '⚡'}</span>
      <span class="kill-victim">${victim}</span>
    `
    this.killFeedEl.prepend(entry)
    setTimeout(() => entry.remove(), 4000)

    while (this.killFeedEl.children.length > 5) {
      this.killFeedEl.lastChild.remove()
    }
  }

  triggerKillBanner(victim, isHead = false) {
    if (!this.elKillBanner) return

    const now = performance.now()
    if (now - this.lastKillTime < 6000) {
      this.killStreak++
    } else {
      this.killStreak = 1
    }
    this.lastKillTime = now

    // Play synthesized kill audio with escalating musical chords
    sounds.playKill(this.killStreak, isHead)

    // Set badge text based on streak and headshot status
    let badgeText = isHead ? 'HEADSHOT' : 'ELIMINATED'
    if (this.killStreak === 2) badgeText = 'DOUBLE KILL'
    else if (this.killStreak === 3) badgeText = 'TRIPLE KILL'
    else if (this.killStreak === 4) badgeText = 'QUADRA KILL'
    else if (this.killStreak >= 5) badgeText = 'ACE!'

    if (this.elKbBadge) {
      this.elKbBadge.textContent = badgeText
    }

    if (this.elKbVictim) {
      this.elKbVictim.textContent = victim.toUpperCase()
    }

    // Light up diamond stars according to multi-kill streak
    if (this.elKbStars) {
      const stars = this.elKbStars.children
      for (let i = 0; i < stars.length; i++) {
        stars[i].classList.toggle('active', i < Math.min(this.killStreak, 5))
      }
    }

    // Apply animation & theme classes
    this.elKillBanner.classList.remove('hidden', 'slam', 'headshot', 'ace')
    if (isHead) this.elKillBanner.classList.add('headshot')
    if (this.killStreak >= 5) this.elKillBanner.classList.add('ace')
    void this.elKillBanner.offsetWidth // Force reflow to trigger CSS slam keyframe
    this.elKillBanner.classList.add('slam')

    // Screen edge flash vignette
    if (this.elKillVig) {
      this.elKillVig.className = 'kill-vignette'
      void this.elKillVig.offsetWidth
      this.elKillVig.classList.add(isHead ? 'flash-headshot' : 'flash')
    }

    // Auto-hide after 2.6s
    if (this.killBannerTimer) clearTimeout(this.killBannerTimer)
    this.killBannerTimer = setTimeout(() => {
      if (this.elKillBanner) {
        this.elKillBanner.classList.add('hidden')
        this.elKillBanner.classList.remove('slam')
      }
    }, 2600)
  }

  flashHitIndicator(isHead) {
    this.elHitInd.style.borderColor = isHead ? '#C89B3C' : '#FF4655'
    this.elHitInd.classList.remove('flash')
    void this.elHitInd.offsetWidth
    this.elHitInd.classList.add('flash')
  }

  _flashDamage() {
    this.elDamageVig.classList.add('hurt')
    clearTimeout(this._damageTimer)
    this._damageTimer = setTimeout(() => {
      this.elDamageVig.classList.remove('hurt')
    }, 600)
  }
}
