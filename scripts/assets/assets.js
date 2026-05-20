console.log("🔥 ASSETS START LOADED");

window.assets = {
  background: {
    sunny: new Image(),
    storm: new Image(),
    foggy: new Image()
  }
};

// preload (IMPORTANT)
window.assets.background.sunny.src = "assets/sunny.png";
window.assets.background.storm.src = "assets/storm.png";
window.assets.background.foggy.src = "assets/foggy.png";

window.getAsset = function(type, key) {
  return window.assets?.[type]?.[key] || null;
};

console.log("✅ ASSETS READY");