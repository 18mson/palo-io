/**
 * src/map/kit/decorationPass.js
 * Decoration pass that applies stoneTrim and windowRow to every wall block tagged "facade": true.
 */

import { stoneTrim } from './stoneTrim.js'
import { windowRow } from './windowRow.js'

export function applyDecorationPass(blocks) {
  const result = []
  const decorationBlocks = []

  for (const block of blocks) {
    result.push(block)

    // Only process explicit facade wall blocks
    if (!block || block.comment || block._isGenerated) continue
    if (block.facade !== true) continue

    const baseId = block.id || `facade_${Math.round(block.x)}_${Math.round(block.z)}`
    const w = block.w || 1
    const h = block.h || 1
    const d = block.d || 1

    // 1. Apply stoneTrim: 1 course of darker block at base and top of wall
    const trimBlocks = stoneTrim({
      wall: block,
      trimHeight: 0.5,
      trimType: 'accent_stone',
      id: `${baseId}_trim`,
      zone: block.zone
    })
    for (const tb of trimBlocks) {
      if (block.source) tb.source = block.source
      tb._isGenerated = true
      decorationBlocks.push(tb)
    }

    // 2. Apply windowRow: generate upper window rows if wall is large enough
    const axis = w >= d ? 'x' : 'z'
    const wallLength = axis === 'x' ? w : d
    const wallDepth = axis === 'x' ? d : w

    if (h >= 3.0 && wallLength >= 3.0) {
      const snap05 = v => Math.round(v * 2) / 2
      const count = Math.max(1, Math.min(4, Math.floor(wallLength / 3.2)))
      const rawSpacing = wallLength / (count + 1)
      const spacing = Math.max(1.0, snap05(rawSpacing))
      const windowY = snap05(block.y + (h >= 4.0 ? h * 0.15 : 0.0))
      const winW = Math.max(1.0, snap05(Math.min(1.5, spacing * 0.65)))
      const winH = Math.max(1.0, snap05(Math.min(2.0, h * 0.5)))

      const winBlocks = windowRow({
        x: snap05(block.x),
        y: windowY,
        z: snap05(block.z),
        count,
        spacing,
        w: winW,
        h: winH,
        axis,
        depth: snap05(wallDepth),
        frameType: 'pagoda_wood',
        sillType: 'accent_stone',
        paneType: 'wall',
        id: `${baseId}_win`,
        zone: block.zone,
        noCollision: true
      })

      for (const wb of winBlocks) {
        if (block.source) wb.source = block.source
        wb._isGenerated = true
        decorationBlocks.push(wb)
      }
    }
  }

  return result.concat(decorationBlocks)
}
