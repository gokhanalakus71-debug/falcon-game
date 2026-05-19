function selectBird(i){
  game.selected = i;

  const cards = document.querySelectorAll(".birdCard");

  if(cards[i]){
    cards[i].style.transform = "scale(1.08)";
    cards[i].style.boxShadow = "0 0 20px rgba(59,130,246,0.6)";

    setTimeout(()=>{
      cards[i].style.transform = "scale(1)";
      cards[i].style.boxShadow = "0 0 10px rgba(59,130,246,0.2)";
    }, 150);
  }

  render();
  updateWorld();
}