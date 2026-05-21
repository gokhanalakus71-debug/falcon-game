// ================= PARALLAX SYSTEM =================

window.parallax = {
  clouds: [],
  time: 0
};

function initParallax() {

  // create clouds
  for (let i = 0; i < 20; i++) {

    parallax.clouds.push({
      x: Math.random() * 5000,
      y: Math.random() * 800,
      speed: 0.1 + Math.random() * 0.3,
      size: 80 + Math.random() * 120
    });
  }
}

function parallaxSystem(dt) {

  parallax.time += dt;

  const cam = window.camera;

  if (!cam) return;

  for (const c of parallax.clouds) {
    c.x -= c.speed * 60 * dt;

    // loop clouds
    if (c.x < cam.x - 200) {
      c.x = cam.x + window.innerWidth + Math.random() * 1000;
      c.y = Math.random() * 600;
    }
  }
}