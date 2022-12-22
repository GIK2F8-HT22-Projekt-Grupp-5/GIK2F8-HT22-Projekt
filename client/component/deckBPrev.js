function deckBprev(hero) {
  html = `
        <!-- Flexbox ul/li 2.4 Tidigare kortlekar -->
        <ul
        class="row-span-1 border col-span-2 border flex flex-row flex-wrap overflow-y-auto gap-0.5"
        >
        <li
            class="bg-sky-900 bg-opacity-50 rounded-xl flex grow w-1/5 items-center justify-center"
        >
            1
        </li>
        <li
            class="bg-sky-900 bg-opacity-50 rounded-xl flex grow w-1/5 items-center justify-center"
        >
        </ul>
  `;
  return html;
}
