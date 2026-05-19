const TRAIT_EFFECTS = {
  "Fast Learner": {
    trainingGain: 1.5,
    injuryIncrease: 1.1
  },

  "Showstopper": {
    competitionScore: 1.2,
    injuryIncrease: 1.2
  },

  "Resilient": {
    injuryReduction: 0.5
  },

  "Fragile": {
    injuryIncrease: 1.5
  },

  "Charming": {
    charmBonus: 1.5,
    injuryReduction: 0.9
  }
};

const RARE_TRAITS = [
  "Fast Learner",
  "Showstopper",
  "Resilient",
  "Fragile",
  "Charming"
];

// =====================
// TRAINING
// =====================

function trainBird(stat, type){

  let b = game.birds[game.selected];

  if(!b){
    floatText("Select a bird first", "orange");
    return;
  }

  // invalid stat safety
  if(typeof b[stat] !== "number"){
    return;
  }

  // BASE VALUES
  let gain =
    type === "short" ? 1 : 3;

  let injuryRisk =
    type === "short" ? 0.05 : 0.25;

  // =====================
  // TRAINING TYPES
  // =====================

  if(type === "short"){

    b.condition -= 3;
  }

  if(type === "intensive"){

    b.condition -= 10;
  }

  // =====================
  // WEATHER BOOSTS
  // =====================

  if(
    game.weather &&
    game.weather.type === "Storm"
  ){
    injuryRisk += 0.1;
  }

  if(
    game.weather &&
    game.weather.type === "Windy" &&
    stat === "agility"
  ){
    gain += 1;

    floatText(
      "🌪 Wind Boost",
      "#60a5fa"
    );
  }

  // =====================
  // TRAIT BOOSTS
  // =====================

  gain *= getTraitValue(
    b,
    "trainingGain",
    1
  );

  // APPLY GAIN
  b[stat] += gain;

  // =====================
  // INJURY SYSTEM
  // =====================

  let injuryIncrease =
    getTraitValue(
      b,
      "injuryIncrease",
      1
    );

  let injuryReduction =
    getTraitValue(
      b,
      "injuryReduction",
      1
    );

  let injuryModifier =
    injuryIncrease * injuryReduction;

  if(
    Math.random() <
    injuryRisk * injuryModifier
  ){

    b.condition -= 15;

    flashScreen("red");

    floatText(
      "🤕 INJURED!",
      "red"
    );

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
  // EXHAUSTION
  // =====================

  if(b.condition < 20){

    b.stamina =
      Math.max(1, b.stamina - 1);

    floatText(
      "EXHAUSTED",
      "orange"
    );
  }

  // =====================
  // LIMITS
  // =====================

  b.condition =
    Math.max(
      0,
      Math.min(100, b.condition)
    );

  b.strength =
    Math.max(1, b.strength);

  b.agility =
    Math.max(1, b.agility);

  b.stamina =
    Math.max(1, b.stamina);

  b.intelligence =
    Math.max(1, b.intelligence);

  b.charm =
    Math.max(1, b.charm);

  render();
}

// =====================
// TRAIT VALUE HELPER
// =====================

function getTraitValue(
  b,
  key,
  base = 1
){

  let value = base;

  (b.traits || []).forEach(t => {

    if(
      TRAIT_EFFECTS[t] &&
      TRAIT_EFFECTS[t][key]
    ){
      value *=
        TRAIT_EFFECTS[t][key];
    }
  });

  return value;
}

// =====================
// FEEDING
// =====================

function feedBird(food){

  let b = game.birds[game.selected];

  if(!b){
    floatText(
      "Select a bird first",
      "orange"
    );
    return;
  }

  b.feedCount =
    b.feedCount || 0;

  b.feedCount++;

  // =====================
  // WEATHER BONUS
  // =====================

  if(
    game.weather &&
    game.weather.type === "Storm" &&
    food === "protein"
  ){

    b.stamina += 1;

    floatText(
      "⚡ Storm Energy",
      "#60a5fa"
    );
  }

  // =====================
  // FOOD EFFECTS
  // =====================

  if(food === "protein"){

    b.strength += 1;

    floatText(
      "+STRENGTH",
      "#ef4444"
    );
  }

  if(food === "seeds"){

    b.stamina += 1;

    floatText(
      "+STAMINA",
      "#22c55e"
    );
  }

  if(food === "fruits"){

    let bonus = 1;

    if(
      (b.traits || []).includes(
        "Charming"
      )
    ){
      bonus = 2;
    }

    b.charm += bonus;

    floatText(
      "+CHARM",
      "#f59e0b"
    );
  }

  // =====================
  // OVERFEED PENALTY
  // =====================

  if(b.feedCount > 5){

    b.condition -= 10;

    flashScreen("red");

    floatText(
      "OVERFED!",
      "red"
    );
  }

  // =====================
  // BAD DIET PENALTIES
  // =====================

  if(
    food === "protein" &&
    b.strength > b.stamina + 10
  ){

    b.agility -= 1;

    floatText(
      "HEAVY BODY",
      "orange"
    );
  }

  if(
    food === "fruits" &&
    b.charm > 15
  ){

    b.intelligence -= 1;

    floatText(
      "SPOILED",
      "pink"
    );
  }

  // =====================
  // LIMITS
  // =====================

  b.condition =
    Math.max(
      0,
      Math.min(100, b.condition)
    );

  b.strength =
    Math.max(1, b.strength);

  b.agility =
    Math.max(1, b.agility);

  b.stamina =
    Math.max(1, b.stamina);

  b.intelligence =
    Math.max(1, b.intelligence);

  b.charm =
    Math.max(1, b.charm);

  render();
}

// =====================
// RECOVERY SYSTEM
// =====================

setInterval(() => {

  if(
    typeof scene !== "undefined" &&
    scene === "home"
  ){

    (game.birds || []).forEach(b => {

      b.condition =
        (b.condition ?? 100) + 0.05;

      b.feedCount =
        Math.max(
          0,
          (b.feedCount || 0) - 1
        );

      b.condition =
        Math.max(
          0,
          Math.min(100, b.condition)
        );
    });
  }

}, 1000);

// =====================
// FLASH EFFECT
// =====================

function flashScreen(color){

  const div =
    document.createElement("div");

  div.style.position = "fixed";
  div.style.inset = "0";
  div.style.background = color;
  div.style.opacity = "0.35";
  div.style.zIndex = "9999";
  div.style.pointerEvents = "none";

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 150);
}

// =====================
// RISK PREVIEW
// =====================

function getInjuryRiskPreview(
  b,
  type = "short"
){

  let injuryRisk =
    type === "short"
      ? 0.05
      : 0.25;

  // WEATHER
  if(
    game.weather &&
    game.weather.type === "Storm"
  ){
    injuryRisk += 0.1;
  }

  // TRAITS
  let injuryIncrease =
    getTraitValue(
      b,
      "injuryIncrease",
      1
    );

  let injuryReduction =
    getTraitValue(
      b,
      "injuryReduction",
      1
    );

  let modifier =
    injuryIncrease * injuryReduction;

  injuryRisk *= modifier;

  // clamp
  return Math.min(1, injuryRisk);
}