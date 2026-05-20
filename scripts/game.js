function floatText(text, color="white"){

  const el = document.createElement("div");
  el.className = "float";
  el.innerText = text;

  const x = window.innerWidth/2 + (Math.random()*100 - 50);
  const y = window.innerHeight/2 + (Math.random()*60 - 30);

  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.color = color;

  document.body.appendChild(el);
  setTimeout(()=>el.remove(), 1000);
}

let scene = "login";

let game = {
  user: null,
  birdEntities: [],
  selected: 0,

  shake: 0,

  weather: {
  type: "Sunny",
  temperature: 28
  },

  // 🎬 CUTSCENE SYSTEM
  cutscene: {
    active: false,
    step: 0,
    cancel: false
  }
};

function getSelectedBird() {

  const entity =
    game.birdEntities?.[game.selected];

  if (!entity) return null;

  return {
    entity,

    position: getComponent(entity, "position"),
    velocity: getComponent(entity, "velocity"),
    stats: getComponent(entity, "stats"),
    condition: getComponent(entity, "condition"),
    traits: getComponent(entity, "traits"),
    animation: getComponent(entity, "animation"),
    bird: getComponent(entity, "bird")
  };
}

function login(){
  const email = document.getElementById("email").value;

  if(!email){
    alert("Enter email");
    return;
  }

  game.user = { email };

const bird = createBird({
  name: "Falcon A",
  rarity: "Common",

  strength: 5,
  agility: 5,
  intelligence: 5,
  stamina: 5,
  charm: 5,

  traits: ["Fast Learner"],

  x: 100,
  y: 200,

  vx: 2 + Math.random() * 2,
  vy: (Math.random() - 0.5) * 1.5
});

game.birdEntities = [bird];

  game.selected = 0;

  go("home");
}

window.addEventListener("error", (e)=>{
  console.log("Game Error:", e.message);
});

setTimeout(() => {

const testEntity = createEntity();

addComponent(testEntity, "position", {
  x: 100,
  y: 200
});

console.log(getComponent(testEntity, "position"));

}, 500);