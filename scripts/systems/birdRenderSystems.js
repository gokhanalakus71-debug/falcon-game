// ================= BIRD RENDER SYSTEM =================

function birdRenderSystem(ctx) {

  const entities = getEntitiesWith("position", "animation", "bird");

  for (const e of entities) {

    const pos = getComponent(e, "position");
    const anim = getComponent(e, "animation");
    const bird = getComponent(e, "bird");

    if (!pos || !anim || !birdImg) continue;

    const frameWidth = birdImg.width / 4;
    const frameHeight = birdImg.height;

    const size = 90 + Math.sin(anim.wingPhase || 0) * 10;

    ctx.save();
    ctx.translate(pos.x, pos.y);

    // flip if moving left
    const vel = getComponent(e, "velocity");
    if (vel?.vx < 0) {
      ctx.scale(-1, 1);
    }

    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.35, size * 0.3, 0, 0, Math.PI * 2);
    ctx.clip();

    ctx.drawImage(
      birdImg,
      (anim.frame || 0) * frameWidth,
      0,
      frameWidth,
      frameHeight,
      -size / 2,
      -size / 2,
      size,
      size
    );

    ctx.restore();
  }
}