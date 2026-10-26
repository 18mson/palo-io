import * as THREE from 'three'
import bindLayout from './bind.layout.json'
import { buildMapBoxes } from './boxes.js'
import { buildMapMeshes } from './meshBuilder.js'
import { BindCollision } from './collision.js'
import { TeleporterSystem } from './teleporters.js'

/**
 * Creates the Bind map ("Tide Market") gray-box map system.
 * Returns { group, collision, spawnPoints, teleporters, getSpawnPoints, getColliders, getZones, update, destroy }.
 */
export function createBindMap(scene) {
  const rootGroup = new THREE.Group()
  rootGroup.name = 'bind-map-root'

  // 1. Environment & Lighting (Phase P5b: docs/map/BIND_BLUEPRINT.md §8)
  const skyColor = new THREE.Color(0x9ec7ee)
  scene.background = skyColor
  scene.fog = new THREE.Fog(0x9ec7ee, 80, 200)

  // Hemisphere 0.6: Sky 0xe8f0f8, Ground 0x6a6a70
  const hemiLight = new THREE.HemisphereLight(0xe8f0f8, 0x6a6a70, 0.6)
  hemiLight.position.set(0, 50, 0)
  rootGroup.add(hemiLight)

  // AmbientLight 0.25: Soft global illumination fill
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.25)
  rootGroup.add(ambientLight)

  // Sun: DirectionalLight 1.1 from (-0.4, -1, -0.3) -> source offset (+32, 80, +24)
  const sun = new THREE.DirectionalLight(0xfffaf0, 1.1)
  sun.position.set(32, 80, 24)
  sun.castShadow = true
  sun.shadow.mapSize.width = 2048
  sun.shadow.mapSize.height = 2048
  sun.shadow.camera.near = 10
  sun.shadow.camera.far = 160
  // Shadows limited to a 40 m radius around player
  sun.shadow.camera.left = -40
  sun.shadow.camera.right = 40
  sun.shadow.camera.top = 40
  sun.shadow.camera.bottom = -40
  sun.shadow.bias = -0.0004
  rootGroup.add(sun)
  rootGroup.add(sun.target)

  // Fill Light 0.3: Soft cool ambient directional fill from opposite side
  const fillLight = new THREE.DirectionalLight(0xb8cce0, 0.3)
  fillLight.position.set(-32, 50, -24)
  rootGroup.add(fillLight)

  // 2. Geometry & Mesh Building
  const boxes = buildMapBoxes(bindLayout)
  const mapMeshGroup = buildMapMeshes(boxes)
  rootGroup.add(mapMeshGroup)

  scene.add(rootGroup)

  // 3. Collision
  const collision = new BindCollision(boxes.allColliders)

  // 4. Teleporters
  const teleporters = new TeleporterSystem(bindLayout.teleporters)

  // 5. Spawns
  // Attacker spawns facing north (yaw 0) at z = 48
  const attackerSpawns = (bindLayout.spawns?.points?.attacker || [
    [-8, 48], [-4, 48], [0, 48], [4, 48], [8, 48]
  ]).map(([x, z]) => new THREE.Vector3(x, 0.98, z))

  // Defender spawns facing south (yaw Math.PI) at z = -48
  const defenderSpawns = (bindLayout.spawns?.points?.defender || [
    [-8, -48], [-4, -48], [0, -48], [4, -48], [8, -48]
  ]).map(([x, z]) => new THREE.Vector3(x, 0.98, z))

  // Sort attacker spawns so (0, 0.98, 48) is the primary first spawn
  attackerSpawns.sort((a, b) => Math.abs(a.x) - Math.abs(b.x))
  defenderSpawns.sort((a, b) => Math.abs(a.x) - Math.abs(b.x))

  // Combined spawn points list for Deathmatch / FFA
  const allSpawns = [
    ...attackerSpawns,
    ...defenderSpawns,
    new THREE.Vector3(-32, 0.98, 44),  // A Lobby
    new THREE.Vector3(-52, 0.98, 30),  // A Bath
    new THREE.Vector3(-38, 0.98, -12), // A Site
    new THREE.Vector3(0, 0.98, -24),   // Market
    new THREE.Vector3(36, 0.98, 44),   // B Lobby
    new THREE.Vector3(48, 0.98, 16),   // B Long
    new THREE.Vector3(38, 0.98, -14),  // B Site
    new THREE.Vector3(20, 0.98, -16)   // B Elbow
  ]

  // Minimap zone annotations
  const zones = (bindLayout.regions || []).map(r => ({
    name: r.name,
    minX: r.rect[0],
    minZ: r.rect[1],
    maxX: r.rect[2],
    maxZ: r.rect[3]
  }))

  return {
    group: rootGroup,
    collision,
    teleporters,
    spawnPoints: allSpawns,
    attackerSpawns,
    defenderSpawns,
    boxes,
    mapMeshGroup,
    setLevelDebugMode(enabled) {
      mapMeshGroup.userData?.setLevelDebugMode?.(enabled)
    },
    getSpawnPoints(team) {
      if (team === 'attacker') return attackerSpawns
      if (team === 'defender') return defenderSpawns
      return allSpawns
    },
    getColliders() {
      return boxes.allColliders
    },
    getZones() {
      return zones
    },
    update(time, focusPos, player, bots) {
      teleporters.update(time, player, bots)
      const center = focusPos || player?.position
      if (center) {
        sun.target.position.set(center.x, 0, center.z)
        sun.position.set(center.x + 32, 80, center.z + 24)
        sun.target.updateMatrixWorld()
      }
    },
    destroy() {
      scene.remove(rootGroup)
    }
  }
}
