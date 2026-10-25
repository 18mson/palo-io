// tools/capture-debug-views.mjs
// Automates capturing screenshots of F4, F5, F6, and F7 debug views.
// Run with: node --experimental-websocket tools/capture-debug-views.mjs

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
    const res = await fetch('http://localhost:9222/json')
    if (res.ok) return null
  } catch (e) {}

  console.log('Spawning headless Chrome on port 9222...')
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--user-data-dir=/tmp/test-chrome-profile',
    '--no-sandbox',
    '--window-size=1470,820',
    'http://localhost:5173/?checkpoint=aSiteShort'
  ])

  for (let i = 0; i < 40; i++) {
    await sleep(250)
    try {
      const res = await fetch('http://localhost:9222/json')
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
      const res = await fetch('http://localhost:9222/json')
      const pages = await res.json()
      const page = pages.find(p => p.url.includes('localhost:5173') && p.type === 'page') || pages.find(p => p.type === 'page')
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
        if (data.method === 'Runtime.consoleAPICalled') {
          console.log('[Browser Console]', data.params.type, data.params.args.map(a => a.value || a.description).join(' '))
        } else if (data.method === 'Runtime.exceptionThrown') {
          console.error('[Browser Exception]', data.params.exceptionDetails)
        }
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

async function saveCapture(cdp, name) {
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' })
  const buffer = Buffer.from(data, 'base64')
  
  const docsPath = path.join(docsCaptureDir, `${name}.png`)
  const artifactPath = path.join(artifactDir, `${name}.png`)
  
  fs.writeFileSync(docsPath, buffer)
  fs.writeFileSync(artifactPath, buffer)
  console.log(`Saved screenshot: ${name}.png (${buffer.length} bytes)`)
}

async function main() {
  const chromeProc = await ensureChrome()
  console.log('Connecting to Chrome CDP on port 9222...')
  const wsUrl = await getPageWsUrl()
  const cdp = new CDPClient(wsUrl)
  await cdp.connect()
  console.log('Connected! Navigating to game at checkpoint aSiteShort...')

  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')
  await cdp.send('Page.navigate', { url: 'http://localhost:5173/?checkpoint=aSiteShort' })
  await sleep(1800)

  // Ensure game is initialized, agent select dismissed, hud clean
  for (let i = 0; i < 50; i++) {
    const check = await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          if (!window.player) {
            document.getElementById('btn-play')?.click()
            const card = document.querySelector('.agent-card')
            if (card) card.click()
            document.getElementById('btn-lock-agent')?.click()
          }
          if (window.setCheckpoint && window.player) {
            window.setCheckpoint('aSiteShort')
          }
          const playOverlay = document.getElementById('play-overlay')
          if (playOverlay) playOverlay.classList.add('hidden')
          const mainMenu = document.getElementById('main-menu')
          if (mainMenu) mainMenu.classList.remove('active')
          const agentModal = document.getElementById('agent-modal')
          if (agentModal) {
            agentModal.classList.add('hidden')
            agentModal.style.display = 'none'
          }
          return !!(window.player && window.debugTools && window.player.alive)
        })()
      `
    })
    if (check?.result?.value) {
      console.log('Game initialized and player active!')
      break
    }
    await sleep(300)
  }
  await sleep(1000)

  // 1. Capture F4 Top-Down Blueprint View
  console.log('[1/4] Activating F4 Top-Down Blueprint View...')
  await cdp.send('Runtime.evaluate', {
    expression: `
      (() => {
        if (window.debugTools) {
          window.debugTools.toggleF5(false)
          window.debugTools.toggleF6(false)
          window.debugTools.toggleF7(false)
          window.debugTools.toggleF4(true)
          // Dispatch mousemove to simulate hovering over A Site
          const canvas = document.getElementById('bind-topdown-canvas')
          if (canvas) {
            const rect = canvas.getBoundingClientRect()
            const scale = Math.min(rect.width / 120, rect.height / 112)
            const offsetX = (rect.width - 120 * scale) * 0.5
            const offsetY = (rect.height - 112 * scale) * 0.5
            // Target [-39, -13] (A Site)
            const cx = offsetX + (-39 + 60) * scale
            const cy = offsetY + (-13 + 56) * scale
            canvas.dispatchEvent(new MouseEvent('mousemove', { clientX: rect.left + cx, clientY: rect.top + cy }))
          }
        }
      })()
    `
  })
  await sleep(800)
  await saveCapture(cdp, 'f4_topdown')

  // 2. Capture F5 Level Topology View
  console.log('[2/4] Activating F5 Level Colors & Topology View...')
  await cdp.send('Runtime.evaluate', {
    expression: `
      (() => {
        if (window.debugTools) {
          window.debugTools.toggleF4(false)
          window.debugTools.toggleF6(false)
          window.debugTools.toggleF7(false)
          window.debugTools.toggleF5(true)
          if (window.setCheckpoint) {
            window.setCheckpoint('aSiteShort')
          }
        }
      })()
    `
  })
  await sleep(800)
  await saveCapture(cdp, 'f5_levels')

  // 3. Capture F6 Camera Checkpoints View
  console.log('[3/4] Activating F6 Camera Checkpoints View...')
  await cdp.send('Runtime.evaluate', {
    expression: `
      (() => {
        if (window.debugTools) {
          window.debugTools.toggleF4(false)
          window.debugTools.toggleF5(false)
          window.debugTools.toggleF7(false)
          window.debugTools.toggleF6(true)
          if (window.setCheckpoint) {
            window.setCheckpoint('market')
          }
        }
      })()
    `
  })
  await sleep(800)
  await saveCapture(cdp, 'f6_checkpoints')

  // 4. Capture F7 Collision Wireframes View
  console.log('[4/4] Activating F7 Collision Wireframes View...')
  await cdp.send('Runtime.evaluate', {
    expression: `
      (() => {
        if (window.debugTools) {
          window.debugTools.toggleF4(false)
          window.debugTools.toggleF5(false)
          window.debugTools.toggleF6(false)
          window.debugTools.toggleF7(true)
          if (window.setCheckpoint) {
            window.setCheckpoint('aSiteShort')
          }
        }
      })()
    `
  })
  await sleep(800)
  await saveCapture(cdp, 'f7_wireframes')

  // Clean up overlays
  await cdp.send('Runtime.evaluate', {
    expression: `
      (() => {
        if (window.debugTools) {
          window.debugTools.toggleF7(false)
        }
      })()
    `
  })

  cdp.close()
  if (chromeProc) {
    chromeProc.kill()
  }
  console.log('Done! All 4 debug views captured successfully.')
}

main().catch(err => {
  console.error('Capture failed:', err)
  process.exit(1)
})
