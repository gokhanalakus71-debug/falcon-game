// ================= ASSET SYSTEM =================

const assets = {
  background: {}
};

// ================= LOAD IMAGE =================

function loadImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

// ================= GET ASSET =================

function getAsset(type, key) {
  return assets[type]?.[key] || null;
}

// ================= INIT BACKGROUNDS =================

assets.background.sunny = loadImage("assets/bg/sunny.png");
assets.background.storm = loadImage("assets/bg/storm.png");
assets.background.foggy = loadImage("assets/bg/foggy.png");
assets.background.rainy = loadImage("assets/bg/rainy.png");

// ================= GLOBAL EXPORT =================

window.getAsset = getAsset;
window.assets = assets;