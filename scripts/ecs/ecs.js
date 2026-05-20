// =====================
// ECS STORAGE
// =====================

const ECS = {
  nextEntityId: 1,

  entities: new Set(),

  components: {
    position: new Map(),
    velocity: new Map(),
    stats: new Map(),
    condition: new Map(),
    traits: new Map(),
    animation: new Map(),
    bird: new Map()
  }
};

// =====================
// ENTITY CREATION
// =====================

function createEntity() {

  const id = ECS.nextEntityId++;

  ECS.entities.add(id);

  return id;
}

// =====================
// REMOVE ENTITY
// =====================

function removeEntity(id) {

  ECS.entities.delete(id);

  Object.values(ECS.components).forEach(component => {
    component.delete(id);
  });
}

// =====================
// ADD COMPONENT
// =====================

function addComponent(entity, type, data) {

  if (!ECS.components[type]) {
    console.warn("Unknown component:", type);
    return;
  }

  ECS.components[type].set(entity, data);
}

// =====================
// GET COMPONENT
// =====================

function getComponent(entity, type) {

  return ECS.components[type]?.get(entity);
}

// =====================
// GET ENTITIES WITH COMPONENTS
// =====================

function getEntitiesWith(...componentTypes) {

  return [...ECS.entities].filter(entity => {

    return componentTypes.every(type =>
      ECS.components[type]?.has(entity)
    );
  });
}