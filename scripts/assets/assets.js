const assetCache = new Map();

const birdImageCache = {};

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
