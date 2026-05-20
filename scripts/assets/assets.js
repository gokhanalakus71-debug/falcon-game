console.log("🔥 ASSETS START LOADED");

window.getAsset = function(type, key) {
  console.log("GET ASSET CALLED", type, key);
  return "OK";
};

window.assets = {};

console.log("✅ ASSETS EXPORT DONE");