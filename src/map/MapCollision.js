import * as THREE from 'three'

const _v3 = new THREE.Vector3()

/**
 * MapCollision — Robust AABB collision resolution for FPS movement
 */
export class MapCollision {
  constructor(colliders) {
    this.colliders = colliders || []
  }

  update(colliders) {
    this.colliders = colliders || []
  }

  /**
   * Resolves movement displacement against solid colliders.
   * Uses separate axis stepping for smooth wall sliding and reliable ground landing.
   */
  resolve(position, displacement, halfW = 0.4, halfH = 0.9, allowGlide = true) {
    let onGround = false
    let collidedX = false
    let collidedZ = false
    const pos = position.clone()

    // ── 1. Vertical resolution (Y axis) ──────────────────────
    const nextY = pos.y + displacement.y
    const yBox = new THREE.Box3(
      new THREE.Vector3(pos.x - halfW, nextY - halfH, pos.z - halfW),
      new THREE.Vector3(pos.x + halfW, nextY + halfH, pos.z + halfW)
    )

    let collidedY = false
    for (const { box } of this.colliders) {
      if (!yBox.intersectsBox(box)) continue

      if (displacement.y < 0) {
        // Falling down onto a surface
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

    // Ground clamp: if below ground level (y < halfH)
    if (pos.y < halfH) {
      pos.y = halfH
      displacement.y = 0
      onGround = true
    }

    const eps = 0.05

    // ── 2. Horizontal resolution (X axis) ────────────────────
    if (displacement.x !== 0) {
      const nextX = pos.x + displacement.x

      for (const { box } of this.colliders) {
        // Must genuinely overlap in Y and Z to collide with an X face
        if (pos.y + halfH - eps <= box.min.y || pos.y - halfH + eps >= box.max.y) continue
        if (pos.z + halfW - eps <= box.min.z || pos.z - halfW + eps >= box.max.z) continue

        // Moving right (+X) into the left (min.x) face
        if (displacement.x > 0 && pos.x + halfW <= box.min.x + eps && nextX + halfW >= box.min.x) {
          pos.x = box.min.x - halfW
          displacement.x = 0
          collidedX = true
          break
        }
        // Moving left (-X) into the right (max.x) face
        else if (displacement.x < 0 && pos.x - halfW >= box.max.x - eps && nextX - halfW <= box.max.x) {
          pos.x = box.max.x + halfW
          displacement.x = 0
          collidedX = true
          break
        }
      }
      if (!collidedX) {
        pos.x = nextX
      }
    }

    // ── 3. Horizontal resolution (Z axis) ────────────────────
    if (displacement.z !== 0) {
      const nextZ = pos.z + displacement.z

      for (const { box } of this.colliders) {
        // Must genuinely overlap in X and Y to collide with a Z face
        if (pos.y + halfH - eps <= box.min.y || pos.y - halfH + eps >= box.max.y) continue
        if (pos.x + halfW - eps <= box.min.x || pos.x - halfW + eps >= box.max.x) continue

        // Moving +Z into the north (min.z) face
        if (displacement.z > 0 && pos.z + halfW <= box.min.z + eps && nextZ + halfW >= box.min.z) {
          pos.z = box.min.z - halfW
          displacement.z = 0
          collidedZ = true
          break
        }
        // Moving -Z into the south (max.z) face
        else if (displacement.z < 0 && pos.z - halfW >= box.max.z - eps && nextZ - halfW <= box.max.z) {
          pos.z = box.max.z + halfW
          displacement.z = 0
          collidedZ = true
          break
        }
      }
      if (!collidedZ) {
        pos.z = nextZ
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
