// ================= UI RENDERER =================

function renderUI() {
  const app = document.getElementById("ui");

  if (!app) {
    console.error("UI root missing");
    return;
  }

  try {

    const currentScene = window.scene || "login";

    let html = "";

    switch (currentScene) {
      case "login":
        html = window.renderLogin?.() || "<h1>Login missing</h1>";
        break;

      case "home":
        html = window.renderHome?.() || "<h1>Home missing</h1>";
        break;

      case "birds":
        html = window.renderBirds?.() || "<h1>Birds missing</h1>";
        break;

      default:
        html = window.renderHome?.() || "<h1>Fallback</h1>";
    }

    app.innerHTML = html;

  } catch (e) {
    console.error("UI CRASH RECOVERED:", e);
    app.innerHTML = "<h1>UI ERROR - CHECK CONSOLE</h1>";
  }
}

window.renderUI = renderUI;

// ================= GLOBAL EXPORT =================

window.renderUI = renderUI;