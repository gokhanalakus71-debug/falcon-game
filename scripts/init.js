window.addEventListener("load", () => {

  console.log("🚀 INIT START");

  try {

    if (typeof registerSystem === "function") {

      if (typeof birdMovementSystem === "function")
        registerSystem(birdMovementSystem);

      if (typeof birdRenderSystem === "function")
        registerSystem(birdRenderSystem);

      if (typeof parallaxSystem === "function")
        registerSystem(parallaxSystem);

      console.log("✅ SYSTEMS REGISTERED");
    }

    if (typeof renderUI === "function") {
      renderUI();
      console.log("✅ UI RENDERED");
    }

    if (typeof startEngine === "function") {
      startEngine();
      console.log("🚀 ENGINE STARTED");
    }

  } catch (e) {
    console.error("❌ BOOT FAILURE:", e);
  }
});