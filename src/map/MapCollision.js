import * as THREE from 'three'

const _v3 = new THREE.Vector3()

/**
 * MapCollision — Robust AABB collision resolution for FPS movement
 */
export class MapCollision {
  constructor(colliders = [], ramps = [], cellSize = 8, ladders = []) {
    this.cellSize = cellSize
    this.colliders = colliders || []
    this.ramps = ramps || []
    this.ladders = ladders || []
    this.grid = new Map()
    this._queryTag = 0
    this._rayTag = 0
    this._candidates = []
    this._buildSpatialHash()
    this._runBenchmark()
  }

  getLadders() {
    return this.ladders
  }

  update(colliders, ramps = [], ladders = []) {
    this.colliders = colliders || []
    this.ramps = ramps || []
    this.ladders = ladders || []
    this._buildSpatialHash()
    this._runBenchmark()
  }

  _buildSpatialHash() {
    this.grid.clear()
    const S = this.cellSize

    for (let i = 0; i < this.colliders.length; i++) {
      const item = this.colliders[i]
      if (item.isRamp) continue // Continuous ramps are resolved in step 0

      const box = item.box
      const minCX = Math.floor(box.min.x / S)
      const maxCX = Math.floor(box.max.x / S)
      const minCY = Math.floor(box.min.y / S)
      const maxCY = Math.floor(box.max.y / S)
      const minCZ = Math.floor(box.min.z / S)
      const maxCZ = Math.floor(box.max.z / S)

      for (let cx = minCX; cx <= maxCX; cx++) {
        for (let cy = minCY; cy <= maxCY; cy++) {
          for (let cz = minCZ; cz <= maxCZ; cz++) {
            const k = `${cx},${cy},${cz}`
            let cell = this.grid.get(k)
            if (!cell) {
              cell = []
              this.grid.set(k, cell)
            }
            cell.push(item)
          }
        }
      }
    }
  }

  _getNearbyColliders(minX, maxX, minY, maxY, minZ, maxZ) {
    this._queryTag++
    const tag = this._queryTag
    const S = this.cellSize
    const minCX = Math.floor(minX / S)
    const maxCX = Math.floor(maxX / S)
    const minCY = Math.floor(minY / S)
    const maxCY = Math.floor(maxY / S)
    const minCZ = Math.floor(minZ / S)
    const maxCZ = Math.floor(maxZ / S)

    const list = this._candidates
    list.length = 0

    for (let cx = minCX; cx <= maxCX; cx++) {
      for (let cy = minCY; cy <= maxCY; cy++) {
        for (let cz = minCZ; cz <= maxCZ; cz++) {
          const cell = this.grid.get(`${cx},${cy},${cz}`)
          if (cell) {
            for (let i = 0; i < cell.length; i++) {
              const item = cell[i]
              if (item._queryTag === tag) continue
              item._queryTag = tag
              list.push(item)
            }
          }
        }
      }
    }
    return list
  }

  _runBenchmark() {
    if (this.colliders.length === 0) return
    const N = 1000
    const testPos = new THREE.Vector3(0, 1.6, 0)
    const testDisp = new THREE.Vector3(0.08, -0.05, 0.04)
    const start = performance.now()
    for (let i = 0; i < N; i++) {
      testPos.x = (i % 60) - 30
      testPos.z = ((i * 7) % 60) - 30
      this.resolve(testPos, testDisp)
    }
    const elapsed = performance.now() - start
    const msPerResolve = elapsed / N
    console.log(`[MapCollision SpatialHash] Benchmark: ${msPerResolve.toFixed(5)} ms per resolve (${N} calls in ${elapsed.toFixed(2)} ms | ${this.colliders.length} colliders indexed into ${this.grid.size} cells of size ${this.cellSize} units)`)
  }

  /**
   * Resolves movement displacement against solid colliders and continuous ramps.
   * Uses separate axis stepping for smooth wall sliding and reliable ground landing.
   */
  resolve(position, displacement, halfW = 0.4, halfH = 0.9, allowGlide = true) {
    let onGround = false
    let collidedX = false
    let collidedZ = false
    const pos = position.clone()

    // ── 0. Continuous Incline / Decline Ramp Check (Tanjakan & Turunan) ──
    let onRamp = false
    for (const ramp of this.ramps) {
      if (pos.x + halfW >= ramp.minX && pos.x - halfW <= ramp.maxX &&
          pos.z + halfW >= ramp.minZ && pos.z - halfW <= ramp.maxZ) {
        
        let t
        if (ramp.axis === 'z') {
          t = THREE.MathUtils.clamp((pos.z - ramp.minZ) / (ramp.maxZ - ramp.minZ), 0, 1)
        } else {
          t = THREE.MathUtils.clamp((pos.x - ramp.minX) / (ramp.maxX - ramp.minX), 0, 1)
        }
        const surfaceY = THREE.MathUtils.lerp(ramp.startY, ramp.endY, t)

        // If player's feet are within step/ground height of the ramp surface
        if (pos.y - halfH >= surfaceY - 0.45 && pos.y - halfH <= surfaceY + 0.65) {
          pos.y = surfaceY + halfH
          displacement.y = 0
          onGround = true
          onRamp = true
          break
        }
      }
    }

    const eps = 0.05
    const MAX_STEP_HEIGHT = 0.40 // Valorant/CS standard step-up allowance (curbs, seams, floor level transitions)
    const MAX_STEP_DOWN   = 0.35 // Step-down ground snapping to prevent airborne stutter over seams

    // ── Spatial Hash Candidate Query (Only test nearby colliders) ──
    const qMinX = Math.min(pos.x, pos.x + displacement.x) - halfW - 0.5
    const qMaxX = Math.max(pos.x, pos.x + displacement.x) + halfW + 0.5
    const qMinY = Math.min(pos.y, pos.y + displacement.y) - halfH - MAX_STEP_DOWN - 0.5
    const qMaxY = Math.max(pos.y, pos.y + displacement.y) + halfH + MAX_STEP_HEIGHT + 0.5
    const qMinZ = Math.min(pos.z, pos.z + displacement.z) - halfW - 0.5
    const qMaxZ = Math.max(pos.z, pos.z + displacement.z) + halfW + 0.5

    const nearby = this._getNearbyColliders(qMinX, qMaxX, qMinY, qMaxY, qMinZ, qMaxZ)

    // ── 1. Vertical resolution (Y axis) ──────────────────────
    if (!onRamp) {
      const nextY = pos.y + displacement.y
      const yBox = new THREE.Box3(
        new THREE.Vector3(pos.x - halfW, nextY - halfH, pos.z - halfW),
        new THREE.Vector3(pos.x + halfW, nextY + halfH, pos.z + halfW)
      )

      let collidedY = false
      for (let i = 0; i < nearby.length; i++) {
        const item = nearby[i]
        if (item.isRamp) continue
        const { box } = item
        if (!yBox.intersectsBox(box)) continue

        if (displacement.y <= 0) {
          // Falling down or resting onto a surface
          if (pos.y - halfH >= box.max.y - 0.25) {
            pos.y = box.max.y + halfH
            displacement.y = 0
            onGround = true
            collidedY = true
            break
          }
        } else if (displacement.y > 0) {
          // Hitting ceiling
          if (pos.y + halfH <= box.min.y + 0.25) {
            pos.y = box.min.y - halfH
            displacement.y = 0
            collidedY = true
            break
          }
        }
      }
      if (!collidedY) {
        pos.y = nextY
      }

      // Ground clamp: if at or below ground level (y <= halfH + 0.001)
      if (pos.y <= halfH + 0.001) {
        pos.y = halfH
        displacement.y = 0
        onGround = true
      }
    }

    // ── 2. Horizontal resolution (X axis) with Auto Step-Up ────────────────────
    if (displacement.x !== 0) {
      const nextX = pos.x + displacement.x

      for (let i = 0; i < nearby.length; i++) {
        const item = nearby[i]
        if (item.isRamp) continue
        const { box } = item

        // Must genuinely overlap in Z to collide with an X face
        if (pos.z + halfW - eps <= box.min.z || pos.z - halfW + eps >= box.max.z) continue

        const hittingMinX = displacement.x > 0 && pos.x + halfW <= box.min.x + eps && nextX + halfW >= box.min.x
        const hittingMaxX = displacement.x < 0 && pos.x - halfW >= box.max.x - eps && nextX - halfW <= box.max.x

        if (hittingMinX || hittingMaxX) {
          const feetY = pos.y - halfH
          const stepUpDist = box.max.y - feetY

          // Auto Step-Up: If obstacle is low enough (curb, floor seam, small riser) and player has headroom
          if (stepUpDist > 0.005 && stepUpDist <= MAX_STEP_HEIGHT) {
            const targetFootY = box.max.y
            let hasHeadroom = true
            const testBox = new THREE.Box3(
              new THREE.Vector3(nextX - halfW, targetFootY, pos.z - halfW),
              new THREE.Vector3(nextX + halfW, targetFootY + 2 * halfH - 0.05, pos.z + halfW)
            )

            for (let j = 0; j < nearby.length; j++) {
              const other = nearby[j]
              if (other === item || other.isRamp) continue
              if (testBox.intersectsBox(other.box)) {
                if (other.box.max.y > targetFootY + 0.1) {
                  hasHeadroom = false
                  break
                }
              }
            }

            if (hasHeadroom) {
              pos.y = targetFootY + halfH
              displacement.y = 0
              onGround = true
              continue // Seamlessly step onto the higher floor without stopping X movement!
            }
          }

          // Solid vertical wall collision: stop X displacement if overlapping in Y
          if (pos.y + halfH - eps > box.min.y && pos.y - halfH + eps < box.max.y) {
            if (hittingMinX) {
              pos.x = box.min.x - halfW
              displacement.x = 0
              collidedX = true
              break
            } else if (hittingMaxX) {
              pos.x = box.max.x + halfW
              displacement.x = 0
              collidedX = true
              break
            }
          }
        }
      }
      if (!collidedX) {
        pos.x = nextX
      }
    }

    // ── 3. Horizontal resolution (Z axis) with Auto Step-Up ────────────────────
    if (displacement.z !== 0) {
      const nextZ = pos.z + displacement.z

      for (let i = 0; i < nearby.length; i++) {
        const item = nearby[i]
        if (item.isRamp) continue
        const { box } = item

        // Must genuinely overlap in X to collide with a Z face
        if (pos.x + halfW - eps <= box.min.x || pos.x - halfW + eps >= box.max.x) continue

        const hittingMinZ = displacement.z > 0 && pos.z + halfW <= box.min.z + eps && nextZ + halfW >= box.min.z
        const hittingMaxZ = displacement.z < 0 && pos.z - halfW >= box.max.z - eps && nextZ - halfW <= box.max.z

        if (hittingMinZ || hittingMaxZ) {
          const feetY = pos.y - halfH
          const stepUpDist = box.max.y - feetY

          // Auto Step-Up: If obstacle is low enough and player has headroom
          if (stepUpDist > 0.005 && stepUpDist <= MAX_STEP_HEIGHT) {
            const targetFootY = box.max.y
            let hasHeadroom = true
            const testBox = new THREE.Box3(
              new THREE.Vector3(pos.x - halfW, targetFootY, nextZ - halfW),
              new THREE.Vector3(pos.x + halfW, targetFootY + 2 * halfH - 0.05, nextZ + halfW)
            )

            for (let j = 0; j < nearby.length; j++) {
              const other = nearby[j]
              if (other === item || other.isRamp) continue
              if (testBox.intersectsBox(other.box)) {
                if (other.box.max.y > targetFootY + 0.1) {
                  hasHeadroom = false
                  break
                }
              }
            }

            if (hasHeadroom) {
              pos.y = targetFootY + halfH
              displacement.y = 0
              onGround = true
              continue // Seamlessly step onto the higher floor without stopping Z movement!
            }
          }

          // Solid vertical wall collision: stop Z displacement if overlapping in Y
          if (pos.y + halfH - eps > box.min.y && pos.y - halfH + eps < box.max.y) {
            if (hittingMinZ) {
              pos.z = box.min.z - halfW
              displacement.z = 0
              collidedZ = true
              break
            } else if (hittingMaxZ) {
              pos.z = box.max.z + halfW
              displacement.z = 0
              collidedZ = true
              break
            }
          }
        }
      }
      if (!collidedZ) {
        pos.z = nextZ
      }
    }

    // ── 3b. Step-Down Snapping: keep grounded across minor drops and seams ──────
    if (onGround && displacement.y <= 0 && !onRamp) {
      let highestGround = 0 // Ground floor level y=0 default
      const probeBox = new THREE.Box3(
        new THREE.Vector3(pos.x - halfW * 0.7, pos.y - halfH - MAX_STEP_DOWN, pos.z - halfW * 0.7),
        new THREE.Vector3(pos.x + halfW * 0.7, pos.y - halfH + 0.05, pos.z + halfW * 0.7)
      )

      for (let i = 0; i < nearby.length; i++) {
        const item = nearby[i]
        if (item.isRamp) continue
        if (probeBox.intersectsBox(item.box)) {
          if (item.box.max.y <= pos.y - halfH + 0.05 && item.box.max.y > highestGround) {
            highestGround = item.box.max.y
          }
        }
      }

      if ((pos.y - halfH) - highestGround <= MAX_STEP_DOWN) {
        pos.y = highestGround + halfH
        displacement.y = 0
        onGround = true
      }
    }

    // ── 4. Prevent wall auto-glide when approaching wall without strafe ──
    if (!allowGlide) {
      if (collidedX) {
        pos.z = position.z
        displacement.z = 0
      }
      if (collidedZ) {
        pos.x = position.x
        displacement.x = 0
      }
    }

    return { position: pos, displacement, onGround, collidedX, collidedZ }
  }

  /**
   * Raycast against colliders accelerated by 3D Fast Voxel Traversal on the Spatial Hash
   * Returns { point, distance } or null
   */
  raycast(origin, direction, maxDist = 1000) {
    const ray = new THREE.Ray(origin, direction.clone().normalize())
    let closest = null
    let closestDist = maxDist
    this._rayTag++
    const tag = this._rayTag
    const S = this.cellSize
    const dir = ray.direction

    let cx = Math.floor(origin.x / S)
    let cy = Math.floor(origin.y / S)
    let cz = Math.floor(origin.z / S)

    const stepX = dir.x > 0 ? 1 : (dir.x < 0 ? -1 : 0)
    const stepY = dir.y > 0 ? 1 : (dir.y < 0 ? -1 : 0)
    const stepZ = dir.z > 0 ? 1 : (dir.z < 0 ? -1 : 0)

    let tMaxX = dir.x !== 0 ? ((dir.x > 0 ? (cx + 1) * S : cx * S) - origin.x) / dir.x : Infinity
    let tMaxY = dir.y !== 0 ? ((dir.y > 0 ? (cy + 1) * S : cy * S) - origin.y) / dir.y : Infinity
    let tMaxZ = dir.z !== 0 ? ((dir.z > 0 ? (cz + 1) * S : cz * S) - origin.z) / dir.z : Infinity

    const tDeltaX = dir.x !== 0 ? Math.abs(S / dir.x) : Infinity
    const tDeltaY = dir.y !== 0 ? Math.abs(S / dir.y) : Infinity
    const tDeltaZ = dir.z !== 0 ? Math.abs(S / dir.z) : Infinity

    const maxIters = Math.min(250, Math.ceil(maxDist / S) * 3 + 10)
    for (let iter = 0; iter < maxIters; iter++) {
      const cell = this.grid.get(`${cx},${cy},${cz}`)
      if (cell) {
        for (let i = 0; i < cell.length; i++) {
          const item = cell[i]
          if (item._rayTag === tag) continue
          item._rayTag = tag

          const dist = ray.intersectBox(item.box, _v3)
          if (dist !== null) {
            const d = origin.distanceTo(_v3)
            if (d < closestDist) {
              closestDist = d
              closest = { point: _v3.clone(), distance: d }
            }
          }
        }
      }

      const nextT = Math.min(tMaxX, tMaxY, tMaxZ)
      if (closestDist <= nextT || nextT > maxDist) break

      if (tMaxX < tMaxY) {
        if (tMaxX < tMaxZ) {
          cx += stepX; tMaxX += tDeltaX
        } else {
          cz += stepZ; tMaxZ += tDeltaZ
        }
      } else {
        if (tMaxY < tMaxZ) {
          cy += stepY; tMaxY += tDeltaY
        } else {
          cz += stepZ; tMaxZ += tDeltaZ
        }
      }
    }
    return closest
  }
}
