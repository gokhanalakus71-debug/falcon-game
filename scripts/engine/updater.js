function update(dt) {
  if (typeof updateSystems === "function") {
    updateSystems(dt);
  }
}