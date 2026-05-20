// ================= BIRD SPRITE RENDER SYSTEM (CLEAN ECS) =================

function birdRenderSystem() {

  const ctx = window.__ctx;
  const birdImg = window.__birdImg;

  if (!ctx || !birdImg || !birdImg.complete) return;

  const entities = getEntitiesWith("position", "animation", "bird");

  for (const e of entities) {

    const pos = getComponent(e, "position");
    const anim = getComponent(e, "animation");
    const vel = getComponent(e, "velocity");

    if (!pos || !anim) continue;

    const frameWidth = birdImg.width / 4;
    const frameHeight = birdImg.height;

    const size = 90 + Math.sin(anim.wingPhase || 0) * 10;

    ctx.save();

    ctx.translate(pos.x, pos.y);

    // flip direction
    if (vel?.vx < 0) {
      ctx.scale(-1, 1);
    }

    // BODY MASK (simple sprite feel)
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

    // ================= ANIMATION UPDATE =================

    anim.wingPhase = (anim.wingPhase || 0) + 0.25;

    anim.frameTimer = (anim.frameTimer || 0) + 1;
    anim.frameSpeed = anim.frameSpeed || 6;

    if (anim.frameTimer >= anim.frameSpeed) {
      anim.frame = ((anim.frame || 0) + 1) % 4;
      anim.frameTimer = 0;
    }
  }
}