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
  createTrimTexture,
  createCrateTexture,
  createContainerTexture,
  createWaterTexture,
  createAwningTexture,
  createFoliageTexture
} from './proceduralTextures.js'
import { rasterizeLayout } from './rasterize.js'
import { decorate } from './decorations.js'

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
 * Converts a bounding box to BoxGeometry with world-space UV projection per face (u along horizontal axis, v along y).
 * Guarantees bricks on lintels, door reveals, and walls are always horizontal and exactly 0.5 x 0.25 m.
 */
function boxToGeometry(b, uvScale = 0.5) {
  const width = Math.max(0.01, b.maxX - b.minX)
  const height = Math.max(0.01, b.topY - b.bottomY)
  const depth = Math.max(0.01, b.maxZ - b.minZ)
  const cx = (b.minX + b.maxX) * 0.5
  const cy = (b.bottomY + b.topY) * 0.5
  const cz = (b.minZ + b.maxZ) * 0.5

  const geo = new THREE.BoxGeometry(width, height, depth)
  const posAttr = geo.attributes.position
  const normAttr = geo.attributes.normal
  const uvAttr = geo.attributes.uv
  const uvs = uvAttr.array
  const count = posAttr.count

  for (let i = 0; i < count; i++) {
    const wx = posAttr.getX(i) + cx
    const wy = posAttr.getY(i) + cy
    const wz = posAttr.getZ(i) + cz

    const nx = normAttr.getX(i)
    const ny = normAttr.getY(i)

    let u, v
    if (Math.abs(ny) > 0.8) {
      // Horizontal face: top (+Y) or bottom (-Y) (lintel underside, wall cap, floors)
      // u along face horizontal span, v along depth
      if (width >= depth) {
        u = wx * uvScale
        v = wz * uvScale
      } else {
        u = wz * uvScale
        v = wx * uvScale
      }
    } else if (Math.abs(nx) > 0.5) {
      // Vertical face facing +/- X: horizontal axis is world Z, vertical axis is world Y
      u = wz * uvScale
      v = wy * uvScale
    } else {
      // Vertical face facing +/- Z: horizontal axis is world X, vertical axis is world Y
      u = wx * uvScale
      v = wy * uvScale
    }

    uvs[i * 2] = u
    uvs[i * 2 + 1] = v
  }
  uvAttr.needsUpdate = true

  geo.computeVertexNormals()
  geo.translate(cx, cy, cz)
  return geo
}

/**
 * Creates top and side faces of a roof box (+X, -X, +Y, +Z, -Z), omitting the bottom face.
 * World-space UV projection ensures roof tiles repeat seamlessly.
 */
function roofBoxToTopSidesGeometry(b, uvScale = 0.5) {
  const width = Math.max(0.01, b.maxX - b.minX)
  const height = Math.max(0.01, b.topY - b.bottomY)
  const depth = Math.max(0.01, b.maxZ - b.minZ)
  const cx = (b.minX + b.maxX) * 0.5
  const cy = (b.bottomY + b.topY) * 0.5
  const cz = (b.minZ + b.maxZ) * 0.5

  const geo = new THREE.BoxGeometry(width, height, depth)
  const posAttr = geo.attributes.position
  const normAttr = geo.attributes.normal
  const uvAttr = geo.attributes.uv
  const uvs = uvAttr.array
  const count = posAttr.count

  for (let i = 0; i < count; i++) {
    const wx = posAttr.getX(i) + cx
    const wy = posAttr.getY(i) + cy
    const wz = posAttr.getZ(i) + cz
    const nx = normAttr.getX(i)
    const ny = normAttr.getY(i)

    let u, v
    if (Math.abs(ny) > 0.8) {
      u = wx * uvScale
      v = wz * uvScale
    } else if (Math.abs(nx) > 0.5) {
      u = wz * uvScale
      v = wy * uvScale
    } else {
      u = wx * uvScale
      v = wy * uvScale
    }
    uvs[i * 2] = u
    uvs[i * 2 + 1] = v
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
 * Creates the underside horizontal face (-Y) of a roof box with world-space UV projection.
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
    const wx = (v === 0 || v === 2 ? b.minX : b.maxX)
    const wz = (v === 0 || v === 1 ? b.minZ : b.maxZ)
    uvs[idx] = wx * uvScale
    uvs[idx + 1] = wz * uvScale
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
  // Floors: Mid-dark stone pavers per zone (distinctly darker than walls, never blown out)
  const floorTexAttacker = createStoneFloorTexture('#78736a')
  const floorTexASide    = createStoneFloorTexture('#726c62')
  const floorTexBSide    = createStoneFloorTexture('#6b6b70')
  const floorTexMarket   = createStoneFloorTexture('#635b50')
  const floorTexDefender = createStoneFloorTexture('#6e6a72')
  const floorTexL1Wood   = createWoodPlankTexture('#8c653f', '#442a15')

  const floorMatAttacker = makeLambertMaterial(floorTexAttacker, 0x78736a)
  const floorMatASide    = makeLambertMaterial(floorTexASide, 0x726c62)
  const floorMatBSide    = makeLambertMaterial(floorTexBSide, 0x6b6b70)
  const floorMatMarket   = makeLambertMaterial(floorTexMarket, 0x635b50)
  const floorMatDefender = makeLambertMaterial(floorTexDefender, 0x6e6a72)
  const floorMatL1Wood   = makeLambertMaterial(floorTexL1Wood, 0x8c653f)

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
  // Indoor wall materials: raise wall emissive by 0.1 inside FULL-roofed regions
  const indoorEmissiveAttacker = new THREE.Color(0xc9b08a).multiplyScalar(0.20)
  const indoorEmissiveASide    = new THREE.Color(0xc9b08a).multiplyScalar(0.20)
  const indoorEmissiveBSide    = new THREE.Color(0xd8cfc0).multiplyScalar(0.32)
  const indoorEmissiveMarket   = new THREE.Color(0xb8654a).multiplyScalar(0.20)
  const indoorEmissiveDefender = new THREE.Color(0xb9b3a8).multiplyScalar(0.20)

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

  // Props & Decorations Materials
  const crateTex          = createCrateTexture('#8c7355', '#574229')
  const crateMat          = makeLambertMaterial(crateTex, 0x8c7355)
  const crateMatIndoor    = makeLambertMaterial(crateTex, 0x8c7355, new THREE.Color(0x8c7355).multiplyScalar(0.22))
  const crateBorderMat    = makeLambertMaterial(null, 0x4a341f)

  const containerTex      = createContainerTexture('#2f5a6b', '#1e3d4a')
  const containerMat      = makeLambertMaterial(containerTex, 0x2f5a6b)
  const containerDarkMat  = makeLambertMaterial(null, 0x1a2d36)

  const pillarMat         = makeLambertMaterial(wallTexSandstone, 0xc9b08a)
  const pillarTrimMat     = makeLambertMaterial(createTrimTexture('#978468', '#7f6f57'), 0x978468)

  const planterStoneMat   = makeLambertMaterial(wallTexPlaster, 0x86868a)
  const planterFoliageMat = makeLambertMaterial(createFoliageTexture(32), 0x2e7d32)
  const soilMat           = makeLambertMaterial(null, 0x3d2b1a)

  const stallMat          = makeLambertMaterial(createWoodPlankTexture('#9e5842', '#6b3220'), 0x9e5842)
  const stallPostMat      = makeLambertMaterial(null, 0x5a3220)
  const awningTex         = createAwningTexture('#e0b050', '#f5eedb')
  const awningMat         = makeLambertMaterial(awningTex, 0xe0b050)

  const fountainStoneMat  = makeLambertMaterial(wallTexPlaster, 0x86868a)
  const fountainTrimMat   = makeLambertMaterial(createTrimTexture('#6c6c70', '#4a4a4d'), 0x6c6c70)
  const waterTex          = createWaterTexture(32)
  const waterMat          = new THREE.MeshLambertMaterial({
    map: waterTex || null,
    color: 0x00b4d8,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide
  })

  const windowMat         = makeLambertMaterial(createTrimTexture('#3d3d40', '#222224'), 0x5a5c60)

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

  // ── Emissive Ceiling Lamp Panels in FULL-roofed Regions (1.5x1.5m max, warm #ffe2a8, emissive 0.8, 0.15m dark wood border, max 1 per 30m2)
  const regMap = new Map()
  for (const r of regions) regMap.set(r.id, r)

  const lampLightBoxes = []
  const lampBorderBoxes = []
  for (const id of FULL_ROOFED_REGIONS) {
    const r = regMap.get(id)
    if (!r) continue
    const [x0, z0, x1, z1] = r.rect
    const rw = x1 - x0
    const rd = z1 - z0
    const area = rw * rd
    const maxLamps = Math.max(1, Math.floor(area / 30))
    const floorY = r.level ? 3.5 : 0.0
    const roofBottomY = floorY + 5.0

    const isXLonger = rw >= rd
    for (let i = 0; i < maxLamps; i++) {
      const frac = (i + 0.5) / maxLamps
      const lcx = isXLonger ? (x0 + rw * frac) : ((x0 + x1) * 0.5)
      const lcz = isXLonger ? ((z0 + z1) * 0.5) : (z0 + rd * frac)

      // Outer fixture is 1.5 x 1.5 m (not larger).
      // Border is 0.15 m wide dark wood. Inner glowing panel is 1.2 x 1.2 m.
      lampLightBoxes.push({
        minX: lcx - 0.6,
        maxX: lcx + 0.6,
        minZ: lcz - 0.6,
        maxZ: lcz + 0.6,
        bottomY: roofBottomY - 0.04,
        topY: roofBottomY,
        type: 'ceilingLamp'
      })

      // 4 dark wooden border strips (0.15 m wide)
      lampBorderBoxes.push(
        // North strip
        { minX: lcx - 0.75, maxX: lcx + 0.75, minZ: lcz + 0.6, maxZ: lcz + 0.75, bottomY: roofBottomY - 0.06, topY: roofBottomY },
        // South strip
        { minX: lcx - 0.75, maxX: lcx + 0.75, minZ: lcz - 0.75, maxZ: lcz - 0.6, bottomY: roofBottomY - 0.06, topY: roofBottomY },
        // West strip
        { minX: lcx - 0.75, maxX: lcx - 0.6, minZ: lcz - 0.6, maxZ: lcz + 0.6, bottomY: roofBottomY - 0.06, topY: roofBottomY },
        // East strip
        { minX: lcx + 0.6, maxX: lcx + 0.75, minZ: lcz - 0.6, maxZ: lcz + 0.6, bottomY: roofBottomY - 0.06, topY: roofBottomY }
      )
    }
  }

  const lampLightMat = new THREE.MeshLambertMaterial({
    color: 0xffe2a8,
    emissive: new THREE.Color(0xffe2a8),
    emissiveIntensity: 0.8
  })
  const lampBorderMat = new THREE.MeshLambertMaterial({
    color: 0x4a3220 // dark wood border
  })

  const lampMesh = createMergedMesh(lampLightBoxes, lampLightMat, false, false)
  if (lampMesh) {
    lampMesh.userData.level = 0
    lampMesh.userData.origMat = lampLightMat
  }
  const lampBorderMesh = createMergedMesh(lampBorderBoxes, lampBorderMat, true, true)
  if (lampBorderMesh) {
    lampBorderMesh.userData.level = 0
    lampBorderMesh.userData.origMat = lampBorderMat
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

  // ── 9. Props Partitioned by Type (docs/map/BIND_BLUEPRINT.md §7) ─────────
  const isPlanter  = p => p.propType === 'planter' || p.id === 'p_aLobby2' || p.id === 'p_bLobby2'
  const planters   = (boxes.propBoxes || []).filter(isPlanter)
  const crates     = (boxes.propBoxes || []).filter(p => p.propType === 'crate' && !isPlanter(p))
  const containers = (boxes.propBoxes || []).filter(p => p.propType === 'container')
  const pillars    = (boxes.propBoxes || []).filter(p => p.propType === 'pillar')
  const fountains  = (boxes.propBoxes || []).filter(p => p.propType === 'fountain')
  const stalls     = (boxes.propBoxes || []).filter(p => p.propType === 'stall')

  const tagProps = (m, isL1 = false) => {
    if (!m) return
    m.traverse(child => {
      if (child.isMesh) {
        child.userData.level = isL1 ? 1 : 0
        child.userData.origMat = child.material
      }
    })
  }

  // 1. Crates: 4 vertical dark iron corner edges (#3a3430), 0.08m thick, flush with faces + wood planks body
  const crateCornerIronBoxes = []
  const cs = 0.08
  for (const c of crates) {
    const corners = [
      { minX: c.minX, maxX: c.minX + cs, minZ: c.minZ, maxZ: c.minZ + cs },
      { minX: c.maxX - cs, maxX: c.maxX, minZ: c.minZ, maxZ: c.minZ + cs },
      { minX: c.minX, maxX: c.minX + cs, minZ: c.maxZ - cs, maxZ: c.maxZ },
      { minX: c.maxX - cs, maxX: c.maxX, minZ: c.maxZ - cs, maxZ: c.maxZ }
    ]
    for (const cor of corners) {
      crateCornerIronBoxes.push({
        minX: cor.minX, maxX: cor.maxX,
        minZ: cor.minZ, maxZ: cor.maxZ,
        bottomY: c.bottomY, topY: c.topY
      })
    }
  }

  const indoorCrates = crates.filter(c => {
    const reg = findNearestRegion(c, bindLayout.regions)
    return reg && FULL_ROOFED_REGIONS.includes(reg.id)
  })
  const outdoorCrates = crates.filter(c => !indoorCrates.includes(c))
  tagProps(createMergedMesh(outdoorCrates, crateMat, true, true), false)
  tagProps(createMergedMesh(indoorCrates, crateMatIndoor, true, true), false)

  const crateIronMat = makeLambertMaterial(null, 0x3a3430)
  tagProps(createMergedMesh(crateCornerIronBoxes, crateIronMat, true, true), false)

  // 2. Containers (steel shipping container p_bContainer)
  const containerMesh = createMergedMesh(containers, containerMat, true, true)
  tagProps(containerMesh, false)

  // Container structural details: 8 corner casting blocks and end lock rods
  const containerCornerBoxes = []
  for (const c of containers) {
    const cs = 0.22
    for (const cx of [c.minX, c.maxX - cs]) {
      for (const cz of [c.minZ, c.maxZ - cs]) {
        for (const cy of [c.bottomY, c.topY - cs]) {
          containerCornerBoxes.push({
            minX: cx, maxX: cx + cs,
            minZ: cz, maxZ: cz + cs,
            bottomY: cy, topY: cy + cs
          })
        }
      }
    }
  }
  tagProps(createMergedMesh(containerCornerBoxes, containerDarkMat, true, true), false)

  // 3. Pillars (square stone pillar with base plinth and capital trim)
  const pillarMesh = createMergedMesh(pillars, pillarMat, true, true)
  tagProps(pillarMesh, false)

  const pillarTrimBoxes = []
  for (const p of pillars) {
    const overhang = 0.08
    // Base plinth (height 0.25 m)
    pillarTrimBoxes.push({
      minX: p.minX - overhang, maxX: p.maxX + overhang,
      minZ: p.minZ - overhang, maxZ: p.maxZ + overhang,
      bottomY: p.bottomY, topY: p.bottomY + 0.25
    })
    // Capital trim (height 0.25 m)
    pillarTrimBoxes.push({
      minX: p.minX - overhang, maxX: p.maxX + overhang,
      minZ: p.minZ - overhang, maxZ: p.maxZ + overhang,
      bottomY: p.topY - 0.25, topY: p.topY
    })
  }
  tagProps(createMergedMesh(pillarTrimBoxes, pillarTrimMat, true, true), false)

  // 4. Stalls with Awnings (wooden stall table + 4 support posts + striped awning 0.3m above)
  const stallMesh = createMergedMesh(stalls, stallMat, true, true)
  tagProps(stallMesh, false)

  // 4 corner support posts attaching the awning to the stall
  const stallPosts = []
  for (const s of stalls) {
    const pw = 0.12
    for (const px of [s.minX + 0.08, s.maxX - 0.08 - pw]) {
      for (const pz of [s.minZ + 0.08, s.maxZ - 0.08 - pw]) {
        stallPosts.push({
          minX: px, maxX: px + pw,
          minZ: pz, maxZ: pz + pw,
          bottomY: s.topY, topY: s.topY + 0.3
        })
      }
    }
  }
  tagProps(createMergedMesh(stallPosts, stallPostMat, true, true), false)

  // Awning canopy (attaches to the stall, 0.3 m above its top)
  const awnings = stalls.map(s => ({
    minX: s.minX - 0.25,
    maxX: s.maxX + 0.25,
    minZ: s.minZ - 0.25,
    maxZ: s.maxZ + 0.25,
    bottomY: s.topY + 0.3,
    topY: s.topY + 0.55
  }))
  tagProps(createMergedMesh(awnings, awningMat, true, true), false)

  // 5. Fountain with a small water plane (p_bFountain: outer basin rim, water plane, central tiered pedestal)
  for (const f of fountains) {
    const rimThick = 0.35
    const rimHeight = 0.6
    const basinBoxes = [
      // North rim
      { minX: f.minX, maxX: f.maxX, minZ: f.maxZ - rimThick, maxZ: f.maxZ, bottomY: f.bottomY, topY: f.bottomY + rimHeight },
      // South rim
      { minX: f.minX, maxX: f.maxX, minZ: f.minZ, maxZ: f.minZ + rimThick, bottomY: f.bottomY, topY: f.bottomY + rimHeight },
      // West rim
      { minX: f.minX, maxX: f.minX + rimThick, minZ: f.minZ + rimThick, maxZ: f.maxZ - rimThick, bottomY: f.bottomY, topY: f.bottomY + rimHeight },
      // East rim
      { minX: f.maxX - rimThick, maxX: f.maxX, minZ: f.minZ + rimThick, maxZ: f.maxZ - rimThick, bottomY: f.bottomY, topY: f.bottomY + rimHeight }
    ]
    tagProps(createMergedMesh(basinBoxes, fountainStoneMat, true, true), false)

    // Center fountain pedestal tiers up to 2.5 m
    const fcx = (f.minX + f.maxX) * 0.5
    const fcz = (f.minZ + f.maxZ) * 0.5
    const pedestalBoxes = [
      // Lower tiered pedestal (1.4m x 1.4m x 0.9m)
      { minX: fcx - 0.7, maxX: fcx + 0.7, minZ: fcz - 0.7, maxZ: fcz + 0.7, bottomY: f.bottomY, topY: f.bottomY + 0.9 },
      // Upper basin bowl (1.8m x 1.8m x 0.25m at y=1.1m)
      { minX: fcx - 0.9, maxX: fcx + 0.9, minZ: fcz - 0.9, maxZ: fcz + 0.9, bottomY: f.bottomY + 1.1, topY: f.bottomY + 1.35 },
      // Central column & top spout finial (0.4m x 0.4m up to 2.5m)
      { minX: fcx - 0.25, maxX: fcx + 0.25, minZ: fcz - 0.25, maxZ: fcz + 0.25, bottomY: f.bottomY + 1.35, topY: f.bottomY + 2.5 }
    ]
    tagProps(createMergedMesh(pedestalBoxes, fountainStoneMat, true, true), false)

    // Small water plane (3.3 m x 3.3 m) inside the basin at y = bottomY + 0.5 m
    const waterWidth = (f.maxX - f.minX) - rimThick * 2
    const waterDepth = (f.maxZ - f.minZ) - rimThick * 2
    const waterGeo = new THREE.PlaneGeometry(waterWidth, waterDepth)
    waterGeo.rotateX(-Math.PI * 0.5)
    const waterMesh = new THREE.Mesh(waterGeo, waterMat)
    waterMesh.position.set(fcx, f.bottomY + 0.5, fcz)
    tagProps(waterMesh, false)
    group.add(waterMesh)
  }

  // 6. Planters (stone retaining wall, soil infill, green top)
  const planterBoxes = []
  const planterSoilBoxes = []
  const planterFoliageBoxes = []
  for (const pl of planters) {
    const lip = 0.15
    // 4 stone retaining wall lips
    planterBoxes.push(
      { minX: pl.minX, maxX: pl.maxX, minZ: pl.maxZ - lip, maxZ: pl.maxZ, bottomY: pl.bottomY, topY: pl.topY },
      { minX: pl.minX, maxX: pl.maxX, minZ: pl.minZ, maxZ: pl.minZ + lip, bottomY: pl.bottomY, topY: pl.topY },
      { minX: pl.minX, maxX: pl.minX + lip, minZ: pl.minZ + lip, maxZ: pl.maxZ - lip, bottomY: pl.bottomY, topY: pl.topY },
      { minX: pl.maxX - lip, maxX: pl.maxX, minZ: pl.minZ + lip, maxZ: pl.maxZ - lip, bottomY: pl.bottomY, topY: pl.topY }
    )
    // Soil infill
    planterSoilBoxes.push({
      minX: pl.minX + lip, maxX: pl.maxX - lip,
      minZ: pl.minZ + lip, maxZ: pl.maxZ - lip,
      bottomY: pl.bottomY, topY: pl.topY - 0.15
    })
    // Green shrub/foliage top surface
    planterFoliageBoxes.push({
      minX: pl.minX + lip, maxX: pl.maxX - lip,
      minZ: pl.minZ + lip, maxZ: pl.maxZ - lip,
      bottomY: pl.topY - 0.15, topY: pl.topY
    })
  }
  tagProps(createMergedMesh(planterBoxes, planterStoneMat, true, true), false)
  tagProps(createMergedMesh(planterSoilBoxes, soilMat, true, true), false)
  tagProps(createMergedMesh(planterFoliageBoxes, planterFoliageMat, true, true), false)

  // ── 10. Decorations ONLY through decorate(parent, type, options) ───────────
  const raster = rasterizeLayout(bindLayout)
  const { X0, Z0, W, H, walk } = raster
  const ix = (x, z) => (z - Z0) * W + (x - X0)

  const isFaceWalkable = (face, x0, z0, x1, z1) => {
    if (face === 'north') {
      const z = Math.round(z0) - 1
      if (z < Z0 || z >= Z0 + H) return false
      for (let x = Math.floor(x0); x < Math.ceil(x1); x++) {
        if (x >= X0 && x < X0 + W && walk[ix(x, z)] === 1) return true
      }
      return false
    }
    if (face === 'south') {
      const z = Math.round(z1)
      if (z < Z0 || z >= Z0 + H) return false
      for (let x = Math.floor(x0); x < Math.ceil(x1); x++) {
        if (x >= X0 && x < X0 + W && walk[ix(x, z)] === 1) return true
      }
      return false
    }
    if (face === 'west') {
      const x = Math.round(x0) - 1
      if (x < X0 || x >= X0 + W) return false
      for (let z = Math.floor(z0); z < Math.ceil(z1); z++) {
        if (z >= Z0 && z < Z0 + H && walk[ix(x, z)] === 1) return true
      }
      return false
    }
    if (face === 'east') {
      const x = Math.round(x1)
      if (x < X0 || x >= X0 + W) return false
      for (let z = Math.floor(z0); z < Math.ceil(z1); z++) {
        if (z >= Z0 && z < Z0 + H && walk[ix(x, z)] === 1) return true
      }
      return false
    }
    return true
  }

  // A. Lanterns beside every connector wider than 4m (emissive only, y=3.2)
  for (const c of bindLayout.connectors || []) {
    const l1 = decorate(c, 'lantern', { side: 'left' })
    if (l1) { tagProps(l1, c.level === 1); group.add(l1) }
    const l2 = decorate(c, 'lantern', { side: 'right' })
    if (l2) { tagProps(l2, c.level === 1); group.add(l2) }
  }

  // B. Doorframes for connectors (dark wood #4a3220, 0.2m wide, 0.15m deep, flush with wall face)
  for (const c of bindLayout.connectors || []) {
    const df = decorate(c, 'doorframe', { isWalkableFace: isFaceWalkable })
    if (df) {
      tagProps(df, c.level === 1)
      group.add(df)
    }
  }

  // C. Window frames for `windows` (dark wood #4a3220, 0.2m wide, 0.15m deep, flush with wall, 0.1m sill)
  for (const w of bindLayout.windows || []) {
    const wf = decorate(w, 'windowFrame', { isWalkableFace: isFaceWalkable })
    if (wf) {
      tagProps(wf, w.floorLevel === 1)
      group.add(wf)
    }
  }

  // D. Banners: one behind each plant zone and one over each spawn exit
  const aPlant = (boxes.plantBoxes || []).find(p => p.site === 'A')
  const bPlant = (boxes.plantBoxes || []).find(p => p.site === 'B')

  if (aPlant) {
    const wallA = boxes.wallBoxes.find(w => w.minX <= -34 && w.maxX >= -34 && Math.abs(w.maxZ - (-22)) < 0.1)
    if (wallA) {
      const bannerA = decorate(wallA, 'banner', { site: 'A', plantBox: aPlant })
      if (bannerA) { tagProps(bannerA, false); group.add(bannerA) }
    }
  }

  if (bPlant) {
    const wallB = boxes.wallBoxes.find(w => w.minX <= 36 && w.maxX >= 36 && Math.abs(w.maxZ - (-22)) < 0.1)
    if (wallB) {
      const bannerB = decorate(wallB, 'banner', { site: 'B', plantBox: bPlant })
      if (bannerB) { tagProps(bannerB, false); group.add(bannerB) }
    }
  }

  // Spawn exit banners
  const spawnExitConnectors = [
    { id: 'c_as_ase',  site: 'attacker' },
    { id: 'c_as_bse',  site: 'attacker' },
    { id: 'c_ds_dsew', site: 'defender' },
    { id: 'c_ds_dsee', site: 'defender' }
  ]
  for (const sec of spawnExitConnectors) {
    const conn = (bindLayout.connectors || []).find(c => c.id === sec.id)
    if (conn) {
      const bnr = decorate(conn, 'banner', { site: sec.site })
      if (bnr) { tagProps(bnr, false); group.add(bnr) }
    }
  }

  // E. Hanging signs over Market door and over each teleporter room door
  const signDoors = [
    { id: 'c_dslink_mk', signType: 'market' },
    { id: 'c_as1_atr',   signType: 'teleporter' },
    { id: 'c_bl_blong',  signType: 'teleporter' }
  ]
  for (const sd of signDoors) {
    const conn = (bindLayout.connectors || []).find(c => c.id === sd.id)
    if (conn) {
      const sign = decorate(conn, 'sign', { signType: sd.signType })
      if (sign) { tagProps(sign, false); group.add(sign) }
    }
  }

  // F. A stone planter with a small tree in B Garden, A Lobby and B Lobby (props already exist)
  const treeProps = [
    (boxes.propBoxes || []).find(p => p.id === 'p_bGarden2'),
    (boxes.propBoxes || []).find(p => p.id === 'p_aLobby2'),
    (boxes.propBoxes || []).find(p => p.id === 'p_bLobby2')
  ]
  for (const tp of treeProps) {
    if (tp) {
      const tree = decorate(tp, 'tree')
      if (tree) { tagProps(tree, false); group.add(tree) }
    }
  }
  const pGarden1 = (boxes.propBoxes || []).find(p => p.id === 'p_bGarden1')
  if (pGarden1) {
    const b1 = decorate(pGarden1, 'bush', { offsetX: -0.9, offsetZ: 0, scale: 0.9 })
    if (b1) { tagProps(b1, false); group.add(b1) }
    const b2 = decorate(pGarden1, 'bush', { offsetX: 0.9, offsetZ: 0, scale: 0.9 })
    if (b2) { tagProps(b2, false); group.add(b2) }
  }

  // G. Ivy on 25% of wall runs longer than 8 m that face a walkable cell (height 2-3.5 m)
  const longRuns = []
  for (const w of boxes.wallBoxes) {
    // North face
    let nStart = null
    for (let x = w.minX; x < w.maxX; x++) {
      if (w.maxZ < Z0 + H && walk[ix(x, w.maxZ)] === 1) {
        if (nStart === null) nStart = x
      } else {
        if (nStart !== null && (x - nStart) >= 8.0) {
          longRuns.push({ w, face: 'north', start: nStart, end: x })
        }
        nStart = null
      }
    }
    if (nStart !== null && (w.maxX - nStart) >= 8.0) {
      longRuns.push({ w, face: 'north', start: nStart, end: w.maxX })
    }

    // South face
    let sStart = null
    for (let x = w.minX; x < w.maxX; x++) {
      if (w.minZ - 1 >= Z0 && walk[ix(x, w.minZ - 1)] === 1) {
        if (sStart === null) sStart = x
      } else {
        if (sStart !== null && (x - sStart) >= 8.0) {
          longRuns.push({ w, face: 'south', start: sStart, end: x })
        }
        sStart = null
      }
    }
    if (sStart !== null && (w.maxX - sStart) >= 8.0) {
      longRuns.push({ w, face: 'south', start: sStart, end: w.maxX })
    }

    // East face
    let eStart = null
    for (let z = w.minZ; z < w.maxZ; z++) {
      if (w.maxX < X0 + W && walk[ix(w.maxX, z)] === 1) {
        if (eStart === null) eStart = z
      } else {
        if (eStart !== null && (z - eStart) >= 8.0) {
          longRuns.push({ w, face: 'east', start: eStart, end: z })
        }
        eStart = null
      }
    }
    if (eStart !== null && (w.maxZ - eStart) >= 8.0) {
      longRuns.push({ w, face: 'east', start: eStart, end: w.maxZ })
    }

    // West face
    let wStart = null
    for (let z = w.minZ; z < w.maxZ; z++) {
      if (w.minX - 1 >= X0 && walk[ix(w.minX - 1, z)] === 1) {
        if (wStart === null) wStart = z
      } else {
        if (wStart !== null && (z - wStart) >= 8.0) {
          longRuns.push({ w, face: 'west', start: wStart, end: z })
        }
        wStart = null
      }
    }
    if (wStart !== null && (w.maxZ - wStart) >= 8.0) {
      longRuns.push({ w, face: 'west', start: wStart, end: w.maxZ })
    }
  }

  // 25% of qualifying runs get ivy planes
  longRuns.forEach((run, idx) => {
    if (idx % 4 === 0) {
      const ivyHeight = 2.0 + ((idx * 7) % 15) * 0.1 // 2.0m to 3.5m
      const ivy = decorate(run.w, 'ivy', {
        face: run.face,
        start: run.start,
        end: Math.min(run.end, run.start + 6.0),
        height: ivyHeight
      })
      if (ivy) {
        tagProps(ivy, false)
        group.add(ivy)
      }
    }
  })

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
