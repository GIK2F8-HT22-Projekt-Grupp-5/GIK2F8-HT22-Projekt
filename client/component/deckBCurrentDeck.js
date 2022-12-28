const currentDeck = { deckName: "TempDeck", cards: [] };

function deckBCurrentDeck() {
  html = `
        <!-- Flexbox 2.5 kort i nuvarande kortlek -->
      <div
        id="deckList" 
        class="justify-between bg-sky-900 bg-opacity-50 rounded-xl row-span-5 p-0 col-span-4 flex flex-col items-center">
        <div class="sticky top-0 ">
          <input 
          class=" bg-sky-900 bg-opacity-50 w-full rounded text-center text-sm break-all"
          type="text"
          value="${currentDeck.deckName}">
        </div>
        <ul
        class="bg-sky-900 bg-opacity-50 rounded-xl flex flex-col gap-2 items-center overflow-y-scroll">
  `;
  currentDeck.cards.forEach((card) => {
    html += `
          <li id="${card}"
              class="flex-1"
              onclick="removeCardCurrentDeck(this)">
              <img
                  src="https://art.hearthstonejson.com/v1/tiles/${card}.webp"
                  class="rounded-xl "/>
          </li>
    `;
  });

  html += `
          </ul>
          <button class="bg-sky-900 bg-opacity-50 rounded-xl text-sm break-all order-last">
          Save Current Deck</button>
        </div>  
      `;
  return html;
}
