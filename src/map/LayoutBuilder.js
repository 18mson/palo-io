/**
 * src/map/LayoutBuilder.js
 *
 * Compiles a 2D/2.5D chunk layout JSON (e.g. chunk_C.json) into competitive 0.5m-aligned
 * 3D voxel blocks conforming to Palo-IO map specification.
 *
 * Rules:
 *  - Structural blocks (with collision) must have all numeric properties as multiples of 0.5m.
 *  - Decorative blocks (decor: true) must be multiples of 0.1m and emit no colliders.
 *  - All generated blocks are marked source: "layout".
 *  - All walls have carved doorways with solid lintels above.
 *  - Lowered courts (-1) have sunken floors and stair connections.
 *  - Platforms have underlying foundations and 1m railings.
 *  - Bridges have abutment supports and railings.
 */

/**
 * Utility: Carve a 1D wall interval [p0, p1] with doors.
 * Returns an array of solid segments and lintels.
 */
function carveWallInterval(p0, p1, doors, orthCenter, axis, wallThick, wallHeight, wallType, baseId) {
  const blocks = []
  const minP = Math.min(p0, p1)
  const maxP = Math.max(p0, p1)
  const totalLen = maxP - minP

  if (totalLen <= 0) return blocks

  // Sort doors along the wall axis
  const validDoors = []
  for (const d of (doors || [])) {
    const w = Math.max(2.0, Math.round(d.w || 2.0))
    const halfW = w / 2
    // Snap door center so door cut endpoints differ from minP by integers
    const targetK = Math.round(d.at - minP - halfW)
    const minK = 0
    const maxK = totalLen - w
    const k = Math.max(minK, Math.min(maxK, targetK))
    const at = minP + halfW + k
    const start = at - halfW
    const end = at + halfW

    if (start >= minP && end <= maxP) {
      validDoors.push({ at, w, start, end })
    }
  }

  validDoors.sort((a, b) => a.start - b.start)

  // Emit solid segments between doors
  let cur = minP
  let segIdx = 0

  for (const vd of validDoors) {
    if (vd.start > cur) {
      const segLen = vd.start - cur
      const segCenter = cur + segLen / 2
      blocks.push({
        id: `${baseId}_seg_${segIdx++}`,
        source: 'layout',
        x: axis === 'x' ? segCenter : orthCenter,
        y: wallHeight / 2,
        z: axis === 'z' ? segCenter : orthCenter,
        w: axis === 'x' ? segLen : wallThick,
        h: wallHeight,
        d: axis === 'z' ? segLen : wallThick,
        type: wallType,
        facade: true
      })
    }

    // Door lintel above the opening (y in [3, 5], h = 2.0, y = 4.0)
    const lintelH = Math.max(1.0, wallHeight - 3.0)
    const lintelY = 3.0 + lintelH / 2
    blocks.push({
      id: `${baseId}_lintel_${segIdx++}`,
      source: 'layout',
      x: axis === 'x' ? vd.at : orthCenter,
      y: lintelY,
      z: axis === 'z' ? vd.at : orthCenter,
      w: axis === 'x' ? vd.w : wallThick,
      h: lintelH,
      d: axis === 'z' ? vd.w : wallThick,
      type: wallType,
      facade: true
    })

    cur = vd.end
  }

  // Final trailing solid segment
  if (cur < maxP) {
    const segLen = maxP - cur
    const segCenter = cur + segLen / 2
    blocks.push({
      id: `${baseId}_seg_${segIdx++}`,
      source: 'layout',
      x: axis === 'x' ? segCenter : orthCenter,
      y: wallHeight / 2,
      z: axis === 'z' ? segCenter : orthCenter,
      w: axis === 'x' ? segLen : wallThick,
      h: wallHeight,
      d: axis === 'z' ? segLen : wallThick,
      type: wallType,
      facade: true
    })
  }

  return blocks
}

/**
 * Build 3D map blocks from chunk layout definition
 */
export function buildChunk(layout) {
  const blocks = []

  // ── 1. Rooms (Outlines with doors + Interior floors) ─────────
  for (const r of (layout.rooms || [])) {
    const rx0 = r.x0, rx1 = r.x1
    const rz0 = r.z0, rz1 = r.z1
    const wallThick = r.wall || 1.0
    const wallH = r.height || 5.0
    const wallType = r.wallType || 'wall'
    const rid = r.id || 'room'

    const doorsN = (r.doors || []).filter(d => d.side === 'N')
    const doorsS = (r.doors || []).filter(d => d.side === 'S')
    const doorsW = (r.doors || []).filter(d => d.side === 'W')
    const doorsE = (r.doors || []).filter(d => d.side === 'E')

    // North wall: spans full x in [rx0, rx1] at z = rz0 + wallThick/2
    blocks.push(...carveWallInterval(rx0, rx1, doorsN, rz0 + wallThick / 2, 'x', wallThick, wallH, wallType, `${rid}_wall_n`))

    // South wall: spans full x in [rx0, rx1] at z = rz1 - wallThick/2
    blocks.push(...carveWallInterval(rx0, rx1, doorsS, rz1 - wallThick / 2, 'x', wallThick, wallH, wallType, `${rid}_wall_s`))

    // West wall: spans z in [rz0 + wallThick, rz1 - wallThick] at x = rx0 + wallThick/2
    blocks.push(...carveWallInterval(rz0 + wallThick, rz1 - wallThick, doorsW, rx0 + wallThick / 2, 'z', wallThick, wallH, wallType, `${rid}_wall_w`))

    // East wall: spans z in [rz0 + wallThick, rz1 - wallThick] at x = rx1 - wallThick/2
    blocks.push(...carveWallInterval(rz0 + wallThick, rz1 - wallThick, doorsE, rx1 - wallThick / 2, 'z', wallThick, wallH, wallType, `${rid}_wall_e`))

    // Interior floor
    const innerW = (rx1 - wallThick) - (rx0 + wallThick)
    const innerD = (rz1 - wallThick) - (rz0 + wallThick)
    if (innerW > 0 && innerD > 0) {
      const floorMat = r.floor === 'wood' ? 'pagoda_wood' : (r.floor === 'tile' ? 'accent_stone' : 'cobble')
      blocks.push({
        id: `${rid}_floor`,
        source: 'layout',
        x: (rx0 + wallThick + rx1 - wallThick) / 2,
        y: -0.5,
        z: (rz0 + wallThick + rz1 - wallThick) / 2,
        w: innerW,
        h: 1.0,
        d: innerD,
        type: floorMat
      })
    }
  }

  // ── 2. Standalone Ribbons ────────────────────────────────────
  for (const rb of (layout.ribbons || [])) {
    const fromX = rb.from[0], fromZ = rb.from[1]
    const toX = rb.to[0], toZ = rb.to[1]
    const wallThick = rb.wall || 1.0
    const wallH = rb.height || 5.0
    const wallType = rb.type || 'wall'
    const rbid = rb.id || 'ribbon'
    const isAxisX = Math.abs(toX - fromX) >= Math.abs(toZ - fromZ)

    if (isAxisX) {
      blocks.push(...carveWallInterval(fromX, toX, rb.doors, fromZ, 'x', wallThick, wallH, wallType, rbid))
    } else {
      blocks.push(...carveWallInterval(fromZ, toZ, rb.doors, fromX, 'z', wallThick, wallH, wallType, rbid))
    }
  }

  // ── 3. Lowered Courts (Level -1) ─────────────────────────────
  for (const c of (layout.openCourts || [])) {
    if (c.level === -1) {
      const cid = c.id || 'lowered_court'
      const w = c.x1 - c.x0
      const d = c.z1 - c.z0
      const cx = (c.x0 + c.x1) / 2
      const cz = (c.z0 + c.z1) / 2
      const floorMat = c.floor === 'dark_tile' ? 'accent_stone' : 'cobble'

      // Sunken pavement floor at top = -1.0 (y = -1.5, h = 1.0)
      // Sliced into North landing (depth 3), Center, South landing (depth 3)
      if (d > 6.0) {
        const northLandingD = 3.0
        const southLandingD = 3.0
        const centerD = d - northLandingD - southLandingD

        blocks.push({
          id: `${cid}_floor_landing_n`,
          source: 'layout',
          x: cx,
          y: -1.5,
          z: c.z0 + northLandingD / 2,
          w,
          h: 1.0,
          d: northLandingD,
          type: floorMat
        })
        blocks.push({
          id: `${cid}_floor_main`,
          source: 'layout',
          x: cx,
          y: -1.5,
          z: c.z0 + northLandingD + centerD / 2,
          w,
          h: 1.0,
          d: centerD,
          type: floorMat
        })
        blocks.push({
          id: `${cid}_floor_landing_s`,
          source: 'layout',
          x: cx,
          y: -1.5,
          z: c.z1 - southLandingD / 2,
          w,
          h: 1.0,
          d: southLandingD,
          type: floorMat
        })
      } else {
        blocks.push({
          id: `${cid}_floor`,
          source: 'layout',
          x: cx,
          y: -1.5,
          z: cz,
          w,
          h: 1.0,
          d,
          type: floorMat
        })
      }
    } else {
      // Level 0 court floor (for courts with distinctive materials like dark_tile)
      if (c.floor === 'dark_tile') {
        const cid = c.id || 'court'
        const w = c.x1 - c.x0
        const d = c.z1 - c.z0
        blocks.push({
          id: `${cid}_floor`,
          source: 'layout',
          x: (c.x0 + c.x1) / 2,
          y: -0.5,
          z: (c.z0 + c.z1) / 2,
          w,
          h: 1.0,
          d,
          type: 'accent_stone'
        })
      }
    }
  }

  // ── 4. Platforms (Deck + Foundation support + 1m Railings) ───
  for (const p of (layout.platforms || [])) {
    const pid = p.id || 'platform'
    const w = p.x1 - p.x0
    const d = p.z1 - p.z0
    const cx = (p.x0 + p.x1) / 2
    const cz = (p.z0 + p.z1) / 2

    // Level 1 deck (top = 2.0, y = 1.5, h = 1.0)
    blocks.push({
      id: `${pid}_deck`,
      source: 'layout',
      x: cx,
      y: 1.5,
      z: cz,
      w,
      h: 1.0,
      d,
      type: 'accent_stone'
    })

    // Foundation support underneath (y = 0.5, h = 1.0, top = 1.0, bottom = 0.0)
    blocks.push({
      id: `${pid}_support`,
      source: 'layout',
      x: cx,
      y: 0.5,
      z: cz,
      w,
      h: 1.0,
      d,
      type: 'accent_stone'
    })

    // 1m Railings along edges
    if (p.rail) {
      // North & South rails
      blocks.push({
        id: `${pid}_rail_n`,
        source: 'layout',
        x: cx,
        y: 2.5,
        z: p.z0 + 0.5,
        w,
        h: 1.0,
        d: 1.0,
        type: 'accent_stone',
        decor: true,
        noCollision: true
      })
      blocks.push({
        id: `${pid}_rail_s`,
        source: 'layout',
        x: cx,
        y: 2.5,
        z: p.z1 - 0.5,
        w,
        h: 1.0,
        d: 1.0,
        type: 'accent_stone',
        decor: true,
        noCollision: true
      })
    }
  }

  // ── 5. Bridges (Deck + Abutments + Side Railings) ─────────────
  for (const br of (layout.bridges || [])) {
    const brid = br.id || 'bridge'
    const w = br.x1 - br.x0
    const d = br.z1 - br.z0
    const cx = (br.x0 + br.x1) / 2
    const cz = (br.z0 + br.z1) / 2
    const mat = br.material === 'wood' ? 'pagoda_wood' : 'accent_stone'

    // Bridge deck (y = 1.5, h = 1.0, top = 2.0)
    blocks.push({
      id: `${brid}_deck`,
      source: 'layout',
      x: cx,
      y: 1.5,
      z: cz,
      w,
      h: 1.0,
      d,
      type: mat
    })

    // Abutment supports on West & East ends (y = 0.5, h = 1.0)
    blocks.push({
      id: `${brid}_support_w`,
      source: 'layout',
      x: br.x0 + 0.5,
      y: 0.5,
      z: cz,
      w: 1.0,
      h: 1.0,
      d,
      type: 'accent_stone'
    })
    blocks.push({
      id: `${brid}_support_e`,
      source: 'layout',
      x: br.x1 - 0.5,
      y: 0.5,
      z: cz,
      w: 1.0,
      h: 1.0,
      d,
      type: 'accent_stone'
    })

    // 1m Side railings on North and South
    if (br.rail) {
      blocks.push({
        id: `${brid}_rail_n`,
        source: 'layout',
        x: cx,
        y: 2.5,
        z: br.z0 + 0.5,
        w,
        h: 1.0,
        d: 1.0,
        type: 'pagoda_wood',
        decor: true,
        noCollision: true
      })
      blocks.push({
        id: `${brid}_rail_s`,
        source: 'layout',
        x: cx,
        y: 2.5,
        z: br.z1 - 0.5,
        w,
        h: 1.0,
        d: 1.0,
        type: 'pagoda_wood',
        decor: true,
        noCollision: true
      })
    }
  }

  // ── 6. Water Bodies ──────────────────────────────────────────
  for (const wt of (layout.water || [])) {
    const wtid = wt.id || 'water'
    const w = wt.x1 - wt.x0
    const d = wt.z1 - wt.z0
    blocks.push({
      id: `${wtid}_surface`,
      source: 'layout',
      x: (wt.x0 + wt.x1) / 2,
      y: -0.5,
      z: (wt.z0 + wt.z1) / 2,
      w,
      h: 1.0,
      d,
      type: 'water',
      noCollision: true
    })
  }

  // ── 7. Stairs ────────────────────────────────────────────────
  const levelToY = lvl => (lvl === -1 ? -1.0 : (lvl === 0.5 ? 1.0 : lvl * 2.0))

  for (const st of (layout.stairs || [])) {
    const stid = st.id || 'stairs'
    const fromX = st.from[0], fromZ = st.from[1]
    const toX = st.to[0], toZ = st.to[1]
    const width = st.width || 2.0
    const isAxisX = Math.abs(toX - fromX) >= Math.abs(toZ - fromZ)

    if (isAxisX) {
      const minX = Math.min(fromX, toX)
      const maxX = Math.max(fromX, toX)
      const minZ = fromZ - width / 2
      const maxZ = fromZ + width / 2
      const startY = fromX < toX ? levelToY(st.levelFrom) : levelToY(st.levelTo)
      const endY = fromX < toX ? levelToY(st.levelTo) : levelToY(st.levelFrom)

      blocks.push({
        macro: 'stairs',
        id: stid,
        source: 'layout',
        axis: 'x',
        minX,
        maxX,
        minZ,
        maxZ,
        startY,
        endY,
        steps: 5,
        type: 'accent_stone'
      })
    } else {
      const minZ = Math.min(fromZ, toZ)
      const maxZ = Math.max(fromZ, toZ)
      const minX = fromX - width / 2
      const maxX = fromX + width / 2
      const startY = fromZ < toZ ? levelToY(st.levelFrom) : levelToY(st.levelTo)
      const endY = fromZ < toZ ? levelToY(st.levelTo) : levelToY(st.levelFrom)

      blocks.push({
        macro: 'stairs',
        id: stid,
        source: 'layout',
        axis: 'z',
        minX,
        maxX,
        minZ,
        maxZ,
        startY,
        endY,
        steps: 5,
        type: 'accent_stone'
      })
    }
  }

  // ── 8. Foliage & Crates ──────────────────────────────────────
  for (const f of (layout.foliage || [])) {
    const fid = f.id || 'foliage'
    if (f.type === 'planter') {
      blocks.push({
        id: `${fid}_base`,
        source: 'layout',
        x: f.x,
        y: 0.5,
        z: f.z,
        w: f.w || 1.0,
        h: 1.0,
        d: f.d || 3.0,
        type: 'accent_stone'
      })
    } else if (f.type === 'tree') {
      // Tree trunk & canopy
      blocks.push({
        id: `${fid}_trunk`,
        source: 'layout',
        x: f.x,
        y: 1.5,
        z: f.z,
        w: 1.0,
        h: 3.0,
        d: 1.0,
        type: 'pagoda_wood'
      })
      blocks.push({
        id: `${fid}_leaves`,
        source: 'layout',
        x: f.x,
        y: 3.5,
        z: f.z,
        w: 3.0,
        h: 2.0,
        d: 3.0,
        type: 'accent_stone',
        decor: true,
        noCollision: true,
        floatOK: true
      })
    }
  }

  for (const cr of (layout.crates || [])) {
    const crid = cr.id || 'crate'
    const w = cr.w || 2.0
    const h = cr.h || 2.0
    const d = cr.d || 2.0
    const type = cr.type === 'radianite' ? 'brick' : 'pagoda_wood'
    blocks.push({
      id: crid,
      source: 'layout',
      x: cr.x,
      y: h / 2,
      z: cr.z,
      w,
      h,
      d,
      type
    })
  }

  return blocks
}
