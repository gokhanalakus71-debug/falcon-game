// ================= INIT SYSTEM REGISTRATION (SAFE) =================

window.addEventListener("load", () => {

  console.log("🚀 Registering systems");

  const safeRegister = (fn, name) => {
    if (typeof fn === "function") {
      registerSystem(fn);
    } else {
      console.warn(`⚠️ System missing: ${name}`);
    }
  };

  // CORE SYSTEMS
  safeRegister(birdMovementSystem, "birdMovementSystem");
  safeRegister(animationSystem, "animationSystem");
  safeRegister(weatherSystem, "weatherSystem");

  // OPTIONAL SYSTEMS (MAY NOT EXIST YET)
  safeRegister(parallaxSystem, "parallaxSystem");
  safeRegister(cameraSystem, "cameraSystem");

  console.log("✅ Falcon Engine Started");

});