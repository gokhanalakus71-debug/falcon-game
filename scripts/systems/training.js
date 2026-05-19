const TRAIT_EFFECTS = {
   "Fast Learner": {
    trainingGain: 1.5,
    injuryIncrease: 1.1   // learns fast but pushes too hard
  },
   "Showstopper": {
    competitionScore: 1.2,
    injuryIncrease: 1.2   // high risk performer
  },
  "Resilient": {
    injuryReduction: 0.5
  },
  "Fragile": {
    injuryIncrease: 1.5
  },
  "Charming": {
    charmBonus: 1.5,
    injuryReduction: 0.9   // calmer, slightly safer
  }
};

const RARE_TRAITS = [
  "Fast Learner",
  "Showstopper",
  "Resilient",
  "Fragile",
  "Charming"
];

function trainBird(stat, type){

  let b = game.birds[game.selected];
  if(!b){
  floatText("Select a bird first", "orange");
  return;
}

  // BASE VALUES
  let gain = type === "short" ? 1 : 3;
  let injuryRisk = type === "short" ? 0.05 : 0.25;

  if(game.weather && game.weather.type === "Storm"){
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

  // WEATHER BOOST
  if(game.weather && game.weather.type === "Storm"){
  injuryRisk += 0.1;

  if(game.weather.type === "Windy" && stat === "agility"){
    gain += 1;
    floatText("🌪 Wind Boost", "#60a5fa");
  }

  // APPLY GAIN

  gain *= getTraitValue(b, "trainingGain", 1);

  if(typeof b[stat] !== "number"){
  return;
  }
  
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

}


function getTraitValue(b, key, base = 1){
  let value = base;

  (b.traits || []).forEach(t => {
    if(TRAIT_EFFECTS[t] && TRAIT_EFFECTS[t][key]){
      value *= TRAIT_EFFECTS[t][key];
    }
  });

  return value;
}

function feedBird(food){

  let b = game.birds[game.selected];

  if(!b){
  floatText("Select a bird first", "orange");
  return;
}

  b.feedCount = b.feedCount || 0;
  b.feedCount++;

  // =====================
  // FOOD EFFECTS
  // =====================
  if(game.weather && game.weather.type === "Storm" &&
  food === "protein"){
  b.stamina += 1;

  floatText(
    "⚡ Storm Energy",
    "#60a5fa"
  );
  }
  
  if(food === "protein"){

    b.strength += 1;

    floatText("+STRENGTH", "#ef4444");
  }

  if(food === "seeds"){

    b.stamina += 1;

    floatText("+STAMINA", "#22c55e");
  }

  if(food === "fruits"){

  let bonus = 1;

  if((b.traits || []).includes("Charming")){
    bonus = 2;
  }

  b.charm += bonus;

  floatText("+CHARM", "#f59e0b");
  }

  // =====================
  // OVERFEED PENALTY
  // =====================

  if(b.feedCount > 5){

    b.condition -= 10;

    flashScreen("red");

    floatText("OVERFED!", "red");
  }

  // =====================
  // BAD DIET PENALTY
  // =====================

  if(food === "protein" && b.strength > b.stamina + 10){

    b.agility -= 1;

    floatText("HEAVY BODY", "orange");
  }

  if(food === "fruits" && b.charm > 15){

    b.intelligence -= 1;

    floatText("SPOILED", "pink");
  }

  // LIMITS

  b.condition =
    Math.max(0, Math.min(100, b.condition));

  b.agility =
    Math.max(1, b.agility);

  b.intelligence =
    Math.max(1, b.intelligence);

}

// ================= RECOVERY SYSTEM =================

// Bird recovery every second
setInterval(() => {

  if(typeof scene !== "undefined" && scene === "home"){

    (game.birds || []).forEach(b => {

      b.condition = (b.condition || 0) + 0.05;

      b.feedCount =
        Math.max(0, (b.feedCount || 0) - 1);

      b.condition =
        Math.min(100, b.condition);

    });
  }

}, 1000);

function flashScreen(color){
  const div = document.createElement("div");

  div.style.position = "fixed";
  div.style.inset = "0";
  div.style.background = color;
  div.style.opacity = "0.35";
  div.style.zIndex = "9999";
  div.style.pointerEvents = "none";

  document.body.appendChild(div);

  setTimeout(()=>{
    div.remove();
  }, 150);
}

function getInjuryRiskPreview(b, type = "short"){

  let injuryRisk = type === "short" ? 0.05 : 0.25;

}

  // TRAITS
  let injuryIncrease = getTraitValue(b, "injuryIncrease", 1);
  let injuryReduction = getTraitValue(b, "injuryReduction", 1);

  let modifier = injuryIncrease * injuryReduction;

  injuryRisk *= modifier;

  // clamp for UI safety
  return Math.min(1, injuryRisk);
}