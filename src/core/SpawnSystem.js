import * as THREE from 'three'

/**
 * Calculates a tactical safe spawn point that maximizes distance from all active enemies/players.
 * Employs Max-Min distance scoring to guarantee players and bots spawn far away from each other.
 *
 * @param {THREE.Vector3[]} spawnPoints - Candidate spawn points
 * @param {Array<{position: THREE.Vector3, isDead?: boolean}>} activeEntities - Players and living bots
 * @param {number} minDistance - Target safe distance threshold (meters)
 * @returns {THREE.Vector3}
 */
export function getSafeSpawnPoint(spawnPoints, activeEntities = [], minDistance = 18) {
  if (!spawnPoints || spawnPoints.length === 0) {
    return new THREE.Vector3(0, 0.9, 0)
  }

  // Filter for valid active entities with a position
  const living = (activeEntities || []).filter(e => e && e.position && !e.isDead)

  if (living.length === 0) {
    const idx = Math.floor(Math.random() * spawnPoints.length)
    return spawnPoints[idx].clone()
  }

  // Score each candidate spawn point by its distance to the nearest living enemy
  const scored = spawnPoints.map(sp => {
    let minDist = Infinity
    for (const ent of living) {
      const d = sp.distanceTo(ent.position)
      if (d < minDist) minDist = d
    }
    return { point: sp, minDist }
  })

  // Sort descending: highest minimum distance first (furthest from any threat)
  scored.sort((a, b) => b.minDist - a.minDist)

  // Pick randomly among the safest candidates (minDist >= minDistance, or top 3)
  const safePool = scored.filter(s => s.minDist >= minDistance)
  const pool = (safePool.length > 0 ? safePool : scored.slice(0, Math.min(3, scored.length)))

  const chosen = pool[Math.floor(Math.random() * pool.length)].point.clone()

  // Small deterministic safe jitter (±0.6m max) to prevent exact overlaps without penetrating walls
  chosen.x += (Math.random() - 0.5) * 1.0
  chosen.z += (Math.random() - 0.5) * 1.0
  return chosen
}
