function renderLogin() {
  return `
    <h1>🦅 Falcon Game</h1>
    <input id="email" placeholder="email"><br><br>
    <input id="pass" type="password" placeholder="password"><br><br>

    <button onclick="login()">Start</button>
  `;
}

// ================= HOME =================

function renderHome() {
  if (!game.birdEntities || game.birdEntities.length === 0) {
    return `
      <h2>🦅 Welcome Commander</h2>
      <div class="panel">No birds loaded</div>
      <button onclick="go('birds')">Go Birds</button>
    `;
  }

  const entity = game.birdEntities[game.selected];
  const bird = getBirdFromEntity(entity);

  if (!bird) {
    return `<h2>Error: Bird not found</h2>`;
  }

  return `
    <h2>🦅 Welcome Commander</h2>

    <div class="panel">
      Active Falcon: <b>${bird.name}</b>
      <br><br>

      🌦 Weather: <b>${game.weather?.type || "Clear"}</b><br>
      🌡 Temperature: <b>${game.weather?.temperature ?? 20}°C</b>
    </div>

    <div class="panel">
      <button onclick="go('birds')">🦅 Birds</button>
      <button onclick="go('training')">🏋️ Training</button>
      <button onclick="go('feeding')">🍖 Feeding</button>
      <button onclick="go('breeding')">🧬 Breeding</button>
      <button onclick="go('competition')">🏆 Competition</button>
    </div>
  `;
}

// ================= BIRDS =================

function renderBirds() {
  let html = "<h2>🦅 Your Birds</h2>";

  game.birdEntities.forEach((entity, i) => {
    const b = getBirdFromEntity(entity);

    if (!b) return;

    html += `
      <div class="birdCard"
        onclick="selectBird(${i})"
        style="
          background:${game.selected === i ? '#1e3a8a' : '#111827'};
          padding:10px;
          margin:8px;
          border-radius:12px;
          cursor:pointer;
        ">

        <b>${b.name}</b><br>

        STR ${b.stats?.strength ?? 0}
        | AGI ${b.stats?.agility ?? 0}
        | INT ${b.stats?.intelligence ?? 0}

        <br><br>

        <button onclick="breed(${i}); event.stopPropagation();">
          Breed With Selected
        </button>

      </div>
    `;
  });

  html += `<button onclick="go('home')">🏠 Back</button>`;
  return html;
}

// ================= TRAINING =================

function renderTraining() {
  const entity = game.birdEntities?.[game.selected];
  const b = getBirdFromEntity(entity);

  if (!b) {
    return `
      <h2>Select a Bird First</h2>
      <button onclick="go('birds')">Back</button>
    `;
  }

  return `
    <h2>🏋️ Falcon Training</h2>

    <div class="panel">
      <h3>${b.name}</h3>

      Strength: ${b.stats.strength}<br>
      Agility: ${b.stats.agility}<br>
      Intelligence: ${b.stats.intelligence}<br>
      Stamina: ${b.stats.stamina}<br>
      Charm: ${b.stats.charm}<br>

      <br>

      <button onclick="trainBird('strength','short')">💪 Strength</button>
      <button onclick="trainBird('agility','short')">⚡ Agility</button>
      <button onclick="trainBird('stamina','short')">❤️ Stamina</button>
      <button onclick="trainBird('charm','short')">🎵 Charm</button>
    </div>

    <button onclick="go('home')">🏠 Back</button>
  `;
}

// ================= BREEDING =================

function renderBreeding() {
  let html = `<h2>🧬 Falcon Breeding</h2><div class="panel">`;

  game.birdEntities.forEach((entity, i) => {
    const b = getBirdFromEntity(entity);
    if (!b) return;

    html += `
      <div class="birdCard"
        onclick="selectBird(${i})"
        style="background:${game.selected === i ? '#1e3a8a' : '#111827'}">

        <b>${b.name}</b><br>

        STR ${b.stats.strength}
        | AGI ${b.stats.agility}
        | INT ${b.stats.intelligence}

        <br><br>

        <button onclick="breed(${i}); event.stopPropagation();">
          Breed With Selected
        </button>

      </div>
    `;
  });

  html += `</div><button onclick="go('home')">🏠 Back</button>`;
  return html;
}

// ================= FEEDING =================

function renderFeeding() {
  const entity = game.birdEntities?.[game.selected];
  const b = getBirdFromEntity(entity);

  if (!b) {
    return `
      <h2>No Bird Selected</h2>
      <button onclick="go('birds')">Back</button>
    `;
  }

  return `
    <h2>🍖 Feeding Station</h2>

    <div class="panel">
      <h3>${b.name}</h3>

      Strength: ${b.stats.strength}<br>
      Stamina: ${b.stats.stamina}<br>
      Charm: ${b.stats.charm}<br>

      <br>

      <button onclick="feedBird('protein')">🍗 Protein</button>
      <button onclick="feedBird('seeds')">🌾 Seeds</button>
      <button onclick="feedBird('fruits')">🍎 Fruits</button>
    </div>

    <button onclick="go('home')">🏠 Back</button>
  `;
}

// ================= COMPETITION =================

function renderCompetition() {
  const entity = game.birdEntities?.[game.selected];
  const b = getBirdFromEntity(entity);

  if (!b) {
    return `<h2>No Bird Selected</h2><button onclick="go('home')">Back</button>`;
  }

  return `
    <h2>🏆 Competition</h2>

    <div class="panel">
      <h3>${b.name}</h3>

      Strength: ${b.stats.strength}<br>
      Agility: ${b.stats.agility}<br>
      Intelligence: ${b.stats.intelligence}<br>
      Stamina: ${b.stats.stamina}<br>
      Charm: ${b.stats.charm}<br>

      <br>

      <button onclick="startCompetition('local')">🥉 Local</button>
      <button onclick="startCompetition('regional')">🥈 Regional</button>
      <button onclick="startCompetition('national')">🥇 National</button>
    </div>

    <button onclick="go('home')">🏠 Back</button>
  `;
}

// ================= UI ENTRY =================

renderUI();