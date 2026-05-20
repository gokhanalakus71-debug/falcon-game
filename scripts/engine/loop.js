let lastTime = 0;

function gameLoop(timestamp) {
  const dt = Math.min((timestamp - lastTime) / 1000, 0.033);
  lastTime = timestamp;

  // SAFE SYSTEM UPDATE
  try {
    updateSystems(dt);
  } catch (e) {
    console.error("updateSystems crash:", e);
  }

  // SAFE RENDER
  try {
    renderWorld();
  } catch (e) {
    console.error("renderWorld crash:", e);
  }

  requestAnimationFrame(gameLoop);
}

function startEngine() {
  lastTime = performance.now();
  requestAnimationFrame(gameLoop);
}

window.startEngine = startEngine;