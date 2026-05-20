window.scene = "login";

window.game = {
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

// GLOBAL SAFE FLAGS
window.__GAME_READY__ = true;