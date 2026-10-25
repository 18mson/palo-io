/**
 * src/map/kit/crateStack.js
 * Generates an array of blocks representing realistic tactical cover crate stacks.
 * Supports styles: 'single', 'double', 'pyramid', 'radianite_stack', 'corner'.
 */

export function crateStack({
  x = 0,
  y = 0,
  z = 0,
  style = 'double',
  size = 1.5,
  primaryType = 'box',
  secondaryType = 'radianite',
  id,
  zone
} = {}) {
  const blocks = []
  const baseId = id || 'crate_stack'

  switch (style) {
    case 'single':
      blocks.push({
        id: `${baseId}_0`,
        zone,
        x,
        y: y + size / 2,
        z,
        w: size,
        h: size,
        d: size,
        type: primaryType
      })
      break

    case 'double':
      // 1 bottom crate + 1 top crate
      blocks.push({
        id: `${baseId}_bottom`,
        zone,
        x,
        y: y + size / 2,
        z,
        w: size,
        h: size,
        d: size,
        type: primaryType
      })
      blocks.push({
        id: `${baseId}_top`,
        zone,
        x,
        y: y + size * 1.5,
        z,
        w: size,
        h: size,
        d: size,
        type: primaryType
      })
      break

    case 'pyramid':
      // 2 crates side-by-side on ground + 1 centered on top
      blocks.push({
        id: `${baseId}_base_l`,
        zone,
        x: x - size * 0.55,
        y: y + size / 2,
        z,
        w: size,
        h: size,
        d: size,
        type: primaryType
      })
      blocks.push({
        id: `${baseId}_base_r`,
        zone,
        x: x + size * 0.55,
        y: y + size / 2,
        z,
        w: size,
        h: size,
        d: size,
        type: primaryType
      })
      blocks.push({
        id: `${baseId}_top`,
        zone,
        x,
        y: y + size * 1.5,
        z,
        w: size,
        h: size,
        d: size,
        type: primaryType
      })
      break

    case 'radianite_stack':
      // 1 large glowing Radianite container + 1 jumpable wooden crate
      const radW = size * 1.4
      const radH = size * 1.1
      const radD = size * 1.4
      blocks.push({
        id: `${baseId}_radianite_box`,
        zone,
        x,
        y: y + radH / 2,
        z,
        w: radW,
        h: radH,
        d: radD,
        type: secondaryType
      })
      blocks.push({
        id: `${baseId}_jump_box`,
        zone,
        x: x + radW * 0.25,
        y: y + radH + size * 0.5,
        z: z + radD * 0.25,
        w: size * 0.8,
        h: size,
        d: size * 0.8,
        type: primaryType
      })
      break

    case 'corner':
      // L-shaped double cover
      blocks.push({
        id: `${baseId}_c1`,
        zone,
        x: x - size * 0.5,
        y: y + size / 2,
        z,
        w: size,
        h: size,
        d: size,
        type: primaryType
      })
      blocks.push({
        id: `${baseId}_c2`,
        zone,
        x,
        y: y + size / 2,
        z: z + size * 0.5,
        w: size,
        h: size,
        d: size,
        type: primaryType
      })
      break

    default:
      blocks.push({
        id: `${baseId}_0`,
        zone,
        x,
        y: y + size / 2,
        z,
        w: size,
        h: size,
        d: size,
        type: primaryType
      })
      break
  }

  return blocks
}
