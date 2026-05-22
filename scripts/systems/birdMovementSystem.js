// ================= BIRD MOVEMENT SYSTEM =================

window.WORLD = window.WORLD || {
  width: 5000,
  height: 3000
};

function birdMovementSystem(dt) {

  const entities =
    getEntitiesWith(
      "position",
      "velocity"
    );

  for (const e of entities) {

    const pos =
      getComponent(e, "position");

    const vel =
      getComponent(e, "velocity");

    if (!pos || !vel) {
      continue;
    }

    // ================= MOVEMENT =================

    pos.x += (vel.vx || 0) * 60 * dt;
    pos.y += (vel.vy || 0) * 60 * dt;

    // ================= RANDOM DRIFT AI =================

    if (Math.random() < 0.01) {

      vel.vx +=
        (Math.random() - 0.5) * 0.5;

      vel.vy +=
        (Math.random() - 0.5) * 0.5;
    }

    // ================= SPEED LIMIT =================

    const maxSpeed = 5;

    vel.vx = clamp(
      vel.vx,
      -maxSpeed,
      maxSpeed
    );

    vel.vy = clamp(
      vel.vy,
      -maxSpeed,
      maxSpeed
    );

    // ================= WORLD BOUNDS =================

    if (pos.x < 0) {

      pos.x = 0;
      vel.vx *= -1;
    }

    if (pos.x > WORLD.width) {

      pos.x = WORLD.width;
      vel.vx *= -1;
    }

    if (pos.y < 0) {

      pos.y = 0;
      vel.vy *= -1;
    }

    if (pos.y > WORLD.height) {

      pos.y = WORLD.height;
      vel.vy *= -1;
    }
  }
}

// ================= UTIL =================

function clamp(v, min, max) {
  return Math.max(
    min,
    Math.min(max, v)
  );
}

// ================= EXPORT =================

window.birdMovementSystem =
  birdMovementSystem;