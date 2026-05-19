const weatherTypes = [
  "Sunny",
  "Windy",
  "Rainy",
  "Storm",
  "Foggy"
];

// Weather changes every 30 sec
const WEATHER_INTERVAL = 30000;

function getWeatherModifiers(){
  return {
    injuryBonus: game.weather.type === "Storm" ? 0.1 : 0,
    agilityBonus: game.weather.type === "Windy" ? 1 : 0
  };
}

game.weather = {
  type: "Sunny",
  temperature: 20
};

