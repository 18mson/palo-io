/**
 * src/map/kit/doorFrame.js
 * Generates an array of blocks forming an architectural door frame
 * with threshold step, left/right jambs, and overhead lintel header.
 */

const round01 = v => Math.round(v * 10) / 10

export function doorFrame({
  wall,
  x,
  y,
  z,
  doorWidth = 2.0,
  doorHeight = 2.5,
  thickness = 0.2,
  depth,
  axis,
  frameType = 'pagoda_wood',
  thresholdType = 'accent_stone',
  id,
  zone
} = {}) {
  // Derive geometry from parent wall if provided
  const target = wall || { x, y, z, doorWidth, doorHeight, thickness, depth, axis, frameType, thresholdType, id, zone }
  const wx = target.x ?? (target.minX !== undefined ? (target.minX + target.maxX) / 2 : 0)
  const wy = target.y ?? (target.minY !== undefined ? (target.minY + target.maxY) / 2 : 0)
  const wz = target.z ?? (target.minZ !== undefined ? (target.minZ + target.maxZ) / 2 : 0)
  const ww = target.w ?? (target.minX !== undefined ? (target.maxX - target.minX) : 1)
  const wh = target.h ?? (target.minY !== undefined ? (target.maxY - target.minY) : 1)
  const wd = target.d ?? (target.minZ !== undefined ? (target.maxZ - target.minZ) : 1)

  const derivedAxis = axis || target.axis || (ww >= wd ? 'x' : 'z')
  const wallDepth = derivedAxis === 'x' ? wd : ww
  const wallBaseY = wy - wh / 2
  const derivedDepth = depth !== undefined ? depth : round01(wallDepth + 0.1)
  const derivedX = x !== undefined ? x : wx
  const derivedZ = z !== undefined ? z : wz
  const derivedY = y !== undefined ? y : (wall ? wallBaseY : 0)
  const baseId = id || target.id || 'door_frame'
  const targetZone = zone || target.zone

  const blocks = []
  const totalFrameWidth = round01(doorWidth + 2 * thickness)

  // 1. Stone Threshold Step at ground level
  const threshH = 0.2
  blocks.push({
    id: `${baseId}_threshold`,
    zone: targetZone,
    x: round01(derivedX),
    y: round01(derivedY + threshH / 2),
    z: round01(derivedZ),
    w: round01(derivedAxis === 'x' ? totalFrameWidth : derivedDepth),
    h: threshH,
    d: round01(derivedAxis === 'x' ? derivedDepth : totalFrameWidth),
    type: thresholdType,
    decor: true,
    noCollision: true
  })

  // 2. Left & Right Jambs
  const halfDoorW = round01(doorWidth / 2 + thickness / 2)
  const jambH = round01(doorHeight)
  const jambY = round01(derivedY + threshH + jambH / 2)

  if (derivedAxis === 'x') {
    // Jambs along X
    blocks.push({
      id: `${baseId}_jamb_l`,
      zone: targetZone,
      x: round01(derivedX - halfDoorW),
      y: jambY,
      z: round01(derivedZ),
      w: thickness,
      h: jambH,
      d: round01(derivedDepth),
      type: frameType,
      decor: true,
      noCollision: true
    })
    blocks.push({
      id: `${baseId}_jamb_r`,
      zone: targetZone,
      x: round01(derivedX + halfDoorW),
      y: jambY,
      z: round01(derivedZ),
      w: thickness,
      h: jambH,
      d: round01(derivedDepth),
      type: frameType,
      decor: true,
      noCollision: true
    })

    // 3. Overhead Lintel Header
    const lintelY = round01(derivedY + threshH + doorHeight + thickness / 2)
    blocks.push({
      id: `${baseId}_header`,
      zone: targetZone,
      x: round01(derivedX),
      y: lintelY,
      z: round01(derivedZ),
      w: totalFrameWidth,
      h: thickness,
      d: round01(derivedDepth),
      type: frameType,
      decor: true,
      noCollision: true
    })
  } else {
    // axis === 'z': Jambs along Z
    blocks.push({
      id: `${baseId}_jamb_n`,
      zone: targetZone,
      x: round01(derivedX),
      y: jambY,
      z: round01(derivedZ - halfDoorW),
      w: round01(derivedDepth),
      h: jambH,
      d: thickness,
      type: frameType,
      decor: true,
      noCollision: true
    })
    blocks.push({
      id: `${baseId}_jamb_s`,
      zone: targetZone,
      x: round01(derivedX),
      y: jambY,
      z: round01(derivedZ + halfDoorW),
      w: round01(derivedDepth),
      h: jambH,
      d: thickness,
      type: frameType,
      decor: true,
      noCollision: true
    })

    // 3. Overhead Lintel Header
    const lintelY = round01(derivedY + threshH + doorHeight + thickness / 2)
    blocks.push({
      id: `${baseId}_header`,
      zone: targetZone,
      x: round01(derivedX),
      y: lintelY,
      z: round01(derivedZ),
      w: round01(derivedDepth),
      h: thickness,
      d: totalFrameWidth,
      type: frameType,
      decor: true,
      noCollision: true
    })
  }

  return blocks
}
