function birdMovementSystem(dt) {
  const entities = getEntitiesWith("position", "velocity", "sprite");

  for (const e of entities) {

    const pos = getComponent(e, "position");
    const vel = getComponent(e, "velocity");
    const sprite = getComponent(e, "sprite");

    if (!pos || !vel || !anim) continue;

    pos.x += vel.vx * 60 * dt;
    pos.y += vel.vy * 60 * dt;
    

    // simple AI drift
    if (Math.random() < 0.01) {
      vel.vy = (Math.random() - 0.5) * 3;
    }

    // ================= WORLD BOUNDS =================

    const WORLD_WIDTH = 5000;
    const WORLD_HEIGHT = 3000;

    if (pos.x < 0) {
      pos.x = 0;
      vel.vx *= -1;
    }

    if (pos.x > WORLD_WIDTH) {
      pos.x = WORLD_WIDTH;
      vel.vx *= -1;
    }

    if (pos.y < 0) {
      pos.y = 0;
      vel.vy *= -1;
    }

    if (pos.y > WORLD_HEIGHT) {
      pos.y = WORLD_HEIGHT;
      vel.vy *= -1;
    }
  }
}