function renderUI() {

  const app = document.getElementById("ui");

  if (!app) return;

  app.innerHTML =
    scene === "login" ? renderLogin() :
    scene === "home" ? renderHome() :
    scene === "birds" ? renderBirds() :
    scene === "training" ? renderTraining() :
    scene === "feeding" ? renderFeeding() :
    scene === "breeding" ? renderBreeding() :
    scene === "competition" ? renderCompetition() :
    renderHome();
}

window.renderUI = renderUI;