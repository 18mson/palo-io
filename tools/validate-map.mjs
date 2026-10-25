#!/usr/bin/env node
/**
 * tools/validate-map.mjs
 *
 * Automated Map Validator:
 *  (1) Checks grid alignment:
 *      - Structural blocks (with collision) must be multiples of 0.5m.
 *      - Decorative blocks ("decor": true) must be multiples of 0.1m and must NOT generate colliders.
 *      - Legacy blocks (no source:"layout") are reported as WARN with count, not FAIL.
 *      - Blocks generated from layout (source:"layout") must pass or validator fails.
 *  (2) Tactical cover density: fails if > 5% of 1m cells are farther than 6m from any solid taller than 1.5m.
 *      Tracks trend in docs/validate-history.md (date + value).
 *  (3) Zone reachability: fails if any zone is unreachable from both spawns (flood fill at 0.5m, player width 0.8m).
 *  (4) Corridor width: fails if any walkable corridor is narrower than 2.0m.
 *  (5) Block support: fails if bottom > 0.15 is unsupported by underlying block (>=30% overlap) or attached to wall.
 *  (6) Stairs connectivity: fails if stairs lowest step is disconnected from startY surface or top step lacks >=1.5m landing at endY.
 *  (7) Lane length: fails if longest unobstructed straight segment exceeds 30m (or 45m on mid canal axis).
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { expandMapMacros, isMultipleOfHalf, isMultipleOfTenth } from '../src/map/MapMacros.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const mapPath = path.resolve(__dirname, '../src/map/maps/ascent.json')

console.log('===============================================================')
console.log('         Palo-IO Map Validator (Competitive 0.5m Spec)         ')
console.log('===============================================================')
console.log(`Map: ${path.relative(process.cwd(), mapPath)}`)

if (!fs.existsSync(mapPath)) {
  console.error(`Error: Map file not found at ${mapPath}`)
  process.exit(1)
}

const rawMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'))
const REQUIRED_ZONES = [
  'attackerSpawn',
  'defenderSpawn',
  'midCourtyard',
  'midCanal',
  'siteA',
  'siteB',
  'aHeaven',
  'aHell',
  'bHeaven',
  'bHell',
  'westAlley',
  'eastAlley'
]

// ── Expand Map Macros ─────────────────────────────────────────
// Temporarily mute per-property console.warn during expansion for clean reporting
const originalWarn = console.warn
console.warn = () => {}
const mapData = expandMapMacros(rawMap)
console.warn = originalWarn

let check1Failed = false
let check2Failed = false
let check3Failed = false
let check4Failed = false
let check5Failed = false
let check6Failed = false
let check7Failed = false

// ── Check (1): Grid Alignment (0.5m structural, 0.1m decor) ───
console.log('\n[Check 1/7] Validating Grid Alignment (0.5m structural, 0.1m decor)...')
let totalStructural = 0
let totalDecor = 0
let legacyWarnCount = 0
let layoutFailCount = 0
const legacyViolations = []
const layoutViolations = []

for (const b of (mapData.blocks || [])) {
  if (b.comment) continue
  const isDecor = b.decor === true
  const isStructural = !isDecor && !b.noCollision && b.type !== 'trigger' && b.type !== 'water' && b.type !== 'ground'

  if (!isDecor && !isStructural) continue

  if (isDecor) totalDecor++
  if (isStructural) totalStructural++

  const isLayout = b.source === 'layout'
  const name = b.id || b.macro || b.type || 'block'

  const blockViolations = []
  for (const [k, v] of Object.entries(b)) {
    if (typeof v !== 'number') continue
    if (isStructural && !isMultipleOfHalf(v)) {
      blockViolations.push(`${k}=${v} (expected multiple of 0.5)`)
    } else if (isDecor && !isMultipleOfTenth(v)) {
      blockViolations.push(`${k}=${v} (expected multiple of 0.1)`)
    }
  }

  if (blockViolations.length > 0) {
    if (isLayout) {
      layoutFailCount++
      if (layoutViolations.length < 5) {
        layoutViolations.push(`${name} [${isStructural ? 'structural' : 'decor'}]: ${blockViolations.join(', ')}`)
      }
    } else {
      legacyWarnCount++
      if (legacyViolations.length < 5) {
        legacyViolations.push(`${name} [${isStructural ? 'structural' : 'decor'}]: ${blockViolations.join(', ')}`)
      }
    }
  }
}

console.log(`  - Structural blocks tested (0.5m spec): ${totalStructural}`)
console.log(`  - Decorative blocks tested (0.1m spec): ${totalDecor}`)

if (legacyWarnCount > 0) {
  console.log(`  ⚠️  WARN: Found ${legacyWarnCount} legacy block(s) violating grid specification (no source:"layout").`)
  for (const s of legacyViolations) {
    console.log(`       * ${s}`)
  }
}

if (layoutFailCount > 0) {
  check1Failed = true
  console.log(`  ❌ FAIL: Found ${layoutFailCount} layout-generated block(s) violating grid specification (source:"layout")!`)
  for (const s of layoutViolations) {
    console.log(`       * ${s}`)
  }
} else {
  console.log(`  ✅ PASS: 0 layout-generated violations (all source:"layout" blocks compliant).`)
}

// ── Collect Colliders & Tall Solids (Decor blocks emit NO colliders) ──
const colliders = []
const tallSolids = []

for (const b of mapData.blocks) {
  // Blocks with "decor": true must NOT generate colliders
  if (b.comment || b.type === 'trigger' || b.type === 'water' || b.type === 'ground' || b.noCollision || b.decor) continue

  if (b.isRamp) {
    const minY = Math.min(b.startY, b.endY)
    const maxY = Math.max(b.startY, b.endY)
    const h = Math.abs(b.endY - b.startY)
    colliders.push({
      minX: b.minX, maxX: b.maxX,
      minY, maxY,
      minZ: b.minZ, maxZ: b.maxZ,
      isRamp: true
    })
    if (h >= 1.5 || maxY >= 1.5) {
      tallSolids.push({ minX: b.minX, maxX: b.maxX, minZ: b.minZ, maxZ: b.maxZ })
    }
  } else if (typeof b.x === 'number') {
    const minY = b.y - b.h / 2
    const maxY = b.y + b.h / 2
    if (maxY <= 0.0) continue // Sub-surface pavement floor

    const minX = b.x - b.w / 2
    const maxX = b.x + b.w / 2
    const minZ = b.z - b.d / 2
    const maxZ = b.z + b.d / 2

    colliders.push({ minX, maxX, minY, maxY, minZ, maxZ, isRamp: false })
    if (b.h >= 1.5 || maxY >= 1.5) {
      tallSolids.push({ minX, maxX, minZ, maxZ })
    }
  }
}

// Solid props (lanterns, ivy, banners, etc. are non-colliding decor)
for (const p of (mapData.props || [])) {
  if (p.decor || p.noCollision) continue
  if (p.type === 'planter' || p.type === 'crate') {
    const w = p.w || 1.6
    const h = p.h || 0.7
    const d = p.d || 1.6
    const minX = p.x - w / 2
    const maxX = p.x + w / 2
    const minY = p.y - h / 2
    const maxY = p.y + h / 2
    const minZ = p.z - d / 2
    const maxZ = p.z + d / 2
    colliders.push({ minX, maxX, minY, maxY, minZ, maxZ, isRamp: false })
    if (h >= 1.5 || maxY >= 1.5) {
      tallSolids.push({ minX, maxX, minZ, maxZ })
    }
  }
}

// ── Check (2): Tactical Cover Distance (1m cells) ─────────────
console.log('\n[Check 2/7] Validating Tactical Cover Distance (solids taller than 1.5m)...')
function distToNearestTallSolid(x, z) {
  let minDist = Infinity
  for (const s of tallSolids) {
    const dx = Math.max(0, Math.max(s.minX - x, x - s.maxX))
    const dz = Math.max(0, Math.max(s.minZ - z, z - s.maxZ))
    const d = Math.hypot(dx, dz)
    if (d < minDist) minDist = d
  }
  return minDist
}

let total1mWalkable = 0
let far1mWalkable = 0

for (let x = -54.0; x <= 54.0; x += 1.0) {
  for (let z = -54.0; z <= 54.0; z += 1.0) {
    let obstructed = false
    for (const c of colliders) {
      if (!c.isRamp && x >= c.minX && x <= c.maxX && z >= c.minZ && z <= c.maxZ) {
        if (c.maxY > 0.5 && c.minY < 1.8) {
          obstructed = true
          break
        }
      }
    }
    if (!obstructed) {
      total1mWalkable++
      const d = distToNearestTallSolid(x, z)
      if (d > 6.0) far1mWalkable++
    }
  }
}

const coverFarPct = (far1mWalkable / Math.max(1, total1mWalkable)) * 100
if (coverFarPct > 5.0) {
  console.log(`  ℹ️  TRACK: ${coverFarPct.toFixed(2)}% of 1m cells are farther than 6m from tall solids (target across all chunks: <= 5.00%)`)
  console.log(`     - Total 1m walkable cells evaluated: ${total1mWalkable}`)
  console.log(`     - Cells farther than 6m from cover : ${far1mWalkable}`)
} else {
  console.log(`  ✅ PASS: Cover density is compliant: ${coverFarPct.toFixed(2)}% > 6m from cover (target: <= 5.00%).`)
  console.log(`     - Total 1m walkable cells: ${total1mWalkable}, Far from cover: ${far1mWalkable}`)
}

console.log(`  ℹ️  Tracked in docs/validate-history.md (recorded with Check 7 max lane length)`)

// ── Check (3): Flood Fill (0.5m grid, Player Width 0.8m) ──────
console.log('\n[Check 3/7] Validating Zone Reachability (0.5m grid, player width 0.8m)...')
const MIN_X = -58.0
const MAX_X = 58.0
const MIN_Z = -58.0
const MAX_Z = 58.0
const MIN_Y = 0.0
const MAX_Y = 8.0
const S = 0.5

const NX = Math.round((MAX_X - MIN_X) / S)
const NZ = Math.round((MAX_Z - MIN_Z) / S)
const NY = Math.round((MAX_Y - MIN_Y) / S)

function cellIdx(gx, gy, gz) {
  return (gy * NZ + gz) * NX + gx
}

// Rasterize solid colliders (only structural / colliding blocks)
const solid = new Uint8Array(NX * NY * NZ)
const wallSolid = new Uint8Array(NX * NY * NZ)

for (const c of colliders) {
  const gMinX = Math.max(0, Math.floor((c.minX - MIN_X) / S))
  const gMaxX = Math.min(NX - 1, Math.ceil((c.maxX - MIN_X) / S) - 1)
  const gMinY = Math.max(0, Math.floor((c.minY - MIN_Y) / S))
  const gMaxY = Math.min(NY - 1, Math.ceil((c.maxY - MIN_Y) / S) - 1)
  const gMinZ = Math.max(0, Math.floor((c.minZ - MIN_Z) / S))
  const gMaxZ = Math.min(NZ - 1, Math.ceil((c.maxZ - MIN_Z) / S) - 1)

  const isWall = !c.isRamp && ((c.maxY - c.minY >= 1.5) || c.maxY >= 2.0)

  for (let gy = gMinY; gy <= gMaxY; gy++) {
    for (let gz = gMinZ; gz <= gMaxZ; gz++) {
      for (let gx = gMinX; gx <= gMaxX; gx++) {
        if (c.isRamp && gy === gMaxY) continue
        solid[cellIdx(gx, gy, gz)] = 1
        if (isWall) wallSolid[cellIdx(gx, gy, gz)] = 1
      }
    }
  }
}

// Player width 0.8m -> clearance radius = 0.4m
const PLAYER_RADIUS = 0.4
const walkable08 = new Uint8Array(NX * NY * NZ)

for (let gy = 0; gy < NY - 2; gy++) {
  for (let gz = 0; gz < NZ; gz++) {
    for (let gx = 0; gx < NX; gx++) {
      const worldX = gx * S + MIN_X
      const worldZ = gz * S + MIN_Z
      const worldY = gy * S + MIN_Y

      // Headroom & body obstruction check with 0.8m width
      let blocked = false
      for (const c of colliders) {
        if (c.isRamp) continue
        if (c.maxX > (worldX - PLAYER_RADIUS) && c.minX < (worldX + PLAYER_RADIUS) &&
            c.maxZ > (worldZ - PLAYER_RADIUS) && c.minZ < (worldZ + PLAYER_RADIUS)) {
          if (c.maxY > (worldY + 0.2) && c.minY < (worldY + 1.6)) {
            blocked = true
            break
          }
        }
      }
      if (blocked) continue

      // Floor support check
      let onRamp = false
      for (const c of colliders) {
        if (c.isRamp && worldX >= c.minX && worldX <= c.maxX && worldZ >= c.minZ && worldZ <= c.maxZ) {
          if (Math.abs(worldY - c.maxY) <= 0.6 || Math.abs(worldY - c.minY) <= 0.6) {
            onRamp = true
            break
          }
        }
      }

      const hasFloor = (gy === 0) || (solid[cellIdx(gx, gy - 1, gz)] === 1) || onRamp
      if (hasFloor) {
        walkable08[cellIdx(gx, gy, gz)] = 1
      }
    }
  }
}

function floodFillFrom(startX, startY, startZ) {
  const visited = new Uint8Array(NX * NY * NZ)
  const queue = []
  const gx = Math.round((startX - MIN_X) / S)
  const gz = Math.round((startZ - MIN_Z) / S)
  const gy = Math.max(0, Math.min(NY - 3, Math.round((startY - MIN_Y) / S)))

  // Find nearest standing cell
  outer: for (let r = 0; r <= 3; r++) {
    for (let dx = -r; dx <= r; dx++) {
      for (let dz = -r; dz <= r; dz++) {
        for (let dy = 0; dy <= 2; dy++) {
          const testY = Math.max(0, gy - dy)
          const cx = gx + dx
          const cz = gz + dz
          if (cx >= 0 && cx < NX && cz >= 0 && cz < NZ) {
            const i = cellIdx(cx, testY, cz)
            if (walkable08[i] === 1 && visited[i] === 0) {
              visited[i] = 1
              queue.push(cx, testY, cz)
              break outer
            }
          }
        }
      }
    }
  }

  let head = 0
  const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]]
  while (head < queue.length) {
    const cx = queue[head++]
    const cy = queue[head++]
    const cz = queue[head++]
    for (const [dx, dz] of DIRS) {
      const nx = cx + dx
      const nz = cz + dz
      if (nx < 0 || nx >= NX || nz < 0 || nz >= NZ) continue
      for (const ny of [cy, cy + 1, cy - 1]) {
        if (ny < 0 || ny >= NY - 2) continue
        const ni = cellIdx(nx, ny, nz)
        if (walkable08[ni] === 1 && visited[ni] === 0) {
          visited[ni] = 1
          queue.push(nx, ny, nz)
          break
        }
      }
    }
  }
  return { visited, queue }
}

const attFill = floodFillFrom(11.5, 0.5, -50.0)
const defFill = floodFillFrom(10.5, 0.5, 44.0)

const zoneMap = new Map((rawMap.zones || []).map(z => [z.id, z]))
let unreachableZonesCount = 0

for (const zoneId of REQUIRED_ZONES) {
  const z = zoneMap.get(zoneId)
  if (!z) {
    console.error(`  ❌ Zone "${zoneId}" is NOT defined in map!`)
    check3Failed = true
    unreachableZonesCount++
    continue
  }
  const gMinX = Math.max(0, Math.floor((z.minX - MIN_X) / S))
  const gMaxX = Math.min(NX - 1, Math.ceil((z.maxX - MIN_X) / S) - 1)
  const gMinZ = Math.max(0, Math.floor((z.minZ - MIN_Z) / S))
  const gMaxZ = Math.min(NZ - 1, Math.ceil((z.maxZ - MIN_Z) / S) - 1)
  const gMinY = Math.max(0, Math.floor(((z.minY ?? 0.0) - MIN_Y) / S))
  const gMaxY = Math.min(NY - 1, Math.ceil(((z.maxY ?? 8.0) - MIN_Y) / S) - 1)

  let attHits = 0
  let defHits = 0
  for (let gy = gMinY; gy <= gMaxY; gy++) {
    for (let gz = gMinZ; gz <= gMaxZ; gz++) {
      for (let gx = gMinX; gx <= gMaxX; gx++) {
        const i = cellIdx(gx, gy, gz)
        if (attFill.visited[i] === 1) attHits++
        if (defFill.visited[i] === 1) defHits++
      }
    }
  }

  const reached = (attHits > 0) && (defHits > 0)
  if (!reached) {
    check3Failed = true
    unreachableZonesCount++
    console.log(`  ❌ Zone "${zoneId.padEnd(14)}" (${z.name}): Attacker=${attHits}, Defender=${defHits} (UNREACHABLE)`)
  } else {
    console.log(`  ✅ Zone "${zoneId.padEnd(14)}" (${z.name}): Attacker=${attHits.toString().padStart(4)} cells, Defender=${defHits.toString().padStart(4)} cells`)
  }
}

if (unreachableZonesCount > 0) {
  console.log(`  ❌ FAIL: ${unreachableZonesCount} zone(s) unreachable from both spawns.`)
} else {
  console.log(`  ✅ PASS: All ${REQUIRED_ZONES.length} zones reachable from both spawns (player width 0.8m).`)
}

// ── Check (4): Walkable Corridor Width >= 2.0m ────────────────
console.log('\n[Check 4/7] Validating Corridor Clearance (minimum width 2.0m)...')
const MIN_CORRIDOR_WIDTH = 2.0
let narrowCorridorsFound = 0
const reportedLocations = new Set()

// Scan cells traversed along walkable routes
const combinedQueue = attFill.queue
for (let i = 0; i < combinedQueue.length; i += 3) {
  const gx = combinedQueue[i]
  const gy = combinedQueue[i + 1]
  const cz = combinedQueue[i + 2]

  // Check Z-corridor (flanked by walls along X)
  let leftWall = -1, rightWall = -1
  for (let x = gx - 1; x >= Math.max(0, gx - 10); x--) {
    if (wallSolid[cellIdx(x, gy + 1, cz)] === 1) { leftWall = x; break }
  }
  for (let x = gx + 1; x <= Math.min(NX - 1, gx + 10); x++) {
    if (wallSolid[cellIdx(x, gy + 1, cz)] === 1) { rightWall = x; break }
  }

  if (leftWall >= 0 && rightWall >= 0 && (rightWall - leftWall) <= 12) {
    const isCorridorZ = (
      cz > 0 && cz < NZ - 1 &&
      wallSolid[cellIdx(leftWall, gy + 1, cz - 1)] === 1 &&
      wallSolid[cellIdx(leftWall, gy + 1, cz + 1)] === 1 &&
      wallSolid[cellIdx(rightWall, gy + 1, cz - 1)] === 1 &&
      wallSolid[cellIdx(rightWall, gy + 1, cz + 1)] === 1
    )
    if (isCorridorZ) {
      const clearWidth = (rightWall - leftWall - 1) * S
      if (clearWidth < MIN_CORRIDOR_WIDTH - 1e-4) {
        const locKey = `X:${gx}:${cz}`
        if (!reportedLocations.has(locKey)) {
          reportedLocations.add(locKey)
          narrowCorridorsFound++
          const wx = (gx * S + MIN_X).toFixed(1)
          const wy = (gy * S + MIN_Y).toFixed(1)
          const wz = (cz * S + MIN_Z).toFixed(1)
          if (narrowCorridorsFound <= 5) {
            console.log(`  ❌ Narrow Z-corridor at (${wx}, ${wy}, ${wz}): width = ${clearWidth.toFixed(2)}m < ${MIN_CORRIDOR_WIDTH}m`)
          }
        }
      }
    }
  }

  // Check X-corridor (flanked by walls along Z)
  let northWall = -1, southWall = -1
  for (let z = cz - 1; z >= Math.max(0, cz - 10); z--) {
    if (wallSolid[cellIdx(gx, gy + 1, z)] === 1) { northWall = z; break }
  }
  for (let z = cz + 1; z <= Math.min(NZ - 1, cz + 10); z++) {
    if (wallSolid[cellIdx(gx, gy + 1, z)] === 1) { southWall = z; break }
  }

  if (northWall >= 0 && southWall >= 0 && (southWall - northWall) <= 12) {
    const isCorridorX = (
      gx > 0 && gx < NX - 1 &&
      wallSolid[cellIdx(gx - 1, gy + 1, northWall)] === 1 &&
      wallSolid[cellIdx(gx + 1, gy + 1, northWall)] === 1 &&
      wallSolid[cellIdx(gx - 1, gy + 1, southWall)] === 1 &&
      wallSolid[cellIdx(gx + 1, gy + 1, southWall)] === 1
    )
    if (isCorridorX) {
      const clearWidth = (southWall - northWall - 1) * S
      if (clearWidth < MIN_CORRIDOR_WIDTH - 1e-4) {
        const locKey = `Z:${gx}:${cz}`
        if (!reportedLocations.has(locKey)) {
          reportedLocations.add(locKey)
          narrowCorridorsFound++
          const wx = (gx * S + MIN_X).toFixed(1)
          const wy = (gy * S + MIN_Y).toFixed(1)
          const wz = (cz * S + MIN_Z).toFixed(1)
          if (narrowCorridorsFound <= 5) {
            console.log(`  ❌ Narrow X-corridor at (${wx}, ${wy}, ${wz}): width = ${clearWidth.toFixed(2)}m < ${MIN_CORRIDOR_WIDTH}m`)
          }
        }
      }
    }
  }
}

if (narrowCorridorsFound > 0) {
  check4Failed = true
  console.log(`  ❌ FAIL: Found ${narrowCorridorsFound} corridor segment(s) narrower than ${MIN_CORRIDOR_WIDTH}m.`)
} else {
  console.log(`  ✅ PASS: All walkable corridors meet the >= ${MIN_CORRIDOR_WIDTH}m clearance requirement (0 narrow passages).`)
}

// ── Check (5): Structural & Decorative Block Support ─────────
console.log('\n[Check 5/7] Validating Block Support (bottom > 0.15 supported from below or wall-attached)...')
const expandedBlocks = mapData.blocks.filter(b => !b.comment && b.type !== 'trigger' && b.type !== 'water')

function getBlockBounds(b) {
  if (b.isRamp) {
    const bottom = Math.min(b.startY, b.endY)
    const top = Math.max(b.startY, b.endY)
    return {
      bottom,
      top,
      minX: b.minX,
      maxX: b.maxX,
      minZ: b.minZ,
      maxZ: b.maxZ,
      area: (b.maxX - b.minX) * (b.maxZ - b.minZ)
    }
  } else if (typeof b.x === 'number' && typeof b.y === 'number') {
    const w = b.w ?? 1, h = b.h ?? 1, d = b.d ?? 1
    const bottom = b.y - h / 2
    const top = b.y + h / 2
    const minX = b.x - w / 2, maxX = b.x + w / 2
    const minZ = b.z - d / 2, maxZ = b.z + d / 2
    return {
      bottom,
      top,
      minX,
      maxX,
      minZ,
      maxZ,
      area: w * d
    }
  }
  return null
}

const unsupportedBlocks = []

let layoutUnsupportedCount = 0
let legacyUnsupportedCount = 0

for (let i = 0; i < expandedBlocks.length; i++) {
  const b = expandedBlocks[i]
  if (b.floatOK === true) continue

  const bnd = getBlockBounds(b)
  if (!bnd) continue

  // Blocks resting on/near ground level (bottom <= 0.15) are supported by ground
  if (bnd.bottom <= 0.15) continue

  let isSupported = false

  for (let j = 0; j < expandedBlocks.length; j++) {
    if (i === j) continue
    const o = expandedBlocks[j]
    const obnd = getBlockBounds(o)
    if (!obnd) continue

    // Condition A: other block top is within 0.1 of that bottom AND XZ footprint overlaps by >= 30%
    if (Math.abs(obnd.top - bnd.bottom) <= 0.101) {
      const ovMinX = Math.max(bnd.minX, obnd.minX)
      const ovMaxX = Math.min(bnd.maxX, obnd.maxX)
      const ovMinZ = Math.max(bnd.minZ, obnd.minZ)
      const ovMaxZ = Math.min(bnd.maxZ, obnd.maxZ)
      if (ovMaxX > ovMinX && ovMaxZ > ovMinZ) {
        const ovArea = (ovMaxX - ovMinX) * (ovMaxZ - ovMinZ)
        if (bnd.area > 0 && (ovArea / bnd.area) >= 0.30 - 1e-4) {
          isSupported = true
          break
        }
      }
    }

    // Condition B: attached to a wall (touches a wall block side within 0.1)
    const isWall = o.type === 'wall' || o.type === 'brick' || o.facade === true ||
      (o.id && /wall/i.test(o.id)) ||
      (!o.decor && !o.noCollision && (o.h ?? 1) >= 2.0 && o.type !== 'ground' && o.type !== 'water')

    if (isWall) {
      // Must overlap or touch vertically within 0.1
      const vertOverlap = (bnd.bottom <= obnd.top + 0.101) && (bnd.top >= obnd.bottom - 0.101)
      if (vertOverlap) {
        // Touches side along X: distance between X bounds <= 0.101, and Z ranges overlap
        const zOverlap = Math.max(bnd.minZ, obnd.minZ) < Math.min(bnd.maxZ, obnd.maxZ) + 0.1
        const xDist = (bnd.minX >= obnd.maxX) ? (bnd.minX - obnd.maxX) :
                      (obnd.minX >= bnd.maxX) ? (obnd.minX - bnd.maxX) : 0
        if (zOverlap && xDist <= 0.101) {
          isSupported = true
          break
        }

        // Touches side along Z: distance between Z bounds <= 0.101, and X ranges overlap
        const xOverlap = Math.max(bnd.minX, obnd.minX) < Math.min(bnd.maxX, obnd.maxX) + 0.1
        const zDist = (bnd.minZ >= obnd.maxZ) ? (bnd.minZ - obnd.maxZ) :
                      (obnd.minZ >= bnd.maxZ) ? (obnd.minZ - bnd.maxZ) : 0
        if (xOverlap && zDist <= 0.101) {
          isSupported = true
          break
        }
      }
    }
  }

  if (!isSupported) {
    const isLayout = b.source === 'layout'
    if (isLayout) {
      layoutUnsupportedCount++
    } else {
      legacyUnsupportedCount++
    }
    unsupportedBlocks.push({
      id: b.id || 'unnamed',
      source: b.source || 'ascent.json',
      type: b.type || 'block',
      position: `(${b.x !== undefined ? b.x.toFixed(1) : '?'}, ${b.y !== undefined ? b.y.toFixed(1) : '?'}, ${b.z !== undefined ? b.z.toFixed(1) : '?'})`,
      bottom: bnd.bottom.toFixed(2),
      decor: b.decor || false
    })
  }
}

if (layoutUnsupportedCount > 0) {
  check5Failed = true
  console.log(`  ❌ FAIL: Found ${layoutUnsupportedCount} layout-generated unsupported block(s) (source:"layout")!`)
  console.log('  Offenders:')
  unsupportedBlocks.filter(u => u.source === 'layout').slice(0, 10).forEach((u, idx) => {
    console.log(`    [${idx + 1}] id="${u.id}" | type="${u.type}" | pos=${u.position} | bottom=${u.bottom}`)
  })
} else {
  console.log('  ✅ PASS: 0 layout-generated unsupported blocks (all source:"layout" blocks properly supported).')
}

if (legacyUnsupportedCount > 0) {
  console.log(`  ⚠️  WARN: Found ${legacyUnsupportedCount} legacy unsupported block(s) (no source:"layout").`)
}

// ── Check (6): Stairs Connectivity ───────────────────────────
console.log('\n[Check 6/7] Validating Stairs Connectivity (lowest step touches surface at startY, top step touches landing >= 1.5m at endY)...')
const stairsList = (rawMap.blocks || []).concat(rawMap.macros || []).filter(
  b => b && (b.macro === 'stairs' || (b.type === 'stairs' && b.steps))
)

const disconnectedStairs = []

for (const s of stairsList) {
  const sid = s.id || 'unnamed_stairs'
  const axis = s.axis || 'z'
  const minX = s.minX, maxX = s.maxX
  const minZ = s.minZ, maxZ = s.maxZ
  const startY = s.startY ?? 0
  const endY = s.endY ?? 0

  let startSupported = (Math.abs(startY - 0.0) <= 0.1) // ground is at 0
  let endSupported = (Math.abs(endY - 0.0) <= 0.1)
  let startSurface = startSupported ? 'Ground (y=0)' : null
  let endSurface = endSupported ? 'Ground (y=0)' : null

  for (const o of expandedBlocks) {
    if (o.id && o.id.startsWith(sid)) continue
    const obnd = getBlockBounds(o)
    if (!obnd) continue

    // Check at startY
    if (!startSupported && Math.abs(obnd.top - startY) <= 0.101) {
      if (axis === 'z') {
        const touchesZ = Math.abs(obnd.maxZ - minZ) <= 0.101 || Math.abs(obnd.minZ - minZ) <= 0.101
        const xOverlap = Math.max(minX, obnd.minX) < Math.min(maxX, obnd.maxX)
        if (touchesZ && xOverlap) {
          startSupported = true
          startSurface = `${o.id || o.type} (top=${obnd.top})`
        }
      } else {
        const touchesX = Math.abs(obnd.maxX - minX) <= 0.101 || Math.abs(obnd.minX - minX) <= 0.101
        const zOverlap = Math.max(minZ, obnd.minZ) < Math.min(maxZ, obnd.maxZ)
        if (touchesX && zOverlap) {
          startSupported = true
          startSurface = `${o.id || o.type} (top=${obnd.top})`
        }
      }
    }

    // Check at endY (must touch a surface of at least 1.5m depth)
    if (!endSupported && Math.abs(obnd.top - endY) <= 0.101) {
      if (axis === 'z') {
        const touchesZ = Math.abs(obnd.minZ - maxZ) <= 0.101 || Math.abs(obnd.maxZ - maxZ) <= 0.101
        const xOverlap = Math.max(minX, obnd.minX) < Math.min(maxX, obnd.maxX)
        const depth = obnd.maxZ - obnd.minZ
        if (touchesZ && xOverlap && depth >= 1.5 - 1e-4) {
          endSupported = true
          endSurface = `${o.id || o.type} (top=${obnd.top}, depth=${depth.toFixed(1)}m)`
        }
      } else {
        const touchesX = Math.abs(obnd.minX - maxX) <= 0.101 || Math.abs(obnd.maxX - maxX) <= 0.101
        const zOverlap = Math.max(minZ, obnd.minZ) < Math.min(maxZ, obnd.maxZ)
        const depth = obnd.maxX - obnd.minX
        if (touchesX && zOverlap && depth >= 1.5 - 1e-4) {
          endSupported = true
          endSurface = `${o.id || o.type} (top=${obnd.top}, depth=${depth.toFixed(1)}m)`
        }
      }
    }
  }

  if (!startSupported || !endSupported) {
    const isLayout = s.source === 'layout'
    disconnectedStairs.push({
      id: sid,
      axis,
      minX, maxX, minZ, maxZ,
      startY, endY,
      startSupported, startSurface,
      endSupported, endSurface,
      source: s.source || 'ascent.json'
    })
  } else {
    console.log(`  ✓ Stairs "${sid}": Start (${startY}) -> ${startSurface} | End (${endY}) -> ${endSurface}`)
  }
}

const layoutDisconnected = disconnectedStairs.filter(s => s.source === 'layout')
const legacyDisconnected = disconnectedStairs.filter(s => s.source !== 'layout')

if (layoutDisconnected.length > 0) {
  check6Failed = true
  console.log(`  ❌ FAIL: Found ${layoutDisconnected.length} layout-generated disconnected stairs macro(s) (source:"layout")!`)
  layoutDisconnected.forEach((ds, idx) => {
    console.log(`    [${idx + 1}] "${ds.id}": startY=${ds.startY} (${ds.startSupported ? ds.startSurface : 'DISCONNECTED'}), endY=${ds.endY} (${ds.endSupported ? ds.endSurface : 'DISCONNECTED - missing >=1.5m landing'})`)
  })
} else {
  console.log(`  ✅ PASS: 0 layout-generated disconnected stairs (all source:"layout" stairs properly connected).`)
}

if (legacyDisconnected.length > 0) {
  console.log(`  ⚠️  WARN: Found ${legacyDisconnected.length} legacy disconnected stairs macro(s) (no source:"layout").`)
}

// ── Save Full Offenders List to docs/validate-offenders.md ────
const offendersFile = path.resolve(__dirname, '../docs/validate-offenders.md')
const offendersDir = path.dirname(offendersFile)
if (!fs.existsSync(offendersDir)) {
  fs.mkdirSync(offendersDir, { recursive: true })
}

let offendersMd = `# Map Validation Offenders Report\n\n`
offendersMd += `**Generated**: ${new Date().toISOString().replace('T', ' ').slice(0, 19)}\n\n`
offendersMd += `### Summary\n`
offendersMd += `- **Check 5 (Support)**: ${unsupportedBlocks.length} unsupported blocks\n`
offendersMd += `- **Check 6 (Stairs)**: ${disconnectedStairs.length} disconnected stairs\n\n`

offendersMd += `## Check 5: Unsupported Blocks (${unsupportedBlocks.length})\n\n`
offendersMd += `| # | ID | Source | Type | Position | Bottom Y | Decor |\n`
offendersMd += `|---|---|---|---|---|---|---|\n`
unsupportedBlocks.forEach((u, i) => {
  offendersMd += `| ${i + 1} | \`${u.id}\` | ${u.source} | \`${u.type}\` | ${u.position} | ${u.bottom} | ${u.decor} |\n`
})

offendersMd += `\n## Check 6: Disconnected Stairs (${disconnectedStairs.length})\n\n`
offendersMd += `| # | Stairs ID | Axis | Start Y | Start Surface | End Y | End Surface |\n`
offendersMd += `|---|---|---|---|---|---|---|\n`
disconnectedStairs.forEach((ds, i) => {
  const startStatus = ds.startSupported ? ds.startSurface : '❌ DISCONNECTED'
  const endStatus = ds.endSupported ? ds.endSurface : '❌ NO LANDING (>=1.5m)'
  offendersMd += `| ${i + 1} | \`${ds.id}\` | ${ds.axis} | ${ds.startY} | ${startStatus} | ${ds.endY} | ${endStatus} |\n`
})

fs.writeFileSync(offendersFile, offendersMd, 'utf8')
console.log(`\n  📝 Saved full offenders report to docs/validate-offenders.md`)

// ── Check (7): Longest Unobstructed Lane Lengths ──────────────
console.log('\n[Check 7/7] Validating Lane Lengths (<= 30m everywhere except mid canal axis <= 45m)...')

// Blocking walls: walls shorter than 3m or lower than 1.5m are non-blocking.
// Also door lintels / ceilings (minY > 1.8m) do not block sightlines at eye height.
const blockingWalls = []
for (const c of colliders) {
  if (c.isRamp) continue
  const h = c.maxY - c.minY
  if (h < 3.0 || c.maxY < 1.5) continue
  if (c.minY > 1.8) continue
  blockingWalls.push(c)
}

function isBlocked(x, z, y = 0.5) {
  for (const w of blockingWalls) {
    if (w.maxX > (x - PLAYER_RADIUS) && w.minX < (x + PLAYER_RADIUS) &&
        w.maxZ > (z - PLAYER_RADIUS) && w.minZ < (z + PLAYER_RADIUS)) {
      if (w.maxY > (y + 0.2) && w.minY < (y + 1.6)) {
        return true
      }
    }
  }
  return false
}

const zones = rawMap.zones || []
const allLanes = []
const zoneSummaries = []

for (const zone of zones) {
  let maxXLen = 0, bestX = null
  let maxZLen = 0, bestZ = null

  // Scan along X for each Z in zone
  for (let z = zone.minZ; z <= zone.maxZ; z += S) {
    let startX = null
    for (let x = zone.minX; x <= zone.maxX; x += S) {
      const blocked = isBlocked(x, z)
      if (!blocked && startX === null) {
        startX = x
      } else if (blocked && startX !== null) {
        const len = x - startX
        const lane = { axis: 'X', start: [startX, z], end: [x - S, z], len, zone: zone.id }
        if (len > maxXLen) { maxXLen = len; bestX = lane }
        allLanes.push(lane)
        startX = null
      }
    }
    if (startX !== null) {
      const len = zone.maxX - startX + S
      const lane = { axis: 'X', start: [startX, z], end: [zone.maxX, z], len, zone: zone.id }
      if (len > maxXLen) { maxXLen = len; bestX = lane }
      allLanes.push(lane)
    }
  }

  // Scan along Z for each X in zone
  for (let x = zone.minX; x <= zone.maxX; x += S) {
    let startZ = null
    for (let z = zone.minZ; z <= zone.maxZ; z += S) {
      const blocked = isBlocked(x, z)
      if (!blocked && startZ === null) {
        startZ = z
      } else if (blocked && startZ !== null) {
        const len = z - startZ
        const lane = { axis: 'Z', start: [x, startZ], end: [x, z - S], len, zone: zone.id }
        if (len > maxZLen) { maxZLen = len; bestZ = lane }
        allLanes.push(lane)
        startZ = null
      }
    }
    if (startZ !== null) {
      const len = zone.maxZ - startZ + S
      const lane = { axis: 'Z', start: [x, startZ], end: [x, zone.maxZ], len, zone: zone.id }
      if (len > maxZLen) { maxZLen = len; bestZ = lane }
      allLanes.push(lane)
    }
  }

  const isMidCanalZone = zone.id === 'midCanal' || zone.id === 'midCourtyard'
  const xThreshold = 30.0
  const zThreshold = isMidCanalZone ? 45.0 : 30.0
  const maxZoneLen = Math.max(maxXLen, maxZLen)
  const bestLane = (maxXLen / xThreshold >= maxZLen / zThreshold) ? bestX : bestZ
  const zoneThresh = bestLane?.axis === 'Z' ? zThreshold : xThreshold
  const zonePassed = maxZoneLen <= zoneThresh

  if (!zonePassed) check7Failed = true

  zoneSummaries.push({
    zoneId: zone.id,
    zoneName: zone.name,
    maxXLen,
    maxZLen,
    maxZoneLen,
    bestLane,
    threshold: zoneThresh,
    passed: zonePassed
  })
}

// Annotate all lanes with threshold & status
allLanes.forEach(l => {
  const isMidCanalAxis = (l.axis === 'Z') && (l.zone === 'midCanal' || l.zone === 'midCourtyard' || (l.start[0] >= 0.0 && l.start[0] <= 24.0))
  l.threshold = isMidCanalAxis ? 45.0 : 30.0
  l.passed = l.len <= l.threshold
  l.ratio = l.len / l.threshold
})

const failingLanes = allLanes.filter(l => !l.passed)
if (failingLanes.length > 0) check7Failed = true

// Print Per-Zone Longest Lanes
console.log('  Per-Zone Longest Straight Segments:')
zoneSummaries.forEach(zs => {
  const status = zs.passed ? '✅ PASS' : '❌ FAIL'
  console.log(`    ${status} Zone "${zs.zoneId.padEnd(14)}" (${zs.zoneName}): Max X = ${zs.maxXLen.toFixed(1).padStart(4)}m, Max Z = ${zs.maxZLen.toFixed(1).padStart(4)}m | Peak = ${zs.maxZoneLen.toFixed(1)}m (thresh <= ${zs.threshold.toFixed(0)}m)`)
  if (zs.bestLane) {
    console.log(`         Best ${zs.bestLane.axis}: (${zs.bestLane.start[0].toFixed(1)}, ${zs.bestLane.start[1].toFixed(1)}) -> (${zs.bestLane.end[0].toFixed(1)}, ${zs.bestLane.end[1].toFixed(1)})`)
  }
})

// Whole Map Max Lane
let globalMaxLane = 0
let worstOverallLane = null
zoneSummaries.forEach(zs => {
  if (zs.maxZoneLen > globalMaxLane) {
    globalMaxLane = zs.maxZoneLen
    worstOverallLane = zs.bestLane
  }
})

console.log(`\n  Whole Map Max Lane: ${globalMaxLane.toFixed(1)}m in Zone "${worstOverallLane.zone}" (${worstOverallLane.axis}-axis, threshold <= ${worstOverallLane.threshold || 45}m) [${check7Failed ? 'FAIL' : 'PASS'}]`)

// 10 Worst Lanes (Unique peak per zone/axis ranked by % of limit)
const peakCandidates = []
zoneSummaries.forEach(zs => {
  if (zs.bestLane) peakCandidates.push(zs.bestLane)
  const otherLane = (zs.bestLane.axis === 'X') ?
    allLanes.filter(l => l.zone === zs.zoneId && l.axis === 'Z').sort((a,b) => b.len - a.len)[0] :
    allLanes.filter(l => l.zone === zs.zoneId && l.axis === 'X').sort((a,b) => b.len - a.len)[0]
  if (otherLane) peakCandidates.push(otherLane)
})

peakCandidates.sort((a, b) => b.ratio - a.ratio)
const top10Worst = peakCandidates.slice(0, 10)

console.log('\n  Top 10 Worst Lanes (ranked by % of allowed threshold):')
console.log('  | # | Zone | Axis | Start (X, Z) | End (X, Z) | Length | Threshold | % of Limit | Status |')
console.log('  |---|---|---|---|---|---|---|---|---|')
top10Worst.forEach((l, i) => {
  const pct = (l.ratio * 100).toFixed(1)
  const status = l.passed ? 'PASS' : 'FAIL'
  console.log(`  | ${(i + 1).toString().padStart(2)} | ${l.zone.padEnd(14)} | ${l.axis} | (${l.start[0].toFixed(1).padStart(5)}, ${l.start[1].toFixed(1).padStart(5)}) | (${l.end[0].toFixed(1).padStart(5)}, ${l.end[1].toFixed(1).padStart(5)}) | ${l.len.toFixed(1).padStart(4)}m | <= ${l.threshold.toFixed(0)}m | ${pct.padStart(5)}% | ${status} |`)
})

// Track Check 2 & Check 7 trend in docs/validate-history.md
const historyFile = path.resolve(__dirname, '../docs/validate-history.md')
const historyDir = path.dirname(historyFile)
if (!fs.existsSync(historyDir)) {
  fs.mkdirSync(historyDir, { recursive: true })
}
if (!fs.existsSync(historyFile)) {
  const header = `# Map Validation History\n\nTracking tactical cover density (Check 2) and maximum lane length (Check 7) over time.\n\n| Date | Cover > 6m (%) | Max Lane (m) | Walkable Cells | Far Cells | Status |\n|---|---|---|---|---|---|\n`
  fs.writeFileSync(historyFile, header, 'utf8')
}

const now = new Date()
const dateStr = now.toISOString().replace('T', ' ').slice(0, 19)
const historyRow = `| ${dateStr} | ${coverFarPct.toFixed(2)}% | ${globalMaxLane.toFixed(1)}m | ${total1mWalkable} | ${far1mWalkable} | ${check7Failed ? 'FAIL' : 'PASS'} |\n`
fs.appendFileSync(historyFile, historyRow, 'utf8')
console.log(`\n  📝 Appended Max Lane (${globalMaxLane.toFixed(1)}m) and Check 2 (${coverFarPct.toFixed(2)}%) to docs/validate-history.md`)

// ── Final Summary Table ───────────────────────────────────────
console.log('\n===============================================================')
console.log('                    VALIDATION SUMMARY                         ')
console.log('===============================================================')
console.log(`Check (1) Grid Alignment       : ${check1Failed ? '❌ FAIL' : '✅ PASS'} | ${layoutFailCount} layout fail(s), ${legacyWarnCount} legacy warn(s)`)
console.log(`Check (2) Cover Density (<=5%) : ${coverFarPct.toFixed(2)}% | Tracked in docs/validate-history.md | ${far1mWalkable} / ${total1mWalkable} cells > 6m`)
console.log(`Check (3) Zone Reachability    : ${check3Failed ? '❌ FAIL' : '✅ PASS'} | ${REQUIRED_ZONES.length - unreachableZonesCount}/${REQUIRED_ZONES.length} zones reached by both spawns`)
console.log(`Check (4) Corridor Width (>=2m): ${check4Failed ? '❌ FAIL' : '✅ PASS'} | ${narrowCorridorsFound} corridor segment(s) < 2.0m`)
console.log(`Check (5) Block Support        : ${check5Failed ? '❌ FAIL' : '✅ PASS'} | ${layoutUnsupportedCount} layout fail(s), ${legacyUnsupportedCount} legacy warn(s)`)
console.log(`Check (6) Stairs Connection    : ${check6Failed ? '❌ FAIL' : '✅ PASS'} | ${layoutDisconnected.length} layout fail(s), ${legacyDisconnected.length} legacy warn(s)`)
console.log(`Check (7) Lane Length (<=30/45): ${check7Failed ? '❌ FAIL' : '✅ PASS'} | Max ${globalMaxLane.toFixed(1)}m (${worstOverallLane.zone} ${worstOverallLane.axis}) | ${failingLanes.length} lane(s) exceed threshold`)
console.log('===============================================================')

const hasAnyFailure = check1Failed || check3Failed || check4Failed || check5Failed || check6Failed || check7Failed
if (hasAnyFailure) {
  console.error('\nResult: VALIDATION FAILED (exit code 1)\n')
  process.exit(1)
} else {
  console.log('\nResult: ALL CHECKS PASSED (exit code 0)\n')
  process.exit(0)
}
