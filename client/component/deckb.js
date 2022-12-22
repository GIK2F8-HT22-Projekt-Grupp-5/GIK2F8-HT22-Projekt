function deckB() {
  hmtl = `
        <section
            class="w-4/5 h-4/5 relative z-30 p-5 text-2xl text-white bg-sky-400 bg-opacity-50 rounded-xl"
            >
            <!-- Main Grid -->
            <section
                class="w-auto h-full grid grid-rows-2 grid-cols-1 grid-flow-col gap-4"
            >
                <!-- Grid 1 main -->
                <section class="grid grid-rows-1 grid-cols-1 grid-flow-col"></section>

                <!-- Grid 2 main -->
                <section
                class="grid grid-rows-1 grid-cols-1 grid-flow-col grid grid-rows-5 grid-cols-4 grid-flow-col gap-1"
                >
                <!-- Grid 2.2  Search Card-->
                <div
                    class="bg-sky-900 bg-opacity-50 rounded-xl row-span-1 border col-span-3 grid grid-rows-1 grid-cols-1 text-center pb-8"
                >
                    <div>
                    Search Card
                    <form class="">
                        <input class="" type="search" />
                    </form>
                    </div>
                </div>
                <!-- Grid 2.3 Logga class-->
                <div class="row-span-1 col-span-1 flex justify-start border gap-2">
                    <img src="image/mage.webp" class="object-scale-down w-16" />
                </div>
                </section>
            </section>
        </section>
`;
  return html;
}
