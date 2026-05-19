// ================= BREEDING =================

function breed(i){

  if(!game.birds || game.birds.length < 2){
    alert("Not enough birds to breed");
    return;
  }

  if(i === game.selected){
    alert("Select another bird");
    return;
  }

  let p1 = game.birds[game.selected];
  let p2 = game.birds[i];

  if(!p1 || !p2){
    return;
  }

  // =====================
  // MUTATION SYSTEM
  // =====================

  function mutateStat(avg){

    let mutation =
      Math.floor(Math.random() * 5) - 2;
      // -2 to +2

    return Math.max(1, avg + mutation);
  }

  // =====================
  // TRAIT INHERITANCE
  // =====================

  let combinedTraits = [
    ...(p1.traits || []),
    ...(p2.traits || [])
  ];

  let uniqueTraits =
    [...new Set(combinedTraits)];

  let inheritedTraits = [];

  let traitCount =
    1 + Math.floor(Math.random() * 2);

  // 20% mutation chance
  let mutationRoll =
    Math.random() < 0.2;

  for(let t = 0; t < traitCount; t++){

    if(uniqueTraits.length === 0){
      break;
    }

    let randomTrait =
      uniqueTraits[
        Math.floor(
          Math.random() * uniqueTraits.length
        )
      ];

    if(
      randomTrait &&
      !inheritedTraits.includes(randomTrait)
    ){
      inheritedTraits.push(randomTrait);
    }
  }

  // =====================
  // TRAIT MUTATION
  // =====================

  if(
    mutationRoll &&
    typeof RARE_TRAITS !== "undefined"
  ){

    let randomTrait =
      RARE_TRAITS[
        Math.floor(
          Math.random() * RARE_TRAITS.length
        )
      ];

    if(
      randomTrait &&
      !inheritedTraits.includes(randomTrait)
    ){
      inheritedTraits.push(randomTrait);
    }

    floatText("🧬 MUTATION!", "#a855f7");
  }

  // =====================
  // RARE MUTATION
  // =====================

  let rarity = "Common";

  let rareRoll = Math.random();

  if(rareRoll > 0.95){

    rarity = "Legendary";

    if(!inheritedTraits.includes("Mythic")){
      inheritedTraits.push("Mythic");
    }

  }else if(rareRoll > 0.80){

    rarity = "Rare";
  }

  // =====================
  // CREATE CHILD
  // =====================

  let child = {

    name: "Hybrid Falcon",

    rarity: rarity,

    traits: inheritedTraits,

    condition: 100,

    feedCount: 0,

    charm:
      mutateStat(
        Math.floor(
          (
            (p1.charm || 5) +
            (p2.charm || 5)
          ) / 2
        )
      ),

    strength:
      mutateStat(
        Math.floor(
          (
            (p1.strength || 5) +
            (p2.strength || 5)
          ) / 2
        )
      ),

    agility:
      mutateStat(
        Math.floor(
          (
            (p1.agility || 5) +
            (p2.agility || 5)
          ) / 2
        )
      ),

    intelligence:
      mutateStat(
        Math.floor(
          (
            (p1.intelligence || 5) +
            (p2.intelligence || 5)
          ) / 2
        )
      ),

    stamina:
      mutateStat(
        Math.floor(
          (
            (p1.stamina || 5) +
            (p2.stamina || 5)
          ) / 2
        )
      ),

    x: 100 + Math.random() * 300,
    y: 100 + Math.random() * 200,

    vx: 2 + Math.random() * 2,
    vy: (Math.random() - 0.5) * 1.5,

    wingPhase: Math.random() * 10,
    bobOffset: Math.random() * 100,

    // 🦅 ANIMATION STATE
    frame: 0,
    frameTimer: 0,
    frameSpeed: 6
  };

  flashScreen("blue");

  game.birds.push(child);

  floatText(
    "🧬 " + rarity + " FALCON!",
    "#60a5fa"
  );

  game.selected =
    game.birds.length - 1;

  render();
}