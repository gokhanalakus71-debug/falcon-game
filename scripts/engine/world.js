// ================= CANVAS SETUP =================

const canvas = document.getElementById("world");

if (!canvas) {
  throw new Error("Canvas not found");
}

const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("2D context unavailable");
}

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

  if (game.weather?.type === "Storm") bgKey = "storm";
  if (game.weather?.type === "Foggy") bgKey = "foggy";
  if (game.weather?.type === "Rainy") bgKey = "sunny";

  const bg = await getAsset("background", bgKey);

  if (bg?.complete) {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  }

  // ================= WEATHER OVERLAYS =================

  if (game.weather?.type === "Foggy") {
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (game.weather?.type === "Rainy") {
    for (let i = 0; i < 80; i++) {
      ctx.beginPath();

      ctx.moveTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );

      ctx.lineTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height + 10
      );

      ctx.strokeStyle = "rgba(100,150,255,0.5)";
      ctx.stroke();
    }
  }

  // ================= PARTICLES =================

  for (let i = 0; i < 25; i++) {

    const x = (Date.now() * 0.02 + i * 80) % canvas.width;
    const y = (i * 50 + Date.now() * 0.01) % canvas.height;

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);

    ctx.fillStyle = "rgba(255,215,0,0.15)";
    ctx.fill();
  }

  // ================= ECS BIRDS RENDER (NEW SYSTEM) =================

  if (!birdImg || !birdImg.complete || !birdImg.naturalWidth) {
    return;
  }

  const entities = getEntitiesWith("position", "animation", "bird");

  for (const e of entities) {

    const pos = getComponent(e, "position");
    const anim = getComponent(e, "animation");
    const bird = getComponent(e, "bird");

    if (!pos || !anim) continue;

    const frameWidth = birdImg.width / 4;
    const frameHeight = birdImg.height;

    const size = 90 + Math.sin(anim.wingPhase || 0) * 10;

    ctx.save();
    ctx.translate(pos.x, pos.y);

    if (pos.vx < 0) {
      ctx.scale(-1, 1);
    }

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
  }
}