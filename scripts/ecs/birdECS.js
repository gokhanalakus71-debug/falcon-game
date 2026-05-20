function createBirdECS(data = {}) {

  const entity = createEntity();

  // POSITION
  addComponent(entity, "position", {
    x: data.x ?? 100,
    y: data.y ?? 200
  });

  // VELOCITY
  addComponent(entity, "velocity", {
    vx: data.vx ?? 2,
    vy: data.vy ?? 0
  });

  // STATS
  addComponent(entity, "stats", {
    strength: data.strength ?? 5,
    agility: data.agility ?? 5,
    intelligence: data.intelligence ?? 5,
    stamina: data.stamina ?? 5,
    charm: data.charm ?? 5
  });

  // CONDITION
  addComponent(entity, "condition", {
    value: data.condition ?? 100,
    feedCount: data.feedCount ?? 0
  });

  // TRAITS
  addComponent(entity, "traits", {
    list: data.traits ?? []
  });

  // BIRD INFO
  addComponent(entity, "bird", {
    name: data.name ?? "Falcon",
    rarity: data.rarity ?? "Common"
  });

  return entity;
}