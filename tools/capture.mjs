#!/usr/bin/env node
/**
 * tools/capture.mjs
 *
 * Automated Screenshot Capture for 12 Blueprint Reference Views
 * Saves each view to docs/captures/<name>.png
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outDir = path.resolve(rootDir, 'docs/captures')

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

const CHROME_PATH = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

const VIEWS = [
  'a_site_from_a_main',
  'a_site_from_tower',
  'mid_bridge_view',
  'b_site_from_b_main',
  'b_site_tower_view',
  'attacker_exit_to_mid',
  'defender_exit',
  'water_under_bridge',
  'alley_flank',
  'open_yard_long_sight',
  'isometric',
  'aerial'
]

console.log('====================================================')
console.log('   Palo-IO Blueprint View Capture Tool (12 Views)   ')
console.log('====================================================')
console.log(`Target Output: ${outDir}`)
console.log(`Vite Server:   ${BASE_URL}`)
console.log(`Chrome Binary: ${CHROME_PATH}\n`)

let successCount = 0

for (let i = 0; i < VIEWS.length; i++) {
  const view = VIEWS[i]
  const outFile = path.join(outDir, `${view}.png`)
  const url = `${BASE_URL}/?view=${view}`
  const tmpUserData = `/tmp/chrome_cap_${view}_${Date.now()}`

  console.log(`[${i + 1}/${VIEWS.length}] Capturing "${view}"...`)

  try {
    const cmd = `"${CHROME_PATH}" --headless=new --disable-gpu --window-size=1280,720 --virtual-time-budget=3000 --user-data-dir="${tmpUserData}" --screenshot="${outFile}" "${url}"`
    execSync(cmd, { stdio: 'pipe' })

    if (fs.existsSync(outFile) && fs.statSync(outFile).size > 0) {
      const sizeKb = (fs.statSync(outFile).size / 1024).toFixed(1)
      console.log(`  ✓ Saved: docs/captures/${view}.png (${sizeKb} KB)`)
      successCount++
    } else {
      console.error(`  ✗ Error: ${outFile} was not generated or is empty`)
    }
  } catch (err) {
    console.error(`  ✗ Capture failed for ${view}: ${err.message}`)
  } finally {
    try {
      if (fs.existsSync(tmpUserData)) {
        fs.rmSync(tmpUserData, { recursive: true, force: true })
      }
    } catch {}
  }
}

console.log('\n====================================================')
console.log(`Capture complete: ${successCount} / ${VIEWS.length} views captured.`)
console.log('====================================================')

if (successCount === VIEWS.length) {
  process.exit(0)
} else {
  process.exit(1)
}
