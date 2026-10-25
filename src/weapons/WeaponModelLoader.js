import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'

/**
 * WeaponModelLoader — Loads custom external 3D weapon models (.glb / .gltf)
 * Supports:
 *  - Automated detection of models placed in `/models/{weaponId}.glb` (e.g. Sketchfab, Kenney, Quaternius)
 *  - Automatic scale normalization, PBR shadow configuration, and viewmodel centering
 *  - Seamless fallback to high-detail procedural Valorant models when no custom GLB is loaded
 */
const TARGET_LENGTHS = {
  vandal: 0.86,
  spectre: 0.62,
  operator: 1.30,
  odin: 1.05,
  bucky: 0.88,
  classic: 0.28
}

const WEAPON_CONFIGS = {
  vandal: {
    offset: new THREE.Vector3(0, -0.01, -0.03)
  },
  operator: {
    offset: new THREE.Vector3(0, 0.02, -0.13)
  },
  spectre: {
    offset: new THREE.Vector3(0, 0.02, 0.03)
  },
  classic: {
    offset: new THREE.Vector3(0, 0.02, -0.02)
  },
  bucky: {
    offset: new THREE.Vector3(0, 0.02, 0.05)
  },
  odin: {
    offset: new THREE.Vector3(0, 0.02, 0.07)
  }
}

export class WeaponModelLoader {
  constructor() {
    this.loader = new GLTFLoader()
    this.modelCache = new Map()
    this.checkCache = new Map() // Records whether file exists to avoid redundant 404 network spam
  }

  /**
   * Attempts to load a custom .glb file for the specified weapon.
   * Looks for `/models/{weaponId}.glb`
   * Returns a ready-to-use THREE.Group, or null if no file is present.
   */
  async loadModel(weaponId) {
    if (this.modelCache.has(weaponId)) {
      return SkeletonUtils.clone(this.modelCache.get(weaponId))
    }

    if (this.checkCache.get(weaponId) === false) {
      return null
    }

    const url = `/models/${weaponId}.glb`

    try {
      // Check if file exists via quick HEAD request
      const check = await fetch(url, { method: 'HEAD' })
      if (!check.ok) {
        this.checkCache.set(weaponId, false)
        return null
      }

      const gltf = await this._loadGLTF(url)
      const normalizedGroup = this._normalizeScene(gltf.scene, weaponId)

      this.modelCache.set(weaponId, normalizedGroup)
      this.checkCache.set(weaponId, true)
      return SkeletonUtils.clone(normalizedGroup)
    } catch (err) {
      this.checkCache.set(weaponId, false)
      return null
    }
  }

  /**
   * Universal Weapon Normalizer:
   * 1. Centers arbitrary models regardless of where origin was exported in Blender/Maya/Unreal
   * 2. Detects orientation (if X is long axis, rotates +90° to point along -Z into screen)
   * 3. Normalizes scale to true Valorant FPS dimensions regardless of cm/mm/meters
   * 4. Applies viewmodel grip offsets and sets anisotropic texture filtering
   */
  _normalizeScene(rawScene, weaponId) {
    rawScene.updateMatrixWorld(true)

    const rawBox = new THREE.Box3().setFromObject(rawScene)
    const rawCenter = rawBox.getCenter(new THREE.Vector3())
    const rawSize = rawBox.getSize(new THREE.Vector3())

    const root = new THREE.Group()
    root.name = `custom_${weaponId}_root`

    const inner = new THREE.Group()
    inner.name = 'innerModel'

    // 1. Center the raw model to local (0, 0, 0)
    rawScene.position.sub(rawCenter)
    inner.add(rawScene)

    // 2. Align orientation to -Z (Forward in Three.js FPS camera view)
    // In Three.js right-handed coordinates: +PI/2 maps +X (muzzle) to -Z (forward)
    if (rawSize.x > rawSize.z) {
      inner.rotation.y = Math.PI / 2
    }

    // 3. Normalize scale to match true first-person weapon length
    const targetLen = TARGET_LENGTHS[weaponId] || 0.85
    const maxDim = Math.max(rawSize.x, rawSize.y, rawSize.z)
    if (maxDim > 0.001) {
      const scaleFactor = targetLen / maxDim
      inner.scale.setScalar(scaleFactor)
    }

    // 4. Fine-tuned Viewmodel Grip Offset
    const config = WEAPON_CONFIGS[weaponId]
    if (config?.offset) {
      inner.position.add(config.offset)
    }

    root.add(inner)

    // 5. Optimize materials, textures, and depth
    root.traverse(child => {
      if (child.isMesh) {
        child.castShadow = false
        child.receiveShadow = false
        child.frustumCulled = false // Never cull viewmodel parts in first-person camera
        if (child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material]
          for (const mat of mats) {
            mat.depthWrite = true
            // Sanitize Unreal Engine / Sketchfab negative or out-of-range PBR factors
            if (mat.roughness !== undefined) {
              mat.roughness = THREE.MathUtils.clamp(mat.roughness, 0.1, 0.9)
            }
            if (mat.metalness !== undefined) {
              mat.metalness = THREE.MathUtils.clamp(mat.metalness, 0.0, 0.9)
            }
            if (mat.opacity >= 0.95) {
              mat.transparent = false
            }
            if (mat.map) {
              mat.map.anisotropy = 8
            }
          }
        }
      }
    })

    return root
  }

  _loadGLTF(url) {
    return new Promise((resolve, reject) => {
      this.loader.load(url, resolve, undefined, reject)
    })
  }

  hasCustomModel(weaponId) {
    return this.checkCache.get(weaponId) === true
  }
}

export const weaponModelLoader = new WeaponModelLoader()
