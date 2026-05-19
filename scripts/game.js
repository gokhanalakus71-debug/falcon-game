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



// ================= BIRDS =================




// ================= TRAINING =================








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

