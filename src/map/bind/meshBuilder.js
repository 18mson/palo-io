import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import bindLayout from './bind.layout.json'
import {
  createStoneFloorTexture,
  createSandstoneTexture,
  createPlasterTexture,
  createTerracottaTexture,
  createWoodPlankTexture,
  createRoofTileTexture,
  createTrimTexture
} from './proceduralTextures.js'

/**
 * Maps a region ID to its zone category conforming to docs/map/BIND_BLUEPRINT.md §8.
 */
export function getRegionZone(regionId) {
  if (['attackerSpawn', 'attackerCave', 'aSpawnExit', 'bSpawnExit', 'aLobby', 'bLobby'].includes(regionId)) {
    return 'attacker'
  }
  if (['defenderSpawn', 'dsExitW', 'dsExitE'].includes(regionId)) {
    return 'defender'
  }
  if (['market', 'aLamps1', 'aLamps2', 'dsLink', 'bLink', 'bElbow'].includes(regionId)) {
    return 'market'
  }
  if (['aShort1', 'aShort2', 'aBath1', 'aBath2', 'aBath3', 'aShowers', 'aSite', 'aCubby', 'aHeaven', 'aCT', 'aExit', 'aTeleRoom'].includes(regionId)) {
    return 'aSide'
  }
  if (['bLong1', 'bLong2', 'bGarden', 'bShort1', 'bShortRoom', 'bHookah', 'bSite', 'bHall', 'bExit'].includes(regionId)) {
    return 'bSide'
  }
  return 'attacker'
}

/**
 * Finds the nearest walkable region from layout.regions for any bounding box.
 */
function findNearestRegion(box, regions) {
  const cx = (box.minX + box.maxX) * 0.5
  const cz = (box.minZ + box.maxZ) * 0.5
  let minDistSq = Infinity
  let nearest = null

  for (const r of regions) {
    const [rMinX, rMinZ, rMaxX, rMaxZ] = r.rect
    const dx = Math.max(0, Math.max(rMinX - cx, cx - rMaxX))
    const dz = Math.max(0, Math.max(rMinZ - cz, cz - rMaxZ))
    const distSq = dx * dx + dz * dz
    if (distSq < minDistSq) {
      minDistSq = distSq
      nearest = r
    }
  }
  return nearest
}

/**
 * Converts a bounding box to BoxGeometry with world-scaled UV coordinates (1 unit per 2m).
 */
function boxToGeometry(b, uvScale = 0.5) {
  const width = Math.max(0.01, b.maxX - b.minX)
  const height = Math.max(0.01, b.topY - b.bottomY)
  const depth = Math.max(0.01, b.maxZ - b.minZ)
  const cx = (b.minX + b.maxX) * 0.5
  const cy = (b.bottomY + b.topY) * 0.5
  const cz = (b.minZ + b.maxZ) * 0.5

  const geo = new THREE.BoxGeometry(width, height, depth)

  // Scale UVs per face so procedural textures repeat proportionally without stretching
  const uvAttr = geo.attributes.uv
  const uvs = uvAttr.array
  const spans = [
    [depth, height], // +X
    [depth, height], // -X
    [width, depth],  // +Y (top)
    [width, depth],  // -Y (bottom)
    [width, height], // +Z
    [width, height], // -Z
  ]
  for (let f = 0; f < 6; f++) {
    const [uSpan, vSpan] = spans[f]
    for (let v = 0; v < 4; v++) {
      const idx = (f * 4 + v) * 2
      uvs[idx] *= uSpan * uvScale
      uvs[idx + 1] *= vSpan * uvScale
    }
  }
  uvAttr.needsUpdate = true

  geo.translate(cx, cy, cz)
  return geo
}

/**
 * Creates 3D merged meshes from the map bounding boxes with zone tints & procedural textures.
 * Conforms to docs/map/BIND_BLUEPRINT.md §8.
 */
export function buildMapMeshes(boxes) {
  const group = new THREE.Group()
  group.name = 'bind-map-geometry'

  const regions = bindLayout.regions || []

  function createMergedMesh(boxList, material, castShadow = true, receiveShadow = true) {
    if (!boxList || boxList.length === 0) return null
    const geos = boxList.map(b => boxToGeometry(b, 0.5))
    const mergedGeo = BufferGeometryUtils.mergeGeometries(geos, false)
    geos.forEach(g => g.dispose())

    const mesh = new THREE.Mesh(mergedGeo, material)
    mesh.castShadow = castShadow
    mesh.receiveShadow = receiveShadow
    group.add(mesh)
    return mesh
  }

  function makeMaterial(texture, fallbackHex, roughness = 0.90) {
    return new THREE.MeshStandardMaterial({
      map: texture || null,
      color: texture ? 0xffffff : fallbackHex,
      roughness,
      metalness: 0.0
    })
  }

  // ── 1. Procedural Textures & Materials ──────────────────────────────────
  // Floors: Mid-dark stone pavers per zone (never blown out white)
  const floorTexAttacker = createStoneFloorTexture('#8f8a80', '#5c5850')
  const floorTexASide    = createStoneFloorTexture('#8a8277', '#565047')
  const floorTexBSide    = createStoneFloorTexture('#86868a', '#545458')
  const floorTexMarket   = createStoneFloorTexture('#7d756a', '#4e483f')
  const floorTexDefender = createStoneFloorTexture('#85808a', '#524e58')
  const floorTexL1Wood   = createWoodPlankTexture('#a07850', '#543b23')

  const floorMatAttacker = makeMaterial(floorTexAttacker, 0x8f8a80, 0.92)
  const floorMatASide    = makeMaterial(floorTexASide, 0x8a8277, 0.92)
  const floorMatBSide    = makeMaterial(floorTexBSide, 0x86868a, 0.92)
  const floorMatMarket   = makeMaterial(floorTexMarket, 0x7d756a, 0.92)
  const floorMatDefender = makeMaterial(floorTexDefender, 0x85808a, 0.92)
  const floorMatL1Wood   = makeMaterial(floorTexL1Wood, 0xa07850, 0.88)

  // Walls: Sandstone, plaster, terracotta, cool stone
  const wallTexSandstone  = createSandstoneTexture('#c9b08a', '#9c8764')
  const wallTexPlaster    = createPlasterTexture('#d8cfc0', '#b5ab9a')
  const wallTexTerracotta = createTerracottaTexture('#b8654a', '#7d3822')
  const wallTexStone      = createPlasterTexture('#b9b3a8', '#948e84')

  const wallMatAttacker = makeMaterial(wallTexSandstone, 0xc9b08a, 0.88)
  const wallMatASide    = makeMaterial(wallTexSandstone, 0xc9b08a, 0.88)
  const wallMatBSide    = makeMaterial(wallTexPlaster, 0xd8cfc0, 0.90)
  const wallMatMarket   = makeMaterial(wallTexTerracotta, 0xb8654a, 0.88)
  const wallMatDefender = makeMaterial(wallTexStone, 0xb9b3a8, 0.90)

  // Base Trims: Zone accent colors
  const trimTexAttacker = createTrimTexture('#b84a4a', '#782626')
  const trimTexASide    = createWoodPlankTexture('#7a5230', '#4a301a')
  const trimTexBSide    = createTrimTexture('#2f8f8a', '#1a5c58')
  const trimTexMarket   = createTrimTexture('#7a3520', '#4e1e10')
  const trimTexDefender = createTrimTexture('#4a7ab8', '#264e7d')

  const trimMatAttacker = makeMaterial(trimTexAttacker, 0xb84a4a, 0.85)
  const trimMatASide    = makeMaterial(trimTexASide, 0x7a5230, 0.85)
  const trimMatBSide    = makeMaterial(trimTexBSide, 0x2f8f8a, 0.85)
  const trimMatMarket   = makeMaterial(trimTexMarket, 0x7a3520, 0.85)
  const trimMatDefender = makeMaterial(trimTexDefender, 0x4a7ab8, 0.85)

  // Top Trim (Wall Cap Coping Stone)
  const trimTexTop = createTrimTexture('#3d3d40', '#222224')
  const trimMatTop = makeMaterial(trimTexTop, 0x3d3d40, 0.85)

  // Roof Tiles: Blue-gray
  const roofTexTile = createRoofTileTexture('#5d7388', '#384959')
  const roofMat     = makeMaterial(roofTexTile, 0x5d7388, 0.88)

  // Stairs & Rails
  const stairTex = createStoneFloorTexture('#7c7e82', '#4b4d52')
  const stairMat = makeMaterial(stairTex, 0x7c7e82, 0.85)
  const railMatL0 = makeMaterial(trimTexTop, 0x3d3d40, 0.75)
  const railMatL1 = makeMaterial(createWoodPlankTexture('#3d2b1a', '#22150a'), 0x3d2b1a, 0.82)

  // Props
  const crateTex     = createWoodPlankTexture('#8c7355', '#574229')
  const crateMat     = makeMaterial(crateTex, 0x8c7355, 0.85)
  const containerMat = new THREE.MeshStandardMaterial({
    color: 0x2f5a6b, // Teal steel shipping container
    roughness: 0.50,
    metalness: 0.0   // No metalness per spec
  })
  const pillarMat    = makeMaterial(wallTexSandstone, 0x6e7075, 0.88)
  const planterMat   = makeMaterial(trimTexBSide, 0x405c48, 0.88)
  const stallMat     = makeMaterial(wallTexTerracotta, 0x9e5842, 0.88)
  const awningMat    = makeMaterial(createTrimTexture('#e0b050', '#9c7528'), 0xe0b050, 0.85)
  const windowMat    = makeMaterial(trimTexTop, 0x5a5c60, 0.80)

  // ── Debug Level Materials (F5) ──────────────────────────────────────────
  const level0DebugMat = new THREE.MeshStandardMaterial({
    color: 0x75787d, // Gray for Level 0
    roughness: 0.88,
    metalness: 0.0
  })
  const level1DebugMat = new THREE.MeshStandardMaterial({
    color: 0xe67e22, // Orange for Level 1
    roughness: 0.85,
    metalness: 0.0
  })
  const stairDebugMat = new THREE.MeshStandardMaterial({
    color: 0xf39c12, // Amber for Stairs
    roughness: 0.85,
    metalness: 0.0
  })

  // ── 2. Wall Boxes Partitioned by Nearest Walkable Region ────────────────
  const wallsByZone = {
    attacker: [],
    aSide: [],
    bSide: [],
    market: [],
    defender: []
  }

  // Trim bands generated from wall boxes
  const baseTrimsByZone = {
    attacker: [],
    aSide: [],
    bSide: [],
    market: [],
    defender: []
  }
  const topTrims = []

  const isL1Region = (b) => {
    // aHeaven bounds [-54, -20, -44, -14], bHookah bounds [24, -4, 34, 4]
    if (b.maxX >= -54 && b.minX <= -44 && b.maxZ >= -20 && b.minZ <= -14) return true
    if (b.maxX >= 24 && b.minX <= 34 && b.maxZ >= -4 && b.minZ <= 4) return true
    return false
  }

  for (const b of boxes.wallBoxes || []) {
    const nearest = findNearestRegion(b, regions)
    const zone = nearest ? getRegionZone(nearest.id) : 'attacker'
    wallsByZone[zone].push(b)

    // Generate architectural trim bands from wall boxes
    const wallHeight = b.topY - b.bottomY
    if (wallHeight >= 1.0) {
      // 1. Dark base trim band (bottomY to bottomY + 0.35m) with slight outward bevel (1.5cm)
      baseTrimsByZone[zone].push({
        minX: b.minX - 0.015,
        maxX: b.maxX + 0.015,
        minZ: b.minZ - 0.015,
        maxZ: b.maxZ + 0.015,
        bottomY: b.bottomY,
        topY: b.bottomY + 0.35,
        type: 'trimBase'
      })

      // 2. Dark top trim band / wall cap (topY - 0.25m to topY) with coping lip (2cm)
      topTrims.push({
        minX: b.minX - 0.02,
        maxX: b.maxX + 0.02,
        minZ: b.minZ - 0.02,
        maxZ: b.maxZ + 0.02,
        bottomY: b.topY - 0.25,
        topY: b.topY,
        type: 'trimTop'
      })
    }
  }

  // Create merged wall meshes per zone
  const wallConfig = [
    { zone: 'attacker', mat: wallMatAttacker },
    { zone: 'aSide',    mat: wallMatASide },
    { zone: 'bSide',    mat: wallMatBSide },
    { zone: 'market',   mat: wallMatMarket },
    { zone: 'defender', mat: wallMatDefender }
  ]

  for (const { zone, mat } of wallConfig) {
    const wallMesh = createMergedMesh(wallsByZone[zone], mat, true, true)
    if (wallMesh) {
      // Flag L1 walls for F5 debug
      const hasL1 = wallsByZone[zone].some(isL1Region)
      wallMesh.userData.level = hasL1 ? 1 : 0
      wallMesh.userData.origMat = mat
    }

    // Base trim mesh per zone
    const trimMesh = createMergedMesh(baseTrimsByZone[zone], {
      attacker: trimMatAttacker,
      aSide: trimMatASide,
      bSide: trimMatBSide,
      market: trimMatMarket,
      defender: trimMatDefender
    }[zone], true, true)
    if (trimMesh) {
      trimMesh.userData.level = 0
      trimMesh.userData.origMat = trimMesh.material
    }
  }

  // Merged top coping stone trim
  const topTrimMesh = createMergedMesh(topTrims, trimMatTop, true, true)
  if (topTrimMesh) {
    topTrimMesh.userData.level = 0
    topTrimMesh.userData.origMat = trimMatTop
  }

  // ── 3. Floors Partitioned by Zone ───────────────────────────────────────
  const floorsByZone = {
    attacker: [],
    aSide: [],
    bSide: [],
    market: [],
    defender: []
  }
  const l1Floors = []

  for (const b of boxes.floorBoxes || []) {
    if (b.type === 'floorL1') {
      l1Floors.push(b)
    } else {
      const nearest = findNearestRegion(b, regions)
      const zone = nearest ? getRegionZone(nearest.id) : 'attacker'
      floorsByZone[zone].push(b)
    }
  }

  const floorConfig = [
    { zone: 'attacker', mat: floorMatAttacker },
    { zone: 'aSide',    mat: floorMatASide },
    { zone: 'bSide',    mat: floorMatBSide },
    { zone: 'market',   mat: floorMatMarket },
    { zone: 'defender', mat: floorMatDefender }
  ]

  for (const { zone, mat } of floorConfig) {
    const floorMesh = createMergedMesh(floorsByZone[zone], mat, false, true)
    if (floorMesh) {
      floorMesh.userData.level = 0
      floorMesh.userData.origMat = mat
    }
  }

  // Level 1 Wood Plinth / Floors
  const l1FloorMesh = createMergedMesh(l1Floors, floorMatL1Wood, true, true)
  if (l1FloorMesh) {
    l1FloorMesh.userData.level = 1
    l1FloorMesh.userData.origMat = floorMatL1Wood
  }

  // ── 4. Lintels (Door Openings) ───────────────────────────────────────────
  // Door lintels match wall material of their zone
  const lintelsByZone = { attacker: [], aSide: [], bSide: [], market: [], defender: [] }
  for (const b of boxes.lintelBoxes || []) {
    const nearest = findNearestRegion(b, regions)
    const zone = nearest ? getRegionZone(nearest.id) : 'attacker'
    lintelsByZone[zone].push(b)
  }
  for (const { zone, mat } of wallConfig) {
    const lintelMesh = createMergedMesh(lintelsByZone[zone], mat, true, true)
    if (lintelMesh) {
      lintelMesh.userData.level = 0
      lintelMesh.userData.origMat = mat
    }
  }

  // ── 5. Windows (Sills and Heads) ─────────────────────────────────────────
  const windowMesh = createMergedMesh(boxes.windowBoxes, windowMat, true, true)
  if (windowMesh) {
    windowMesh.userData.level = 0
    windowMesh.userData.origMat = windowMat
  }

  // ── 6. Stairs ────────────────────────────────────────────────────────────
  const stairMesh = createMergedMesh(boxes.stairBoxes, stairMat, true, true)
  if (stairMesh) {
    stairMesh.userData.level = 'stair'
    stairMesh.userData.origMat = stairMat
  }

  // ── 7. Rails ─────────────────────────────────────────────────────────────
  const l0Rails = (boxes.railBoxes || []).filter(b => b.bottomY < 3.0)
  const l1Rails = (boxes.railBoxes || []).filter(b => b.bottomY >= 3.0)
  const l0RailMesh = createMergedMesh(l0Rails, railMatL0, true, true)
  if (l0RailMesh) {
    l0RailMesh.userData.level = 0
    l0RailMesh.userData.origMat = railMatL0
  }
  const l1RailMesh = createMergedMesh(l1Rails, railMatL1, true, true)
  if (l1RailMesh) {
    l1RailMesh.userData.level = 1
    l1RailMesh.userData.origMat = railMatL1
  }

  // ── 8. Roofs & Eaves (Blue-Gray Tiles) ───────────────────────────────────
  const l0Roofs = (boxes.roofBoxes || []).filter(b => b.bottomY < 6.0)
  const l1Roofs = (boxes.roofBoxes || []).filter(b => b.bottomY >= 6.0)
  const l0RoofMesh = createMergedMesh(l0Roofs, roofMat, true, true)
  if (l0RoofMesh) {
    l0RoofMesh.userData.level = 0
    l0RoofMesh.userData.origMat = roofMat
  }
  const l1RoofMesh = createMergedMesh(l1Roofs, roofMat, true, true)
  if (l1RoofMesh) {
    l1RoofMesh.userData.level = 1
    l1RoofMesh.userData.origMat = roofMat
  }

  // ── 9. Props Partitioned by Type ─────────────────────────────────────────
  const crates     = (boxes.propBoxes || []).filter(p => p.propType === 'crate')
  const containers = (boxes.propBoxes || []).filter(p => p.propType === 'container')
  const pillars    = (boxes.propBoxes || []).filter(p => p.propType === 'pillar' || p.propType === 'fountain')
  const planters   = (boxes.propBoxes || []).filter(p => p.propType === 'planter')
  const stalls     = (boxes.propBoxes || []).filter(p => p.propType === 'stall')

  const tagProps = (m, boxSubset) => {
    if (!m) return
    const isL1 = boxSubset.some(b => b.bottomY >= 3.0)
    m.userData.level = isL1 ? 1 : 0
    m.userData.origMat = m.material
  }

  tagProps(createMergedMesh(crates, crateMat, true, true), crates)
  tagProps(createMergedMesh(containers, containerMat, true, true), containers)
  tagProps(createMergedMesh(pillars, pillarMat, true, true), pillars)
  tagProps(createMergedMesh(planters, planterMat, true, true), planters)
  tagProps(createMergedMesh(stalls, stallMat, true, true), stalls)

  // Market stall awnings
  const awnings = stalls.map(s => ({
    minX: s.minX - 0.2,
    maxX: s.maxX + 0.2,
    minZ: s.minZ - 0.2,
    maxZ: s.maxZ + 0.2,
    bottomY: s.topY + 0.1,
    topY: s.topY + 0.35
  }))
  tagProps(createMergedMesh(awnings, awningMat, true, true), stalls)

  // ── 10. F5 Level Debug Mode Toggle ───────────────────────────────────────
  group.userData.setLevelDebugMode = (enabled) => {
    group.traverse((child) => {
      if (child.isMesh && child.userData.level !== undefined) {
        if (enabled) {
          if (child.userData.level === 1) child.material = level1DebugMat
          else if (child.userData.level === 'stair') child.material = stairDebugMat
          else child.material = level0DebugMat
        } else {
          child.material = child.userData.origMat || child.material
        }
      }
    })
  }

  // ── 11. Plant Zones (Glowing Soft Markers) ──────────────────────────────
  for (const p of boxes.plantBoxes || []) {
    const isA = p.site === 'A'
    const color = isA ? 0x00d4ff : 0xf59e0b
    const w = p.maxX - p.minX
    const d = p.maxZ - p.minZ
    const cx = (p.minX + p.maxX) * 0.5
    const cz = (p.minZ + p.maxZ) * 0.5

    const plantMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.25,
      depthWrite: false
    })
    const plantMesh = new THREE.Mesh(new THREE.PlaneGeometry(w, d), plantMat)
    plantMesh.rotation.x = -Math.PI * 0.5
    plantMesh.position.set(cx, 0.02, cz)
    group.add(plantMesh)

    const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, 0.04, d))
    const lineMat = new THREE.LineBasicMaterial({ color, linewidth: 2 })
    const line = new THREE.LineSegments(edges, lineMat)
    line.position.set(cx, 0.02, cz)
    group.add(line)
  }

  // ── 12. Teleporters (Glowing Portals & Exit Rings) ────────────────────────
  for (const t of boxes.teleporterBoxes || []) {
    const w = t.maxX - t.minX
    const d = t.maxZ - t.minZ
    const cx = (t.minX + t.maxX) * 0.5
    const cz = (t.minZ + t.maxZ) * 0.5

    if (t.type === 'tp_entry') {
      const padGeo = new THREE.PlaneGeometry(w, d)
      const padMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.65,
        depthWrite: false
      })
      const padMesh = new THREE.Mesh(padGeo, padMat)
      padMesh.rotation.x = -Math.PI * 0.5
      padMesh.position.set(cx, 0.04, cz)
      group.add(padMesh)

      const gateGeo = new THREE.PlaneGeometry(w * 0.8, 3.2)
      const gateMat = new THREE.MeshBasicMaterial({
        color: 0x34d399,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
        depthWrite: false
      })
      const gateMesh = new THREE.Mesh(gateGeo, gateMat)
      gateMesh.position.set(cx, 1.6, cz)
      group.add(gateMesh)
    } else {
      const exitGeo = new THREE.RingGeometry(1.0, 1.4, 32)
      const exitMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
        depthWrite: false
      })
      const exitMesh = new THREE.Mesh(exitGeo, exitMat)
      exitMesh.rotation.x = -Math.PI * 0.5
      exitMesh.position.set(cx, 0.03, cz)
      group.add(exitMesh)
    }
  }

  return group
}
