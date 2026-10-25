import { rasterizeLayout } from './rasterize.js'

/**
 * Builds all 3D bounding boxes from the rasterized grid and blueprint layout.
 * Returns: { wallBoxes, floorBoxes, lintelBoxes, stairBoxes, propBoxes, windowBoxes, railBoxes, roofBoxes, plantBoxes, teleporterBoxes, allColliders }
 */
export function buildMapBoxes(layout) {
  const {
    X0, X1, Z0, Z1, W, H,
    walk, hgt, tag, regLevel, isWindowCell, wallTop
  } = rasterizeLayout(layout)

  const wallBoxes = []
  const floorBoxes = []
  const lintelBoxes = []
  const stairBoxes = []
  const propBoxes = []
  const windowBoxes = []
  const railBoxes = []
  const roofBoxes = []
  const plantBoxes = []
  const teleporterBoxes = []

  // ── 1. Greedy-merge solid wall cells into rectangular boxes ───────────
  const visited = new Uint8Array(W * H)

  for (let z = 0; z < H; z++) {
    for (let x = 0; x < W; x++) {
      const i = z * W + x
      // Skip walkable cells, window openings, or already merged cells
      if (walk[i] || isWindowCell[i] || visited[i]) continue

      const top = wallTop[i]

      // Find max run along X
      let w = 1
      while (
        x + w < W &&
        !walk[z * W + (x + w)] &&
        !isWindowCell[z * W + (x + w)] &&
        !visited[z * W + (x + w)] &&
        wallTop[z * W + (x + w)] === top
      ) {
        w++
      }

      // Find max run along Z
      let h = 1
      let canExpand = true
      while (z + h < H && canExpand) {
        for (let dx = 0; dx < w; dx++) {
          const idx = (z + h) * W + (x + dx)
          if (
            walk[idx] ||
            isWindowCell[idx] ||
            visited[idx] ||
            wallTop[idx] !== top
          ) {
            canExpand = false
            break
          }
        }
        if (canExpand) h++
      }

      // Mark visited
      for (let dz = 0; dz < h; dz++) {
        for (let dx = 0; dx < w; dx++) {
          visited[(z + dz) * W + (x + dx)] = 1
        }
      }

      wallBoxes.push({
        minX: X0 + x,
        maxX: X0 + x + w,
        minZ: Z0 + z,
        maxZ: Z0 + z + h,
        bottomY: 0,
        topY: top,
        type: 'wall'
      })
    }
  }

  // ── 2. Windows (Sill and Head lintel, open in between) ─────────────────
  for (const win of layout.windows || []) {
    const floorY = win.floorLevel ? 3.5 : 0.0
    const sillY = floorY + win.sillAboveFloor
    const headY = floorY + win.headAboveFloor
    const [x0, z0, x1, z1] = win.rect

    // Sill box (under window opening)
    windowBoxes.push({
      minX: x0,
      maxX: x1,
      minZ: z0,
      maxZ: z1,
      bottomY: 0,
      topY: sillY,
      type: 'window_sill',
      id: win.id
    })

    // Head / lintel box (above window opening up to wall top 9.5m)
    windowBoxes.push({
      minX: x0,
      maxX: x1,
      minZ: z0,
      maxZ: z1,
      bottomY: headY,
      topY: 9.5,
      type: 'window_head',
      id: win.id
    })
  }

  // ── 3. Floor Slabs & Plinths ──────────────────────────────────────────
  for (const r of layout.regions) {
    const [x0, z0, x1, z1] = r.rect
    if (r.level === 1) {
      // Solid plinth from y = -0.5 up to floorY = 3.5
      floorBoxes.push({
        minX: x0,
        maxX: x1,
        minZ: z0,
        maxZ: z1,
        bottomY: -0.5,
        topY: 3.5,
        type: 'floorL1',
        id: r.id
      })
    } else {
      // Level 0 slab
      floorBoxes.push({
        minX: x0,
        maxX: x1,
        minZ: z0,
        maxZ: z1,
        bottomY: -0.5,
        topY: 0.0,
        type: 'floorL0',
        id: r.id
      })
    }
  }

  // Connector floors
  for (const c of layout.connectors) {
    const [x0, z0, x1, z1] = c.rect
    floorBoxes.push({
      minX: x0,
      maxX: x1,
      minZ: z0,
      maxZ: z1,
      bottomY: -0.5,
      topY: 0.0,
      type: 'floorL0',
      id: c.id
    })
  }

  // ── 4. Connector Door Lintels ──────────────────────────────────────────
  // Door opening is 4.0m high, lintel sits above it up to wallTop (6.0m or 7.0m)
  for (const c of layout.connectors) {
    const [x0, z0, x1, z1] = c.rect
    const isNearSite = (c.between || []).some(id => id === 'aSite' || id === 'bSite')
    const lintelTop = isNearSite ? 7.0 : 6.0
    lintelBoxes.push({
      minX: x0,
      maxX: x1,
      minZ: z0,
      maxZ: z1,
      bottomY: 4.0,
      topY: lintelTop,
      type: 'lintel',
      id: c.id
    })
  }

  // ── 5. Stairs (2 steps per meter, rise <= 0.35m per step) ──────────────
  for (const s of layout.stairs) {
    const [x0, z0, x1, z1] = s.rect
    const d = s.ascendsToward
    const isXAxis = (d === 'west' || d === 'east')
    const n = isXAxis ? (x1 - x0) : (z1 - z0)
    const totalSteps = 2 * n
    const risePerStep = 3.5 / totalSteps

    for (let k = 0; k < totalSteps; k++) {
      let stepMinX = x0, stepMaxX = x1
      let stepMinZ = z0, stepMaxZ = z1
      const stepTop = (k + 1) * risePerStep

      if (d === 'west') {
        // High at west (x0), low at east (x1)
        stepMaxX = x1 - k * 0.5
        stepMinX = stepMaxX - 0.5
      } else if (d === 'east') {
        // High at east (x1), low at west (x0)
        stepMinX = x0 + k * 0.5
        stepMaxX = stepMinX + 0.5
      } else if (d === 'north') {
        // High at north (z0), low at south (z1)
        stepMaxZ = z1 - k * 0.5
        stepMinZ = stepMaxZ - 0.5
      } else if (d === 'south') {
        // High at south (z1), low at north (z0)
        stepMinZ = z0 + k * 0.5
        stepMaxZ = stepMinZ + 0.5
      }

      stairBoxes.push({
        minX: stepMinX,
        maxX: stepMaxX,
        minZ: stepMinZ,
        maxZ: stepMaxZ,
        bottomY: 0,
        topY: stepTop,
        type: 'stair',
        id: s.id
      })
    }

    // Long-edge stair rails (1.0m height, 0.25m thick)
    if (isXAxis) {
      // Long edges are north (z0) and south (z1)
      railBoxes.push({
        minX: x0,
        maxX: x1,
        minZ: z0,
        maxZ: z0 + 0.25,
        bottomY: 0,
        topY: 4.5,
        type: 'rail',
        id: `${s.id}_railN`
      })
      railBoxes.push({
        minX: x0,
        maxX: x1,
        minZ: z1 - 0.25,
        maxZ: z1,
        bottomY: 0,
        topY: 4.5,
        type: 'rail',
        id: `${s.id}_railS`
      })
    } else {
      // Long edges are west (x0) and east (x1)
      railBoxes.push({
        minX: x0,
        maxX: x0 + 0.25,
        minZ: z0,
        maxZ: z1,
        bottomY: 0,
        topY: 4.5,
        type: 'rail',
        id: `${s.id}_railW`
      })
      railBoxes.push({
        minX: x1 - 0.25,
        maxX: x1,
        minZ: z0,
        maxZ: z1,
        bottomY: 0,
        topY: 4.5,
        type: 'rail',
        id: `${s.id}_railE`
      })
    }
  }

  // ── 6. Level 1 Open-edge Rails (aHeaven & bHookah) ─────────────────────
  // aHeaven open edges facing A Site:
  railBoxes.push({
    minX: -52,
    maxX: -44,
    minZ: -14.25,
    maxZ: -14,
    bottomY: 3.5,
    topY: 4.5,
    type: 'rail',
    id: 'aHeaven_railS'
  })
  railBoxes.push({
    minX: -44.25,
    maxX: -44,
    minZ: -17,
    maxZ: -14,
    bottomY: 3.5,
    topY: 4.5,
    type: 'rail',
    id: 'aHeaven_railE'
  })

  // bHookah open edges:
  railBoxes.push({
    minX: 24,
    maxX: 28,
    minZ: 3.75,
    maxZ: 4,
    bottomY: 3.5,
    topY: 4.5,
    type: 'rail',
    id: 'bHookah_railSW'
  })
  railBoxes.push({
    minX: 32,
    maxX: 34,
    minZ: 3.75,
    maxZ: 4,
    bottomY: 3.5,
    topY: 4.5,
    type: 'rail',
    id: 'bHookah_railSE'
  })
  railBoxes.push({
    minX: 33.75,
    maxX: 34,
    minZ: 3,
    maxZ: 4,
    bottomY: 3.5,
    topY: 4.5,
    type: 'rail',
    id: 'bHookah_railE1'
  })
  railBoxes.push({
    minX: 33.75,
    maxX: 34,
    minZ: -2,
    maxZ: 0,
    bottomY: 3.5,
    topY: 4.5,
    type: 'rail',
    id: 'bHookah_railE2'
  })

  // ── 7. Props (Crates, Containers, Pillars, Fountains, Planters, Stalls) ─
  for (const p of layout.props || []) {
    const [x0, z0, x1, z1] = p.rect
    const midX = Math.floor((x0 + x1) * 0.5)
    const midZ = Math.floor((z0 + z1) * 0.5)
    const cellIdx = (midZ - Z0) * W + (midX - X0)
    const floorY = (cellIdx >= 0 && cellIdx < W * H) ? (regLevel[cellIdx] ? 3.5 : 0.0) : 0.0

    propBoxes.push({
      minX: x0,
      maxX: x1,
      minZ: z0,
      maxZ: z1,
      bottomY: floorY,
      topY: floorY + p.height,
      type: 'prop',
      propType: p.type,
      id: p.id
    })
  }

  // ── 8. Roofs & Eaves ──────────────────────────────────────────────────
  const regMap = new Map()
  for (const r of layout.regions) regMap.set(r.id, r)

  for (const id of layout.roofedRegions || []) {
    const r = regMap.get(id)
    if (!r) continue
    const [x0, z0, x1, z1] = r.rect
    const floorY = r.level ? 3.5 : 0.0
    roofBoxes.push({
      minX: x0,
      maxX: x1,
      minZ: z0,
      maxZ: z1,
      bottomY: floorY + 5.0,
      topY: floorY + 5.5,
      type: 'roof',
      id: `roof_${id}`
    })
  }

  // Partial roofs (4m perimeter eave strips)
  for (const id of layout.partialRoofRegions || []) {
    const r = regMap.get(id)
    if (!r) continue
    const [x0, z0, x1, z1] = r.rect
    const floorY = r.level ? 3.5 : 0.0
    const topY = floorY + 5.5
    const botY = floorY + 5.0

    // North eave
    roofBoxes.push({ minX: x0, maxX: x1, minZ: z0, maxZ: z0 + 4, bottomY: botY, topY, type: 'roof', id: `eave_n_${id}` })
    // South eave
    roofBoxes.push({ minX: x0, maxX: x1, minZ: z1 - 4, maxZ: z1, bottomY: botY, topY, type: 'roof', id: `eave_s_${id}` })
    // West eave
    roofBoxes.push({ minX: x0, maxX: x0 + 4, minZ: z0 + 4, maxZ: z1 - 4, bottomY: botY, topY, type: 'roof', id: `eave_w_${id}` })
    // East eave
    roofBoxes.push({ minX: x1 - 4, maxX: x1, minZ: z0 + 4, maxZ: z1 - 4, bottomY: botY, topY, type: 'roof', id: `eave_e_${id}` })
  }

  // ── 9. Plant Zones (Decorative floor markers) ──────────────────────────
  if (layout.plantZones) {
    const pzA = layout.plantZones.A || layout.plantZones.a
    if (pzA) {
      const [x0, z0, x1, z1] = pzA
      plantBoxes.push({ minX: x0, maxX: x1, minZ: z0, maxZ: z1, bottomY: 0, topY: 0.02, site: 'A' })
    }
    const pzB = layout.plantZones.B || layout.plantZones.b
    if (pzB) {
      const [x0, z0, x1, z1] = pzB
      plantBoxes.push({ minX: x0, maxX: x1, minZ: z0, maxZ: z1, bottomY: 0, topY: 0.02, site: 'B' })
    }
  }

  // ── 10. Teleporters (Entry & Exit pads) ────────────────────────────────
  for (const tp of layout.teleporters || []) {
    const [enX0, enZ0, enX1, enZ1] = tp.entryPad
    teleporterBoxes.push({
      minX: enX0,
      maxX: enX1,
      minZ: enZ0,
      maxZ: enZ1,
      bottomY: 0,
      topY: 0.05,
      type: 'tp_entry',
      id: tp.id,
      tp
    })

    const [exX0, exZ0, exX1, exZ1] = tp.exitPad
    teleporterBoxes.push({
      minX: exX0,
      maxX: exX1,
      minZ: exZ0,
      maxZ: exZ1,
      bottomY: 0,
      topY: 0.05,
      type: 'tp_exit',
      id: tp.id,
      tp
    })
  }

  // ── Colliders collection (all solid, physically obstacle geometry) ─────
  // Walls, floor plinths, lintels, stairs, props, rails, window sills/heads
  const allColliders = [
    ...wallBoxes,
    ...lintelBoxes,
    ...windowBoxes,
    ...stairBoxes,
    ...propBoxes,
    ...railBoxes
  ]

  return {
    wallBoxes,
    floorBoxes,
    lintelBoxes,
    stairBoxes,
    propBoxes,
    windowBoxes,
    railBoxes,
    roofBoxes,
    plantBoxes,
    teleporterBoxes,
    allColliders
  }
}
