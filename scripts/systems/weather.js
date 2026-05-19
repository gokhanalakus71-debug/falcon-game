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

  if (!game.weather) game.weather = {};

  game.weather.temperature =
    20 + Math.floor(Math.random() * 15);

  floatText(
    "🌦 Weather: " + randomWeather,
    "#60a5fa"
  );

  render();

}, 30000);

function getWeatherModifiers(){
  return {
    injuryBonus: game.weather.type === "Storm" ? 0.1 : 0,
    agilityBonus: game.weather.type === "Windy" ? 1 : 0
  };
}