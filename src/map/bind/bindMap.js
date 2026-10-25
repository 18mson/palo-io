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

  // 1. Environment & Lighting
  scene.background = new THREE.Color(0x92a3b5)
  scene.fog = new THREE.Fog(0x92a3b5, 60, 180)

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444d56, 0.75)
  hemiLight.position.set(0, 50, 0)
  rootGroup.add(hemiLight)

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
  sun.shadow.bias = -0.0005
  rootGroup.add(sun)

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
    },
    destroy() {
      scene.remove(rootGroup)
    }
  }
}
