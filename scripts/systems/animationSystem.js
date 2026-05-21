// ================= ANIMATION SYSTEM =================

function animationSystem(dt) {

  const entities = getEntitiesWith("sprite");

  for (const e of entities) {

    const sprite = getComponent(e, "sprite");

    if (!sprite) continue;

    sprite.wingPhase += dt * 10;

    sprite.frameTimer += dt * 60;

    if (sprite.frameTimer >= sprite.frameSpeed) {

      sprite.frame =
        (sprite.frame + 1) % sprite.frameCount;

      sprite.frameTimer = 0;
    }
  }
}