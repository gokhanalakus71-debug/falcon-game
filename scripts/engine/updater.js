// ================= SYSTEM REGISTRY =================

window.SYSTEMS = window.SYSTEMS || [];

// ================= DEBUG =================

function logSystemList() {
  console.log("🧩 SYSTEMS ACTIVE:", window.SYSTEMS.length);
}

// ================= REGISTER SYSTEM =================

function registerSystem(system) {

  if (typeof system !== "function") {
    console.warn("⚠️ Tried to register invalid system:", system);
    return;
  }

  window.SYSTEMS.push(system);

  console.log(
    "🧩 System registered. Total:",
    window.SYSTEMS.length
  );
}

// ================= UPDATE SYSTEMS =================

function updateSystems(dt) {

  if (!window.SYSTEMS || window.SYSTEMS.length === 0) {
    return;
  }

  for (const sys of window.SYSTEMS) {

    if (typeof sys !== "function") continue;

    try {
      sys(dt);
    } catch (err) {
      console.error("❌ System error in:", sys.name, err);
    }
  }
}

// ================= DEV HOOK =================

// expose for debugging in console
window.logSystemList = logSystemList;

// ================= EXPORT =================

window.registerSystem = registerSystem;
window.updateSystems = updateSystems;