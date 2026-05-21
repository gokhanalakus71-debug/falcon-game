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
      pos.x,
      pos.y
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

  renderBackground();

  // render ECS birds
  renderBirds();
}

// ================= EXPORT =================

window.renderWorld = renderWorld;