const cardLocale = `enUS`;
const cardResolution = `512x`;
const cardExt = `png`;

const { error, count } = require("console");
const { KeyObject } = require("crypto");
const { json } = require("express");
const express = require("express");
const app = express();
const fs = require("fs/promises");
const { test } = require("media-typer");

const PORT = 5000;
app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");

    next();
  });

//Post, Skapar en deck
app.post("/deck", async (req, res) => {
  const body = req.body;
  try {
    const listBuffer = await fs.readFile("./JSON/decks.json");
    const currentDecks = JSON.parse(listBuffer);
    // sätter unikt ID
    let maxDeckId = 1;
    if (currentDecks && currentDecks.length > 0) {
      maxDeckId = currentDecks.reduce(
        (maxId, currentElement) =>
          currentElement.id > maxId ? currentElement.id : maxId,
        maxDeckId
      );
      maxDeckId++;
    }
    const newDeck = {
      id: maxDeckId,
      deckName: body.name,
      class: body.class,
      cards: body.cards,
    };
    const deckList = currentDecks ? [...currentDecks, newDeck] : [newDeck];
    await fs.writeFile("./JSON/decks.json", JSON.stringify(deckList));
    res.send({ message: `Deck ${body.name} saved`, id: maxDeckId });
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

//Patch, Uppdaterar deck med visst ID
app.patch("/deck/:id", async (req, res) => {
  const deckId = req.body.id;
  try {
    const listBuffer = await fs.readFile("./JSON/decks.json");
    const currentDecks = JSON.parse(listBuffer);

    currentDecks.forEach((deck) => {
      if (deck.id == deckId) {
        deck.cards = req.body.cards;
        deck.deckName = req.body.name;
      }
    });

    await fs.writeFile("./JSON/decks.json", JSON.stringify(currentDecks));
    res.send({
      messege: `Deck med id: ${deckId} uppdaterades`,
      id: deckId,
    });
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

//Delete, Tar bort deck med angivet ID
app.delete("/deck/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let heroClass = "";
    const listBuffer = await fs.readFile("./JSON/decks.json");
    const currentDecks = JSON.parse(listBuffer);
    if (currentDecks.length > 0) {
      currentDecks.forEach((deck) => {
        if (deck.id == id) {
          heroClass = deck.class;
        }
      });
      await fs.writeFile(
        "./JSON/decks.json",
        JSON.stringify(currentDecks.filter((deck) => deck.id != id))
      );
      res.send({ messege: `Deck med id: ${id} togs bort`, class: heroClass });
    } else {
      res.status(404).send({ error: "Ingen uppgift att ta bort" });
    }
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

//Get, Hämtar namn och id för knapparna som visar sparade decks från respektive hero.
app.get("/deck/savedDecks/:hero", async (req, res) => {
  try {
    let hero = req.params.hero;
    const heroDecks = [];
    const listBuffer = await fs.readFile("./JSON/decks.json");
    const decks = JSON.parse(listBuffer);
    decks.forEach((deck) => {
      if (deck.class == hero) {
        heroDecks.push([deck.deckName, deck.id]);
      }
    });
    res.send(JSON.stringify(heroDecks));
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

// ---------------------------------------
// Hämtar (postar) kort baserat på sökterm
app.get("/deck/search/:searchTerm", async (req, res) => {
  try {
    let searchCards = [];
    let searchWords = req.params.searchTerm.toLowerCase();
    const listBuffer = await fs.readFile("./JSON/cards.json");
    const cards = JSON.parse(listBuffer);
    cards.forEach((card) => {
      if (
        card.type != "HERO" &&
        card.type != "HERO_POWER" &&
        card.type != "GAME_MODE_BUTTON" &&
        card.type != "ENCHANTMENT" &&
        card.cost != 0
      ) {
        if (card.name.toLowerCase().includes(searchWords)) {
          searchCards.push(card.id);
        }
      }
    });
    res.send(searchCards);
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

// Hämtar deck med hjälp av angivet ID
app.get("/deck/deckId/:id", async (req, res) => {
  try {
    const deckId = req.params.id;
    const listBuffer = await fs.readFile("./JSON/decks.json");
    const decks = JSON.parse(listBuffer);
    decks.forEach((deck) => {
      if (deck.id == deckId) {
        res.send(deck);
        return;
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

// Hämtar kort från vald ras för aktuell Hero
app.get("/deck/:hero/race/:race", async (req, res) => {
  try {
    const race = req.params.race;
    let raceCards = [];
    const listBuffer = await fs.readFile("./JSON/cards.json");
    const cards = JSON.parse(listBuffer);

    cards.forEach((card) => {
      if (
        card.type != "HERO" &&
        card.type != "HERO_POWER" &&
        card.type != "GAME_MODE_BUTTON" &&
        card.type != "ENCHANTMENT" &&
        card.cost != 0
      ) {
        if (card.hasOwnProperty("race")) {
          if (card.race === race) {
            if (!raceCards.includes(card.id)) {
              raceCards.push(card.id);
            }
          }
        }
      }
    });
    res.send(raceCards);
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

// Hämtar de raser som kan användas av vald hero
app.get("/deck/:hero/races", async (req, res) => {
  try {
    const hero = req.params.hero;
    let race = [];
    const listBuffer = await fs.readFile("./JSON/cards.json");
    const cards = JSON.parse(listBuffer);
    cards.forEach((card) => {
      if (card.hasOwnProperty("cardClass")) {
        if (card.cardClass == hero || card.cardClass == "NEUTRAL") {
          if (card.race != undefined) {
            race.push(card.race);
          }
        }
      }
    });
    race = [...new Set(race)];
    res.send(race);
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

// Hämtar kort som är unika för vald hero
app.get("/deck/:hero", async (req, res) => {
  try {
    const hero = req.params.hero;
    const listBuffer = await fs.readFile("./JSON/cards.json");
    const cards = JSON.parse(listBuffer);
    let herocards = [];
    cards.forEach((card) => {
      if (
        card.type != "HERO" &&
        card.type != "HERO_POWER" &&
        card.type != "GAME_MODE_BUTTON" &&
        card.type != "ENCHANTMENT" &&
        card.cost != 0
      ) {
        if (card.hasOwnProperty("cardClass")) {
          if (card.cardClass == hero) {
            if (!herocards.includes(card.id)) {
              herocards.push(card.id);
            }
          }
        }
      }
    });
    res.send(herocards);
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.listen(PORT, () => console.log("Server running on http://localhost:5000"));
