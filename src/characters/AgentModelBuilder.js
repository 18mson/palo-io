import * as THREE from 'three'

/**
 * AgentModelBuilder — builds detailed stylized low-poly Valorant-inspired agent models
 */
export class AgentModelBuilder {
  static build(agent, weaponDef) {
    const root = new THREE.Group()
    const hitboxes = []

    const bodyColor = agent.bodyColor ?? 0xf1f5f9
    const vestColor = agent.vestColor ?? 0xff4655
    const accentColor = agent.accentColor ?? 0xff6b35

    // Materials
    // 1. Jacket / primary uniform (bright and distinctive per agent)
    const baseMat = new THREE.MeshStandardMaterial({
      color: bodyColor,
      roughness: 0.45,
      metalness: 0.15
    })
    // 2. Tactical armor chestplate & knee pads (distinct vibrant combat vest color)
    const armorMat = new THREE.MeshStandardMaterial({
      color: vestColor,
      roughness: 0.40,
      metalness: 0.25
    })
    // 3. Radiant Accent stripe / insignia (emissive glow)
    const accentMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      emissive: accentColor,
      emissiveIntensity: 0.70,
      roughness: 0.20
    })
    // 4. Skin tone (warm, natural, healthy)
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xf2c49d,
      roughness: 0.65
    })
    // 5. Tactical cargo pants (clean high-contrast navy slate, NOT black!)
    const pantsMat = new THREE.MeshStandardMaterial({
      color: 0x334458,
      roughness: 0.65,
      metalness: 0.10
    })
    // 6. Tactical boots, belt & utility pouches (clean dark graphite with contrast)
    const gearMat = new THREE.MeshStandardMaterial({
      color: 0x242d38,
      roughness: 0.60,
      metalness: 0.20
    })
    // 7. Enemy combat outline highlight (Valorant red silhouette edge)
    const outlineMat = new THREE.LineBasicMaterial({
      color: 0xff2840,
      transparent: true,
      opacity: 0.85
    })

    // ── 1. TORSO & VEST (Multi-poly tactical cut) ──
    const torso = new THREE.Group()
    torso.position.y = 0.55

    // Upper Chest with tapered V-shape (cylinder 8 segments)
    const chestGeo = new THREE.CylinderGeometry(0.38, 0.32, 0.52, 8)
    const chestMesh = new THREE.Mesh(chestGeo, baseMat)
    chestMesh.position.y = 0.16
    chestMesh.castShadow = true
    chestMesh.receiveShadow = true
    chestMesh.userData.isHead = false
    chestMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(chestGeo), outlineMat))
    torso.add(chestMesh)
    hitboxes.push(chestMesh)

    // Abdominal core taper (navy slate tactical undershirt)
    const absGeo = new THREE.CylinderGeometry(0.32, 0.30, 0.36, 8)
    const absMesh = new THREE.Mesh(absGeo, pantsMat)
    absMesh.position.y = -0.18
    absMesh.castShadow = true
    torso.add(absMesh)

    // Molded Tactical Armor Chestplate (curved front plate)
    const vestGeo = new THREE.CylinderGeometry(0.36, 0.34, 0.44, 8, 1, false, -Math.PI / 2, Math.PI)
    const vestMesh = new THREE.Mesh(vestGeo, armorMat)
    vestMesh.position.set(0, 0.14, 0.05)
    vestMesh.castShadow = true
    vestMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(vestGeo), outlineMat))
    torso.add(vestMesh)

    // Accent chest stripe
    const stripeGeo = new THREE.BoxGeometry(0.46, 0.06, 0.32)
    const stripeMesh = new THREE.Mesh(stripeGeo, accentMat)
    stripeMesh.position.set(0, 0.18, 0.12)
    torso.add(stripeMesh)

    // Tactical utility belt with pouches
    const beltGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.12, 12)
    const beltMesh = new THREE.Mesh(beltGeo, gearMat)
    beltMesh.position.y = -0.36
    torso.add(beltMesh)

    for (let i = -1; i <= 1; i += 2) {
      const pouchGeo = new THREE.BoxGeometry(0.12, 0.14, 0.14)
      const pouch = new THREE.Mesh(pouchGeo, gearMat)
      pouch.position.set(i * 0.36, -0.36, 0.05)
      torso.add(pouch)
    }

    // Tactical shoulder pauldrons with angled tilt
    const padGeo = new THREE.CylinderGeometry(0.12, 0.10, 0.22, 6)
    padGeo.rotateZ(Math.PI / 2)
    const padL = new THREE.Mesh(padGeo, armorMat)
    padL.position.set(-0.46, 0.32, 0)
    padL.rotation.z = 0.25
    padL.castShadow = true
    padL.add(new THREE.LineSegments(new THREE.EdgesGeometry(padGeo), outlineMat))
    const padR = new THREE.Mesh(padGeo, armorMat)
    padR.position.set(0.46, 0.32, 0)
    padR.rotation.z = -0.25
    padR.castShadow = true
    padR.add(new THREE.LineSegments(new THREE.EdgesGeometry(padGeo), outlineMat))
    torso.add(padL)
    torso.add(padR)

    // Side tactical holster (right hip)
    const holsterGeo = new THREE.BoxGeometry(0.12, 0.26, 0.16)
    const holsterMesh = new THREE.Mesh(holsterGeo, gearMat)
    holsterMesh.position.set(0.40, -0.42, 0.05)
    holsterMesh.rotation.z = -0.15
    torso.add(holsterMesh)

    // Tactical sidearm handle
    const pistolGripGeo = new THREE.BoxGeometry(0.06, 0.12, 0.08)
    const pistolGrip = new THREE.Mesh(pistolGripGeo, armorMat)
    pistolGrip.position.set(0.43, -0.30, 0.05)
    pistolGrip.rotation.z = -0.3
    torso.add(pistolGrip)

    // Tactical radio / comms unit on left shoulder
    const radioGeo = new THREE.BoxGeometry(0.09, 0.16, 0.08)
    const radioMesh = new THREE.Mesh(radioGeo, gearMat)
    radioMesh.position.set(-0.32, 0.36, 0.16)
    const antennaGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.18)
    const antennaMesh = new THREE.Mesh(antennaGeo, gearMat)
    antennaMesh.position.set(-0.32, 0.50, 0.16)
    torso.add(radioMesh)
    torso.add(antennaMesh)

    // Radiant Agent Chest Insignia
    const emblemGeo = new THREE.BoxGeometry(0.12, 0.12, 0.04)
    const emblemMat = new THREE.MeshBasicMaterial({ color: accentColor })
    const emblem = new THREE.Mesh(emblemGeo, emblemMat)
    emblem.position.set(0, 0.18, 0.24)
    emblem.rotation.z = Math.PI / 4
    torso.add(emblem)

    root.add(torso)

    // ── 2. HEAD & AGENT-SPECIFIC GEAR (Multi-faceted 8-sided geometry) ──
    const headGroup = new THREE.Group()
    headGroup.position.y = 1.48

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.18, 8)
    const neckMesh = new THREE.Mesh(neckGeo, skinMat)
    neckMesh.position.y = -0.18
    headGroup.add(neckMesh)

    // Head base (8-sided tapered cylinder for natural facial contour)
    const headGeo = new THREE.CylinderGeometry(0.24, 0.20, 0.44, 8)
    const headMesh = new THREE.Mesh(headGeo, skinMat)
    headMesh.userData.isHead = true
    headMesh.castShadow = true
    headMesh.receiveShadow = true
    headMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(headGeo), outlineMat))
    headGroup.add(headMesh)
    hitboxes.push(headMesh)

    // Agent Specific Head Customization
    switch (agent.id) {
      case 'blaze': {
        const collarGeo = new THREE.CylinderGeometry(0.28, 0.26, 0.24, 8)
        const collarMesh = new THREE.Mesh(collarGeo, gearMat)
        collarMesh.position.y = -0.16
        headGroup.add(collarMesh)

        // Spiky Flame Hair (multi-segment stylized flame)
        const hairGeo = new THREE.ConeGeometry(0.26, 0.38, 7)
        const hairMat = new THREE.MeshStandardMaterial({
          color: 0xff6b35,
          emissive: 0xff4655,
          emissiveIntensity: 0.65
        })
        const hairMesh = new THREE.Mesh(hairGeo, hairMat)
        hairMesh.position.set(0, 0.32, -0.04)
        headGroup.add(hairMesh)
        break
      }
      case 'cipher': {
        const bunGeo = new THREE.SphereGeometry(0.13, 8, 8)
        const bunMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })
        const bunMesh = new THREE.Mesh(bunGeo, bunMat)
        bunMesh.position.set(0, 0.32, -0.14)
        headGroup.add(bunMesh)

        const bandGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.1, 8)
        const bandMesh = new THREE.Mesh(bandGeo, accentMat)
        bandMesh.position.y = 0.12
        headGroup.add(bandMesh)
        break
      }
      case 'scope': {
        const cowlGeo = new THREE.CylinderGeometry(0.27, 0.27, 0.28, 8)
        const cowlMesh = new THREE.Mesh(cowlGeo, baseMat)
        cowlMesh.position.y = 0.18
        headGroup.add(cowlMesh)

        const eyeGeo = new THREE.BoxGeometry(0.12, 0.08, 0.06)
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff })
        const eyeMesh = new THREE.Mesh(eyeGeo, eyeMat)
        eyeMesh.position.set(-0.10, 0.05, 0.20)
        headGroup.add(eyeMesh)
        break
      }
      case 'rampart': {
        const beanieGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.24, 8)
        const beanieMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, roughness: 0.75 }) // Vibrant purple beanie
        const beanieMesh = new THREE.Mesh(beanieGeo, beanieMat)
        beanieMesh.position.y = 0.24
        headGroup.add(beanieMesh)

        const glassGeo = new THREE.BoxGeometry(0.34, 0.10, 0.06)
        const glassMat = new THREE.MeshStandardMaterial({ color: 0xffd166, metalness: 0.8, roughness: 0.2 })
        const glassMesh = new THREE.Mesh(glassGeo, glassMat)
        glassMesh.position.set(0, 0.05, 0.20)
        headGroup.add(glassMesh)
        break
      }
      case 'phantom': {
        const hoodGeo = new THREE.CylinderGeometry(0.28, 0.27, 0.48, 8)
        const hoodMat = new THREE.MeshStandardMaterial({
          color: 0x6b21a8,
          emissive: 0x4c1d95,
          emissiveIntensity: 0.45,
          roughness: 0.55
        })
        const hoodMesh = new THREE.Mesh(hoodGeo, hoodMat)
        headGroup.add(hoodMesh)

        const slitMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff })
        for (let i = -1; i <= 1; i++) {
          const slitGeo = new THREE.BoxGeometry(0.04, 0.16, 0.04)
          const slitMesh = new THREE.Mesh(slitGeo, slitMat)
          slitMesh.position.set(i * 0.09, 0.05, 0.22)
          headGroup.add(slitMesh)
        }
        break
      }
    }

    root.add(headGroup)

    // ── 3. ARMS (Jointed anatomical 8-sided cylinders) ──
    const armGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.65, 8)

    const armL = new THREE.Mesh(armGeo, baseMat)
    armL.position.set(-0.44, 0.45, 0.12)
    armL.rotation.x = -Math.PI / 4
    armL.rotation.z = Math.PI / 12
    armL.castShadow = true
    armL.add(new THREE.LineSegments(new THREE.EdgesGeometry(armGeo), outlineMat))
    root.add(armL)

    const armR = new THREE.Mesh(armGeo, baseMat)
    armR.position.set(0.44, 0.45, 0.12)
    armR.rotation.x = -Math.PI / 4
    armR.rotation.z = -Math.PI / 12
    armR.castShadow = true
    armR.add(new THREE.LineSegments(new THREE.EdgesGeometry(armGeo), outlineMat))
    root.add(armR)

    // ── 4. LEGS (Thighs, Knee Pads & Tactical Boots) ──
    const thighGeo = new THREE.CylinderGeometry(0.13, 0.11, 0.82, 8)
    const padLegGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.18, 6)
    padLegGeo.rotateZ(Math.PI / 2)
    const bootGeo = new THREE.BoxGeometry(0.24, 0.24, 0.36)

    // Left leg group (Tactical cargo trousers in navy slate - grounded flush at floor level)
    const legLGroup = new THREE.Group()
    legLGroup.position.set(-0.18, 0.0, 0)

    const legLMesh = new THREE.Mesh(thighGeo, pantsMat)
    legLMesh.position.y = -0.42
    legLMesh.castShadow = true
    legLMesh.userData.isHead = false
    legLGroup.add(legLMesh)
    hitboxes.push(legLMesh)

    const kneeL = new THREE.Mesh(padLegGeo, armorMat)
    kneeL.position.set(0, -0.38, 0.12)
    kneeL.add(new THREE.LineSegments(new THREE.EdgesGeometry(padLegGeo), outlineMat))
    legLGroup.add(kneeL)

    const bootL = new THREE.Mesh(bootGeo, gearMat)
    bootL.position.set(0, -0.78, 0.05)
    bootL.castShadow = true
    legLGroup.add(bootL)
    root.add(legLGroup)

    // Right leg group
    const legRGroup = new THREE.Group()
    legRGroup.position.set(0.18, 0.0, 0)

    const legRMesh = new THREE.Mesh(thighGeo, pantsMat)
    legRMesh.position.y = -0.42
    legRMesh.castShadow = true
    legRMesh.userData.isHead = false
    legRGroup.add(legRMesh)
    hitboxes.push(legRMesh)

    const kneeR = new THREE.Mesh(padLegGeo, armorMat)
    kneeR.position.set(0, -0.38, 0.12)
    kneeR.add(new THREE.LineSegments(new THREE.EdgesGeometry(padLegGeo), outlineMat))
    legRGroup.add(kneeR)

    const bootR = new THREE.Mesh(bootGeo, gearMat)
    bootR.position.set(0, -0.78, 0.05)
    bootR.castShadow = true
    legRGroup.add(bootR)
    root.add(legRGroup)

    // ── 5. WEAPON HELD IN HANDS (Distinct per weaponId) ──
    const gunGroup = new THREE.Group()
    const gunSteelMat = new THREE.MeshStandardMaterial({ color: 0x3b4856, metalness: 0.6, roughness: 0.35 })
    const wId = weaponDef?.id ?? 'vandal'

    switch (wId) {
      case 'spectre': {
        const smgBody = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.35), gunSteelMat)
        gunGroup.add(smgBody)
        const silencer = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.32, 8), gearMat)
        silencer.geometry.rotateX(Math.PI / 2)
        silencer.position.set(0, 0.02, -0.32)
        gunGroup.add(silencer)
        const smgMag = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.22, 0.06), gearMat)
        smgMag.position.set(0, -0.12, 0.02)
        gunGroup.add(smgMag)
        break
      }
      case 'operator': {
        const sniperBody = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.15, 0.75), gunSteelMat)
        gunGroup.add(sniperBody)
        const sniperBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.022, 0.65, 8), gearMat)
        sniperBarrel.geometry.rotateX(Math.PI / 2)
        sniperBarrel.position.set(0, 0.03, -0.68)
        gunGroup.add(sniperBarrel)
        const scope = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.042, 0.38, 8), armorMat)
        scope.geometry.rotateX(Math.PI / 2)
        scope.position.set(0, 0.14, -0.05)
        gunGroup.add(scope)
        break
      }
      case 'odin': {
        const lmgBody = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.16, 0.55), gunSteelMat)
        gunGroup.add(lmgBody)
        const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.16, 12), armorMat)
        drum.geometry.rotateZ(Math.PI / 2)
        drum.position.set(-0.13, -0.10, 0.02)
        gunGroup.add(drum)
        break
      }
      case 'bucky': {
        const shotBody = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.13, 0.48), gunSteelMat)
        gunGroup.add(shotBody)
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.42, 8), gearMat)
        barrel.geometry.rotateX(Math.PI / 2)
        barrel.position.set(0, 0.04, -0.42)
        gunGroup.add(barrel)
        break
      }
      case 'classic': {
        const pistolBody = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.10, 0.28), gearMat)
        gunGroup.add(pistolBody)
        const slide = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.06, 0.28), gunSteelMat)
        slide.position.set(0, 0.06, 0)
        gunGroup.add(slide)
        break
      }
      case 'vandal':
      default: {
        const rifleBody = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.13, 0.52), gunSteelMat)
        gunGroup.add(rifleBody)
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.38, 8), gearMat)
        barrel.geometry.rotateX(Math.PI / 2)
        barrel.position.set(0, 0.03, -0.44)
        gunGroup.add(barrel)
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.24, 0.10), armorMat)
        mag.geometry.rotateX(-0.25)
        mag.position.set(0, -0.12, -0.06)
        gunGroup.add(mag)
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.025, 0.36), accentMat)
        stripe.position.set(0, 0.04, -0.05)
        gunGroup.add(stripe)
        break
      }
    }

    gunGroup.position.set(0.2, 0.58, 0.45)
    root.add(gunGroup)

    return {
      root,
      hitboxes,
      legL: legLGroup,
      legR: legRGroup,
      armL,
      armR,
      torso,
      headGroup,
      gunGroup
    }
  }
}
