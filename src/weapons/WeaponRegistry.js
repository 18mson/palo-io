/**
 * WeaponRegistry — 6 weapons with Valorant-inspired names & stats
 */
export const WEAPONS = {
  vandal: {
    id: 'vandal',
    name: 'VANDAL',
    shortName: 'VDL',
    type: 'rifle',
    damageBody: 40,
    damageHead: 160,      // One-tap kill at any range (100 HP + 50 shield)
    damageLeg: 34,
    fireRate: 9.75,       // rounds/sec
    reloadTime: 2500,     // ms
    magazineSize: 25,
    isAuto: true,
    spread: 0.000,
    recoilPattern: [0, 0.004, 0.008, 0.012, 0.016],
    range: 500,
    scopeMultiplier: 1,
    color: 0xff4655,
  },
  spectre: {
    id: 'spectre',
    name: 'SPECTRE',
    shortName: 'SPC',
    type: 'smg',
    damageBody: 26,
    damageHead: 78,
    damageLeg: 22,
    fireRate: 13.33,
    reloadTime: 2250,
    magazineSize: 30,
    isAuto: true,
    spread: 0.001,
    recoilPattern: [0, 0.002, 0.005, 0.008],
    range: 250,
    scopeMultiplier: 1,
    color: 0xa8d8ea,
  },
  operator: {
    id: 'operator',
    name: 'OPERATOR',
    shortName: 'OPR',
    type: 'sniper',
    damageBody: 150,      // One-shot body kill through full heavy armor!
    damageHead: 255,      // Devastating instant headshot
    damageLeg: 120,
    fireRate: 0.75,
    reloadTime: 3700,
    magazineSize: 5,
    isAuto: false,
    spread: 0.000,
    spreadScoped: 0.000,
    recoilPattern: [0],
    range: 1000,
    scopeMultiplier: 5,
    color: 0x2e77d0,
  },
  odin: {
    id: 'odin',
    name: 'ODIN',
    shortName: 'ODN',
    type: 'lmg',
    damageBody: 38,
    damageHead: 95,
    damageLeg: 32,
    fireRate: 12,
    reloadTime: 5000,
    magazineSize: 100,
    isAuto: true,
    spread: 0.002,
    recoilPattern: [0, 0.002, 0.003, 0.004, 0.005],
    range: 400,
    scopeMultiplier: 1,
    color: 0xf5c542,
  },
  bucky: {
    id: 'bucky',
    name: 'BUCKY',
    shortName: 'BCK',
    type: 'shotgun',
    damageBody: 22,       // 15 pellets × 22 = 330 total body potential at point-blank!
    damageHead: 44,       // 15 pellets × 44 = 660 total head potential!
    damageLeg: 19,
    pellets: 15,          // Authentic Valorant 15-pellet shotgun spread
    fireRate: 1.1,
    reloadTime: 2500,
    magazineSize: 5,
    isAuto: false,
    spread: 0.036,
    recoilPattern: [0],
    range: 35,
    scopeMultiplier: 1,
    color: 0x7b2d8b,
  },
  classic: {
    id: 'classic',
    name: 'CLASSIC',
    shortName: 'CLS',
    type: 'pistol',
    damageBody: 26,
    damageHead: 78,
    damageLeg: 22,
    fireRate: 6.75,
    reloadTime: 1500,
    magazineSize: 12,
    isAuto: false,
    spread: 0.000,
    recoilPattern: [0, 0.005],
    range: 300,
    scopeMultiplier: 1,
    color: 0x768079,
  },
}

export function getWeapon(id) {
  return WEAPONS[id] ?? WEAPONS.classic
}
