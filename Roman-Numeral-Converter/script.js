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
  document.title = translations[currentLanguage].title;
  document.getElementById("title").textContent =
    translations[currentLanguage].title;
  document.getElementById("number").placeholder =
    translations[currentLanguage].placeholder;
  document.getElementById("convert-btn").textContent =
    translations[currentLanguage].convertButton;
  document.getElementById("output").textContent = "";
  document.getElementById("language-selector").value = currentLanguage;
}

function changeLanguage(lang) {
  currentLanguage = lang;
  updateTexts();
}

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
  for (let i = 0; i < romanNumerals.length; i++) {
    while (num >= romanNumerals[i].value) {
      result += romanNumerals[i].symbol;
      num -= romanNumerals[i].value;
    }
  }
  return result;
}

function convertNumber() {
  const number = document.getElementById("number").value;
  const output = document.getElementById("output");

  output.style.display = "block";

  if (!number) {
    output.textContent = translations[currentLanguage].emptyInputError;
    output.className = "error";
    return;
  }

  const num = parseInt(number);

  if (isNaN(num)) {
    output.textContent = translations[currentLanguage].emptyInputError;
    output.className = "error";
    return;
  }

  if (num < 1) {
    output.textContent = translations[currentLanguage].minNumberError;
    output.className = "error";
    return;
  }

  if (num > 3999) {
    output.textContent = translations[currentLanguage].maxNumberError;
    output.className = "error";
    return;
  }

  const romanNumeral = convertToRoman(num);
  output.textContent = romanNumeral;
  output.className = "success";
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
  },
  es: {
    title: "Convertidor de Números Romanos",
    placeholder: "Ingrese un Número",
    convertButton: "Convertir",
    emptyInputError: "Por favor, ingrese un número válido.",
    minNumberError: "Por favor, ingrese un número mayor o igual a 1.",
    maxNumberError: "Por favor, ingrese un número menor o igual a 3999.",
  },
  fr: {
    title: "Convertisseur de Nombres Romains",
    placeholder: "Entrez un Nombre",
    convertButton: "Convertir",
    emptyInputError: "Veuillez entrer un nombre valide.",
    minNumberError: "Veuillez entrer un nombre supérieur ou égal à 1.",
    maxNumberError: "Veuillez entrer un nombre inférieur ou égal à 3999.",
  },
  de: {
    title: "Römische Zahlen Umrechner",
    placeholder: "Geben Sie eine Zahl ein",
    convertButton: "Umrechnen",
    emptyInputError: "Bitte geben Sie eine gültige Zahl ein.",
    minNumberError: "Bitte geben Sie eine Zahl größer oder gleich 1 ein.",
    maxNumberError: "Bitte geben Sie eine Zahl kleiner oder gleich 3999 ein.",
  },
  it: {
    title: "Convertitore di Numeri Romani",
    placeholder: "Inserisci un Numero",
    convertButton: "Converti",
    emptyInputError: "Per favore, inserisci un numero valido.",
    minNumberError: "Per favore, inserisci un numero maggiore o uguale a 1.",
    maxNumberError: "Per favore, inserisci un numero minore o uguale a 3999.",
  },
  ja: {
    title: "ローマ数字変換器",
    placeholder: "数字を入力してください",
    convertButton: "変換",
    emptyInputError: "有効な数字を入力してください。",
    minNumberError: "1以上の数字を入力してください。",
    maxNumberError: "3999以下の数字を入力してください。",
  },
};
