console.log("🔥 SPRITE LOADER START");

// ================= SPRITE STORAGE =================

window.SPRITES = {
  bird: {
    sheet: new Image(),
    loaded: false,
    frameCount: 1,
    frameWidth: 0,
    frameHeight: 0
  }
};

// ================= RELIABLE PUBLIC IMAGE =================

// transparent PNG silhouette
window.SPRITES.bird.sheet.src =
  "https://upload.wikimedia.org/wikipedia/commons/3/3f/Hawk_Silhouette.png";

// ================= LOAD SUCCESS =================

window.SPRITES.bird.sheet.onload = () => {

  const s = window.SPRITES.bird;

  s.loaded = true;
  s.frameWidth = s.sheet.width;
  s.frameHeight = s.sheet.height;

  console.log("✅ Bird sprite loaded");
};

// ================= LOAD FAILURE =================

window.SPRITES.bird.sheet.onerror = () => {
  console.error("❌ Bird sprite failed");
};

// ================= GETTER =================

window.getSprite = function (key) {
  return window.SPRITES?.[key] || null;
};

console.log("✅ SPRITE SYSTEM READY");