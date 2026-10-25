/**
 * Rasterizes docs/map/bind.layout.json into a 120 x 112 1m cell grid.
 * Bounds: X [-60, 60] (width 120), Z [-56, 56] (height 112).
 */
export function rasterizeLayout(layout) {
  const [X0, X1] = layout.meta.bounds.x
  const [Z0, Z1] = layout.meta.bounds.z
  const W = X1 - X0
  const H = Z1 - Z0

  const walk = new Uint8Array(W * H)
  const hgt = new Float32Array(W * H)
  const tag = new Array(W * H).fill('')
  const regLevel = new Uint8Array(W * H)
  const isWindowCell = new Uint8Array(W * H)

  const ix = (x, z) => (z - Z0) * W + (x - X0)

  const forEachCell = (r, fn) => {
    for (let z = r[1]; z < r[3]; z++) {
      for (let x = r[0]; x < r[2]; x++) {
        fn(x, z)
      }
    }
  }

  // 1. Mark Windows first so they are not treated as solid wall blocks
  for (const w of layout.windows || []) {
    forEachCell(w.rect, (x, z) => {
      isWindowCell[ix(x, z)] = 1
    })
  }

  // 2. Regions (in array order; aHeaven overrides aSite)
  for (const r of layout.regions) {
    forEachCell(r.rect, (x, z) => {
      const i = ix(x, z)
      walk[i] = 1
      regLevel[i] = r.level || 0
      hgt[i] = r.level ? 3.5 : 0.0
      tag[i] = r.id
    })
  }

  // 3. Connectors (doorways carved out of solid wall gaps)
  for (const c of layout.connectors) {
    forEachCell(c.rect, (x, z) => {
      const i = ix(x, z)
      if (!walk[i]) {
        walk[i] = 1
        regLevel[i] = 0
        hgt[i] = 0.0
        tag[i] = c.id
      }
    })
  }

  // 4. Stairs (rising from levelFrom to levelTo)
  for (const s of layout.stairs) {
    const [x0, z0, x1, z1] = s.rect
    const d = s.ascendsToward
    const n = (d === 'west' || d === 'east') ? x1 - x0 : z1 - z0
    forEachCell(s.rect, (x, z) => {
      const t = { west: x1 - 1 - x, east: x - x0, north: z1 - 1 - z, south: z - z0 }[d]
      const i = ix(x, z)
      walk[i] = 1
      regLevel[i] = s.levelTo || 1
      hgt[i] = 3.5 * (t + 0.5) / n
      tag[i] = s.id
    })
  }

  // 5. Calculate wall top heights for all solid cells
  // Spec: Wall top above nearest floor is 6.0m (7.0m next to sites, 9.5m next to Level 1 plinths)
  const isSite = (t) => t === 'aSite' || t === 'bSite'
  const wallTop = new Float32Array(W * H)

  for (let z = 0; z < H; z++) {
    for (let x = 0; x < W; x++) {
      const i = z * W + x
      if (walk[i] || isWindowCell[i]) continue

      let maxTop = 6.0
      for (let dz = -2; dz <= 2; dz++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nx = x + dx
          const nz = z + dz
          if (nx < 0 || nz < 0 || nx >= W || nz >= H) continue
          const j = nz * W + nx
          if (walk[j]) {
            const floorY = regLevel[j] ? 3.5 : 0.0
            const top = floorY + (isSite(tag[j]) ? 7.0 : 6.0)
            if (top > maxTop) maxTop = top
          }
        }
      }
      wallTop[i] = maxTop
    }
  }

  return {
    X0, X1, Z0, Z1, W, H,
    walk,
    hgt,
    tag,
    regLevel,
    isWindowCell,
    wallTop,
    ix
  }
}
