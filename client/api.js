class Api {
  url = "";

  constructor(url) {
    this.url = url;
  }
  /* Create --> POST */
  createDeck(deckName, deckList) {
    const JSONdata = JSON.stringify([deckName, deckList]);
    console.log("från api - > server", JSONdata);
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

  updateDeck(id) {
    console.log(`Uppdating task with id: ${id}`);
    return fetch(`${this.url}/${id}`, {
      method: "PATCH",
    })
      .then((result) => result.json())
      .catch((err) => console.log(err));
  }

  /* GetAll (read) --> GET */
  getCards(hero) {
    //const JSONdata = JSON.stringify(hero);
    console.log("Api -> Server", hero);
    const request = new Request(`${this.url}/${hero}`, {
      method: "GET",
    });

    return fetch(request)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  getHeros() {
    return fetch(this.url)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  getRaces(hero) {
    const JSONdata = JSON.stringify(hero);
    console.log("Api/race -> Server", hero);
    //console.log(`${this.url}/${hero}/races`);
    const request = new Request(`${this.url}/${hero}/races`, {
      method: "GET",
    });
    return fetch(request)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  raceCards(hero, race) {
    //const JSONdata = JSON.stringify(race);
    console.log("Api -> Server aa", race);
    const request = new Request(`${this.url}/${hero}/race/${race}`, {
      method: "GET",
    });

    return fetch(request)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  searchCards(searchstring) {
    const JSONData = JSON.stringify({ searchString: searchstring });
    const request = new Request(`${this.url}/search`, {
      method: "POST",
      body: JSONData,
      headers: {
        "content-type": "application/json",
      },
    });
    return fetch(request)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  /* Remove --> DELETE */
  remove(id) {
    console.log(`Removing task with id: ${id}`);

    return fetch(`${this.url}/${id}`, {
      method: "DELETE",
    })
      .then((result) => result.json())
      .catch((err) => console.log(err));
  }
}
