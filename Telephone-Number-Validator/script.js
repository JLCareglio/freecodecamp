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
  document.title = translations[currentLanguage].title;
  document.getElementById("title").textContent =
    translations[currentLanguage].title;
  document.getElementById("phone-label").textContent =
    translations[currentLanguage].phoneLabel;
  document.getElementById("check-btn").textContent =
    translations[currentLanguage].checkButton;
  document.getElementById("clear-btn").textContent =
    translations[currentLanguage].clearButton;
  document.getElementById("language-selector").value = currentLanguage;
}

function changeLanguage(lang) {
  currentLanguage = lang;
  updateTexts();
}

function checkNumber() {
  const number = document.getElementById("user-input").value;
  const resultList = document.getElementById("results-div");
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

function clearList() {}

const translations = {
  en: {
    title: "Telephone Number Validator",
    phoneLabel: "Enter a Phone Number:",
    checkButton: "Check",
    clearButton: "Clear List",
    emptyInput: "Please provide a phone number",
    isValidNumber: "Valid US number: ${text}",
    notValidNumber: "Invalid US number: ${text}",
  },
  es: {
    title: "",
    phoneLabel: "",
    checkButton: "",
    clearButton: "",
    emptyInput: "",
    isValidNumber: "",
    notValidNumber: "",
  },
  fr: {
    title: "",
    phoneLabel: "",
    checkButton: "",
    clearButton: "",
    emptyInput: "",
    isValidNumber: "",
    notValidNumber: "",
  },
  de: {
    title: "",
    phoneLabel: "",
    checkButton: "",
    clearButton: "",
    emptyInput: "",
    isValidNumber: "",
    notValidNumber: "",
  },
  it: {
    title: "",
    phoneLabel: "",
    checkButton: "",
    clearButton: "",
    emptyInput: "",
    isValidNumber: "",
    notValidNumber: "",
  },
  ja: {
    title: "",
    phoneLabel: "",
    checkButton: "",
    clearButton: "",
    emptyInput: "",
    isValidNumber: "",
    notValidNumber: "",
  },
};
