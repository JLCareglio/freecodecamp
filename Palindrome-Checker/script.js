// START freeCodeCamp exercises

function checkPalindrome() {
  const textInput = document.getElementById("text-input");
  const resultElement = document.getElementById("result");
  const fixButton = document.getElementById("fix-btn");

  const text = textInput.value;
  resultElement.style.display = "block";

  if (!text) {
    const errorMessage = translations[currentLanguage].emptyInput;
    resultElement.textContent = errorMessage;
    alert(errorMessage);
    resultElement.className = "not-palindrome";
    return;
  }

  const cleanText = text
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, "");

  const isPalindrome = cleanText.split("").reverse().join("") === cleanText;

  if (isPalindrome) {
    resultElement.textContent = translations[
      currentLanguage
    ].isPalindrome.replace("${text}", text);
    resultElement.className = "is-palindrome";
    fixButton.disabled = true;
  } else {
    resultElement.textContent = translations[
      currentLanguage
    ].notPalindrome.replace("${text}", text);
    resultElement.className = "not-palindrome";
    fixButton.disabled = false;
  }
}

// END freeCodeCamp exercises

function generatePalindrome() {
  const text = document.getElementById("text-input").value;
  const cleanText = text
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, "");
  const reversedText = cleanText.split("").reverse().join("");

  if (cleanText === reversedText) return;

  const palindrome = text + text.split("").reverse().join("").substring(1);
  document.getElementById("text-input").value = palindrome;
  checkPalindrome();
}

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
  document.getElementById("text-input").placeholder =
    translations[currentLanguage].placeholder;
  document.getElementById("check-btn").textContent =
    translations[currentLanguage].checkButton;
  document.getElementById("fix-btn").textContent =
    translations[currentLanguage].fixButton;
  document.getElementById("info").textContent =
    translations[currentLanguage].info;
  document.getElementById("result").textContent = "...";
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
  const textInput = document.getElementById("text-input");
  const fixBtn = document.getElementById("fix-btn");

  textInput.addEventListener("input", () => {
    fixBtn.disabled = true;
  });

  textInput.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" ||
      event.key === "NumpadEnter" ||
      (event.key === " " && event.ctrlKey)
    ) {
      event.preventDefault();
      checkPalindrome();
    }
  });
});

const translations = {
  en: {
    title: "Palindrome Checker",
    placeholder: "Enter a text",
    checkButton: "Check",
    fixButton: "Fix",
    emptyInput: "Please input a value",
    isPalindrome: "${text} is a palindrome!",
    notPalindrome: "${text} is not a palindrome.",
    info: "💡 A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.",
    devBy: "Dev: Jesús Lautaro Careglio Albornoz",
    viewCode: "View the",
    sourceCode: "source code",
    andAlso: "and also check out my other",
    myOtherProjects: "freeCodeCamp projects",
  },
  es: {
    title: "Verificador de Palíndromos",
    placeholder: "Ingresa un texto",
    checkButton: "Verificar",
    fixButton: "Corregir",
    emptyInput: "Por favor ingresa un valor",
    isPalindrome: "${text} es un palíndromo!",
    notPalindrome: "${text} no es un palíndromo.",
    info: "💡 Un palíndromo es una palabra o frase que se lee igual de izquierda a derecha que de derecha a izquierda, ignorando la puntuación, mayúsculas y espacios.",
    devBy: "Desarrollado por: Jesús Lautaro Careglio Albornoz",
    viewCode: "Mira el",
    sourceCode: "código fuente",
    andAlso: "y también el resto de mis",
    myOtherProjects: "proyectos de freeCodeCamp",
  },
  fr: {
    title: "Vérificateur de Palindrome",
    placeholder: "Entrez un texte",
    checkButton: "Vérifier",
    fixButton: "Corriger",
    emptyInput: "Veuillez saisir une valeur",
    isPalindrome: "${text} est un palindrome !",
    notPalindrome: "${text} n'est pas un palindrome.",
    info: "💡 Un palindrome est une phrase ou un mot qui se lit de la même manière de gauche à droite que de droite à gauche, en ignorant la ponctuation, la casse et les espaces.",
    devBy: "Développé par : Jesús Lautaro Careglio Albornoz",
    viewCode: "Voir le",
    sourceCode: "code source",
    andAlso: "et découvrez aussi mes autres",
    myOtherProjects: "projets freeCodeCamp",
  },
  de: {
    title: "Palindrom-Prüfer",
    placeholder: "Geben Sie einen Text ein",
    checkButton: "Überprüfen",
    fixButton: "Korrigieren",
    emptyInput: "Bitte geben Sie einen Wert ein",
    isPalindrome: "${text} ist ein Palindrom!",
    notPalindrome: "${text} ist kein Palindrom.",
    info: "💡 Ein Palindrom ist eine Zeichenkette oder ein Wort, das von links nach rechts wie von rechts nach links gelesen wird, ohne die Satzzeichen, die Groß- und Kleinschreibung sowie die Leerzeichen zu berücksichtigen.",
    devBy: "Entwickelt von: Jesús Lautaro Careglio Albornoz",
    viewCode: "Siehe den",
    sourceCode: "Quellcode",
    andAlso: "und schau dir auch meine anderen",
    myOtherProjects: "freeCodeCamp-Projekte an",
  },
  it: {
    title: "Verificatore di Palindromi",
    placeholder: "Inserisci un testo",
    checkButton: "Verifica",
    fixButton: "Correggere",
    emptyInput: "Per favore inserisci un valore",
    isPalindrome: "${text} è un palindromo!",
    notPalindrome: "${text} non è un palindromo.",
    info: "💡 Un palindromo è una stringa o un parola che viene letta da sinistra a destra come da destra a sinistra, ignorando la punteggiatura, la maiuscola e lo spazio.",
    devBy: "Sviluppato da: Jesús Lautaro Careglio Albornoz",
    viewCode: "Vedi il",
    sourceCode: "codice sorgente",
    andAlso: "e dai un'occhiata anche agli altri miei",
    myOtherProjects: "progetti freeCodeCamp",
  },
  ja: {
    title: "回文チェッカー",
    placeholder: "テキストを入力してください",
    checkButton: "確認",
    fixButton: "修正",
    emptyInput: "値を入力してください",
    isPalindrome: "${text}は回文です！",
    notPalindrome: "${text}は回文ではありません。",
    info: "💡 回文は、左から右に読んでも右から左に読んでも同じになる単語や文です。",
    devBy: "開発者: Jesús Lautaro Careglio Albornoz",
    viewCode: "ソースコードを",
    sourceCode: "表示",
    andAlso: "、他の",
    myOtherProjects: "freeCodeCampプロジェクトもチェック",
  },
};
