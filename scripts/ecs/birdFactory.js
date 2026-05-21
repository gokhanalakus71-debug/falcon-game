function createBird(data = {}) {

  const entity = createEntity();

  // =====================
  // POSITION
  // =====================
  addComponent(entity, "position", {
    x: data.x ?? 100,
    y: data.y ?? 200
  });

  // =====================
  // VELOCITY
  // =====================
  addComponent(entity, "velocity", {
    vx: data.vx ?? 2,
    vy: data.vy ?? 0
  });

  // =====================
  // STATS
  // =====================
  addComponent(entity, "stats", {
    strength: data.strength ?? 5,
    agility: data.agility ?? 5,
    intelligence: data.intelligence ?? 5,
    stamina: data.stamina ?? 5,
    charm: data.charm ?? 5
  });

  // =====================
  // CONDITION (FIXED FLAT STRUCTURE)
  // =====================
  addComponent(entity, "condition", {
    value: data.condition ?? 100,
    feedCount: data.feedCount ?? 0
  });

  // =====================
  // TRAITS
  // =====================
  addComponent(entity, "traits", {
    list: data.traits ?? []
  });

  // =====================
  // ANIMATION
  // =====================
  addComponent(entity, "animation", {
    frame: 0,
    frameTimer: 0,
    frameSpeed: 6,
    wingPhase: Math.random() * 10,
    bobOffset: Math.random() * 100
  });

  // =====================
  // SPRITE
  // =====================
  addComponent(entity, "sprite", {
    key: "bird",
    frame: 0,
    frameCount: 4,
    frameTimer: 0,
    frameSpeed: 8,
    wingPhase: Math.random() * 10
  });

  // =====================
  // CRITICAL FIX
  // =====================
  return entity;
}