window.addEventListener("load", () => {

  registerSystem(birdMovementSystem);

  registerSystem(birdRenderSystem);

  if (typeof renderUI === "function") {
    renderUI();
  }

  if (typeof startEngine === "function") {
    startEngine();
  }

  console.log("✅ Falcon Engine Started");
});