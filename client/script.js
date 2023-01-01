const mainElement = document.getElementById("root");
const api = new Api("http://localhost:5000/deck");

/* Byter innehållet mot deckbuilder komponetent som passar den klassen */
function loadDeckBuilderDeckAssemblingAreaWithHero(divChoice) {
  renderDeckBuilderDeckAssemblingArea(divChoice.id);
}

function renderDeckBuilderClassSelectionArea() {
  mainElement.innerHTML = ``;
  mainElement.insertAdjacentHTML("beforeend", deckBuilderClassSelectionArea());
}

function rederDeckBuilderCardPickingZone(hero) {
  let cardCanvas = document.getElementById("cardCanvas");
  cardCanvas.innerHTML = ``;
  api.getCards(hero).then((ids) => {
    cardCanvas.insertAdjacentHTML("beforeend", deckBuilderCardPickingZone(ids));
  });
}

function updateDeckBuilderCardPickingZoneFromSearch(searchTerm) {
  let cardCanvas = document.getElementById("cardCanvas");
  cardCanvas.innerHTML = ``;
  api
    .searchCards(searchTerm)
    .then((ids) => cardCanvas.insertAdjacentHTML("beforeend", deckBuilderCardPickingZone(ids)));
}

function updateDeckBuilderCardPickingZone(hero, race) {
  let cardCanvas = document.getElementById("cardCanvas");
  cardCanvas.innerHTML = ``;

  api.raceCards(hero, race).then((ids) => {
    cardCanvas.insertAdjacentHTML("beforeend", deckBuilderCardPickingZone(ids));
  });
}

function renderDeckBuilderRaceButtonZone(hero) {
  let cardButton = document.getElementById("buttonList");
  api.getRaces(hero).then((races) => {
    cardButton.insertAdjacentHTML("afterbegin", deckBuilderRaceButtonZone(hero, races));
  });
}

function renderDeckBuilderPreviousDeckZone(hero) {
  let cardPrevContainer = document.getElementById("prevDecksContainer");
  cardPrevContainer.innerHTML = ``;
  api.getSavedDeckNames(hero).then((deckNames) => {
    cardPrevContainer.insertAdjacentHTML("afterbegin", deckBuilderPreviousDeckZone(deckNames));
  });
}

function renderDeckBuilderCurrentDeckZoneFromId(deck) {
  const currentDeck = document.getElementById("deckBuild");
  currentDeck.remove();
  let cardPrevContainer = document.getElementById("prevDecksContainer");
  cardPrevContainer.insertAdjacentHTML("afterend", deckBuilderCurrentDeckZone(deck));
}

function renderDeckBuilderCurrentDeckZone(deck) {
  let cardPrevContainer = document.getElementById("prevDecksContainer");
  cardPrevContainer.insertAdjacentHTML("afterend", deckBuilderCurrentDeckZone(deck));
}

function renderDeckBuilderDeckAssemblingArea(hero) {
  mainElement.innerHTML = ``;
  mainElement.insertAdjacentHTML("beforeend", deckBuilderDeckAssemblingArea(hero));

  rederDeckBuilderCardPickingZone(hero);
  renderDeckBuilderRaceButtonZone(hero);
  renderDeckBuilderPreviousDeckZone(hero);
  renderDeckBuilderCurrentDeckZone();
}

function updateDeckBuilderCardPickingZoneClick(button) {
  let id = button.id;
  info = id.split("-");
  race = info[0];
  hero = info[1];
  updateDeckBuilderCardPickingZone(hero, race);
}

function searchCard(e) {
  e.preventDefault();
  updateDeckBuilderCardPickingZoneFromSearch(searchField.value);
}

function addCardToCurrentDeckList(li) {
  let counter = 0;
  let currentDeck = [];
  let currentDeckName = document.getElementById("deckBuildName").value;
  let deckId = document.getElementById("deckBuild").name;
  const currentDeckList = document
    .querySelector("#deckBuildList")
    .querySelectorAll("li");
  if (currentDeckList.length > 0) {
    for (let index = 0; index < currentDeckList.length; index++) {
      currentDeck.push(currentDeckList[index].id);
      if (currentDeckList[index].id == li.id) {
        counter++;
      }
    }
  }
  if (currentDeckList.length < 30 && counter < 2) {
    currentDeck.push(li.id);
    document.getElementById("deckBuild").remove();
    renderDeckBuilderCurrentDeckZone({
      id: deckId,
      deckName: currentDeckName,
      cards: currentDeck,
    });
  }
}

function removeCardFromCurrentDeckList(li) {
  document.getElementById("deckBuildList").removeChild(li);
}

function deckBuilderCurrentDeckZoneManageDeckButton(e) {
  e.preventDefault();
  const deckId = document.getElementById("deckBuild").name;
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
  if (deckId == -1) {
    api.createDeck(newDeckName, heroClass, newDeckList)
      .then((data) => console.log(data));
      renderDeckBuilderPreviousDeckZone(heroClass);
  } else {
    api.updateDeck(newDeckName,deckId, newDeckList).then((data) => console.log(data));
    renderDeckBuilderPreviousDeckZone(heroClass);
  }
}

function loadPreviousDeckToDeckBuilderCurrentDeckZone(button) {
  const id = button.id;
  api.getDeckById(id).then((deck) => renderDeckBuilderCurrentDeckZoneFromId(deck));
}

function loadClassCardsIntoDeckBuilderCardPickingZone() {
  const deckClass = document.getElementById("classHero").getAttribute("src");
  let heroClass = deckClass.split("/");
  heroClass = heroClass[4].split(".", 1);
  heroClass = heroClass.toString().toUpperCase();
  rederDeckBuilderCardPickingZone(heroClass);
}

function startNewDeck(){
  DeckBuilderCurrentDeckZoneSetToNewDeck();
}

function deleteDeck(){
  const deckId = document.getElementById("deckBuild").name;
  api.remove(deckId).then((data) =>  renderDeckBuilderPreviousDeckZone(data.class));
  DeckBuilderCurrentDeckZoneSetToNewDeck();
  
}

function DeckBuilderCurrentDeckZoneSetToNewDeck(){
  document.getElementById("deckBuild").name = -1;
  document.getElementById("deckBuildName").value = "New Deck";
  document.getElementById("deckBuildList").innerHTML="";
}   

renderDeckBuilderClassSelectionArea();
