// START freeCodeCamp exercises

function convertToRoman(num) {
  const romanNumerals = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let result = "";
  for (const numeral of romanNumerals) {
    while (num >= numeral.value) {
      result += numeral.symbol;
      num -= numeral.value;
    }
  }
  return result;
}

function validateNumber(number) {
  if (!number) return translations[currentLanguage].emptyInputError;
  const num = parseInt(number);
  if (num < 1) return translations[currentLanguage].minNumberError;
  if (num > 3999) return translations[currentLanguage].maxNumberError;
  return null;
}

function convertNumber() {
  const numberInput = document.getElementById("number");
  const outputElement = document.getElementById("output");
  const number = numberInput.value;

  outputElement.style.display = "block";
  outputElement.classList.remove("error", "success");

  const errorMessage = validateNumber(number);

  if (errorMessage) {
    outputElement.textContent = errorMessage;
    outputElement.classList.add("error");
    return;
  }

  const num = parseInt(number);
  const romanNumeral = convertToRoman(num);
  outputElement.textContent = romanNumeral;
  outputElement.classList.add("success");
}

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
  return translations[langCode] ? langCode : "es";
}

function updateTexts() {
  document.getElementById("language-selector").value = currentLanguage;
  document.title = translations[currentLanguage].title;
  document.getElementById("title").textContent =
    translations[currentLanguage].title;
  document.getElementById("number").placeholder =
    translations[currentLanguage].placeholder;
  document.getElementById("convert-btn").textContent =
    translations[currentLanguage].convertButton;
  document.getElementById("output").textContent = "";
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
  const numberInput = document.getElementById("number");

  numberInput.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" ||
      event.key === "NumpadEnter" ||
      (event.key === " " && event.ctrlKey)
    ) {
      event.preventDefault();
      convertNumber();
    }
  });
});

const translations = {
  en: {
    title: "Roman Numeral Converter",
    placeholder: "Enter a Number",
    convertButton: "Convert",
    emptyInputError: "Please enter a valid number.",
    minNumberError: "Please enter a number greater than or equal to 1.",
    maxNumberError: "Please enter a number less than or equal to 3999.",
    devBy: "Dev: Jesús Lautaro Careglio Albornoz",
    viewCode: "View the",
    sourceCode: "source code",
    andAlso: "and also check out my other",
    myOtherProjects: "freeCodeCamp projects",
  },
  es: {
    title: "Convertidor de Números Romanos",
    placeholder: "Ingrese un Número",
    convertButton: "Convertir",
    emptyInputError: "Por favor, ingrese un número válido.",
    minNumberError: "Por favor, ingrese un número mayor o igual a 1.",
    maxNumberError: "Por favor, ingrese un número menor o igual a 3999.",
    devBy: "Desarrollado por: Jesús Lautaro Careglio Albornoz",
    viewCode: "Mira el",
    sourceCode: "código fuente",
    andAlso: "y también el resto de mis",
    myOtherProjects: "proyectos de freeCodeCamp",
  },
  fr: {
    title: "Convertisseur de Nombres Romains",
    placeholder: "Entrez un Nombre",
    convertButton: "Convertir",
    emptyInputError: "Veuillez entrer un nombre valide.",
    minNumberError: "Veuillez entrer un nombre supérieur ou égal à 1.",
    maxNumberError: "Veuillez entrer un nombre inférieur ou égal à 3999.",
    devBy: "Développé par : Jesús Lautaro Careglio Albornoz",
    viewCode: "Voir le",
    sourceCode: "code source",
    andAlso: "et découvrez aussi mes autres",
    myOtherProjects: "projets freeCodeCamp",
  },
  de: {
    title: "Römische Zahlen Umrechner",
    placeholder: "Geben Sie eine Zahl ein",
    convertButton: "Umrechnen",
    emptyInputError: "Bitte geben Sie eine gültige Zahl ein.",
    minNumberError: "Bitte geben Sie eine Zahl größer oder gleich 1 ein.",
    maxNumberError: "Bitte geben Sie eine Zahl kleiner oder gleich 3999 ein.",
    devBy: "Entwickelt von: Jesús Lautaro Careglio Albornoz",
    viewCode: "Siehe den",
    sourceCode: "Quellcode",
    andAlso: "und schau dir auch meine anderen",
    myOtherProjects: "freeCodeCamp-Projekte an",
  },
  it: {
    title: "Convertitore di Numeri Romani",
    placeholder: "Inserisci un Numero",
    convertButton: "Converti",
    emptyInputError: "Per favore, inserisci un numero valido.",
    minNumberError: "Per favore, inserisci un numero maggiore o uguale a 1.",
    maxNumberError: "Per favore, inserisci un numero minore o uguale a 3999.",
    devBy: "Sviluppato da: Jesús Lautaro Careglio Albornoz",
    viewCode: "Vedi il",
    sourceCode: "codice sorgente",
    andAlso: "e dai un'occhiata anche agli altri miei",
    myOtherProjects: "progetti freeCodeCamp",
  },
  ja: {
    title: "ローマ数字変換器",
    placeholder: "数字を入力してください",
    convertButton: "変換",
    emptyInputError: "有効な数字を入力してください。",
    minNumberError: "1以上の数字を入力してください。",
    maxNumberError: "3999以下の数字を入力してください。",
    devBy: "開発者: Jesús Lautaro Careglio Albornoz",
    viewCode: "ソースコードを",
    sourceCode: "表示",
    andAlso: "、他の",
    myOtherProjects: "freeCodeCampプロジェクトもチェック",
  },
};
