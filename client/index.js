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

function rederDeckBuilderCardCanvas(hero) {
  let cardCanvas = document.getElementById("cardCanvas");
  console.log("index.js -> Api jag vill dom här korten", hero);

  api.getCards(hero).then((ids) => {
    cardCanvas.insertAdjacentHTML("beforeend", deckBCards(ids, hero));
  });
}

function updateDeckBuilderCardCanvas(hero, race) {
  let cardCanvas = document.getElementById("cardCanvas");
  cardCanvas.innerHTML = ``;
  console.log("index.js -> Api jag vill dom här korten", race);

  api.raceCards(hero, race).then((ids) => {
    cardCanvas.insertAdjacentHTML("beforeend", deckBCards(ids));
  });
}

function renderDeckBuilderClassButtons(hero) {
  console.log("race till api", hero);
  let cardButton = document.getElementById("buttonList");
  api.getRaces(hero).then((races) => {
    cardButton.insertAdjacentHTML("afterbegin", deckBButtons(hero, races));
  });
}

function renderDeckBuilderLogo(hero) {
  let cardLogo = document.getElementById("classLogo");
  cardLogo.insertAdjacentHTML("afterend", deckBprev(hero));
}

function renderDeckBuilderPrevDecks(hero) {
  let cardPrev = document.getElementById("prevDeck");
  cardPrev.innerHTML = ``;
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

function raceClick(button) {
  let id = button.id;
  info = id.split("-");
  race = info[0];
  hero = info[1];
  updateDeckBuilderCardCanvas(hero, race);
}

function searchCard(e) {
  e.preventDefault();
  let cardCanvas = document.getElementById("cardCanvas");
  cardCanvas.innerHTML = ``;
  api
    .searchCards(searchField.value)
    .then((ids) => cardCanvas.insertAdjacentHTML("beforeend", deckBCards(ids)));
}

//
function addToDeck(li) {
  console.log("skickar till api ->", li.id);
  let counter = 0;
  for (item of currentDeck.cards.flat()) {
    if (item == li.id) {
      counter++;
    }
  }
  if (currentDeck.cards.length < 30 && counter < 2) {
    currentDeck.cards.push(li.id);

    // currentDeck.innerHTML = ``;
    document.getElementById("deckList").remove();
    renderDeckBuilderPrevDecks();
  }
}

function removeCardCurrentDeck(li) {
  const index = currentDeck.cards.indexOf(li.id);
  currentDeck.cards.splice(index, 1);

  document.getElementById("deckList").remove();
  renderDeckBuilderPrevDecks();
}

renderMain();
