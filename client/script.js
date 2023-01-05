const mainElement = document.getElementById("root");
const api = new Api("http://localhost:5000/deck");

/* Byter innehållet mot deckbuilder komponetent som passar den klassen */
function loadDeckBuilderDeckAssemblingAreaWithHero(divChoice) {
  renderDeckBuilderDeckAssemblingArea(divChoice.id);
}

// Renderar första sidan där man väljer Hero
function renderDeckBuilderClassSelectionArea() {
  mainElement.innerHTML = ``;
  mainElement.insertAdjacentHTML("beforeend", deckBuilderClassSelectionArea());
}

// Renderar kort som man ska kunna välja för sin deck
function rederDeckBuilderCardPickingZone(hero) {
  let cardCanvas = document.getElementById("cardCanvas");
  cardCanvas.innerHTML = ``;
  api.getCardsForHero(hero).then((ids) => {
    cardCanvas.insertAdjacentHTML("beforeend", deckBuilderCardPickingZone(ids));
  });
}

// Uppdaterar korten som går att välja till sin deck efter kortsökning.
function updateDeckBuilderCardPickingZoneFromSearch(searchTerm) {
  let cardCanvas = document.getElementById("cardCanvas");
  cardCanvas.innerHTML = ``;
  api.getSearchedCards(searchTerm).then((ids) => {
    cardCanvas.insertAdjacentHTML("beforeend", deckBuilderCardPickingZone(ids));
  });
}

// Uppdaterar korten som går att välja till sin deck efter man tryckt på knapp med raser.
function updateDeckBuilderCardPickingZone(hero, race) {
  let cardCanvas = document.getElementById("cardCanvas");
  cardCanvas.innerHTML = ``;

  api.getAvailableRaceCards(hero, race).then((ids) => {
    cardCanvas.insertAdjacentHTML("beforeend", deckBuilderCardPickingZone(ids));
  });
}

// Renderar Rasknappar för vald Hero
function renderDeckBuilderRaceButtonZone(hero) {
  let cardButton = document.getElementById("buttonList");
  api.getAvailableRaces(hero).then((races) => {
    cardButton.insertAdjacentHTML(
      "afterbegin",
      deckBuilderRaceButtonZone(hero, races)
    );
  });
}

// Renderar Knappar för redan sparade decks
function renderDeckBuilderPreviousDeckZone(hero) {
  let cardPrevContainer = document.getElementById("prevDecksContainer");
  cardPrevContainer.innerHTML = ``;
  api.getDeckNames(hero).then((deckNames) => {
    cardPrevContainer.insertAdjacentHTML(
      "afterbegin",
      deckBuilderPreviousDeckZone(deckNames)
    );
  });
}

// Renderar decklista när man tryckt på knapp med sparad deck
function renderDeckBuilderCurrentDeckZoneFromId(deck) {
  const currentDeck = document.getElementById("deckBuild");
  currentDeck.remove();
  let cardPrevContainer = document.getElementById("prevDecksContainer");
  cardPrevContainer.insertAdjacentHTML(
    "afterend",
    deckBuilderCurrentDeckZone(deck)
  );
}

// Renderar decklista när man lägger till nytt kort
function renderDeckBuilderCurrentDeckZone(deck) {
  let cardPrevContainer = document.getElementById("prevDecksContainer");
  cardPrevContainer.insertAdjacentHTML(
    "afterend",
    deckBuilderCurrentDeckZone(deck)
  );
}

// Renderar skelettet till sidan där man bygger sin deck
function renderDeckBuilderDeckAssemblingArea(hero) {
  mainElement.innerHTML = ``;
  mainElement.insertAdjacentHTML(
    "beforeend",
    deckBuilderDeckAssemblingArea(hero)
  );

  rederDeckBuilderCardPickingZone(hero);
  renderDeckBuilderRaceButtonZone(hero);
  renderDeckBuilderPreviousDeckZone(hero);
  renderDeckBuilderCurrentDeckZone();
}

// onclick funktion i html som kör "updateDeckBuilderCardPickingZone" för att visa kort.
function updateDeckBuilderCardPickingZoneClick(button) {
  let id = button.id;
  info = id.split("-");
  race = info[0];
  hero = info[1];
  updateDeckBuilderCardPickingZone(hero, race);
}

// onclick funktion i html som kör "updateDeckBuilderCardPickingZoneFromSearch" för att visa kort.
function searchCard(e) {
  e.preventDefault();
  updateDeckBuilderCardPickingZoneFromSearch(searchField.value);
}

// onclick funktion i html som lägger till valt kort i decklistan
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

// onclick funktion på kort i decklistan för att ta bort kortet ur decken.
function removeCardFromCurrentDeckList(li) {
  document.getElementById("deckBuildList").removeChild(li);
}

// onclick funktion för att spara aktuell kortlek till server
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
    api.createDeck(newDeckName, heroClass, newDeckList).then((data) => {
      document.getElementById("deckBuild").name = data.id;
      renderDeckBuilderPreviousDeckZone(heroClass);
      loadPreviousDeckToDeckBuilderCurrentDeckZone(data);
    });
  } else {
    api.updateDeck(newDeckName, deckId, newDeckList).then((data) => {
      renderDeckBuilderPreviousDeckZone(heroClass);
      loadPreviousDeckToDeckBuilderCurrentDeckZone(data);
    });
  }
}

// onclick funktion för att ladda en sparad kortlek till decklistan
function loadPreviousDeckToDeckBuilderCurrentDeckZone({ id }) {
  api
    .getDeckById(id)
    .then((deck) => renderDeckBuilderCurrentDeckZoneFromId(deck));
}

// onclick funktion för att läsa in hero-specifika kort genom att trycka på hero-loggan
function loadClassCardsIntoDeckBuilderCardPickingZone() {
  const deckClass = document.getElementById("classHero").getAttribute("src");
  let heroClass = deckClass.split("/");
  heroClass = heroClass[4].split(".", 1);
  heroClass = heroClass.toString().toUpperCase();
  rederDeckBuilderCardPickingZone(heroClass);
}

// onclick funktion för att börja bygga en ny deck
function startNewDeck() {
  DeckBuilderCurrentDeckZoneSetToNewDeck();
}

// onclick funktion för att ta bort sparad deck
function deleteDeck({ id }) {
  if (id != -1) {
    api
      .deleteDeck(id)
      .then((data) => renderDeckBuilderPreviousDeckZone(data.class));
    DeckBuilderCurrentDeckZoneSetToNewDeck();
  } else {
    console.log("Decken finns ej!");
  }
}

// sätter default värden på decklistan (formet) efter tryck på delete och new deck
function DeckBuilderCurrentDeckZoneSetToNewDeck() {
  document.getElementById("deckBuild").name = -1;
  document.getElementById("deckBuildName").value = "New Deck";
  document.getElementById("deckBuildList").innerHTML = "";
}

renderDeckBuilderClassSelectionArea();
