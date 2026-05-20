console.log("🔥 SPRITE LOADER START");

window.SPRITES = {
  bird: {
    sheet: new Image(),
    loaded: false,
    frameCount: 4,
    frameWidth: 0,
    frameHeight: 0
  }
};

// Use ONLINE placeholder sprite (no local files needed)
window.SPRITES.bird.sheet.src =
  "https://i.imgur.com/6XKJQ3F.png"; // simple bird sprite sheet placeholder

window.SPRITES.bird.sheet.onload = () => {
  const s = window.SPRITES.bird;
  s.loaded = true;
  s.frameWidth = s.sheet.width / 4;
  s.frameHeight = s.sheet.height;

  console.log("✅ Sprite loaded");
};

window.getSprite = function (key) {
  return window.SPRITES?.[key] || null;
};

console.log("✅ SPRITE SYSTEM READY");