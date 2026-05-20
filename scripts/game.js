// ================= FLOAT TEXT =================

function floatText(text, color = "white") {
  const el = document.createElement("div");
  el.className = "float";
  el.innerText = text;

  const x = window.innerWidth / 2 + (Math.random() * 100 - 50);
  const y = window.innerHeight / 2 + (Math.random() * 60 - 30);

  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.color = color;

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

// ================= GLOBAL STATE =================

window.scene = window.scene || "login";

window.game = window.game || {
  user: null,
  birdEntities: [],
  selected: 0,
  shake: 0,

  weather: {
    type: "Sunny",
    temperature: 28
  },

  cutscene: {
    active: false,
    step: 0,
    cancel: false
  }
};

// ================= LOGIN =================

function login() {
  const email = document.getElementById("email")?.value;

  if (!email) {
    alert("Enter email");
    return;
  }

  window.game.user = { email };

  // ================= CREATE FIRST ECS BIRD =================
  const birdEntity = createBird({
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

  window.game.birdEntities = [birdEntity];
  window.game.selected = 0;

  // ================= DEBUG =================
  console.log("🐦 Created bird entity:", birdEntity);
  console.log("🐦 ECS entities:", window.ECS?.entities);
  console.log("🐦 Total ECS count:", window.ECS?.entities?.size);

  if (typeof go === "function") {
    go("home");
  }
}

// ================= SELECTED BIRD =================

function getSelectedBird() {
  const entity = window.game?.birdEntities?.[window.game.selected];
  if (!entity) return null;

  return getBirdFromEntity(entity);
}

// ================= ECS → BIRD CONVERTER =================

function getBirdFromEntity(entity) {
  if (!entity) return null;

  const bird = getComponent(entity, "bird");
  const stats = getComponent(entity, "stats");
  const traits = getComponent(entity, "traits");
  const condition = getComponent(entity, "condition");
  const position = getComponent(entity, "position");

  return {
    entity,

    name: bird?.name ?? "Unknown",
    rarity: bird?.rarity ?? "Common",

    x: position?.x ?? 0,
    y: position?.y ?? 0,

    strength: stats?.strength ?? 5,
    agility: stats?.agility ?? 5,
    intelligence: stats?.intelligence ?? 5,
    stamina: stats?.stamina ?? 5,
    charm: stats?.charm ?? 5,

    traits: traits?.list ?? [],
    condition: condition?.value ?? 100
  };
}

// ================= GLOBAL ERROR HANDLER =================

window.addEventListener("error", (e) => {
  console.log("Game Error:", e.message);
});

// ================= EXPORTS =================

window.floatText = floatText;
window.login = login;
window.getSelectedBird = getSelectedBird;
window.getBirdFromEntity = getBirdFromEntity;