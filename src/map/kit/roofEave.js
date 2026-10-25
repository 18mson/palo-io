/**
 * src/map/kit/roofEave.js
 * Generates an array of stepped blocks forming layered architectural roof eaves
 * (stepped pagoda / Venetian roof tiles, NOT a single flat box slab).
 */

export function roofEave({
  wall,
  x,
  y,
  z,
  length,
  depth = 2.0,
  steps = 3,
  axis,
  facing = 1, // +1 or -1 along orthogonal axis
  stepHeight = 0.4,
  roofType = 'asian_roof',
  trimType = 'pagoda_wood',
  id,
  zone
} = {}) {
  // Derive geometry from parent wall if provided
  const target = wall || { x, y, z, length, depth, axis, id, zone }
  const wx = target.x ?? (target.minX !== undefined ? (target.minX + target.maxX) / 2 : 0)
  const wy = target.y ?? (target.minY !== undefined ? (target.minY + target.maxY) / 2 : 0)
  const wz = target.z ?? (target.minZ !== undefined ? (target.minZ + target.maxZ) / 2 : 0)
  const ww = target.w ?? (target.minX !== undefined ? (target.maxX - target.minX) : 1)
  const wh = target.h ?? (target.minY !== undefined ? (target.maxY - target.minY) : 1)
  const wd = target.d ?? (target.minZ !== undefined ? (target.maxZ - target.minZ) : 1)

  const derivedAxis = axis || target.axis || (ww >= wd ? 'x' : 'z')
  const wallTop = wy + wh / 2
  const derivedY = y !== undefined ? (wall ? (Math.abs(y) < wh ? wallTop + y : y) : y) : wallTop
  const derivedX = x !== undefined ? x : wx
  const derivedZ = z !== undefined ? z : wz
  const derivedLen = length || (derivedAxis === 'x' ? ww : wd)
  const derivedDepth = depth || ((derivedAxis === 'x' ? wd : ww) + 1.0)
  const baseId = id || target.id || 'roof_eave'
  const targetZone = zone || target.zone

  const blocks = []

  for (let s = 0; s < steps; s++) {
    // Each step extends upward in Y and steps inward slightly
    // Step 0 is the lowermost, widest overhang (fascia/soffit support)
    // Step s > 0 are upper roof tile courses
    const fraction = 1 - (s * 0.2)
    const tierDepth = Math.max(0.5, derivedDepth * fraction)
    const tierY = derivedY + s * stepHeight + stepHeight / 2
    const tierLen = derivedLen + (steps - 1 - s) * 0.4
    const matType = s === 0 ? trimType : roofType

    if (derivedAxis === 'x') {
      const tierZ = derivedZ + facing * (tierDepth / 4)
      blocks.push({
        id: `${baseId}_step_${s}`,
        zone: targetZone,
        x: derivedX,
        y: tierY,
        z: tierZ,
        w: tierLen,
        h: stepHeight,
        d: tierDepth,
        type: matType
      })
    } else {
      // axis === 'z'
      const tierX = derivedX + facing * (tierDepth / 4)
      blocks.push({
        id: `${baseId}_step_${s}`,
        zone: targetZone,
        x: tierX,
        y: tierY,
        z: derivedZ,
        w: tierDepth,
        h: stepHeight,
        d: tierLen,
        type: matType
      })
    }
  }

  return blocks
}
