function renderLogin(){
  return `
    <h1>🦅 Falcon Game</h1>
    <input id="email" placeholder="email"><br><br>
    <input id="pass" type="password" placeholder="password"><br><br>

    <button onclick="login()">Start</button>
  `;
}

function renderHome(){

  if(!game.birds || game.birds.length === 0){
    return `
      <h2>🦅 Welcome Commander</h2>
      <div class="panel">No birds loaded</div>
      <button onclick="go('birds')">Go Birds</button>
    `;
  }

  let bird = game.birds[game.selected] || game.birds[0];

  return `
    <h2>🦅 Welcome Commander</h2>

    <div class="panel">

    Active Falcon:
    <b>${bird.name}</b>

    <br><br>

    🌦 Weather:
    <b>${game.weather.type}</b>

    <br>

    🌡 Temperature:
    <b>${game.weather.temperature}°C</b>

    </div>

    <div class="panel">
      <button onclick="go('birds')">🦅 Birds</button>
      <button onclick="go('training')">🏋️ Training</button>
      <button onclick="go('feeding')">🍖 Feeding</button>
      <button onclick="go('breeding')">🧬 Breeding</button>
      <button onclick="go('competition')">🏆 Competition</button>
    </div>
  `;
}

function renderBirds(){

  let html = "<h2>🦅 Your Birds</h2>";

  game.birds.forEach((b,i)=>{

    html += `
      <div class="birdCard"
        onclick="selectBird(${i})"
        style="
          background:${game.selected===i ? '#1e3a8a' : '#111827'};
          padding:10px;
          margin:8px;
          border-radius:12px;
          box-shadow:0 0 10px rgba(59,130,246,0.2);
          transition:0.2s;
          cursor:pointer;
        ">

        <b>${b.name}</b>
        (${b.rarity})<br>

        Traits:
        ${b.traits.join(", ")}<br>

        Condition:
        ${Math.max(0, Math.min(100, b.condition))}
        ${renderRiskBar(getInjuryRiskPreview(b, "short"))}

        <div class="hp-bar">
          <div class="hp-fill"
            style="width:${Math.max(0, Math.min(100, b.condition))}%">
          </div>
        </div>

      </div>
    `;
  });

  html += `
    <br>
    <button onclick="go('home')">
      🏠 Back
    </button>
  `;

  return html;
}

function getInjuryRiskPreview(b, type = "short"){

  let injuryRisk = type === "short" ? 0.05 : 0.25;

  // WEATHER
  if(game.weather.type === "Storm"){
    injuryRisk += 0.1;
  }

  // TRAITS
  let injuryIncrease = getTraitValue(b, "injuryIncrease", 1);
  let injuryReduction = getTraitValue(b, "injuryReduction", 1);

  let modifier = injuryIncrease * injuryReduction;

  injuryRisk *= modifier;

  // clamp for UI safety
  return Math.min(1, injuryRisk);
}

function renderTraining(){

  if(!game.birds || game.birds.length === 0){
    return `
      <h2>No Birds</h2>
      <button onclick="go('home')">Back</button>
    `;
  }

  const b = game.birds[game.selected];

  if(!b){
    return `
      <h2>Select a Bird First</h2>
      <button onclick="go('birds')">Back</button>
    `;
  }

  const shortRisk = getInjuryRiskPreview(b, "short");
  const intensiveRisk = getInjuryRiskPreview(b, "intensive");
  
  return `
    <h2>🏋️ Falcon Training</h2>

    <div class="panel" id="trainingPanel">

      <h3>${b.name}</h3>

      Strength: ${b.strength}<br>
      Agility: ${b.agility}<br>
      Intelligence: ${b.intelligence}<br>
      Stamina: ${b.stamina}<br>
      Charm: ${b.charm}<br>

      <br>

      <h3>SAFE TRAINING</h3>

      <button onclick="trainBird('strength','short')">
        💪 Short Strength
      </button>

      <button onclick="trainBird('agility','short')">
        ⚡ Short Acrobatics
      </button>

      <button onclick="trainBird('stamina','short')">
        ❤️ Short Endurance
      </button>

      <button onclick="trainBird('charm','short')">
        🎵 Short Singing
      </button>

      <br><br>

      <h3>INTENSIVE TRAINING</h3>

      <button onclick="trainBird('strength','intensive')">
        🔥 Intensive Strength
      </button>

      <button onclick="trainBird('agility','intensive')">
        🔥 Intensive Acrobatics
      </button>

      <button onclick="trainBird('stamina','intensive')">
        🔥 Intensive Endurance
      </button>

      <button onclick="trainBird('charm','intensive')">
        🔥 Intensive Singing
      </button>

    </div>

    <button onclick="go('home')">
      🏠 Back
    </button>
    
  `;
}

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

function renderFeeding(){

  const b = game.birds[game.selected];

  return `
    <h2>🍖 Feeding Station</h2>

    <div class="panel">

      <h3>${b.name}</h3>

      Strength: ${b.strength}<br>
      Stamina: ${b.stamina}<br>
      Charm: ${b.charm}<br>

      <br>

      <button onclick="feedBird('protein')">
        🍗 Protein Feed
      </button>

      <button onclick="feedBird('seeds')">
        🌾 Seeds
      </button>

      <button onclick="feedBird('fruits')">
        🍎 Fruits
      </button>

    </div>

    <button onclick="go('home')">
      🏠 Back
    </button>
  `;
}

function renderCompetition(){

  const b = game.birds[game.selected];

  if(!b){
    return `
      <h2>No Bird Selected</h2>
      <button onclick="go('home')">
        Back
      </button>
    `;
  }

  return `
    <h2>🏆 Falcon Competitions</h2>

    <div class="panel">

      <h3>${b.name}</h3>

      Strength: ${b.strength}<br>
      Agility: ${b.agility}<br>
      Intelligence: ${b.intelligence}<br>
      Stamina: ${b.stamina}<br>
      Charm: ${b.charm}<br>

      <br>

      <button onclick="startCompetition('local')">
        🥉 Local Competition
      </button>

      <button onclick="startCompetition('regional')">
        🥈 Regional Competition
      </button>

      <button onclick="startCompetition('national')">
        🥇 National Competition
      </button>

    </div>

    <button onclick="go('home')">
      🏠 Back
    </button>
  `;
}

// ================= COMPETITION =================

function startCompetition(level){

  let player = game.birds[game.selected];

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

    player.condition -= 10;

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

  render();
}

function renderRiskBar(risk){

  const percent = Math.min(100, Math.floor(risk * 100));

  let color = "#22c55e"; // green safe

  if(percent > 30) color = "#f59e0b"; // orange warning
  if(percent > 60) color = "#ef4444"; // red danger

  return `
    <div style="margin-top:6px;">
      <div style="
        width:100%;
        height:8px;
        background:rgba(255,255,255,0.08);
        border-radius:999px;
        overflow:hidden;
      ">
        <div style="
          width:${percent}%;
          height:100%;
          background:${color};
          transition:0.3s;
        "></div>
      </div>

      <small style="opacity:0.8;">
        Injury Risk: ${percent}%
      </small>
    </div>
  `;
}

function selectBird(i){
  game.selected = i;

  const cards = document.querySelectorAll(".birdCard");

  if(cards[i]){
    cards[i].style.transform = "scale(1.08)";
    cards[i].style.boxShadow = "0 0 20px rgba(59,130,246,0.6)";

    setTimeout(()=>{
      cards[i].style.transform = "scale(1)";
      cards[i].style.boxShadow = "0 0 10px rgba(59,130,246,0.2)";
    }, 150);
  }

  render();
  updateWorld();
}

