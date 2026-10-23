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
import ascentMap            from './map/maps/ascent.json'

// ── State ──────────────────────────────────────────────
let engine, mapLoader, mapCollision, player, bots, dm, hud
let tracerManager, agentSelect, endScreen
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
      (agent, weaponId) => startGame(agent, weaponId),
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
async function startGame(agent, chosenWeaponId = 'vandal') {
  currentAgent  = agent
  currentWeapon = chosenWeaponId
  hideAll()

  const gameEl = document.getElementById('game-container')
  gameEl.classList.add('active')

  engine.resize()

  // Load map
  await mapLoader.load(ascentMap)
  spawnPoints  = mapLoader.getSpawnPoints(ascentMap)
  mapCollision = new MapCollision(mapLoader.getColliders())

  // Player with tracer manager
  const startPos = getSafeSpawnPoint(spawnPoints, [])
  player = new PlayerController(engine.camera, mapCollision, engine.scene, tracerManager)
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

  // Register update loop
  engine.removeUpdateFn(gameLoop)
  engine.addUpdateFn(gameLoop)
  engine.start()

  dm.start()
}

// ── Game Loop ──────────────────────────────────────────
function gameLoop(dt) {
  if (!player || !bots) return

  tracerManager.update(dt)
  player.update(dt, bots.getAll())
  bots.update(dt, player.position, mapCollision, player.alive, player.velocity)
  dm.update()
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

  // Bot damage with directional angle
  bus.on('player:take_damage', ({ amount, isHead, from, angle }) => {
    player?.takeDamage(amount)
    hud.addKillFeed(from ?? 'BOT', 'YOU', '', isHead)
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

  // Screenshot button click
  document.getElementById('btn-screenshot')?.addEventListener('click', (e) => {
    e.stopPropagation()
    triggerScreenshot()
  })

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Tab') {
      e.preventDefault()
    }
    // Screenshot shortcut: P or F2 or PrintScreen
    if (e.code === 'KeyP' || e.code === 'F2' || e.code === 'PrintScreen') {
      triggerScreenshot()
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
