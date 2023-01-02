function deckBuilderCurrentDeckZone(incomingDeck) {
  let deckName = "New deck";
  let deck = [];
  let id = -1;

  if (incomingDeck === undefined) {
  } else {
    if (incomingDeck.hasOwnProperty("cards")) {
      deck = incomingDeck.cards;
      deckName = incomingDeck.deckName;
    }
    if (incomingDeck.hasOwnProperty("id")) {
      id = incomingDeck.id;
    } else {
      deck = incomingDeck;
    }
  }

  html = `
  <form
  id="deckBuild" 
  class="justify-between bg-sky-900 bg-opacity-50 rounded-xl 
  row-span-5 col-span-1 flex flex-col"
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
          
            <input
            id="deckBuildName"
            class="bg-sky-900 bg-opacity-50 rounded text-center text-sm"
            type="text"
            value="${deckName}">
          
          <ul
            id="deckBuildList"
            class="bg-sky-900 bg-opacity-50 rounded-xl flex flex-col gap-2 items-center overflow-y-scroll"
          >
  `;
  if (deck.length > 0) {
    deck.forEach((card) => {
      html += `
          <li id="${card}"
              class=""
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
          <div class="flex flex-row gap-1 items-center justify-center">
            <button class="flex grow bg-sky-900 bg-opacity-50 rounded-xl 
            text-sm break-all  items-center justify-center p-2"
            type="button"
            onclick="startNewDeck()"
            name="NewButton">
            New</button>

            <button class="flex grow bg-sky-900 bg-opacity-50 rounded-xl 
            text-sm break-all items-center justify-center p-2" 
            type="submit"
            name="submitButton">
            Save</button>

            <button class="flex grow  bg-sky-900 bg-opacity-50 rounded-xl 
            text-sm break-all items-center justify-center p-2"
            type="button"
            onclick="deleteDeck()"
            name="DelButton">
            Delete</button>
          </div>
        </form>  
      `;
  return html;
}
