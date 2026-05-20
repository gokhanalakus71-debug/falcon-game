// ================= ASSET STORAGE =================

window.assets = {
  background: {
    sunny: new Image(),
    storm: new Image(),
    foggy: new Image(),
    rainy: new Image()
  }
};

// ================= BACKGROUND IMAGES =================

window.assets.background.sunny.src = "assets/sunny.png";
window.assets.background.storm.src = "assets/storm.png";
window.assets.background.foggy.src = "assets/foggy.png";
window.assets.background.rainy.src = "assets/rainy.png";

// ================= BIRD SPRITE =================

window.birdImg = new Image();
window.birdImg.src = "assets/bird.png";

// ================= GET ASSET =================

window.getAsset = function(type, key) {
  return window.assets?.[type]?.[key] || null;
};

// ================= DEBUG =================

console.log("✅ Assets loaded");