window.addEventListener("load", () => {

  console.log("🚀 Registering systems");

  registerSystem(birdMovementSystem);
  
  console.log("✅ Falcon Engine Started");

  renderUI();
});