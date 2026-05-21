// ================= BIRD MOVEMENT SYSTEM (STABLE ECS VERSION) =================

function birdMovementSystem(dt) {

  const entities = getEntitiesWith("position", "velocity");

  for (const e of entities) {

    const pos = getComponent(e, "position");
    const vel = getComponent(e, "velocity");

    if (!pos || !vel) continue;

    // ================= MOVEMENT =================

    pos.x += (vel.vx || 0) * 60 * dt;
    pos.y += (vel.vy || 0) * 60 * dt;

    // ================= SIMPLE AI DRIFT =================

    if (Math.random() < 0.01) {
      vel.vx += (Math.random() - 0.5) * 0.5;
      vel.vy += (Math.random() - 0.5) * 0.5;
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

window.birdMovementSystem = birdMovementSystem;