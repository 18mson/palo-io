/**
 * src/map/kit/windowRow.js
 * Generates an array of blocks representing a horizontal row of architectural windows.
 */

import { expandWindow } from '../MapMacros.js'

export function windowRow({
  wall,
  x,
  y,
  z,
  count = 3,
  spacing = 2.5,
  w = 1.5,
  h = 2.0,
  axis,
  facing = 1,
  frameType = 'pagoda_wood',
  sillType = 'accent_stone',
  paneType = 'wall',
  depth,
  frameThickness = 0.2,
  sillExt = 0.2,
  id,
  zone,
  noCollision = true
} = {}) {
  // Derive geometry from parent wall if provided
  const target = wall || { x, y, z, w, h, depth, axis, facing, id, zone }
  const wx = target.x ?? (target.minX !== undefined ? (target.minX + target.maxX) / 2 : 0)
  const wy = target.y ?? (target.minY !== undefined ? (target.minY + target.maxY) / 2 : 0)
  const wz = target.z ?? (target.minZ !== undefined ? (target.minZ + target.maxZ) / 2 : 0)
  const ww = target.w ?? (target.minX !== undefined ? (target.maxX - target.minX) : 1)
  const wh = target.h ?? (target.minY !== undefined ? (target.maxY - target.minY) : 1)
  const wd = target.d ?? (target.minZ !== undefined ? (target.maxZ - target.minZ) : 1)

  const derivedAxis = axis || target.axis || (ww >= wd ? 'x' : 'z')
  const wallDepth = derivedAxis === 'x' ? wd : ww
  const derivedX = x !== undefined ? x : wx
  const derivedZ = z !== undefined ? z : wz
  const derivedY = y !== undefined ? (wall ? (Math.abs(y) < wh ? wy + y : y) : y) : (wy + (wh >= 4.0 ? wh * 0.15 : 0.0))
  const derivedDepth = depth || wallDepth
  const baseId = id || target.id || 'win_row'
  const targetZone = zone || target.zone

  const blocks = []
  const halfSpan = ((count - 1) * spacing) / 2

  for (let i = 0; i < count; i++) {
    const rawOffset = i * spacing - halfSpan
    const offset = Math.round(rawOffset * 2) / 2
    const winX = derivedAxis === 'x' ? Math.round((derivedX + offset) * 2) / 2 : derivedX
    const winZ = derivedAxis === 'z' ? Math.round((derivedZ + offset) * 2) / 2 : derivedZ
    const winId = baseId ? `${baseId}_w${i}` : undefined

    const winBlocks = expandWindow({
      x: winX,
      y: derivedY,
      z: winZ,
      w,
      h,
      axis: derivedAxis,
      frameType,
      sillType,
      paneType,
      depth: derivedDepth,
      frameThickness,
      sillExt,
      id: winId,
      zone: targetZone,
      decor: true
    })

    for (const b of winBlocks) {
      b.decor = true
      if (noCollision) b.noCollision = true
      blocks.push(b)
    }
  }

  return blocks
}
