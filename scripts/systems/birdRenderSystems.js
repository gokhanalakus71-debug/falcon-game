// ================= BIRD RENDER SYSTEM =================

function birdRenderSystem() {

  const ctx = window.worldCtx;

  if (!ctx) return;

  const sprite = window.getSprite?.("bird");

  if (!sprite || !sprite.loaded) return;

  const img = sprite.sheet;

  const entities = getEntitiesWith(
    "position",
    "velocity",
    "animation",
    "bird"
  );

  for (const e of entities) {

    const pos = getComponent(e, "position");
    const vel = getComponent(e, "velocity");
    const anim = getComponent(e, "animation");

    if (!pos || !vel || !anim) continue;

    const size = 120;

    ctx.save();

    ctx.translate(pos.x, pos.y);

    // face direction
    if (vel.vx < 0) {
      ctx.scale(-1, 1);
    }

    // wing bob
    const flap = Math.sin(anim.wingPhase || 0) * 6;

    ctx.drawImage(
      img,
      -size / 2,
      -size / 2 + flap,
      size,
      size
    );

    ctx.restore();
  }
}

// ================= REGISTER =================

window.birdRenderSystem = birdRenderSystem;