// tools/capture-checkpoints.mjs
// Automates capturing all 12 camera checkpoints from docs/map/BIND_BLUEPRINT.md §9.
// Uses Chrome DevTools Protocol (CDP) via WebSocket.

import fs from 'fs'
import path from 'path'

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

const outDir = path.resolve('docs/map/captures')
fs.mkdirSync(outDir, { recursive: true })

async function getPageWsUrl() {
  const res = await fetch('http://localhost:9222/json')
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

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function main() {
  console.log('Connecting to Chrome CDP on port 9222...')
  const wsUrl = await getPageWsUrl()
  const cdp = new CDPClient(wsUrl)
  await cdp.connect()
  console.log('Connected! Capturing all 12 checkpoints...')

  // Enable Page domain
  await cdp.send('Page.enable')

  for (let i = 0; i < CHECKPOINTS.length; i++) {
    const cp = CHECKPOINTS[i]
    console.log(`[${i + 1}/12] Capturing ${cp.id} (${cp.name})...`)

    // Navigate to page with checkpoint URL param
    await cdp.send('Page.navigate', { url: `http://localhost:5173/?checkpoint=${cp.id}` })
    await sleep(1500)

    // Ensure player is alive, overlays hidden, position & yaw exact
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

    // Capture screenshot
    const res = await cdp.send('Page.captureScreenshot', { format: 'png' })
    const buffer = Buffer.from(res.data, 'base64')

    const file1 = path.join(outDir, `checkpoint_${cp.id}.png`)
    const file2 = path.join(outDir, `${cp.id}.png`)
    fs.writeFileSync(file1, buffer)
    fs.writeFileSync(file2, buffer)
    console.log(`  ✓ Saved: docs/map/captures/checkpoint_${cp.id}.png (${buffer.length} bytes)`)
  }

  cdp.close()
  console.log('All 12 camera checkpoints captured successfully!')
}

main().catch(err => {
  console.error('Error during capture:', err)
  process.exit(1)
})
