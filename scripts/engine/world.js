// ================= CANVAS SETUP =================

const canvas = document.getElementById("world");

if (!canvas) {
  throw new Error("Canvas not found");
}

const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("2D context unavailable");
}

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);


// ================= WORLD UPDATE =================

async function renderWorld(){

  if(!game || !game.weather) return;

  console.log("updateWorld running");

  // ================= BACKGROUND =================

  let bgKey = "sunny";

  if(game.weather?.type === "Storm") bgKey = "storm";
  if(game.weather?.type === "Foggy") bgKey = "foggy";
  if(game.weather?.type === "Rainy") bgKey = "sunny";

  const bg = await getAsset("background", bgKey);

  if(bg?.complete){
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  }

  // ================= WEATHER OVERLAYS =================

  if(game.weather?.type === "Foggy"){
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if(game.weather?.type === "Rainy"){

    for(let i = 0; i < 80; i++){

      ctx.beginPath();

      ctx.moveTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );

      ctx.lineTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height + 10
      );

      ctx.strokeStyle = "rgba(100,150,255,0.5)";
      ctx.stroke();
    }
  }

  // ================= PARTICLES =================

  for(let i = 0; i < 25; i++){

    ctx.beginPath();

    const x =
      (Date.now() * 0.02 + i * 80) % canvas.width;

    const y =
      (i * 50 + Date.now() * 0.01) % canvas.height;

    ctx.arc(x, y, 2, 0, Math.PI * 2);

    ctx.fillStyle = "rgba(255,215,0,0.15)";
    ctx.fill();
  }

  // ================= BIRDS =================

  if (!birdImg || !birdImg.complete || !birdImg.naturalWidth) {
    return;
  }

  for (const b of game.birds || []) {

    // ---------- SAFETY DEFAULTS ----------
    b.x ??= Math.random() * canvas.width;
    b.y ??= Math.random() * canvas.height;
    b.vx ??= 1;
    b.vy ??= 1;
    b.agility ??= 1;
    b.frame ??= 0;
    b.frameTimer ??= 0;
    b.frameSpeed ??= 6;

    // ---------- SPEED MODIFIERS ----------
    let speedModifier = 1;

    if(game.weather?.type === "Windy") speedModifier = 1.5;
    if(game.weather?.type === "Rainy") speedModifier = 0.7;
    if(game.weather?.type === "Storm") speedModifier = 0.5;
    if(game.weather?.type === "Foggy") speedModifier = 0.8;

    // ---------- ANIMATION ----------
    b.wingPhase = (b.wingPhase || 0) + 0.25;

    b.frameTimer++;

    if(b.frameTimer >= b.frameSpeed){
      b.frame = (b.frame + 1) % 4;
      b.frameTimer = 0;
    }

    const flap = Math.sin(b.wingPhase);

    const bob = Math.sin(
      Date.now() * 0.002 + (b.bobOffset || 0)
    ) * 12;

    // ---------- MOVEMENT ----------
    b.x += b.vx * speedModifier;
    b.y += b.vy * 0.3 + flap * 1.2;
    b.y += bob * 0.03;

    if(Math.random() < 0.01){
      b.vy = (Math.random() - 0.5) * 3;
    }

    // ---------- DRAW ----------
    ctx.save();
    ctx.translate(b.x, b.y);

    if(b.vx < 0){
      ctx.scale(-1, 1);
    }

    const frameWidth = birdImg.width / 4;
    const frameHeight = birdImg.height;

    const size = 90 + Math.sin(b.wingPhase) * 10;

    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.35, size * 0.3, 0, 0, Math.PI * 2);
    ctx.clip();

    ctx.drawImage(
      birdImg,
      b.frame * frameWidth,
      0,
      frameWidth,
      frameHeight,
      -size / 2,
      -size / 2,
      size,
      size
    );

    ctx.restore();

    // ---------- WRAP ----------
    if(b.x > canvas.width + 100) b.x = -100;
    if(b.x < -100) b.x = canvas.width + 100;

    if(b.y > canvas.height) b.y = 50;
    if(b.y < 0) b.y = canvas.height - 50;
  }
}