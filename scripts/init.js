// ================= INIT ECS SYSTEMS =================

function initSystems() {
  registerSystem(birdMovementSystem);
}

// ensure ECS is ready
window.addEventListener("load", initSystems);

// ================= SYSTEM REGISTRY =================

const SYSTEMS = [
  birdMovementSystem
];

function updateSystems(dt) {
  SYSTEMS.forEach(sys => sys(dt));
}