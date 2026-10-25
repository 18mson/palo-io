/**
 * src/map/kit/pillarPair.js
 * Generates an array of blocks forming a pair of classical pillars
 * with base plinths, column shafts, capitals, and an optional spanning lintel.
 */

export function pillarPair({
  x = 0,
  y = 0,
  z = 0,
  height = 4.0,
  spacing = 3.0,
  axis = 'x',
  pillarWidth = 0.6,
  pillarDepth = 0.6,
  type = 'accent_stone',
  capType = 'pagoda_wood',
  hasLintel = true,
  id,
  zone
} = {}) {
  const blocks = []
  const baseId = id || 'pillar_pair'
  const plinthH = 0.4
  const capH = 0.4
  const shaftH = Math.max(0.4, height - plinthH - capH)
  const plinthW = pillarWidth + 0.2
  const plinthD = pillarDepth + 0.2

  const halfSpacing = spacing / 2
  const offsets = [-halfSpacing, halfSpacing]

  for (let i = 0; i < 2; i++) {
    const off = offsets[i]
    const px = axis === 'x' ? x + off : x
    const pz = axis === 'z' ? z + off : z
    const pTag = i === 0 ? 'l' : 'r'

    // 1. Base Plinth
    blocks.push({
      id: `${baseId}_plinth_${pTag}`,
      zone,
      x: px,
      y: y + plinthH / 2,
      z: pz,
      w: plinthW,
      h: plinthH,
      d: plinthD,
      type
    })

    // 2. Main Column Shaft
    blocks.push({
      id: `${baseId}_shaft_${pTag}`,
      zone,
      x: px,
      y: y + plinthH + shaftH / 2,
      z: pz,
      w: pillarWidth,
      h: shaftH,
      d: pillarDepth,
      type
    })

    // 3. Capital Cap
    blocks.push({
      id: `${baseId}_cap_${pTag}`,
      zone,
      x: px,
      y: y + height - capH / 2,
      z: pz,
      w: plinthW,
      h: capH,
      d: plinthD,
      type: capType
    })
  }

  // 4. Overhead Spanning Lintel
  if (hasLintel) {
    const lintelH = 0.4
    const lintelW = axis === 'x' ? spacing + plinthW : plinthW
    const lintelD = axis === 'z' ? spacing + plinthD : plinthD

    blocks.push({
      id: `${baseId}_lintel`,
      zone,
      x,
      y: y + height + lintelH / 2,
      z,
      w: lintelW,
      h: lintelH,
      d: lintelD,
      type: capType
    })
  }

  return blocks
}
