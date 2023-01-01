function deckBuilderPreviousDeckZone(deckNames) {
  html = `
        <!-- Flexbox ul/li 2.4 Tidigare kortlekar -->
        <ul
        class="flex flex-row flex-wrap  gap-0.5 h-full overflow-x-scroll "
        id="bajs"
        
        >`;
        if (deckNames.length >0)
        {
          deckNames.forEach((deck) => {
            html += `<li 
                    
                    
                    class="text-sm  bg-sky-900 bg-opacity-50 rounded-xl flex grow items-center justify-center">
                    <button id="${deck[1]}" onclick="loadPreviousDeckToDeckBuilderCurrentDeckZone(this)">${deck[0]}</button>
                </li>`;
          });
        }
  

  html += `</ul>`;
  return html;
}
