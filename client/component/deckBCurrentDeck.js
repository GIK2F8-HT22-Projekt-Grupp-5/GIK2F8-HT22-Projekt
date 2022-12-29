function deckBCurrentDeck(incomingDeck) {
  let deckName = "New deck";
  let deck = [];
  if (incomingDeck === undefined) {
    // The global undefined property represents the primitive value undefined. It is one of JavaScript's primitive types.
  } else if (incomingDeck.hasOwnProperty("cards")) {
    deck = incomingDeck.cards;
    deckName = incomingDeck.deckName;
    console.log(deck);
  } else {
    deck = incomingDeck;
  }
  html = `
  <form
  id="deckBuild" 
  class="justify-between bg-sky-900 bg-opacity-50 rounded-xl 
  row-span-5 p-0 col-span-4 flex flex-col items-center"
  name="save"
  onsubmit="cardCurrentDeckManageDeckButton(event)"
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
          <button class="bg-sky-900 bg-opacity-50 rounded-xl 
                         text-sm break-all order-last"
                  type="submit"
                  name="submitButton"   
          >
          Save Current Deck</button>
        </form>  
      `;
  return html;
}
