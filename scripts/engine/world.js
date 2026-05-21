// ================= WORLD ENGINE =================

const canvas = document.getElementById("world");
const ctx = canvas?.getContext?.("2d");

// ================= SAFETY =================

if (!canvas) {
  console.error("❌ Canvas #world missing");
}

if (!ctx) {
  console.error("❌ Canvas context failed");
}

// ================= GLOBAL EXPORTS =================

window.worldCanvas = canvas || null;
window.worldCtx = ctx || null;

// ================= RESIZE =================

function resizeWorld() {

  if (!canvas) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeWorld();

window.addEventListener("resize", resizeWorld);

// ================= SKY RENDER =================

function renderSky() {

  if (!ctx) return;

  const g = ctx.createLinearGradient(
    0, 0,
    0, canvas.height
  );

  g.addColorStop(0, "#0b1020");
  g.addColorStop(0.5, "#0f172a");
  g.addColorStop(1, "#020617");

  ctx.fillStyle = g;
  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );
}

// ================= BACKGROUND =================

function renderBackground() {

  if (!ctx || !window.game) return;

  const weather =
    window.game.weather?.type || "Sunny";

  let bgKey = "sunny";

  if (weather === "Rainy") bgKey = "rainy";
  if (weather === "Storm") bgKey = "storm";
  if (weather === "Foggy") bgKey = "foggy";

  const bg =
    window.getAsset?.("background", bgKey);

  // fallback background
  ctx.fillStyle = "#0f172a";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  // optional asset background
  if (
    bg &&
    bg.complete &&
    bg.naturalWidth > 0
  ) {

    ctx.drawImage(
      bg,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  // fog overlay
  if (weather === "Foggy") {

    ctx.fillStyle =
      "rgba(255,255,255,0.05)";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }
}

// ================= PARALLAX RENDER =================

function renderParallax() {

  if (!ctx || !window.camera) return;

  const cam = window.camera;

  for (const c of parallax.clouds) {

    const x = c.x - cam.x * 0.3;
    const y = c.y - cam.y * 0.1;

    ctx.fillStyle = "rgba(255,255,255,0.08)";

    ctx.beginPath();
    ctx.ellipse(
      x,
      y,
      c.size,
      c.size * 0.6,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}


// ================= BIRD RENDERER =================

function renderBirds() {

  if (!ctx) return;

  const spriteData =
    window.getSprite?.("bird");

  if (
    !spriteData ||
    !spriteData.loaded ||
    !spriteData.sheet
  ) {
    return;
  }

  const birdSheet = spriteData.sheet;

  const entities =
    getEntitiesWith(
      "position",
      "velocity",
      "sprite",
      "bird"
    );

  for (const e of entities) {

    const pos =
      getComponent(e, "position");

    const vel =
      getComponent(e, "velocity");

    const sprite =
      getComponent(e, "sprite");

    if (!pos || !sprite) continue;

    const frameWidth =
      spriteData.frameWidth;

    const frameHeight =
      spriteData.frameHeight;

    const size =
      90 +
      Math.sin(sprite.wingPhase || 0) * 10;

    ctx.save();

    ctx.translate(
      pos.x - camera.x,
      pos.y - camera.y
    );

    // flip direction
    if (vel?.vx < 0) {
      ctx.scale(-1, 1);
    }

    ctx.drawImage(
      birdSheet,

      // source
      sprite.frame * frameWidth,
      0,
      frameWidth,
      frameHeight,

      // destination
      -size / 2,
      -size / 2,
      size,
      size
    );

    ctx.restore();
  }
}

// ================= MAIN RENDER =================

function renderWorld() {

  if (!ctx || !canvas) return;

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  renderSky();
  renderParallax();
  renderBackground();
  renderBirds();
  renderFog();

  window.__ctx = ctx;
}

// ================= DEPTH FOG =================

function renderFog() {

  if (!ctx) return;

  const g = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    200,
    canvas.width / 2,
    canvas.height / 2,
    900
  );

  g.addColorStop(0, "rgba(255,255,255,0)");
  g.addColorStop(1, "rgba(0,0,0,0.35)");

  ctx.fillStyle = g;
  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );
}


// ================= EXPORT =================

window.renderWorld = renderWorld;