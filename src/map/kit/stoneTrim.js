/**
 * src/map/kit/stoneTrim.js
 * Generates an array of blocks representing 1 course of darker stone trim
 * at the base and top of a wall (architectural plinth course & coping frieze).
 */

const round01 = v => Math.round(v * 10) / 10

export function stoneTrim({
  wall,
  x,
  y,
  z,
  w,
  h,
  d,
  trimHeight = 0.5,
  trimType = 'accent_stone',
  protrusion = 0.1,
  id,
  zone
} = {}) {
  const target = wall || { x, y, z, w, h, d, id, zone }
  const wx = target.x ?? 0
  const wy = target.y ?? 0
  const wz = target.z ?? 0
  const ww = target.w ?? 1
  const wh = target.h ?? 1
  const wd = target.d ?? 1
  const baseId = id || target.id || 'trim'
  const targetZone = zone || target.zone

  const blocks = []

  // Ensure trim height doesn't exceed half the wall
  const actualTrimH = Math.min(trimHeight, wh / 2)
  if (actualTrimH <= 0.05) return blocks

  // Protrusion along horizontal footprint (multiple of 0.1)
  const trimW = round01(ww + (ww >= wd ? 0.0 : protrusion * 2))
  const trimD = round01(wd + (wd >= ww ? 0.0 : protrusion * 2))
  const snappedTrimH = round01(actualTrimH)

  // 1. Base Course (Plinth trim at foot of wall)
  const baseY = round01(wy - wh / 2 + actualTrimH / 2)
  blocks.push({
    id: `${baseId}_base_trim`,
    zone: targetZone,
    x: round01(wx),
    y: baseY,
    z: round01(wz),
    w: trimW,
    h: snappedTrimH,
    d: trimD,
    type: trimType,
    decor: true,
    noCollision: true
  })

  // 2. Top Course (Coping / Cornice trim at top of wall)
  if (wh > actualTrimH * 1.5) {
    const topY = round01(wy + wh / 2 - actualTrimH / 2)
    blocks.push({
      id: `${baseId}_top_trim`,
      zone: targetZone,
      x: round01(wx),
      y: topY,
      z: round01(wz),
      w: trimW,
      h: snappedTrimH,
      d: trimD,
      type: trimType,
      decor: true,
      noCollision: true
    })
  }

  return blocks
}
