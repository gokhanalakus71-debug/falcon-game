// ================= UI RENDERER =================

function renderUI() {
  const app = document.getElementById("ui");

  // HARD SAFETY GUARD (prevents crash if DOM not ready)
  if (!app) return;

  // HARD SAFETY: ensure scene exists
  const currentScene = window.scene || "login";

  // fallback render function safety
  const safeCall = (fn) => (typeof fn === "function" ? fn() : "");

  let html = "";

  switch (currentScene) {

    case "login":
      html = safeCall(window.renderLogin);
      break;

    case "home":
      html = safeCall(window.renderHome);
      break;

    case "birds":
      html = safeCall(window.renderBirds);
      break;

    case "training":
      html = safeCall(window.renderTraining);
      break;

    case "feeding":
      html = safeCall(window.renderFeeding);
      break;

    case "breeding":
      html = safeCall(window.renderBreeding);
      break;

    case "competition":
      html = safeCall(window.renderCompetition);
      break;

    default:
      html = safeCall(window.renderHome);
      break;
  }

  app.innerHTML = html;
}

// ================= GLOBAL EXPORT =================

window.renderUI = renderUI;