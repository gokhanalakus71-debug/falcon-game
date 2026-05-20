// ================= SCENE NAVIGATION =================

function go(nextScene) {

  window.scene = nextScene;

  if (typeof renderUI === "function") {
    renderUI();
  }
}

// ================= EXPORT =================

window.go = go;