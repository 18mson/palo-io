/**
 * src/map/kit/balcony.js
 * Generates an array of blocks forming an architectural balcony with walkable deck,
 * balustrade railings along outer edges, and structural corbel brackets underneath.
 */

export function balcony({
  wall,
  x,
  y,
  z,
  w,
  d = 2.0,
  h = 1.0,
  axis,
  facing = 1, // +1 or -1 along the orthogonal axis
  hasSideRailings = true,
  deckThickness = 0.4,
  railingThickness = 0.2,
  deckType = 'pagoda_wood',
  railingType = 'pagoda_wood',
  bracketType = 'accent_stone',
  id,
  zone
} = {}) {
  // Derive geometry from parent wall if provided
  const target = wall || { x, y, z, w, d, h, axis, facing, id, zone }
  const wx = target.x ?? (target.minX !== undefined ? (target.minX + target.maxX) / 2 : 0)
  const wy = target.y ?? (target.minY !== undefined ? (target.minY + target.maxY) / 2 : 0)
  const wz = target.z ?? (target.minZ !== undefined ? (target.minZ + target.maxZ) / 2 : 0)
  const ww = target.w ?? (target.minX !== undefined ? (target.maxX - target.minX) : 1)
  const wh = target.h ?? (target.minY !== undefined ? (target.maxY - target.minY) : 1)
  const wd = target.d ?? (target.minZ !== undefined ? (target.maxZ - target.minZ) : 1)

  const derivedAxis = axis || target.axis || (ww >= wd ? 'x' : 'z')
  const derivedFacing = facing ?? target.facing ?? 1
  const derivedW = w || (derivedAxis === 'x' ? Math.min(ww, 6.0) : Math.min(wd, 6.0))
  const derivedY = y !== undefined ? (wall ? (Math.abs(y) < wh ? wy + y : y) : y) : wy
  const baseId = id || target.id || 'balcony'
  const targetZone = zone || target.zone

  const blocks = []

  if (derivedAxis === 'x') {
    // Balcony width along X, protruding along Z from wall face
    const wallFaceZ = wz + derivedFacing * (wd / 2)
    const deckZ = z !== undefined && !wall ? (z + derivedFacing * (d / 2)) : (wallFaceZ + derivedFacing * (d / 2 - 0.05))
    const deckX = x !== undefined ? x : wx
    const deckY = derivedY - deckThickness / 2

    // 1. Walkable Deck Slab
    blocks.push({
      id: `${baseId}_deck`,
      zone: targetZone,
      x: deckX,
      y: deckY,
      z: deckZ,
      w: derivedW,
      h: deckThickness,
      d,
      type: deckType
    })

    // 2. Front Railing
    const frontZ = deckZ + derivedFacing * (d / 2 - railingThickness / 2)
    blocks.push({
      id: `${baseId}_front_rail`,
      zone: targetZone,
      x: deckX,
      y: derivedY + h / 2,
      z: frontZ,
      w: derivedW,
      h,
      d: railingThickness,
      type: railingType
    })

    // 3. Side Railings (Left & Right)
    if (hasSideRailings) {
      const leftX = deckX - derivedW / 2 + railingThickness / 2
      const rightX = deckX + derivedW / 2 - railingThickness / 2
      blocks.push({
        id: `${baseId}_left_rail`,
        zone: targetZone,
        x: leftX,
        y: derivedY + h / 2,
        z: deckZ,
        w: railingThickness,
        h,
        d,
        type: railingType
      })
      blocks.push({
        id: `${baseId}_right_rail`,
        zone: targetZone,
        x: rightX,
        y: derivedY + h / 2,
        z: deckZ,
        w: railingThickness,
        h,
        d,
        type: railingType
      })
    }

    // 4. Structural Corbel Brackets underneath (touching wall face)
    const bracketW = 0.4
    const bracketH = 0.8
    const bracketD = d * 0.7
    const bracketY = derivedY - deckThickness - bracketH / 2
    const bracketZ = wallFaceZ + derivedFacing * (bracketD / 2 - 0.05)
    const bracketSpan = Math.max(1.0, derivedW * 0.35)

    blocks.push({
      id: `${baseId}_bracket_l`,
      zone: targetZone,
      x: deckX - bracketSpan,
      y: bracketY,
      z: bracketZ,
      w: bracketW,
      h: bracketH,
      d: bracketD,
      type: bracketType,
      noCollision: true
    })
    blocks.push({
      id: `${baseId}_bracket_r`,
      zone: targetZone,
      x: deckX + bracketSpan,
      y: bracketY,
      z: bracketZ,
      w: bracketW,
      h: bracketH,
      d: bracketD,
      type: bracketType,
      noCollision: true
    })
  } else {
    // axis === 'z': Balcony width along Z, protruding along X from wall face
    const wallFaceX = wx + derivedFacing * (ww / 2)
    const deckX = x !== undefined && !wall ? (x + derivedFacing * (d / 2)) : (wallFaceX + derivedFacing * (d / 2 - 0.05))
    const deckZ = z !== undefined ? z : wz
    const deckY = derivedY - deckThickness / 2

    // 1. Walkable Deck Slab
    blocks.push({
      id: `${baseId}_deck`,
      zone: targetZone,
      x: deckX,
      y: deckY,
      z: deckZ,
      w: d,
      h: deckThickness,
      d: derivedW,
      type: deckType
    })

    // 2. Front Railing
    const frontX = deckX + derivedFacing * (d / 2 - railingThickness / 2)
    blocks.push({
      id: `${baseId}_front_rail`,
      zone: targetZone,
      x: frontX,
      y: derivedY + h / 2,
      z: deckZ,
      w: railingThickness,
      h,
      d: derivedW,
      type: railingType
    })

    // 3. Side Railings (North & South)
    if (hasSideRailings) {
      const northZ = deckZ - derivedW / 2 + railingThickness / 2
      const southZ = deckZ + derivedW / 2 - railingThickness / 2
      blocks.push({
        id: `${baseId}_north_rail`,
        zone: targetZone,
        x: deckX,
        y: derivedY + h / 2,
        z: northZ,
        w: d,
        h,
        d: railingThickness,
        type: railingType
      })
      blocks.push({
        id: `${baseId}_south_rail`,
        zone: targetZone,
        x: deckX,
        y: derivedY + h / 2,
        z: southZ,
        w: d,
        h,
        d: railingThickness,
        type: railingType
      })
    }

    // 4. Structural Corbel Brackets underneath
    const bracketW = d * 0.7
    const bracketH = 0.8
    const bracketD = 0.4
    const bracketY = derivedY - deckThickness - bracketH / 2
    const bracketX = wallFaceX + derivedFacing * (bracketW / 2 - 0.05)
    const bracketSpan = Math.max(1.0, derivedW * 0.35)

    blocks.push({
      id: `${baseId}_bracket_n`,
      zone: targetZone,
      x: bracketX,
      y: bracketY,
      z: deckZ - bracketSpan,
      w: bracketW,
      h: bracketH,
      d: bracketD,
      type: bracketType,
      noCollision: true
    })
    blocks.push({
      id: `${baseId}_bracket_s`,
      zone: targetZone,
      x: bracketX,
      y: bracketY,
      z: deckZ + bracketSpan,
      w: bracketW,
      h: bracketH,
      d: bracketD,
      type: bracketType,
      noCollision: true
    })
  }

  return blocks
}
