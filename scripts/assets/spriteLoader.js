console.log("🔥 SPRITE LOADER START");

// ================= CREATE PROCEDURAL BIRD =================

function createBirdSprite() {

  const canvas = document.createElement("canvas");

  canvas.width = 128;
  canvas.height = 128;

  const ctx = canvas.getContext("2d");

  // ================= BODY =================

  ctx.fillStyle = "#cbd5e1";

  ctx.beginPath();
  ctx.ellipse(64, 64, 34, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  // ================= WING =================

  ctx.fillStyle = "#94a3b8";

  ctx.beginPath();
  ctx.moveTo(60, 64);
  ctx.lineTo(20, 40);
  ctx.lineTo(38, 78);
  ctx.closePath();
  ctx.fill();

  // ================= HEAD =================

  ctx.fillStyle = "#e2e8f0";

  ctx.beginPath();
  ctx.arc(88, 54, 14, 0, Math.PI * 2);
  ctx.fill();

  // ================= EYE =================

  ctx.fillStyle = "black";

  ctx.beginPath();
  ctx.arc(92, 52, 2, 0, Math.PI * 2);
  ctx.fill();

  // ================= BEAK =================

  ctx.fillStyle = "#f59e0b";

  ctx.beginPath();
  ctx.moveTo(100, 56);
  ctx.lineTo(116, 60);
  ctx.lineTo(100, 64);
  ctx.closePath();
  ctx.fill();

  // ================= IMAGE =================

  const img = new Image();

  img.src = canvas.toDataURL();

  return img;
}

// ================= SPRITE STORAGE =================

window.SPRITES = {
  bird: {
    sheet: createBirdSprite(),
    loaded: true,
    frameCount: 1,
    frameWidth: 128,
    frameHeight: 128
  }
};

// ================= GETTER =================

window.getSprite = function(key) {
  return window.SPRITES?.[key] || null;
};

console.log("✅ PROCEDURAL SPRITE READY");