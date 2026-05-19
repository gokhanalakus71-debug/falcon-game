function trainBird(stat, type){

  let b = game.birds[game.selected];
  if(!b) return;

  // BASE VALUES
  let gain = type === "short" ? 1 : 3;
  let injuryRisk = type === "short" ? 0.05 : 0.25;

  // WEATHER BOOST
  if(game.weather.type === "Windy" && stat === "agility"){
    gain += 1;
    floatText("🌪 Wind Boost", "#60a5fa");
  }

  if(game.weather.type === "Storm"){
    injuryRisk += 0.1;
  }

  // TRAIT BOOST (CLEAN SYSTEM)  

  // =====================
  // TRAINING TYPES
  // =====================

  if(type === "short"){

    gain = 1;
    injuryRisk = 0.05;

    b.condition -= 3;
  }

  if(type === "intensive"){

    gain = 3;
    injuryRisk = 0.25;

    b.condition -= 10;
  }

  // APPLY GAIN

  gain *= getTraitValue(b, "trainingGain", 1);

  b[stat] += gain;

  // =====================
  // INJURY SYSTEM
  // =====================

  let injuryIncrease = getTraitValue(b, "injuryIncrease", 1);
  let injuryReduction = getTraitValue(b, "injuryReduction", 1);

  let injuryModifier = injuryIncrease * injuryReduction;

  if(Math.random() < injuryRisk * injuryModifier){

    b.condition -= 15;

    flashScreen("red");

    floatText("🤕 INJURED!", "red");

    // injury penalty

    b.agility =
      Math.max(1, b.agility - 1);

  }else{

    flashScreen("green");

    floatText(
      "+" + stat.toUpperCase(),
      "#22c55e"
    );
  }

  // =====================
  // EXHAUSTION PENALTY
  // =====================

  if(b.condition < 20){

    b.stamina =
      Math.max(1, b.stamina - 1);

    floatText("EXHAUSTED", "orange");
  }

  // LIMITS

  b.condition =
    Math.max(0, Math.min(100, b.condition));

  render();
}


function getTraitValue(b, key, base = 1){
  let value = base;

  b.traits.forEach(t => {
    if(TRAIT_EFFECTS[t] && TRAIT_EFFECTS[t][key]){
      value *= TRAIT_EFFECTS[t][key];
    }
  });

  return value;
}