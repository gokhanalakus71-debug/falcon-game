// ================= CANVAS SETUP =================

const canvas = document.getElementById("world");

if (!canvas) throw new Error("Canvas not found");

const ctx = canvas.getContext("2d");

if (!ctx) throw new Error("2D context unavailable");

// ================= RESIZE =================

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

// ================= WORLD RENDER =================

async function renderWorld() {
  if (!game || !game.weather) return;

  // ================= BACKGROUND =================

  let bgKey = "sunny";

  if (game.weather.type === "Storm") bgKey = "storm";
  if (game.weather.type === "Foggy") bgKey = "foggy";
  if (game.weather.type === "Rainy") bgKey = "rainy";

  const bg = await getAsset("background", bgKey);

  if (bg?.complete) {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  }

  // ================= FOG OVERLAY =================

  if (game.weather.type === "Foggy") {
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // ================= RAIN EFFECT =================

  if (game.weather.type === "Rainy") {
    ctx.strokeStyle = "rgba(120,160,255,0.5)";

    for (let i = 0; i < 60; i++) {
      const x = (i * 97 + Date.now() * 0.3) % canvas.width;
      const y = (i * 53 + Date.now() * 0.6) % canvas.height;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 4, y + 10);
      ctx.stroke();
    }
  }

  // ================= PARTICLES =================

  const time = Date.now() * 0.001;

  for (let i = 0; i < 20; i++) {
    const x = (time * 60 + i * 120) % canvas.width;
    const y = (time * 40 + i * 80) % canvas.height;

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,215,0,0.15)";
    ctx.fill();
  }

  // ================= ECS BIRDS =================

  if (!birdImg || !birdImg.complete || !birdImg.naturalWidth) return;

  const entities = getEntitiesWith("position", "animation", "bird");

  for (const e of entities) {
    const pos = getComponent(e, "position");
    const anim = getComponent(e, "animation");
    const bird = getComponent(e, "bird");

    if (!pos || !anim || !bird) continue;

    const frameWidth = birdImg.width / 4;
    const frameHeight = birdImg.height;

    const size = 90 + Math.sin(anim.wingPhase || 0) * 10;

    ctx.save();
    ctx.translate(pos.x, pos.y);

    // SAFE FLIP (FIXED: vx is NOT in position component)
    const vel = getComponent(e, "velocity");
    if (vel?.vx < 0) {
      ctx.scale(-1, 1);
    }

    // BODY CLIP
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.35, size * 0.3, 0, 0, Math.PI * 2);
    ctx.clip();

    ctx.drawImage(
      birdImg,
      anim.frame * frameWidth,
      0,
      frameWidth,
      frameHeight,
      -size / 2,
      -size / 2,
      size,
      size
    );

    ctx.restore();

    // ================= ANIMATION UPDATE =================

    anim.wingPhase += 0.25;

    anim.frameTimer = (anim.frameTimer || 0) + 1;
    anim.frameSpeed = anim.frameSpeed || 6;

    if (anim.frameTimer >= anim.frameSpeed) {
      anim.frame = (anim.frame + 1) % 4;
      anim.frameTimer = 0;
    }
  }
}