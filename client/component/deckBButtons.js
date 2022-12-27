function deckBButtons(hero, races) {
  html = `
  <!-- Grid 2.1  Button for Class -->
        <div
        class="row-span-3 col-span-3 grid grid-rows-3 grid-cols-6 text-center gap-1 p-1 "
      >`;
  races.forEach((race) => {
    html += `<button id="${race}-${hero}"
    class="text-sm break-all bg-sky-900 bg-opacity-50 rounded-xl flex grow justify-center items-center "
    type="button" onclick="raceClick(this)"
  >
    ${race}
  </button>`;
  });

  return html;
}
