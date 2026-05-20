// =============================
// COMPONENT REGISTRY
// =============================

const COMPONENTS = {
  POSITION: "position",
  VELOCITY: "velocity",
  SPRITE: "sprite",
  STATS: "stats",
  AI: "ai",
  ANIMATION: "animation",
  BIRD: "bird",
  TRAITS: "traits",
  CONDITION: "condition"
};

// =============================
// ECS CORE STORAGE
// =============================

const ECS = {
  nextEntityId: 1,
  entities: new Map(),
  components: {}
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
// REMOVE ENTITY
// =============================

function removeEntity(entityId) {
  if (!ECS.entities.has(entityId)) return;

  ECS.entities.delete(entityId);

  for (const componentName in ECS.components) {
    ECS.components[componentName].delete(entityId);
  }
}

// =============================
// ADD COMPONENT
// =============================

function addComponent(entityId, componentName, data) {
  if (!ECS.entities.has(entityId)) {
    console.warn("Entity does not exist:", entityId);
    return;
  }

  if (!ECS.components[componentName]) {
    ECS.components[componentName] = new Map();
  }

  ECS.components[componentName].set(entityId, data);
}

// =============================
// GET COMPONENT
// =============================

function getComponent(entityId, componentName) {
  return ECS.components[componentName]?.get(entityId);
}

// =============================
// REMOVE COMPONENT
// =============================

function removeComponent(entityId, componentName) {
  ECS.components[componentName]?.delete(entityId);
}

// =============================
// QUERY SYSTEM
// =============================

function getEntitiesWith(...componentNames) {
  const results = [];

  for (const entityId of ECS.entities.keys()) {
    let valid = true;

    for (const name of componentNames) {
      if (
        !ECS.components[name] ||
        !ECS.components[name].has(entityId)
      ) {
        valid = false;
        break;
      }
    }

    if (valid) results.push(entityId);
  }

  return results;
}

// =============================
// GLOBAL EXPORTS
// =============================

window.ECS = ECS;
window.COMPONENTS = COMPONENTS;

window.createEntity = createEntity;
window.removeEntity = removeEntity;
window.addComponent = addComponent;
window.getComponent = getComponent;
window.removeComponent = removeComponent;
window.getEntitiesWith = getEntitiesWith;