// =============================
// ECS SYSTEM INITIALIZATION
// =============================

// global system registry (single source of truth)
window.SYSTEMS = window.SYSTEMS || [];

// =============================
// REGISTER SYSTEM
// =============================

function registerSystem(system) {
  if (!window.SYSTEMS.includes(system)) {
    window.SYSTEMS.push(system);
  }
}

// =============================
// SYSTEM INITIALIZATION
// =============================

function initSystems() {
  registerSystem(birdMovementSystem);

  // optional render system (only if it exists)
  if (typeof birdRenderSystem !== "undefined") {
    registerSystem(birdRenderSystem);
  }
}

// =============================
// SYSTEM UPDATE LOOP
// =============================

function updateSystems(dt) {
  for (const sys of window.SYSTEMS) {
    sys(dt);
  }
}

// =============================
// BOOT SYSTEMS ON LOAD
// =============================

window.addEventListener("load", initSystems);