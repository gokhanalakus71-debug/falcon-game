console.log("🔥 ASSETS START LOADED");

function loadImage(src) {
  const img = new Image();

  img.loaded = false;

  img.onload = () => {
    img.loaded = true;
    console.log("✅ Loaded:", src);
  };

  img.onerror = () => {
    console.error("❌ Failed:", src);
  };

  img.src = src;
  return img;
}

window.assets = {
  background: {
    sunny: loadImage("assets/sunny.png"),
    storm: loadImage("assets/storm.png"),
    foggy: loadImage("assets/foggy.png"),
    rainy: loadImage("assets/rainy.png")
  }
};

window.getAsset = function(type, key) {
  return window.assets?.[type]?.[key] || null;
};

console.log("✅ ASSETS READY");