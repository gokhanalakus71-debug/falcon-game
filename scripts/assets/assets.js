console.log("🔥 ASSETS FILE STARTED");

try {

  const assets = {
    background: {}
  };

  function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
  }

  function getAsset(type, key) {
    return assets?.[type]?.[key] ?? null;
  }

  assets.background.sunny = loadImage("assets/bg/sunny.png");

  console.log("🔥 BEFORE EXPORT");

  window.getAsset = getAsset;
  window.assets = assets;

  console.log("✅ EXPORT DONE");

} catch (err) {
  console.error("💥 ASSETS ERROR:", err);
}

window.getAsset = getAsset;