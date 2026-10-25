/**
 * src/map/kit/awning.js
 * Generates an array of blocks forming a stepped, sloping fabric market awning with support struts.
 */

const round01 = v => Math.round(v * 10) / 10

export function awning({
  wall,
  x,
  y,
  z,
  width,
  depth = 1.5,
  axis,
  facing = 1,
  steps = 3,
  awningType = 'awning',
  strutType = 'pagoda_wood',
  id,
  zone
} = {}) {
  // Derive geometry from parent wall if provided
  const target = wall || { x, y, z, width, depth, axis, facing, id, zone }
  const wx = target.x ?? (target.minX !== undefined ? (target.minX + target.maxX) / 2 : 0)
  const wy = target.y ?? (target.minY !== undefined ? (target.minY + target.maxY) / 2 : 0)
  const wz = target.z ?? (target.minZ !== undefined ? (target.minZ + target.maxZ) / 2 : 0)
  const ww = target.w ?? (target.minX !== undefined ? (target.maxX - target.minX) : 1)
  const wh = target.h ?? (target.minY !== undefined ? (target.maxY - target.minY) : 1)
  const wd = target.d ?? (target.minZ !== undefined ? (target.maxZ - target.minZ) : 1)

  const derivedAxis = axis || target.axis || (ww >= wd ? 'x' : 'z')
  const derivedFacing = facing ?? target.facing ?? 1
  const derivedWidth = width || Math.min(derivedAxis === 'x' ? ww : wd, 3.0)
  const derivedY = y !== undefined ? (wall ? (Math.abs(y) < wh ? wy + y : y) : y) : (wy + (wh >= 4.0 ? wh * 0.15 : 0.0))
  const baseId = id || target.id || 'awning'
  const targetZone = zone || target.zone

  const blocks = []
  const stepDepth = round01(depth / steps)
  const stepHeight = 0.2

  // 1. Stepped sloped canvas canopy courses (attached to wall face)
  for (let s = 0; s < steps; s++) {
    const tierY = round01(derivedY - s * stepHeight)
    const tierOffset = round01((s + 0.5) * stepDepth - 0.05)

    if (derivedAxis === 'x') {
      const wallFaceZ = wz + derivedFacing * (wd / 2)
      const baseZ = z !== undefined && !wall ? z : wallFaceZ
      const tierZ = round01(baseZ + derivedFacing * tierOffset)
      const tierX = x !== undefined ? x : wx
      blocks.push({
        id: `${baseId}_canopy_${s}`,
        zone: targetZone,
        x: round01(tierX),
        y: tierY,
        z: tierZ,
        w: round01(derivedWidth),
        h: stepHeight,
        d: stepDepth,
        type: awningType,
        decor: true,
        noCollision: true
      })
    } else {
      // axis === 'z'
      const wallFaceX = wx + derivedFacing * (ww / 2)
      const baseX = x !== undefined && !wall ? x : wallFaceX
      const tierX = round01(baseX + derivedFacing * tierOffset)
      const tierZ = z !== undefined ? z : wz
      blocks.push({
        id: `${baseId}_canopy_${s}`,
        zone: targetZone,
        x: tierX,
        y: tierY,
        z: round01(tierZ),
        w: stepDepth,
        h: stepHeight,
        d: round01(derivedWidth),
        type: awningType,
        decor: true,
        noCollision: true
      })
    }
  }

  // 2. Underneath side struts / mounting brackets
  const strutW = 0.1
  const strutH = 0.6
  const strutD = round01(depth * 0.75)
  const strutY = round01(derivedY - 0.4)
  const halfSpan = round01(Math.max(0.4, derivedWidth / 2 - 0.2))

  if (derivedAxis === 'x') {
    const wallFaceZ = wz + derivedFacing * (wd / 2)
    const baseZ = z !== undefined && !wall ? z : wallFaceZ
    const strutZ = round01(baseZ + derivedFacing * (strutD / 2 - 0.05))
    const baseX = x !== undefined ? x : wx
    blocks.push({
      id: `${baseId}_strut_l`,
      zone: targetZone,
      x: round01(baseX - halfSpan),
      y: strutY,
      z: strutZ,
      w: strutW,
      h: strutH,
      d: strutD,
      type: strutType,
      decor: true,
      noCollision: true
    })
    blocks.push({
      id: `${baseId}_strut_r`,
      zone: targetZone,
      x: round01(baseX + halfSpan),
      y: strutY,
      z: strutZ,
      w: strutW,
      h: strutH,
      d: strutD,
      type: strutType,
      decor: true,
      noCollision: true
    })
  } else {
    // axis === 'z'
    const wallFaceX = wx + derivedFacing * (ww / 2)
    const baseX = x !== undefined && !wall ? x : wallFaceX
    const strutX = round01(baseX + derivedFacing * (strutD / 2 - 0.05))
    const baseZ = z !== undefined ? z : wz
    blocks.push({
      id: `${baseId}_strut_n`,
      zone: targetZone,
      x: strutX,
      y: strutY,
      z: round01(baseZ - halfSpan),
      w: strutD,
      h: strutH,
      d: strutW,
      type: strutType,
      decor: true,
      noCollision: true
    })
    blocks.push({
      id: `${baseId}_strut_s`,
      zone: targetZone,
      x: strutX,
      y: strutY,
      z: round01(baseZ + halfSpan),
      w: strutD,
      h: strutH,
      d: strutW,
      type: strutType,
      decor: true,
      noCollision: true
    })
  }

  return blocks
}
