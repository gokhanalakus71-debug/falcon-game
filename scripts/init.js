window.addEventListener("load", () => {

  console.log("🚀 Registering systems");

  if (typeof cameraSystem === "function") {
    registerSystem(cameraSystem);
  }

  if (typeof parallaxSystem === "function") {
    registerSystem(parallaxSystem);
  }

  if (typeof birdMovementSystem === "function") {
    registerSystem(birdMovementSystem);
  }

  if (typeof birdRenderSystem === "function") {
    registerSystem(birdRenderSystem);
  }

  console.log("✅ Falcon Engine Started");
});