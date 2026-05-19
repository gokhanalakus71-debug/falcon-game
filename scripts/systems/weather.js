const weatherTypes = [
  "Sunny",
  "Windy",
  "Rainy",
  "Storm",
  "Foggy"
];

// Weather changes every 30 sec
setInterval(() => {

  const randomWeather =
    weatherTypes[
      Math.floor(Math.random() * weatherTypes.length)
    ];

  game.weather.type = randomWeather;

  game.weather.temperature =
    20 + Math.floor(Math.random() * 15);

  floatText(
    "🌦 Weather: " + randomWeather,
    "#60a5fa"
  );

  render();

}, 30000);