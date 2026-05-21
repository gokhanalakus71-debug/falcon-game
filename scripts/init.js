window.addEventListener("load", () => {

  console.log("🚀 Registering systems");

  registerSystem(birdMovementSystem);

  registerSystem(animationSystem);
  
  console.log("✅ Falcon Engine Started");

  renderUI();
});