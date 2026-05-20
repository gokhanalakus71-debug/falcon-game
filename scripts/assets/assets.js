// ================= ASSET CACHE =================

const assetCache = new Map();
const birdImageCache = {};

let birdImg = null;

const API_BASE = "https://falcon-backend-czg9.onrender.com";


// ================= SPRITE SHEET =================

async function getFalconSpriteSheet(){

  if (birdImageCache.spriteSheet) {
    birdImg = birdImageCache.spriteSheet;
    return birdImg;
  }

  const prompt =
    "UAE fantasy falcon sprite sheet, 4 frame horizontal animation, stylized 2D game asset, transparent background, elegant Arabian falcon";

  const url = await generateImage(prompt);

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;

  await new Promise(resolve => {
    img.onload = resolve;
    img.onerror = resolve;
  });

  birdImageCache.spriteSheet = img;
  birdImg = img;

  return img;
}


// ================= GENERIC ASSET =================

async function getAsset(type, key){

  const cacheKey = `${type}-${key}`;

  if (assetCache.has(cacheKey)) {
    return assetCache.get(cacheKey);
  }

  const prompt = buildUAEPrompt(type, key);

  const url = await generateImage(prompt);

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;

  await new Promise(resolve => {
    img.onload = resolve;
    img.onerror = resolve;
  });

  assetCache.set(cacheKey, img);
  return img;
}


// ================= BIRD ASSET =================

async function getBirdImage(rarity){

  if (birdImageCache[rarity]) {
    return birdImageCache[rarity];
  }

  const birdKey =
    rarity === "Legendary" ? "legendary" :
    rarity === "Rare" ? "rare" :
    "common";

  const img = await getAsset("bird", birdKey);

  birdImageCache[rarity] = img;

  return img;
}


// ================= IMAGE GENERATION =================

async function generateImage(prompt){

  try {

    const res = await fetch(`${API_BASE}/api/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt:
          "game asset, clean stylized 2D sprite, UAE inspired desert fantasy design, no realism, no cinematic, " + prompt
      })
    });

    const data = await res.json();

    if (!data?.url) {
      throw new Error("No image URL returned");
    }

    return data.url;

  } catch (err) {

    console.log("Image fetch failed:", err);
    return "https://via.placeholder.com/150";
  }
}


// ================= PROMPT BUILDER =================

function buildUAEPrompt(type, variant){

  const base =
    "masterpiece, ultra detailed stylized 2D game art, UAE culture, Emirati architecture, desert fantasy, luxury Arabian atmosphere, vibrant colors, cinematic lighting, no text, no watermark";

  if(type === "background"){

    const bg = {
      sunny: `${base}, Dubai skyline at sunset, Burj Khalifa, golden desert dunes, palm trees`,
      storm: `${base}, desert sandstorm, lightning over palace, dramatic orange sky`,
      foggy: `${base}, Arabian palace in soft fog, mystical atmosphere`,
      rainy: `${base}, rainy futuristic Dubai, neon reflections, wet streets`
    };

    return bg[variant] || bg.sunny;
  }

  if(type === "bird"){

    const birds = {
      common: `${base}, brown falcon, traditional UAE falconry, game sprite`,
      rare: `${base}, glowing blue royal falcon, magical aura, fantasy creature`,
      legendary: `${base}, golden divine falcon, mythic energy wings, ultra cinematic`
    };

    return birds[variant] || birds.common;
  }

  return base;
}


// ================= SCENE SWITCH =================

function go(newScene){

  if(game?.cutscene) {
    game.cutscene.cancel = true;
  }

  const app = document.getElementById("ui");
  if(!app) return;

  app.classList.add("fade-out");

  setTimeout(() => {

    scene = newScene;
    renderUI();

    app.classList.remove("fade-out");

  }, 150);
}
