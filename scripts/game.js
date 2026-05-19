function floatText(text, color="white"){

  const el = document.createElement("div");
  el.className = "float";
  el.innerText = text;

  const x = window.innerWidth/2 + (Math.random()*100 - 50);
  const y = window.innerHeight/2 + (Math.random()*60 - 30);

  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.color = color;

  document.body.appendChild(el);
  setTimeout(()=>el.remove(), 1000);
}

let scene = "login";

let game = {
  user: null,
  birds: [],
  selected: 0,

  shake: 0,

  weather: {
  type: "Sunny",
  temperature: 28
  },

  // 🎬 CUTSCENE SYSTEM
  cutscene: {
    active: false,
    step: 0,
    cancel: false
  }
};

const assetCache = new Map();

const birdImageCache = {};

// ================= GLOBAL SPRITE REFERENCE =================
let birdImg = null;

async function getFalconSpriteSheet(){

  // 1. return cache if already loaded
  if (birdImageCache.spriteSheet) {
    birdImg = birdImageCache.spriteSheet;
    return birdImageCache.spriteSheet;
  }

  const prompt =
    "UAE fantasy falcon sprite sheet, 4 frame horizontal animation, stylized 2D game asset, transparent background, elegant Arabian falcon";

  const res = await fetch(`${API_BASE}/api/image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();

  if (!data || !data.url) {
    throw new Error("Sprite sheet generation failed");
  }

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = data.url;

  await new Promise(resolve => {
    img.onload = resolve;
    img.onerror = resolve;
  });

  // 2. store properly
  birdImageCache.spriteSheet = img;
  birdImg = img;

  return img;
}

async function getAsset(type, key) {
  console.log("STEP 1 getAsset:", type, key);

  const cacheKey = `${type}-${key}`;

  if (assetCache.has(cacheKey)) {
    return assetCache.get(cacheKey);
  }

  const prompt = buildUAEPrompt(type, key);
  console.log("STEP 2 generateImage start");

  const url = await generateImage(prompt);
  console.log("STEP 3 URL:", url);

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;

  await new Promise((resolve) => {
    img.onload = () => {
      console.log("Image loaded:", url);
      resolve();
    };

    img.onerror = () => {
      console.log("Image failed:", url);
      resolve(); // never crash game
    };
  });

  assetCache.set(cacheKey, img);
  return img;
}

async function getBirdImage(rarity){

  if(birdImageCache[rarity]){
    return birdImageCache[rarity];
  }

  let birdKey =
    rarity === "Legendary" ? "legendary" :
    rarity === "Rare" ? "rare" :
    "common";

  const img = await getAsset("bird", birdKey);

  birdImageCache[rarity] = img;

  return img;
}

// ================= WEATHER SYSTEM =================



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

// ================= RECOVERY SYSTEM =================

// Bird recovery every second
setInterval(() => {

  if(scene === "home"){

    game.birds.forEach(b => {

      b.condition += 0.05;

      b.feedCount =
        Math.max(0, b.feedCount - 1);

      b.condition =
        Math.min(100, b.condition);

    });

    render();
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

const API_BASE = "https://falcon-backend-czg9.onrender.com";

async function generateImage(prompt){
  try {

    const res = await fetch(`${API_BASE}/api/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        prompt: "game asset, clean stylized 2D sprite, UAE inspired desert fantasy design, no realism, no cinematic, " + prompt
      })
    });

    const data = await res.json();

    if (!data || !data.url) {
      throw new Error("No image URL returned");
    }

    return data.url;

  } catch (err) {
    console.log("Image fetch failed:", err);
    return "https://via.placeholder.com/150";
  }
}

function buildUAEPrompt(type, variant){

  const base =
    "masterpiece, ultra detailed stylized 2D game art, UAE culture, Emirati architecture, desert fantasy, luxury Arabian atmosphere, game background, vibrant colors, cinematic lighting, no text, no watermark";

  // ================= BACKGROUNDS =================

  if(type === "background"){

    return {

      sunny:
        `${base},
        Dubai skyline at sunset,
        Burj Khalifa in distance,
        glowing desert dunes,
        palm trees,
        warm golden atmosphere,
        falcon kingdom style`,

      storm:
        `${base},
        dramatic UAE desert sandstorm,
        lightning over Arabian palace,
        dark orange sky,
        cinematic storm clouds,
        epic fantasy Emirati environment`,

      foggy:
        `${base},
        Abu Dhabi royal palace in morning fog,
        mystical Arabian atmosphere,
        soft cinematic haze,
        luxury UAE fantasy world`,

      rainy:
        `${base},
        rainy Dubai night,
        neon reflections,
        wet streets,
        futuristic UAE city,
        cinematic game environment`

    }[variant];
  }

  // ================= BIRDS =================

  if(type === "bird"){

    return {

      common:
        `${base},
        stylized Emirati falcon,
        brown feathers,
        traditional UAE falconry,
        game sprite,
        animated fantasy bird`,

      rare:
        `${base},
        glowing blue royal falcon,
        magical UAE bird,
        elegant wings,
        fantasy game creature,
        energy particles`,

      legendary:
        `${base},
        legendary golden phoenix falcon,
        royal Emirati mythology,
        divine glowing wings,
        ultra cinematic,
        fantasy boss creature,
        magical aura`

    }[variant];
  }
}

function go(newScene){

  game.cutscene.cancel = true;

  let app = document.getElementById("ui"); // FIX HERE

  if(!app) return;

  app.classList.add("fade-out");

  setTimeout(()=>{

    scene = newScene;
    render();

    app.classList.remove("fade-out");

  }, 150);
}

// ================= LOGIN =================

function renderLogin(){
  return `
    <h1>🦅 Falcon Game</h1>
    <input id="email" placeholder="email"><br><br>
    <input id="pass" type="password" placeholder="password"><br><br>

    <button onclick="login()">Start</button>
  `;
}

function login(){
  const email = document.getElementById("email").value;

  if(!email){
    alert("Enter email");
    return;
  }

  game.user = { email };

  game.birds = [
{
  name:"Falcon A",

  condition:100,

  strength:5,
  agility:5,
  intelligence:5,
  stamina:5,
  charm:5,

  feedCount:0,

  traits:["Fast Learner"],

  rarity:"Common",

  x:100,
y:200,

vx:2 + Math.random()*2,
vy:(Math.random()-0.5)*1.5,

wingPhase: Math.random()*10,
bobOffset: Math.random()*100,

// 🦅 NEW ANIMATION STATE
frame: 0,
frameTimer: 0,
frameSpeed: 6
}
];

  game.selected = 0;

  go("home");
}

// ================= HOME =================

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

// ================= BIRDS =================
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

// ================= TRAINING =================

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




function feedBird(food){

  let b = game.birds[game.selected];

  if(!b) return;

  b.feedCount++;

  // =====================
  // FOOD EFFECTS
  // =====================
  if(
  game.weather.type === "Storm" &&
  food === "protein"
  ){
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

  if(b.traits.includes("Charming")){
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

  render();
}

// ================= FEEDING =================
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

// ================= CANVAS INIT =================



// ================= RENDER ENGINE =================
if (!canvas || !ctx) {
  throw new Error("Canvas not found or 2D context unavailable");
}

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function render(){

  let app = document.getElementById("ui");
  if(!app) return;

  app.innerHTML =
    scene === "login"
    ? renderLogin()
    : scene === "home"
    ? renderHome()
    : scene === "birds"
    ? renderBirds()
    : scene === "training"
    ? renderTraining()
    : scene === "feeding"
    ? renderFeeding()
    : scene === "breeding"
    ? renderBreeding()
    : scene === "competition"
    ? renderCompetition()
    : renderHome();
}

// ================= START =================

render();

let running = false;

window.addEventListener("error", (e)=>{
  console.log("Game Error:", e.message);
});

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