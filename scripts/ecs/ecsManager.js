// ==============================
// CLEAN ECS MANAGER (STEP 3.2)
// ==============================

const ECS = {
  nextEntityId: 1,
  entities: new Set(),
  components: {}
};

// ==============================
// CREATE ENTITY
// ==============================

function createEntity() {
  const id = ECS.nextEntityId++;
  ECS.entities.add(id);
  return id;
}

// ==============================
// REMOVE ENTITY
// ==============================

function removeEntity(id) {
  ECS.entities.delete(id);

  for (const key in ECS.components) {
    ECS.components[key].delete(id);
  }
}

// ==============================
// ADD COMPONENT
// ==============================

function addComponent(entity, type, data) {
  if (!ECS.components[type]) {
    ECS.components[type] = new Map();
  }

  ECS.components[type].set(entity, data);
}

// ==============================
// GET COMPONENT
// ==============================

function getComponent(entity, type) {
  return ECS.components[type]?.get(entity);
}

// ==============================
// REMOVE COMPONENT
// ==============================

function removeComponent(entity, type) {
  ECS.components[type]?.delete(entity);
}

// ==============================
// QUERY SYSTEM
// ==============================

function getEntitiesWith(...types) {
  return [...ECS.entities].filter(id =>
    types.every(t => ECS.components[t]?.has(id))
  );
}

// ==============================
// GLOBAL EXPORTS
// ==============================

window.ECS = ECS;

window.createEntity = createEntity;
window.removeEntity = removeEntity;
window.addComponent = addComponent;
window.getComponent = getComponent;
window.removeComponent = removeComponent;
window.getEntitiesWith = getEntitiesWith;