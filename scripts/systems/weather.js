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
    if (!game || !game.weather) return;

    const randomWeather =
      weatherTypes[Math.floor(Math.random() * weatherTypes.length)];

    game.weather.type = randomWeather;
    game.weather.temperature = 20 + Math.floor(Math.random() * 15);

    floatText(`🌦 Weather: ${randomWeather}`, "#60a5fa");

    // safer: avoid full UI rerender spam in future scaling
    renderUI();

  }, 30000);
}