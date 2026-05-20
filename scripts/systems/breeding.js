// ================= BREEDING (ECS VERSION) =================

function breed(i) {

  const parentA = game.birdEntities?.[game.selected];
  const parentB = game.birdEntities?.[i];

  if (!parentA || !parentB) {
    floatText("Select valid birds", "orange");
    return;
  }

  if (i === game.selected) {
    floatText("Select another bird", "orange");
    return;
  }

  const p1 = getBirdFromEntity(parentA);
  const p2 = getBirdFromEntity(parentB);

  if (!p1 || !p2) return;

  // ================= MUTATION =================

  function mutate(avg) {
    const m = Math.floor(Math.random() * 5) - 2;
    return Math.max(1, avg + m);
  }

  // ================= TRAITS =================

  const combined = [...(p1.traits || []), ...(p2.traits || [])];
  const unique = [...new Set(combined)];

  const inherited = [];
  const traitCount = 1 + Math.floor(Math.random() * 2);

  for (let i = 0; i < traitCount; i++) {
    if (!unique.length) break;

    const t = unique[Math.floor(Math.random() * unique.length)];

    if (t && !inherited.includes(t)) {
      inherited.push(t);
    }
  }

  // rare mutation
  if (Math.random() < 0.2 && typeof RARE_TRAITS !== "undefined") {
    const r = RARE_TRAITS[Math.floor(Math.random() * RARE_TRAITS.length)];
    if (r && !inherited.includes(r)) inherited.push(r);

    floatText("🧬 MUTATION!", "#a855f7");
  }

  // ================= RARITY =================

  let rarity = "Common";
  const roll = Math.random();

  if (roll > 0.95) {
    rarity = "Legendary";
    inherited.push("Mythic");
  } else if (roll > 0.8) {
    rarity = "Rare";
  }

  // ================= CREATE ECS BIRD =================

  const child = createBirdECS({
    name: "Hybrid Falcon",
    rarity,

    strength: mutate((p1.stats.strength + p2.stats.strength) / 2),
    agility: mutate((p1.stats.agility + p2.stats.agility) / 2),
    intelligence: mutate((p1.stats.intelligence + p2.stats.intelligence) / 2),
    stamina: mutate((p1.stats.stamina + p2.stats.stamina) / 2),
    charm: mutate((p1.stats.charm + p2.stats.charm) / 2),

    traits: inherited,

    x: 100 + Math.random() * 300,
    y: 100 + Math.random() * 200,
    vx: 2 + Math.random() * 2,
    vy: (Math.random() - 0.5) * 1.5
  });

  game.birdEntities.push(child);

  flashScreen("blue");
  floatText(`🧬 ${rarity} FALCON!`, "#60a5fa");

  game.selected = game.birdEntities.length - 1;

  renderUI();
}