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

  // ── Build Merged Meshes ───────────────────────────────────────────────
  // 1. Walls
  createMergedMesh(boxes.wallBoxes, wallMat, true, true)

  // 2. Floors (L0 and L1 plinths)
  const l0Floors = (boxes.floorBoxes || []).filter(b => b.type === 'floorL0')
  const l1Floors = (boxes.floorBoxes || []).filter(b => b.type === 'floorL1')
  createMergedMesh(l0Floors, floorL0Mat, false, true)
  createMergedMesh(l1Floors, floorL1Mat, true, true)

  // 3. Lintels
  createMergedMesh(boxes.lintelBoxes, lintelMat, true, true)

  // 4. Windows (sills and heads)
  createMergedMesh(boxes.windowBoxes, windowMat, true, true)

  // 5. Stairs
  createMergedMesh(boxes.stairBoxes, stairMat, true, true)

  // 6. Rails
  createMergedMesh(boxes.railBoxes, railMat, true, true)

  // 7. Roofs & Eaves
  createMergedMesh(boxes.roofBoxes, roofMat, true, true)

  // 8. Props partitioned by type
  const crates = (boxes.propBoxes || []).filter(p => p.propType === 'crate')
  const containers = (boxes.propBoxes || []).filter(p => p.propType === 'container')
  const pillars = (boxes.propBoxes || []).filter(p => p.propType === 'pillar' || p.propType === 'fountain')
  const planters = (boxes.propBoxes || []).filter(p => p.propType === 'planter')
  const stalls = (boxes.propBoxes || []).filter(p => p.propType === 'stall')

  createMergedMesh(crates, crateMat, true, true)
  createMergedMesh(containers, containerMat, true, true)
  createMergedMesh(pillars, pillarMat, true, true)
  createMergedMesh(planters, planterMat, true, true)
  createMergedMesh(stalls, stallMat, true, true)

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
