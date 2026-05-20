// ================= BIRD MOVEMENT SYSTEM =================

function birdMovementSystem(dt) {

  const entities = getEntitiesWith(
    "position",
    "velocity",
    "animation"
  );

  for (const e of entities) {

    const pos = getComponent(e, "position");
    const vel = getComponent(e, "velocity");
    const anim = getComponent(e, "animation");

    if (!pos || !vel || !anim) continue;

    // ================= MOVEMENT =================

    pos.x += vel.vx * 60 * dt;
    pos.y += vel.vy * 60 * dt;

    // ================= ANIMATION =================

    anim.wingPhase = (anim.wingPhase || 0) + 0.25;

    anim.frameTimer++;

    if (anim.frameTimer >= anim.frameSpeed) {
      anim.frame = (anim.frame + 1) % 4;
      anim.frameTimer = 0;
    }

    // ================= SIMPLE AI BEHAVIOR =================

    if (Math.random() < 0.01) {
      vel.vy = (Math.random() - 0.5) * 3;
    }

    // ================= SCREEN WRAP =================

    if (pos.x > window.innerWidth + 100) pos.x = -100;
    if (pos.x < -100) pos.x = window.innerWidth + 100;

    if (pos.y > window.innerHeight) pos.y = 50;
    if (pos.y < 0) pos.y = window.innerHeight - 50;
  }
}