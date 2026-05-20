const Systems = [];

// register system
function registerSystem(fn) {
  Systems.push(fn);
}

// run all systems
function runSystems(dt) {
  for (const system of Systems) {
    system(dt);
  }
}