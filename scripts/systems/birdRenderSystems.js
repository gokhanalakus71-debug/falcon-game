// ================= BIRD RENDER SYSTEM (NO IMAGE MODE) =================

function birdRenderSystem(ctx) {

  const entities = getEntitiesWith("position", "animation", "bird");

  for (const e of entities) {

    const pos = getComponent(e, "position");
    const anim = getComponent(e, "animation");
    const bird = getComponent(e, "bird");
    const vel = getComponent(e, "velocity");

    if (!pos || !anim || !bird) continue;

    // ================= SAFE DEFAULTS =================
    anim.wingPhase = anim.wingPhase || 0;

    const size = 90 + Math.sin(anim.wingPhase) * 10;

    ctx.save();
    ctx.translate(pos.x, pos.y);

    // ================= FLIP =================
    if (vel?.vx < 0) {
      ctx.scale(-1, 1);
    }

    // ================= BODY =================
    ctx.fillStyle = "#60a5fa";
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.35, size * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();

    // ================= WINGS =================
    const wing = Math.sin(anim.wingPhase * 2) * 6;

    ctx.fillStyle = "#3b82f6";

    ctx.beginPath();
    ctx.ellipse(-size * 0.25, wing, size * 0.25, size * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(size * 0.25, -wing, size * 0.25, size * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();

    // ================= EYE =================
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(5, -3, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(5.5, -3, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // ================= NAME =================
    ctx.fillStyle = "white";
    ctx.font = "12px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(bird.name || "Bird", 0, -22);

    ctx.restore();

    // ================= ANIMATION UPDATE =================
    anim.wingPhase += 0.15;
  }
}