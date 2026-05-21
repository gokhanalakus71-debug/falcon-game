// ===================== TRAINING SYSTEM (ECS CLEAN VERSION) =====================

function trainBird(stat, type) {

  const entity = game.birdEntities?.[game.selected];

  if (!entity) {
    floatText("Select a bird first", "orange");
    return;
  }

  const stats = getComponent(entity, "stats");
  const condition = getComponent(entity, "condition");

  if (!stats || !condition) return;

  // ===================== SAFETY =====================

  if (typeof stats[stat] !== "number") return;

  // ===================== BASE VALUES =====================

  let gain = type === "short" ? 1 : 3;
  let injuryRisk = type === "short" ? 0.05 : 0.25;

  // ===================== CONDITION (ECS SAFE) =====================

  if (type === "short") condition.value -= 3;
  if (type === "intensive") condition.value -= 10;

  // ===================== WEATHER =====================

  if (game.weather?.type === "Storm") {
    injuryRisk += 0.1;
  }

  if (game.weather?.type === "Windy" && stat === "agility") {
    gain += 1;
    floatText("🌪 Wind Boost", "#60a5fa");
  }

  // ===================== TRAITS =====================

  gain *= getTraitValue(entity, "trainingGain", 1);

  const injuryIncrease = getTraitValue(entity, "injuryIncrease", 1);
  const injuryReduction = getTraitValue(entity, "injuryReduction", 1);
  const injuryModifier = injuryIncrease * injuryReduction;

  // ===================== APPLY TRAINING =====================

  stats[stat] += gain;

  // ===================== INJURY CHECK =====================

  if (Math.random() < injuryRisk * injuryModifier) {

    condition.value -= 15;

    flashScreen("red");
    floatText("🤕 INJURED!", "red");

    stats.agility = Math.max(1, stats.agility - 1);

  } else {

    flashScreen("green");
    floatText("+" + stat.toUpperCase(), "#22c55e");
  }

  // ===================== EXHAUSTION =====================

  if (condition.value < 20) {
    stats.stamina = Math.max(1, stats.stamina - 1);
    floatText("EXHAUSTED", "orange");
  }

  // ===================== CLAMP =====================

  condition.value = clamp(condition.value, 0, 100);

  stats.strength = Math.max(1, stats.strength);
  stats.agility = Math.max(1, stats.agility);
  stats.stamina = Math.max(1, stats.stamina);
  stats.intelligence = Math.max(1, stats.intelligence);
  stats.charm = Math.max(1, stats.charm);

  renderUI();
}

// ===================== TRAITS =====================

function getTraitValue(entity, key, base = 1) {

  let value = base;

  const traits = getComponent(entity, "traits");

  if (!traits?.list) return value;

  traits.list.forEach(t => {
    if (TRAIT_EFFECTS[t]?.[key]) {
      value *= TRAIT_EFFECTS[t][key];
    }
  });

  return value;
}

// ===================== FEEDING (ECS FIXED) =====================

function feedBird(food) {

  const entity = game.birdEntities?.[game.selected];

  if (!entity) {
    floatText("Select a bird first", "orange");
    return;
  }

  const stats = getComponent(entity, "stats");
  const condition = getComponent(entity, "condition");
  const traits = getComponent(entity, "traits");

  if (!stats || !condition) return;

  condition.feedCount += 1;

  // ===================== FOOD EFFECTS =====================

  if (game.weather?.type === "Storm" && food === "protein") {
    stats.stamina += 1;
    floatText("⚡ Storm Energy", "#60a5fa");
  }

  if (food === "protein") {
    stats.strength += 1;
    floatText("+STRENGTH", "#ef4444");
  }

  if (food === "seeds") {
    stats.stamina += 1;
    floatText("+STAMINA", "#22c55e");
  }

  if (food === "fruits") {
    const bonus = traits?.list?.includes("Charming") ? 2 : 1;
    stats.charm += bonus;
    floatText("+CHARM", "#f59e0b");
  }

  // ===================== OVERFEED =====================

  if (condition.feedCount > 5) {
    condition.value -= 10;
    flashScreen("red");
    floatText("OVERFED!", "red");
  }

  // ===================== BALANCE PENALTIES =====================

  if (food === "protein" && stats.strength > stats.stamina + 10) {
    stats.agility -= 1;
    floatText("HEAVY BODY", "orange");
  }

  if (food === "fruits" && stats.charm > 15) {
    stats.intelligence -= 1;
    floatText("SPOILED", "pink");
  }

  // ===================== CLAMP =====================

  condition.value = clamp(condition.value, 0, 100);

  stats.strength = Math.max(1, stats.strength);
  stats.agility = Math.max(1, stats.agility);
  stats.stamina = Math.max(1, stats.stamina);
  stats.intelligence = Math.max(1, stats.intelligence);
  stats.charm = Math.max(1, stats.charm);

  renderUI();
}

// ===================== RECOVERY (ECS FIXED) =====================

setInterval(() => {

  if (window.scene !== "home") return;

  const entities = game.birdEntities || [];

  entities.forEach(entity => {

    const condition = getComponent(entity, "condition");

    if (!condition) return;

    condition.value = clamp(condition.value + 0.05, 0, 100);
    condition.feedCount = Math.max(0, condition.feedCount - 1);
  });

}, 1000);

// ===================== UTIL =====================

function flashScreen(color) {
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.inset = "0";
  div.style.background = color;
  div.style.opacity = "0.35";
  div.style.zIndex = "9999";
  div.style.pointerEvents = "none";

  document.body.appendChild(div);
  setTimeout(() => div.remove(), 150);
}

function getInjuryRiskPreview(entity, type = "short") {

  let injuryRisk = type === "short" ? 0.05 : 0.25;

  if (game.weather?.type === "Storm") {
    injuryRisk += 0.1;
  }

  const injuryIncrease = getTraitValue(entity, "injuryIncrease", 1);
  const injuryReduction = getTraitValue(entity, "injuryReduction", 1);

  return Math.min(1, injuryRisk * injuryIncrease * injuryReduction);
}

// ===================== CLAMP =====================

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}