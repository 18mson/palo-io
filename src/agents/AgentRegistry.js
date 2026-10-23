/**
 * AgentRegistry — 5 agents inspired by Valorant aesthetics
 * No abilities in Phase 1 — visual + stats only
 */
export const AGENTS = {
  blaze: {
    id: 'blaze',
    name: 'BLAZE',
    role: 'Duelist',
    emoji: '🔥',
    color: '#FF4655',
    secondaryColor: '#FF8C42',
    weapon: 'vandal',
    health: 100,
    speed: 1.0,
    bodyColor: 0xf1f5f9,   // Crisp white/light-grey jacket (Phoenix style)
    vestColor: 0xff4655,   // Fiery red/crimson combat vest
    accentColor: 0xff6b35, // Blazing orange-red glow
    description: 'Aggressive duelist. Standard assault rifle. Balanced for all ranges.',
  },
  cipher: {
    id: 'cipher',
    name: 'CIPHER',
    role: 'Duelist',
    emoji: '💨',
    color: '#A8D8EA',
    secondaryColor: '#FFFFFF',
    weapon: 'spectre',
    health: 90,
    speed: 1.2,
    bodyColor: 0xe0f2fe,   // Crisp sky-white windbreaker (Jett style)
    vestColor: 0x0284c7,   // Electric cyan combat vest
    accentColor: 0x00f0ff, // Glowing neon cyan
    description: 'High-mobility duelist. SMG for close-range aggression.',
  },
  scope: {
    id: 'scope',
    name: 'SCOPE',
    role: 'Initiator',
    emoji: '🔭',
    color: '#2E77D0',
    secondaryColor: '#7EC8E3',
    weapon: 'operator',
    health: 100,
    speed: 0.9,
    bodyColor: 0x1d4ed8,   // Royal archer blue cloak (Sova style)
    vestColor: 0xa16207,   // Tactical leather brown vest
    accentColor: 0x60a5fa, // Bright laser blue
    description: 'Long-range initiator. One-shot sniper with scope. High skill ceiling.',
  },
  rampart: {
    id: 'rampart',
    name: 'RAMPART',
    role: 'Sentinel',
    emoji: '🤖',
    color: '#F5C542',
    secondaryColor: '#5BE050',
    weapon: 'odin',
    health: 130,
    speed: 0.8,
    bodyColor: 0xfacc15,   // Canary yellow tactical jacket (Killjoy style)
    vestColor: 0x166534,   // Combat forest green vest
    accentColor: 0x22c55e, // Neon radiant green
    description: 'Sentinel with heavy armor. LMG with massive mag. Slow but durable.',
  },
  phantom: {
    id: 'phantom',
    name: 'PHANTOM',
    role: 'Controller',
    emoji: '👻',
    color: '#7B2D8B',
    secondaryColor: '#00C4C4',
    weapon: 'bucky',
    health: 100,
    speed: 1.0,
    bodyColor: 0x8b5cf6,   // Royal violet phantom shroud (Reyna/Omen style)
    vestColor: 0x312e81,   // Midnight indigo armor plate
    accentColor: 0x00f5ff, // Spectral cyan soul glow
    description: 'Elusive controller. Shotgun devastates at close quarters.',
  },
}

export function getAgent(id) {
  return AGENTS[id] ?? AGENTS.blaze
}

export const AGENT_LIST = Object.values(AGENTS)
