// ================= ENGINE LOOP =================

let lastTime = 0;

// ================= MAIN LOOP =================

function gameLoop(timestamp) {
  const dt = Math.min((timestamp - lastTime) / 1000, 0.033);
  lastTime = timestamp;

  updateSystems(dt);

  renderWorld();

  requestAnimationFrame(gameLoop);
}

// ================= START ENGINE =================

function startEngine() {
  lastTime = performance.now();
  requestAnimationFrame(gameLoop);
}

// ================= GLOBAL EXPORT =================

window.startEngine = startEngine;
window.gameLoop = gameLoop;