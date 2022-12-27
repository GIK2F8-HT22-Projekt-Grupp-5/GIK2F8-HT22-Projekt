function deckBCurrentDeck(deckName) {
  html = `
        <!-- Flexbox 2.5 kort i nuvarande kortlek -->
      <div class="justify-between bg-sky-900 bg-opacity-50 rounded-xl row-span-5 p-0 col-span-4 flex flex-col items-center">
        <div class="sticky top-0 ">
          <input 
          class=" bg-sky-900 bg-opacity-0 w-full rounded text-center text-sm break-all"
          type="text"
          value="Current Deck">
        </div>
        <ul
        class="bg-sky-900 bg-opacity-50 rounded-xl flex flex-col gap-2 items-center overflow-y-scroll"
        >
          <li class="flex-1">
              <img
                  src="https://art.hearthstonejson.com/v1/tiles/SW_003.webp"
                  class="rounded-xl "/>
          </li>
          <li class="flex-1">    
            <img
                src="https://art.hearthstonejson.com/v1/tiles/SW_432.webp"
                class="rounded-xl"/>
          </li>
        </ul>
        <button class="text-sm break-all order-last">Save Current Deck</button>
      </div>  `;
  return html;
}
