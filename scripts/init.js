// ================= INIT ECS =================

function initSystems() {
  registerSystem(birdMovementSystem);
  registerSystem(birdRenderSystem);
}

window.addEventListener("load", initSystems);

// ================= SYSTEM STORAGE =================

window.SYSTEMS = window.SYSTEMS || [];

function registerSystem(system) {
  window.SYSTEMS.push(system);
}

function updateSystems(dt) {
  window.SYSTEMS.forEach(sys => sys(dt));
}

function initSystems() {

  registerSystem(birdMovementSystem);
  registerSystem(birdRenderSystem); // ⭐ ADD THIS

}