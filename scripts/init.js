window.addEventListener("load", () => {

  console.log("🚀 Registering systems");

  registerSystem(birdMovementSystem);
  registerSystem(birdRenderSystem);

  console.log("✅ Falcon Engine Started");

  renderUI();
});