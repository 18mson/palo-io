import * as THREE from 'three'

const _v3 = new THREE.Vector3()
const _box = new THREE.Box3()

/**
 * 8-meter Spatial Hash Collision System for Bind map.
 * Provides robust AABB collision resolution, stair step-up (0.45m),
 * wall sliding, and raycasting for weapons and bots.
 */
export class BindCollision {
  constructor(boxes = [], cellSize = 8) {
    this.cellSize = cellSize
    this.grid = new Map()
    this.items = []
    this._queryTag = 0
    this._rayTag = 0
    this._candidates = []

    this.init(boxes)
  }

  init(boxes = []) {
    this.grid.clear()
    this.items = []

    for (let i = 0; i < boxes.length; i++) {
      const b = boxes[i]
      const box3 = new THREE.Box3(
        new THREE.Vector3(b.minX, b.bottomY, b.minZ),
        new THREE.Vector3(b.maxX, b.topY, b.maxZ)
      )
      const item = {
        box: box3,
        type: b.type,
        id: b.id,
        _tag: 0,
        _rayTag: 0
      }
      this.items.push(item)

      // Insert into spatial hash cells
      const minCX = Math.floor(box3.min.x / this.cellSize)
      const maxCX = Math.floor(box3.max.x / this.cellSize)
      const minCY = Math.floor(box3.min.y / this.cellSize)
      const maxCY = Math.floor(box3.max.y / this.cellSize)
      const minCZ = Math.floor(box3.min.z / this.cellSize)
      const maxCZ = Math.floor(box3.max.z / this.cellSize)

      for (let cx = minCX; cx <= maxCX; cx++) {
        for (let cy = minCY; cy <= maxCY; cy++) {
          for (let cz = minCZ; cz <= maxCZ; cz++) {
            const key = `${cx},${cy},${cz}`
            let cell = this.grid.get(key)
            if (!cell) {
              cell = []
              this.grid.set(key, cell)
            }
            cell.push(item)
          }
        }
      }
    }
  }

  getLadders() {
    return []
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
          if (!cell) continue
          for (let i = 0; i < cell.length; i++) {
            const item = cell[i]
            if (item._tag !== tag) {
              item._tag = tag
              list.push(item)
            }
          }
        }
      }
    }
    return list
  }

  resolve(position, displacement, halfW = 0.4, halfH = 0.9, allowGlide = true) {
    let onGround = false
    let collidedX = false
    let collidedZ = false

    const pos = position.clone()
    const MAX_STEP_UP = 0.45 // Step-up allowance for stairs and small curbs
    const eps = 0.001

    // Spatial hash query bounds
    const qMinX = Math.min(pos.x, pos.x + displacement.x) - halfW - 1.0
    const qMaxX = Math.max(pos.x, pos.x + displacement.x) + halfW + 1.0
    const qMinY = Math.min(pos.y, pos.y + displacement.y) - halfH - 1.0
    const qMaxY = Math.max(pos.y, pos.y + displacement.y) + halfH + MAX_STEP_UP + 1.0
    const qMinZ = Math.min(pos.z, pos.z + displacement.z) - halfW - 1.0
    const qMaxZ = Math.max(pos.z, pos.z + displacement.z) + halfW + 1.0

    const colliders = this._getNearbyColliders(qMinX, qMaxX, qMinY, qMaxY, qMinZ, qMaxZ)

    // ── 1. Horizontal X Movement & Step-Up ────────────────────────────────
    if (displacement.x !== 0) {
      let targetX = pos.x + displacement.x
      const currFeetY = pos.y - halfH

      for (let i = 0; i < colliders.length; i++) {
        const box = colliders[i].box
        // Check if overlaps in Y and Z
        const overlapY = currFeetY + eps < box.max.y && (pos.y + halfH - eps) > box.min.y
        const overlapZ = (pos.z - halfW + eps) < box.max.z && (pos.z + halfW - eps) > box.min.z

        if (overlapY && overlapZ) {
          // Check if obstacle is step-up climbable (stairs / low curbs)
          if (box.max.y <= currFeetY + MAX_STEP_UP) {
            // Can step up! Raise Y to top of step
            const stepY = box.max.y + halfH
            if (stepY > pos.y) {
              pos.y = stepY
              onGround = true
            }
          } else {
            // Solid obstacle
            if (displacement.x > 0) {
              if (targetX + halfW > box.min.x && pos.x + halfW <= box.min.x + 0.1) {
                targetX = box.min.x - halfW
                collidedX = true
              }
            } else if (displacement.x < 0) {
              if (targetX - halfW < box.max.x && pos.x - halfW >= box.max.x - 0.1) {
                targetX = box.max.x + halfW
                collidedX = true
              }
            }
          }
        }
      }
      pos.x = targetX
    }

    // ── 2. Horizontal Z Movement & Step-Up ────────────────────────────────
    if (displacement.z !== 0) {
      let targetZ = pos.z + displacement.z
      const currFeetY = pos.y - halfH

      for (let i = 0; i < colliders.length; i++) {
        const box = colliders[i].box
        const overlapY = currFeetY + eps < box.max.y && (pos.y + halfH - eps) > box.min.y
        const overlapX = (pos.x - halfW + eps) < box.max.x && (pos.x + halfW - eps) > box.min.x

        if (overlapY && overlapX) {
          if (box.max.y <= currFeetY + MAX_STEP_UP) {
            const stepY = box.max.y + halfH
            if (stepY > pos.y) {
              pos.y = stepY
              onGround = true
            }
          } else {
            if (displacement.z > 0) {
              if (targetZ + halfW > box.min.z && pos.z + halfW <= box.min.z + 0.1) {
                targetZ = box.min.z - halfW
                collidedZ = true
              }
            } else if (displacement.z < 0) {
              if (targetZ - halfW < box.max.z && pos.z - halfW >= box.max.z - 0.1) {
                targetZ = box.max.z + halfW
                collidedZ = true
              }
            }
          }
        }
      }
      pos.z = targetZ
    }

    // ── 3. Vertical Y Resolution (Gravity & Ground / Stair Landing) ────────
    let targetY = pos.y + displacement.y
    const targetFeetY = targetY - halfH
    let highestFloorUnderFeet = -Infinity

    for (let i = 0; i < colliders.length; i++) {
      const box = colliders[i].box
      const overlapX = (pos.x - halfW + 0.05) < box.max.x && (pos.x + halfW - 0.05) > box.min.x
      const overlapZ = (pos.z - halfW + 0.05) < box.max.z && (pos.z + halfW - 0.05) > box.min.z

      if (overlapX && overlapZ) {
        // Floor surface directly beneath or slightly under feet
        if (box.max.y <= pos.y - halfH + MAX_STEP_UP + 0.05) {
          if (box.max.y > highestFloorUnderFeet) {
            highestFloorUnderFeet = box.max.y
          }
        }

        // Ceiling collision when jumping upward
        if (displacement.y > 0 && targetY + halfH > box.min.y && pos.y + halfH <= box.min.y + 0.1) {
          targetY = box.min.y - halfH
        }
      }
    }

    // Fall to floor or land on ground
    if (highestFloorUnderFeet !== -Infinity && targetFeetY <= highestFloorUnderFeet + 0.05) {
      pos.y = highestFloorUnderFeet + halfH
      onGround = true
    } else {
      // Natural map base floor level is y = 0
      if (targetFeetY <= 0) {
        pos.y = halfH + 0.08 // 0.98 standing feet at 0.08 above y=0
        onGround = true
      } else {
        pos.y = targetY
        onGround = false
      }
    }

    // ── 4. Outer Map Boundary Clamping ────────────────────────────────────
    const minX = -59.5 + halfW
    const maxX = 59.5 - halfW
    const minZ = -55.5 + halfW
    const maxZ = 55.5 - halfW

    if (pos.x < minX) { pos.x = minX; collidedX = true }
    if (pos.x > maxX) { pos.x = maxX; collidedX = true }
    if (pos.z < minZ) { pos.z = minZ; collidedZ = true }
    if (pos.z > maxZ) { pos.z = maxZ; collidedZ = true }

    return {
      position: pos,
      onGround,
      collidedX,
      collidedZ
    }
  }

  raycast(origin, direction, maxDist = 1000) {
    const ray = new THREE.Ray(origin, direction.clone().normalize())
    let closest = null
    let closestDist = maxDist
    const hitPoint = new THREE.Vector3()

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

          const dist = ray.intersectBox(item.box, hitPoint)
          if (dist !== null) {
            const d = origin.distanceTo(hitPoint)
            if (d < closestDist) {
              closestDist = d
              // Determine hit normal from face
              const normal = new THREE.Vector3(0, 1, 0)
              const eps = 0.01
              if (Math.abs(hitPoint.x - item.box.min.x) < eps) normal.set(-1, 0, 0)
              else if (Math.abs(hitPoint.x - item.box.max.x) < eps) normal.set(1, 0, 0)
              else if (Math.abs(hitPoint.z - item.box.min.z) < eps) normal.set(0, 0, -1)
              else if (Math.abs(hitPoint.z - item.box.max.z) < eps) normal.set(0, 0, 1)
              else if (Math.abs(hitPoint.y - item.box.max.y) < eps) normal.set(0, 1, 0)
              else if (Math.abs(hitPoint.y - item.box.min.y) < eps) normal.set(0, -1, 0)

              closest = {
                point: hitPoint.clone(),
                normal,
                distance: d
              }
            }
          }
        }
      }

      // If we found a hit closer than current cell boundary, stop
      const currentCellMinDist = Math.min(tMaxX, tMaxY, tMaxZ)
      if (closest && closestDist < currentCellMinDist) {
        break
      }

      // Step to next 3D grid cell
      if (tMaxX < tMaxY) {
        if (tMaxX < tMaxZ) {
          cx += stepX
          tMaxX += tDeltaX
        } else {
          cz += stepZ
          tMaxZ += tDeltaZ
        }
      } else {
        if (tMaxY < tMaxZ) {
          cy += stepY
          tMaxY += tDeltaY
        } else {
          cz += stepZ
          tMaxZ += tDeltaZ
        }
      }
    }

    return closest
  }
}
