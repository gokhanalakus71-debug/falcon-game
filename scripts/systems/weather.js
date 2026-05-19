game.weather = game.weather || {
  type: "Sunny",
  temperature: 20
};

const weatherTypes = ["Sunny", "Windy", "Rainy", "Storm", "Foggy"];

setInterval(() => {

  const randomWeather =
    weatherTypes[Math.floor(Math.random() * weatherTypes.length)];

  game.weather.type = randomWeather;
  game.weather.temperature = 20 + Math.floor(Math.random() * 15);

  floatText("🌦 Weather: " + randomWeather, "#60a5fa");

  // consider replacing full render later
  render();

}, 30000);