// =============================
// COMPONENT REGISTRY (STEP 3 FIX)
// =============================

const COMPONENTS = {

  POSITION: "position",
  VELOCITY: "velocity",
  SPRITE: "sprite",
  STATS: "stats",
  AI: "ai"

};

// =============================
// ECS ENTITY STORAGE
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

  ECS.entities.delete(entityId);

  for (const componentName in ECS.components) {

    ECS.components[componentName].delete(entityId);
  }
}

// =============================
// ADD COMPONENT
// =============================

function addComponent(entityId, componentName, data) {

  // ensure component bucket exists
  if (!ECS.components[componentName]) {
    ECS.components[componentName] = new Map();
  }

  // prevent overwriting undefined entities
  if (!ECS.entities.has(entityId)) {
    console.warn("Trying to add component to missing entity:", entityId);
    return;
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
// GET ENTITIES WITH COMPONENTS
// =============================

function getEntitiesWith(...componentNames) {

  const results = [];

  for (const entityId of ECS.entities.keys()) {

    let valid = true;

    for (const componentName of componentNames) {

      if (
        !ECS.components[componentName] ||
        !ECS.components[componentName].has(entityId)
      ) {
        valid = false;
        break;
      }
    }

    if (valid) {
      results.push(entityId);
    }
  }

  return results;
}

// =============================
// ECS ENTITY STORAGE
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
// GET ENTITIES WITH COMPONENTS
// =============================

function getEntitiesWith(...componentNames) {

  const results = [];

  for (const entityId of ECS.entities.keys()) {

    let valid = true;

    for (const componentName of componentNames) {

      if (
        !ECS.components[componentName] ||
        !ECS.components[componentName].has(entityId)
      ) {
        valid = false;
        break;
      }
    }

    if (valid) {
      results.push(entityId);
    }
  }

  return results;
}

// =============================
// GLOBAL EXPORT (IMPORTANT)
// =============================

window.ECS = ECS;
window.COMPONENTS = COMPONENTS;

// =============================
// GLOBAL EXPORTS (FIX FOR BROWSER)
// =============================

window.ECS = ECS;
window.COMPONENTS = COMPONENTS;

window.createEntity = createEntity;
window.removeEntity = removeEntity;
window.addComponent = addComponent;
window.getComponent = getComponent;
window.removeComponent = removeComponent;
window.getEntitiesWith = getEntitiesWith;