import * as THREE from 'three'
import {
  createFloorTexture,
  createWallTexture,
  createRadianiteTexture,
  createBrickTexture,
  createWoodCrateTexture,
  createGeneratorTexture,
  createMetalDoorTexture,
  createMarketAwningTexture,
  createRoofTileTexture,
  createStoneStairsTexture,
  createWoodStairsTexture,
  createCobblestoneTexture,
  createTerracottaTileTexture,
  createSiteInlayTexture,
  createTealAccentTexture,
  createIvyTexture,
  createWaterTexture,
  createPagodaWoodTexture,
  createAsianRoofTileTexture,
  createAccentPavementTexture,
  createSkyDome
} from './MapTextures.js'

/**
 * MapLoader — builds Three.js scene from map JSON data with procedural textures & sky dome
 */
export class MapLoader {
  constructor(scene) {
    this.scene = scene
    this.colliders = []
    this.ramps = []
    this.radianiteMeshes = []
    this.waterTexture = null
    this.group = new THREE.Group()
    this.scene.add(this.group)
    this.skyDomeData = null
  }

  async load(mapData) {
    this.clear()

    // ── Procedural Textures ──
    const floorTex       = createFloorTexture()
    const wallTex        = createWallTexture()
    const brickTex       = createBrickTexture()
    const boxTex         = createWoodCrateTexture()
    const crateTex       = createRadianiteTexture()
    const genTex         = createGeneratorTexture()
    const doorTex        = createMetalDoorTexture()
    const awningTex      = createMarketAwningTexture()
    const roofTex        = createRoofTileTexture()
    const stoneStairsTex = createStoneStairsTexture()
    const woodStairsTex  = createWoodStairsTexture()
    const cobbleTex      = createCobblestoneTexture()
    const terracottaTex  = createTerracottaTileTexture()
    const siteATex       = createSiteInlayTexture('A')
    const siteBTex       = createSiteInlayTexture('B')
    const tealTex        = createTealAccentTexture()
    const ivyTex         = createIvyTexture()
    const waterTex       = createWaterTexture()
    const pagodaWoodTex  = createPagodaWoodTexture()
    const asianRoofTex   = createAsianRoofTileTexture()
    const accentStoneTex = createAccentPavementTexture()

    this.waterTexture = waterTex

    // Materials
    this.materials = {
      ground: new THREE.MeshStandardMaterial({
        map: floorTex,
        roughness: 0.70,
        metalness: 0.05,
      }),
      accent_stone: new THREE.MeshStandardMaterial({
        map: accentStoneTex,
        roughness: 0.65,
        metalness: 0.05,
      }),
      wall: new THREE.MeshStandardMaterial({
        map: wallTex,
        roughness: 0.65,
        metalness: 0.10,
      }),
      brick: new THREE.MeshStandardMaterial({
        map: brickTex,
        roughness: 0.75,
        metalness: 0.05,
      }),
      pagoda_wood: new THREE.MeshStandardMaterial({
        map: pagodaWoodTex,
        roughness: 0.70,
        metalness: 0.10,
      }),
      asian_roof: new THREE.MeshStandardMaterial({
        map: asianRoofTex,
        roughness: 0.60,
        metalness: 0.15,
      }),
      water: new THREE.MeshStandardMaterial({
        map: waterTex,
        color: 0x38bdf8,
        roughness: 0.15,
        metalness: 0.80,
        transparent: true,
        opacity: 0.82,
      }),
      box: new THREE.MeshStandardMaterial({
        map: boxTex,
        roughness: 0.70,
        metalness: 0.15,
      }),
      platform: new THREE.MeshStandardMaterial({
        map: floorTex,
        roughness: 0.55,
        metalness: 0.10,
      }),
      stairs: new THREE.MeshStandardMaterial({
        map: stoneStairsTex,
        roughness: 0.55,
        metalness: 0.35, // Brass safety bullnose strip reflects sunlight
      }),
      stairs_wood: new THREE.MeshStandardMaterial({
        map: woodStairsTex,
        roughness: 0.75,
        metalness: 0.20,
      }),
      cobble: new THREE.MeshStandardMaterial({
        map: cobbleTex,
        roughness: 0.50,
        metalness: 0.15,
      }),
      terracotta: new THREE.MeshStandardMaterial({
        map: terracottaTex,
        roughness: 0.65,
        metalness: 0.05,
      }),
      site_a: new THREE.MeshStandardMaterial({
        map: siteATex,
        roughness: 0.45,
        metalness: 0.25,
      }),
      site_b: new THREE.MeshStandardMaterial({
        map: siteBTex,
        roughness: 0.45,
        metalness: 0.25,
      }),
      teal: new THREE.MeshStandardMaterial({
        map: tealTex,
        roughness: 0.65,
        metalness: 0.10,
      }),
      ivy: new THREE.MeshStandardMaterial({
        map: ivyTex,
        transparent: true,
        alphaTest: 0.35,
        side: THREE.DoubleSide,
        roughness: 0.60
      }),
      structure: new THREE.MeshStandardMaterial({
        map: wallTex,
        roughness: 0.70,
        metalness: 0.10,
      }),
      radianite: new THREE.MeshStandardMaterial({
        map: crateTex,
        emissive: 0x059669,
        emissiveIntensity: 0.65,
        roughness: 0.3,
        metalness: 0.4,
      }),
      generator: new THREE.MeshStandardMaterial({
        map: genTex,
        roughness: 0.40,
        metalness: 0.70,
      }),
      door: new THREE.MeshStandardMaterial({
        map: doorTex,
        roughness: 0.50,
        metalness: 0.45,
      }),
      awning: new THREE.MeshStandardMaterial({
        map: awningTex,
        roughness: 0.85,
        metalness: 0.0,
      }),
      roof: new THREE.MeshStandardMaterial({
        map: roofTex,
        roughness: 0.70,
        metalness: 0.10,
      }),
      metal: new THREE.MeshStandardMaterial({
        color: 0x334155, // Dark graphite industrial steel
        roughness: 0.45,
        metalness: 0.80,
      }),
    }

    this.edgeMaterials = {
      ground:    new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25 }),
      wall:      new THREE.LineBasicMaterial({ color: 0xe2c499, transparent: true, opacity: 0.45 }),
      box:       new THREE.LineBasicMaterial({ color: 0xd97706, transparent: true, opacity: 0.65 }),
      platform:  new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.55 }),
      stairs:    new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.75 }),
      structure: new THREE.LineBasicMaterial({ color: 0xb5946a, transparent: true, opacity: 0.45 }),
      radianite: new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.95 }),
      generator: new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.65 }),
    }

    // Sky Dome & Background Skyline
    this.skyDomeData = createSkyDome(this.scene)

    // Clear background: Bright Mediterranean sky blue
    this.scene.background = new THREE.Color(0xb2d9fc)

    // Atmospheric Fog: Bright daytime horizon haze
    this.scene.fog = new THREE.Fog(
      0xb8dcfa,
      mapData.fogNear ?? 160,
      mapData.fogFar ?? 420
    )

    // Vast surrounding Venetian stone ground plane outside courtyard boundaries
    // Positioned flush with the courtyard pavement so the whole world is a seamless plane at y = 0
    const extGeo = new THREE.PlaneGeometry(1200, 1200)
    const extMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      roughness: 0.70,
      metalness: 0.05
    })
    const extMesh = new THREE.Mesh(extGeo, extMat)
    extMesh.rotation.x = -Math.PI / 2
    extMesh.position.y = -0.005
    extMesh.receiveShadow = true
    this.group.add(extMesh)

    // Lighting: Hemisphere light (Daylight sky + Warm stone ground bounce)
    const hemiLight = new THREE.HemisphereLight(0xe8f4ff, 0xd0c0a8, 1.25)
    this.group.add(hemiLight)

    // Directional Sun Light with sharp shadows across the full map scale
    const sunLight = new THREE.DirectionalLight(0xfff8ee, 1.65)
    sunLight.position.set(60, 95, 50)
    sunLight.target.position.set(0, 0, 0)
    this.group.add(sunLight.target) // Required for DirectionalLight target matrix to update!
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 2048
    sunLight.shadow.mapSize.height = 2048
    sunLight.shadow.camera.near = 0.5
    sunLight.shadow.camera.far = 280
    sunLight.shadow.camera.left = -95
    sunLight.shadow.camera.right = 95
    sunLight.shadow.camera.top = 95
    sunLight.shadow.camera.bottom = -95
    sunLight.shadow.bias = -0.0001
    sunLight.shadow.normalBias = 0.04 // Eliminates shadow acne & grounding detachment
    this.group.add(sunLight)

    // Secondary fill light for soft ambient shadow fill
    const fillLight = new THREE.DirectionalLight(0xa5cbf5, 0.45)
    fillLight.position.set(-50, 60, -50)
    this.group.add(fillLight)

    // Neon Point Lights
    const pointCyan = new THREE.PointLight(0x00f0ff, 2.5, 60)
    pointCyan.position.set(0, 8, 0)
    this.group.add(pointCyan)

    const pointCoral = new THREE.PointLight(0xff4655, 2.0, 50)
    pointCoral.position.set(-45, 6, -25)
    this.group.add(pointCoral)

    const pointGold = new THREE.PointLight(0xf59e0b, 2.0, 50)
    pointGold.position.set(45, 6, -25)
    this.group.add(pointGold)

    // Blocks & Continuous Incline/Decline Ramps (Tanjakan & Turunan)
    for (const block of mapData.blocks) {
      if (block.comment) continue
      if (block.isRamp) {
        this._addRamp(block)
      } else {
        this._addBlock(block)
      }
    }

    // Environmental Valorant Ascent Props (Cypress Trees, Ivy Vines, Street Lanterns)
    this._addAscentProps()

    return mapData
  }

  _addAscentProps() {
    // 1. Italian Cypress Trees in Stone Planters (Pohon Cemara Italia)
    const treePositions = [
      { x: -6.5, z: -25 },
      { x: 8,   z: -14 },
      { x: 8,   z: 14 },
      { x: 26,  z: -20 },
      { x: 38,  z: -20 },
      { x: -38, z: -12 }
    ]

    const planterGeo = new THREE.BoxGeometry(1.6, 0.7, 1.6)
    const planterMat = this.materials.wall
    const trunkGeo   = new THREE.CylinderGeometry(0.14, 0.18, 2.2, 8)
    const trunkMat   = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.9 })

    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x1e3b26,
      roughness: 0.85,
      metalness: 0.05
    })

    for (const pos of treePositions) {
      const treeGroup = new THREE.Group()
      treeGroup.position.set(pos.x, 0, pos.z)

      // Planter
      const planter = new THREE.Mesh(planterGeo, planterMat)
      planter.position.y = 0.35
      planter.castShadow = true
      planter.receiveShadow = true
      treeGroup.add(planter)

      // Trunk
      const trunk = new THREE.Mesh(trunkGeo, trunkMat)
      trunk.position.y = 1.6
      trunk.castShadow = true
      treeGroup.add(trunk)

      // Slender Conical Foliage Cones
      const cone1 = new THREE.Mesh(new THREE.ConeGeometry(1.15, 3.8, 8), foliageMat)
      cone1.position.y = 3.6
      cone1.castShadow = true
      treeGroup.add(cone1)

      const cone2 = new THREE.Mesh(new THREE.ConeGeometry(0.9, 3.2, 8), foliageMat)
      cone2.position.y = 5.2
      cone2.castShadow = true
      treeGroup.add(cone2)

      const cone3 = new THREE.Mesh(new THREE.ConeGeometry(0.55, 2.6, 8), foliageMat)
      cone3.position.y = 6.8
      cone3.castShadow = true
      treeGroup.add(cone3)

      this.group.add(treeGroup)

      // Planter collision
      const box = new THREE.Box3().setFromObject(planter)
      this.colliders.push({ box, mesh: planter, type: 'structure' })
    }

    // 2. Hanging Mediterranean Ivy Foliage Vines
    const ivyLocations = [
      { x: 0,    y: 7.0, z: -27.8, w: 10, h: 3.5, rx: 0, ry: 0 },
      { x: 12,   y: 6.8, z: -2.0,  w: 6,  h: 4.0, rx: 0, ry: Math.PI / 2 },
      { x: -13.2, y: 5.5, z: 2.0,  w: 5,  h: 3.2, rx: 0, ry: Math.PI / 2 },
      { x: 64,   y: 5.2, z: -2.0,  w: 8,  h: 3.5, rx: 0, ry: 0 }
    ]

    for (const ivy of ivyLocations) {
      const ivyGeo = new THREE.PlaneGeometry(ivy.w, ivy.h)
      const ivyMesh = new THREE.Mesh(ivyGeo, this.materials.ivy)
      ivyMesh.position.set(ivy.x, ivy.y, ivy.z)
      ivyMesh.rotation.set(ivy.rx, ivy.ry, 0)
      this.group.add(ivyMesh)
    }

    // 3. Asian / Venetian Red Hanging Paper Lanterns with Warm Amber Glow
    const lanternLocations = [
      // Mid Bridge Railing Lanterns
      { x: -7.5, y: 4.1, z: -2.3 },
      { x: 7.5,  y: 4.1, z: -2.3 },
      { x: -7.5, y: 4.1, z: 2.3 },
      { x: 7.5,  y: 4.1, z: 2.3 },
      // Attacker Spawn Pavilion Lanterns
      { x: -8.8, y: 4.5, z: -46 },
      { x: 8.8,  y: 4.5, z: -46 },
      // Defender Spawn Pavilion Lanterns
      { x: -8.8, y: 4.5, z: 46 },
      { x: 8.8,  y: 4.5, z: 46 },
      // B Site Pagoda Tower Lanterns
      { x: 42,   y: 8.2, z: 10 },
      { x: 42,   y: 8.2, z: 18 }
    ]

    const lanternHousingMat = new THREE.MeshStandardMaterial({ color: 0x1f2429, metalness: 0.9, roughness: 0.3 })
    const lanternGlassMat   = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xd97706, emissiveIntensity: 1.4, roughness: 0.2 })

    for (const l of lanternLocations) {
      const lGroup = new THREE.Group()
      lGroup.position.set(l.x, l.y, l.z)

      const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.35), lanternHousingMat)
      lGroup.add(cord)

      const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.16, 0.38, 8), lanternGlassMat)
      housing.position.set(0, -0.28, 0)
      lGroup.add(housing)

      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 0.05, 8), lanternHousingMat)
      cap.position.set(0, -0.09, 0)
      lGroup.add(cap)

      const bottomCap = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.05, 8), lanternHousingMat)
      bottomCap.position.set(0, -0.47, 0)
      lGroup.add(bottomCap)

      const pLight = new THREE.PointLight(0xf59e0b, 1.4, 14)
      pLight.position.set(0, -0.28, 0)
      lGroup.add(pLight)

      this.group.add(lGroup)
    }
  }

  update(time) {
    // 1. Shimmering animated flow on Turquoise Water Canal & Basins
    if (this.waterTexture) {
      this.waterTexture.offset.x = (time * 0.04) % 1
      this.waterTexture.offset.y = (time * 0.025) % 1
    }

    // 2. Smooth dynamic emissive pulse on Radianite green crystals (Valorant aesthetic)
    if (this.radianiteMeshes.length > 0) {
      const pulse = 0.50 + Math.sin(time * 2.8) * 0.25
      for (const m of this.radianiteMeshes) {
        if (m.material) m.material.emissiveIntensity = pulse
      }
    }
  }

  _addBlock(block) {
    const { x, y, z, w, h, d, type = 'wall' } = block
    const geo = new THREE.BoxGeometry(w, h, d)
    const mat = this.materials[type] ?? this.materials.wall

    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(x, y, z)
    mesh.receiveShadow = true
    // Ground and water never cast shadows beneath themselves
    mesh.castShadow = (type !== 'ground' && type !== 'water')
    mesh.userData.type = type
    this.group.add(mesh)

    // Save Radianite crates for dynamic breathing pulse
    if (type === 'radianite') {
      this.radianiteMeshes.push(mesh)
    }

    // Only glowing sci-fi Radianite crates & generator have subtle energy edge seams
    if (type === 'radianite' || type === 'generator') {
      const edges = new THREE.EdgesGeometry(geo)
      const edgeMat = this.edgeMaterials[type] ?? this.edgeMaterials.radianite
      const line = new THREE.LineSegments(edges, edgeMat)
      mesh.add(line)
    }

    // Register AABB collider (Water is traversable; the stone canal bed beneath provides ground contact)
    if (type !== 'trigger' && type !== 'water') {
      const box = new THREE.Box3().setFromObject(mesh)
      this.colliders.push({ box, mesh, type })
    }
  }

  _addRamp(block) {
    const { minX, maxX, minZ, maxZ, startY, endY, axis = 'z', type = 'pagoda_wood', baseFloorY = 0 } = block
    const w = maxX - minX
    const d = maxZ - minZ
    const midX = (minX + maxX) / 2
    const midZ = (minZ + maxZ) / 2

    // Build solid grounded trapezoidal ramp prism with zero under-gap and seamless floor meeting
    const geo = this._buildRampGeometry(w, d, startY, endY, axis, baseFloorY)
    const mat = this.materials[type] ?? this.materials.pagoda_wood
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(midX, 0, midZ)
    mesh.receiveShadow = true
    mesh.castShadow = true
    mesh.userData.type = type
    mesh.userData.isRamp = true
    this.group.add(mesh)

    // Register ramp for continuous butter-smooth incline/decline collision
    this.ramps.push({ minX, maxX, minZ, maxZ, startY, endY, axis, type })

    // Also register an AABB bounding box for raycasting bullet impacts
    const box = new THREE.Box3().setFromObject(mesh)
    this.colliders.push({ box, mesh, type, isRamp: true })
  }

  _buildRampGeometry(w, d, startY, endY, axis, baseFloorY = 0) {
    const geo = new THREE.BufferGeometry()
    const halfW = w / 2
    const halfD = d / 2
    const positions = []
    const uvs = []

    function addQuad(p1, p2, p3, p4, uvScaleU = 1, uvScaleV = 1) {
      positions.push(...p1, ...p2, ...p3)
      positions.push(...p1, ...p3, ...p4)
      uvs.push(0, 0, uvScaleU, 0, uvScaleU, uvScaleV)
      uvs.push(0, 0, uvScaleU, uvScaleV, 0, uvScaleV)
    }

    const y0 = startY
    const y1 = endY
    const yB = Math.min(baseFloorY, Math.min(y0, y1))

    if (axis === 'z') {
      const pFBL = [-halfW, yB, -halfD]
      const pFBR = [ halfW, yB, -halfD]
      const pBBL = [-halfW, yB,  halfD]
      const pBBR = [ halfW, yB,  halfD]
      const pFTL = [-halfW, y0, -halfD]
      const pFTR = [ halfW, y0, -halfD]
      const pBTL = [-halfW, y1,  halfD]
      const pBTR = [ halfW, y1,  halfD]

      // Top walkable ramp slope
      addQuad(pFTL, pFTR, pBTR, pBTL, w / 2, Math.hypot(d, y1 - y0) / 2)
      // Bottom face flush on ground
      addQuad(pFBL, pBBL, pBBR, pFBR, w / 2, d / 2)
      // Front vertical face (if y0 > yB)
      if (y0 > yB + 0.001) addQuad(pFBL, pFBR, pFTR, pFTL, w / 2, (y0 - yB) / 2)
      // Back vertical face (if y1 > yB)
      if (y1 > yB + 0.001) addQuad(pBBR, pBBL, pBTL, pBTR, w / 2, (y1 - yB) / 2)
      // Enclosed left and right side skirts (no hollow gap under ramp)
      addQuad(pBBL, pFBL, pFTL, pBTL, d / 2, (Math.max(y0, y1) - yB) / 2)
      addQuad(pFBR, pBBR, pBTR, pFTR, d / 2, (Math.max(y0, y1) - yB) / 2)
    } else {
      const pLBL = [-halfW, yB, -halfD]
      const pLBR = [-halfW, yB,  halfD]
      const pRBL = [ halfW, yB, -halfD]
      const pRBR = [ halfW, yB,  halfD]
      const pLTL = [-halfW, y0, -halfD]
      const pLTR = [-halfW, y0,  halfD]
      const pRTL = [ halfW, y1, -halfD]
      const pRTR = [ halfW, y1,  halfD]

      // Top walkable ramp slope
      addQuad(pLTL, pRTL, pRTR, pLTR, Math.hypot(w, y1 - y0) / 2, d / 2)
      // Bottom face flush on ground
      addQuad(pLBL, pLBR, pRBR, pRBL, w / 2, d / 2)
      // Left vertical face (if y0 > yB)
      if (y0 > yB + 0.001) addQuad(pLBL, pLBR, pLTR, pLTL, d / 2, (y0 - yB) / 2)
      // Right vertical face (if y1 > yB)
      if (y1 > yB + 0.001) addQuad(pRBR, pRBL, pRTL, pRTR, d / 2, (y1 - yB) / 2)
      // Enclosed front and back side skirts (no hollow gap under ramp)
      addQuad(pLBL, pRBL, pRTL, pLTL, w / 2, (Math.max(y0, y1) - yB) / 2)
      addQuad(pRBR, pLBR, pLTR, pRTR, w / 2, (Math.max(y0, y1) - yB) / 2)
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    geo.computeVertexNormals()
    return geo
  }

  getColliders() {
    return this.colliders
  }

  getRamps() {
    return this.ramps || []
  }

  getSpawnPoints(mapData) {
    return (mapData.spawn ?? [[0, 0.9, -28]]).map(p => new THREE.Vector3(p[0], p[1], p[2]))
  }

  clear() {
    this.group.clear()
    this.colliders = []
    this.ramps = []
    this.radianiteMeshes = []
    if (this.skyDomeData) {
      this.scene.remove(this.skyDomeData.skyMesh)
      this.scene.remove(this.skyDomeData.bgGroup)
      this.skyDomeData = null
    }
    this.scene.fog = null
  }
}
