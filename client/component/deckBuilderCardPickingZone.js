function deckBuilderCardPickingZone(cardIds) {
  let html = `
    <!-- Flexbox 1.1 -->
    <ul
      class="row-span-3 col-span-10  flex flex-row flex-wrap overflow-y-auto">`;
  cardIds.forEach((id) => {
    html += `
      <li
      id="${id}"
      class="list-none inline-block w-1/4 flex items-center justify-center "
      onclick="addCardToCurrentDeckList(this)">
      <img
        src="
          https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${id}.png
        "
        class="max-h-80"
      />
    </li>
      `;
  });

  html += `</ul>  
    `;

  return html;
}
