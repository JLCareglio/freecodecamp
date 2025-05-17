const API = {
  baseUrl: "https://rpg-creature-api.freecodecamp.rocks/api/",
  search: "creature/",
  baseImgUrl: "./assets/",
  allCreaturesTxt:
    "Pyrolynx,Aquoroc,Voltadon,Floraspine,Cryostag,Terradon,Emberapod,Lunaclaw,Quillquake,Mystifin,Dracilume,Thornaconda,Frostbyte,Graviboa,Zephyreon,Blazebore,Brontogale,Shadeelisk,Titanule,Faegis",
};

const creatureElements = {
  outputData: document.getElementById("output"),
  id: document.getElementById("creature-id"),
  name: document.getElementById("creature-name"),
  sprite: document.getElementById("creature-sprite"),
  special: {
    name: document.getElementById("special-name"),
    description: document.getElementById("special-description"),
  },
  types: document.getElementById("types"),
  physical: {
    height: document.getElementById("height"),
    weight: document.getElementById("weight"),
  },
  stats: {
    hp: document.getElementById("hp"),
    attack: document.getElementById("attack"),
    defense: document.getElementById("defense"),
    special_attack: document.getElementById("special-attack"),
    special_defense: document.getElementById("special-defense"),
    speed: document.getElementById("speed"),
  },
  randomCreaturesContainer: document.getElementById(
    "random-creatures-container"
  ),
  randomCreaturesGrid: document.getElementById("random-creatures-grid"),
};

const searchElements = {
  form: document.getElementById("search-form"),
  input: document.getElementById("search-input"),
  searchButton: document.getElementById("search-button"),
  luckyButton: document.getElementById("lucky-button"),
};

const searchCreature = async (query) => {
  try {
    const response = await fetch(
      `${API.baseUrl}${API.search}${query.toLowerCase()}`
    );

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Creature not found:", error);
    alert("Creature not found");
    return null;
  }
};

const getRandomCreature = async () => {
  const randomId = Math.floor(Math.random() * 20) + 1;
  return searchCreature(randomId);
};

const displayCreatureData = (creature) => {
  if (!creature) return;

  creatureElements.id.textContent = `#${creature.id}`;
  creatureElements.name.textContent = creature.name.toUpperCase();
  creatureElements.special.name.textContent = creature.special.name;
  creatureElements.special.description.textContent =
    creature.special.description;
  creatureElements.physical.height.textContent = `Height: ${creature.height}`;
  creatureElements.physical.weight.textContent = `Weight: ${creature.weight}`;

  creatureElements.types.innerHTML = "";
  creature.types.forEach((type) => {
    const typeElement = document.createElement("span");
    typeElement.textContent = type.name.toUpperCase();
    typeElement.classList.add("type", type.name.toLowerCase());
    creatureElements.types.appendChild(typeElement);
  });

  creature.stats.forEach((stat) => {
    const statElement = creatureElements.stats[stat.name.replace("-", "_")];
    if (statElement) statElement.textContent = stat.base_stat;
  });

  const imgSize = window.innerWidth === 338 ? "256px" : "512px";
  const imagePath = `${API.baseImgUrl}${creature.id
    .toString()
    .padStart(2, "0")}-${creature.name}-${imgSize}.png`;
  creatureElements.sprite.src = imagePath;
  creatureElements.sprite.alt = creature.name;
};

const handleSearch = async (event) => {
  if (event) event.preventDefault();

  const searchQuery = searchElements.input.value.trim();
  if (!searchQuery) return;

  creatureElements.outputData.style.display = "block";

  const creature = await searchCreature(searchQuery);
  if (creature) displayCreatureData(creature);
  else creatureElements.outputData.style.display = "none";
};

const showRandomCreatures = () => {
  const creatures = API.allCreaturesTxt.split(",");
  const numCreatures = Math.floor(Math.random() * 6) + 3;

  creatureElements.randomCreaturesGrid.innerHTML = "";

  const selectedCreatures = [];
  while (selectedCreatures.length < numCreatures) {
    const randomIndex = Math.floor(Math.random() * creatures.length);
    if (!selectedCreatures.includes(creatures[randomIndex]))
      selectedCreatures.push(creatures[randomIndex]);
  }

  selectedCreatures.forEach((creatureName) => {
    const index = creatures.indexOf(creatureName) + 1;
    const img = document.createElement("img");
    img.src = `${API.baseImgUrl}${index
      .toString()
      .padStart(2, "0")}-${creatureName}-256px.png`;
    img.alt = creatureName;
    img.setAttribute("data-id", index);
    img.addEventListener("click", () => {
      searchElements.input.value = index;
      handleSearch();
      creatureElements.randomCreaturesContainer.style.display = "none";
      creatureElements.outputData.scrollIntoView({ behavior: "smooth" });
    });
    creatureElements.randomCreaturesGrid.appendChild(img);
  });

  creatureElements.randomCreaturesContainer.style.display = "block";
  creatureElements.outputData.style.display = "none";
  creatureElements.randomCreaturesContainer.scrollIntoView({
    behavior: "smooth",
  });
};

searchElements.form.addEventListener("submit", handleSearch);
searchElements.luckyButton.addEventListener("click", showRandomCreatures);
