function getMain() {
  let hmtl = `
<section
        class="relative z-30 p-5 text-2xl text-white bg-sky-400 bg-opacity-50 rounded-xl"
      >
        <section
          class="grid auto-cols-max auto-rows-max grid-cols-5 gap-2 text-center"
        >
          <div id="DEATHKNIGHT" onclick="heroSelecter(this)">
            <img src="./image/death.webp" />Death Knight
          </div>
          <div id="DEMONHUNTER" onclick="heroSelecter(this)">
            <img src="./image/demonhunter.webp" />Demon Hunter
          </div>
          <div id="DRUID" onclick="heroSelecter(this)">
            <img src="./image/driud.webp" />Druid
          </div>
          <div id="HUNTER" onclick="heroSelecter(this)">
            <img src="./image/hunter.webp" />Hunter
          </div>
          <div id="MAGE" onclick="heroSelecter(this)">
            <img src="./image/mage.webp" />Mage
          </div>
          <div></div>
          <div></div>
          <div id="PALADIN" onclick="heroSelecter(this)">
            <img src="./image/paladin.webp" />Paladin
          </div>
          <div></div>
          <div></div>
          <div id="PRIEST" onclick="heroSelecter(this)">
            <img src="./image/priest.webp" />Priest
          </div>
          <div id="ROGUE" onclick="heroSelecter(this)">
            <img src="./image/rog.webp" />Rogue
          </div>
          <div id="SHAMAN" onclick="heroSelecter(this)">
            <img src="./image/shaman.webp" />Shaman
          </div>
          <div id="WARLOCK" onclick="heroSelecter(this)">
            <img src="./image/warlock.webp" />Warlock
          </div>
          <div id="WARRIOR" onclick="heroSelecter(this)">
            <img src="./image/warrior.webp" />Warrior
          </div>
        </section>
      </section>
`;
  return hmtl;
}
