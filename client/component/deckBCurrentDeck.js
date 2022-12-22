function deckBCurrentDeck(deckName) {
  html = `
        <!-- Flexbox 2.5 kort i nuvarande kortlek -->
        <div
        class="bg-sky-900 bg-opacity-50 rounded-xl row-span-5 border col-span-4 flex flex-col gap-2 items-center overflow-y-scroll"
        >
        <p class="sticky top-0">Current Deck</p>
        <img
            src="https://art.hearthstonejson.com/v1/tiles/SW_003.png"
            class="rounded-xl"
        />
        <img
            src="https://art.hearthstonejson.com/v1/tiles/SW_432.png"
            class="rounded-xl"
        />
        </div>`;
  return html;
}
