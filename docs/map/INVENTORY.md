# MAP REBUILD INVENTORY: ASCENT → BIND-STYLE ("TIDE MARKET")

## Overview
This inventory documents all files and code references across the repository in preparation for completely removing the old map and installing the new map defined by `docs/map/bind.layout.json`.

- **Backup Tag**: `pre-rebuild-map` (created on commit `f4bb8fa892553e0410032f445be6cc923c36912a`)
- **Active Branch**: `rebuild-map`
- **Git Hygiene**: `node_modules/` and `dist/` untracked and added to `.gitignore` (committed)
- **New Map Specification**: `docs/map/bind.layout.json`, `docs/map/BIND_BLUEPRINT.md`, `docs/map/bind_topdown.png`, validated by `tools/validate-bind.mjs` (RESULT: PASSED)

---

## List A: MAP-ONLY (To Delete in Phase 2)
The following files and directories only existed for the old map and will be deleted via `git rm`:

### 1. `src/map/` (Old Map Implementation)
- `src/map/maps/ascent.json` — Old Ascent map definition (4547 lines of geometry, zones, props)
- `src/map/maps/range.json` — Old shooting range map definition
- `src/map/LayoutBuilder.js` — Old chunk layout builder
- `src/map/layout/chunk_C.json` — Chunk C layout definition
- `src/map/layout/chunk_NW.json` — Chunk NW layout definition
- `src/map/layout/chunk_C.txt` — ASCII diagram of chunk C
- `src/map/kit/index.js` — Architectural kit entry point
- `src/map/kit/roofEave.js` — Roof eave generator
- `src/map/kit/planterBox.js` — Planter box generator
- `src/map/kit/windowRow.js` — Window row generator
- `src/map/kit/balcony.js` — Balcony generator
- `src/map/kit/crateStack.js` — Crate stack generator
- `src/map/kit/doorFrame.js` — Door frame generator
- `src/map/kit/decorationPass.js` — Decoration pass generator
- `src/map/kit/pillarPair.js` — Pillar pair generator
- `src/map/kit/stoneTrim.js` — Stone trim generator
- `src/map/kit/awning.js` — Awning generator
- `src/map/MapTextures.js` — Procedural wall/floor/brick/tile textures for old map (*Note: VFX helper functions `createMuzzleFlashTexture` and `createContactShadowTexture` will be relocated to `src/weapons/WeaponTextures.js` before deletion so player and bot rendering remains intact*)
- `src/map/MapLoader.js` — Old map loader, macro expander, material manager, and lighting setup
- `src/map/MapMacros.js` — Old macro expansion and 0.5m grid snapping engine
- `src/map/MapCollision.js` — Old AABB and ramp spatial-hash collision resolver

### 2. Map Debug & Calibration Tools
- `src/debug/MapExplorer.js` — Noclip free-fly camera, collision wireframe inspector, blueprint overlay, calibration panel, teleport bar
- `src/debug/` — Entire debug directory

### 3. Old Map Reference Captures in `public/`
- `public/docs/reference/` (23 files):
  - `a_site.png`
  - `bridge.png`
  - `attacker_spawn.png`
  - `defender_spawn.png`
  - `tower_b.png`
  - `water.png`
  - `b_site.png`
  - `topdown.png`
  - `spawns.png`
  - `mid.png`
  - `alley.png`
  - `views/aerial.png`
  - `views/a_site_from_tower.png`
  - `views/water_under_bridge.png`
  - `views/open_yard_long_sight.png`
  - `views/mid_bridge_view.png`
  - `views/alley_flank.png`
  - `views/isometric.png`
  - `views/attacker_exit_to_mid.png`
  - `views/a_site_from_a_main.png`
  - `views/defender_exit.png`
  - `views/b_site_tower_view.png`
  - `views/b_site_from_b_main.png`
- `public/models/doc/reference/` (23 files — exact duplicate of above reference views)

### 4. Scripts & Tools Serving Only Old Map
- `tools/render-layout.mjs` — Renders chunk_C/chunk_NW layout JSON to PNG
- `tools/validate-map.mjs` — Automated validator for `src/map/maps/ascent.json`
- `tools/render-minimap-preview.mjs` — Visual preview renderer for old Ascent minimap
- `tools/capture.mjs` — Headless Chrome screenshot capture of 12 Ascent blueprint reference views

### 5. Old Reference Captures, Logs & Documentation in `docs/` and Root
- `docs/captures/` (26 files):
  - `crop_NW_grid1m.png`
  - `aerial.png`
  - `crop_NW_overlay_check.png`
  - `chunk_C_render.png`
  - `a_site_from_tower.png`
  - `water_under_bridge.png`
  - `crop_NW_east.png`
  - `open_yard_long_sight.png`
  - `mid_bridge_view.png`
  - `chunk_C_comparison.png`
  - `alley_flank.png`
  - `isometric.png`
  - `crop_NW_west.png`
  - `tactical_map_preview.png`
  - `crop_NW_overlay_check2.png`
  - `attacker_exit_to_mid.png`
  - `chunk_NW_render.png`
  - `chunk_C_overlay_v2.png`
  - `crop_NW_active.png`
  - `a_site_from_a_main.png`
  - `chunk_C_overlay.png`
  - `defender_exit.png`
  - `minimap_radar_preview.png`
  - `b_site_tower_view.png`
  - `chunk_NW_overlay.png`
  - `b_site_from_b_main.png`
- `docs/reference/` (34 files):
  - 11 top-level PNGs (`a_site.png`, `bridge.png`, etc.)
  - 12 PNGs in `views/` (`aerial.png`, `isometric.png`, etc.)
  - 11 grid alignment files in `grid/` (`calibration.json`, `chunk_*.png`, `topdown_grid.png`, `topdown_island_clean.png`)
- `docs/topdown_grid.png` — Old topdown alignment grid image
- `docs/validate-offenders.md` — Report of unsupported blocks in `ascent.json`
- `docs/validate-history.md` — Historical validation log for `ascent.json`
- Root directory capture artifacts (8 files):
  - `captured_attacker_exit_to_mid.png`
  - `captured_mid_bridge_view.png`
  - `captured_open_yard_long_sight.png`
  - `captured_water_under_bridge.png`
  - `kit_a_site_from_a_main.png`
  - `kit_a_site_from_tower.png`
  - `kit_mid_bridge_view.png`
  - `kit_open_yard_long_sight.png`

---

## List B: KEEP (Preserved per GLOBAL RULES)
All gameplay systems, engine, controller, weapons, audio, UI, and new map specification files:

### 1. New Map Specification (Source of Truth)
- `docs/map/bind.layout.json` — The only definition of the new map (120x112m bounds, regions, connectors, stairs, teleporters, spawns, plant zones, props)
- `docs/map/BIND_BLUEPRINT.md` — Implementation specification for the new map
- `docs/map/bind_topdown.png` — Visual reference topdown of the new map
- `tools/validate-bind.mjs` — Official layout validator for `bind.layout.json`

### 2. Core Game Engine & Systems
- `src/core/GameEngine.js` — Three.js WebGL renderer, dual-pass first-person viewmodel rendering, camera, animation loop, pointer lock controls
- `src/core/SpawnSystem.js` — Max-min distance scoring safe spawn selector
- `src/core/EventBus.js` — Global pub/sub event bus (`bus`)
- `src/modes/Deathmatch.js` — Game mode logic (kill count tracking, timer, scoring, victory/defeat)

### 3. Player, Bots & Characters
- `src/player/PlayerController.js` — First-person controller, movement, counter-strafing, jump physics, slide-hop, shooting, viewmodel management
- `src/bot/BotAI.js` — Tactical bot AI, state machine, sightline raycasting, movement, aim, shooting, damage
- `src/bot/BotSpawner.js` — Bot population spawner, dynamic respawner, enemy tracking
- `src/characters/AgentModelBuilder.js` — Procedural 3D humanoid character mesh builder
- `src/agents/AgentRegistry.js` — Agent catalog (Blaze, Cipher, Scope, Rampart, Phantom)

### 4. Weapons & Effects
- `src/weapons/WeaponRegistry.js` — Weapon definitions (Vandal, Spectre, Operator, Odin, Bucky, Classic)
- `src/weapons/WeaponTextures.js` — Procedural PBR weapon textures (carbon fiber, brushed steel, radianite crystals, reticles, lenses)
- `src/weapons/WeaponModelLoader.js` — External GLTF/GLB weapon model loader and normalizer
- `src/effects/TracerManager.js` — High-speed bullet tracers and impact effects
- `public/models/vandal.glb` — 3D GLB model for Vandal
- `public/models/operator.glb` — 3D GLB model for Operator
- `public/models/README.md` — Weapon model documentation and Sketchfab guide

### 5. Audio
- `src/audio/SoundSystem.js` — 100% Web Audio API synthesizer for gunshots, reloads, footsteps, hits, headshots, kills

### 6. User Interface
- `src/ui/HUD.js` — Health bar, ammo counter, crosshair, kill feed, kill banner, multi-kill stars, play/loadout overlay
- `src/ui/AgentSelect.js` — Agent selection screen
- `src/ui/EndScreen.js` — Match result victory/defeat screen
- `src/ui/draggable.js` — Reusable mouse & touch dragging utility
- `src/ui/Minimap.js` — Tactical radar and tactical full map modal (decoupled from Ascent data)

### 7. App Shell & Project Files
- `src/main.js` — Main application orchestrator (decoupled from old map modules)
- `src/style.css` — Global typography, HUD, overlays, buttons, dark theme styling
- `index.html` — Application shell HTML (decoupled from old map names)
- `package.json`, `package-lock.json`, `vite.config.js`, `.gitignore`, `ANTIGRAVITY_PROMPTS.md`

---

## List C: COUPLING & REQUIRED EDITS
Every location in KEEP files that references List A or old-map data, with the exact changes to be made:

### 1. `src/main.js`
- **Line 4 (`import { MapLoader } from './map/MapLoader.js'`):**
  - *Current*: Imports old MapLoader.
  - *Change*: Remove old import. In Phase 2, stub with minimal flat-floor generator. In Phase 3, import `src/map/bind/layoutLoader.js` and `src/map/bind/meshBuilder.js`.
- **Line 5 (`import { MapCollision } from './map/MapCollision.js'`):**
  - *Current*: Imports old MapCollision.
  - *Change*: Remove old import. In Phase 2, provide minimal collision stub (`resolve` and `raycast`). In Phase 3, import new Bind collision hash.
- **Line 15 (`import { MapExplorer } from './debug/MapExplorer.js'`):**
  - *Current*: Imports debug MapExplorer.
  - *Change*: Remove import completely.
- **Line 17 (`import ascentMap from './map/maps/ascent.json'`):**
  - *Current*: Imports old Ascent map JSON.
  - *Change*: Remove import completely.
- **Lines 21-22 (`let ... mapExplorer`):**
  - *Current*: Declares `mapExplorer` state variable.
  - *Change*: Remove `mapExplorer` variable.
- **Lines 65-71 (`#btn-explore` event listener):**
  - *Current*: Launches game in debug exploration mode using MapExplorer.
  - *Change*: Remove listener and hide `#btn-explore` button from main menu.
- **Lines 93-96 (`startGame` map initialization):**
  - *Current*:
    ```js
    await mapLoader.load(ascentMap)
    spawnPoints = mapLoader.getSpawnPoints(ascentMap)
    mapCollision = new MapCollision(mapLoader.getColliders(), mapLoader.getRamps(), 8, mapLoader.getLadders())
    ```
  - *Change*:
    - **Phase 2 (Stub)**: Generate a flat gray floor of 120 x 112 m centered at origin (bounds x: [-60, 60], z: [-56, 56]), sky dome and hemisphere/sun lighting as before. Set player spawn point at `(0, 1.7, 48)` facing north (`-z`). Provide safe bot spawn points around the floor so bots do not crash. Create minimal collision stub responding to `.resolve(pos, disp, radius, height)` and `.raycast(origin, dir, maxDist)`.
    - **Phase 3 (Bind)**: Load `src/map/bind/bind.layout.json`, rasterize, merge boxes, construct meshes, build spatial hash collision, register spawns, plant zones, and teleporters.
- **Lines 113-119 (MapExplorer setup):**
  - *Current*: Instantiates `new MapExplorer(...)` and calls `enable()` / `disable()`.
  - *Change*: Remove entirely.
- **Lines 121-141 (`CHUNK_C_TELEPORT_POINTS` & `teleportTo`):**
  - *Current*: Hardcoded Ascent coordinates ('A-site pool edge' `[-9.5, 1.0, 7.5]`, 'Mid bridge' `[7.0, 3.0, 0.0]`, etc.).
  - *Change*: Remove `window.CHUNK_C_TELEPORT_POINTS` and `window.teleportTo`.
- **Lines 163-170 (Minimap setup):**
  - *Current*:
    ```js
    minimap = new Minimap({
      player,
      bots,
      zones: mapLoader?.getZones?.() || ascentMap.zones || [],
      mapBounds: { minX: -55, maxX: 55, minZ: -55, maxZ: 55 },
      imageSrc: '/docs/reference/topdown.png',
      engine
    })
    ```
  - *Change*: Remove `ascentMap.zones` and `/docs/reference/topdown.png`. Set `zones: []` (or dynamic zones from loader), `mapBounds: { minX: -60, maxX: 60, minZ: -56, maxZ: 56 }`, and remove topdown blueprint image reference.
- **Line 186 (`mapLoader.update(...)`):**
  - *Current*: Updates old mapLoader (water animations, sunlight shadow tracker).
  - *Change*: Maintain sunlight focus tracker without relying on old mapLoader.
- **Line 191 (`mapExplorer?.update()`):**
  - *Current*: Updates debug explorer.
  - *Change*: Remove line.
- **Lines 350-374 (`CAMERA_PRESETS` & `MID_PRESETS`):**
  - *Current*: Hardcoded camera coordinates for 12 Ascent views (`a_site_from_a_main`, `mid_bridge_view`, etc.).
  - *Change*: Remove old presets. Replace with generic coordinates or bind inspection views.
- **Lines 385-388 (`debug-explorer-overlay` & `topdown-blueprint-container` DOM checks):**
  - *Current*: Manipulates debug elements created by MapExplorer.
  - *Change*: Remove DOM queries.

### 2. `src/player/PlayerController.js`
- **Line 5 (`import { createMuzzleFlashTexture } from '../map/MapTextures.js'`):**
  - *Current*: Imports muzzle flash texture generator from `src/map/MapTextures.js`.
  - *Change*: Move `createMuzzleFlashTexture` into `src/weapons/WeaponTextures.js`. Update import:
    `import { createMuzzleFlashTexture } from '../weapons/WeaponTextures.js'`.
- **Lines 1378, 1674, 1714 (Collision API):**
  - *Current*: Calls `this.collision.raycast(...)`, `this.collision?.getLadders?.()`, and `this.collision.resolve(...)`.
  - *Change*: Keep intact. Stub and new Bind collision will fulfill this exact API.

### 3. `src/bot/BotAI.js`
- **Line 6 (`import { createContactShadowTexture } from '../map/MapTextures.js'`):**
  - *Current*: Imports contact shadow texture generator from `src/map/MapTextures.js`.
  - *Change*: Move `createContactShadowTexture` into `src/weapons/WeaponTextures.js`. Update import:
    `import { createContactShadowTexture } from '../weapons/WeaponTextures.js'`.
- **Lines 376, 535 (Collision API):**
  - *Current*: Calls `mapCollision.raycast(...)` and `mapCollision.resolve(...)`.
  - *Change*: Keep intact. Stub and new Bind collision will fulfill this exact API.

### 4. `src/ui/Minimap.js`
- **Line 37 (`mapBounds` option default):**
  - *Current*: `this.mapBounds = options.mapBounds || { minX: -55, maxX: 55, minZ: -55, maxZ: 55 }` (Ascent 110x110m).
  - *Change*: Update default to `{ minX: -60, maxX: 60, minZ: -56, maxZ: 56 }` (Bind 120x112m).
- **Line 38 (`imageSrc` option default):**
  - *Current*: `this.imageSrc = options.imageSrc || '/docs/reference/topdown.png'`.
  - *Change*: Remove `/docs/reference/topdown.png` default; default to `null` (pure procedural tactical radar).
- **Lines 56, 453 (`this.currentZoneName` fallback):**
  - *Current*: Defaults to `'ASCENT'`.
  - *Change*: Change fallback from `'ASCENT'` to `'TIDE MARKET'` (or `'BIND'`).
- **Lines 168-177 (Hardcoded Mid Canal water trench):**
  - *Current*: Looks up `this.zones.find(z => z.id === 'midCanal')` and draws blue water rectangle with 110m scaling.
  - *Change*: Remove hardcoded `midCanal` check.
- **Lines 189-204 (Ascent zone ID checks):**
  - *Current*: Hardcoded checks for `siteA`, `aHeaven`, `aHell`, `siteB`, `bHeaven`, `bHell`, `mid`, etc.
  - *Change*: Replace with data-driven zone color logic or generic category checks (`site`, `spawn`, `corridor`).
- **Lines 580-582 & 886-889 (Hardcoded bomb site locations):**
  - *Current*: Hardcoded site coordinates:
    ```js
    const sites = [
      { id: 'A', x: -35.0, z: -1.5, color: '#06b6d4', bg: '#083344' },
      { id: 'B', x: 43.5,  z:  0.0, color: '#f59e0b', bg: '#451a03' }
    ]
    ```
  - *Change*: Remove hardcoded Ascent coordinates. Derive dynamically from `this.zones` or plant zones, or leave empty if no sites exist.

### 5. `index.html`
- **Line 24 (`#btn-explore` button):**
  - *Current*: `<button class="val-btn secondary" id="btn-explore" ...>🛠️ EKSPLORASI MAP (DEBUG)</button>`.
  - *Change*: Hide or remove button.
- **Line 36 (Agent Select Header):**
  - *Current*: `MAP: <span style="color:#00f0ff;font-weight:700">ASCENT</span>`.
  - *Change*: Change `ASCENT` to `BIND` (or `TIDE MARKET`).
- **Line 107 (Minimap Zone Badge):**
  - *Current*: `<span class="minimap-zone-badge" id="minimap-zone-badge">📍 ASCENT</span>`.
  - *Change*: Change `📍 ASCENT` to `📍 MAP`.
- **Line 242 (Tactical Map Modal Tag):**
  - *Current*: `<span class="map-tag">ASCENT</span>`.
  - *Change*: Change `ASCENT` to `BIND`.
- **Line 246 (Tactical Map Default Location):**
  - *Current*: `LOCATION: <b id="tactical-map-zone">MID COURTYARD</b>`.
  - *Change*: Change `MID COURTYARD` to `SPAWN` or `—`.

### 6. `package.json`
- **Line 10 (`"validate"` script):**
  - *Current*: `"validate": "node tools/validate-map.mjs"`.
  - *Change*: Update to `"validate": "node tools/validate-bind.mjs docs/map/bind.layout.json"`.
  - Add `"sync:map": "node -e \"import('fs').then(fs => fs.copyFileSync('docs/map/bind.layout.json', 'src/map/bind/bind.layout.json'))\""`.

### 7. `src/style.css`
- **Lines 1276-1490 (Old Debug & Calibration CSS):**
  - *Current*: CSS rules for `.topdown-container`, `.topdown-header-bar`, `.topdown-calib-card`, etc.
  - *Change*: Clean up unused styles that were only generated by `MapExplorer.js`.
