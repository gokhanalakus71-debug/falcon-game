window.addEventListener("load", () => {

  console.log("🚀 Registering systems");

  registerSystem(cameraSystem);

  registerSystem(parallaxSystem);
  
  registerSystem(birdMovementSystem);

  registerSystem(animationSystem);
  
  console.log("✅ Falcon Engine Started");

  renderUI();
});