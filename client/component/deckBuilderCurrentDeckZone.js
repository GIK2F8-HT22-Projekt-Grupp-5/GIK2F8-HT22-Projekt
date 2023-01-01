function deckBuilderCurrentDeckZone(incomingDeck) {
  let deckName = "New deck";
  let deck = [];
  let id = -1;
  //console.log("inc", incomingDeck);
  // if (incomingDeck.hasOwnProperty("id")) {
  //   console.log("if");
  // } else {
  //   console.log("else");
  // }

  if (incomingDeck === undefined) {
    // The global undefined property represents the primitive value undefined. It is one of JavaScript's primitive types.
  } else {
    if (incomingDeck.hasOwnProperty("cards")) {
      deck = incomingDeck.cards;
      deckName = incomingDeck.deckName;
    }
    if (incomingDeck.hasOwnProperty("id")) {
      id = incomingDeck.id;
      //console.log("h", id);
    } else {
      deck = incomingDeck;
    }
  }

  html = `
  <form
  id="deckBuild" 
  class="justify-between bg-sky-900 bg-opacity-50 rounded-xl 
  row-span-5 p-0 col-span-4 flex flex-col items-center"
  name="`;
  if (id === -1) {
    html += `-1`;
  } else {
    html += `${id}`;
  }
  html += `"
  onsubmit="deckBuilderCurrentDeckZoneManageDeckButton(event)"
  >
  <!-- Flexbox 2.5 kort i nuvarande kortlek -->
          <div class="sticky top-0 ">
            <input
            id="deckBuildName"
            class=" bg-sky-900 bg-opacity-50 w-full rounded text-center text-sm break-all"
            type="text"
            value="${deckName}">
          </div>
          <ul
            id="deckBuildList"
            class="bg-sky-900 bg-opacity-50 rounded-xl flex flex-col gap-2 items-center overflow-y-scroll"
          >
  `;
  if (deck.length > 0) {
    deck.forEach((card) => {
      html += `
          <li id="${card}"
              class="flex-1"
              onclick="removeCardFromCurrentDeckList(this)">
              <img
                  src="https://art.hearthstonejson.com/v1/tiles/${card}.webp"
                  class="rounded-xl "
              />
          </li>
    `;
    });
  }
  html += `
          </ul>
          <div flex flex-row>
            <button class="flex grow bg-sky-900 bg-opacity-50 rounded-xl 
            text-sm break-all"
            type="button"
            onclick="startNewDeck()"
            name="NewButton">
            New Deck</button>

            <button class="flex grow bg-sky-900 bg-opacity-50 rounded-xl 
            text-sm break-all"
            type="submit"
            name="submitButton">
            Save Current Deck</button>

            <button class="flex grow bg-sky-900 bg-opacity-50 rounded-xl 
            text-sm break-all"
            type="button"
            onclick="deleteDeck()"
            name="DelButton">
            Delete Deck</button>
          </div>
        </form>  
      `;
  return html;
}
