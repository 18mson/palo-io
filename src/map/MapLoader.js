import * as THREE from 'three'
import {
  createFloorTexture,
  createWallTexture,
  createRadianiteTexture,
  createSkyDome
} from './MapTextures.js'

/**
 * MapLoader — builds Three.js scene from map JSON data with procedural textures & sky dome
 */
export class MapLoader {
  constructor(scene) {
    this.scene = scene
    this.colliders = []
    this.group = new THREE.Group()
    this.scene.add(this.group)
    this.skyDomeData = null
  }

  async load(mapData) {
    this.clear()

    // ── Procedural Textures ──
    const floorTex = createFloorTexture()
    const wallTex  = createWallTexture()
    const crateTex = createRadianiteTexture()

    // Materials
    this.materials = {
      ground: new THREE.MeshStandardMaterial({
        map: floorTex,
        roughness: 0.70,
        metalness: 0.05,
      }),
      wall: new THREE.MeshStandardMaterial({
        map: wallTex,
        roughness: 0.65,
        metalness: 0.10,
      }),
      box: new THREE.MeshStandardMaterial({
        color: 0x9a724a, // Warm tactical wood crate
        roughness: 0.70,
        metalness: 0.1,
      }),
      platform: new THREE.MeshStandardMaterial({
        color: 0x8a9aa8, // Smooth light stone walkway
        roughness: 0.55,
        metalness: 0.15,
      }),
      structure: new THREE.MeshStandardMaterial({
        map: wallTex,
        roughness: 0.7,
        metalness: 0.10,
      }),
      radianite: new THREE.MeshStandardMaterial({
        map: crateTex,
        emissive: 0x059669,
        emissiveIntensity: 0.45,
        roughness: 0.3,
        metalness: 0.4,
      }),
    }

    this.edgeMaterials = {
      ground:    new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25 }),
      wall:      new THREE.LineBasicMaterial({ color: 0xe2c499, transparent: true, opacity: 0.45 }),
      box:       new THREE.LineBasicMaterial({ color: 0xd97706, transparent: true, opacity: 0.65 }),
      platform:  new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.65 }),
      structure: new THREE.LineBasicMaterial({ color: 0xb5946a, transparent: true, opacity: 0.45 }),
      radianite: new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.95 }),
    }

    // Sky Dome & Background Skyline
    this.skyDomeData = createSkyDome(this.scene)

    // Clear background: Bright Mediterranean sky blue
    this.scene.background = new THREE.Color(0xb2d9fc)

    // Atmospheric Fog: Bright daytime horizon haze
    this.scene.fog = new THREE.Fog(
      0xb8dcfa,
      mapData.fogNear ?? 140,
      mapData.fogFar ?? 350
    )

    // Vast surrounding Venetian stone ground plane outside courtyard boundaries
    // Positioned flush with the courtyard pavement so the whole world is a seamless plane at y = 0
    const extGeo = new THREE.PlaneGeometry(800, 800)
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

    // Directional Sun Light with sharp shadows across the map
    const sunLight = new THREE.DirectionalLight(0xfff8ee, 1.65)
    sunLight.position.set(40, 65, 30)
    sunLight.target.position.set(0, 0, 0)
    this.group.add(sunLight.target) // Required for DirectionalLight target matrix to update!
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 2048
    sunLight.shadow.mapSize.height = 2048
    sunLight.shadow.camera.near = 0.5
    sunLight.shadow.camera.far = 180
    sunLight.shadow.camera.left = -55
    sunLight.shadow.camera.right = 55
    sunLight.shadow.camera.top = 55
    sunLight.shadow.camera.bottom = -55
    sunLight.shadow.bias = -0.0001
    sunLight.shadow.normalBias = 0.04 // Eliminates shadow acne & grounding detachment (Peter Panning)
    this.group.add(sunLight)

    // Secondary fill light for soft ambient shadow fill
    const fillLight = new THREE.DirectionalLight(0xa5cbf5, 0.45)
    fillLight.position.set(-35, 40, -35)
    this.group.add(fillLight)

    // Neon Point Lights
    const pointCyan = new THREE.PointLight(0x00f0ff, 2.5, 50)
    pointCyan.position.set(0, 8, 0)
    this.group.add(pointCyan)

    const pointCoral = new THREE.PointLight(0xff4655, 2.0, 40)
    pointCoral.position.set(-20, 6, -20)
    this.group.add(pointCoral)

    // Blocks
    for (const block of mapData.blocks) {
      if (block.comment) continue
      this._addBlock(block)
    }

    return mapData
  }

  _addBlock(block) {
    const { x, y, z, w, h, d, type = 'wall' } = block
    const geo = new THREE.BoxGeometry(w, h, d)
    const mat = this.materials[type] ?? this.materials.wall

    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(x, y, z)
    mesh.receiveShadow = true
    // Ground never casts shadow beneath itself (prevents floating shadow artifacts)
    mesh.castShadow = (type !== 'ground')
    mesh.userData.type = type
    this.group.add(mesh)

    // Only glowing sci-fi Radianite crates have energy edge seams;
    // Walls and boxes do NOT have edge lines so they rest firmly on the stone ground with zero hover-glow seam
    if (type === 'radianite') {
      const edges = new THREE.EdgesGeometry(geo)
      const edgeMat = this.edgeMaterials.radianite
      const line = new THREE.LineSegments(edges, edgeMat)
      mesh.add(line)
    }

    // Register AABB collider
    if (type !== 'trigger') {
      const box = new THREE.Box3().setFromObject(mesh)
      this.colliders.push({ box, mesh, type })
    }
  }

  getColliders() {
    return this.colliders
  }

  getSpawnPoints(mapData) {
    return (mapData.spawn ?? [[0, 0.9, -28]]).map(p => new THREE.Vector3(p[0], p[1], p[2]))
  }

  clear() {
    this.group.clear()
    this.colliders = []
    if (this.skyDomeData) {
      this.scene.remove(this.skyDomeData.skyMesh)
      this.scene.remove(this.skyDomeData.bgGroup)
      this.skyDomeData = null
    }
    this.scene.fog = null
  }
}
