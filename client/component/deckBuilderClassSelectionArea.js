function deckBuilderClassSelectionArea() {
  let hmtl = `

<section
        class="relative z-30 p-5 text-2xl text-white bg-sky-400 bg-opacity-50 rounded-xl"
      >
        <section
          class="text-sm break-all grid auto-cols-max auto-rows-max grid-cols-5 gap-2 text-center"
        >
          <div id="DEATHKNIGHT"
               class="w-24" 
               onclick="loadDeckBuilderDeckAssemblingAreaWithHero(this)">
            <img src="http://localhost:5000/images/deathknight.webp" />Death Knight
          </div>
          
          <div id="DEMONHUNTER"
               class="w-24" 
               onclick="loadDeckBuilderDeckAssemblingAreaWithHero(this)">
            <img src="http://localhost:5000/images/demonhunter.webp" />Demon Hunter
          </div>
          <div id="DRUID"
               class="w-24" 
               onclick="loadDeckBuilderDeckAssemblingAreaWithHero(this)">
            <img src="http://localhost:5000/images/druid.webp" />Druid
          </div>
          <div id="HUNTER"
               class="w-24"  
               onclick="loadDeckBuilderDeckAssemblingAreaWithHero(this)">
            <img src="http://localhost:5000/images/hunter.webp" />Hunter
          </div>
          <div id="MAGE"
               class="w-24"  
               onclick="loadDeckBuilderDeckAssemblingAreaWithHero(this)">
            <img src="http://localhost:5000/images/mage.webp" />Mage
          </div>
          <div></div>
          <div></div>
          <div id="PALADIN"
               class="w-24" 
               onclick="loadDeckBuilderDeckAssemblingAreaWithHero(this)">
            <img src="http://localhost:5000/images/paladin.webp" />Paladin
          </div>
          <div></div>
          <div></div>
          <div id="PRIEST"
               class="w-24" 
               onclick="loadDeckBuilderDeckAssemblingAreaWithHero(this)">
            <img src="http://localhost:5000/images/priest.webp" />Priest
          </div>
          <div id="ROGUE"
               class="w-24" 
               onclick="loadDeckBuilderDeckAssemblingAreaWithHero(this)">
            <img src="http://localhost:5000/images/rogue.webp" />Rogue
          </div>
          <div id="SHAMAN" 
               class="w-24" 
               onclick="loadDeckBuilderDeckAssemblingAreaWithHero(this)">
            <img src="http://localhost:5000/images/shaman.webp" />Shaman
          </div>
          <div id="WARLOCK"
               class="w-24"
               onclick="loadDeckBuilderDeckAssemblingAreaWithHero(this)">
            <img src="http://localhost:5000/images/warlock.webp" />Warlock
          </div>
          <div id="WARRIOR"
               class="w-24"
               onclick="loadDeckBuilderDeckAssemblingAreaWithHero(this)">
            <img src="http://localhost:5000/images/warrior.webp" />Warrior
          </div>
        </section>
      </section>
`;
  return hmtl;
}
