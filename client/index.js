const mainElement = document.getElementById("root");
const api = new Api("http://localhost:5000/deck"); 

/* Byter innehållet mot deckbuilder komponetent som passar den klassen */
function heroSelecter(divChoice) {
  renderDeckBuilder(divChoice.id);
}

function renderMain() {
  mainElement.innerHTML = ``;
  mainElement.insertAdjacentHTML("beforeend", getMain());
}

function rederDeckBuilderCardCanvas(hero){
  let cardCanvas = document.getElementById("cardCanvas");
  cardCanvas.insertAdjacentHTML("beforeend", deckBCards(hero));
}

function renderDeckBuilderClassButtons(hero){
  let cardButton = document.getElementById("buttonList");
  cardButton.insertAdjacentHTML("afterbegin", deckBButtons(hero));
}

function renderDeckBuilderLogo(hero){
  let cardLogo = document.getElementById("classLogo");
  cardLogo.insertAdjacentHTML("afterend", deckBprev(hero));
}

function renderDeckBuilderPrevDecks(hero){
  let cardPrev = document.getElementById("prevDeck");
  cardPrev.insertAdjacentHTML("afterend", deckBCurrentDeck(hero));
}

function renderDeckBuilder(hero) {
  mainElement.innerHTML = ``;
  mainElement.insertAdjacentHTML("beforeend", deckB(hero));

  rederDeckBuilderCardCanvas(hero);
  renderDeckBuilderClassButtons(hero);
  renderDeckBuilderLogo(hero);
  renderDeckBuilderPrevDecks(hero);
}

renderMain();
