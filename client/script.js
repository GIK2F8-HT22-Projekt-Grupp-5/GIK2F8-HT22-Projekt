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
  api.getCards(hero).then((ids) => {
    cardCanvas.insertAdjacentHTML("beforeend", deckBCards(ids, hero));
  });
}

function updateDeckBuilderCardCanvasFromSearch(searchTerm) {
  let cardCanvas = document.getElementById("cardCanvas");
  cardCanvas.innerHTML = ``;
  api
    .searchCards(searchTerm)
    .then((ids) => cardCanvas.insertAdjacentHTML("beforeend", deckBCards(ids)));
}

function updateDeckBuilderCardCanvas(hero, race) {
  let cardCanvas = document.getElementById("cardCanvas");
  cardCanvas.innerHTML = ``;

  api.raceCards(hero, race).then((ids) => {
    cardCanvas.insertAdjacentHTML("beforeend", deckBCards(ids));
  });
}

function renderDeckBuilderClassButtons(hero) {
  let cardButton = document.getElementById("buttonList");
  api.getRaces(hero).then((races) => {
    cardButton.insertAdjacentHTML("afterbegin", deckBButtons(hero, races));
  });
}

function renderDeckBuilderPrevDecks(hero) {
  let cardPrevContainer = document.getElementById("prevDecksContainer");
  cardPrevContainer.innerHTML = ``;
  api.getSavedDeckNames(hero).then((deckNames) => {
    cardPrevContainer.insertAdjacentHTML("afterbegin", deckBprev(deckNames));
  });
}

function renderDeckBuilderCurrentDeckFromId(deck) {
  const currentDeck = document.getElementById("deckBuild");
  currentDeck.remove();
  let cardPrevContainer = document.getElementById("prevDecksContainer");
  cardPrevContainer.insertAdjacentHTML("afterend", deckBCurrentDeck(deck))



}

function renderDeckBuilderCurrentDeck(hero) {
  let cardPrevContainer = document.getElementById("prevDecksContainer");
  cardPrevContainer.insertAdjacentHTML("afterend", deckBCurrentDeck());
}

function renderDeckBuilder(hero) {
  mainElement.innerHTML = ``;
  mainElement.insertAdjacentHTML("beforeend", deckB(hero));

  rederDeckBuilderCardCanvas(hero);
  renderDeckBuilderClassButtons(hero);
  renderDeckBuilderPrevDecks(hero);
  renderDeckBuilderCurrentDeck(hero);
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
  updateDeckBuilderCardCanvasFromSearch(searchField.value);
}

//
function addToDeck(li) {
  let counter = 0;
  for (item of currentDeck.cards.flat()) {
    if (item == li.id) {
      counter++;
    }
  }
  if (currentDeck.cards.length < 30 && counter < 2) {
    currentDeck.cards.push(li.id);

    // currentDeck.innerHTML = ``;
    document.getElementById("deckBuild").remove();
    renderDeckBuilderCurrentDeck();
  }
}

function removeCardCurrentDeck(li) {
  const index = currentDeck.cards.indexOf(li.id);
  currentDeck.cards.splice(index, 1);

  document.getElementById("deckBuild").remove();
  renderDeckBuilderPrevDecks();
}

function cardCurrentDeckManageDeckButton(e) {
  e.preventDefault();
  const newDeckList = [];
  const deckClass = document.getElementById("classHero").getAttribute("src");
  let heroClass = deckClass.split("/");
  heroClass = heroClass[4].split(".", 1);
  heroClass = heroClass.toString().toUpperCase();

  const listElements = document
    .querySelector("#deckBuildList")
    .querySelectorAll("li");
  listElements.forEach(function (li) {
    newDeckList.push(li.id);
  });

  const newDeckName = document.getElementById("deckBuildName").value;
  api
    .createDeck(newDeckName, heroClass, newDeckList)
    .then((data) => console.log(data));
  renderDeckBuilderPrevDecks(heroClass);
}

function loadPrevDeck(button) {
  const id = button.id;
  api.getDeckById(id).then((deck) => renderDeckBuilderCurrentDeckFromId(deck));
}

renderMain();
