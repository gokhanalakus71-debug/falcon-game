// =============================
// ECS CORE (CLEAN VERSION)
// =============================

const ECS = {
  nextEntityId: 1,
  entities: new Map(),
  components: {}
};

const COMPONENTS = {
  POSITION: "position",
  VELOCITY: "velocity",
  STATS: "stats",
  TRAITS: "traits",
  BIRD: "bird",
  CONDITION: "condition",
  ANIMATION: "animation"
};

// =============================
// CREATE ENTITY
// =============================

function createEntity() {
  const id = ECS.nextEntityId++;
  ECS.entities.set(id, true);
  return id;
}

// =============================
// COMPONENTS
// =============================

function addComponent(id, name, data) {
  if (!ECS.components[name]) {
    ECS.components[name] = new Map();
  }
  ECS.components[name].set(id, data);
}

function getComponent(id, name) {
  return ECS.components[name]?.get(id);
}

function removeComponent(id, name) {
  ECS.components[name]?.delete(id);
}

// =============================
// QUERY SYSTEM
// =============================

function getEntitiesWith(...components) {
  const result = [];

  for (const id of ECS.entities.keys()) {
    let ok = true;

    for (const c of components) {
      if (!ECS.components[c]?.has(id)) {
        ok = false;
        break;
      }
    }

    if (ok) result.push(id);
  }

  return result;
}

// =============================
// EXPORTS
// =============================

window.ECS = ECS;
window.COMPONENTS = COMPONENTS;
window.createEntity = createEntity;
window.addComponent = addComponent;
window.getComponent = getComponent;
window.removeComponent = removeComponent;
window.getEntitiesWith = getEntitiesWith;