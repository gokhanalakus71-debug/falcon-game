// ================= BREEDING =================

function renderBreeding(){

  let html = `
    <h2>🧬 Falcon Breeding</h2>

    <div class="panel">
  `;

  game.birds.forEach((b,i)=>{

    html += `
      <div class="birdCard">

        <b>${b.name}</b><br>

        STR ${b.strength}
        | AGI ${b.agility}
        | INT ${b.intelligence}

        <br><br>

        <button onclick="breed(${i})">
          Breed With Selected
        </button>

      </div>
    `;
  });

  html += `
    </div>

    <button onclick="go('home')">
      🏠 Back
    </button>
  `;

  return html;
}

function breed(i){

  if (!game.birds || game.birds.length < 2) {
  alert("Not enough birds to breed");
  return;
  }
  
  if(i === game.selected){
    alert("Select another bird");
    return;
  }

  let p1 = game.birds[game.selected];
  let p2 = game.birds[i];

  // =====================
  // MUTATION SYSTEM
  // =====================

  function mutateStat(avg){

    let mutation =
      Math.floor(Math.random()*5) - 2;
      // -2 to +2

    return Math.max(1, avg + mutation);
  }

  // =====================
  // TRAIT INHERITANCE
  // =====================

  let combinedTraits =
    [...p1.traits, ...p2.traits];

  let uniqueTraits =
    [...new Set(combinedTraits)];

  let inheritedTraits = [];

  let traitCount = 1 + Math.floor(Math.random()*2);

  // 20% mutation chance
  let mutationRoll = Math.random() < 0.2;

  for(let t=0; t<traitCount; t++){

    let randomTrait =
      uniqueTraits[
        Math.floor(Math.random()*uniqueTraits.length)
      ];

    if(!inheritedTraits.includes(randomTrait)){
      inheritedTraits.push(randomTrait);
    }
  }
// =====================
// MUTATION SYSTEM (20%)
// =====================

if(mutationRoll){

  let randomTrait =
    RARE_TRAITS[
      Math.floor(Math.random() * RARE_TRAITS.length)
    ];

  if(!inheritedTraits.includes(randomTrait)){
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

    inheritedTraits.push("Mythic");

  }else if(rareRoll > 0.80){

    rarity = "Rare";
  }

  // =====================
  // CREATE CHILD
  // =====================

  let child = {

  name:"Hybrid Falcon",

  rarity: rarity,

  traits: inheritedTraits,

  condition:100,

  feedCount:0,

  charm:
    mutateStat(
      Math.floor(
        ((p1.charm || 5) + (p2.charm || 5))/2
      )
    ),

    strength:
      mutateStat(
        Math.floor(
          (p1.strength + p2.strength)/2
        )
      ),

    agility:
      mutateStat(
        Math.floor(
          (p1.agility + p2.agility)/2
        )
      ),

    intelligence:
      mutateStat(
        Math.floor(
          (p1.intelligence + p2.intelligence)/2
        )
      ),

    stamina:
      mutateStat(
        Math.floor(
          (p1.stamina + p2.stamina)/2
        )
      ),

    x:100 + Math.random()*300,
y:100 + Math.random()*200,

vx:2 + Math.random()*2,
vy:(Math.random()-0.5)*1.5,

wingPhase: Math.random()*10,
bobOffset: Math.random()*100,

// 🦅 NEW ANIMATION STATE
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