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

    // ================= SAFE DEFAULTS =================

    vel.vx ??= 0;
    vel.vy ??= 0;

    anim.frame ??= 0;
    anim.frameTimer ??= 0;
    anim.frameSpeed ??= 6;
    anim.wingPhase ??= 0;

    // ================= MOVEMENT =================

    pos.x += vel.vx * dt * 60;
    pos.y += vel.vy * dt * 60;

    // ================= ANIMATION =================

    anim.wingPhase += 0.25;

    anim.frameTimer++;

    if (anim.frameTimer >= anim.frameSpeed) {
      anim.frame = (anim.frame + 1) % 4;
      anim.frameTimer = 0;
    }

    // ================= SIMPLE FLIGHT AI =================

    if (Math.random() < 0.01) {
      vel.vy = (Math.random() - 0.5) * 3;
    }

    // ================= SCREEN WRAP =================

    const w = window.innerWidth;
    const h = window.innerHeight;

    if (pos.x > w + 100) pos.x = -100;
    if (pos.x < -100) pos.x = w + 100;

    if (pos.y > h + 100) pos.y = -100;
    if (pos.y < -100) pos.y = h + 100;
  }
}