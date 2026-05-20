console.log("🔥 ASSETS START LOADED");

function createDummyImage(color) {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);

  const img = new Image();
  img.src = canvas.toDataURL();
  return img;
}

window.assets = {
  background: {
    sunny: createDummyImage("yellow"),
    storm: createDummyImage("gray"),
    foggy: createDummyImage("white"),
    rainy: createDummyImage("blue")
  }
};

window.getAsset = function(type, key) {
  return window.assets?.[type]?.[key] || null;
};

console.log("✅ ASSETS READY (NO FILE DEPENDENCY)");