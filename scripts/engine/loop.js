let lastTime = 0;

function gameLoop(time) {
  const dt = Math.min(0.033, (time - lastTime) / 1000);
  lastTime = time;

  // =====================
  // UPDATE ECS SYSTEMS
  // =====================

  if (typeof updateSystems === "function") {
    updateSystems(dt);
  }

  // =====================
  // RENDER WORLD
  // =====================

  if (typeof renderWorld === "function") {
    renderWorld();
  }

  requestAnimationFrame(gameLoop);
}

function startEngine() {
  requestAnimationFrame(gameLoop);
}