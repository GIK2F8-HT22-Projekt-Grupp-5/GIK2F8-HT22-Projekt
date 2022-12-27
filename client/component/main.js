function getMain() {
  let hmtl = `
<section
        class="relative z-30 p-5 text-2xl text-white bg-sky-400 bg-opacity-50 rounded-xl"
      >
        <section
          class=" text-sm break-all grid auto-cols-max auto-rows-max grid-cols-5 gap-2 text-center"
        >
          <div id="DEATHKNIGHT" onclick="heroSelecter(this)">
            <img src="http://localhost:5000/images/deathknight.webp" />Death Knight
          </div>
          
          <div id="DEMONHUNTER" onclick="heroSelecter(this)">
            <img src="http://localhost:5000/images/demonhunter.webp" />Demon Hunter
          </div>
          <div id="DRUID" onclick="heroSelecter(this)">
            <img src="http://localhost:5000/images/druid.webp" />Druid
          </div>
          <div id="HUNTER" onclick="heroSelecter(this)">
            <img src="http://localhost:5000/images/hunter.webp" />Hunter
          </div>
          <div id="MAGE" onclick="heroSelecter(this)">
            <img src="http://localhost:5000/images/mage.webp" />Mage
          </div>
          <div></div>
          <div></div>
          <div id="PALADIN" onclick="heroSelecter(this)">
            <img src="http://localhost:5000/images/paladin.webp" />Paladin
          </div>
          <div></div>
          <div></div>
          <div id="PRIEST" onclick="heroSelecter(this)">
            <img src="http://localhost:5000/images/priest.webp" />Priest
          </div>
          <div id="ROGUE" onclick="heroSelecter(this)">
            <img src="http://localhost:5000/images/rogue.webp" />Rogue
          </div>
          <div id="SHAMAN" onclick="heroSelecter(this)">
            <img src="http://localhost:5000/images/shaman.webp" />Shaman
          </div>
          <div id="WARLOCK" onclick="heroSelecter(this)">
            <img src="http://localhost:5000/images/warlock.webp" />Warlock
          </div>
          <div id="WARRIOR" onclick="heroSelecter(this)">
            <img src="http://localhost:5000/images/warrior.webp" />Warrior
          </div>
        </section>
      </section>
`;
  return hmtl;
}
