function loop(){
  if(running) return;
  running = true;

  updateWorld().finally(() => {
    running = false;
    setTimeout(() => {
  requestAnimationFrame(loop);
}, 1000 / 30);
  });
}

loop();

async function updateWorld(){

  console.log("updateWorld running");

  // 1. AI BACKGROUND SYSTEM

  let bgKey = "sunny";

  if(game.weather.type === "Storm") bgKey = "storm";
  if(game.weather.type === "Foggy") bgKey = "foggy";
  if(game.weather.type === "Rainy") bgKey = "sunny";

  let bg = await getAsset("background", bgKey);

  if(bg && bg.complete){
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  }

  // 2. FOG OVERLAY (optional but consistent)
  if(game.weather.type === "Foggy"){
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // 3. RAIN EFFECT
  if(game.weather.type === "Rainy"){
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

for(let i=0;i<25;i++){

  ctx.beginPath();

  const x =
    (Date.now()*0.02 + i*80)
    % canvas.width;

  const y =
    (i * 50 + Date.now()*0.01)
    % canvas.height;

  ctx.arc(x, y, 2, 0, Math.PI*2);

  ctx.fillStyle =
    "rgba(255,215,0,0.15)";

  ctx.fill();
}

  // 4. UPDATE + DRAW BIRDS

// STEP 3 FIX: prevent crash if sprite not ready
if (!birdImg || !birdImg.complete || !birdImg.naturalWidth) {
  console.log("Bird sprite not ready yet, skipping bird rendering");
} else {

  for (const b of game.birds) {

  // SAFETY DEFAULTS
  if(b.x === undefined) b.x = Math.random() * canvas.width;
  if(b.y === undefined) b.y = Math.random() * canvas.height;
  if(b.vx === undefined) b.vx = 1;
  if(b.vy === undefined) b.vy = 1;
  if(b.agility === undefined) b.agility = 1;

  let speedModifier = 1;

  if(game.weather.type === "Windy") speedModifier = 1.5;
  if(game.weather.type === "Rainy") speedModifier = 0.7;
  if(game.weather.type === "Storm") speedModifier = 0.5;
  if(game.weather.type === "Foggy") speedModifier = 0.8;

// ================= REAL FLYING MOTION =================

b.wingPhase += 0.25;

// ================= SPRITE FRAME ANIMATION =================

b.frameTimer++;

if(b.frameTimer >= b.frameSpeed){
  b.frame = (b.frame + 1) % 4; // 4-frame sheet
  b.frameTimer = 0;
}

const flap =
  Math.sin(b.wingPhase);

const bob =
  Math.sin(
    Date.now() * 0.002 +
    b.bobOffset
  ) * 12;

// forward flight
b.x += b.vx * speedModifier;

// floating motion
b.y +=
  b.vy * 0.3 +
  flap * 1.2;

// smooth hovering
b.y += bob * 0.03;

// random steering
if(Math.random() < 0.01){

  b.vy =
    (Math.random()-0.5) * 3;
}

// ================= DRAW BIRD =================

ctx.save();
ctx.translate(b.x, b.y);

// flip direction
if (b.vx < 0) {
  ctx.scale(-1, 1);
}

// frame setup
const frameWidth = birdImg.width / 4;
const frameHeight = birdImg.height;

// size
const size = 90 + Math.sin(b.wingPhase) * 10;

// 🧠 HARD CLIP (removes square feel)
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

// wrap around screen
if(b.x > canvas.width + 100){
  b.x = -100;
}

if(b.x < -100){
  b.x = canvas.width + 100;
}

if(b.y > canvas.height){
  b.y = 50;
}

if(b.y < 0){
  b.y = canvas.height - 50;
    } // end for (game.birds)
  }   // end if (birdImg ready)
}     // end updateWorld
}