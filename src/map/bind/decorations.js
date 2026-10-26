// src/map/bind/decorations.js
// Phase P6: Decorations system enforcing the parent rule (docs/map/BIND_BLUEPRINT.md §7.1).
// Every decoration MUST have a parent and derive its position, dimensions and orientation from that parent.

import * as THREE from 'three'
import {
  createIvyTexture,
  createBannerTexture,
  createSignTexture,
  createFoliageTexture
} from './proceduralTextures.js'

// Cached reusable materials
let cachedMaterials = null

function getMaterials() {
  if (cachedMaterials) return cachedMaterials

  // Emissive lantern core (warm amber #ffb03a, emissive 0.9, no real point lights)
  const lanternGlowMat = new THREE.MeshLambertMaterial({
    color: 0xffb03a,
    emissive: new THREE.Color(0xff9800),
    emissiveIntensity: 0.9
  })
  const lanternMetalMat = new THREE.MeshLambertMaterial({
    color: 0x242426
  })

  // Ivy foliage plane material (double-sided, alpha tested)
  const ivyTex = createIvyTexture(32)
  const ivyMat = new THREE.MeshLambertMaterial({
    map: ivyTex || null,
    transparent: true,
    alphaTest: 0.4,
    side: THREE.DoubleSide
  })

  // Banners: Site A & B, Attacker & Defender Spawns
  const bannerTexA = createBannerTexture('A', 64)
  const bannerTexB = createBannerTexture('B', 64)
  const bannerTexAtk = createBannerTexture('attacker', 64)
  const bannerTexDef = createBannerTexture('defender', 64)

  const bannerMatA = new THREE.MeshLambertMaterial({
    map: bannerTexA || null,
    color: 0xffffff,
    side: THREE.DoubleSide
  })
  const bannerMatB = new THREE.MeshLambertMaterial({
    map: bannerTexB || null,
    color: 0xffffff,
    side: THREE.DoubleSide
  })
  const bannerMatAttacker = new THREE.MeshLambertMaterial({
    map: bannerTexAtk || null,
    color: 0xffffff,
    side: THREE.DoubleSide
  })
  const bannerMatDefender = new THREE.MeshLambertMaterial({
    map: bannerTexDef || null,
    color: 0xffffff,
    side: THREE.DoubleSide
  })
  const bannerRodMat = new THREE.MeshLambertMaterial({
    color: 0x3d2b1a // dark wood rod
  })

  // Window frame & Doorframe: Dark wood (#4a3220)
  const frameWoodMat = new THREE.MeshLambertMaterial({
    color: 0x4a3220 // dark wood #4a3220
  })

  // Hanging Door Signs: Market & Teleporter
  const signTexMarket = createSignTexture('market', 32)
  const signTexTele   = createSignTexture('teleporter', 32)
  const signMatMarket = new THREE.MeshLambertMaterial({
    map: signTexMarket || null,
    side: THREE.DoubleSide
  })
  const signMatTele = new THREE.MeshLambertMaterial({
    map: signTexTele || null,
    side: THREE.DoubleSide
  })

  // Foliage & Tree trunk
  const foliageTex = createFoliageTexture(32)
  const foliageMat = new THREE.MeshLambertMaterial({
    map: foliageTex || null,
    color: 0x2e7d32
  })
  const foliageLightMat = new THREE.MeshLambertMaterial({
    map: foliageTex || null,
    color: 0x388e3c
  })
  const trunkMat = new THREE.MeshLambertMaterial({
    color: 0x4e342e // tree trunk bark
  })

  cachedMaterials = {
    lanternGlowMat,
    lanternMetalMat,
    ivyMat,
    bannerMatA,
    bannerMatB,
    bannerMatAttacker,
    bannerMatDefender,
    bannerRodMat,
    frameWoodMat,
    signMatMarket,
    signMatTele,
    foliageMat,
    foliageLightMat,
    trunkMat
  }
  return cachedMaterials
}

/**
 * Universal decoration builder enforcing the parent rule:
 * Add decorations ONLY through decorate(parent, type, options) that derives position from parent.
 *
 * @param {Object} parent The parent entity (connector, wallBox, window, planterProp).
 * @param {string} type 'lantern' | 'ivy' | 'banner' | 'windowFrame' | 'doorframe' | 'tree' | 'bush'
 * @param {Object} options Type-specific parameters
 * @returns {THREE.Object3D|null} The created visual decoration mesh or group.
 */
export function decorate(parent, type, options = {}) {
  if (!parent) return null
  const mats = getMaterials()

  switch (type) {
    // ── 1. Lanterns beside connectors wider than 4m (emissive, y=3.2, no real lights) ─
    case 'lantern': {
      // Parent is connector { id, between, rect: [x0, z0, x1, z1], level }
      const [x0, z0, x1, z1] = parent.rect
      const spanX = Math.abs(x1 - x0)
      const spanZ = Math.abs(z1 - z0)
      const openingWidth = Math.max(spanX, spanZ)
      if (openingWidth <= 4.0) {
        // Only connectors wider than 4 m receive lanterns
        return null
      }

      const isXAxis = (spanX >= spanZ)
      const floorY = parent.level ? 3.5 : 0.0
      const lanternY = floorY + 3.2
      const side = options.side || 'left'

      // Derive position on the wall face adjacent to connector opening
      let px = 0, pz = 0
      let bracketRotY = 0

      if (isXAxis) {
        // Doorway opens along X axis. Walls are at x < x0 (west) and x > x1 (east)
        const midZ = (z0 + z1) * 0.5
        if (side === 'left') {
          px = x0 - 0.35
          pz = midZ
          bracketRotY = Math.PI * 0.5
        } else {
          px = x1 + 0.35
          pz = midZ
          bracketRotY = -Math.PI * 0.5
        }
      } else {
        // Doorway opens along Z axis. Walls are at z < z0 (north) and z > z1 (south)
        const midX = (x0 + x1) * 0.5
        if (side === 'left') {
          px = midX
          pz = z0 - 0.35
          bracketRotY = 0
        } else {
          px = midX
          pz = z1 + 0.35
          bracketRotY = Math.PI
        }
      }

      const lanternGroup = new THREE.Group()
      lanternGroup.name = `lantern_${parent.id}_${side}`
      lanternGroup.position.set(px, lanternY, pz)
      lanternGroup.rotation.y = bracketRotY

      // Wall mounting plate & horizontal arm
      const armGeo = new THREE.BoxGeometry(0.08, 0.08, 0.35)
      const armMesh = new THREE.Mesh(armGeo, mats.lanternMetalMat)
      armMesh.position.set(0, 0, 0.175)
      lanternGroup.add(armMesh)

      // Lantern roof cap
      const capGeo = new THREE.ConeGeometry(0.18, 0.12, 4)
      const capMesh = new THREE.Mesh(capGeo, mats.lanternMetalMat)
      capMesh.rotation.y = Math.PI * 0.25
      capMesh.position.set(0, -0.06, 0.35)
      lanternGroup.add(capMesh)

      // Glowing emissive glass core (0.16m x 0.22m x 0.16m, no real point light)
      const glassGeo = new THREE.BoxGeometry(0.16, 0.22, 0.16)
      const glassMesh = new THREE.Mesh(glassGeo, mats.lanternGlowMat)
      glassMesh.position.set(0, -0.20, 0.35)
      lanternGroup.add(glassMesh)

      // Metal base finial
      const baseGeo = new THREE.BoxGeometry(0.18, 0.04, 0.18)
      const baseMesh = new THREE.Mesh(baseGeo, mats.lanternMetalMat)
      baseMesh.position.set(0, -0.32, 0.35)
      lanternGroup.add(baseMesh)

      return lanternGroup
    }

    // ── 2. Ivy Planes 0.05m off wall faces bordering walkable cells (len >= 2m) ─
    case 'ivy': {
      // Parent is a wallBox { minX, maxX, minZ, maxZ, bottomY, topY }
      const face = options.face || 'north'
      const start = options.start
      const end = options.end
      const len = Math.abs(end - start)
      if (len < 2.0) return null // Must be at least 2 m long

      const ivyH = Math.min(3.5, Math.max(2.0, options.height || 2.8))
      const baseY = parent.bottomY || 0.0
      const midY = baseY + ivyH * 0.5

      const ivyMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(len, ivyH),
        mats.ivyMat
      )

      if (face === 'north') {
        // Wall face facing north (+Z)
        const cx = (start + end) * 0.5
        const cz = parent.maxZ + 0.05
        ivyMesh.position.set(cx, midY, cz)
        ivyMesh.rotation.y = 0
      } else if (face === 'south') {
        // Wall face facing south (-Z)
        const cx = (start + end) * 0.5
        const cz = parent.minZ - 0.05
        ivyMesh.position.set(cx, midY, cz)
        ivyMesh.rotation.y = Math.PI
      } else if (face === 'east') {
        // Wall face facing east (+X)
        const cx = parent.maxX + 0.05
        const cz = (start + end) * 0.5
        ivyMesh.position.set(cx, midY, cz)
        ivyMesh.rotation.y = Math.PI * 0.5
      } else if (face === 'west') {
        // Wall face facing west (-X)
        const cx = parent.minX - 0.05
        const cz = (start + end) * 0.5
        ivyMesh.position.set(cx, midY, cz)
        ivyMesh.rotation.y = -Math.PI * 0.5
      }

      return ivyMesh
    }

    // ── 3. Banners: behind plant zones & over each spawn exit ──────────────
    case 'banner': {
      const site = options.site || 'A'
      const bannerGroup = new THREE.Group()
      bannerGroup.name = `banner_${site}_${parent.id || 'wall'}`

      let bannerMat = mats.bannerMatA
      if (site === 'B') bannerMat = mats.bannerMatB
      else if (site === 'attacker') bannerMat = mats.bannerMatAttacker
      else if (site === 'defender') bannerMat = mats.bannerMatDefender

      // Over spawn exit (parent is connector { rect: [x0, z0, x1, z1], level })
      if (parent.rect && (site === 'attacker' || site === 'defender')) {
        const [x0, z0, x1, z1] = parent.rect
        const floorY = parent.level ? 3.5 : 0.0
        const isXSpan = Math.abs(x1 - x0) >= Math.abs(z1 - z0)
        const cx = (x0 + x1) * 0.5
        const cz = (z0 + z1) * 0.5

        const rodY = floorY + 4.35
        const clothH = 1.9
        const clothW = 1.4

        if (isXSpan) {
          // Attached to wall face just outside connector at z0 or z1
          const wallZ = (cz > 0) ? z0 - 0.05 : z1 + 0.05
          const rotY = (cz > 0) ? Math.PI : 0

          const rodGeo = new THREE.CylinderGeometry(0.03, 0.03, clothW + 0.3, 8)
          const rodMesh = new THREE.Mesh(rodGeo, mats.bannerRodMat)
          rodMesh.rotation.z = Math.PI * 0.5
          rodMesh.position.set(cx, rodY, wallZ)
          bannerGroup.add(rodMesh)

          const clothGeo = new THREE.PlaneGeometry(clothW, clothH)
          const clothMesh = new THREE.Mesh(clothGeo, bannerMat)
          clothMesh.position.set(cx, rodY - clothH * 0.5, wallZ + (cz > 0 ? -0.01 : 0.01))
          clothMesh.rotation.y = rotY
          bannerGroup.add(clothMesh)
        } else {
          const wallX = (cx > 0) ? x0 - 0.05 : x1 + 0.05
          const rotY = (cx > 0) ? -Math.PI * 0.5 : Math.PI * 0.5

          const rodGeo = new THREE.CylinderGeometry(0.03, 0.03, clothW + 0.3, 8)
          const rodMesh = new THREE.Mesh(rodGeo, mats.bannerRodMat)
          rodMesh.rotation.x = Math.PI * 0.5
          rodMesh.position.set(wallX, rodY, cz)
          bannerGroup.add(rodMesh)

          const clothGeo = new THREE.PlaneGeometry(clothW, clothH)
          const clothMesh = new THREE.Mesh(clothGeo, bannerMat)
          clothMesh.position.set(wallX + (cx > 0 ? -0.01 : 0.01), rodY - clothH * 0.5, cz)
          clothMesh.rotation.y = rotY
          bannerGroup.add(clothMesh)
        }
        return bannerGroup
      }

      // Site A / B Plant zone banner attached to south perimeter wall behind plant zone
      const plantBox = options.plantBox
      if (!plantBox) return null

      const cx = (plantBox.minX + plantBox.maxX) * 0.5
      const wallFaceZ = parent.maxZ + 0.05

      // Top hanging rod (2.4 m long, 0.08 m diam)
      const rodGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.4, 8)
      const rodMesh = new THREE.Mesh(rodGeo, mats.bannerRodMat)
      rodMesh.rotation.z = Math.PI * 0.5
      rodMesh.position.set(cx, 5.2, wallFaceZ)
      bannerGroup.add(rodMesh)

      // Wall mounting end brackets
      for (const rx of [-1.1, 1.1]) {
        const bracketGeo = new THREE.BoxGeometry(0.08, 0.12, 0.1)
        const bracketMesh = new THREE.Mesh(bracketGeo, mats.lanternMetalMat)
        bracketMesh.position.set(cx + rx, 5.2, wallFaceZ - 0.03)
        bannerGroup.add(bracketMesh)
      }

      // Hanging fabric banner (2.0 m wide, 3.4 m tall, y=5.1 down to 1.7)
      const clothGeo = new THREE.PlaneGeometry(2.0, 3.4)
      const clothMesh = new THREE.Mesh(clothGeo, bannerMat)
      clothMesh.position.set(cx, 3.4, wallFaceZ + 0.01)
      bannerGroup.add(clothMesh)

      return bannerGroup
    }

    // ── 4. Window frames for `windows` (#4a3220 dark wood, 0.2m wide, 0.15m deep, flush with wall) ──
    case 'windowFrame': {
      // Parent is window entry { id, rect: [x0, z0, x1, z1], sillAboveFloor, headAboveFloor, floorLevel }
      const [x0, z0, x1, z1] = parent.rect
      const floorY = parent.floorLevel ? 3.5 : 0.0
      const sillY = floorY + parent.sillAboveFloor
      const headY = floorY + parent.headAboveFloor
      const openHeight = headY - sillY

      const spanX = Math.abs(x1 - x0)
      const spanZ = Math.abs(z1 - z0)
      const isXSpan = spanX >= spanZ
      const fw = 0.20 // 0.2 m wide frame member
      const fd = 0.15 // 0.15 m deep flush with the wall face

      const frameGroup = new THREE.Group()
      frameGroup.name = `frame_${parent.id}`

      const checkWalk = options.isWalkableFace || (() => true)

      if (isXSpan) {
        // Window opening along X axis
        const faces = [
          { side: 'north', inZ0: z0, inZ1: z0 + fd, sillZ0: z0 - 0.10, sillZ1: z0 },
          { side: 'south', inZ0: z1 - fd, inZ1: z1, sillZ0: z1, sillZ1: z1 + 0.10 }
        ]

        for (const f of faces) {
          if (!checkWalk(f.side, x0, z0, x1, z1)) continue
          const midZ = (f.inZ0 + f.inZ1) * 0.5

          // Left jamb
          const leftJambGeo = new THREE.BoxGeometry(fw, openHeight, fd)
          const leftJamb = new THREE.Mesh(leftJambGeo, mats.frameWoodMat)
          leftJamb.position.set(x0 + fw * 0.5, (sillY + headY) * 0.5, midZ)
          frameGroup.add(leftJamb)

          // Right jamb
          const rightJambGeo = new THREE.BoxGeometry(fw, openHeight, fd)
          const rightJamb = new THREE.Mesh(rightJambGeo, mats.frameWoodMat)
          rightJamb.position.set(x1 - fw * 0.5, (sillY + headY) * 0.5, midZ)
          frameGroup.add(rightJamb)

          // Head (lintel)
          const headGeo = new THREE.BoxGeometry(spanX, fw, fd)
          const headMesh = new THREE.Mesh(headGeo, mats.frameWoodMat)
          headMesh.position.set((x0 + x1) * 0.5, headY - fw * 0.5, midZ)
          frameGroup.add(headMesh)

          // 0.1 m protruding sill ledge at bottom of window
          const sillLedgeGeo = new THREE.BoxGeometry(spanX + 0.1, 0.1, 0.1)
          const sillLedge = new THREE.Mesh(sillLedgeGeo, mats.frameWoodMat)
          const sillMidZ = (f.sillZ0 + f.sillZ1) * 0.5
          sillLedge.position.set((x0 + x1) * 0.5, sillY - 0.05, sillMidZ)
          frameGroup.add(sillLedge)
        }

        // Center divider mullion
        const mullionGeo = new THREE.BoxGeometry(0.08, openHeight, spanZ)
        const mullionMesh = new THREE.Mesh(mullionGeo, mats.frameWoodMat)
        mullionMesh.position.set((x0 + x1) * 0.5, (sillY + headY) * 0.5, (z0 + z1) * 0.5)
        frameGroup.add(mullionMesh)
      } else {
        // Window opening along Z axis
        const faces = [
          { side: 'west', inX0: x0, inX1: x0 + fd, sillX0: x0 - 0.10, sillX1: x0 },
          { side: 'east', inX0: x1 - fd, inX1: x1, sillX0: x1, sillX1: x1 + 0.10 }
        ]

        for (const f of faces) {
          if (!checkWalk(f.side, x0, z0, x1, z1)) continue
          const midX = (f.inX0 + f.inX1) * 0.5

          // Left jamb
          const leftJambGeo = new THREE.BoxGeometry(fd, openHeight, fw)
          const leftJamb = new THREE.Mesh(leftJambGeo, mats.frameWoodMat)
          leftJamb.position.set(midX, (sillY + headY) * 0.5, z0 + fw * 0.5)
          frameGroup.add(leftJamb)

          // Right jamb
          const rightJambGeo = new THREE.BoxGeometry(fd, openHeight, fw)
          const rightJamb = new THREE.Mesh(rightJambGeo, mats.frameWoodMat)
          rightJamb.position.set(midX, (sillY + headY) * 0.5, z1 - fw * 0.5)
          frameGroup.add(rightJamb)

          // Head (lintel)
          const headGeo = new THREE.BoxGeometry(fd, fw, spanZ)
          const headMesh = new THREE.Mesh(headGeo, mats.frameWoodMat)
          headMesh.position.set(midX, headY - fw * 0.5, (z0 + z1) * 0.5)
          frameGroup.add(headMesh)

          // 0.1 m protruding sill ledge at bottom of window
          const sillLedgeGeo = new THREE.BoxGeometry(0.1, 0.1, spanZ + 0.1)
          const sillLedge = new THREE.Mesh(sillLedgeGeo, mats.frameWoodMat)
          const sillMidX = (f.sillX0 + f.sillX1) * 0.5
          sillLedge.position.set(sillMidX, sillY - 0.05, (z0 + z1) * 0.5)
          frameGroup.add(sillLedge)
        }

        // Center divider mullion
        const mullionGeo = new THREE.BoxGeometry(spanX, openHeight, 0.08)
        const mullionMesh = new THREE.Mesh(mullionGeo, mats.frameWoodMat)
        mullionMesh.position.set((x0 + x1) * 0.5, (sillY + headY) * 0.5, (z0 + z1) * 0.5)
        frameGroup.add(mullionMesh)
      }

      return frameGroup
    }

    // ── 5. Doorframes for connectors (#4a3220 dark wood, 0.2m wide, 0.15m deep, flush with wall) ─
    case 'doorframe': {
      // Parent is connector { id, rect: [x0, z0, x1, z1], level }
      const [x0, z0, x1, z1] = parent.rect
      const floorY = parent.level ? 3.5 : 0.0
      const doorHeight = 4.0 // Standard doorway opening is 4.0m
      const spanX = Math.abs(x1 - x0)
      const spanZ = Math.abs(z1 - z0)
      const isXSpan = spanX >= spanZ

      const fw = 0.20 // 0.2 m wide frame member
      const fd = 0.15 // 0.15 m deep flush with the wall face

      const frameGroup = new THREE.Group()
      frameGroup.name = `doorframe_${parent.id}`

      const checkWalk = options.isWalkableFace || (() => true)

      if (isXSpan) {
        // Doorway span is along X. Wall faces are at z0 (north) and z1 (south).
        const faces = [
          { side: 'north', inZ0: z0, inZ1: z0 + fd },
          { side: 'south', inZ0: z1 - fd, inZ1: z1 }
        ]

        for (const f of faces) {
          if (!checkWalk(f.side, x0, z0, x1, z1)) continue
          const midZ = (f.inZ0 + f.inZ1) * 0.5

          // Lintel at doorway top
          const lintelGeo = new THREE.BoxGeometry(spanX, fw, fd)
          const lintelMesh = new THREE.Mesh(lintelGeo, mats.frameWoodMat)
          lintelMesh.position.set((x0 + x1) * 0.5, floorY + doorHeight - fw * 0.5, midZ)
          frameGroup.add(lintelMesh)

          // Left jamb
          const leftJambGeo = new THREE.BoxGeometry(fw, doorHeight - fw, fd)
          const leftJamb = new THREE.Mesh(leftJambGeo, mats.frameWoodMat)
          leftJamb.position.set(x0 + fw * 0.5, floorY + (doorHeight - fw) * 0.5, midZ)
          frameGroup.add(leftJamb)

          // Right jamb
          const rightJambGeo = new THREE.BoxGeometry(fw, doorHeight - fw, fd)
          const rightJamb = new THREE.Mesh(rightJambGeo, mats.frameWoodMat)
          rightJamb.position.set(x1 - fw * 0.5, floorY + (doorHeight - fw) * 0.5, midZ)
          frameGroup.add(rightJamb)
        }
      } else {
        // Doorway span is along Z. Wall faces are at x0 (west) and x1 (east).
        const faces = [
          { side: 'west', inX0: x0, inX1: x0 + fd },
          { side: 'east', inX0: x1 - fd, inX1: x1 }
        ]

        for (const f of faces) {
          if (!checkWalk(f.side, x0, z0, x1, z1)) continue
          const midX = (f.inX0 + f.inX1) * 0.5

          // Lintel at doorway top
          const lintelGeo = new THREE.BoxGeometry(fd, fw, spanZ)
          const lintelMesh = new THREE.Mesh(lintelGeo, mats.frameWoodMat)
          lintelMesh.position.set(midX, floorY + doorHeight - fw * 0.5, (z0 + z1) * 0.5)
          frameGroup.add(lintelMesh)

          // Left jamb
          const leftJambGeo = new THREE.BoxGeometry(fd, doorHeight - fw, fw)
          const leftJamb = new THREE.Mesh(leftJambGeo, mats.frameWoodMat)
          leftJamb.position.set(midX, floorY + (doorHeight - fw) * 0.5, z0 + fw * 0.5)
          frameGroup.add(leftJamb)

          // Right jamb
          const rightJambGeo = new THREE.BoxGeometry(fd, doorHeight - fw, fw)
          const rightJamb = new THREE.Mesh(rightJambGeo, mats.frameWoodMat)
          rightJamb.position.set(midX, floorY + (doorHeight - fw) * 0.5, z1 - fw * 0.5)
          frameGroup.add(rightJamb)
        }
      }

      return frameGroup
    }

    // ── 5b. Hanging Signs over Market and Teleporter Room Doors ──────────────
    case 'sign': {
      // Parent is connector { id, rect: [x0, z0, x1, z1], level }
      const [x0, z0, x1, z1] = parent.rect
      const floorY = parent.level ? 3.5 : 0.0
      const spanX = Math.abs(x1 - x0)
      const spanZ = Math.abs(z1 - z0)
      const isXSpan = spanX >= spanZ
      const signType = options.signType || 'market'
      const signMat = (signType === 'market') ? mats.signMatMarket : mats.signMatTele

      const signGroup = new THREE.Group()
      signGroup.name = `sign_${signType}_${parent.id}`

      const cx = (x0 + x1) * 0.5
      const cz = (z0 + z1) * 0.5
      const armY = floorY + 4.15
      const signY = floorY + 3.8

      if (isXSpan) {
        // Arm extends perpendicular to X along Z
        const armGeo = new THREE.BoxGeometry(0.08, 0.08, 0.45)
        const armMesh = new THREE.Mesh(armGeo, mats.lanternMetalMat)
        armMesh.position.set(cx, armY, cz)
        signGroup.add(armMesh)

        // Hanging chains
        for (const dx of [-0.3, 0.3]) {
          const chainGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.25, 4)
          const chain = new THREE.Mesh(chainGeo, mats.lanternMetalMat)
          chain.position.set(cx + dx, armY - 0.125, cz)
          signGroup.add(chain)
        }

        // Sign board (0.85m wide x 0.45m tall)
        const boardGeo = new THREE.BoxGeometry(0.85, 0.45, 0.05)
        const boardMesh = new THREE.Mesh(boardGeo, signMat)
        boardMesh.position.set(cx, signY, cz)
        signGroup.add(boardMesh)
      } else {
        // Arm extends perpendicular to Z along X
        const armGeo = new THREE.BoxGeometry(0.45, 0.08, 0.08)
        const armMesh = new THREE.Mesh(armGeo, mats.lanternMetalMat)
        armMesh.position.set(cx, armY, cz)
        signGroup.add(armMesh)

        for (const dz of [-0.3, 0.3]) {
          const chainGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.25, 4)
          const chain = new THREE.Mesh(chainGeo, mats.lanternMetalMat)
          chain.position.set(cx, armY - 0.125, cz + dz)
          signGroup.add(chain)
        }

        const boardGeo = new THREE.BoxGeometry(0.05, 0.45, 0.85)
        const boardMesh = new THREE.Mesh(boardGeo, signMat)
        boardMesh.position.set(cx, signY, cz)
        signGroup.add(boardMesh)
      }

      return signGroup
    }

    // ── 6. Trees ONLY inside planters of gardens/lobbies ────────────────────
    case 'tree': {
      // Parent is planter prop { id, rect: [x0, z0, x1, z1], height, topY, bottomY }
      const cx = (parent.minX + parent.maxX) * 0.5
      const cz = (parent.minZ + parent.maxZ) * 0.5
      const rootY = parent.topY // Rooted directly on planter top surface

      const treeGroup = new THREE.Group()
      treeGroup.name = `tree_${parent.id}`
      treeGroup.position.set(cx, rootY, cz)

      // Trunk (0.28m x 1.4m x 0.28m)
      const trunkGeo = new THREE.BoxGeometry(0.28, 1.4, 0.28)
      const trunkMesh = new THREE.Mesh(trunkGeo, mats.trunkMat)
      trunkMesh.position.set(0, 0.7, 0)
      treeGroup.add(trunkMesh)

      // Canopy base (wide lush foliage layer: 2.2m x 0.9m x 2.2m)
      const canopyBaseGeo = new THREE.BoxGeometry(2.2, 0.9, 2.2)
      const canopyBaseMesh = new THREE.Mesh(canopyBaseGeo, mats.foliageMat)
      canopyBaseMesh.position.set(0, 1.7, 0)
      treeGroup.add(canopyBaseMesh)

      // Canopy middle layer (1.7m x 0.8m x 1.7m)
      const canopyMidGeo = new THREE.BoxGeometry(1.7, 0.8, 1.7)
      const canopyMidMesh = new THREE.Mesh(canopyMidGeo, mats.foliageLightMat)
      canopyMidMesh.position.set(0, 2.4, 0)
      treeGroup.add(canopyMidMesh)

      // Canopy top layer (1.1m x 0.6m x 1.1m)
      const canopyTopGeo = new THREE.BoxGeometry(1.1, 0.6, 1.1)
      const canopyTopMesh = new THREE.Mesh(canopyTopGeo, mats.foliageMat)
      canopyTopMesh.position.set(0, 2.9, 0)
      treeGroup.add(canopyTopMesh)

      return treeGroup
    }

    // ── 7. Bushes ONLY inside planters of gardens/lobbies ───────────────────
    case 'bush': {
      // Parent is planter prop
      const cx = (parent.minX + parent.maxX) * 0.5 + (options.offsetX || 0)
      const cz = (parent.minZ + parent.maxZ) * 0.5 + (options.offsetZ || 0)
      const rootY = parent.topY

      const bushGroup = new THREE.Group()
      bushGroup.name = `bush_${parent.id}_${Math.round(cx)}_${Math.round(cz)}`
      bushGroup.position.set(cx, rootY, cz)

      const scale = options.scale || 1.0
      // Main central bush cluster
      const baseBushGeo = new THREE.BoxGeometry(1.2 * scale, 0.8 * scale, 1.2 * scale)
      const baseBushMesh = new THREE.Mesh(baseBushGeo, mats.foliageMat)
      baseBushMesh.position.set(0, 0.4 * scale, 0)
      bushGroup.add(baseBushMesh)

      // Top leafy tier
      const topBushGeo = new THREE.BoxGeometry(0.8 * scale, 0.5 * scale, 0.8 * scale)
      const topBushMesh = new THREE.Mesh(topBushGeo, mats.foliageLightMat)
      topBushMesh.position.set(0, 0.85 * scale, 0)
      bushGroup.add(topBushMesh)

      return bushGroup
    }

    default:
      return null
  }
}
