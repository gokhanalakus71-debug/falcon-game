function breed(i) {
  if (!game.birdEntities || game.birdEntities.length < 2) {
    alert("Not enough birds to breed");
    return;
  }

  if (i === game.selected) {
    alert("Select another bird");
    return;
  }

  const parentA = game.birdEntities[game.selected];
  const parentB = game.birdEntities[i];

  if (!parentA || !parentB) return;

  const statsA = getComponent(parentA, "stats") || {};
  const statsB = getComponent(parentB, "stats") || {};

  const traitsA = getComponent(parentA, "traits")?.list || [];
  const traitsB = getComponent(parentB, "traits")?.list || [];

  const avg = (a = 1, b = 1) =>
    Math.max(1, Math.floor((a + b) / 2) + (Math.random() * 4 - 2));

  const child = createEntity();

  addComponent(child, "position", {
    x: 100 + Math.random() * 200,
    y: 100 + Math.random() * 200
  });

  addComponent(child, "stats", {
    strength: avg(statsA.strength, statsB.strength),
    agility: avg(statsA.agility, statsB.agility),
    intelligence: avg(statsA.intelligence, statsB.intelligence),
    stamina: avg(statsA.stamina, statsB.stamina),
    charm: avg(statsA.charm, statsB.charm)
  });

  addComponent(child, "traits", {
    list: [...new Set([...traitsA, ...traitsB])]
  });

  addComponent(child, "bird", {
    name: "Hybrid Falcon",
    rarity: "Common"
  });

  addComponent(child, "condition", {
    value: 100
  });

  addComponent(child, "animation", {
    frame: 0,
    frameTimer: 0,
    frameSpeed: 6,
    wingPhase: 0
  });

  // IMPORTANT: keep ECS + UI in sync
  game.birdEntities.push(child);
  game.selected = game.birdEntities.length - 1;

  floatText("🧬 New Falcon Born!", "#60a5fa");
  renderUI();
}