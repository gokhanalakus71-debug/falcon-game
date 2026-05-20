// ================= BIRDS =================

function selectBird(i){

  if(!game.birds || !game.birds[i]){
    return;
  }

  game.selected = i;

  const cards = document.querySelectorAll(".birdCard");

  const card = cards?.[i];

  if(card){

    card.style.transform = "scale(1.08)";
    card.style.boxShadow = "0 0 20px rgba(59,130,246,0.6)";

    setTimeout(() => {
      card.style.transform = "scale(1)";
      card.style.boxShadow = "0 0 10px rgba(59,130,246,0.2)";
    }, 150);
  }

  renderUI();
}