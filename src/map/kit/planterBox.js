/**
 * src/map/kit/planterBox.js
 * Generates an array of blocks representing a decorative planter box with stone trough and lush foliage hedge.
 */

export function planterBox({
  x = 0,
  y = 0,
  z = 0,
  w = 2.0,
  d = 1.0,
  h = 0.8,
  boxType = 'accent_stone',
  foliageType = 'ivy',
  id,
  zone
} = {}) {
  const blocks = []
  const baseId = id || 'planter_box'

  // 1. Stone Trough Base
  blocks.push({
    id: `${baseId}_trough`,
    zone,
    x,
    y: y + h / 2,
    z,
    w,
    h,
    d,
    type: boxType
  })

  // 2. Lush Foliage / Hedge Top
  const foliageH = 0.5
  blocks.push({
    id: `${baseId}_foliage`,
    zone,
    x,
    y: y + h + foliageH / 2,
    z,
    w: Math.max(0.2, w - 0.2),
    h: foliageH,
    d: Math.max(0.2, d - 0.2),
    type: foliageType
  })

  return blocks
}
