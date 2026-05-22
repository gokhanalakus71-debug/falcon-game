// ================= CAMERA SYSTEM =================

window.camera = window.camera || {
  x: 0,
  y: 0,
  zoom: 1,
  targetX: 0,
  targetY: 0,
  initialized: false
};

function cameraSystem(dt) {

  const game = window.game;
  const camera = window.camera;

  if (!game) return;

  const selected =
    game.birdEntities?.[game.selected];

  if (!selected) return;

  const pos =
    getComponent(selected, "position");

  if (!pos) return;

  // ================= FIRST FRAME SNAP =================

  if (!camera.initialized) {

    camera.x =
      pos.x - window.innerWidth / 2;

    camera.y =
      pos.y - window.innerHeight / 2;

    camera.initialized = true;
  }

  // ================= TARGET =================

  camera.targetX =
    pos.x - window.innerWidth / 2;

  camera.targetY =
    pos.y - window.innerHeight / 2;

  // ================= SMOOTH FOLLOW =================

  const speed = 4;

  camera.x +=
    (camera.targetX - camera.x)
    * speed
    * dt;

  camera.y +=
    (camera.targetY - camera.y)
    * speed
    * dt;
}

// ================= EXPORT =================

window.cameraSystem =
  cameraSystem;