import * as THREE from 'three'

/**
 * Temporary Minimal Flat Gray Floor Stub Map (120m x 112m)
 * Provides lighting, flat floor, perimeter walls, collision, and spawn points.
 */
export function createTemporaryMap(scene) {
  const group = new THREE.Group()
  group.name = 'temporary-stub-map'

  // 1. Scene Environment & Lighting
  scene.background = new THREE.Color(0x8fa3b8)

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444d56, 0.85)
  hemiLight.position.set(0, 50, 0)
  group.add(hemiLight)

  const sun = new THREE.DirectionalLight(0xffffff, 1.1)
  sun.position.set(30, 60, 20)
  sun.castShadow = true
  sun.shadow.mapSize.width = 2048
  sun.shadow.mapSize.height = 2048
  sun.shadow.camera.near = 0.5
  sun.shadow.camera.far = 180
  sun.shadow.camera.left = -70
  sun.shadow.camera.right = 70
  sun.shadow.camera.top = 70
  sun.shadow.camera.bottom = -70
  group.add(sun)

  // 2. Geometry: Flat Gray Floor 120m x 112m (bounds: x [-60, 60], z [-56, 56])
  const floorGeo = new THREE.BoxGeometry(120, 1, 112)
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x6e7681,
    roughness: 0.9,
    metalness: 0.05
  })
  const floorMesh = new THREE.Mesh(floorGeo, floorMat)
  floorMesh.position.set(0, -0.5, 0)
  floorMesh.receiveShadow = true
  group.add(floorMesh)

  // Subtle grid overlay texture or markings to help depth perception
  const gridHelper = new THREE.GridHelper(120, 60, 0x30363d, 0x484f58)
  gridHelper.position.set(0, 0.01, 0)
  group.add(gridHelper)

  // Perimeter Boundary Walls (height 4m)
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x484f58,
    roughness: 0.8
  })

  // North wall (z = -56)
  const northWall = new THREE.Mesh(new THREE.BoxGeometry(120, 4, 1), wallMat)
  northWall.position.set(0, 2, -56.5)
  northWall.castShadow = true
  northWall.receiveShadow = true
  group.add(northWall)

  // South wall (z = +56)
  const southWall = new THREE.Mesh(new THREE.BoxGeometry(120, 4, 1), wallMat)
  southWall.position.set(0, 2, 56.5)
  southWall.castShadow = true
  southWall.receiveShadow = true
  group.add(southWall)

  // West wall (x = -60)
  const westWall = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 114), wallMat)
  westWall.position.set(-60.5, 2, 0)
  westWall.castShadow = true
  westWall.receiveShadow = true
  group.add(westWall)

  // East wall (x = +60)
  const eastWall = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 114), wallMat)
  eastWall.position.set(60.5, 2, 0)
  eastWall.castShadow = true
  eastWall.receiveShadow = true
  group.add(eastWall)

  scene.add(group)

  // 3. Collision Representation
  const boxes = [
    // Floor
    new THREE.Box3(new THREE.Vector3(-60, -1, -56), new THREE.Vector3(60, 0, 56)),
    // Boundary walls
    new THREE.Box3(new THREE.Vector3(-60, 0, -57), new THREE.Vector3(60, 4, -56)),
    new THREE.Box3(new THREE.Vector3(-60, 0, 56), new THREE.Vector3(60, 4, 57)),
    new THREE.Box3(new THREE.Vector3(-61, 0, -57), new THREE.Vector3(-60, 4, 57)),
    new THREE.Box3(new THREE.Vector3(60, 0, -57), new THREE.Vector3(61, 4, 57))
  ]

  const hitPointHelper = new THREE.Vector3()

  const collision = {
    getLadders() {
      return []
    },

    resolve(position, displacement, halfW = 0.4, halfH = 0.9, allowGlide = true) {
      let onGround = false
      let collidedX = false
      let collidedZ = false
      const pos = position.clone()

      // Vertical step & gravity resolution
      const targetY = pos.y + displacement.y
      if (targetY - halfH <= 0) {
        pos.y = halfH + 0.08 // 0.98 standing feet at 0.08 above floor
        onGround = true
      } else {
        pos.y = targetY
        onGround = (targetY - halfH <= 0.1)
      }

      // Horizontal boundaries resolution
      const minX = -59.5 + halfW
      const maxX = 59.5 - halfW
      const minZ = -55.5 + halfW
      const maxZ = 55.5 - halfW

      let nextX = pos.x + displacement.x
      if (nextX < minX) {
        nextX = minX
        collidedX = true
      } else if (nextX > maxX) {
        nextX = maxX
        collidedX = true
      }
      pos.x = nextX

      let nextZ = pos.z + displacement.z
      if (nextZ < minZ) {
        nextZ = minZ
        collidedZ = true
      } else if (nextZ > maxZ) {
        nextZ = maxZ
        collidedZ = true
      }
      pos.z = nextZ

      return {
        position: pos,
        onGround,
        collidedX,
        collidedZ
      }
    },

    raycast(origin, direction, maxDist = 1000) {
      const ray = new THREE.Ray(origin, direction.clone().normalize())
      let closest = null
      let closestDist = maxDist

      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i]
        const hit = ray.intersectBox(box, hitPointHelper)
        if (hit) {
          const d = origin.distanceTo(hitPointHelper)
          if (d < closestDist) {
            closestDist = d
            closest = {
              point: hitPointHelper.clone(),
              distance: d,
              normal: new THREE.Vector3(0, 1, 0)
            }
          }
        }
      }
      return closest
    }
  }

  // 4. Safe Tactical Spawn Points
  // Primary player spawn at (0, 0.98, 48) facing -z. Eye height will be 1.7.
  const spawnPoints = [
    new THREE.Vector3(0, 0.98, 48),
    new THREE.Vector3(-15, 0.98, 30),
    new THREE.Vector3(15, 0.98, 30),
    new THREE.Vector3(-25, 0.98, 0),
    new THREE.Vector3(25, 0.98, 0),
    new THREE.Vector3(0, 0.98, -25),
    new THREE.Vector3(-20, 0.98, -40),
    new THREE.Vector3(20, 0.98, -40),
    new THREE.Vector3(0, 0.98, -48)
  ]

  return {
    group,
    collision,
    spawnPoints,
    getSpawnPoints() {
      return spawnPoints
    },
    getColliders() {
      return boxes
    },
    getZones() {
      return []
    },
    update(time, focusPos) {},
    destroy() {
      scene.remove(group)
    }
  }
}
