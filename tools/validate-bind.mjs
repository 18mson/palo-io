// node tools/validate-bind.mjs [path/to/bind.layout.json]
// Checks the layout DATA (not the 3D scene). Exit code 1 on failure.
import fs from 'fs';
const file = process.argv[2] || 'docs/map/bind.layout.json';
const L = JSON.parse(fs.readFileSync(file, 'utf8'));
const [X0, X1] = L.meta.bounds.x, [Z0, Z1] = L.meta.bounds.z, W = X1 - X0, H = Z1 - Z0;
const LV = { 0: 0.0, 1: 3.5 };
const ix = (x, z) => (z - Z0) * W + (x - X0);
const walk = new Uint8Array(W * H), hgt = new Float32Array(W * H), tag = new Array(W * H).fill('');
let fails = 0; const fail = (m) => { fails++; console.log('  FAIL', m); }; const ok = (m) => console.log('  ok  ', m);
const cells = (r, f) => { for (let z = r[1]; z < r[3]; z++) for (let x = r[0]; x < r[2]; x++) f(x, z); };
for (const r of L.regions) cells(r.rect, (x, z) => { const i = ix(x, z); walk[i] = 1; hgt[i] = LV[r.level]; tag[i] = r.id; });
for (const c of L.connectors) cells(c.rect, (x, z) => { const i = ix(x, z); if (!walk[i]) { walk[i] = 1; hgt[i] = 0; tag[i] = c.id; } });
for (const s of L.stairs) {
  const [x0, z0, x1, z1] = s.rect, d = s.ascendsToward, n = (d === 'west' || d === 'east') ? x1 - x0 : z1 - z0;
  cells(s.rect, (x, z) => {
    const t = { west: x1 - 1 - x, east: x - x0, north: z1 - 1 - z, south: z - z0 }[d];
    const i = ix(x, z); walk[i] = 1; hgt[i] = 3.5 * (t + 0.5) / n; tag[i] = s.id;
  });
}
const blocked = new Uint8Array(W * H);
for (const p of L.props) cells(p.rect, (x, z) => { blocked[ix(x, z)] = 1; });
const free = (i) => walk[i] && !blocked[i];
console.log('[1] Grid snap (all rect values integers or .5)');
const snapBad = [...L.regions, ...L.connectors, ...L.stairs, ...L.props].filter(o => o.rect.some(v => Math.abs(v * 2 - Math.round(v * 2)) > 1e-9));
snapBad.length ? fail(snapBad.length + ' rects off the 0.5 grid') : ok('all rects snapped');
console.log('[2] Unintended overlaps / open shared edges between regions');
const regs = L.regions; let bad = 0;
for (let a = 0; a < regs.length; a++) for (let b = a + 1; b < regs.length; b++) {
  const A = regs[a].rect, B = regs[b].rect; const pair = [regs[a].id, regs[b].id].sort().join('|');
  if ((L.allowedTouch || []).includes(pair)) continue;
  const ox = Math.min(A[2], B[2]) - Math.max(A[0], B[0]), oz = Math.min(A[3], B[3]) - Math.max(A[1], B[1]);
  if ((ox > 0 && oz > 0) || (ox === 0 && oz > 0) || (oz === 0 && ox > 0)) { bad++; console.log('     ', pair, ox, oz); }
}
bad ? fail(bad + ' overlapping/touching region pairs not listed in allowedTouch') : ok('no unintended overlaps');
console.log('[3] Reachability from both spawns (1 m cells, step <= 1.0 m)');
const flood = (sx, sz) => {
  const seen = new Uint8Array(W * H), q = [ix(sx, sz)]; seen[q[0]] = 1;
  while (q.length) { const i = q.pop(), x = i % W, z = (i - x) / W;
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + dx, nz = z + dz;
      if (nx < 0 || nz < 0 || nx >= W || nz >= H) continue; const j = nz * W + nx;
      if (free(j) && !seen[j] && Math.abs(hgt[j] - hgt[i]) <= 1.0) { seen[j] = 1; q.push(j); } } }
  return seen;
};
const sa = L.spawns.points.attacker[0], sd = L.spawns.points.defender[0];
const fa = flood(sa[0] - X0 + X0, sa[1]), fd = flood(sd[0], sd[1]);
let unreach = [];
for (const r of regs) { let a = false, d = false; cells(r.rect, (x, z) => { const i = ix(x, z); if (free(i) && fa[i]) a = true; if (free(i) && fd[i]) d = true; });
  if (!(a && d)) unreach.push(r.id); }
unreach.length ? fail('unreachable regions: ' + unreach.join(', ')) : ok('all ' + regs.length + ' regions reachable from both spawns');
console.log('[4] Stairs connect two real surfaces');
for (const s of L.stairs) { const [x0, z0, x1, z1] = s.rect, d = s.ascendsToward; let lo = 0, hi = 0;
  const step = { west: [1, 0], east: [-1, 0], north: [0, 1], south: [0, -1] }[d]; // from high end outward = +step? (dir away from high end)
  // low-end neighbors are the cells just outside the low edge; high-end neighbors just outside the high edge
  const edge = (lowEnd) => { const out = []; cells(s.rect, (x, z) => { const t = { west: x1 - 1 - x, east: x - x0, north: z1 - 1 - z, south: z - z0 }[d]; const n = (d === 'west' || d === 'east') ? x1 - x0 : z1 - z0;
      if ((lowEnd && t === 0) || (!lowEnd && t === n - 1)) { const dir = { west: [lowEnd ? 1 : -1, 0], east: [lowEnd ? -1 : 1, 0], north: [0, lowEnd ? 1 : -1], south: [0, lowEnd ? -1 : 1] }[d]; out.push([x + dir[0], z + dir[1]]); } }); return out; };
  const surf = (pts, targetH) => pts.some(([x, z]) => { const i = ix(x, z); return walk[i] && !tag[i].startsWith('st_') && Math.abs(hgt[i] - targetH) < 0.2; });
  const okLow = surf(edge(true), s.levelFrom ? 3.5 : 0), okHigh = surf(edge(false), s.levelTo ? 3.5 : 0);
  (okLow && okHigh) ? ok(s.id + ' connected (low end L' + s.levelFrom + ' -> high end L' + s.levelTo + ')') : fail(s.id + ' disconnected (lowOK=' + okLow + ', highOK=' + okHigh + ')'); }
console.log('[5] Lane length (longest unobstructed straight run, excluding spawn rows)');
let maxLane = 0, worst = null; const skip = new Set(['attackerSpawn', 'aSpawnExit', 'bSpawnExit', 'defenderSpawn', 'dsExitW', 'dsExitE', 'c_as_ase', 'c_ase_al', 'c_as_bse', 'c_bse_bl', 'c_ds_dsew', 'c_ds_dsee', 'c_dsew_aexit', 'c_dsee_bexit']);
for (const axis of ['z', 'x']) { const A = axis === 'z' ? W : H, B = axis === 'z' ? H : W;
  for (let k = 0; k < A; k++) { let run = 0, start = 0;
    for (let m = 0; m <= B; m++) { const i = m < B ? (axis === 'z' ? m * W + k : k * W + m) : -1; const v = i >= 0 && free(i) && !skip.has(tag[i]);
      if (v) { if (!run) start = m; run++; } else { if (run > maxLane) { maxLane = run; worst = { axis, k, start, run }; } run = 0; } } } }
maxLane <= (L.stats.maxCombatLaneMeters + 4) ? ok('max lane ' + maxLane + ' m (limit ' + (L.stats.maxCombatLaneMeters + 4) + ')') : fail('lane too long: ' + JSON.stringify(worst));
console.log('[6] Open-space density (walkable cells > 6 m from any wall)');
let far = 0, tot = 0; for (let z = 0; z < H; z++) for (let x = 0; x < W; x++) { const i = z * W + x; if (!walk[i]) continue; tot++; let near = false;
  for (let dz = -6; dz <= 6 && !near; dz++) for (let dx = -6; dx <= 6; dx++) { if (dx * dx + dz * dz > 36) continue; const nx = x + dx, nz = z + dz;
    if (nx < 0 || nz < 0 || nx >= W || nz >= H || !walk[nz * W + nx]) { near = true; break; } } if (!near) far++; }
const pct = far / tot * 100; pct <= 8 ? ok(pct.toFixed(1) + '% (limit 8%)') : fail(pct.toFixed(1) + '% > 8%');
console.log(fails ? '\nRESULT: FAILED (' + fails + ')' : '\nRESULT: PASSED'); process.exit(fails ? 1 : 0);
