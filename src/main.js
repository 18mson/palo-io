import './style.css'
import { GameEngine }       from './core/GameEngine.js'
import { MapLoader }        from './map/MapLoader.js'
import { MapCollision }     from './map/MapCollision.js'
import { PlayerController } from './player/PlayerController.js'
import { BotSpawner }       from './bot/BotSpawner.js'
import { TracerManager }    from './effects/TracerManager.js'
import { Deathmatch }       from './modes/Deathmatch.js'
import { HUD }              from './ui/HUD.js'
import { AgentSelect }      from './ui/AgentSelect.js'
import { EndScreen }        from './ui/EndScreen.js'
import { bus }              from './core/EventBus.js'
import { getSafeSpawnPoint }  from './core/SpawnSystem.js'
import { MapExplorer }        from './debug/MapExplorer.js'
import ascentMap            from './map/maps/ascent.json'

// ── State ──────────────────────────────────────────────
let engine, mapLoader, mapCollision, player, bots, dm, hud
let tracerManager, agentSelect, endScreen, mapExplorer
let currentAgent = null
let currentWeapon = 'vandal'
let spawnPoints  = []
const BOT_COUNT  = 7

// ── Bootstrap ──────────────────────────────────────────
function init() {
  engine        = new GameEngine()
  tracerManager = new TracerManager(engine.scene)
  mapLoader     = new MapLoader(engine.scene)
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

  document.getElementById('btn-explore').addEventListener('click', () => {
    hideAll()
    agentSelect.show(
      (agent, weaponId) => startGame(agent, weaponId, true),
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

  // Load map
  await mapLoader.load(ascentMap)
  spawnPoints  = mapLoader.getSpawnPoints(ascentMap)
  mapCollision = new MapCollision(mapLoader.getColliders(), mapLoader.getRamps())

  // Player with tracer manager and dedicated viewmodel overlay camera
  const startPos = getSafeSpawnPoint(spawnPoints, [])
  player = new PlayerController(engine.camera, mapCollision, engine.scene, tracerManager, engine.viewmodelCamera)
  player.setAgent(agent)
  player.position.copy(startPos)
  player.camera.position.copy(startPos)
  player.camera.position.y += 0.72
  player.equipWeapon(chosenWeaponId, 0)
  player.equipWeapon('classic', 1)
  player.switchSlot(0)

  // Bots with tracer manager and tactical safe spawn points
  bots.setTracerManager(tracerManager)
  bots.spawn(BOT_COUNT, spawnPoints, player)

  // Map Explorer & Debug Manager (Always available via F1 / F3, active by default in exploration mode)
  mapExplorer = new MapExplorer(engine.scene, engine.camera, player, mapLoader, bots)
  if (isExploration) {
    mapExplorer.enable()
  } else {
    mapExplorer.disable()
  }

  // HUD
  hud.setAgent(agent)
  hud.setWeaponSlot(0, player.weaponSlots[0]?.def)
  hud.setWeaponSlot(1, player.weaponSlots[1]?.def)
  hud.setActiveSlot(0)
  hud.setHealth(agent.health, 50)

  // Show unified deploy & loadout overlay on entry
  hud.showPlayOverlay({
    title: isExploration ? 'MODE EKSPLORASI & DEBUG' : 'READY TO DEPLOY',
    subtitle: isExploration ? 'TERBANG BEBAS [F] · INSPECT KOLISI [H] · TELEPORT [1-0]' : 'CHOOSE WEAPON & CLICK TO PLAY',
    playText: isExploration ? 'MULAI EKSPLORASI' : 'CLICK TO PLAY',
    weaponId: chosenWeaponId
  })

  // Game mode
  if (dm) dm.stop()
  dm = new Deathmatch()

  // Register update loop
  engine.removeUpdateFn(gameLoop)
  engine.addUpdateFn(gameLoop)
  engine.start()

  dm.start()
}

// ── Game Loop ──────────────────────────────────────────
function gameLoop(dt) {
  if (!player || !bots) return

  mapLoader.update(performance.now() * 0.001)
  tracerManager.update(dt)
  player.update(dt, bots.getAll())
  bots.update(dt, player.position, mapCollision, player.alive, player.velocity)
  dm.update()
  mapExplorer?.update()
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

  hideAll()
  endScreen.show(
    stats,
    () => startGame(currentAgent, currentWeapon),
    () => showMainMenu()
  )
}

// ── Start ──────────────────────────────────────────────
init()
showMainMenu()
