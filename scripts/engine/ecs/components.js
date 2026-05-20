// ================= ECS COMPONENT STORAGE =================

const ECS = {
  entities: new Map(),
  nextEntityId: 0
};

// ================= COMPONENT TYPES =================

const COMPONENTS = {

  POSITION: "position",
  VELOCITY: "velocity",
  SPRITE: "sprite",
  STATS: "stats",
  AI: "ai"

};