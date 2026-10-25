// tools/validate-scene.mjs
// Scene validator for the Bind map ("Tide Market").
// Loads built boxes (same code path as the game, headless) and verifies 3D scene physics & topology.
// Exit code 1 on failure.

import fs from 'fs';
import path from 'path';
import * as THREE from 'three';
import { buildMapBoxes } from '../src/map/bind/boxes.js';
import { BindCollision } from '../src/map/bind/collision.js';
import { rasterizeLayout } from '../src/map/bind/rasterize.js';

const layoutFile = process.argv[2] || 'docs/map/bind.layout.json';
if (!fs.existsSync(layoutFile)) {
  console.error(`Error: layout file not found at ${layoutFile}`);
  process.exit(1);
}

const layout = JSON.parse(fs.readFileSync(layoutFile, 'utf8'));
const boxes = buildMapBoxes(layout);
const collision = new BindCollision(boxes.allColliders);

let fails = 0;
const fail = (m) => { fails++; console.log('  FAIL', m); };
const ok = (m) => console.log('  ok  ', m);

console.log('===============================================================');
console.log('                 Bind Map Scene Validator (P4)                 ');
console.log('===============================================================');

// ── Check (a): Floating pieces check ──────────────────────────────────────────
// A non-floor box has its bottom above y=0.15 and no other box or wall touches
// or overlaps it from below (floating piece). Report box id, type, position.
console.log('[1] Floating pieces check (bottom > 0.15 m supported from below)');

const allBoxes = [
  ...boxes.wallBoxes,
  ...boxes.floorBoxes,
  ...boxes.lintelBoxes,
  ...boxes.windowBoxes,
  ...boxes.stairBoxes,
  ...boxes.propBoxes,
  ...boxes.railBoxes,
  ...boxes.roofBoxes
];

const highBoxes = allBoxes.filter(b => !b.type?.startsWith('floor') && b.bottomY > 0.15);
const floatingBoxes = [];

for (const a of highBoxes) {
  // Check if any other box or wall touches or overlaps it from below
  const supported = allBoxes.some(b => {
    if (b === a) return false;
    // Check horizontal touch or overlap
    const touchX = (b.minX <= a.maxX && b.maxX >= a.minX);
    const touchZ = (b.minZ <= a.maxZ && b.maxZ >= a.minZ);
    if (!touchX || !touchZ) return false;
    // Touches or overlaps from below: b.bottomY < a.bottomY and b.topY >= a.bottomY - 0.05
    return (b.bottomY < a.bottomY && b.topY >= a.bottomY - 0.05);
  });

  if (!supported) {
    floatingBoxes.push(a);
  }
}

if (floatingBoxes.length > 0) {
  fail(`${floatingBoxes.length} floating piece(s) found:`);
  for (const fb of floatingBoxes) {
    console.log(`       - id: "${fb.id || 'unnamed'}", type: "${fb.type}", pos: [${fb.minX}, ${fb.bottomY}, ${fb.minZ}] to [${fb.maxX}, ${fb.topY}, ${fb.maxZ}]`);
  }
} else {
  ok(`all ${highBoxes.length} elevated non-floor boxes supported from below`);
}

// ── Check (b): Stairs endpoints touch floor surfaces ─────────────────────────
// A stair's low end or high end does not touch a floor surface at correct height.
console.log('[2] Stairs floor connectivity (low/high ends meet floors)');

let stairFails = 0;
for (const s of layout.stairs || []) {
  const [x0, z0, x1, z1] = s.rect;
  const d = s.ascendsToward;
  const targetLowY = s.levelFrom ? 3.5 : 0.0;
  const targetHighY = s.levelTo ? 3.5 : 0.0;

  let lowTouch = false;
  let highTouch = false;

  for (const f of boxes.floorBoxes) {
    if (Math.abs(f.topY - targetLowY) < 0.1) {
      if (d === 'west' && f.minX <= x1 && f.maxX >= x1 && f.minZ < z1 && f.maxZ > z0) lowTouch = true;
      if (d === 'east' && f.minX <= x0 && f.maxX >= x0 && f.minZ < z1 && f.maxZ > z0) lowTouch = true;
      if (d === 'north' && f.minZ <= z1 && f.maxZ >= z1 && f.minX < x1 && f.maxX > x0) lowTouch = true;
      if (d === 'south' && f.minZ <= z0 && f.maxZ >= z0 && f.minX < x1 && f.maxX > x0) lowTouch = true;
    }
    if (Math.abs(f.topY - targetHighY) < 0.1) {
      if (d === 'west' && f.minX <= x0 && f.maxX >= x0 && f.minZ < z1 && f.maxZ > z0) highTouch = true;
      if (d === 'east' && f.minX <= x1 && f.maxX >= x1 && f.minZ < z1 && f.maxZ > z0) highTouch = true;
      if (d === 'north' && f.minZ <= z0 && f.maxZ >= z0 && f.minX < x1 && f.maxX > x0) highTouch = true;
      if (d === 'south' && f.minZ <= z1 && f.maxZ >= z1 && f.minX < x1 && f.maxX > x0) highTouch = true;
    }
  }

  if (lowTouch && highTouch) {
    ok(`${s.id} correctly connected (low Y=${targetLowY}m, high Y=${targetHighY}m)`);
  } else {
    stairFails++;
    fail(`${s.id} disconnected (lowTouch=${lowTouch}, highTouch=${highTouch})`);
  }
}

// ── Check (c): Reachability of all regions via collision walk ─────────────────
// Any region is unreachable when walking actual collision with capsule radius 0.4,
// height 1.8, step-up 0.45 from both spawns.
console.log('[3] Collision walk reachability (capsule r=0.4, h=1.8, step=0.45)');

function walkCollisionBFS(startPos) {
  const visited = new Set();
  const queue = [];
  const key = (x, z) => (Math.round(x * 2) / 2) + ',' + (Math.round(z * 2) / 2);

  queue.push(startPos.clone());
  visited.add(key(startPos.x, startPos.z));

  while (queue.length > 0) {
    const cur = queue.shift();
    const step = 0.5;
    const dirs = [
      new THREE.Vector3(step, 0, 0),
      new THREE.Vector3(-step, 0, 0),
      new THREE.Vector3(0, 0, step),
      new THREE.Vector3(0, 0, -step)
    ];

    for (const dir of dirs) {
      const res = collision.resolve(cur, dir, 0.4, 0.9);
      const movedDist = Math.hypot(res.position.x - cur.x, res.position.z - cur.z);
      if (movedDist >= step * 0.7) {
        // Downward resolution to snap to ground/stair
        const downRes = collision.resolve(res.position, new THREE.Vector3(0, -0.4, 0), 0.4, 0.9);
        const finalPos = downRes.position;
        const k = key(finalPos.x, finalPos.z);
        if (!visited.has(k)) {
          visited.add(k);
          queue.push(finalPos);
        }
      }
    }
  }
  return visited;
}

const sa = layout.spawns.points.attacker[0];
const sd = layout.spawns.points.defender[0];
const startA = new THREE.Vector3(sa[0], 0.9, sa[1]);
const startD = new THREE.Vector3(sd[0], 0.9, sd[1]);

const visitedA = walkCollisionBFS(startA);
const visitedD = walkCollisionBFS(startD);

const unreachedA = [];
const unreachedD = [];

for (const r of layout.regions) {
  let reachA = false;
  let reachD = false;
  for (let z = r.rect[1]; z < r.rect[3]; z += 0.5) {
    for (let x = r.rect[0]; x < r.rect[2]; x += 0.5) {
      const k = (Math.round(x * 2) / 2) + ',' + (Math.round(z * 2) / 2);
      if (visitedA.has(k)) reachA = true;
      if (visitedD.has(k)) reachD = true;
      if (reachA && reachD) break;
    }
    if (reachA && reachD) break;
  }
  if (!reachA) unreachedA.push(r.id);
  if (!reachD) unreachedD.push(r.id);
}

if (unreachedA.length > 0 || unreachedD.length > 0) {
  if (unreachedA.length) fail(`regions unreachable from Attacker spawn: ${unreachedA.join(', ')}`);
  if (unreachedD.length) fail(`regions unreachable from Defender spawn: ${unreachedD.join(', ')}`);
} else {
  ok(`all ${layout.regions.length} regions reachable from both spawns walking actual collision`);
}

// ── Check (d): Pit / fall-through check (walkable 1m grid, y >= -2) ────────────
// A point can be found where the player falls below y = -2 (walk a 1m grid and check).
console.log('[4] Fall-through / pit check (walkable 1 m cells drop >= -2 m)');

const { X0, Z0, W, H, walk, hgt } = rasterizeLayout(layout);
let fallenCount = 0;
const fallenSamples = [];

for (let z = 0; z < H; z++) {
  for (let x = 0; x < W; x++) {
    const i = z * W + x;
    if (!walk[i]) continue;
    const wx = X0 + x + 0.5;
    const wz = Z0 + z + 0.5;
    const startY = hgt[i] + 0.9;

    const res = collision.resolve(new THREE.Vector3(wx, startY, wz), new THREE.Vector3(0, -10, 0), 0.4, 0.9);
    const landedY = res.position.y - 0.9;
    if (landedY < -2.0) {
      fallenCount++;
      if (fallenSamples.length < 5) {
        fallenSamples.push({ x: wx, z: wz, landedY });
      }
    }
  }
}

if (fallenCount > 0) {
  fail(`${fallenCount} point(s) fell below y = -2:`);
  for (const pt of fallenSamples) {
    console.log(`       - pos: [${pt.x}, ${pt.z}], landed Y: ${pt.landedY.toFixed(2)}`);
  }
} else {
  ok(`no fall-through points detected across all walkable cells (min Y >= -2 m)`);
}

console.log('===============================================================');
console.log(fails ? `RESULT: FAILED (${fails})` : 'RESULT: PASSED');
process.exit(fails ? 1 : 0);
