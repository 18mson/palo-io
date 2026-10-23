import * as THREE from 'three'
import {
  createBrushedSteelTexture,
  createCarbonFiberTexture,
  createPolymerGripTexture
} from '../weapons/WeaponTextures.js'

/**
 * AgentModelBuilder — builds detailed stylized low-poly Valorant-inspired agent models
 * Continuous anatomical humanoid hierarchy: Legs -> Torso -> Neck -> Head with zero gap
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
    // 5. Tactical cargo pants
    const pantsMat = new THREE.MeshStandardMaterial({
      color: 0x334458,
      roughness: 0.65,
      metalness: 0.10
    })
    // 6. Tactical boots, belt & utility pouches
    const gearMat = new THREE.MeshStandardMaterial({
      color: 0x242d38,
      roughness: 0.60,
      metalness: 0.20
    })
    // 7. Tactical optics visor / combat goggles (radiant glow)
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00c4d8,
      emissiveIntensity: 0.85,
      roughness: 0.15,
      metalness: 0.80
    })
    // 8. Enemy combat outline highlight (Valorant red silhouette edge)
    const outlineMat = new THREE.LineBasicMaterial({
      color: 0xff2840,
      transparent: true,
      opacity: 0.85
    })

    // ── 1. TORSO & VEST (Continuous pelvic-to-collar anatomical assembly) ──
    const torso = new THREE.Group()
    torso.position.set(0, 0, 0)

    // Pelvis / Groin connector (seamlessly connects top of thighs at y=0)
    const pelvisGeo = new THREE.CylinderGeometry(0.20, 0.18, 0.12, 8)
    const pelvisMesh = new THREE.Mesh(pelvisGeo, pantsMat)
    pelvisMesh.position.y = 0.05
    pelvisMesh.castShadow = true
    pelvisMesh.userData.hitPart = 'body'
    pelvisMesh.userData.isBody = true
    torso.add(pelvisMesh)
    hitboxes.push(pelvisMesh)

    // Tactical utility belt with pouches
    const beltGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.08, 12)
    const beltMesh = new THREE.Mesh(beltGeo, gearMat)
    beltMesh.position.y = 0.11
    torso.add(beltMesh)

    for (let i = -1; i <= 1; i += 2) {
      const pouchGeo = new THREE.BoxGeometry(0.08, 0.09, 0.09)
      const pouch = new THREE.Mesh(pouchGeo, gearMat)
      pouch.position.set(i * 0.22, 0.11, 0.04)
      torso.add(pouch)
    }

    // Side tactical holster (right hip)
    const holsterGeo = new THREE.BoxGeometry(0.08, 0.18, 0.11)
    const holsterMesh = new THREE.Mesh(holsterGeo, gearMat)
    holsterMesh.position.set(0.24, 0.02, 0.04)
    holsterMesh.rotation.z = -0.15
    torso.add(holsterMesh)

    // Tactical sidearm handle
    const pistolGripGeo = new THREE.BoxGeometry(0.04, 0.08, 0.05)
    const pistolGrip = new THREE.Mesh(pistolGripGeo, armorMat)
    pistolGrip.position.set(0.26, 0.10, 0.04)
    pistolGrip.rotation.z = -0.3
    torso.add(pistolGrip)

    // Abdominal core taper (navy slate tactical undershirt)
    const absGeo = new THREE.CylinderGeometry(0.21, 0.19, 0.18, 8)
    const absMesh = new THREE.Mesh(absGeo, pantsMat)
    absMesh.position.y = 0.23
    absMesh.castShadow = true
    absMesh.userData.hitPart = 'body'
    absMesh.userData.isBody = true
    torso.add(absMesh)
    hitboxes.push(absMesh)

    // Upper Chest with tapered V-shape (cylinder 8 segments)
    const chestGeo = new THREE.CylinderGeometry(0.24, 0.20, 0.30, 8)
    const chestMesh = new THREE.Mesh(chestGeo, baseMat)
    chestMesh.position.y = 0.46
    chestMesh.castShadow = true
    chestMesh.receiveShadow = true
    chestMesh.userData.hitPart = 'body'
    chestMesh.userData.isBody = true
    chestMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(chestGeo), outlineMat))
    torso.add(chestMesh)
    hitboxes.push(chestMesh)

    // Molded Tactical Armor Chestplate (curved front plate)
    const vestGeo = new THREE.CylinderGeometry(0.24, 0.21, 0.28, 8, 1, false, -Math.PI / 2, Math.PI)
    const vestMesh = new THREE.Mesh(vestGeo, armorMat)
    vestMesh.position.set(0, 0.46, 0.03)
    vestMesh.castShadow = true
    vestMesh.userData.hitPart = 'body'
    vestMesh.userData.isBody = true
    vestMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(vestGeo), outlineMat))
    torso.add(vestMesh)
    hitboxes.push(vestMesh)

    // Accent chest stripe
    const stripeGeo = new THREE.BoxGeometry(0.30, 0.045, 0.22)
    const stripeMesh = new THREE.Mesh(stripeGeo, accentMat)
    stripeMesh.position.set(0, 0.48, 0.06)
    torso.add(stripeMesh)

    // Radiant Agent Chest Insignia
    const emblemGeo = new THREE.BoxGeometry(0.08, 0.08, 0.03)
    const emblemMat = new THREE.MeshBasicMaterial({ color: accentColor })
    const emblem = new THREE.Mesh(emblemGeo, emblemMat)
    emblem.position.set(0, 0.48, 0.15)
    emblem.rotation.z = Math.PI / 4
    torso.add(emblem)

    // Tactical high neckline collar (Armor collar rim sealing chest to neck)
    const collarGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.08, 8)
    const collarMesh = new THREE.Mesh(collarGeo, gearMat)
    collarMesh.position.set(0, 0.62, 0.01)
    collarMesh.castShadow = true
    torso.add(collarMesh)

    // Tactical shoulder pauldrons with angled tilt
    const padGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.16, 6)
    padGeo.rotateZ(Math.PI / 2)
    const padL = new THREE.Mesh(padGeo, armorMat)
    padL.position.set(-0.28, 0.56, 0.01)
    padL.rotation.z = 0.25
    padL.castShadow = true
    padL.add(new THREE.LineSegments(new THREE.EdgesGeometry(padGeo), outlineMat))
    const padR = new THREE.Mesh(padGeo, armorMat)
    padR.position.set(0.28, 0.56, 0.01)
    padR.rotation.z = -0.25
    padR.castShadow = true
    padR.add(new THREE.LineSegments(new THREE.EdgesGeometry(padGeo), outlineMat))
    torso.add(padL)
    torso.add(padR)

    // Tactical radio / comms unit on left shoulder
    const radioGeo = new THREE.BoxGeometry(0.065, 0.11, 0.06)
    const radioMesh = new THREE.Mesh(radioGeo, gearMat)
    radioMesh.position.set(-0.20, 0.58, 0.10)
    const antennaGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.12)
    const antennaMesh = new THREE.Mesh(antennaGeo, gearMat)
    antennaMesh.position.set(-0.20, 0.67, 0.10)
    torso.add(radioMesh)
    torso.add(antennaMesh)

    // ── 2. HEAD & AGENT-SPECIFIC GEAR (Directly anchored on torso collar, zero floating gap) ──
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 0.65, 0.01)

    // Neck (Starts at y=-0.02 inside collar, extends to y=+0.10 under chin)
    const neckGeo = new THREE.CylinderGeometry(0.075, 0.085, 0.12, 8)
    const neckMesh = new THREE.Mesh(neckGeo, skinMat)
    neckMesh.position.y = 0.04
    neckMesh.castShadow = true
    neckMesh.userData.hitPart = 'head'
    neckMesh.userData.isHead = true
    neckMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(neckGeo), outlineMat))
    headGroup.add(neckMesh)
    hitboxes.push(neckMesh)

    // Anatomical Head Cranium & Face (Width 0.22 vs Torso 0.48: Strictly smaller and proportional)
    const headGeo = new THREE.CylinderGeometry(0.11, 0.095, 0.22, 8)
    const headMesh = new THREE.Mesh(headGeo, skinMat)
    headMesh.position.set(0, 0.18, 0.01)
    headMesh.castShadow = true
    headMesh.receiveShadow = true
    headMesh.userData.hitPart = 'head'
    headMesh.userData.isHead = true
    headMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(headGeo), outlineMat))
    headGroup.add(headMesh)
    hitboxes.push(headMesh)

    // Stylized Tactical Combat Visor / Eyes
    const visorGeo = new THREE.BoxGeometry(0.14, 0.042, 0.06)
    const visorMesh = new THREE.Mesh(visorGeo, visorMat)
    visorMesh.position.set(0, 0.19, 0.09)
    headGroup.add(visorMesh)

    // Tactical Comms Headset (Earpieces, Headband, and Boom Mic)
    const earGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.04, 8)
    earGeo.rotateZ(Math.PI / 2)
    const earL = new THREE.Mesh(earGeo, gearMat)
    earL.position.set(-0.11, 0.18, 0.01)
    const earR = new THREE.Mesh(earGeo, gearMat)
    earR.position.set(0.11, 0.18, 0.01)
    const strapGeo = new THREE.BoxGeometry(0.23, 0.025, 0.05)
    const strap = new THREE.Mesh(strapGeo, gearMat)
    strap.position.set(0, 0.29, 0.01)
    const micGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.09, 6)
    micGeo.rotateX(Math.PI / 2)
    const mic = new THREE.Mesh(micGeo, gearMat)
    mic.position.set(-0.10, 0.14, 0.07)
    headGroup.add(earL)
    headGroup.add(earR)
    headGroup.add(strap)
    headGroup.add(mic)

    // Agent Specific Head Customization (Fitted snugly around the cranium)
    switch (agent.id) {
      case 'blaze': {
        // Spiky Flame Anime Hair
        const hairGeo = new THREE.ConeGeometry(0.12, 0.22, 7)
        const hairMat = new THREE.MeshStandardMaterial({
          color: 0xff6b35,
          emissive: 0xff4655,
          emissiveIntensity: 0.65
        })
        const hairMesh = new THREE.Mesh(hairGeo, hairMat)
        hairMesh.position.set(0, 0.32, -0.01)
        hairMesh.userData.hitPart = 'head'
        hairMesh.userData.isHead = true
        headGroup.add(hairMesh)
        hitboxes.push(hairMesh)
        break
      }
      case 'cipher': {
        const bunGeo = new THREE.SphereGeometry(0.07, 8, 8)
        const bunMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })
        const bunMesh = new THREE.Mesh(bunGeo, bunMat)
        bunMesh.position.set(0, 0.31, -0.06)
        bunMesh.userData.hitPart = 'head'
        bunMesh.userData.isHead = true
        headGroup.add(bunMesh)
        hitboxes.push(bunMesh)

        const bandGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 8)
        const bandMesh = new THREE.Mesh(bandGeo, accentMat)
        bandMesh.position.set(0, 0.22, 0.01)
        headGroup.add(bandMesh)
        break
      }
      case 'scope': {
        const cowlGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.18, 8)
        const cowlMesh = new THREE.Mesh(cowlGeo, baseMat)
        cowlMesh.position.set(0, 0.23, 0)
        cowlMesh.userData.hitPart = 'head'
        cowlMesh.userData.isHead = true
        headGroup.add(cowlMesh)
        hitboxes.push(cowlMesh)

        const eyeGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.04, 8)
        eyeGeo.rotateX(Math.PI / 2)
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff })
        const eyeMesh = new THREE.Mesh(eyeGeo, eyeMat)
        eyeMesh.position.set(-0.05, 0.19, 0.10)
        headGroup.add(eyeMesh)
        break
      }
      case 'rampart': {
        const beanieGeo = new THREE.CylinderGeometry(0.125, 0.125, 0.15, 8)
        const beanieMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, roughness: 0.75 })
        const beanieMesh = new THREE.Mesh(beanieGeo, beanieMat)
        beanieMesh.position.set(0, 0.25, 0)
        beanieMesh.userData.hitPart = 'head'
        beanieMesh.userData.isHead = true
        headGroup.add(beanieMesh)
        hitboxes.push(beanieMesh)

        const glassGeo = new THREE.BoxGeometry(0.16, 0.05, 0.05)
        const glassMat = new THREE.MeshStandardMaterial({ color: 0xffd166, metalness: 0.8, roughness: 0.2 })
        const glassMesh = new THREE.Mesh(glassGeo, glassMat)
        glassMesh.position.set(0, 0.19, 0.09)
        headGroup.add(glassMesh)
        break
      }
      case 'phantom': {
        const hoodGeo = new THREE.CylinderGeometry(0.135, 0.13, 0.24, 8)
        const hoodMat = new THREE.MeshStandardMaterial({
          color: 0x6b21a8,
          emissive: 0x4c1d95,
          emissiveIntensity: 0.45,
          roughness: 0.55
        })
        const hoodMesh = new THREE.Mesh(hoodGeo, hoodMat)
        hoodMesh.position.set(0, 0.21, 0)
        hoodMesh.userData.hitPart = 'head'
        hoodMesh.userData.isHead = true
        headGroup.add(hoodMesh)
        hitboxes.push(hoodMesh)

        const slitMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff })
        for (let i = -1; i <= 1; i++) {
          const slitGeo = new THREE.BoxGeometry(0.02, 0.08, 0.03)
          const slitMesh = new THREE.Mesh(slitGeo, slitMat)
          slitMesh.position.set(i * 0.04, 0.18, 0.12)
          headGroup.add(slitMesh)
        }
        break
      }
    }

    // Attach headGroup directly onto torso
    torso.add(headGroup)

    // ── 3. ARMS (Attached directly to torso shoulders) ──
    const armGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.54, 8)

    const armL = new THREE.Mesh(armGeo, baseMat)
    armL.position.set(-0.28, 0.54, 0.04)
    armL.rotation.x = -Math.PI / 4
    armL.rotation.z = Math.PI / 12
    armL.castShadow = true
    armL.userData.hitPart = 'body'
    armL.userData.isBody = true
    armL.add(new THREE.LineSegments(new THREE.EdgesGeometry(armGeo), outlineMat))
    torso.add(armL)
    hitboxes.push(armL)

    const armR = new THREE.Mesh(armGeo, baseMat)
    armR.position.set(0.28, 0.54, 0.04)
    armR.rotation.x = -Math.PI / 4
    armR.rotation.z = -Math.PI / 12
    armR.castShadow = true
    armR.userData.hitPart = 'body'
    armR.userData.isBody = true
    armR.add(new THREE.LineSegments(new THREE.EdgesGeometry(armGeo), outlineMat))
    torso.add(armR)
    hitboxes.push(armR)

    // ── 4. WEAPON HELD IN HANDS (Attached to torso, natural recoil & sway) ──
    const gunGroup = new THREE.Group()
    const gunSteelMat = new THREE.MeshStandardMaterial({
      color: 0x3b4856,
      metalness: 0.75,
      roughness: 0.32,
      map: createBrushedSteelTexture()
    })
    const gunCarbonMat = new THREE.MeshStandardMaterial({
      color: 0x18202c,
      metalness: 0.85,
      roughness: 0.35,
      map: createCarbonFiberTexture()
    })
    const wId = weaponDef?.id ?? 'vandal'

    switch (wId) {
      case 'spectre': {
        const smgBody = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.35), gunCarbonMat)
        gunGroup.add(smgBody)
        const silencer = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.32, 8), gunSteelMat)
        silencer.geometry.rotateX(Math.PI / 2)
        silencer.position.set(0, 0.02, -0.32)
        gunGroup.add(silencer)
        const smgMag = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.22, 0.06), gearMat)
        smgMag.position.set(0, -0.12, 0.02)
        gunGroup.add(smgMag)
        break
      }
      case 'operator': {
        const sniperBody = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.15, 0.75), gunCarbonMat)
        gunGroup.add(sniperBody)
        const sniperBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.022, 0.65, 8), gunSteelMat)
        sniperBarrel.geometry.rotateX(Math.PI / 2)
        sniperBarrel.position.set(0, 0.03, -0.68)
        gunGroup.add(sniperBarrel)
        const scope = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.042, 0.38, 8), gunSteelMat)
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
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.42, 8), gunCarbonMat)
        barrel.geometry.rotateX(Math.PI / 2)
        barrel.position.set(0, 0.04, -0.42)
        gunGroup.add(barrel)
        break
      }
      case 'classic': {
        const pistolBody = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.10, 0.28), gunCarbonMat)
        gunGroup.add(pistolBody)
        const slide = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.06, 0.28), gunSteelMat)
        slide.position.set(0, 0.06, 0)
        gunGroup.add(slide)
        break
      }
      case 'vandal':
      default: {
        const rifleBody = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.13, 0.52), gunCarbonMat)
        gunGroup.add(rifleBody)
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.38, 8), gunSteelMat)
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

    gunGroup.position.set(0.18, 0.44, 0.34)
    torso.add(gunGroup)

    root.add(torso)

    // ── 5. LEGS (Articulated Thighs, Knee Joints, Calves & Tactical Boots) ──
    const thighGeo = new THREE.CylinderGeometry(0.095, 0.08, 0.38, 8)
    const calfGeo  = new THREE.CylinderGeometry(0.08, 0.065, 0.36, 8)
    const padLegGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.12, 6)
    padLegGeo.rotateZ(Math.PI / 2)
    const bootGeo = new THREE.BoxGeometry(0.15, 0.14, 0.24)

    // Left leg (Hip pivot at y = 0.0)
    const legLGroup = new THREE.Group()
    legLGroup.position.set(-0.12, 0.0, 0)

    const thighLMesh = new THREE.Mesh(thighGeo, pantsMat)
    thighLMesh.position.y = -0.19
    thighLMesh.castShadow = true
    thighLMesh.userData.hitPart = 'leg'
    thighLMesh.userData.isLeg = true
    legLGroup.add(thighLMesh)
    hitboxes.push(thighLMesh)

    const kneeLJoint = new THREE.Group()
    kneeLJoint.position.set(0, -0.38, 0)

    const calfLMesh = new THREE.Mesh(calfGeo, pantsMat)
    calfLMesh.position.y = -0.18
    calfLMesh.castShadow = true
    calfLMesh.userData.hitPart = 'leg'
    calfLMesh.userData.isLeg = true
    kneeLJoint.add(calfLMesh)
    hitboxes.push(calfLMesh)

    const kneeL = new THREE.Mesh(padLegGeo, armorMat)
    kneeL.position.set(0, 0.02, 0.07)
    kneeL.userData.hitPart = 'leg'
    kneeL.userData.isLeg = true
    kneeL.add(new THREE.LineSegments(new THREE.EdgesGeometry(padLegGeo), outlineMat))
    kneeLJoint.add(kneeL)
    hitboxes.push(kneeL)

    const bootL = new THREE.Mesh(bootGeo, gearMat)
    bootL.position.set(0, -0.36, 0.03)
    bootL.castShadow = true
    bootL.userData.hitPart = 'leg'
    bootL.userData.isLeg = true
    kneeLJoint.add(bootL)
    hitboxes.push(bootL)

    legLGroup.add(kneeLJoint)
    root.add(legLGroup)

    // Right leg (Hip pivot at y = 0.0)
    const legRGroup = new THREE.Group()
    legRGroup.position.set(0.12, 0.0, 0)

    const thighRMesh = new THREE.Mesh(thighGeo, pantsMat)
    thighRMesh.position.y = -0.19
    thighRMesh.castShadow = true
    thighRMesh.userData.hitPart = 'leg'
    thighRMesh.userData.isLeg = true
    legRGroup.add(thighRMesh)
    hitboxes.push(thighRMesh)

    const kneeRJoint = new THREE.Group()
    kneeRJoint.position.set(0, -0.38, 0)

    const calfRMesh = new THREE.Mesh(calfGeo, pantsMat)
    calfRMesh.position.y = -0.18
    calfRMesh.castShadow = true
    calfRMesh.userData.hitPart = 'leg'
    calfRMesh.userData.isLeg = true
    kneeRJoint.add(calfRMesh)
    hitboxes.push(calfRMesh)

    const kneeR = new THREE.Mesh(padLegGeo, armorMat)
    kneeR.position.set(0, 0.02, 0.07)
    kneeR.userData.hitPart = 'leg'
    kneeR.userData.isLeg = true
    kneeR.add(new THREE.LineSegments(new THREE.EdgesGeometry(padLegGeo), outlineMat))
    kneeRJoint.add(kneeR)
    hitboxes.push(kneeR)

    const bootR = new THREE.Mesh(bootGeo, gearMat)
    bootR.position.set(0, -0.36, 0.03)
    bootR.castShadow = true
    bootR.userData.hitPart = 'leg'
    bootR.userData.isLeg = true
    kneeRJoint.add(bootR)
    hitboxes.push(bootR)

    legRGroup.add(kneeRJoint)
    root.add(legRGroup)

    return {
      root,
      hitboxes,
      legL: legLGroup,
      legR: legRGroup,
      kneeL: kneeLJoint,
      kneeR: kneeRJoint,
      armL,
      armR,
      torso,
      headGroup,
      gunGroup
    }
  }
}
