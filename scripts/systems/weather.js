// ================= WEATHER SYSTEM =================

game.weather = game.weather || {
  type: "Sunny",
  temperature: 20
};

const weatherTypes = ["Sunny", "Windy", "Rainy", "Storm", "Foggy"];

// prevent multiple intervals if file reloads
if (!window.__weatherIntervalStarted) {
  window.__weatherIntervalStarted = true;

  setInterval(() => {
  if (!window.game?.weather) return;

  const types = ["Sunny", "Windy", "Rainy", "Storm", "Foggy"];

  const random =
    types[Math.floor(Math.random() * types.length)];

  window.game.weather.type = random;
}, 30000);

  window.weatherSystem = weatherSystem;

}