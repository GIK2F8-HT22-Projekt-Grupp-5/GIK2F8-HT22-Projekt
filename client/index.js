import * as fs from "fs/promises";
const fs = require("fs");

let mainElement = document.getElementById("root");

/* Byter innehållet mot deckbuilder komponetent som passar den klassen */
function heroSelecter(divChoice) {
  console.log(divChoice.id);
}

function renderMain() {
  mainElement.innerHTML = ``;
  mainElement.insertAdjacentHTML("beforeend", getMain());
}

function test() {
  // Requiring fs module in which
  // readFile function is defined.
  fs.readFile("../server/JSON/cards.json", (err, data) => {
    if (err) throw err;
    let testDat = JSON.parse(data);

    testDat.forEach((item) => {
      if (item.race) console.log(item.race);
    });
  });
}
test();
//renderMain();
