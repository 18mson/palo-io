import { windowRow } from './kit/windowRow.js'
import { balcony } from './kit/balcony.js'
import { roofEave } from './kit/roofEave.js'
import { pillarPair } from './kit/pillarPair.js'
import { awning } from './kit/awning.js'
import { planterBox } from './kit/planterBox.js'
import { crateStack } from './kit/crateStack.js'
import { stoneTrim } from './kit/stoneTrim.js'
import { doorFrame } from './kit/doorFrame.js'
import { applyDecorationPass } from './kit/decorationPass.js'

/**
 * MapMacros.js — Macro expansion and grid snapping system for maps
 *
 * Supported Macros:
 *  - wallWithDoor: Wall segment with doorway opening and overhead lintel
 *  - stairs: Real stepped box geometry with risers <= 0.4m for auto step-up
 *  - ladder: Vertical climbing structure with rungs and side rails
 *  - repeat: Repeated placement of block/macro along dx, dy, dz
 *  - window: Architectural window frame, sill, and recessed pane
 */

export function isMultipleOfHalf(val) {
  if (typeof val !== 'number') return true
  const rem = Math.abs(val * 2 - Math.round(val * 2))
  return rem < 1e-4
}

export function isMultipleOfTenth(val) {
  if (typeof val !== 'number') return true
  const rem = Math.abs(val * 10 - Math.round(val * 10))
  return rem < 1e-4
}

export function validateGrid05(item, context = '') {
  if (item && item.decor) {
    const fields = ['x', 'y', 'z', 'w', 'h', 'd', 'minX', 'maxX', 'minZ', 'maxZ', 'startY', 'endY', 'length', 'height', 'doorWidth', 'doorOffset', 'y0', 'y1']
    for (const f of fields) {
      if (f in item && typeof item[f] === 'number') {
        if (!isMultipleOfTenth(item[f])) {
          console.warn(`[MapMacros 0.1m Decor Warning] ${context} property "${f}" = ${item[f]} is not a multiple of 0.1!`)
        }
      }
    }
    return
  }
  const fields = ['x', 'y', 'z', 'w', 'h', 'd', 'minX', 'maxX', 'minZ', 'maxZ', 'startY', 'endY', 'length', 'height', 'doorWidth', 'doorOffset', 'y0', 'y1']
  for (const f of fields) {
    if (f in item && typeof item[f] === 'number') {
      if (!isMultipleOfHalf(item[f])) {
        console.warn(`[MapMacros 0.5m Grid Warning] ${context} property "${f}" = ${item[f]} is not a multiple of 0.5!`)
      }
    }
  }
}

/**
 * Expand wallWithDoor macro into 2 side wall columns + 1 overhead lintel
 */
export function expandWallWithDoor(m) {
  validateGrid05(m, `wallWithDoor (${m.id || ''})`)
  const {
    x = 0,
    z = 0,
    length = 10,
    height = 4.0,
    axis = 'x',
    doorWidth = 2.0,
    doorOffset = 0,
    doorHeight = 2.5,
    thickness = 1.0,
    type = 'wall',
    id,
    zone
  } = m

  const blocks = []
  const halfLen = length / 2
  const doorCenterOffset = doorOffset
  const doorHalfW = doorWidth / 2

  if (axis === 'x') {
    const wallStart = x - halfLen
    const wallEnd = x + halfLen
    const doorStart = x + doorCenterOffset - doorHalfW
    const doorEnd = x + doorCenterOffset + doorHalfW

    // Left wall segment
    const leftLen = Math.max(0, doorStart - wallStart)
    if (leftLen > 0) {
      blocks.push({
        id: id ? `${id}_left` : undefined,
        zone,
        x: wallStart + leftLen / 2,
        y: height / 2,
        z,
        w: leftLen,
        h: height,
        d: thickness,
        type
      })
    }

    // Right wall segment
    const rightLen = Math.max(0, wallEnd - doorEnd)
    if (rightLen > 0) {
      blocks.push({
        id: id ? `${id}_right` : undefined,
        zone,
        x: doorEnd + rightLen / 2,
        y: height / 2,
        z,
        w: rightLen,
        h: height,
        d: thickness,
        type
      })
    }

    // Lintel over doorway
    const lintelH = Math.max(0, height - doorHeight)
    if (lintelH > 0) {
      blocks.push({
        id: id ? `${id}_lintel` : undefined,
        zone,
        x: x + doorCenterOffset,
        y: doorHeight + lintelH / 2,
        z,
        w: doorWidth,
        h: lintelH,
        d: thickness,
        type
      })
    }
  } else {
    // axis === 'z'
    const wallStart = z - halfLen
    const wallEnd = z + halfLen
    const doorStart = z + doorCenterOffset - doorHalfW
    const doorEnd = z + doorCenterOffset + doorHalfW

    // North wall segment
    const leftLen = Math.max(0, doorStart - wallStart)
    if (leftLen > 0) {
      blocks.push({
        id: id ? `${id}_left` : undefined,
        zone,
        x,
        y: height / 2,
        z: wallStart + leftLen / 2,
        w: thickness,
        h: height,
        d: leftLen,
        type
      })
    }

    // South wall segment
    const rightLen = Math.max(0, wallEnd - doorEnd)
    if (rightLen > 0) {
      blocks.push({
        id: id ? `${id}_right` : undefined,
        zone,
        x,
        y: height / 2,
        z: doorEnd + rightLen / 2,
        w: thickness,
        h: height,
        d: rightLen,
        type
      })
    }

    // Lintel over doorway
    const lintelH = Math.max(0, height - doorHeight)
    if (lintelH > 0) {
      blocks.push({
        id: id ? `${id}_lintel` : undefined,
        zone,
        x,
        y: doorHeight + lintelH / 2,
        z: z + doorCenterOffset,
        w: thickness,
        h: lintelH,
        d: doorWidth,
        type
      })
    }
  }

  return blocks
}

/**
 * Expand stairs macro into solid stepped geometry with risers <= 0.4m
 */
export function expandStairs(m) {
  validateGrid05(m, `stairs (${m.id || ''})`)
  const {
    minX = 0,
    maxX = 4,
    minZ = 0,
    maxZ = 8,
    startY = 0,
    endY = 3.2,
    axis = 'z',
    steps,
    type = 'stairs_wood',
    id,
    zone,
    baseFloorY = Math.min(startY, endY)
  } = m

  const totalRise = endY - startY
  const minStepsNeeded = Math.max(1, Math.ceil(Math.abs(totalRise) / 0.40))
  const stepCount = steps ? Math.max(steps, minStepsNeeded) : minStepsNeeded
  const stepH = totalRise / stepCount

  const blocks = []
  const round01 = v => Math.round(v * 10) / 10

  if (axis === 'z') {
    const totalDist = maxZ - minZ
    const stepDepth = totalDist / stepCount
    const width = maxX - minX
    const centerX = (minX + maxX) / 2

    for (let i = 0; i < stepCount; i++) {
      const topY = startY + (i + 1) * stepH
      const h = Math.max(0.1, topY - baseFloorY)
      const centerY = baseFloorY + h / 2
      const centerZ = minZ + (i + 0.5) * stepDepth

      blocks.push({
        id: id ? `${id}_step_${i}` : undefined,
        zone,
        x: round01(centerX),
        y: round01(centerY),
        z: round01(centerZ),
        w: round01(width),
        h: round01(h),
        d: round01(stepDepth),
        type,
        isStairStep: true,
        decor: true,
        noCollision: true,
        floatOK: true
      })
    }
  } else {
    // axis === 'x'
    const totalDist = maxX - minX
    const stepWidth = totalDist / stepCount
    const depth = maxZ - minZ
    const centerZ = (minZ + maxZ) / 2

    for (let i = 0; i < stepCount; i++) {
      const topY = startY + (i + 1) * stepH
      const h = Math.max(0.1, topY - baseFloorY)
      const centerY = baseFloorY + h / 2
      const centerX = minX + (i + 0.5) * stepWidth

      blocks.push({
        id: id ? `${id}_step_${i}` : undefined,
        zone,
        x: round01(centerX),
        y: round01(centerY),
        z: round01(centerZ),
        w: round01(stepWidth),
        h: round01(h),
        d: round01(depth),
        type,
        isStairStep: true,
        decor: true,
        noCollision: true,
        floatOK: true
      })
    }
  }

  // Continuous physics ramp collider
  blocks.push({
    id: id ? `${id}_ramp` : undefined,
    zone,
    isRamp: true,
    minX,
    maxX,
    minZ,
    maxZ,
    startY,
    endY,
    axis,
    type
  })

  return blocks
}

/**
 * Expand ladder macro into rungs, rails and register ladder metadata
 */
export function expandLadder(m) {
  validateGrid05(m, `ladder (${m.id || ''})`)
  const {
    x = 0,
    z = 0,
    y0 = 0,
    y1 = 4.0,
    facing = 'north',
    width = 0.8,
    type = 'metal',
    id,
    zone
  } = m

  const blocks = []
  const height = y1 - y0
  const railThick = 0.08
  const halfW = width / 2

  // Side rails and horizontal rungs
  if (facing === 'north' || facing === 'south') {
    // Rails along X
    blocks.push({
      id: id ? `${id}_rail_l` : undefined,
      zone,
      x: x - halfW,
      y: y0 + height / 2,
      z,
      w: railThick,
      h: height,
      d: railThick,
      type
    })
    blocks.push({
      id: id ? `${id}_rail_r` : undefined,
      zone,
      x: x + halfW,
      y: y0 + height / 2,
      z,
      w: railThick,
      h: height,
      d: railThick,
      type
    })

    // Rungs every ~0.35m
    const rungCount = Math.floor(height / 0.35)
    for (let i = 1; i <= rungCount; i++) {
      blocks.push({
        id: id ? `${id}_rung_${i}` : undefined,
        zone,
        x,
        y: y0 + i * 0.35,
        z,
        w: width,
        h: 0.05,
        d: 0.05,
        type
      })
    }
  } else {
    // facing === 'east' || facing === 'west' (Rails along Z)
    blocks.push({
      id: id ? `${id}_rail_l` : undefined,
      zone,
      x,
      y: y0 + height / 2,
      z: z - halfW,
      w: railThick,
      h: height,
      d: railThick,
      type
    })
    blocks.push({
      id: id ? `${id}_rail_r` : undefined,
      zone,
      x,
      y: y0 + height / 2,
      z: z + halfW,
      w: railThick,
      h: height,
      d: railThick,
      type
    })

    const rungCount = Math.floor(height / 0.35)
    for (let i = 1; i <= rungCount; i++) {
      blocks.push({
        id: id ? `${id}_rung_${i}` : undefined,
        zone,
        x,
        y: y0 + i * 0.35,
        z,
        w: 0.05,
        h: 0.05,
        d: width,
        type
      })
    }
  }

  // Ladder climbable trigger definition
  const ladderMeta = {
    id: id || `ladder_${x}_${z}`,
    zone,
    x,
    z,
    y0,
    y1,
    facing,
    width
  }

  return { blocks, ladder: ladderMeta }
}

/**
 * Expand repeat macro
 */
export function expandRepeat(m, expandItemFn) {
  validateGrid05(m, `repeat (${m.id || ''})`)
  const {
    block,
    count = 2,
    dx = 0,
    dy = 0,
    dz = 0,
    id,
    zone
  } = m

  const results = []
  if (!block) return results

  for (let i = 0; i < count; i++) {
    const copy = JSON.parse(JSON.stringify(block))
    if (id) copy.id = `${id}_${i}`
    if (zone && !copy.zone) copy.zone = zone

    if ('x' in copy) copy.x += i * dx
    if ('y' in copy) copy.y += i * dy
    if ('z' in copy) copy.z += i * dz

    if ('minX' in copy) copy.minX += i * dx
    if ('maxX' in copy) copy.maxX += i * dx
    if ('minZ' in copy) copy.minZ += i * dz
    if ('maxZ' in copy) copy.maxZ += i * dz
    if ('startY' in copy) copy.startY += i * dy
    if ('endY' in copy) copy.endY += i * dy
    if ('y0' in copy) copy.y0 += i * dy
    if ('y1' in copy) copy.y1 += i * dy

    results.push(copy)
  }

  return results
}

/**
 * Expand window macro (outer frame + protruding sill + recessed pane)
 */
export function expandWindow(m) {
  validateGrid05(m, `window (${m.id || ''})`)
  const round01 = v => Math.round(v * 10) / 10
  const {
    x = 0,
    y = 2.0,
    z = 0,
    w = 2.0,
    h = 2.0,
    axis = 'x',
    frameType = 'pagoda_wood',
    sillType = 'accent_stone',
    paneType = 'wall',
    frameThickness = 0.2,
    depth = 0.5,
    sillExt = 0.2,
    id,
    zone
  } = m

  const blocks = []
  const snappedThick = round01(frameThickness)
  const snappedDepth = round01(depth)
  const snappedSillExt = round01(sillExt)
  const snappedW = round01(w)
  const snappedH = round01(h)
  const innerH = round01(snappedH - 2 * snappedThick)

  if (axis === 'x') {
    // Window in X-Z plane, facing along Z
    // 1. Protruding Bottom Sill
    blocks.push({
      id: id ? `${id}_sill` : undefined,
      zone,
      x: round01(x),
      y: round01(y - snappedH / 2 + snappedThick / 2),
      z: round01(z),
      w: round01(snappedW + 0.2),
      h: snappedThick,
      d: round01(snappedDepth + snappedSillExt),
      type: sillType,
      decor: true,
      noCollision: true
    })

    // 2. Top Frame
    blocks.push({
      id: id ? `${id}_top_frame` : undefined,
      zone,
      x: round01(x),
      y: round01(y + snappedH / 2 - snappedThick / 2),
      z: round01(z),
      w: snappedW,
      h: snappedThick,
      d: snappedDepth,
      type: frameType,
      decor: true,
      noCollision: true
    })

    // 3. Left Jamb
    blocks.push({
      id: id ? `${id}_jamb_l` : undefined,
      zone,
      x: round01(x - snappedW / 2 + snappedThick / 2),
      y: round01(y),
      z: round01(z),
      w: snappedThick,
      h: innerH,
      d: snappedDepth,
      type: frameType,
      decor: true,
      noCollision: true
    })

    // 4. Right Jamb
    blocks.push({
      id: id ? `${id}_jamb_r` : undefined,
      zone,
      x: round01(x + snappedW / 2 - snappedThick / 2),
      y: round01(y),
      z: round01(z),
      w: snappedThick,
      h: innerH,
      d: snappedDepth,
      type: frameType,
      decor: true,
      noCollision: true
    })

    // 5. Recessed Pane
    blocks.push({
      id: id ? `${id}_pane` : undefined,
      zone,
      x: round01(x),
      y: round01(y),
      z: round01(z),
      w: round01(snappedW - 2 * snappedThick),
      h: innerH,
      d: 0.1,
      type: paneType,
      decor: true,
      noCollision: true
    })
  } else {
    // axis === 'z'
    // 1. Protruding Bottom Sill
    blocks.push({
      id: id ? `${id}_sill` : undefined,
      zone,
      x: round01(x),
      y: round01(y - snappedH / 2 + snappedThick / 2),
      z: round01(z),
      w: round01(snappedDepth + snappedSillExt),
      h: snappedThick,
      d: round01(snappedW + 0.2),
      type: sillType,
      decor: true,
      noCollision: true
    })

    // 2. Top Frame
    blocks.push({
      id: id ? `${id}_top_frame` : undefined,
      zone,
      x: round01(x),
      y: round01(y + snappedH / 2 - snappedThick / 2),
      z: round01(z),
      w: snappedDepth,
      h: snappedThick,
      d: snappedW,
      type: frameType,
      decor: true,
      noCollision: true
    })

    // 3. North Jamb
    blocks.push({
      id: id ? `${id}_jamb_l` : undefined,
      zone,
      x: round01(x),
      y: round01(y),
      z: round01(z - snappedW / 2 + snappedThick / 2),
      w: snappedDepth,
      h: innerH,
      d: snappedThick,
      type: frameType,
      decor: true,
      noCollision: true
    })

    // 4. South Jamb
    blocks.push({
      id: id ? `${id}_jamb_r` : undefined,
      zone,
      x: round01(x),
      y: round01(y),
      z: round01(z + snappedW / 2 - snappedThick / 2),
      w: snappedDepth,
      h: innerH,
      d: snappedThick,
      type: frameType,
      decor: true,
      noCollision: true
    })

    // 5. Recessed Pane
    blocks.push({
      id: id ? `${id}_pane` : undefined,
      zone,
      x: round01(x),
      y: round01(y),
      z: round01(z),
      w: 0.1,
      h: innerH,
      d: round01(snappedW - 2 * snappedThick),
      type: paneType,
      decor: true,
      noCollision: true
    })
  }

  return blocks
}

/**
 * Expand lantern macro into decorative hanging lantern
 */
export function expandLantern(m) {
  validateGrid05(m, `lantern (${m.id || ''})`)
  const round01 = v => Math.round(v * 10) / 10
  const { x = 0, y = 3.0, z = 0, id, zone } = m
  return [{
    id: id || 'lantern',
    zone,
    x: round01(x),
    y: round01(y),
    z: round01(z),
    w: 0.4,
    h: 0.6,
    d: 0.4,
    type: 'lantern',
    decor: true,
    noCollision: true
  }]
}

/**
 * Expand all macros in a map definition
 */
export function expandMapMacros(mapData) {
  const expandedBlocks = []
  const ladders = []

  function processItem(item) {
    if (!item || item.comment) {
      if (item) expandedBlocks.push(item)
      return
    }

    if (!item._isGenerated) {
      validateGrid05(item, `Map element ${item.id || item.macro || item.type || ''}`)
    }

    const macroType = item.macro || (
      item.type === 'wallWithDoor' ? 'wallWithDoor' :
      (item.type === 'stairs' && item.steps) ? 'stairs' :
      (item.type === 'ladder' && item.facing) ? 'ladder' :
      (item.type === 'repeat' && item.block) ? 'repeat' :
      (item.type === 'window' && (item.axis || item.frameType)) ? 'window' :
      (item.type === 'lantern') ? 'lantern' : null
    )

    if (!macroType) {
      expandedBlocks.push(item)
      return
    }

    const forwardChild = b => {
      if (item.source && !b.source) b.source = item.source
      b._isGenerated = true
      processItem(b)
    }

    switch (macroType) {
      case 'lantern': {
        const blocks = expandLantern(item)
        blocks.forEach(forwardChild)
        break
      }
      case 'wallWithDoor': {
        const blocks = expandWallWithDoor(item)
        blocks.forEach(forwardChild)
        break
      }
      case 'stairs': {
        const blocks = expandStairs(item)
        blocks.forEach(forwardChild)
        break
      }
      case 'ladder': {
        const res = expandLadder(item)
        res.blocks.forEach(forwardChild)
        if (res.ladder) ladders.push(res.ladder)
        break
      }
      case 'repeat': {
        const repeated = expandRepeat(item, processItem)
        repeated.forEach(forwardChild)
        break
      }
      case 'window': {
        const blocks = expandWindow(item)
        blocks.forEach(forwardChild)
        break
      }
      case 'windowRow': {
        const blocks = windowRow(item)
        blocks.forEach(forwardChild)
        break
      }
      case 'balcony': {
        const blocks = balcony(item)
        blocks.forEach(forwardChild)
        break
      }
      case 'roofEave': {
        const blocks = roofEave(item)
        blocks.forEach(forwardChild)
        break
      }
      case 'pillarPair': {
        const blocks = pillarPair(item)
        blocks.forEach(forwardChild)
        break
      }
      case 'awning': {
        const blocks = awning(item)
        blocks.forEach(forwardChild)
        break
      }
      case 'planterBox': {
        const blocks = planterBox(item)
        blocks.forEach(forwardChild)
        break
      }
      case 'crateStack': {
        const blocks = crateStack(item)
        blocks.forEach(forwardChild)
        break
      }
      case 'stoneTrim': {
        const blocks = stoneTrim(item)
        blocks.forEach(forwardChild)
        break
      }
      case 'doorFrame': {
        const blocks = doorFrame(item)
        blocks.forEach(forwardChild)
        break
      }
      default:
        expandedBlocks.push(item)
        break
    }
  }

  // 1. Process items in blocks
  const rawBlocks = mapData.blocks || []
  for (const b of rawBlocks) {
    processItem(b)
  }

  // 2. Process items in top-level macros if present
  if (Array.isArray(mapData.macros)) {
    for (const m of mapData.macros) {
      processItem(m)
    }
  }

  // 3. Decoration pass: applies stoneTrim and windowRow to every wall block tagged "facade": true
  const decoratedBlocks = applyDecorationPass(expandedBlocks)

  return {
    ...mapData,
    blocks: decoratedBlocks,
    ladders
  }
}
