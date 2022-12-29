function deckB(hero) {
  let hmtl = `
  <section
  class="w-4/5 h-4/5 relative z-30 p-5 text-2xl text-white bg-sky-400 bg-opacity-50 rounded-xl"
>
  <!-- Main Grid -->
  <section
    class="w-auto h-full grid grid-rows-2 grid-cols-1 grid-flow-col gap-4"
  >
    <!-- Grid 1 main -->
    <section id="cardCanvas" class="grid grid-rows-1 grid-cols-1 grid-flow-col"></section>

    <!-- Grid 2 main -->
    <section
      id="buttonList"
      class="grid grid-rows-1 grid-cols-1 grid-flow-col 
             grid grid-rows-5 grid-cols-4 grid-flow-col gap-1"
    >
      <!-- Grid 2.2  Search Card-->
      <div
        class=" bg-sky-900 bg-opacity-50 rounded-xl row-span-1 col-span-3 text-center pb-8">
          <form
            name="search" 
            class="grid grid-rows-1 grid-cols-1 mb-2"
            onsubmit="searchCard(event)"
          >
            <label class="text-sm break-all row-span-1 col-span-1" 
                   for="searchField">
                   Ange kortets namn:
            </label>
            <input class="bg-sky-900 bg-opacity-50 w-1/2 mx-auto rounded row-span-1 col-span-1 text-black" 
                          id="searchField" 
                          type="search"            
            />
          </form>
        </div>
      </div>
      <!-- Grid 2.3 Logga class-->
      <div
      id="classLogo" 
      class="row-span-1 col-span-1 flex flex-row gap-2 justify-between">
        <img src="http://localhost:5000/images/back.png" 
             class="object-scale-down w-16 order-last"
             onclick="renderMain()">
             <img id="classHero" src="http://localhost:5000/images/${hero.toLowerCase()}.webp"
             class="object-scale-down w-16"
             onclick="loadClassCardsIntoCanvas(this)">
       
      </div>
      <div id="prevDecksContainer" class="row-span-1 col-span-2 ">
      </div>
    </section>
  </section>
</section>
  `;
  return hmtl;
}
