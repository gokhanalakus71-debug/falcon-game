// ===============================
// FALCON GAME - BASIC TEST FILE
// ===============================

console.log("🧪 TEST STARTED");

// 1. TEST GAME OBJECT
function testGameObject() {
  if (typeof game === "undefined") {
    console.error("❌ game object missing");
  } else {
    console.log("✅ game object exists");
  }
}

// 2. TEST WEATHER SYSTEM
function testWeather() {
  if (!game.weather) {
    console.error("❌ weather system missing");
  } else {
    console.log("✅ weather system exists:", game.weather.type);
  }
}

// 3. TEST BIRDS ARRAY
function testBirds() {
  if (!game.birds) {
    console.error("❌ birds array missing");
  } else {
    console.log("✅ birds count:", game.birds.length);
  }
}

// 4. RUN ALL TESTS
function runTests() {
  console.log("🚀 Running Falcon Game Tests...");
  testGameObject();
  testWeather();
  testBirds();
  console.log("🏁 TEST COMPLETE");
}

// Auto-run tests after small delay
setTimeout(runTests, 1000);