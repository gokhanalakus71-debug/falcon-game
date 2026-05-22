function cameraSystem(dt) {

  const camera = window.camera;
  const game = window.game;

  const entity =
    game.birdEntities?.[game.selected];

  if (!entity) return;

  const pos =
    getComponent(entity, "position");

  if (!pos) return;

  // FORCE CAMERA ALWAYS CENTERED (DEBUG MODE)

  camera.x =
    pos.x - window.innerWidth / 2;

  camera.y =
    pos.y - window.innerHeight / 2;
}