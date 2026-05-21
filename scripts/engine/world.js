// ================= WORLD ENGINE =================

const canvas = document.getElementById("world");
const ctx = canvas?.getContext?.("2d");

if (!canvas) {
  console.error("Canvas #world missing");
}

if (!ctx) {
  console.error("Canvas context failed");
}

window.worldCanvas = canvas;
window.worldCtx = ctx;

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

// ================= MAIN RENDER =================

function renderWorld() {

  if (!ctx) return;

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  renderBackground();

  // expose ctx to render systems
  window.__ctx = ctx;
}

window.renderWorld = renderWorld;