// ================= SYSTEM REGISTRY =================

window.SYSTEMS = window.SYSTEMS || [];

// ================= REGISTER SYSTEM =================

function registerSystem(system) {
  window.SYSTEMS.push(system);
}

// ================= UPDATE SYSTEMS =================

function updateSystems(dt) {
  for (const sys of window.SYSTEMS) {
    try {
      sys(dt);
    } catch (err) {
      console.error("System error:", err);
    }
  }
}

// ================= EXPORT =================

window.registerSystem = registerSystem;
window.updateSystems = updateSystems;