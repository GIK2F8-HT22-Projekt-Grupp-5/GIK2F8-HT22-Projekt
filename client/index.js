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
  const fs = require("fs");
  fs.readFile("Input.txt", (err, data) => {
    if (err) throw err;
    let testDat = JSON.parse(data);
    
    if (testDat.race ) 


  });
}
//renderMain();
