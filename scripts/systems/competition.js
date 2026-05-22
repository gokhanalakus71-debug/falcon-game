// ================= COMPETITION SYSTEM (FULL ECS VERSION) =================

function startCompetition(level) {

  // ================= GET ENTITY =================

  const entity =
    game.birdEntities?.[game.selected];

  if (!entity) {
    alert("No bird selected");
    return;
  }

  // ================= ECS COMPONENTS =================

  const stats =
    getComponent(entity, "stats");

  const traits =
    getComponent(entity, "traits");

  const condition =
    getComponent(entity, "condition");

  const bird =
    getComponent(entity, "bird");

  // ================= SAFETY =================

  if (
    !stats ||
    !traits ||
    !condition ||
    !bird
  ) {
    console.error(
      "Competition ECS data missing"
    );
    return;
  }

  // ================= LEVEL DIFFICULTY =================

  let difficulty = 20;

  switch (level) {

    case "local":
      difficulty = 20;
    break;

    case "regional":
      difficulty = 35;
    break;

    case "national":
      difficulty = 50;
    break;

    default:
      difficulty = 20;
    break;
  }

  // ================= WEATHER BONUS =================

  let weatherBonus = 0;

  const traitList = traits.list || [];

  if (
    game.weather?.type === "Windy" &&
    traitList.includes("Swift")
  ) {
    weatherBonus += 8;
  }

  if (
    game.weather?.type === "Storm" &&
    traitList.includes("Hunter")
  ) {
    weatherBonus += 6;
  }

  if (
    game.weather?.type === "Foggy" &&
    stats.intelligence > 10
  ) {
    weatherBonus += 5;
  }

  // ================= RANDOMNESS =================

  const randomness =
    Math.floor(Math.random() * 20);

  // ================= TRAIT BONUS =================

  const traitBonus =
    traitList.includes("Showstopper")
      ? 15
      : traitList.length * 2;

  // ================= RARITY BONUS =================

  let rarityBonus = 0;

  if (bird.rarity === "Rare") {
    rarityBonus = 5;
  }

  if (bird.rarity === "Legendary") {
    rarityBonus = 12;
  }

  // ================= FINAL SCORE =================

  const score =

    (0.3 * stats.strength) +
    (0.2 * stats.agility) +
    (0.2 * stats.intelligence) +
    (0.2 * stats.stamina) +
    (0.1 * stats.charm) +

    randomness +
    traitBonus +
    rarityBonus +
    weatherBonus;

  // ================= RESULT =================

  const result =
    score >= difficulty
      ? "WIN"
      : "LOSE";

  // ================= APPLY RESULTS =================

  if (result === "WIN") {

    condition.value =
      Math.max(0, condition.value - 5);

    stats.charm += 1;

    floatText(
      "🏆 VICTORY!",
      "#22c55e"
    );

  } else {

    condition.value =
      Math.max(0, condition.value - 10);

    floatText(
      "💀 DEFEAT",
      "red"
    );
  }

  // ================= CLAMP =================

  condition.value =
    clamp(condition.value, 0, 100);

  // ================= RESULT SCREEN =================

  alert(

    "🏆 " +
    level.toUpperCase() +
    " COMPETITION\n\n" +

    "Falcon: " +
    bird.name +

    "\n\nScore: " +
    score.toFixed(1) +

    "\nDifficulty: " +
    difficulty +

    "\n\nResult: " +
    result
  );

  // ================= UI REFRESH =================

  renderUI();
}

// ================= EXPORT =================

window.startCompetition =
  startCompetition;