// ================= GLOBAL SAFE BOOTSTRAP =================

window.game = window.game || {
  birdEntities: [],
  selected: 0,
  weather: { type: "Sunny", temperature: 25 }
};

window.scene = window.scene || "login";

// SAFE ECS fallback
window.ECS = window.ECS || {};

// SAFE UI fallback
window.renderUI = window.renderUI || function () {
  const ui = document.getElementById("ui");
  if (ui) ui.innerHTML = "<h2>Loading UI...</h2>";
};

// SAFE ASSET fallback
window.getAsset = window.getAsset || function () {
  return null;
};

// SAFE ERROR WRAPPER
window.safeCall = (fn, name) => {
  try {
    return fn();
  } catch (e) {
    console.error("❌ Engine crash in:", name, e);
  }
};