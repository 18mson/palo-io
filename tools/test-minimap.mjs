// tools/test-minimap.mjs
// Automates testing and capturing minimap with aim direction tracking and connected routes.
// Run with: node --experimental-websocket tools/test-minimap.mjs

import fs from 'fs'
import path from 'path'
import { spawn } from 'child_process'

const artifactDir = '/Users/a2238/.gemini/antigravity-ide/brain/ef456e2d-60b4-4ef6-8be6-d0d17f646b1f'
const docsCaptureDir = path.resolve('docs/map/captures')
fs.mkdirSync(docsCaptureDir, { recursive: true })

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function ensureChrome() {
  try {
    const res = await fetch('http://127.0.0.1:9222/json')
    if (res.ok) return null
  } catch (e) {}

  console.log('Spawning headless Chrome on port 9222...')
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--user-data-dir=/tmp/test-chrome-profile-minimap',
    '--no-sandbox',
    '--window-size=1470,820',
    'http://127.0.0.1:5173/?checkpoint=aSiteShort'
  ])

  for (let i = 0; i < 40; i++) {
    await sleep(250)
    try {
      const res = await fetch('http://127.0.0.1:9222/json')
      if (res.ok) {
        console.log('Headless Chrome ready on port 9222')
        return chrome
      }
    } catch (e) {}
  }
  throw new Error('Chrome failed to start on port 9222')
}

async function getPageWsUrl() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9222/json')
      const pages = await res.json()
      const page = pages.find(p => p.url.includes('127.0.0.1:5173') && p.type === 'page') || pages.find(p => p.type === 'page')
      if (page && page.webSocketDebuggerUrl) {
        return page.webSocketDebuggerUrl
      }
    } catch (e) {}
    await sleep(200)
  }
  throw new Error('Could not find active game page on port 9222')
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

  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    })
    if (res.exceptionDetails) {
      console.error('Eval error:', res.exceptionDetails)
    }
    return res.result ? res.result.value : null
  }

  async captureScreenshot(filename) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' })
    const buffer = Buffer.from(res.data, 'base64')
    const docPath = path.join(docsCaptureDir, filename)
    const artPath = path.join(artifactDir, filename)
    fs.writeFileSync(docPath, buffer)
    fs.writeFileSync(artPath, buffer)
    console.log(`Saved screenshot -> ${filename}`)
    return docPath
  }

  close() {
    if (this.ws) this.ws.close()
  }
}

async function run() {
  const chromeProcess = await ensureChrome()
  const wsUrl = await getPageWsUrl()
  const cdp = new CDPClient(wsUrl)
  await cdp.connect()

  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')

  console.log('Navigating to http://127.0.0.1:5173/?checkpoint=aSiteShort ...')
  await cdp.send('Page.navigate', { url: 'http://127.0.0.1:5173/?checkpoint=aSiteShort' })
  await sleep(3000)

  // Click play / deploy overlay if present
  console.log('Dismissing overlay / starting game...')
  await cdp.evaluate(`(() => {
    const btn = document.getElementById('po-play-btn') || document.querySelector('.play-overlay-btn')
    if (btn) btn.click()
    const overlay = document.getElementById('play-overlay')
    if (overlay) overlay.classList.add('hidden')
    const minimapHud = document.getElementById('minimap-hud')
    if (minimapHud) minimapHud.classList.remove('hidden')
  })()`)
  await sleep(1000)

  // 1. Capture default view (Aiming North)
  console.log('Testing aim direction: North (yaw = 0)...')
  await cdp.evaluate(`(() => {
    if (window.player && window.player.camera) {
      window.player.camera.rotation.order = 'YXZ';
      window.player.camera.rotation.set(0, 0, 0);
      window.player.camera.updateMatrixWorld(true);
    }
    // Switch minimap to rotate mode
    if (window.minimap) {
      window.minimap.modeIndex = 0; // rotate
      window.minimap._updateButtonsUI();
    }
  })()`)
  await sleep(600)
  await cdp.captureScreenshot('minimap_aim_north_rotate.png')

  // 2. Rotate aim to East (+X, yaw = -Math.PI / 2) in ROTATE mode
  console.log('Testing aim direction: East (yaw = -PI/2) in rotate mode...')
  await cdp.evaluate(`(() => {
    if (window.player && window.player.camera) {
      window.player.camera.rotation.order = 'YXZ';
      window.player.camera.rotation.set(0, -Math.PI / 2, 0);
      window.player.camera.updateMatrixWorld(true);
    }
  })()`)
  await sleep(600)
  await cdp.captureScreenshot('minimap_aim_east_rotate.png')

  // 2b. Rotate aim to South (+Z, yaw = Math.PI) in ROTATE mode
  console.log('Testing aim direction: South (yaw = PI) in rotate mode...')
  await cdp.evaluate(`(() => {
    if (window.player && window.player.camera) {
      window.player.camera.rotation.order = 'YXZ';
      window.player.camera.rotation.set(0, Math.PI, 0);
      window.player.camera.updateMatrixWorld(true);
    }
  })()`)
  await sleep(600)
  await cdp.captureScreenshot('minimap_aim_south_rotate.png')

  // 2c. Rotate aim to West (-X, yaw = Math.PI / 2) in ROTATE mode
  console.log('Testing aim direction: West (yaw = PI/2) in rotate mode...')
  await cdp.evaluate(`(() => {
    if (window.player && window.player.camera) {
      window.player.camera.rotation.order = 'YXZ';
      window.player.camera.rotation.set(0, Math.PI / 2, 0);
      window.player.camera.updateMatrixWorld(true);
    }
  })()`)
  await sleep(600)
  await cdp.captureScreenshot('minimap_aim_west_rotate.png')

  // 3. Switch to FIXED mode (North-Up) aiming East
  console.log('Testing FIXED mode (aiming East)...')
  await cdp.evaluate(`(() => {
    if (window.minimap) {
      window.minimap.modeIndex = 1; // fixed
      window.minimap._updateButtonsUI();
    }
  })()`)
  await sleep(600)
  await cdp.captureScreenshot('minimap_aim_east_fixed.png')

  // 4. Aim South in FIXED mode
  console.log('Testing aim direction: South (yaw = Math.PI) in fixed mode...')
  await cdp.evaluate(`(() => {
    if (window.player && window.player.camera) {
      window.player.camera.rotation.order = 'YXZ';
      window.player.camera.rotation.set(0, Math.PI, 0);
      window.player.camera.updateMatrixWorld(true);
    }
  })()`)
  await sleep(600)
  await cdp.captureScreenshot('minimap_aim_south_fixed.png')

  // 5. Open Tactical Map Modal [M]
  console.log('Testing Full Tactical Map Modal [M]...')
  await cdp.evaluate(`(() => {
    if (window.minimap) {
      window.minimap.openTacticalMap();
    }
  })()`)
  await sleep(1000)
  await cdp.captureScreenshot('tactical_map_full_routes.png')

  // Close modal
  await cdp.evaluate(`(() => {
    if (window.minimap) {
      window.minimap.closeTacticalMap();
    }
  })()`)
  await sleep(500)

  cdp.close()
  if (chromeProcess) {
    chromeProcess.kill('SIGTERM')
  }
  console.log('Minimap tests and screenshots completed successfully!')
}

run().catch(err => {
  console.error('Test run failed:', err)
  process.exit(1)
})
