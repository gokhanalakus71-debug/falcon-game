console.log("🔥 ASSETS LOADING...");

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

// ================= ASSET REGISTRY =================

window.assets = {
  background: {
    sunny: loadImage("https://picsum.photos/1280/720?random=1"),
    storm: loadImage("https://picsum.photos/1280/720?random=2"),
    foggy: loadImage("https://picsum.photos/1280/720?random=3"),
    rainy: loadImage("https://picsum.photos/1280/720?random=4")
  },

  bird: {
    default: loadImage("https://dummyimage.com/256x256/1e3a8a/ffffff.png&text=Bird")
  }
};

window.getAsset = function(type, key) {
  return window.assets?.[type]?.[key] || null;
};

console.log("✅ ASSETS READY");