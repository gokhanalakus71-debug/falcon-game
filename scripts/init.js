// ================= INIT ECS =================

window.SYSTEMS = window.SYSTEMS || [];

function registerSystem(system) {
  window.SYSTEMS.push(system);
}

function updateSystems(dt) {
  for (const sys of window.SYSTEMS) {
    sys(dt);
  }
}

// ================= REGISTER SYSTEMS =================

function initSystems() {
  registerSystem(birdMovementSystem);
  registerSystem(birdRenderSystem);
}

// ================= BOOT =================

window.addEventListener("load", () => {
  initSystems();
});