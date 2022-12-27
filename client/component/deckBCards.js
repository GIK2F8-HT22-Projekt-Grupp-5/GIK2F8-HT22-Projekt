function deckBCards(cardIds) {
  //console.log(cardIds);
  let html = `
    <!-- Flexbox 1.1 -->
    <ul
      class="row-span-3 col-span-10 border flex flex-row flex-wrap overflow-y-auto">`;
  cardIds.forEach((id) => {
    html += `
      <li
      class="list-none inline-block w-1/4 flex items-center justify-center ">
      <img
        srcset="
          https://art.hearthstonejson.com/v1/render/latest/enUS/512x/${id}.png
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
// try {
//   const request = new Request(
//     `https://art.hearthstonejson.com/v1/render/latest/enUS/512x/${id}.png`,
//     {
//       method: "GET",
//     }
//   );
//   fetch(request)
//     .then((result) => result.json())
//     .then(
//       (html += `
//   <li
//   class="list-none inline-block w-1/4 flex items-center justify-center">
//   <img
//     srcset="
//       https://art.hearthstonejson.com/v1/render/latest/enUS/512x/${id}.png
//     "
//     class="max-h-80"
//   />
// </li>
//   `)
//     );
//.catch((err) => console.log("fel bild"));
//} catch {}
