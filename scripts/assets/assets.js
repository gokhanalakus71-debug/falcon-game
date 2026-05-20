console.log("🔥 ASSETS STARTED");

const assets = { background: {} };

function loadImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

function getAsset(type, key) {
  console.log("getAsset called:", type, key);
  return assets?.[type]?.[key] ?? null;
}

// preload (SAFE VERSION)
try {
  assets.background.sunny = loadImage("assets/bg/sunny.png");
  assets.background.storm = loadImage("assets/bg/storm.png");

  console.log("🔥 PRELOAD DONE");
} catch (e) {
  console.error("❌ IMAGE LOAD ERROR:", e);
}

console.log("🔥 BEFORE EXPORT");

// 🔴 CRITICAL LINE
window.getAsset = getAsset;
window.assets = assets;

console.log("✅ ASSETS READY");