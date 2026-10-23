import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * WeaponModelLoader — Loads custom external 3D weapon models (.glb / .gltf)
 * Supports:
 *  - Automated detection of models placed in `/models/{weaponId}.glb` (e.g. Sketchfab, Kenney, Quaternius)
 *  - Automatic scale normalization, PBR shadow configuration, and viewmodel centering
 *  - Seamless fallback to high-detail procedural Valorant models when no custom GLB is loaded
 */
const TARGET_LENGTHS = {
  vandal: 0.85,
  spectre: 0.62,
  operator: 1.25,
  odin: 1.05,
  bucky: 0.88,
  classic: 0.28
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
      return this.modelCache.get(weaponId).clone()
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
      const scene = gltf.scene

      // Automatically measure bounding box and normalize scale to match Valorant FPS proportions
      const box = new THREE.Box3().setFromObject(scene)
      const size = new THREE.Vector3()
      box.getSize(size)
      const maxDim = Math.max(size.x, size.y, size.z)
      const target = TARGET_LENGTHS[weaponId] || 0.80

      if (maxDim > 0.001) {
        // Automatically scales models regardless of whether exported in cm, mm, or meters
        const scaleFactor = target / maxDim
        scene.scale.setScalar(scaleFactor)
      }

      // Optimize materials and textures for crisp first-person viewmodel rendering
      scene.traverse(child => {
        if (child.isMesh) {
          child.castShadow = false
          child.receiveShadow = false
          if (child.material) {
            child.material.depthWrite = true
            if (child.material.map) {
              child.material.map.anisotropy = 8
            }
          }
        }
      })

      this.modelCache.set(weaponId, scene)
      this.checkCache.set(weaponId, true)
      return scene.clone()
    } catch (err) {
      this.checkCache.set(weaponId, false)
      return null
    }
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
