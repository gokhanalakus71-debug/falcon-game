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
  birds: [],
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


function login(){
  const email = document.getElementById("email").value;

  if(!email){
    alert("Enter email");
    return;
  }

  game.user = { email };

  game.birds = [
{
  name:"Falcon A",

  condition:100,

  strength:5,
  agility:5,
  intelligence:5,
  stamina:5,
  charm:5,

  feedCount:0,

  traits:["Fast Learner"],

  rarity:"Common",

  x:100,
y:200,

vx:2 + Math.random()*2,
vy:(Math.random()-0.5)*1.5,

wingPhase: Math.random()*10,
bobOffset: Math.random()*100,

// 🦅 NEW ANIMATION STATE
frame: 0,
frameTimer: 0,
frameSpeed: 6
}
];

  game.selected = 0;

  go("home");
}


