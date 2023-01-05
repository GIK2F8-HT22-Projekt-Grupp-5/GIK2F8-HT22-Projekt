class Api {
  url = "";

  constructor(url) {
    this.url = url;
  }

  //Post, Skapar en deck
  createDeck(deckName, heroClass, deckList) {
    const JSONdata = JSON.stringify({
      name: deckName,
      class: heroClass,
      cards: deckList,
    });
    const request = new Request(this.url, {
      method: "POST",
      body: JSONdata,
      headers: { "content-type": "application/json" },
    });
    return fetch(request)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  //Patch, Uppdaterar deck med ett visst ID
  updateDeck(deckName, deckId, newDeckList) {
    const JSONData = JSON.stringify({
      id: deckId,
      name: deckName,
      cards: newDeckList,
    });
    return fetch(`${this.url}/:id`, {
      method: "PATCH",
      body: JSONData,
      headers: { "content-type": "application/json" },
    })
      .then((result) => result.json())
      .catch((err) => console.log(err));
  }

  //Delete, Tar bort Deck med angivet ID
  deleteDeck(id) {
    return fetch(`${this.url}/${id}`, {
      method: "DELETE",
    })
      .then((result) => result.json())
      .catch((err) => console.log(err));
  }

  //Get, Hämtar namn och id för knapparna som visar sparade decks från respektive hero.
  getDeckNames(heroClass) {
    const request = new Request(`${this.url}/savedDecks/${heroClass}`, {
      method: "GET",
    });
    return fetch(request)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  //-------------------------
  // Hämtar kort som är unika för vald hero
  getCardsForHero(hero) {
    const request = new Request(`${this.url}/${hero}`, {
      method: "GET",
    });
    return fetch(request)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  // Hämtar de raser som kan användas av vald hero
  getAvailableRaces(hero) {
    const request = new Request(`${this.url}/${hero}/races`, {
      method: "GET",
    });
    return fetch(request)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  // Hämtar kort från vald ras för aktuell Hero
  getAvailableRaceCards(hero, race) {
    const request = new Request(`${this.url}/${hero}/race/${race}`, {
      method: "GET",
    });
    return fetch(request)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  // Hämtar (postar) kort baserat på sökterm
  getSearchedCards(searchstring) {
    const request = new Request(`${this.url}/search/${searchstring}`, {
      method: "GET",
    });
    return fetch(request)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  // Hämtar deck med hjälp av angivet ID
  getDeckById(id) {
    const request = new Request(`${this.url}/deckId/${id}`, {
      method: "GET",
    });
    return fetch(request)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
}
