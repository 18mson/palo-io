import * as THREE from 'three'

/**
 * TracerManager — Renders glowing bullet tracers and wall impact sparks
 */
export class TracerManager {
  constructor(scene) {
    this.scene = scene
    this.tracers = []
    this.sparks = []

    this.tracerMat = new THREE.MeshBasicMaterial({
      color: 0xfff066,
      transparent: true,
      opacity: 0.9,
      depthWrite: false
    })

    this.enemyTracerMat = new THREE.MeshBasicMaterial({
      color: 0xff3344,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    })

    this.sparkGeo = new THREE.BufferGeometry()
    this.sparkMat = new THREE.PointsMaterial({
      color: 0xffcc33,
      size: 0.12,
      transparent: true,
      opacity: 1,
      depthWrite: false,
    })

    this.headshotSparkMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.22,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    this.rings = []
  }

  /**
   * Spawns an explosive Valorant headshot critical effect (golden sparks + expanding energy ring)
   */
  addHeadshotSparks(point, camera = null) {
    // 1. Expanding critical shockwave ring
    const ringGeo = new THREE.RingGeometry(0.06, 0.16, 16)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffc700,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.position.copy(point)
    if (camera) {
      ring.lookAt(camera.position)
    } else {
      ring.rotation.x = Math.PI / 2
    }
    this.scene.add(ring)
    this.rings.push({ mesh: ring, life: 0.22, maxLife: 0.22, scale: 1 })

    // 2. High-velocity radiant golden/crimson spark burst (28 particles)
    const count = 28
    const positions = new Float32Array(count * 3)
    const velocities = []

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = point.x
      positions[i * 3 + 1] = point.y
      positions[i * 3 + 2] = point.z

      // High-speed spherical radiation with upward pop
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI
      const speed = 4.5 + Math.random() * 5.5
      velocities.push(new THREE.Vector3(
        Math.cos(phi) * Math.cos(theta) * speed,
        Math.abs(Math.sin(phi)) * speed + 2.0,
        Math.cos(phi) * Math.sin(theta) * speed
      ))
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pCloud = new THREE.Points(geo, this.headshotSparkMat.clone())
    this.scene.add(pCloud)

    this.sparks.push({
      points: pCloud,
      velocities,
      life: 0.32,
      maxLife: 0.32
    })
  }

  /**
   * Spawns a glowing laser/bullet tracer between start and end point
   */
  addTracer(start, end, isEnemy = false, isSniper = false) {
    const dir = new THREE.Vector3().subVectors(end, start)
    const len = dir.length()
    if (len < 0.2) return

    // Tracer is a thin cylinder aligned with bullet trajectory
    // Sniper uses a sharp, sleek beam to prevent parallax double-vision
    const radius = isSniper ? 0.012 : 0.016
    const geo = new THREE.CylinderGeometry(radius, radius, len, 4)
    geo.translate(0, len / 2, 0)
    geo.rotateX(Math.PI / 2)

    let mat
    if (isEnemy) {
      mat = this.enemyTracerMat.clone()
    } else if (isSniper) {
      mat = new THREE.MeshBasicMaterial({
        color: 0x4ff0ff,
        transparent: true,
        opacity: 0.95,
        depthWrite: false
      })
    } else {
      mat = this.tracerMat.clone()
    }

    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.copy(start)
    mesh.lookAt(end)

    this.scene.add(mesh)

    // Crisp life prevents visual ghosting when strafing/moving fast
    const duration = isSniper ? 0.045 : 0.065
    this.tracers.push({
      mesh,
      life: duration,
      maxLife: duration,
    })
  }

  /**
   * Spawns spark particle burst at impact point
   */
  addSparks(point, normal = new THREE.Vector3(0, 1, 0)) {
    const count = 10
    const positions = new Float32Array(count * 3)
    const velocities = []

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = point.x
      positions[i * 3 + 1] = point.y
      positions[i * 3 + 2] = point.z

      // Radiate outward around surface normal
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 4 + normal.x * 2,
        (Math.random() - 0.5) * 4 + normal.y * 2,
        (Math.random() - 0.5) * 4 + normal.z * 2
      )
      velocities.push(v)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const pCloud = new THREE.Points(geo, this.sparkMat.clone())
    this.scene.add(pCloud)

    this.sparks.push({
      points: pCloud,
      velocities,
      life: 0.25,
      maxLife: 0.25
    })
  }

  update(dt) {
    // ── Update Tracers ──
    for (let i = this.tracers.length - 1; i >= 0; i--) {
      const t = this.tracers[i]
      t.life -= dt
      if (t.life <= 0) {
        this.scene.remove(t.mesh)
        t.mesh.geometry.dispose()
        t.mesh.material.dispose()
        this.tracers.splice(i, 1)
      } else {
        t.mesh.material.opacity = (t.life / t.maxLife) * 0.9
      }
    }

    // ── Update Sparks ──
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i]
      s.life -= dt
      if (s.life <= 0) {
        this.scene.remove(s.points)
        s.points.geometry.dispose()
        s.points.material.dispose()
        this.sparks.splice(i, 1)
      } else {
        const positions = s.points.geometry.attributes.position.array
        const count = s.velocities.length
        for (let j = 0; j < count; j++) {
          positions[j * 3]     += s.velocities[j].x * dt
          positions[j * 3 + 1] += s.velocities[j].y * dt
          positions[j * 3 + 2] += s.velocities[j].z * dt
          // Gravity on sparks
          s.velocities[j].y -= 9.8 * dt
        }
        s.points.geometry.attributes.position.needsUpdate = true
        s.points.material.opacity = s.life / s.maxLife
      }
    }
    // ── Update Expanding Rings ──
    for (let i = this.rings.length - 1; i >= 0; i--) {
      const r = this.rings[i]
      r.life -= dt
      if (r.life <= 0) {
        this.scene.remove(r.mesh)
        r.mesh.geometry.dispose()
        r.mesh.material.dispose()
        this.rings.splice(i, 1)
      } else {
        const p = 1 - r.life / r.maxLife
        const s = 1.0 + p * 3.5
        r.mesh.scale.set(s, s, s)
        r.mesh.material.opacity = (r.life / r.maxLife) * 0.95
      }
    }
  }

  clear() {
    for (const t of this.tracers) {
      this.scene.remove(t.mesh)
      t.mesh.geometry.dispose()
    }
    for (const s of this.sparks) {
      this.scene.remove(s.points)
      s.points.geometry.dispose()
    }
    for (const r of this.rings) {
      this.scene.remove(r.mesh)
      r.mesh.geometry.dispose()
    }
    this.tracers = []
    this.sparks  = []
    this.rings   = []
  }
}
