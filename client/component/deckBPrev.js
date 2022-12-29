function deckBprev(deckNames) {
  html = `
        <!-- Flexbox ul/li 2.4 Tidigare kortlekar -->
        <ul
        class="flex flex-row flex-wrap  gap-0.5 h-full overflow-x-scroll "
        id="bajs"
        
        >`;
  deckNames.forEach((deck) => {
    html += `<li 
            
            
            class="bg-sky-900 bg-opacity-50 rounded-xl flex grow items-center justify-center">
            <button id="${deck[1]}" onclick="loadPrevDeck(this)">${deck[0]}</button>
        </li>`;
  });

  html += `</ul>`;
  return html;
}
