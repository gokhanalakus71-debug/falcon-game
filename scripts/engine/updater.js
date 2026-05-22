// ================= SYSTEM REGISTRY =================

window.SYSTEMS = window.SYSTEMS || [];

// ================= REGISTER SYSTEM =================

function registerSystem(system) {
  if (typeof system !== "function") {
    console.warn("⚠️ Invalid system registered:", system);
    return;
  }

  window.SYSTEMS.push(system);

  console.log("🧩 System registered. Total:", window.SYSTEMS.length);
}

// ================= UPDATE SYSTEMS =================

function updateSystems(dt) {

  // 🔥 ENGINE HEARTBEAT (CRITICAL DEBUG)
  console.log("⚙️ ENGINE TICK | systems:", window.SYSTEMS.length);

  if (!window.SYSTEMS.length) {
    console.warn("❌ No systems registered");
    return;
  }

  for (const sys of window.SYSTEMS) {
    try {
      sys(dt);
    } catch (err) {
      console.error("❌ System crash:", err);
    }
  }
}

// ================= SYSTEM INSPECTOR =================

window.debugSystems = function () {
  console.log("===== SYSTEM DEBUG =====");
  console.log("Total systems:", window.SYSTEMS.length);
  console.table(window.SYSTEMS.map((s, i) => ({
    index: i,
    name: s.name || "anonymous"
  })));
};

// ================= EXPORT =================

window.registerSystem = registerSystem;
window.updateSystems = updateSystems;