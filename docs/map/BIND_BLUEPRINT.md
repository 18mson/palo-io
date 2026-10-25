# BIND-INSPIRED MAP — IMPLEMENTATION BLUEPRINT (v1)

Working title: **"Tide Market"** (use your own name; do not ship the Riot map name).
Files that belong together: `bind.layout.json` (source of truth, machine readable), `bind_topdown.png` (visual reference rendered from the JSON), `validate-bind.mjs` (data validator), this document.

> **Honesty note.** The *topology* follows the publicly known Bind structure: two sites (A west, B east), **no mid**, two one-way teleporters (A Short → B Short, B Long → A Lobby), A Short / A Bath (Showers) / Lamps / Heaven, B Long / Garden / Hookah window / Elbow, Market link. All coordinates, sizes and shapes below are an **original design**, not Riot's data. The JSON is the authority: if this text and the JSON ever disagree, the JSON wins.

---
## 0. TL;DR for the implementer
1. Read `bind.layout.json`. Everything inside `bounds` is **solid**. Regions, connectors and stairs **carve** walkable space out of it. Walls are simply what remains. *Walls can therefore never float, and the map can never be an open plaza.*
2. Rasterize to a 1 m grid → build merged boxes (greedy) → build collision from the same boxes → add props from the JSON.
3. Run `node tools/validate-bind.mjs docs/map/bind.layout.json` after every change; it must print `RESULT: PASSED`.

## 1. Coordinate system & units
- Units: meters. `x` west(-)→east(+), `z` north(-)→south(+), `y` up. Bounds: x −60…60, z −56…56 (120 × 112 m).
- **Attackers spawn south** (z≈+48, facing north = −z). **Defenders spawn north** (z≈−48, facing south).
- **A site = west** (x≈−39), **B site = east** (x≈+38).
- All rects are `[x0, z0, x1, z1]` with `x0<x1`, `z0<z1`, half-open: cell (x,z) belongs to the rect if `x0<=x<x1 && z0<=z<z1`. Cell center = (x+0.5, z+0.5).
- Everything snaps to 0.5 m (the JSON uses whole meters).
- Yaw convention for cameras/spawns: yaw 0 looks north (−z), +90° looks east (+x).

## 2. Build model (the part that fixes “no walls / floating pieces”)
```
solid(x,z)  = true for every 1m cell inside bounds
walkable    = union(regions.rect, connectors.rect, stairs.rect)      // carve
wall cell   = solid cell (not walkable)                               // automatic
```
Rules:
1. **Regions** are rooms/corridors/courts. Two regions never overlap or touch, except the pairs in `allowedTouch` (L-shaped corridors, the Heaven plinth over A Site). Between two rooms there is always a **2 m solid gap** (= a 2 m thick wall).
2. **Connectors** are the doorways: a rect that crosses a gap and joins two regions. Width = door width (4–6 m, see table). Above every connector put a **lintel** from y=4.0 up to the wall top.
3. **Overlay order:** rasterize regions in array order; a later region overrides an earlier one (only `aHeaven` over `aSite`).
4. **Level 1 regions** (`aHeaven`, `bHookah`) are **solid plinths**: solid from y=−1 up to floorY=3.5, so nothing under them can float. Their open edges (edges next to a lower walkable cell) get a **1.0 m rail**.
5. **Stairs** rect rises toward `ascendsToward`. Low end touches a surface at the `levelFrom` height, high end touches the `levelTo` surface (the validator checks this).

### 2.1 Heights
| item | value |
|---|---|
| Level 0 floor top | y = 0 |
| Level 1 floor top | y = 3.5 |
| Wall top above nearest floor | 6.0 m (7.0 m next to sites, so ≥ 9.5 m next to Level 1 plinths) |
| Door lintel starts at | 4.0 m above floor |
| Roof slab (roofed regions) | floor + 5.0, 0.5 m thick, sits on the surrounding walls |
| Partial roof (`partialRoofRegions`) | only a 4 m wide eave strip along the inside of the walls; the center stays open |
| Rail on Level 1 open edges | 1.0 m |
| Window openings | sill/head heights in `windows` (relative to that floor) |

Wall top for a solid cell = max over walkable cells within Chebyshev distance 2 of (their floorY + (site? 7:6)); solid cells farther than 2 m from any walkable cell use 6.0 (they are never seen).

### 2.2 Meshing & collision (recommended algorithm)
```js
// 1. rasterize
grid[z][x] = {walk, floorY, regionId, kind}              // kinds: region | connector | stairs
// 2. wall boxes: greedy-merge runs of solid cells with equal (top, material)
//    material = material of the nearest walkable region (see §6)
// 3. floors: one slab per region, y from floorY-1 to floorY  (plinth: from -1)
// 4. lintels: for each connector rect -> box y 4.0..wallTop over the rect
// 5. roofs / eaves from roofedRegions / partialRoofRegions
// 6. stairs: n = rect length along travel direction (1 m each); build 2 steps per meter,
//    rise per step = 3.5 / (2n), run 0.5 m  -> max rise 0.35 m
// 7. props: boxes from props[] (rect + height), glued to the floor of the region they stand in
// 8. rails: 1.0 m x 0.25 m boxes along Level-1 open edges
// 9. InstancedMesh / merged geometry per material; a collider list built from the SAME boxes,
//    indexed in a spatial hash (cell 8 m)
```
Player controller requirements: capsule radius 0.4 m, height 1.8 m (eye 1.65), **step-up ≥ 0.45 m** (stairs), jump ≥ 1.0 m.

## 3. Regions
| id | name | rect [x0,z0,x1,z1) | size m | level | kind | roof |
|---|---|---|---|---|---|---|
| attackerSpawn | Attacker Spawn | [-12, 42, 12, 54] | 24x12 | 0 | spawn | yes |
| attackerCave | Attacker Cave | [-6, 32, 6, 40] | 12x8 | 0 | room | yes |
| defenderSpawn | Defender Spawn | [-12, -54, 12, -42] | 24x12 | 0 | spawn | yes |
| aSpawnExit | A Spawn Exit | [-26, 46, -14, 50] | 12x4 | 0 | corridor |  |
| aLobby | A Lobby | [-44, 38, -28, 54] | 16x16 | 0 | plaza |  |
| bSpawnExit | B Spawn Exit | [14, 46, 26, 50] | 12x4 | 0 | corridor |  |
| bLobby | B Lobby | [28, 38, 44, 54] | 16x16 | 0 | plaza |  |
| aShort1 | A Short (lower) | [-36, 26, -30, 36] | 6x10 | 0 | corridor |  |
| aTeleRoom | A Teleporter Room | [-38, 14, -24, 24] | 14x10 | 0 | room | yes |
| aShort2 | A Short (upper) | [-30, -2, -24, 12] | 6x14 | 0 | corridor |  |
| aBath1 | A Bath Approach | [-54, 40, -48, 46] | 6x6 | 0 | corridor |  |
| aBath2 | A Bath Corridor | [-54, 22, -48, 38] | 6x16 | 0 | corridor |  |
| aShowers | A Showers (Bath) | [-58, 6, -42, 20] | 16x14 | 0 | room | yes |
| aBath3 | A Bath Exit | [-48, -2, -42, 4] | 6x6 | 0 | corridor |  |
| aSite | A Site | [-52, -22, -26, -4] | 26x18 | 0 | site |  |
| aCubby | A Cubby | [-58, -12, -54, -6] | 4x6 | 0 | room | yes |
| aHeaven | A Heaven (Tower) | [-52, -22, -44, -14] | 8x8 | 1 | platform |  |
| aCT | A CT | [-42, -36, -34, -24] | 8x12 | 0 | corridor |  |
| aExit | A Exit | [-44, -50, -30, -38] | 14x12 | 0 | room |  |
| dsExitW | Defender Exit West | [-28, -50, -14, -46] | 14x4 | 0 | corridor |  |
| aLamps1 | A Lamps (U-Hall) north | [-24, -26, -14, -22] | 10x4 | 0 | corridor |  |
| aLamps2 | A Lamps (U-Hall) south | [-24, -22, -18, -10] | 6x12 | 0 | corridor |  |
| dsLink | Defender Link | [-2, -40, 2, -32] | 4x8 | 0 | corridor |  |
| market | Market | [-12, -30, 12, -18] | 24x12 | 0 | plaza | yes |
| bLink | B Link | [14, -26, 24, -22] | 10x4 | 0 | corridor |  |
| bElbow | B Elbow | [18, -22, 24, -10] | 6x12 | 0 | corridor |  |
| bLong1 | B Long (lower) | [46, 26, 54, 48] | 8x22 | 0 | corridor |  |
| bLong2 | B Long (upper) | [40, 8, 48, 24] | 8x16 | 0 | corridor |  |
| bGarden | B Garden | [39, -4, 54, 6] | 15x10 | 0 | plaza |  |
| bShort1 | B Short (lower) | [30, 24, 36, 36] | 6x12 | 0 | corridor |  |
| bShortRoom | B Short Room (A-teleporter exit) | [26, 10, 38, 22] | 12x12 | 0 | room | yes |
| bHookah | B Hookah (Window) | [24, -4, 34, 4] | 10x8 | 1 | platform | yes |
| bSite | B Site | [26, -22, 50, -6] | 24x16 | 0 | site |  |
| bHall | B Hall | [36, -36, 42, -24] | 6x12 | 0 | corridor |  |
| bExit | B Exit | [30, -50, 44, -38] | 14x12 | 0 | room |  |
| dsExitE | Defender Exit East | [14, -50, 28, -46] | 14x4 | 0 | corridor |  |

Overlay note: `aHeaven` (Level 1) is drawn on top of the `aSite` rect (x −52…−44, z −22…−14); that corner of A Site is the plinth.

## 4. Connectors (doorways)
| id | between | rect | size m |
|---|---|---|---|
| c_spawn_cave | attackerSpawn ↔ attackerCave | [-2, 40, 2, 42] | 4x2 |
| c_as_ase | attackerSpawn ↔ aSpawnExit | [-14, 46, -12, 50] | 2x4 |
| c_ase_al | aSpawnExit ↔ aLobby | [-28, 46, -26, 50] | 2x4 |
| c_as_bse | attackerSpawn ↔ bSpawnExit | [12, 46, 14, 50] | 2x4 |
| c_bse_bl | bSpawnExit ↔ bLobby | [26, 46, 28, 50] | 2x4 |
| c_al_as1 | aLobby ↔ aShort1 | [-36, 36, -30, 38] | 6x2 |
| c_as1_atr | aShort1 ↔ aTeleRoom | [-36, 24, -30, 26] | 6x2 |
| c_atr_as2 | aTeleRoom ↔ aShort2 | [-30, 12, -24, 14] | 6x2 |
| c_al_ab1 | aLobby ↔ aBath1 | [-48, 40, -44, 46] | 4x6 |
| c_ab1_ab2 | aBath1 ↔ aBath2 | [-54, 38, -48, 40] | 6x2 |
| c_ab2_sh | aBath2 ↔ aShowers | [-54, 20, -48, 22] | 6x2 |
| c_sh_ab3 | aShowers ↔ aBath3 | [-48, 4, -42, 6] | 6x2 |
| c_as2_site | aShort2 ↔ aSite | [-30, -4, -24, -2] | 6x2 |
| c_ab3_site | aBath3 ↔ aSite | [-48, -4, -42, -2] | 6x2 |
| c_site_cubby | aSite ↔ aCubby | [-54, -11, -52, -7] | 2x4 |
| c_act_site | aCT ↔ aSite | [-42, -24, -34, -22] | 8x2 |
| c_aexit_act | aExit ↔ aCT | [-42, -38, -36, -36] | 6x2 |
| c_ds_dsew | defenderSpawn ↔ dsExitW | [-14, -50, -12, -46] | 2x4 |
| c_dsew_aexit | dsExitW ↔ aExit | [-30, -50, -28, -46] | 2x4 |
| c_lamps_site | aLamps2 ↔ aSite | [-26, -16, -24, -12] | 2x4 |
| c_ds_dslink | defenderSpawn ↔ dsLink | [-2, -42, 2, -40] | 4x2 |
| c_dslink_mk | dsLink ↔ market | [-2, -32, 2, -30] | 4x2 |
| c_mk_lamps | market ↔ aLamps1 | [-14, -26, -12, -22] | 2x4 |
| c_mk_blink | market ↔ bLink | [12, -26, 14, -22] | 2x4 |
| c_bl_blong | bLobby ↔ bLong1 | [44, 44, 46, 48] | 2x4 |
| c_bl1_bl2 | bLong1 ↔ bLong2 | [46, 24, 48, 26] | 2x2 |
| c_bl2_gar | bLong2 ↔ bGarden | [40, 6, 46, 8] | 6x2 |
| c_bl_bs1 | bLobby ↔ bShort1 | [30, 36, 36, 38] | 6x2 |
| c_bs1_bsr | bShort1 ↔ bShortRoom | [30, 22, 36, 24] | 6x2 |
| c_gar_site | bGarden ↔ bSite | [40, -6, 46, -4] | 6x2 |
| c_belbow_site | bElbow ↔ bSite | [24, -16, 26, -12] | 2x4 |
| c_bhall_site | bHall ↔ bSite | [36, -24, 42, -22] | 6x2 |
| c_bexit_bhall | bExit ↔ bHall | [36, -38, 42, -36] | 6x2 |
| c_ds_dsee | defenderSpawn ↔ dsExitE | [12, -50, 14, -46] | 2x4 |
| c_dsee_bexit | dsExitE ↔ bExit | [28, -50, 30, -46] | 2x4 |

## 5. Stairs, windows, teleporters, spawns, plant zones
### Stairs
| id | name | rect | ascends toward | levels |
|---|---|---|---|---|
| st_heaven | A Heaven stairs | [-44, -20, -38, -17] | west | L0→L1 |
| st_hookah_up | Hookah stairs (from Short) | [28, 4, 32, 10] | north | L0→L1 |
| st_hookah_down | Hookah stairs (to Garden) | [34, 0, 39, 3] | west | L0→L1 |

Heaven stairs: 6 m long, rise 3.5 m (≈30°). Hookah-up: 6 m, Hookah-down: 5 m. Put a 1.0 m rail on both long sides of each stair.

### Windows (cut into the 2 m wall between two regions)
| id | name | rect | sill above floor | head above floor |
|---|---|---|---|---|
| w_hookah_site | Hookah window (looks into B Site) | [28, -6, 32, -4] | 1.0 | 2.6 |
| w_hookah_garden | Hookah side window (to Garden) | [34, -4, 39, -2] | 1.0 | 2.6 |

Windows are see-through and shoot-through but not walkable (`Hookah` is at +3.5 m, so the sill is at y = 4.5, head at y = 6.1). Add a 0.3 m deep frame.

### Teleporters (one-way, loud)
| id | name | entry pad | exit pad | exit pos (x,z) | exit facing |
|---|---|---|---|---|---|
| tpA | A Teleporter (A Short -> B Short) | [-36, 16, -32, 20] | [30, 16, 34, 20] | [32, 18] | north |
| tpB | B Teleporter (B Long -> A Lobby) | [48, 28, 52, 32] | [-42, 42, -38, 46] | [-40, 44] | east |

Behavior: standing inside the entry pad for 0.6 s → teleport to `exitPos`, keep the player's speed 0, face `exitFacing`; cooldown 8 s per player; **every player gets a 2D audio cue** (not positional) on use; a short dust/beam particle at both ends. Exit pads are plain floor with a glowing ring; no steel doors needed in v1.

### Spawns
- Attackers (facing north): (-8,48), (-4,48), (0,48), (4,48), (8,48)
- Defenders (facing south): (-8,-48), (-4,-48), (0,-48), (4,-48), (8,-48)
- Spawn rooms are fully enclosed except for their two exit corridors.

### Plant zones (bomb site areas)
- A: [-46, -18, -34, -8]   B: [30, -20, 44, -8]

## 6. Routes, callouts and rotations
**Attackers** leave spawn west (→ A Lobby) or east (→ B Lobby), or wait in the Cave.
- **A Lobby → A Short** (corridor `aShort1`) → **A Teleporter Room** → `aShort2` → A Site (south-east entrance, covered by `A Box`).
- **A Lobby → A Bath**: `aBath1` → `aBath2` → **A Showers** → `aBath3` → A Site (south-west entrance).
- **B Lobby → B Long** (`bLong1` with fountain and the B teleporter, `bLong2`) → **B Garden** → B Site (south entrance).
- **B Lobby → B Short** (`bShort1`) → **B Short Room** → Hookah stairs → **Hookah** (Level 1; window into B Site; stairs down to Garden).
- **Teleporters:** A Tele (in A Short room) → exits in B Short Room. B Tele (in B Long) → exits in A Lobby near the Bath door.

**Defenders** leave the spawn: west → `dsExitW` → `aExit` → `aCT` → A Site; south → `dsLink` → **Market** → `aLamps1/2` → A Site (east entrance) or `bLink` → `bElbow` → B Site (west entrance); east → `dsExitE` → `bExit` → `bHall` → B Site (north entrance).

**There is no mid.** The Market is a defender-side link plaza, not an attacker lane.

### Measured path lengths (grid shortest path, 1 m cells)
| route (spawn center → plant zone area) | path m | at 5.4 m/s |
|---|---|---|
| attacker->A via A Short | 93.3 | 17 s |
| attacker->A via A Bath | 104.0 | 19 s |
| attacker->B via B Long | 109.0 | 20 s |
| attacker->B via B Short/Hookah | 99.2 | 18 s |
| defender->A site (via CT) | 74.1 | 14 s |
| defender->B site (via Hall) | 66.7 | 12 s |
| defender->A site (via Lamps) | 67.1 | 12 s |
| defender->B site (via Elbow) | 63.8 | 12 s |

Defenders reach sites faster than attackers (≈ 1.4×). This is intended.

## 7. Props (cover) — all solid, all grid-aligned
| id | name | rect | size m | height m | type |
|---|---|---|---|---|---|
| p_aBox | A Box | [-34, -10, -29, -7] | 5x3 | 2.0 | crate |
| p_aDefault | A Default Box | [-42, -14, -38, -11] | 4x3 | 2.0 | crate |
| p_aBack | A Back Box | [-36, -20, -31, -17] | 5x3 | 2.0 | crate |
| p_aPillar | A Pillar | [-47, -9, -45, -7] | 2x2 | 3.0 | pillar |
| p_aLobby1 | A Lobby crates | [-40, 48, -37, 51] | 3x3 | 1.5 | crate |
| p_aLobby2 | A Lobby crates | [-34, 41, -31, 44] | 3x3 | 1.5 | crate |
| p_aTele1 | Tele room crate | [-27, 15, -25, 17] | 2x2 | 1.5 | crate |
| p_aShow1 | Showers crates | [-56, 8, -53, 10] | 3x2 | 1.5 | crate |
| p_aShow2 | Showers pillar | [-49, 13, -47, 15] | 2x2 | 3.0 | pillar |
| p_cave1 | Cave crates | [-4, 34, -1, 36] | 3x2 | 1.5 | crate |
| p_cave2 | Cave crates | [2, 37, 5, 39] | 3x2 | 1.5 | crate |
| p_mk1 | Market stall | [-8, -28, -4, -25] | 4x3 | 2.0 | stall |
| p_mk2 | Market stall | [4, -23, 8, -20] | 4x3 | 2.0 | stall |
| p_bFountain | B Long Fountain | [48, 36, 52, 40] | 4x4 | 2.5 | fountain |
| p_bLobby1 | B Lobby crates | [32, 48, 35, 51] | 3x3 | 1.5 | crate |
| p_bLobby2 | B Lobby crates | [38, 41, 41, 44] | 3x3 | 1.5 | crate |
| p_bShort1 | Short room crates | [28, 18, 31, 21] | 3x3 | 1.5 | crate |
| p_bGarden1 | Garden planter | [43, 0, 47, 2] | 4x2 | 1.0 | planter |
| p_bGarden2 | Garden planter | [50, -2, 53, 1] | 3x3 | 1.0 | planter |
| p_bBox | B Corner Box | [44, -12, 48, -9] | 4x3 | 2.0 | crate |
| p_bContainer | B Steel Container | [32, -14, 38, -11] | 6x3 | 2.6 | container |
| p_bPillar | B Pillar | [40, -20, 42, -18] | 2x2 | 3.0 | pillar |
| p_bShortBox | B Short Box | [29, 13, 33, 15] | 4x2 | 2.0 | crate |

Prop appearance: `crate` wooden, `container` steel shipping container (long axis = long side of the rect), `pillar` square stone pillar, `stall` market stall with an awning (awning attaches to the stall, 0.3 m above its top), `fountain` stone basin with a small water plane, `planter` stone box with green top. Cover height ≥ 1.5 m blocks aiming; planters (1.0 m) are crouch/jump cover.

### 7.1 Decoration rules (no floating, ever)
- Every decoration has a parent: a wall cell run, a prop, or a floor region. **Position is derived from the parent**, never typed as an absolute coordinate.
- Lanterns: on a wall face next to every connector wider than 4 m, at y = 3.2, emissive material only (no real lights).
- Vines/ivy: planes 0.05 m off a wall face, at least 2 m long, height 2–4 m, only on walls facing a walkable cell. Never in the open.
- Window frames, trim lines and wall caps: derived from wall boxes (trim = a 0.25 m darker band at y 0–0.5 and at the wall top).
- Banners: one per site, attached to the wall behind the plant zone.
- Trees/bushes: only inside `bGarden`, `aLobby`, `bLobby` planter positions (use `planter` props as roots).

## 8. Look (Krunker-like, bright daylight)
Flat colors, 16–32 px pixel textures with nearest filtering, no metalness. Tints by zone:
| zone | floor | wall | accent |
|---|---|---|---|
| attacker spawn / lobbies | #8f8a80 | #c9b08a | #b84a4a trim |
| A side (west) | #8a8277 | #c9b08a sandstone | #7a5230 wood, #5d7388 roof |
| B side (east) | #86868a | #d8cfc0 plaster | #2f8f8a teal, #5d7388 roof |
| Market / links | #7d756a | #b8654a terracotta | #e0b050 awnings |
| defender spawn | #85808a | #b9b3a8 | #4a7ab8 trim |
| Level 1 floors | #a07850 wood | — | rail #3d2b1a |
Lighting: hemisphere 0.6, directional sun 1.1 from (−0.4, −1, −0.3) with shadows limited to a 40 m radius around the player, fill 0.3, tone-mapping exposure 1.0, fog 60→180 m in the sky color. Floors must read as dark/mid gray so pale wall tops contrast (avoid blown-out white floors).

## 9. Acceptance criteria
Data (run `node tools/validate-bind.mjs docs/map/bind.layout.json`): grid snap, no unintended overlaps, every region reachable from both spawns, stairs connect surfaces, longest combat lane ≤ 52 m (measured 48 m), ≤ 8 % of walkable cells farther than 6 m from a wall (measured 4.7 %).
Scene (to be added in the project's own validator): every non-floor box with bottom > 0.15 m touches another box below it or a wall (no floating pieces); every stair's two ends touch floors; draw calls < 120 on a mid laptop; no real point lights beyond 4.

Camera checkpoints (yaw 0 = north). Take a screenshot at each and compare with `bind_topdown.png`:
| cam | position (x, y, z) | yaw | what must be visible |
|---|---|---|---|
| spawnA | (0, 1.65, 50) | 0 | two exit corridors, cave door |
| aShort | (−33, 1.65, 34) | 0 | corridor, 2 m wide walls both sides, teleporter room door |
| aTele | (−34, 1.65, 22) | 0 | teleporter pad, crate, door north |
| aSiteShort | (−27, 1.65, −1) | 0 | A Box, site, Heaven stairs in the far-left corner |
| aSiteBath | (−45, 1.65, −1) | 0 | site from the Bath entrance, pillar |
| aHeaven | (−48, 5.15, −18) | 90 | site seen from +3.5 m, rails |
| market | (0, 1.65, −34) | 180 | stalls, doors left/right |
| bLong | (50, 1.65, 46) | 0 | fountain, teleporter pad, long corridor |
| bGarden | (46, 1.65, 4) | 0 | planters, doorway into B Site |
| hookah | (30, 5.15, −1) | 0 | window overlooking B Site |
| bSiteHall | (39, 1.65, −26) | 180 | container, box, pillar, hall door |
| spawnD | (0, 1.65, −50) | 180 | exits east/west, link south |

## 10. Order of work
1. Backup + remove old map (see `ANTIGRAVITY_PROMPTS.md`, P0–P1).
2. Loader + rasterizer + boxes (P2). Look at it only as a plain gray model first.
3. Collision, stairs, spawns, teleporters (P3).
4. Debug top-down overlay of the JSON (P4) and the validator in CI.
5. Materials, lighting (P5). 6. Props + decoration (P6). 7. QA screenshots (P7).
Never add a feature before the previous step passes the validator.
