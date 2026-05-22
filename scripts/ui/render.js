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

      // ================= LOGIN =================

      case "login":
        html =
          typeof renderLogin === "function"
            ? renderLogin()
            : "<h1>Login missing</h1>";
      break;

      // ================= HOME =================

      case "home":
        html =
          typeof renderHome === "function"
            ? renderHome()
            : "<h1>Home missing</h1>";
      break;

      // ================= BIRDS =================

      case "birds":
        html =
          typeof renderBirds === "function"
            ? renderBirds()
            : "<h1>Birds missing</h1>";
      break;

      // ================= TRAINING =================

      case "training":
        html =
          typeof renderTraining === "function"
            ? renderTraining()
            : "<h1>Training missing</h1>";
      break;

      // ================= FEEDING =================

      case "feeding":
        html =
          typeof renderFeeding === "function"
            ? renderFeeding()
            : "<h1>Feeding missing</h1>";
      break;

      // ================= BREEDING =================

      case "breeding":
        html =
          typeof renderBreeding === "function"
            ? renderBreeding()
            : "<h1>Breeding missing</h1>";
      break;

      // ================= COMPETITION =================

      case "competition":
        html =
          typeof renderCompetition === "function"
            ? renderCompetition()
            : "<h1>Competition missing</h1>";
      break;

      // ================= FALLBACK =================

      default:
        html = `
          <div class="panel">
            <h2>Unknown Scene</h2>
            <p>${currentScene}</p>

            <button onclick="go('home')">
              🏠 Return Home
            </button>
          </div>
        `;
      break;
    }

    app.innerHTML = html;

  } catch (e) {

    console.error("UI CRASH RECOVERED:", e);

    app.innerHTML = `
      <div class="panel">
        <h2>UI ERROR</h2>
        <p>Check console</p>
      </div>
    `;
  }
}

// ================= EXPORT =================

window.renderUI = renderUI;