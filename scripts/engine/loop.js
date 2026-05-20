let lastTime = 0;
let accumulator = 0;

const FIXED_TIMESTEP = 1000 / 60; // 60 FPS
const MAX_FRAME_TIME = 250;

let running = false;

// =====================
// MAIN LOOP
// =====================

function gameLoop(timestamp = 0) {

  if (!running) return;

  // delta time
  let delta = timestamp - lastTime;

  // prevent giant lag spikes
  if (delta > MAX_FRAME_TIME) {
    delta = MAX_FRAME_TIME;
  }

  lastTime = timestamp;

  accumulator += delta;

  // =====================
  // FIXED UPDATE
  // =====================

  while (accumulator >= FIXED_TIMESTEP) {

    update(FIXED_TIMESTEP / 1000);

    accumulator -= FIXED_TIMESTEP;
  }

  // =====================
  // RENDER
  // =====================

  renderWorld();
  renderUI();

  requestAnimationFrame(gameLoop);
}

// =====================
// START ENGINE
// =====================

function startEngine() {

  if (running) return;

  running = true;

  lastTime = performance.now();

  requestAnimationFrame(gameLoop);
}

// =====================
// STOP ENGINE
// =====================

function stopEngine() {
  running = false;
}