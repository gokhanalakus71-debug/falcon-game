function startCompetition(level){

  let player = game.birdEntities[game.selected];

  if(!player){
    alert("No bird selected");
    return;
  }

  // =====================
  // LEVEL DIFFICULTY
  // =====================

  let difficulty = 20;

  if(level === "local"){
    difficulty = 20;
  }

  if(level === "regional"){
    difficulty = 35;
  }

  if(level === "national"){
    difficulty = 50;
  }

  let weatherBonus = 0;

  if(
  game.weather.type === "Windy" &&
  player.traits.includes("Swift")
  ){
  weatherBonus += 8;
  }

  if(
  game.weather.type === "Storm" &&
  player.traits.includes("Hunter")
  ){
  weatherBonus += 6;
  }

  if(
  game.weather.type === "Foggy" &&
  player.intelligence > 10
  ){
  weatherBonus += 5;
  }
  // =====================
  // PERFORMANCE SCORE
  // =====================

  let randomness =
    Math.floor(Math.random() * 20);

  let traitBonus =
  player.traits.includes("Showstopper")
    ? 15
    : player.traits.length * 2;

  let rarityBonus = 0;

  if(player.rarity === "Rare"){
    rarityBonus = 5;
  }

  if(player.rarity === "Legendary"){
    rarityBonus = 12;
  }

  let score =

    (0.3 * player.strength) +
    (0.2 * player.agility) +
    (0.2 * player.intelligence) +
    (0.2 * player.stamina) +
    (0.1 * player.charm) +

    randomness +
    traitBonus +
    rarityBonus +
    weatherBonus;

  // =====================
  // RESULTS
  // =====================

  let result = "LOSE";

  if(score >= difficulty){
    result = "WIN";
  }

  // =====================
  // REWARDS
  // =====================

  if(result === "WIN"){

    player.condition =
      Math.max(0, player.condition - 5);

    player.charm += 1;

    floatText("🏆 VICTORY!", "#22c55e");

  }else{

    const condition = getCondition(player);
  if (condition) condition.value -= 10;

    floatText("💀 DEFEAT", "red");
  }

  // =====================
  // SHOW RESULTS
  // =====================

  alert(

    "🏆 " + level.toUpperCase() +
    " COMPETITION\n\n" +

    "Score: " +
    score.toFixed(1) +

    "\nDifficulty: " +
    difficulty +

    "\n\nResult: " +
    result
  );

  renderUI();
}