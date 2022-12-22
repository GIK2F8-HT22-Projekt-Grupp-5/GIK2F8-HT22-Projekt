let mainElement = document.getElementById("root");

/* Byter innehållet mot deckbuilder komponetent som passar den klassen */
function heroSelecter(divChoice) {
  console.log(divChoice.id);
}

function renderMain() {
  mainElement.innerHTML = ``;
  mainElement.insertAdjacentHTML("beforeend", getMain());
}

renderMain();
