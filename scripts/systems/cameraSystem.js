// ================= CAMERA SYSTEM =================

window.camera = {
  x: 0,
  y: 0,
  zoom: 1,
  targetX: 0,
  targetY: 0
};

function cameraSystem(dt) {

  if (!window.game) return;

  const selected =
    game.birdEntities?.[game.selected];

  if (!selected) return;

  const pos =
    getComponent(selected, "position");

  if (!pos) return;

  // smooth follow
  camera.targetX =
    pos.x - window.innerWidth / 2;

  camera.targetY =
    pos.y - window.innerHeight / 2;

  // lerp
  camera.x +=
    (camera.targetX - camera.x) * 4 * dt;

  camera.y +=
    (camera.targetY - camera.y) * 4 * dt;
}