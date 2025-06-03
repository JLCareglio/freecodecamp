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
  loadingContainer: document.querySelector(".loading-container"),
  errorContainer: document.querySelector(".error-container"),
};

const searchElements = {
  form: document.getElementById("search-form"),
  input: document.getElementById("search-input"),
  searchButton: document.getElementById("search-button"),
  luckyButton: document.getElementById("lucky-button"),
};

const statRanges = {
  hp: { min: 55, max: 130, low: 70, high: 100, optimum: 130 },
  attack: { min: 50, max: 120, low: 70, high: 100, optimum: 120 },
  defense: { min: 50, max: 140, low: 70, high: 100, optimum: 140 },
  "special-attack": { min: 50, max: 120, low: 70, high: 100, optimum: 120 },
  "special-defense": { min: 55, max: 115, low: 70, high: 100, optimum: 115 },
  speed: { min: 30, max: 125, low: 60, high: 100, optimum: 125 },
};

const creature404 = {
  id: 404,
  name: "Unknown Creature",
  special: {
    name: "???",
    description: "This mysterious creature's abilities remain unknown.",
  },
  height: "???",
  weight: "???",
  types: [{ name: "unknown" }],
  stats: [
    { name: "hp", base_stat: "?" },
    { name: "attack", base_stat: "?" },
    { name: "defense", base_stat: "?" },
    { name: "special-attack", base_stat: "?" },
    { name: "special-defense", base_stat: "?" },
    { name: "speed", base_stat: "?" },
  ],
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
    // alert("Creature not found");
    return null;
  }
};

const updateCreatureStat = (stat, statRanges) => {
  const { name, base_stat } = stat;
  const statName = name.replace("-", "_");

  const statElement = creatureElements.stats[statName];
  if (statElement) statElement.textContent = base_stat;

  const meterElement = document.getElementById(`${name}-meter`);
  if (meterElement) {
    meterElement.value = base_stat;

    const range = statRanges[name];
    if (range) {
      const { min, max, low, high, optimum } = range;
      Object.assign(meterElement, { min, max, low, high, optimum });
    }
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

  creature.stats.forEach((stat) => updateCreatureStat(stat, statRanges));

  const imgSize = window.innerWidth === 338 ? "256px" : "512px";
  const imagePath = `${API.baseImgUrl}${creature.id
    .toString()
    .padStart(2, "0")}-${creature.name}-${imgSize}.png`;

  creatureElements.sprite.src = "";
  creatureElements.sprite.classList.add("loading-image");
  creatureElements.sprite.src = imagePath;
  creatureElements.sprite.alt = creature.name;

  creatureElements.sprite.onload = () =>
    creatureElements.sprite.classList.remove("loading-image");

  creatureElements.sprite.onerror = () => {
    creatureElements.sprite.classList.remove("loading-image");
    creatureElements.sprite.src = `${API.baseImgUrl}404.png`;
    creatureElements.sprite.alt = "Image not found";
  };
};

const handleSearch = async (event) => {
  if (event) event.preventDefault();

  const searchQuery = searchElements.input.value.trim();
  if (!searchQuery) return;

  creatureElements.outputData.style.display = "none";
  creatureElements.errorContainer.style.display = "none";
  creatureElements.loadingContainer.style.display = "flex";
  creatureElements.loadingContainer.scrollIntoView({ behavior: "smooth" });
  creatureElements.randomCreaturesContainer.style.display = "none";

  if (searchQuery == 404) {
    creatureElements.loadingContainer.style.display = "none";
    displayCreatureData(creature404);
    creatureElements.outputData.style.display = "block";
    creatureElements.outputData.scrollIntoView({ behavior: "smooth" });
    return;
  }

  try {
    const creature = await searchCreature(searchQuery);

    creatureElements.loadingContainer.style.display = "none";

    if (creature) {
      displayCreatureData(creature);
      creatureElements.outputData.style.display = "block";
      creatureElements.outputData.scrollIntoView({ behavior: "smooth" });
    } else creatureElements.errorContainer.style.display = "flex";
  } catch (error) {
    creatureElements.errorContainer.style.display = "flex";
    creatureElements.errorContainer.scrollIntoView({ behavior: "smooth" });
    console.error("Error: ", error);
  }
};

const showRandomCreatures = () => {
  const creatures = API.allCreaturesTxt.split(",");
  const numCreatures = Math.floor(Math.random() * 6) + 3;

  creatureElements.outputData.style.display = "none";
  creatureElements.errorContainer.style.display = "none";
  creatureElements.loadingContainer.style.display = "flex";

  creatureElements.randomCreaturesGrid.innerHTML = "";

  const selectedCreatures = [];
  while (selectedCreatures.length < numCreatures) {
    const randomIndex = Math.floor(Math.random() * creatures.length);
    if (!selectedCreatures.includes(creatures[randomIndex]))
      selectedCreatures.push(creatures[randomIndex]);
  }

  let loadedImages = 0;
  const totalImages = selectedCreatures.length;

  selectedCreatures.forEach((creatureName) => {
    const index = creatures.indexOf(creatureName) + 1;
    const img = document.createElement("img");
    img.classList.add("loading-image");
    img.src = `${API.baseImgUrl}${index
      .toString()
      .padStart(2, "0")}-${creatureName}-256px.png`;
    img.alt = creatureName;
    img.setAttribute("data-id", index);

    img.onload = () => {
      img.classList.remove("loading-image");
      loadedImages++;

      if (loadedImages === totalImages)
        creatureElements.loadingContainer.style.display = "none";
    };

    img.onerror = () => {
      img.classList.remove("loading-image");
      img.src = `${API.baseImgUrl}404.png`;
      loadedImages++;

      if (loadedImages === totalImages)
        creatureElements.loadingContainer.style.display = "none";
    };

    img.addEventListener("click", () => {
      searchElements.input.value = index;
      handleSearch();
      creatureElements.randomCreaturesContainer.style.display = "none";
    });

    creatureElements.randomCreaturesGrid.appendChild(img);
  });

  creatureElements.randomCreaturesContainer.style.display = "block";
  creatureElements.randomCreaturesContainer.scrollIntoView({
    behavior: "smooth",
  });
};

searchElements.form.addEventListener("submit", handleSearch);
searchElements.luckyButton.addEventListener("click", showRandomCreatures);
