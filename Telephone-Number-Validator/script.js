// START freeCodeCamp exercises

function checkNumber() {
  const number = document.getElementById("user-input").value;
  const resultList = document.getElementById("results-div");
  const clearBtn = document.getElementById("clear-btn");

  if (!number) {
    alert(translations[currentLanguage].emptyInput);
    return;
  }

  const isValid = telephoneCheck(number);
  const message = isValid
    ? translations[currentLanguage].isValidNumber.replace("${text}", number)
    : translations[currentLanguage].notValidNumber.replace("${text}", number);

  const numberItem = document.createElement("div");
  numberItem.className = `number-item ${
    isValid ? "is-valid-number" : "not-valid-number"
  }`;
  numberItem.textContent = message;

  resultList.insertBefore(numberItem, resultList.firstChild);
  document.getElementById("user-input").value = "";
  clearBtn.disabled = false;
}

function clearList() {
  const resultList = document.getElementById("results-div");
  const clearBtn = document.getElementById("clear-btn");

  resultList.innerHTML = "";
  clearBtn.disabled = true;
}

const telephoneCheck = (str) =>
  /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/.test(str);

// END freeCodeCamp exercises

let currentLanguage = "en";
let currentTheme = localStorage.getItem("theme") || "dark";

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  currentTheme = theme;
  localStorage.setItem("theme", theme);
  updateThemeButton();
}

function updateThemeButton() {
  const themeIcon = document.getElementById("theme-icon");
  themeIcon.textContent = currentTheme === "dark" ? "🌙" : "☀️";
}

function toggleTheme() {
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

function detectLanguage() {
  const userLang = navigator.language || navigator.userLanguage;
  const langCode = userLang.split("-")[0];
  return translations[langCode] ? langCode : "en";
}

function updateTexts() {
  document.getElementById("language-selector").value = currentLanguage;
  document.title = translations[currentLanguage].title;
  document.getElementById("title").textContent =
    translations[currentLanguage].title;
  document.getElementById("phone-label").textContent =
    translations[currentLanguage].phoneLabel;
  document.getElementById("check-btn").textContent =
    translations[currentLanguage].checkButton;
  document.getElementById("clear-btn").textContent =
    translations[currentLanguage].clearButton;

  const resultList = document.getElementById("results-div");
  const numberItems = resultList.getElementsByClassName("number-item");

  Array.from(numberItems).forEach((item) => {
    const number = item.textContent.match(/[：:]\s*(.+)$/)[1];
    const isValid = item.classList.contains("is-valid-number");
    const message = isValid
      ? translations[currentLanguage].isValidNumber.replace("${text}", number)
      : translations[currentLanguage].notValidNumber.replace("${text}", number);
    item.textContent = message;
  });

  document.getElementById("dev-by").textContent =
    translations[currentLanguage].devBy;
  document.getElementById("view-code").textContent =
    translations[currentLanguage].viewCode;
  document.getElementById("source-code").textContent =
    translations[currentLanguage].sourceCode;
  document.getElementById("and-also").textContent =
    translations[currentLanguage].andAlso;
  document.getElementById("my-other-projects").textContent =
    translations[currentLanguage].myOtherProjects;
}

function changeLanguage(lang) {
  currentLanguage = lang;
  updateTexts();
}

document.addEventListener("DOMContentLoaded", () => {
  currentLanguage = detectLanguage();
  updateTexts();
  setTheme(currentTheme);
  const number = document.getElementById("user-input");

  number.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" ||
      event.key === "NumpadEnter" ||
      (event.key === " " && event.ctrlKey)
    ) {
      event.preventDefault();
      checkNumber();
    }
  });
});

const translations = {
  en: {
    title: "Telephone Number Validator",
    phoneLabel: "Enter a Phone Number:",
    checkButton: "Check",
    clearButton: "Clear List",
    emptyInput: "Please provide a phone number",
    isValidNumber: "Valid US number: ${text}",
    notValidNumber: "Invalid US number: ${text}",
    devBy: "Dev: Jesús Lautaro Careglio Albornoz",
    viewCode: "View the",
    sourceCode: "source code",
    andAlso: "and also check out my other",
    myOtherProjects: "freeCodeCamp projects",
  },
  es: {
    title: "Validador de Números Telefónicos",
    phoneLabel: "Ingrese un Número Telefónico:",
    checkButton: "Verificar",
    clearButton: "Limpiar Lista",
    emptyInput: "Por favor ingrese un número telefónico",
    isValidNumber: "Número válido de EE.UU.: ${text}",
    notValidNumber: "Número inválido de EE.UU.: ${text}",
    devBy: "Desarrollado por: Jesús Lautaro Careglio Albornoz",
    viewCode: "Mira el",
    sourceCode: "código fuente",
    andAlso: "y también el resto de mis",
    myOtherProjects: "proyectos de freeCodeCamp",
  },
  fr: {
    title: "Validateur de Numéro de Téléphone",
    phoneLabel: "Entrez un Numéro de Téléphone:",
    checkButton: "Vérifier",
    clearButton: "Effacer la Liste",
    emptyInput: "Veuillez fournir un numéro de téléphone",
    isValidNumber: "Numéro US valide: ${text}",
    notValidNumber: "Numéro US invalide: ${text}",
    devBy: "Développé par : Jesús Lautaro Careglio Albornoz",
    viewCode: "Voir le",
    sourceCode: "code source",
    andAlso: "et découvrez aussi mes autres",
    myOtherProjects: "projets freeCodeCamp",
  },
  de: {
    title: "Telefonnummer-Validator",
    phoneLabel: "Telefonnummer eingeben:",
    checkButton: "Prüfen",
    clearButton: "Liste Leeren",
    emptyInput: "Bitte geben Sie eine Telefonnummer ein",
    isValidNumber: "Gültige US-Nummer: ${text}",
    notValidNumber: "Ungültige US-Nummer: ${text}",
    devBy: "Entwickelt von: Jesús Lautaro Careglio Albornoz",
    viewCode: "Siehe den",
    sourceCode: "Quellcode",
    andAlso: "und schau dir auch meine anderen",
    myOtherProjects: "freeCodeCamp-Projekte an",
  },
  it: {
    title: "Validatore Numero di Telefono",
    phoneLabel: "Inserisci un Numero di Telefono:",
    checkButton: "Verifica",
    clearButton: "Cancella Lista",
    emptyInput: "Inserisci un numero di telefono",
    isValidNumber: "Numero US valido: ${text}",
    notValidNumber: "Numero US non valido: ${text}",
    devBy: "Sviluppato da: Jesús Lautaro Careglio Albornoz",
    viewCode: "Vedi il",
    sourceCode: "codice sorgente",
    andAlso: "e dai un'occhiata anche agli altri miei",
    myOtherProjects: "progetti freeCodeCamp",
  },
  ja: {
    title: "電話番号バリデーター",
    phoneLabel: "電話番号を入力してください：",
    checkButton: "確認",
    clearButton: "リストをクリア",
    emptyInput: "電話番号を入力してください",
    isValidNumber: "有効な米国番号：${text}",
    notValidNumber: "無効な米国番号：${text}",
    devBy: "開発者: Jesús Lautaro Careglio Albornoz",
    viewCode: "ソースコードを",
    sourceCode: "表示",
    andAlso: "、他の",
    myOtherProjects: "freeCodeCampプロジェクトもチェック",
  },
};
