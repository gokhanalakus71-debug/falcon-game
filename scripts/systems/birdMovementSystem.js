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

    // screen wrap
    if (pos.x > window.innerWidth + 100) pos.x = -100;
    if (pos.x < -100) pos.x = window.innerWidth + 100;

    if (pos.y > window.innerHeight) pos.y = 50;
    if (pos.y < 0) pos.y = window.innerHeight - 50;
  }
}