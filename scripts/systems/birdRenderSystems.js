// ================= BIRD RENDER SYSTEM =================

function birdRenderSystem() {

  const ctx = window.__ctx;

  if (!ctx) return;

  const birdImg = window.birdImg;

  if (
    !birdImg ||
    !birdImg.complete ||
    birdImg.naturalWidth === 0
  ) {
    return;
  }

  const entities =
    getEntitiesWith(
      "position",
      "velocity",
      "animation",
      "bird"
    );

  for (const e of entities) {

    const pos =
      getComponent(e, "position");

    const vel =
      getComponent(e, "velocity");

    const anim =
      getComponent(e, "animation");

    if (!pos || !vel || !anim) {
      continue;
    }

    const frameCount = 4;

    const frameWidth =
      birdImg.width / frameCount;

    const frameHeight =
      birdImg.height;

    const size = 96;

    ctx.save();

    ctx.translate(pos.x, pos.y);

    // flip left/right
    if (vel.vx < 0) {
      ctx.scale(-1, 1);
    }

    ctx.drawImage(
      birdImg,

      anim.frame * frameWidth,
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

window.birdRenderSystem =
  birdRenderSystem;