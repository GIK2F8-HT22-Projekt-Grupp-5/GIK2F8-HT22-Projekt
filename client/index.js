let mainElement = document.getElementById("root");

/* Byter innehållet mot deckbuilder komponetent som passar den klassen */
function heroSelecter(divChoice) {
  console.log(divChoice.id);
}

function renderMain() {
  mainElement.innerHTML = ``;
  mainElement.insertAdjacentHTML("beforeend", getMain());
}

function renderDeckBuilder() {
  mainElement.innerHTML = ``;
  mainElement.insertAdjacentHTML("beforeend", deckB());
  let cardCanvas = document.getElementById("cardCanvas");
  cardCanvas.insertAdjacentHTML("beforeend", deckBCards("hej"));
  let cardButton = document.getElementById("buttonList");
  cardButton.insertAdjacentHTML("afterbegin", deckBButtons("hejdå"));
  let cardLogo = document.getElementById("classLogo");
  cardLogo.insertAdjacentHTML("afterend", deckBprev("hejdå"));
  let cardPrev = document.getElementById("prevDeck");
  cardPrev.insertAdjacentHTML("afterend", deckBCurrentDeck("hejdå"));
}

renderDeckBuilder();

//renderMain();
