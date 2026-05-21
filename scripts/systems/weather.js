// ================= WEATHER SYSTEM =================

// ensure game exists
window.game = window.game || {};

window.game.weather = window.game.weather || {
  type: "Sunny",
  temperature: 20
};

const weatherTypes = ["Sunny", "Windy", "Rainy", "Storm", "Foggy"];

// prevent multiple intervals if file reloads
if (!window.__weatherIntervalStarted) {
  window.__weatherIntervalStarted = true;

  setInterval(() => {
    if (!window.game?.weather) return;

    const random =
      weatherTypes[Math.floor(Math.random() * weatherTypes.length)];

    window.game.weather.type = random;
    window.game.weather.temperature = 20 + Math.floor(Math.random() * 15);

    console.log("🌦 Weather changed:", random);
  }, 30000);
}

// ================= ECS COMPATIBILITY WRAPPER =================
// (IMPORTANT: prevents init.js crash)

function weatherSystem(dt) {
  // currently handled by interval system
  // reserved for future ECS-based weather simulation
}

// export safely
window.weatherSystem = weatherSystem;