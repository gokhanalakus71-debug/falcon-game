// ================= SPRITE BIRD RENDER SYSTEM =================

function birdRenderSystem(ctx) {

  const sprite = getSprite("bird");

  const entities = getEntitiesWith("position", "animation", "bird");

  for (const e of entities) {

    const pos = getComponent(e, "position");
    const anim = getComponent(e, "animation");
    const bird = getComponent(e, "bird");
    const vel = getComponent(e, "velocity");

    if (!pos || !anim || !bird) continue;

    // ================= FALLBACK MODE =================
    if (!sprite?.loaded) {

      ctx.fillStyle = "#60a5fa";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.font = "10px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(bird.name, pos.x, pos.y - 25);

      continue;
    }

    // ================= SPRITE MODE =================

    const frameWidth = sprite.frameWidth;
    const frameHeight = sprite.frameHeight;

    const frame = Math.floor(anim.frame || 0) % 4;

    const size = 90 + Math.sin(anim.wingPhase || 0) * 10;

    ctx.save();
    ctx.translate(pos.x, pos.y);

    // flip
    if (vel?.vx < 0) ctx.scale(-1, 1);

    ctx.drawImage(
      sprite.sheet,
      frame * frameWidth,
      0,
      frameWidth,
      frameHeight,
      -size / 2,
      -size / 2,
      size,
      size
    );

    ctx.restore();

    // ================= ANIMATION =================
    anim.wingPhase += 0.15;

    anim.frameTimer = (anim.frameTimer || 0) + 1;
    anim.frameSpeed = anim.frameSpeed || 6;

    if (anim.frameTimer >= anim.frameSpeed) {
      anim.frame = (anim.frame || 0) + 1;
      anim.frameTimer = 0;
    }
  }
}