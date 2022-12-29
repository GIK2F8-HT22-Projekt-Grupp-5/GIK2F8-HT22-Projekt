const cardLocale = `enUS`;
const cardResolution = `512x`;
// let cardID = ``; //Behöver få id dynamiskt senare
const cardExt = `png`;
//const cardUrl = `https://art.hearthstonejson.com/v1/render/latest/${cardLocale}/${cardResolution}/${cardID}.${cardExt}`;
/* https://art.hearthstonejson.com/v1/render/latest/enUS/512x/AT_003.png */
/* https://art.hearthstonejson.com/v1/render/latest/{LOCALE}/{RESOLUTION}/{CARD_ID}.{EXT} */

//const cardSmallUrl = `https://art.hearthstonejson.com/v1/tiles/${cardID}.${cardExt}`;
/* https://art.hearthstonejson.com/v1/tiles/SW_003.png */

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

app.post("/deck/savedDecks/:hero", async (req, res) => {
  try {
    let hero = req.body.hero;
    const heroDecks = [];
    //console.log("saved decks:", hero);
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

app.post("/deck/search", async (req, res) => {
  try {
    let searchCards = [];
    let searchWords = req.body.searchString;
    searchWords = searchWords.toLowerCase();
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

app.post("/deck/deckId/:id", async (req, res) => {
  try {
    const deckId = req.body.id;
    const listBuffer = await fs.readFile("./JSON/decks.json");
    const decks = JSON.parse(listBuffer);
    decks.forEach((deck) => {
      if (deck.id == deckId) 
      {
        res.send(deck);
        return;
      }
    });
    
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});


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

app.post("/deck", async (req, res) => {
  try {
    const body = req.body;
    const listBuffer = await fs.readFile("./JSON/decks.json");
    const currentDecks = JSON.parse(listBuffer);

    // sätter id
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
      deckName: body[0],
      class: body[1],
      cards: body[2],
    };
    const deckList = currentDecks ? [...currentDecks, newDeck] : [newDeck];
    await fs.writeFile("./JSON/decks.json", JSON.stringify(deckList));

    res.send(`Deck ${body[0]} saved`);
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

app.patch("/deck/:id", async (req, res) => {
  const id = req.params.id;
  try {
    /*const listBuffer = await fs.readFile("./tasks.json");
      const currentTasks = JSON.parse(listBuffer);

      currentTasks.forEach(task => {
          if(task.id == id && task.completed == false){
              task.completed = true;
          } 
          else if(task.id == id && task.completed == true){
              task.completed = false;
          }
      });
      
      await fs.writeFile('./tasks.json',JSON.stringify(currentTasks));*/
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }

  res.send({ messege: `Uppgiften med id: ${id} uppdaterades` });
});

app.delete("/deck/:id", async (req, res) => {
  /*localhost:5000/task/id*/
  /* const id = req.params.id;*/
  try {
    /*const listBuffer = await fs.readFile("./tasks.json");
        const currentTasks = JSON.parse(listBuffer);
        if (currentTasks.length > 0) {
            await fs.writeFile("./tasks.json",JSON.stringify(currentTasks.filter(task => task.id != id )));
            res.send({messege:`Uppgiften med id: ${id} togs bort`});
        }
        else{
            res.status(404).send({error: 'Ingen uppgift att ta bort'});
        }*/
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.listen(PORT, () => console.log("Server running on http://localhost:5000"));
