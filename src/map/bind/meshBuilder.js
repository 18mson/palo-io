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

  geo.computeVertexNormals()
  geo.translate(cx, cy, cz)
  return geo
}

/**
 * Creates top and side faces of a roof box (+X, -X, +Y, +Z, -Z), omitting the bottom face.
 */
function roofBoxToTopSidesGeometry(b, uvScale = 0.5) {
  const width = Math.max(0.01, b.maxX - b.minX)
  const height = Math.max(0.01, b.topY - b.bottomY)
  const depth = Math.max(0.01, b.maxZ - b.minZ)
  const cx = (b.minX + b.maxX) * 0.5
  const cy = (b.bottomY + b.topY) * 0.5
  const cz = (b.minZ + b.maxZ) * 0.5

  const geo = new THREE.BoxGeometry(width, height, depth)

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

  // Omit bottom face (-Y face, indices 18 to 23)
  const origIndices = geo.index.array
  const newIndices = new Uint16Array(30)
  newIndices.set(origIndices.subarray(0, 18), 0)
  newIndices.set(origIndices.subarray(24, 36), 18)
  geo.setIndex(new THREE.BufferAttribute(newIndices, 1))

  geo.computeVertexNormals()
  geo.translate(cx, cy, cz)
  return geo
}

/**
 * Creates the underside horizontal face (-Y) of a roof box, normal pointing straight down.
 */
function roofBoxToUndersideGeometry(b, uvScale = 0.5) {
  const width = Math.max(0.01, b.maxX - b.minX)
  const depth = Math.max(0.01, b.maxZ - b.minZ)
  const cx = (b.minX + b.maxX) * 0.5
  const cz = (b.minZ + b.maxZ) * 0.5

  const geo = new THREE.PlaneGeometry(width, depth)
  // Rotate so normal points downward (0, -1, 0)
  geo.rotateX(Math.PI * 0.5)

  const uvAttr = geo.attributes.uv
  const uvs = uvAttr.array
  for (let v = 0; v < 4; v++) {
    const idx = v * 2
    uvs[idx] *= width * uvScale
    uvs[idx + 1] *= depth * uvScale
  }
  uvAttr.needsUpdate = true

  geo.computeVertexNormals()
  geo.translate(cx, b.bottomY, cz)
  return geo
}

/**
 * Creates a glowing 3D hollow floor ring (outer radius, inner radius, height).
 */
function createRingGeometry(outerRadius, innerRadius, height) {
  const shape = new THREE.Shape()
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false)
  const hole = new THREE.Path()
  hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true)
  shape.holes.push(hole)

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: false,
    curveSegments: 32
  })
  geo.rotateX(-Math.PI * 0.5)
  geo.computeVertexNormals()
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

  function createMergedMeshFromGeos(geos, material, castShadow = true, receiveShadow = true) {
    if (!geos || geos.length === 0) return null
    const validGeos = geos.filter(Boolean)
    if (validGeos.length === 0) return null
    const mergedGeo = BufferGeometryUtils.mergeGeometries(validGeos, false)
    validGeos.forEach(g => g.dispose())

    const mesh = new THREE.Mesh(mergedGeo, material)
    mesh.castShadow = castShadow
    mesh.receiveShadow = receiveShadow
    group.add(mesh)
    return mesh
  }

  function createMergedMesh(boxList, material, castShadow = true, receiveShadow = true) {
    if (!boxList || boxList.length === 0) return null
    const geos = boxList.map(b => boxToGeometry(b, 0.5))
    return createMergedMeshFromGeos(geos, material, castShadow, receiveShadow)
  }

  function makeLambertMaterial(texture, fallbackHex, emissiveColor = 0x000000, emissiveIntensity = 1.0) {
    return new THREE.MeshLambertMaterial({
      map: texture || null,
      color: texture ? 0xffffff : fallbackHex,
      emissive: emissiveColor,
      emissiveIntensity
    })
  }

  // ── 1. Procedural Textures & Materials ──────────────────────────────────
  // Floors: Mid-dark stone pavers per zone (never blown out white)
  const floorTexAttacker = createStoneFloorTexture('#8f8a80')
  const floorTexASide    = createStoneFloorTexture('#8a8277')
  const floorTexBSide    = createStoneFloorTexture('#86868a')
  const floorTexMarket   = createStoneFloorTexture('#7d756a')
  const floorTexDefender = createStoneFloorTexture('#85808a')
  const floorTexL1Wood   = createWoodPlankTexture('#a07850', '#543b23')

  const floorMatAttacker = makeLambertMaterial(floorTexAttacker, 0x8f8a80)
  const floorMatASide    = makeLambertMaterial(floorTexASide, 0x8a8277)
  const floorMatBSide    = makeLambertMaterial(floorTexBSide, 0x86868a)
  const floorMatMarket   = makeLambertMaterial(floorTexMarket, 0x7d756a)
  const floorMatDefender = makeLambertMaterial(floorTexDefender, 0x85808a)
  const floorMatL1Wood   = makeLambertMaterial(floorTexL1Wood, 0xa07850)

  // Walls: Sandstone, plaster, terracotta, cool stone
  const wallTexSandstone  = createSandstoneTexture('#c9b08a')
  const wallTexPlaster    = createPlasterTexture('#d8cfc0')
  const wallTexTerracotta = createTerracottaTexture('#b8654a')
  const wallTexStone      = createPlasterTexture('#b9b3a8')

  // Outdoor wall materials
  const wallMatAttacker = makeLambertMaterial(wallTexSandstone, 0xc9b08a)
  const wallMatASide    = makeLambertMaterial(wallTexSandstone, 0xc9b08a)
  const wallMatBSide    = makeLambertMaterial(wallTexPlaster, 0xd8cfc0)
  const wallMatMarket   = makeLambertMaterial(wallTexTerracotta, 0xb8654a)
  const wallMatDefender = makeLambertMaterial(wallTexStone, 0xb9b3a8)

  // Indoor wall materials: raise wall emissive by 0.1 inside FULL-roofed regions
  const indoorEmissiveAttacker = new THREE.Color(0xc9b08a).multiplyScalar(0.16)
  const indoorEmissiveASide    = new THREE.Color(0xc9b08a).multiplyScalar(0.16)
  const indoorEmissiveBSide    = new THREE.Color(0xd8cfc0).multiplyScalar(0.16)
  const indoorEmissiveMarket   = new THREE.Color(0xb8654a).multiplyScalar(0.16)
  const indoorEmissiveDefender = new THREE.Color(0xb9b3a8).multiplyScalar(0.16)

  const wallMatIndoorAttacker = makeLambertMaterial(wallTexSandstone, 0xc9b08a, indoorEmissiveAttacker)
  const wallMatIndoorASide    = makeLambertMaterial(wallTexSandstone, 0xc9b08a, indoorEmissiveASide)
  const wallMatIndoorBSide    = makeLambertMaterial(wallTexPlaster, 0xd8cfc0, indoorEmissiveBSide)
  const wallMatIndoorMarket   = makeLambertMaterial(wallTexTerracotta, 0xb8654a, indoorEmissiveMarket)
  const wallMatIndoorDefender = makeLambertMaterial(wallTexStone, 0xb9b3a8, indoorEmissiveDefender)

  // Base Trims: Zone accent colors
  const trimTexAttacker = createTrimTexture('#b84a4a', '#782626')
  const trimTexASide    = createWoodPlankTexture('#7a5230', '#4a301a')
  const trimTexBSide    = createTrimTexture('#2f8f8a', '#1a5c58')
  const trimTexMarket   = createTrimTexture('#7a3520', '#4e1e10')
  const trimTexDefender = createTrimTexture('#4a7ab8', '#264e7d')

  const trimMatAttacker = makeLambertMaterial(trimTexAttacker, 0xb84a4a)
  const trimMatASide    = makeLambertMaterial(trimTexASide, 0x7a5230)
  const trimMatBSide    = makeLambertMaterial(trimTexBSide, 0x2f8f8a)
  const trimMatMarket   = makeLambertMaterial(trimTexMarket, 0x7a3520)
  const trimMatDefender = makeLambertMaterial(trimTexDefender, 0x4a7ab8)

  // Top Trim (Wall Cap Coping Stone): same MeshLambert as wall, color = wall color darkened ~25%
  const capMatAttacker = makeLambertMaterial(createTrimTexture('#978468', '#7f6f57'), 0x978468)
  const capMatASide    = makeLambertMaterial(createTrimTexture('#978468', '#7f6f57'), 0x978468)
  const capMatBSide    = makeLambertMaterial(createTrimTexture('#a29b90', '#89837a'), 0xa29b90)
  const capMatMarket   = makeLambertMaterial(createTrimTexture('#8a4c38', '#743e2d'), 0x8a4c38)
  const capMatDefender = makeLambertMaterial(createTrimTexture('#8b867e', '#75716a'), 0x8b867e)

  // Roof & Eaves
  // Roof Top: Blue-gray tiles (#5d7388)
  const roofTexTile = createRoofTileTexture('#5d7388', '#384959')
  const roofMat     = makeLambertMaterial(roofTexTile, 0x5d7388)

  // Roof & Eave Undersides: wood planks texture, color #6b5238, lit normally, plus tiny emissive (0.15)
  const roofUndersideTex = createWoodPlankTexture('#6b5238', '#4c3a27')
  const roofUndersideMat = new THREE.MeshLambertMaterial({
    map: roofUndersideTex || null,
    color: 0xffffff,
    emissive: new THREE.Color(0x6b5238).multiplyScalar(0.15)
  })

  // Stairs & Rails
  const stairTex = createStoneFloorTexture('#7c7e82')
  const stairMat = makeLambertMaterial(stairTex, 0x7c7e82)
  const railMatL0 = makeLambertMaterial(createTrimTexture('#3d3d40', '#222224'), 0x3d3d40)
  const railMatL1 = makeLambertMaterial(createWoodPlankTexture('#3d2b1a', '#22150a'), 0x3d2b1a)

  // Props
  const crateTex     = createWoodPlankTexture('#8c7355', '#574229')
  const crateMat     = makeLambertMaterial(crateTex, 0x8c7355)
  const containerMat = new THREE.MeshLambertMaterial({ color: 0x2f5a6b })
  const pillarMat    = makeLambertMaterial(wallTexSandstone, 0x6e7075)
  const planterMat   = makeLambertMaterial(trimTexBSide, 0x405c48)
  const stallMat     = makeLambertMaterial(wallTexTerracotta, 0x9e5842)
  const awningMat    = makeLambertMaterial(createTrimTexture('#e0b050', '#9c7528'), 0xe0b050)
  const windowMat    = makeLambertMaterial(createTrimTexture('#3d3d40', '#222224'), 0x5a5c60)

  // ── Debug Level Materials (F5) ──────────────────────────────────────────
  const level0DebugMat = new THREE.MeshLambertMaterial({ color: 0x75787d })
  const level1DebugMat = new THREE.MeshLambertMaterial({ color: 0xe67e22 })
  const stairDebugMat  = new THREE.MeshLambertMaterial({ color: 0xf39c12 })

  // ── 2. Wall Boxes Partitioned by Nearest Walkable Region ────────────────
  const FULL_ROOFED_REGIONS = ['attackerCave', 'aTeleRoom', 'aShowers', 'aCubby', 'bShortRoom', 'bHookah']

  const wallsByZone = {
    attacker: { outdoor: [], indoor: [] },
    aSide:    { outdoor: [], indoor: [] },
    bSide:    { outdoor: [], indoor: [] },
    market:   { outdoor: [], indoor: [] },
    defender: { outdoor: [], indoor: [] }
  }

  // Trim bands generated from wall boxes
  const baseTrimsByZone = {
    attacker: [],
    aSide:    [],
    bSide:    [],
    market:   [],
    defender: []
  }
  const topTrimsByZone = {
    attacker: [],
    aSide:    [],
    bSide:    [],
    market:   [],
    defender: []
  }

  const isL1Region = (b) => {
    // aHeaven bounds [-54, -20, -44, -14], bHookah bounds [24, -4, 34, 4]
    if (b.maxX >= -54 && b.minX <= -44 && b.maxZ >= -20 && b.minZ <= -14) return true
    if (b.maxX >= 24 && b.minX <= 34 && b.maxZ >= -4 && b.minZ <= 4) return true
    return false
  }

  for (const b of boxes.wallBoxes || []) {
    const nearest = findNearestRegion(b, regions)
    const zone = nearest ? getRegionZone(nearest.id) : 'attacker'
    const isIndoor = nearest && FULL_ROOFED_REGIONS.includes(nearest.id)

    if (isIndoor) {
      wallsByZone[zone].indoor.push(b)
    } else {
      wallsByZone[zone].outdoor.push(b)
    }

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

      // 2. Wall cap (topY - 0.25m to topY) with coping lip (2cm), darkened ~25%
      topTrimsByZone[zone].push({
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

  // Create merged wall meshes per zone, partitioned by level (L0 = gray, L1 = orange)
  const isL1Wall = (b) => (b.bottomY >= 3.0)

  const wallConfig = [
    { zone: 'attacker', matOutdoor: wallMatAttacker, matIndoor: wallMatIndoorAttacker, capMat: capMatAttacker, trimMat: trimMatAttacker },
    { zone: 'aSide',    matOutdoor: wallMatASide,    matIndoor: wallMatIndoorASide,    capMat: capMatASide,    trimMat: trimMatASide },
    { zone: 'bSide',    matOutdoor: wallMatBSide,    matIndoor: wallMatIndoorBSide,    capMat: capMatBSide,    trimMat: trimMatBSide },
    { zone: 'market',   matOutdoor: wallMatMarket,   matIndoor: wallMatIndoorMarket,   capMat: capMatMarket,   trimMat: trimMatMarket },
    { zone: 'defender', matOutdoor: wallMatDefender, matIndoor: wallMatIndoorDefender, capMat: capMatDefender, trimMat: trimMatDefender }
  ]

  for (const { zone, matOutdoor, matIndoor, capMat, trimMat } of wallConfig) {
    // Outdoor walls
    const l0WallsOut = wallsByZone[zone].outdoor.filter(w => !isL1Wall(w))
    const l1WallsOut = wallsByZone[zone].outdoor.filter(w => isL1Wall(w))

    const l0WallMeshOut = createMergedMesh(l0WallsOut, matOutdoor, true, true)
    if (l0WallMeshOut) {
      l0WallMeshOut.userData.level = 0
      l0WallMeshOut.userData.origMat = matOutdoor
    }

    const l1WallMeshOut = createMergedMesh(l1WallsOut, matOutdoor, true, true)
    if (l1WallMeshOut) {
      l1WallMeshOut.userData.level = 1
      l1WallMeshOut.userData.origMat = matOutdoor
    }

    // Indoor walls (with +0.1 emissive boost inside full-roofed regions)
    const l0WallsIn = wallsByZone[zone].indoor.filter(w => !isL1Wall(w))
    const l1WallsIn = wallsByZone[zone].indoor.filter(w => isL1Wall(w))

    const l0WallMeshIn = createMergedMesh(l0WallsIn, matIndoor, true, true)
    if (l0WallMeshIn) {
      l0WallMeshIn.userData.level = 0
      l0WallMeshIn.userData.origMat = matIndoor
    }

    const l1WallMeshIn = createMergedMesh(l1WallsIn, matIndoor, true, true)
    if (l1WallMeshIn) {
      l1WallMeshIn.userData.level = 1
      l1WallMeshIn.userData.origMat = matIndoor
    }

    // Base trim mesh per zone
    const l0Trims = baseTrimsByZone[zone].filter(t => !isL1Wall(t))
    const l1Trims = baseTrimsByZone[zone].filter(t => isL1Wall(t))

    const l0TrimMesh = createMergedMesh(l0Trims, trimMat, true, true)
    if (l0TrimMesh) {
      l0TrimMesh.userData.level = 0
      l0TrimMesh.userData.origMat = trimMat
    }

    const l1TrimMesh = createMergedMesh(l1Trims, trimMat, true, true)
    if (l1TrimMesh) {
      l1TrimMesh.userData.level = 1
      l1TrimMesh.userData.origMat = trimMat
    }

    // Wall cap (top trim) mesh per zone (lit MeshLambert darkened ~25%)
    const l0Caps = topTrimsByZone[zone].filter(t => !isL1Wall(t))
    const l1Caps = topTrimsByZone[zone].filter(t => isL1Wall(t))

    const l0CapMesh = createMergedMesh(l0Caps, capMat, true, true)
    if (l0CapMesh) {
      l0CapMesh.userData.level = 0
      l0CapMesh.userData.origMat = capMat
    }

    const l1CapMesh = createMergedMesh(l1Caps, capMat, true, true)
    if (l1CapMesh) {
      l1CapMesh.userData.level = 1
      l1CapMesh.userData.origMat = capMat
    }
  }

  // ── Emissive Ceiling Lamp Panels in FULL-roofed Regions ─────────────────
  const regMap = new Map()
  for (const r of regions) regMap.set(r.id, r)

  const lampBoxes = []
  for (const id of FULL_ROOFED_REGIONS) {
    const r = regMap.get(id)
    if (!r) continue
    const [x0, z0, x1, z1] = r.rect
    const cx = (x0 + x1) * 0.5
    const cz = (z0 + z1) * 0.5
    const floorY = r.level ? 3.5 : 0.0
    const roofBottomY = floorY + 5.0

    const rw = x1 - x0
    const rd = z1 - z0
    const lampW = Math.min(2.8, Math.max(2.0, rw * 0.35))
    const lampD = Math.min(1.8, Math.max(1.2, rd * 0.35))

    lampBoxes.push({
      minX: cx - lampW * 0.5,
      maxX: cx + lampW * 0.5,
      minZ: cz - lampD * 0.5,
      maxZ: cz + lampD * 0.5,
      bottomY: roofBottomY - 0.08,
      topY: roofBottomY,
      type: 'ceilingLamp'
    })
  }
  const lampMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const lampMesh = createMergedMesh(lampBoxes, lampMat, false, false)
  if (lampMesh) {
    lampMesh.userData.level = 0
    lampMesh.userData.origMat = lampMat
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
  for (const { zone, matOutdoor } of wallConfig) {
    const lintelMesh = createMergedMesh(lintelsByZone[zone], matOutdoor, true, true)
    if (lintelMesh) {
      lintelMesh.userData.level = 0
      lintelMesh.userData.origMat = matOutdoor
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

  // ── 8. Roofs & Eaves (Top/Sides: Blue-Gray Tile; Underside: Wood Planks #6b5238 + 0.15 emissive)
  const l0RoofBoxes = (boxes.roofBoxes || []).filter(b => b.bottomY < 6.0)
  const l1RoofBoxes = (boxes.roofBoxes || []).filter(b => b.bottomY >= 6.0)

  // Roof Tops & Sides (Blue-gray tiles #5d7388)
  const l0TopGeos = l0RoofBoxes.map(b => roofBoxToTopSidesGeometry(b, 0.5))
  const l1TopGeos = l1RoofBoxes.map(b => roofBoxToTopSidesGeometry(b, 0.5))
  const l0RoofTopMesh = createMergedMeshFromGeos(l0TopGeos, roofMat, true, true)
  if (l0RoofTopMesh) {
    l0RoofTopMesh.userData.level = 0
    l0RoofTopMesh.userData.origMat = roofMat
  }
  const l1RoofTopMesh = createMergedMeshFromGeos(l1TopGeos, roofMat, true, true)
  if (l1RoofTopMesh) {
    l1RoofTopMesh.userData.level = 1
    l1RoofTopMesh.userData.origMat = roofMat
  }

  // Roof & Eave Undersides (Wood planks texture, color #6b5238, lit normally, +0.15 emissive)
  const l0UndersideGeos = l0RoofBoxes.map(b => roofBoxToUndersideGeometry(b, 0.5))
  const l1UndersideGeos = l1RoofBoxes.map(b => roofBoxToUndersideGeometry(b, 0.5))
  const l0RoofUndersideMesh = createMergedMeshFromGeos(l0UndersideGeos, roofUndersideMat, false, true)
  if (l0RoofUndersideMesh) {
    l0RoofUndersideMesh.userData.level = 0
    l0RoofUndersideMesh.userData.origMat = roofUndersideMat
  }
  const l1RoofUndersideMesh = createMergedMeshFromGeos(l1UndersideGeos, roofUndersideMat, false, true)
  if (l1RoofUndersideMesh) {
    l1RoofUndersideMesh.userData.level = 1
    l1RoofUndersideMesh.userData.origMat = roofUndersideMat
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

  // ── 12. Teleporters (Glowing Floor Ring & Thin Vertical Beam) ───────────
  for (const t of boxes.teleporterBoxes || []) {
    const cx = (t.minX + t.maxX) * 0.5
    const cz = (t.minZ + t.maxZ) * 0.5
    const floorY = t.bottomY || 0.0

    const isEntry = (t.type === 'tp_entry')
    // Entry pad: purple (#b45bff), exit pad: teal (#06b6d4)
    const colorHex = isEntry ? 0xb45bff : 0x06b6d4

    // Glowing floor ring (0.2 m high, 4 m x 4 m)
    const ringGeo = createRingGeometry(2.0, 1.5, 0.2)
    const ringMat = new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.position.set(cx, floorY, cz)
    group.add(ringMesh)

    // Thin vertical beam 3 m high, opacity 0.2
    const beamGeo = new THREE.CylinderGeometry(0.25, 0.25, 3.0, 16)
    const beamMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      side: THREE.DoubleSide
    })
    const beamMesh = new THREE.Mesh(beamGeo, beamMat)
    beamMesh.position.set(cx, floorY + 1.5, cz)
    group.add(beamMesh)
  }

  return group
}
