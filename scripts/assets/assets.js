// ================= ASSET SYSTEM =================

console.log("🔥 ASSETS.JS EXECUTING");

const assets = {
  background: {}
};

// ================= IMAGE LOADER =================

function loadImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

// ================= GET ASSET =================

function getAsset(type, key) {
  return assets?.[type]?.[key] ?? null;
}

// ================= PRELOAD =================

assets.background.sunny = loadImage("assets/bg/sunny.png");
assets.background.storm = loadImage("assets/bg/storm.png");
assets.background.foggy = loadImage("assets/bg/foggy.png");
assets.background.rainy = loadImage("assets/bg/rainy.png");

// ================= CRITICAL EXPORT =================

window.assets = assets;
window.getAsset = getAsset;

console.log("✅ ASSETS READY:", typeof window.getAsset);