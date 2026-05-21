// ================= LOGIN =================

function renderLogin() {
  return `
    <div class="panel">
      <h1>🦅 Falcon Game</h1>

      <input id="email" placeholder="email">
      <br><br>

      <input id="pass" type="password" placeholder="password">
      <br><br>

      <button onclick="login()">Start</button>
    </div>
  `;
}

// ================= HOME =================

function renderHome() {

  if (!game.birdEntities?.length) {
    return `
      <div class="panel">
        <h2>No Falcons Loaded</h2>
      </div>
    `;
  }

  const entity = game.birdEntities[game.selected];
  const bird = getBirdFromEntity(entity);

  if (!bird) {
    return `<div class="panel">Bird not found</div>`;
  }

  return `
    <div class="panel">
      <h2>🦅 ${bird.name}</h2>

      <p>
        Weather:
        <b>${game.weather.type}</b>
      </p>

      <p>
        Temperature:
        <b>${game.weather.temperature}°C</b>
      </p>
    </div>

    <div class="panel">

      <button onclick="go('birds')">
        🦅 Birds
      </button>

      <button onclick="go('training')">
        🏋️ Training
      </button>

      <button onclick="go('feeding')">
        🍖 Feeding
      </button>

      <button onclick="go('breeding')">
        🧬 Breeding
      </button>

      <button onclick="go('competition')">
        🏆 Competition
      </button>

    </div>
  `;
}

// ================= BIRDS =================

function renderBirds() {

  let html = `
    <div class="panel">
      <h2>🦅 Your Falcons</h2>
    </div>
  `;

  game.birdEntities.forEach((entity, i) => {

    const b = getBirdFromEntity(entity);

    if (!b) return;

    html += `
      <div
        class="birdCard ${game.selected === i ? 'selected' : ''}"
        onclick="selectBird(${i})"
      >

        <h3>${b.name}</h3>

        <p>
          STR ${b.strength}
          |
          AGI ${b.agility}
          |
          INT ${b.intelligence}
        </p>

        <p>
          STA ${b.stamina}
          |
          CHA ${b.charm}
        </p>

      </div>
    `;
  });

  html += `
    <button onclick="go('home')">
      🏠 Back
    </button>
  `;

  return html;
}

// ================= TRAINING =================

function renderTraining() {

  const entity = game.birdEntities?.[game.selected];
  const b = getBirdFromEntity(entity);

  if (!b) {
    return `<div class="panel">No bird selected</div>`;
  }

  return `
    <div class="panel">

      <h2>🏋️ Training</h2>

      <h3>${b.name}</h3>

      <p>Strength: ${b.strength}</p>
      <p>Agility: ${b.agility}</p>
      <p>Intelligence: ${b.intelligence}</p>
      <p>Stamina: ${b.stamina}</p>
      <p>Charm: ${b.charm}</p>

      <br>

      <button onclick="trainBird('strength','short')">
        💪 Strength
      </button>

      <button onclick="trainBird('agility','short')">
        ⚡ Agility
      </button>

      <button onclick="trainBird('stamina','short')">
        ❤️ Stamina
      </button>

      <button onclick="trainBird('charm','short')">
        ✨ Charm
      </button>

      <br><br>

      <button onclick="go('home')">
        🏠 Back
      </button>

    </div>
  `;
}

// ================= FEEDING =================

function renderFeeding() {

  const entity = game.birdEntities?.[game.selected];
  const b = getBirdFromEntity(entity);

  if (!b) {
    return `<div class="panel">No bird selected</div>`;
  }

  return `
    <div class="panel">

      <h2>🍖 Feeding</h2>

      <h3>${b.name}</h3>

      <p>Strength: ${b.strength}</p>
      <p>Stamina: ${b.stamina}</p>
      <p>Charm: ${b.charm}</p>

      <br>

      <button onclick="feedBird('protein')">
        🍗 Protein
      </button>

      <button onclick="feedBird('seeds')">
        🌾 Seeds
      </button>

      <button onclick="feedBird('fruits')">
        🍎 Fruits
      </button>

      <br><br>

      <button onclick="go('home')">
        🏠 Back
      </button>

    </div>
  `;
}

// ================= BREEDING =================

function renderBreeding() {

  let html = `
    <div class="panel">
      <h2>🧬 Breeding</h2>
    </div>
  `;

  game.birdEntities.forEach((entity, i) => {

    const b = getBirdFromEntity(entity);

    if (!b) return;

    html += `
      <div
        class="birdCard ${game.selected === i ? 'selected' : ''}"
        onclick="selectBird(${i})"
      >

        <h3>${b.name}</h3>

        <p>
          STR ${b.strength}
          |
          AGI ${b.agility}
          |
          INT ${b.intelligence}
        </p>

        <button onclick="breed(${i}); event.stopPropagation();">
          Breed
        </button>

      </div>
    `;
  });

  html += `
    <button onclick="go('home')">
      🏠 Back
    </button>
  `;

  return html;
}

// ================= COMPETITION =================

function renderCompetition() {

  const entity = game.birdEntities?.[game.selected];
  const b = getBirdFromEntity(entity);

  if (!b) {
    return `<div class="panel">No bird selected</div>`;
  }

  return `
    <div class="panel">

      <h2>🏆 Competition</h2>

      <h3>${b.name}</h3>

      <p>Strength: ${b.strength}</p>
      <p>Agility: ${b.agility}</p>
      <p>Intelligence: ${b.intelligence}</p>

      <br>

      <button onclick="startCompetition('local')">
        🥉 Local
      </button>

      <button onclick="startCompetition('regional')">
        🥈 Regional
      </button>

      <button onclick="startCompetition('national')">
        🥇 National
      </button>

      <br><br>

      <button onclick="go('home')">
        🏠 Back
      </button>

    </div>
  `;
}

// ================= EXPORTS =================

window.renderLogin = renderLogin;
window.renderHome = renderHome;
window.renderBirds = renderBirds;
window.renderTraining = renderTraining;
window.renderFeeding = renderFeeding;
window.renderBreeding = renderBreeding;
window.renderCompetition = renderCompetition;