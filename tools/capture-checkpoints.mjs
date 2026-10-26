// tools/capture-checkpoints.mjs
// Automates capturing all 12 camera checkpoints from docs/map/BIND_BLUEPRINT.md §9
// and measures draw calls, triangles, and screen luminance (target indoors >= 0.25).
// Uses Chrome DevTools Protocol (CDP) via WebSocket.

import fs from 'fs'
import path from 'path'
import { spawn } from 'child_process'

const CHECKPOINTS = [
  { id: 'spawnA',     name: 'Attacker Spawn', pos: [0, 1.65, 50],     yaw: 0,   desc: 'two exit corridors, cave door' },
  { id: 'aShort',     name: 'A Short',        pos: [-33, 1.65, 34],   yaw: 0,   desc: 'corridor, 2m wide walls both sides, teleporter room door' },
  { id: 'aTele',      name: 'A Teleporter',   pos: [-34, 1.65, 22],   yaw: 0,   desc: 'teleporter pad, crate, door north' },
  { id: 'aSiteShort', name: 'A Site (Short)', pos: [-27, 1.65, -1],   yaw: 0,   desc: 'A Box, site, Heaven stairs in far-left corner' },
  { id: 'aSiteBath',  name: 'A Site (Bath)',  pos: [-45, 1.65, -1],   yaw: 0,   desc: 'site from Bath entrance, pillar' },
  { id: 'aHeaven',    name: 'A Heaven (L1)',  pos: [-48, 5.15, -18],  yaw: 90,  desc: 'site seen from +3.5m, rails' },
  { id: 'market',     name: 'Market Plaza',   pos: [0, 1.65, -34],    yaw: 180, desc: 'stalls, doors left/right' },
  { id: 'bLong',      name: 'B Long',         pos: [50, 1.65, 46],    yaw: 0,   desc: 'fountain, teleporter pad, long corridor' },
  { id: 'bGarden',    name: 'B Garden',       pos: [46, 1.65, 4],     yaw: 0,   desc: 'planters, doorway into B Site' },
  { id: 'hookah',     name: 'B Hookah (L1)',  pos: [30, 5.15, -1],    yaw: 0,   desc: 'window overlooking B Site' },
  { id: 'bSiteHall',  name: 'B Site (Hall)',  pos: [39, 1.65, -26],   yaw: 180, desc: 'container, box, pillar, hall door' },
  { id: 'spawnD',     name: 'Defender Spawn', pos: [0, 1.65, -50],   yaw: 180, desc: 'exits east/west, link south' }
]

// Extra indoor checkpoints to verify luminance >= 0.25
const INDOOR_CHECKS = [
  { id: 'aTele',     name: 'A Teleporter Room', pos: [-34, 1.65, 22],  yaw: 0 },
  { id: 'aShowers',  name: 'A Showers',         pos: [-50, 1.65, 13],  yaw: 0 },
  { id: 'bShort',    name: 'B Short Room',      pos: [32, 1.65, 16],   yaw: 0 },
  { id: 'hookah',    name: 'B Hookah',          pos: [30, 5.15, -1],   yaw: 0 }
]

const outDirP6b = path.resolve('docs/captures/p6b')
fs.mkdirSync(outDirP6b, { recursive: true })

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function isPortOpen(port = 9222) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json/version`)
    return res.ok
  } catch {
    return false
  }
}

async function ensureChrome() {
  if (await isPortOpen(9222)) {
    return null
  }

  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  if (!fs.existsSync(chromePath)) {
    throw new Error(`Google Chrome not found at ${chromePath}`)
  }

  console.log('Launching headless Chrome with remote debugging on port 9222...')
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=/tmp/palo-io-chrome-profile',
    '--window-size=1280,720',
    'http://localhost:5173/'
  ], {
    stdio: 'ignore',
    detached: true
  })
  proc.unref()

  // Wait for Chrome CDP to be available
  for (let i = 0; i < 30; i++) {
    await sleep(300)
    if (await isPortOpen(9222)) {
      console.log('Headless Chrome started and listening on port 9222!')
      return proc
    }
  }
  throw new Error('Timed out waiting for Chrome to start on port 9222')
}

async function getPageWsUrl() {
  const res = await fetch('http://127.0.0.1:9222/json')
  const pages = await res.json()
  const page = pages.find(p => p.url.includes('localhost:5173') && p.type === 'page') || pages.find(p => p.type === 'page')
  if (!page || !page.webSocketDebuggerUrl) {
    throw new Error('Could not find active game page on port 9222')
  }
  return page.webSocketDebuggerUrl
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl
    this.ws = null
    this.id = 1
    this.callbacks = new Map()
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl)
      this.ws.onopen = () => resolve()
      this.ws.onerror = (err) => reject(err)
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.id && this.callbacks.has(data.id)) {
          const cb = this.callbacks.get(data.id)
          this.callbacks.delete(data.id)
          if (data.error) cb.reject(new Error(data.error.message))
          else cb.resolve(data.result)
        }
      }
    })
  }

  async send(method, params = {}) {
    const id = this.id++
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }

  close() {
    if (this.ws) this.ws.close()
  }
}

async function main() {
  const spawnedChrome = await ensureChrome()
  const wsUrl = await getPageWsUrl()
  const cdp = new CDPClient(wsUrl)
  await cdp.connect()
  console.log('Connected to Chrome DevTools Protocol!')

  await cdp.send('Page.enable')

  console.log('\n===============================================================')
  console.log('  Capturing 12 Camera Checkpoints -> docs/captures/p6b/*.png   ')
  console.log('===============================================================')

  await cdp.send('Page.navigate', { url: 'http://localhost:5173/?checkpoint=spawnA' })
  // Poll until game engine and player are fully ready
  for (let t = 0; t < 30; t++) {
    const check = await cdp.send('Runtime.evaluate', {
      expression: 'Boolean(window.gameEngine && window.player && window.setCheckpoint)',
      returnByValue: true
    })
    if (check?.result?.value) break
    await sleep(300)
  }
  await sleep(1000)

  const results = []

  for (let i = 0; i < CHECKPOINTS.length; i++) {
    const cp = CHECKPOINTS[i]
    process.stdout.write(`[${(i + 1).toString().padStart(2, ' ')}/12] ${cp.id.padEnd(12, ' ')} (${cp.name.padEnd(20, ' ')})... `)

    await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          if (window.setCheckpoint) {
            window.setCheckpoint('${cp.id}');
          }
          if (window.player) {
            window.player.alive = true;
            window.player.health = 100;
          }
          const playOverlay = document.getElementById('play-overlay');
          if (playOverlay) playOverlay.classList.add('hidden');
          const endScreen = document.getElementById('end-screen');
          if (endScreen) endScreen.classList.remove('active');
          const mainMenu = document.getElementById('main-menu');
          if (mainMenu) mainMenu.classList.remove('active');
        })()
      `
    })
    await sleep(600)

    // Evaluate stats and ensure position/health
    const evalRes = await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          if (window.setCheckpoint) {
            window.setCheckpoint('${cp.id}');
          }
          if (window.player) {
            window.player.alive = true;
            window.player.health = 100;
          }
          const playOverlay = document.getElementById('play-overlay');
          if (playOverlay) playOverlay.classList.add('hidden');
          const endScreen = document.getElementById('end-screen');
          if (endScreen) endScreen.classList.remove('active');
          const mainMenu = document.getElementById('main-menu');
          if (mainMenu) mainMenu.classList.remove('active');

          const engine = window.gameEngine || window.debugTools?.engine;
          const stats = engine?.lastRenderStats || {};
          const drawCalls = stats.calls || 0;
          const triangles = stats.triangles || 0;
          const fps = stats.fps || 60;
          const avgLum = engine ? engine.measureScreenLuminance() : 0;

          return { drawCalls, triangles, fps, avgLum };
        })()
      `,
      returnByValue: true
    })

    const stats = evalRes?.result?.value || { drawCalls: 0, triangles: 0, fps: 60, avgLum: 0 }
    results.push({ ...cp, ...stats })

    // Capture screenshot
    const res = await cdp.send('Page.captureScreenshot', { format: 'png' })
    const buffer = Buffer.from(res.data, 'base64')

    // Save to docs/captures/p6b/
    fs.writeFileSync(path.join(outDirP6b, `${cp.id}.png`), buffer)

    console.log(`Calls: ${stats.drawCalls.toString().padStart(2, ' ')} | Triangles: ${stats.triangles.toString().padStart(6, ' ')} | FPS: ${stats.fps.toString().padStart(2, ' ')} | Lum: ${stats.avgLum.toFixed(3)} | Saved!`)
  }

  // Measure indoor luminance specifically for aTele, aShowers, bShort, hookah
  console.log('\n===============================================================')
  console.log('  Indoor Luminance Verification (Target: Luminance >= 0.25)    ')
  console.log('===============================================================')

  let allIndoorsPassed = true
  for (const ic of INDOOR_CHECKS) {
    await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          if (window.setCheckpoint) {
            window.setCheckpoint('${ic.id}');
          }
          if (window.player) {
            window.player.alive = true;
            window.player.health = 100;
          }
          const playOverlay = document.getElementById('play-overlay');
          if (playOverlay) playOverlay.classList.add('hidden');
        })()
      `
    })
    await sleep(800)

    const lumRes = await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const engine = window.gameEngine || window.debugTools?.engine;
          return engine ? engine.measureScreenLuminance() : 0;
        })()
      `,
      returnByValue: true
    })

    const avgLum = lumRes?.result?.value || 0
    const pass = avgLum >= 0.25
    if (!pass) allIndoorsPassed = false
    const status = pass ? '✓ PASS' : '✗ FAIL'

    // Also capture screenshot for indoor check
    const shot = await cdp.send('Page.captureScreenshot', { format: 'png' })
    const buf = Buffer.from(shot.data, 'base64')
    fs.writeFileSync(path.join(outDirP6b, `${ic.id}.png`), buf)

    console.log(`  [${status}] ${ic.id.padEnd(10, ' ')}: Luminance = ${avgLum.toFixed(3)} (>= 0.25 target)`)
  }

  cdp.close()
  console.log('===============================================================')
  if (allIndoorsPassed) {
    console.log('✓ All indoor checkpoints achieved average luminance >= 0.25!')
  } else {
    console.log('✗ Some indoor checkpoints fell below 0.25 luminance target.')
  }
  console.log('All 12 checkpoints captured to docs/captures/p6b/*.png successfully!')
}

main().catch(err => {
  console.error('Error during capture:', err)
  process.exit(1)
})
