import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'

/**
 * Creates 3D merged meshes from the map bounding boxes.
 * Merges geometries per material category to achieve under 20 draw calls.
 */
export function buildMapMeshes(boxes) {
  const group = new THREE.Group()
  group.name = 'bind-map-geometry'

  function boxToGeometry(b) {
    const width = Math.max(0.01, b.maxX - b.minX)
    const height = Math.max(0.01, b.topY - b.bottomY)
    const depth = Math.max(0.01, b.maxZ - b.minZ)
    const cx = (b.minX + b.maxX) * 0.5
    const cy = (b.bottomY + b.topY) * 0.5
    const cz = (b.minZ + b.maxZ) * 0.5

    const geo = new THREE.BoxGeometry(width, height, depth)
    geo.translate(cx, cy, cz)
    return geo
  }

  function createMergedMesh(boxList, material, castShadow = true, receiveShadow = true) {
    if (!boxList || boxList.length === 0) return null
    const geos = boxList.map(boxToGeometry)
    const mergedGeo = BufferGeometryUtils.mergeGeometries(geos, false)
    // Dispose individual temp geometries
    geos.forEach(g => g.dispose())

    const mesh = new THREE.Mesh(mergedGeo, material)
    mesh.castShadow = castShadow
    mesh.receiveShadow = receiveShadow
    group.add(mesh)
    return mesh
  }

  // ── Palette & Materials (Gray-box aesthetic) ──────────────────────────
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0xb8b4ad, // light warm gray
    roughness: 0.88,
    metalness: 0.05
  })

  const floorL0Mat = new THREE.MeshStandardMaterial({
    color: 0x72757a, // neutral mid gray
    roughness: 0.92,
    metalness: 0.05
  })

  const floorL1Mat = new THREE.MeshStandardMaterial({
    color: 0x8a847c, // slightly warmer accent gray
    roughness: 0.88,
    metalness: 0.05
  })

  const lintelMat = new THREE.MeshStandardMaterial({
    color: 0xa8a49d, // slightly shaded wall tone
    roughness: 0.88,
    metalness: 0.05
  })

  const stairMat = new THREE.MeshStandardMaterial({
    color: 0x7c7e82, // stair stone tone
    roughness: 0.85,
    metalness: 0.05
  })

  const railMat = new THREE.MeshStandardMaterial({
    color: 0x3d3d40, // dark metal/wood rail
    roughness: 0.7,
    metalness: 0.2
  })

  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x4f545a, // dark slate roof/eave
    roughness: 0.9,
    metalness: 0.05
  })

  // Prop materials
  const crateMat = new THREE.MeshStandardMaterial({
    color: 0x8c7355, // warm wood tone
    roughness: 0.85,
    metalness: 0.05
  })

  const containerMat = new THREE.MeshStandardMaterial({
    color: 0x3d545e, // teal steel container
    roughness: 0.6,
    metalness: 0.2
  })

  const pillarMat = new THREE.MeshStandardMaterial({
    color: 0x6e7075, // stone pillar
    roughness: 0.85,
    metalness: 0.05
  })

  const planterMat = new THREE.MeshStandardMaterial({
    color: 0x405c48, // dark green planter
    roughness: 0.85,
    metalness: 0.05
  })

  const stallMat = new THREE.MeshStandardMaterial({
    color: 0x9e5842, // terracotta market stall
    roughness: 0.85,
    metalness: 0.05
  })

  const windowMat = new THREE.MeshStandardMaterial({
    color: 0x5a5c60,
    roughness: 0.8
  })

  // ── Debug Level Materials (F5) ───────────────────────────────────────
  const level0DebugMat = new THREE.MeshStandardMaterial({
    color: 0x75787d, // Gray for Level 0
    roughness: 0.88,
    metalness: 0.05
  })
  const level1DebugMat = new THREE.MeshStandardMaterial({
    color: 0xe67e22, // Orange for Level 1
    roughness: 0.85,
    metalness: 0.05
  })
  const stairDebugMat = new THREE.MeshStandardMaterial({
    color: 0xf39c12, // Amber/Orange for Stairs
    roughness: 0.85,
    metalness: 0.05
  })

  // ── Build Merged Meshes ───────────────────────────────────────────────
  const isL1Region = (b) => {
    // aHeaven bounds [-54, -20, -44, -14], bHookah bounds [24, -4, 34, 4]
    if (b.maxX >= -54 && b.minX <= -44 && b.maxZ >= -20 && b.minZ <= -14) return true
    if (b.maxX >= 24 && b.minX <= 34 && b.maxZ >= -4 && b.minZ <= 4) return true
    return false
  }

  // 1. Walls
  const l1Walls = (boxes.wallBoxes || []).filter(isL1Region)
  const l0Walls = (boxes.wallBoxes || []).filter(b => !isL1Region(b))
  const l0WallMesh = createMergedMesh(l0Walls, wallMat, true, true)
  if (l0WallMesh) { l0WallMesh.userData.level = 0; l0WallMesh.userData.origMat = wallMat }
  const l1WallMesh = createMergedMesh(l1Walls, wallMat, true, true)
  if (l1WallMesh) { l1WallMesh.userData.level = 1; l1WallMesh.userData.origMat = wallMat }

  // 2. Floors (L0 and L1 plinths)
  const l0Floors = (boxes.floorBoxes || []).filter(b => b.type === 'floorL0')
  const l1Floors = (boxes.floorBoxes || []).filter(b => b.type === 'floorL1')
  const l0FloorMesh = createMergedMesh(l0Floors, floorL0Mat, false, true)
  if (l0FloorMesh) { l0FloorMesh.userData.level = 0; l0FloorMesh.userData.origMat = floorL0Mat }
  const l1FloorMesh = createMergedMesh(l1Floors, floorL1Mat, true, true)
  if (l1FloorMesh) { l1FloorMesh.userData.level = 1; l1FloorMesh.userData.origMat = floorL1Mat }

  // 3. Lintels
  const lintelMesh = createMergedMesh(boxes.lintelBoxes, lintelMat, true, true)
  if (lintelMesh) { lintelMesh.userData.level = 0; lintelMesh.userData.origMat = lintelMat }

  // 4. Windows (sills and heads)
  const windowMesh = createMergedMesh(boxes.windowBoxes, windowMat, true, true)
  if (windowMesh) { windowMesh.userData.level = 0; windowMesh.userData.origMat = windowMat }

  // 5. Stairs
  const stairMesh = createMergedMesh(boxes.stairBoxes, stairMat, true, true)
  if (stairMesh) { stairMesh.userData.level = 'stair'; stairMesh.userData.origMat = stairMat }

  // 6. Rails
  const l0Rails = (boxes.railBoxes || []).filter(b => b.bottomY < 3.0)
  const l1Rails = (boxes.railBoxes || []).filter(b => b.bottomY >= 3.0)
  const l0RailMesh = createMergedMesh(l0Rails, railMat, true, true)
  if (l0RailMesh) { l0RailMesh.userData.level = 0; l0RailMesh.userData.origMat = railMat }
  const l1RailMesh = createMergedMesh(l1Rails, railMat, true, true)
  if (l1RailMesh) { l1RailMesh.userData.level = 1; l1RailMesh.userData.origMat = railMat }

  // 7. Roofs & Eaves
  const l0Roofs = (boxes.roofBoxes || []).filter(b => b.bottomY < 6.0)
  const l1Roofs = (boxes.roofBoxes || []).filter(b => b.bottomY >= 6.0)
  const l0RoofMesh = createMergedMesh(l0Roofs, roofMat, true, true)
  if (l0RoofMesh) { l0RoofMesh.userData.level = 0; l0RoofMesh.userData.origMat = roofMat }
  const l1RoofMesh = createMergedMesh(l1Roofs, roofMat, true, true)
  if (l1RoofMesh) { l1RoofMesh.userData.level = 1; l1RoofMesh.userData.origMat = roofMat }

  // 8. Props partitioned by type
  const crates = (boxes.propBoxes || []).filter(p => p.propType === 'crate')
  const containers = (boxes.propBoxes || []).filter(p => p.propType === 'container')
  const pillars = (boxes.propBoxes || []).filter(p => p.propType === 'pillar' || p.propType === 'fountain')
  const planters = (boxes.propBoxes || []).filter(p => p.propType === 'planter')
  const stalls = (boxes.propBoxes || []).filter(p => p.propType === 'stall')

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

  // Attach setLevelDebugMode method to root group
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

  // 9. Plant Zones (soft accent markers)
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

    // Glowing border outline
    const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, 0.04, d))
    const lineMat = new THREE.LineBasicMaterial({ color, linewidth: 2 })
    const line = new THREE.LineSegments(edges, lineMat)
    line.position.set(cx, 0.02, cz)
    group.add(line)
  }

  // 10. Teleporters (Glowing entrance gate and exit pads)
  for (const t of boxes.teleporterBoxes || []) {
    const w = t.maxX - t.minX
    const d = t.maxZ - t.minZ
    const cx = (t.minX + t.maxX) * 0.5
    const cz = (t.minZ + t.maxZ) * 0.5

    if (t.type === 'tp_entry') {
      // Floor pad (teal glowing portal)
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

      // Vertical holographic portal entrance
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
      // Exit pad (subtle concentric glowing ring)
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
