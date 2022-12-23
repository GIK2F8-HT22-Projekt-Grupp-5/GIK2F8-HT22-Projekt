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
const { json } = require("express");
const express = require("express");
const app = express();
const fs = require("fs/promises");

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

app.get("/deck/:hero", async (req, res) => {
  try {
    const hero = req.params.hero;
    console.log("Server har fått från Api ->", hero);
    const listBuffer = await fs.readFile("./JSON/cards.json");
    const cards = JSON.parse(listBuffer);
    console.log(cards);

    let race = [];
    let race2 = [];
    // Loopar igenom varje element i listan "test"
    for (const item of cards) {
      // Loopar igenom varje nyckel/värde-par i elementet
      for (const [key, value] of Object.entries(item)) {
        // Kontrollerar om elementet har en nyckel med namnet "cardClass"
        // Eller om värdet på "cardClass"-nyckeln är "NEUTRAL"
        if ("cardClass" in item && item["cardClass"] === hero) {
          // Kontrollerar om värdet på "cardClass"-nyckeln är "WARRIOR"
          // Kontrollerar om aktuell nyckel är "race"
          if (key === "name") {
            //   // Lägger till värdet på "race"-nyckeln till listan "race"
            race.push(item["id"]);
          }
        }
      }
    }
    // Loopar igenom varje element i listan "test"
    for (const item of cards) {
      // Loopar igenom varje nyckel/värde-par i elementet
      for (const [key, value] of Object.entries(item)) {
        // Kontrollerar om elementet har en nyckel med namnet "cardClass"
        // Eller om värdet på "cardClass"-nyckeln är "NEUTRAL"
        if ("cardClass" in item && item["cardClass"] === "NEUTRAL") {
          // Kontrollerar om värdet på "cardClass"-nyckeln är "WARRIOR"
          // Kontrollerar om aktuell nyckel är "race"
          if (key === "name") {
            //   // Lägger till värdet på "race"-nyckeln till listan "race"
            race2.push(item["id"]);
          }
        }
      }
    }
    // console.log(race);
    console.log(race.length);

    // console.log(race2);
    console.log(race2.length);

    let bigList = race.concat(race2);
    console.log(bigList.length);

    res.status(425).send(JSON.parse("Hejhopp"));
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

app.post("/deck", async (req, res) => {
  try {
    /*const task = req.body;
        const listBuffer = await fs.readFile("./tasks.json");
        const currentTasks = JSON.parse(listBuffer);
        let nextTaskId = 1;
        if (currentTasks && currentTasks.length > 0) {
            nextTaskId = currentTasks.reduce((maxId, currentElement) => currentElement.id > maxId ? currentElement.id : maxId,
            nextTaskId
            );
            nextTaskId++;
        }
        */
    /*const nextTask = {id: nextTaskId, ...task};
        const taskList = currentTasks ? [...currentTasks, nextTask] : [nextTask];*/

    /*await fs.writeFile('./tasks.json',JSON.stringify(taskList));*/

    res.send("Hej hopp");
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
