function deckBCards(hero) {
  html = `
    <!-- Flexbox 1.1 -->
    <ul
      class="row-span-3 col-span-10 border flex flex-row flex-wrap overflow-y-auto"
    >
      <li
        class="list-none inline-block w-1/4 flex items-center justify-center"
      >
        <img
          srcset="
            https://art.hearthstonejson.com/v1/render/latest/enUS/512x/AT_003.png
          "
          class="max-h-80"
        />
      </li>
    </ul>  
    `;
  return html;
}
