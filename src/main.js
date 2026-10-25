import './style.css'
import * as THREE             from 'three'
import { GameEngine }          from './core/GameEngine.js'
import { createBindMap }        from './map/bind/bindMap.js'
import { PlayerController } from './player/PlayerController.js'
import { BotSpawner }       from './bot/BotSpawner.js'
import { TracerManager }    from './effects/TracerManager.js'
import { Deathmatch }       from './modes/Deathmatch.js'
import { HUD }              from './ui/HUD.js'
import { AgentSelect }      from './ui/AgentSelect.js'
import { EndScreen }        from './ui/EndScreen.js'
import { bus }              from './core/EventBus.js'
import { getSafeSpawnPoint }  from './core/SpawnSystem.js'
import { AGENT_LIST }         from './agents/AgentRegistry.js'
import { Minimap }            from './ui/Minimap.js'

// ── State ──────────────────────────────────────────────
let engine, activeMap, mapCollision, player, bots, dm, hud
let tracerManager, agentSelect, endScreen, minimap
let currentAgent = null
let currentWeapon = 'vandal'
let spawnPoints  = []
const BOT_COUNT  = 7

// ── Bootstrap ──────────────────────────────────────────
function init() {
  engine        = new GameEngine()
  tracerManager = new TracerManager(engine.scene)
  hud           = new HUD()
  agentSelect   = new AgentSelect()
  endScreen     = new EndScreen()
  bots          = new BotSpawner(engine.scene, tracerManager)

  setupMenuButtons()
  setupGameEvents()
}

// ── Main Menu ──────────────────────────────────────────
function showMainMenu() {
  hideAll()
  document.getElementById('main-menu').classList.add('active')
  engine.stop()
}

function hideAll() {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active')
    s.style.display = ''
  })
}

function setupMenuButtons() {
  document.getElementById('btn-play').addEventListener('click', () => {
    hideAll()
    agentSelect.show(
      (agent, weaponId) => startGame(agent, weaponId, false),
      () => showMainMenu()
    )
  })

  document.getElementById('btn-leaderboard').addEventListener('click', () => {
    alert('Leaderboard is coming in Phase 2 (Supabase integration) 🚀')
  })

  document.getElementById('btn-settings').addEventListener('click', () => {
    alert('Settings coming soon in next update.')
  })
}

// ── Start Game ─────────────────────────────────────────
async function startGame(agent, chosenWeaponId = 'vandal', isExploration = false) {
  currentAgent  = agent
  currentWeapon = chosenWeaponId
  hideAll()

  const gameEl = document.getElementById('game-container')
  gameEl.classList.add('active')

  engine.resize()

  // Load Bind map
  activeMap?.destroy?.()
  activeMap = createBindMap(engine.scene)
  spawnPoints = activeMap.getSpawnPoints()
  mapCollision = activeMap.collision

  // Player with tracer manager and dedicated viewmodel overlay camera
  // Player spawns at attacker spawn (0, 0.98, 48) facing -z (yaw 0). Eye height will be 1.70.
  const startPos = activeMap.attackerSpawns?.[0]?.clone() || new THREE.Vector3(0, 0.98, 48)
  player = new PlayerController(engine.camera, mapCollision, engine.scene, tracerManager, engine.viewmodelCamera)
  player.setAgent(agent)
  player.position.copy(startPos)
  player.camera.position.copy(startPos)
  player.camera.position.y += 0.72
  player.camera.rotation.order = 'YXZ'
  player.camera.rotation.set(0, 0, 0)
  player.equipWeapon(chosenWeaponId, 0)
  player.equipWeapon('classic', 1)
  player.switchSlot(0)

  // Bots with tracer manager and safe spawn points
  const botSpawns = [...(activeMap.defenderSpawns || []), ...spawnPoints.slice(activeMap.attackerSpawns?.length || 0)]
  bots.setTracerManager(tracerManager)
  bots.spawn(BOT_COUNT, botSpawns, player)

  // Expose player hook
  window.player = player

  // HUD
  hud.setAgent(agent)
  hud.setWeaponSlot(0, player.weaponSlots[0]?.def)
  hud.setWeaponSlot(1, player.weaponSlots[1]?.def)
  hud.setActiveSlot(0)
  hud.setHealth(agent.health, 50)

  // Show unified deploy & loadout overlay on entry
  hud.showPlayOverlay({
    title: 'READY TO DEPLOY',
    subtitle: 'CHOOSE WEAPON & CLICK TO PLAY',
    playText: 'CLICK TO PLAY',
    weaponId: chosenWeaponId
  })

  // Game mode
  if (dm) dm.stop()
  dm = new Deathmatch()

  // Minimap (Tactical Minimap & Full Map Modal)
  minimap = new Minimap({
    player,
    bots,
    zones: activeMap?.getZones?.() || [],
    mapBounds: { minX: -60, maxX: 60, minZ: -56, maxZ: 56 },
    engine
  })
  window.minimap = minimap

  // Register update loop
  engine.removeUpdateFn(gameLoop)
  engine.addUpdateFn(gameLoop)
  engine.start()

  dm.start()
}

// ── Game Loop ──────────────────────────────────────────
function gameLoop(dt) {
  if (!player || !bots) return

  const focusPos = engine.overrideCamera ? engine.overrideCamera.position : (player ? player.position : null)
  activeMap?.update?.(performance.now() * 0.001, focusPos, player, bots?.getAll?.())
  tracerManager.update(dt)
  player.update(dt, bots.getAll())
  bots.update(dt, player.position, mapCollision, player.alive, player.velocity)
  dm.update()
  minimap?.update(dt)
}

// ── Game Events ────────────────────────────────────────
function setupGameEvents() {
  const gameEl = document.getElementById('game-container')
  gameEl.addEventListener('mousedown', (e) => {
    if (!engine.isLocked) return
    if (e.button === 0) player?.startFire()
    if (e.button === 2) player?.setScoped(true)
  })

  window.addEventListener('mouseup', (e) => {
    if (e.button === 0) player?.stopFire()
    if (e.button === 2) player?.setScoped(false)
  })

  gameEl.addEventListener('contextmenu', e => e.preventDefault())

  let lastAttacker = 'BOT'
  let lastAttackerHead = false

  // Bot damage with directional angle
  bus.on('player:take_damage', ({ amount, isHead, from, angle }) => {
    lastAttacker = from ?? 'BOT'
    lastAttackerHead = !!isHead
    player?.takeDamage(amount)
    if (angle !== undefined) {
      hud.flashDirectionalDamage(angle, engine.camera.rotation.y)
    }
  })

  // Bot killed another bot in FFA
  bus.on('bot:killed_bot', ({ killer, victim, weapon, isHead }) => {
    hud.addKillFeed(killer, victim, weapon, isHead)
  })

  // Loadout selection on play-overlay
  bus.on('player:select_weapon', ({ weaponId }) => {
    currentWeapon = weaponId
    if (player) {
      player.equipWeapon(weaponId, 0)
      hud.setWeaponSlot(0, player.weaponSlots[0]?.def)
    }
  })

  // Player died → unlock pointer so user can click weapon loadout and click to respawn
  bus.on('player:died', () => {
    hud.addKillFeed(lastAttacker, 'YOU', '', lastAttackerHead)
    engine.unlockPointer()
  })

  // Click to play / respawn
  bus.on('player:click_to_play', () => {
    if (!player) return
    engine.setOverrideCamera(null)
    hud?.show()
    document.getElementById('play-overlay')?.classList.add('hidden')
    document.getElementById('minimap-hud')?.classList.remove('hidden')
    if (!player.alive) {
      const livingBots = bots ? bots.getLiving() : []
      const sp = getSafeSpawnPoint(spawnPoints, livingBots, 22)
      player.respawn(sp)
    }
    hud.setWeaponSlot(0, player.weaponSlots[0]?.def)
    engine.lockPointer()
  })

  // Match end
  bus.on('dm:end', (stats) => {
    endGame(stats)
  })

  function triggerScreenshot() {
    const ok = engine?.captureScreenshot()
    if (ok) {
      const toast = document.getElementById('screenshot-toast')
      if (toast) {
        toast.classList.remove('hidden')
        clearTimeout(toast._timer)
        toast._timer = setTimeout(() => toast.classList.add('hidden'), 2200)
      }
    }
  }

  function triggerRecordClip() {
    const indicator = document.getElementById('record-indicator')
    const countdownEl = document.getElementById('rec-countdown')

    const ok = engine?.recordClip(3000, (remaining) => {
      if (countdownEl) {
        countdownEl.textContent = `${remaining.toFixed(1)}s`
      }
    })

    if (ok) {
      if (indicator) {
        indicator.classList.remove('hidden')
        if (countdownEl) countdownEl.textContent = '3.0s'
      }
    }
  }

  bus.on('record:completed', ({ ext = 'mp4' } = {}) => {
    const indicator = document.getElementById('record-indicator')
    if (indicator) indicator.classList.add('hidden')
    const toast = document.getElementById('record-toast')
    if (toast) {
      toast.textContent = `🎥 3s Clip (${ext.toUpperCase()}) Saved & Ready to Upload!`
      toast.classList.remove('hidden')
      clearTimeout(toast._timer)
      toast._timer = setTimeout(() => toast.classList.add('hidden'), 2800)
    }
  })

  // Screenshot & Record button clicks
  document.getElementById('btn-screenshot')?.addEventListener('click', (e) => {
    e.stopPropagation()
    triggerScreenshot()
  })

  document.getElementById('btn-record')?.addEventListener('click', (e) => {
    e.stopPropagation()
    triggerRecordClip()
  })

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Tab') {
      e.preventDefault()
    }
    // Screenshot shortcut: P, F2, or PrintScreen
    if (e.code === 'KeyP' || e.code === 'F2' || e.code === 'PrintScreen') {
      triggerScreenshot()
    }
    // Record 3-second clip shortcut: F9 or Backslash (\) or BracketRight (])
    // Far on the right side of the keyboard, completely away from WASD/Space gaming keys
    if (e.code === 'F9' || e.code === 'Backslash' || e.code === 'BracketRight') {
      triggerRecordClip()
    }
  })
}

// ── End Game ───────────────────────────────────────────
function endGame(stats) {
  engine.stop()
  engine.unlockPointer()
  engine.removeUpdateFn(gameLoop)
  bots.clearAll()
  tracerManager.clear()
  minimap?.destroy()

  hideAll()
  endScreen.show(
    stats,
    () => startGame(currentAgent, currentWeapon),
    () => showMainMenu()
  )
}

// ── Start ──────────────────────────────────────────────
init()

const CAMERA_PRESETS = {
  a_site:         { pos: [-27, 1.65, -1],  target: [-27, 1.65, -15] }, // View from A-short looking into A-site (north)
  b_site:         { pos: [0, 1.65, -34],   target: [0, 1.65, -15] },   // View from Market looking south
  overview:       { pos: [0, 65, 55],      target: [0, 0, 0] },
  spawn_attacker: { pos: [0, 1.65, 48],    target: [0, 1.65, 0] },
  spawn_defender: { pos: [0, 1.65, -48],   target: [0, 1.65, 0] }
}
window.CAMERA_PRESETS = CAMERA_PRESETS

window.setCameraPreset = (name) => {
  const p = CAMERA_PRESETS[name]
  if (!p || !engine) return false
  if (player) {
    player.teleportTo(p.pos[0], p.pos[1] - 0.72, p.pos[2])
    const dir = new THREE.Vector3().subVectors(new THREE.Vector3(...p.target), new THREE.Vector3(...p.pos)).normalize()
    const yaw = Math.atan2(-dir.x, -dir.z)
    player.camera.rotation.order = 'YXZ'
    player.camera.rotation.set(0, yaw, 0)
  }
  engine.setOverrideCamera(null)
  hud?.show()
  document.getElementById('play-overlay')?.classList.add('hidden')
  document.getElementById('minimap-hud')?.classList.remove('hidden')
  return true
}

const params = new URLSearchParams(window.location.search)
const viewPreset = params.get('view') || params.get('preset')
const autoPlay = params.get('play') || params.get('autostart')
const showTactical = params.get('tactical') === '1'

if (viewPreset && CAMERA_PRESETS[viewPreset]) {
  if (window.history?.replaceState) {
    window.history.replaceState({}, '', window.location.pathname)
  }
  startGame(AGENT_LIST[0], 'vandal', false).then(() => {
    document.getElementById('main-menu')?.classList.remove('active')
    window.setCameraPreset(viewPreset)
  })
} else if (autoPlay) {
  startGame(AGENT_LIST[0], 'vandal', false).then(() => {
    document.getElementById('main-menu')?.classList.remove('active')
    document.getElementById('play-overlay')?.classList.add('hidden')
    if (showTactical) {
      setTimeout(() => minimap?.openTacticalMap(), 300)
    }
  })
} else {
  showMainMenu()
}
