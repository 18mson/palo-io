import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { expandMapMacros } from './MapMacros.js'
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
    this.mapData = null
    this.zones = []
    this.ladders = []
  }

  getZones() {
    return this.zones
  }

  getLadders() {
    return this.ladders
  }

  getMapData() {
    return this.mapData
  }

  async load(rawMapData) {
    this.clear()

    // Expand map macros (wallWithDoor, stairs, ladder, repeat, window)
    const mapData = expandMapMacros(rawMapData)
    this.mapData = mapData
    this.zones = mapData.zones || []
    this.ladders = mapData.ladders || []

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

    // Materials: flat-ish voxel feel, metalness 0 on stone/wood/brick, per-zone vertex colors
    this.materials = {
      ground: new THREE.MeshStandardMaterial({
        map: floorTex,
        roughness: 0.85,
        metalness: 0.0,
        vertexColors: true,
      }),
      accent_stone: new THREE.MeshStandardMaterial({
        map: accentStoneTex,
        roughness: 0.85,
        metalness: 0.0,
        vertexColors: true,
      }),
      wall: new THREE.MeshStandardMaterial({
        map: wallTex,
        roughness: 0.88,
        metalness: 0.0,
        vertexColors: true,
      }),
      brick: new THREE.MeshStandardMaterial({
        map: brickTex,
        roughness: 0.90,
        metalness: 0.0,
        vertexColors: true,
      }),
      pagoda_wood: new THREE.MeshStandardMaterial({
        map: pagodaWoodTex,
        roughness: 0.85,
        metalness: 0.0,
        vertexColors: true,
      }),
      asian_roof: new THREE.MeshStandardMaterial({
        map: asianRoofTex,
        roughness: 0.80,
        metalness: 0.0,
        vertexColors: true,
      }),
      water: new THREE.MeshStandardMaterial({
        map: waterTex,
        color: 0x38bdf8,
        roughness: 0.20,
        metalness: 0.05,
        transparent: true,
        opacity: 0.85,
        vertexColors: true,
      }),
      box: new THREE.MeshStandardMaterial({
        map: boxTex,
        roughness: 0.85,
        metalness: 0.0,
        vertexColors: true,
      }),
      platform: new THREE.MeshStandardMaterial({
        map: floorTex,
        roughness: 0.85,
        metalness: 0.0,
        vertexColors: true,
      }),
      stairs: new THREE.MeshStandardMaterial({
        map: stoneStairsTex,
        roughness: 0.80,
        metalness: 0.0,
        vertexColors: true,
      }),
      stairs_wood: new THREE.MeshStandardMaterial({
        map: woodStairsTex,
        roughness: 0.85,
        metalness: 0.0,
        vertexColors: true,
      }),
      cobble: new THREE.MeshStandardMaterial({
        map: cobbleTex,
        roughness: 0.85,
        metalness: 0.0,
        vertexColors: true,
      }),
      terracotta: new THREE.MeshStandardMaterial({
        map: terracottaTex,
        roughness: 0.85,
        metalness: 0.0,
        vertexColors: true,
      }),
      site_a: new THREE.MeshStandardMaterial({
        map: siteATex,
        roughness: 0.80,
        metalness: 0.0,
        vertexColors: true,
      }),
      site_b: new THREE.MeshStandardMaterial({
        map: siteBTex,
        roughness: 0.80,
        metalness: 0.0,
        vertexColors: true,
      }),
      teal: new THREE.MeshStandardMaterial({
        map: tealTex,
        roughness: 0.80,
        metalness: 0.0,
        vertexColors: true,
      }),
      ivy: new THREE.MeshStandardMaterial({
        map: ivyTex,
        transparent: true,
        alphaTest: 0.35,
        side: THREE.DoubleSide,
        roughness: 0.85,
        metalness: 0.0,
        vertexColors: true,
      }),
      structure: new THREE.MeshStandardMaterial({
        map: wallTex,
        roughness: 0.88,
        metalness: 0.0,
        vertexColors: true,
      }),
      radianite: new THREE.MeshStandardMaterial({
        map: crateTex,
        emissive: 0x059669,
        emissiveIntensity: 0.65,
        roughness: 0.40,
        metalness: 0.05,
        vertexColors: true,
      }),
      generator: new THREE.MeshStandardMaterial({
        map: genTex,
        roughness: 0.50,
        metalness: 0.20,
        vertexColors: true,
      }),
      door: new THREE.MeshStandardMaterial({
        map: doorTex,
        roughness: 0.70,
        metalness: 0.10,
        vertexColors: true,
      }),
      awning: new THREE.MeshStandardMaterial({
        map: awningTex,
        roughness: 0.90,
        metalness: 0.0,
        vertexColors: true,
      }),
      roof: new THREE.MeshStandardMaterial({
        map: roofTex,
        roughness: 0.80,
        metalness: 0.0,
        vertexColors: true,
      }),
      metal: new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.50,
        metalness: 0.40,
        vertexColors: true,
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
      mapData.fogNear ?? 140,
      mapData.fogFar ?? 400
    )

    // Lighting: Hemisphere light (Daylight sky + Warm stone ground bounce)
    const hemiLight = new THREE.HemisphereLight(0xe8f4ff, 0xdcd0c0, 1.30)
    this.group.add(hemiLight)

    // Directional Sun Light with soft shadows limited to a radius around the player
    this.sunLight = new THREE.DirectionalLight(0xfffbee, 1.55)
    this.sunLight.position.set(40, 70, 35)
    this.sunLight.target.position.set(0, 0, 0)
    this.group.add(this.sunLight.target)
    this.group.add(this.sunLight)

    this.sunLight.castShadow = true
    this.sunLight.shadow.mapSize.width = 2048
    this.sunLight.shadow.mapSize.height = 2048
    this.sunLight.shadow.camera.near = 1.0
    this.sunLight.shadow.camera.far = 160

    // Soft shadow radius around player (32m radius)
    const shadowRadius = 32
    this.sunLight.shadow.camera.left = -shadowRadius
    this.sunLight.shadow.camera.right = shadowRadius
    this.sunLight.shadow.camera.top = shadowRadius
    this.sunLight.shadow.camera.bottom = -shadowRadius
    this.sunLight.shadow.bias = -0.0003
    this.sunLight.shadow.normalBias = 0.04
    this.sunLight.shadow.radius = 2.5 // Soft shadow penumbra

    // Secondary fill light for soft ambient shadow fill
    const fillLight = new THREE.DirectionalLight(0xa5cbf5, 0.45)
    fillLight.position.set(-50, 60, -50)
    this.group.add(fillLight)

    // Subtle ambient PointLights near spawn pavilions
    const atkSpawnLight = new THREE.PointLight(0xf59e0b, 1.2, 20)
    atkSpawnLight.position.set(0, 4.0, -46)
    this.group.add(atkSpawnLight)

    const defSpawnLight = new THREE.PointLight(0xf59e0b, 1.2, 20)
    defSpawnLight.position.set(0, 4.0, 46)
    this.group.add(defSpawnLight)

    // Merge static non-ramp blocks by material type into unified meshes & build ramps
    this._buildBlocksAndRamps(mapData)

    // Environmental Ascent Props (Cypress Trees, Wall-attached Ivy, Lanterns)
    this._addProps(mapData)

    return mapData
  }

  _addProps(mapData) {
    const props = mapData.props || []
    for (const prop of props) {
      switch (prop.type) {
        case 'tree':
          this._addTree(prop)
          break
        case 'planter':
          this._addPlanter(prop)
          break
        case 'lantern':
          this._addLantern(prop)
          break
        case 'crate':
          this._addCrate(prop)
          break
        case 'bush':
          this._addBush(prop)
          break
        case 'banner':
          this._addBanner(prop)
          break
        case 'ivy':
          this._addIvy(prop, mapData)
          break
      }
    }
  }

  _addTree(prop) {
    const { x = 0, y = 0, z = 0, ry = 0 } = prop
    const treeGroup = new THREE.Group()
    treeGroup.position.set(x, y, z)
    treeGroup.rotation.y = ry

    const trunkGeo = new THREE.CylinderGeometry(0.14, 0.18, 2.2, 8)
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.9 })
    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x1e3b26,
      roughness: 0.85,
      metalness: 0.05
    })

    const trunk = new THREE.Mesh(trunkGeo, trunkMat)
    trunk.position.y = 1.6
    trunk.castShadow = true
    treeGroup.add(trunk)

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
  }

  _addPlanter(prop) {
    const { x = 0, y = 0.35, z = 0, w = 1.6, h = 0.7, d = 1.6, type = 'wall' } = prop
    const planterGeo = new THREE.BoxGeometry(w, h, d)
    const planterMat = this.materials[type] || this.materials.wall
    const planter = new THREE.Mesh(planterGeo, planterMat)
    planter.position.set(x, y, z)
    planter.castShadow = true
    planter.receiveShadow = true
    this.group.add(planter)

    const box = new THREE.Box3().setFromObject(planter)
    this.colliders.push({ box, mesh: planter, type: 'structure', isRamp: false, id: prop.id, zone: prop.zone })
  }

  _addLantern(prop) {
    const { x = 0, y = 4.0, z = 0 } = prop
    const lGroup = new THREE.Group()
    lGroup.position.set(x, y, z)

    const lanternHousingMat = new THREE.MeshStandardMaterial({ color: 0x1f2429, metalness: 0.9, roughness: 0.3 })
    const lanternGlassMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xd97706,
      emissiveIntensity: 1.4,
      roughness: 0.2
    })

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

    this.group.add(lGroup)
  }

  _addCrate(prop) {
    const { x = 0, y = 0.5, z = 0, w = 1.5, h = 1.5, d = 1.5, crateType = 'box' } = prop
    const mat = this.materials[crateType] || this.materials.box
    const geo = new THREE.BoxGeometry(w, h, d)
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(x, y, z)
    mesh.castShadow = true
    mesh.receiveShadow = true
    this.group.add(mesh)

    const box = new THREE.Box3().setFromObject(mesh)
    this.colliders.push({ box, mesh, type: crateType, isRamp: false, id: prop.id, zone: prop.zone })
  }

  _addBush(prop) {
    const { x = 0, y = 0.5, z = 0, radius = 0.8 } = prop
    const bushGeo = new THREE.DodecahedronGeometry(radius, 1)
    const bushMat = new THREE.MeshStandardMaterial({
      color: 0x22542a,
      roughness: 0.85,
      metalness: 0.05,
      flatShading: true
    })
    const bush = new THREE.Mesh(bushGeo, bushMat)
    bush.position.set(x, y, z)
    bush.castShadow = true
    bush.receiveShadow = true
    this.group.add(bush)
  }

  _addBanner(prop) {
    const { x = 0, y = 4.0, z = 0, ry = 0, w = 1.2, h = 2.4 } = prop
    const bannerGroup = new THREE.Group()
    bannerGroup.position.set(x, y, z)
    bannerGroup.rotation.y = ry

    // Rod
    const rodGeo = new THREE.CylinderGeometry(0.04, 0.04, w + 0.3, 8)
    const rodMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.3 })
    const rod = new THREE.Mesh(rodGeo, rodMat)
    rod.rotation.z = Math.PI / 2
    bannerGroup.add(rod)

    // Cloth Plane
    const clothGeo = new THREE.PlaneGeometry(w, h)
    const clothMat = new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      roughness: 0.7,
      metalness: 0.1,
      side: THREE.DoubleSide
    })
    const cloth = new THREE.Mesh(clothGeo, clothMat)
    cloth.position.y = -h / 2
    bannerGroup.add(cloth)

    this.group.add(bannerGroup)
  }

  _addIvy(prop, mapData) {
    if (prop.targetBlockId) {
      const targetBlock = mapData.blocks.find(b => b.id === prop.targetBlockId)
      if (targetBlock) {
        this._addWallIvy(targetBlock, prop)
      }
    } else if (prop.x != null && prop.z != null) {
      const { x = 0, y = 2, z = 0, ry = 0, w = 3, h = 3 } = prop
      const geo = new THREE.PlaneGeometry(w, h)
      const mesh = new THREE.Mesh(geo, this.materials.ivy)
      mesh.position.set(x, y, z)
      mesh.rotation.set(0, ry, 0)
      mesh.receiveShadow = true
      this.group.add(mesh)
    }
  }

  _addWallIvy(block, prop) {
    const { face = '+z', offset = { x: 0, y: 0 }, w = 4, h = 4 } = prop
    const halfW = block.w / 2
    const halfH = block.h / 2
    const halfD = block.d / 2

    let px = block.x
    let py = block.y + (offset.y || 0)
    let pz = block.z
    let ry = 0

    if (face === '+x') {
      px = block.x + halfW + 0.02
      pz = block.z + (offset.x || 0)
      ry = Math.PI / 2
    } else if (face === '-x') {
      px = block.x - halfW - 0.02
      pz = block.z + (offset.x || 0)
      ry = -Math.PI / 2
    } else if (face === '+z') {
      pz = block.z + halfD + 0.02
      px = block.x + (offset.x || 0)
      ry = 0
    } else if (face === '-z') {
      pz = block.z - halfD - 0.02
      px = block.x + (offset.x || 0)
      ry = Math.PI
    }

    const geo = new THREE.PlaneGeometry(w, h)
    const mesh = new THREE.Mesh(geo, this.materials.ivy)
    mesh.position.set(px, py, pz)
    mesh.rotation.set(0, ry, 0)
    mesh.receiveShadow = true
    this.group.add(mesh)
  }

  _buildBlocksAndRamps(mapData) {
    const blocksByType = new Map()

    function getZoneTint(block) {
      const z = (block.zone || '').toLowerCase()
      const x = typeof block.x === 'number' ? block.x : ((block.minX + block.maxX) / 2)
      const zCoord = typeof block.z === 'number' ? block.z : ((block.minZ + block.maxZ) / 2)

      // Zone A (West / Site A): Warm sunlit stone tint
      if (z.includes('sitea') || z.includes('aheaven') || z.includes('ahell') || x < -18) {
        return [1.06, 0.97, 0.88]
      }
      // Zone B (East / Site B): Cooler blue accents
      if (z.includes('siteb') || z.includes('bheaven') || z.includes('bhell') || x > 18) {
        return [0.88, 0.95, 1.08]
      }
      // Mid Zone: Cooler blue/cyan canal accents
      if (z.includes('mid') || (x >= -18 && x <= 18 && Math.abs(zCoord) < 30)) {
        return [0.92, 0.98, 1.06]
      }
      // Spawns & Alleys: Natural daylight
      return [1.0, 1.0, 1.0]
    }

    for (const block of mapData.blocks) {
      if (block.comment) continue
      if (block.isRamp) {
        this._addRamp(block, getZoneTint(block))
      } else {
        const type = block.type || 'wall'
        if (!blocksByType.has(type)) blocksByType.set(type, [])
        blocksByType.get(type).push(block)

        // Keep per-block AABB collider list unchanged (water, trigger, and decorative details are non-colliding)
        if (type !== 'trigger' && type !== 'water' && !block.noCollision && !block.decor) {
          const { x, y, z, w, h, d } = block
          const box = new THREE.Box3(
            new THREE.Vector3(x - w / 2, y - h / 2, z - d / 2),
            new THREE.Vector3(x + w / 2, y + h / 2, z + d / 2)
          )
          this.colliders.push({ box, type, isRamp: false, id: block.id, zone: block.zone })
        }
      }
    }

    // Merge static non-ramp blocks by material type into one mesh per material with per-zone vertex tinting
    for (const [type, blocks] of blocksByType.entries()) {
      const geos = []
      for (const b of blocks) {
        const { x, y, z, w, h, d } = b
        const [tr, tg, tb] = getZoneTint(b)
        const bGeo = new THREE.BoxGeometry(w, h, d)
        bGeo.translate(x, y, z)

        const vCount = bGeo.attributes.position.count
        const colors = new Float32Array(vCount * 3)
        for (let i = 0; i < vCount; i++) {
          colors[i * 3]     = tr
          colors[i * 3 + 1] = tg
          colors[i * 3 + 2] = tb
        }
        bGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        geos.push(bGeo)
      }

      if (geos.length === 0) continue

      const mergedGeo = BufferGeometryUtils.mergeGeometries(geos, false)
      for (const g of geos) g.dispose()

      const mat = this.materials[type] ?? this.materials.wall
      const mesh = new THREE.Mesh(mergedGeo, mat)
      mesh.receiveShadow = true
      mesh.castShadow = (type !== 'ground' && type !== 'water')
      mesh.userData.type = type
      this.group.add(mesh)

      if (type === 'radianite') {
        this.radianiteMeshes.push(mesh)
      }

      // Energy edge seams for Radianite and Generator
      if (type === 'radianite' || type === 'generator') {
        const edges = new THREE.EdgesGeometry(mergedGeo)
        const edgeMat = this.edgeMaterials[type] ?? this.edgeMaterials.radianite
        const line = new THREE.LineSegments(edges, edgeMat)
        mesh.add(line)
      }
    }
  }

  update(time, focusPos = null) {
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

    // 3. Keep directional sun soft shadow frustum centered around player / camera
    if (this.sunLight && focusPos) {
      this.sunLight.target.position.set(focusPos.x, focusPos.y, focusPos.z)
      this.sunLight.position.set(focusPos.x + 35, focusPos.y + 65, focusPos.z + 30)
    }
  }

  _addRamp(block, tint = [1, 1, 1]) {
    const { minX, maxX, minZ, maxZ, startY, endY, axis = 'z', type = 'pagoda_wood', baseFloorY = 0 } = block
    const w = maxX - minX
    const d = maxZ - minZ
    const midX = (minX + maxX) / 2
    const midZ = (minZ + maxZ) / 2

    // Build solid grounded trapezoidal ramp prism with zero under-gap and seamless floor meeting
    const geo = this._buildRampGeometry(w, d, startY, endY, axis, baseFloorY, tint)
    const baseMat = this.materials[type] ?? this.materials.pagoda_wood
    const mat = baseMat.clone()
    mat.side = THREE.DoubleSide
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(midX, 0, midZ)
    mesh.receiveShadow = true
    mesh.castShadow = true
    mesh.userData.type = type
    mesh.userData.isRamp = true
    this.group.add(mesh)

    // Register ramp for continuous butter-smooth incline/decline collision
    this.ramps.push({ minX, maxX, minZ, maxZ, startY, endY, axis, type, id: block.id, zone: block.zone })

    // Also register an AABB bounding box for raycasting bullet impacts
    const box = new THREE.Box3().setFromObject(mesh)
    this.colliders.push({ box, mesh, type, isRamp: true, id: block.id, zone: block.zone })
  }

  _buildRampGeometry(w, d, startY, endY, axis, baseFloorY = 0, tint = [1, 1, 1]) {
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

      // Top walkable ramp slope (Normals point upward +Y so slope is visible from above)
      addQuad(pFTL, pBTL, pBTR, pFTR, w / 2, Math.hypot(d, y1 - y0) / 2)
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

      // Top walkable ramp slope (Normals point upward +Y so slope is visible from above)
      addQuad(pLTL, pLTR, pRTR, pRTL, Math.hypot(w, y1 - y0) / 2, d / 2)
      // Bottom face flush on ground
      addQuad(pLBL, pLBR, pRBR, pRBL, w / 2, d / 2)
      // Left vertical face (if y0 > yB)
      if (y0 > yB + 0.001) addQuad(pLBL, pLBR, pLTR, pLTL, d / 2, (y0 - yB) / 2)
      // Right vertical face (if y1 > yB)
      if (y1 > yB + 0.001) addQuad(pRBR, pRBL, pRTL, pRTR, d / 2, (y1 - yB) / 2)
      // Enclosed front and back side skirts (no hollow gap under ramp)
      addQuad(pLBL, pLTL, pRTL, pRBL, w / 2, (Math.max(y0, y1) - yB) / 2)
      addQuad(pRBR, pRTR, pLTR, pLBR, w / 2, (Math.max(y0, y1) - yB) / 2)
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))

    const vCount = positions.length / 3
    const colors = new Float32Array(vCount * 3)
    for (let i = 0; i < vCount; i++) {
      colors[i * 3]     = tint[0]
      colors[i * 3 + 1] = tint[1]
      colors[i * 3 + 2] = tint[2]
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

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
