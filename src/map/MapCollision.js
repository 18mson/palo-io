import * as THREE from 'three'

const _v3 = new THREE.Vector3()

/**
 * MapCollision — Robust AABB collision resolution for FPS movement
 */
export class MapCollision {
  constructor(colliders = [], ramps = []) {
    this.colliders = colliders || []
    this.ramps = ramps || []
  }

  update(colliders, ramps = []) {
    this.colliders = colliders || []
    this.ramps = ramps || []
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

    // ── 1. Vertical resolution (Y axis) ──────────────────────
    if (!onRamp) {
      const nextY = pos.y + displacement.y
      const yBox = new THREE.Box3(
        new THREE.Vector3(pos.x - halfW, nextY - halfH, pos.z - halfW),
        new THREE.Vector3(pos.x + halfW, nextY + halfH, pos.z + halfW)
      )

      let collidedY = false
      for (const item of this.colliders) {
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

    const eps = 0.05
    const MAX_STEP_HEIGHT = 0.40 // Valorant/CS standard step-up allowance (curbs, seams, floor level transitions)
    const MAX_STEP_DOWN   = 0.35 // Step-down ground snapping to prevent airborne stutter over seams

    // ── 2. Horizontal resolution (X axis) with Auto Step-Up ────────────────────
    if (displacement.x !== 0) {
      const nextX = pos.x + displacement.x

      for (const item of this.colliders) {
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

            for (const other of this.colliders) {
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

      for (const item of this.colliders) {
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

            for (const other of this.colliders) {
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

      for (const item of this.colliders) {
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
   * Raycast against colliders — returns { point, distance } or null
   */
  raycast(origin, direction, maxDist = 1000) {
    const ray = new THREE.Ray(origin, direction.clone().normalize())
    let closest = null
    let closestDist = maxDist

    for (const { box } of this.colliders) {
      const dist = ray.intersectBox(box, _v3)
      if (dist !== null) {
        const d = origin.distanceTo(_v3)
        if (d < closestDist) {
          closestDist = d
          closest = { point: _v3.clone(), distance: d }
        }
      }
    }
    return closest
  }
}
