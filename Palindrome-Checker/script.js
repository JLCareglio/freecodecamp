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
  document.getElementById("text-input").placeholder =
    translations[currentLanguage].placeholder;
  document.getElementById("check-btn").textContent =
    translations[currentLanguage].checkButton;
  document.getElementById("fix-btn").textContent =
    translations[currentLanguage].fixButton;
  document.getElementById("info").textContent =
    translations[currentLanguage].info;
  document.getElementById("result").textContent = "...";
  document.getElementById("language-selector").value = currentLanguage;
}

function changeLanguage(lang) {
  currentLanguage = lang;
  updateTexts();
}

function checkPalindrome() {
  const text = document.getElementById("text-input").value;
  const result = document.getElementById("result");
  result.style.display = "block";

  if (!text) {
    result.textContent = translations[currentLanguage].emptyInput;
    alert(translations[currentLanguage].emptyInput);
    result.className = "not-palindrome";
    return;
  }

  const cleanText = text
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, "");

  let isPalindrome = true;
  for (let i = 0; i < cleanText.length / 2; i++) {
    if (cleanText[i] !== cleanText[cleanText.length - 1 - i]) {
      isPalindrome = false;
      break;
    }
  }

  if (isPalindrome) {
    result.textContent = translations[currentLanguage].isPalindrome.replace(
      "${text}",
      text
    );
    result.className = "is-palindrome";
    document.getElementById("fix-btn").disabled = true;
  } else {
    result.textContent = translations[currentLanguage].notPalindrome.replace(
      "${text}",
      text
    );
    result.className = "not-palindrome";
    document.getElementById("fix-btn").disabled = false;
  }
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
  },
  es: {
    title: "Verificador de Palíndromos",
    placeholder: "Ingresa un texto",
    checkButton: "Verificar",
    fixButton: "Corregir",
    emptyInput: "Por favor ingresa un valor",
    isPalindrome: '${text} es un palíndromo!',
    notPalindrome: '${text} no es un palíndromo.',
    info: "💡 Un palíndromo es una palabra o frase que se lee igual de izquierda a derecha que de derecha a izquierda, ignorando la puntuación, mayúsculas y espacios.",
  },
  fr: {
    title: "Vérificateur de Palindrome",
    placeholder: "Entrez un texte",
    checkButton: "Vérifier",
    fixButton: "Corriger",
    emptyInput: "Veuillez saisir une valeur",
    isPalindrome: '${text} est un palindrome !',
    notPalindrome: '${text} n\'est pas un palindrome.',
    info: "💡 Un palindrome est une phrase ou un mot qui se lit de la même manière de gauche à droite que de droite à gauche, en ignorant la ponctuation, la casse et les espaces.",
  },
  de: {
    title: "Palindrom-Prüfer",
    placeholder: "Geben Sie einen Text ein",
    checkButton: "Überprüfen",
    fixButton: "Korrigieren",
    emptyInput: "Bitte geben Sie einen Wert ein",
    isPalindrome: '${text} ist ein Palindrom!',
    notPalindrome: '${text} ist kein Palindrom.',
    info: "💡 Ein Palindrom ist eine Zeichenkette oder ein Wort, das von links nach rechts wie von rechts nach links gelesen wird, ohne die Satzzeichen, die Groß- und Kleinschreibung sowie die Leerzeichen zu berücksichtigen.",
  },
  it: {
    title: "Verificatore di Palindromi",
    placeholder: "Inserisci un testo",
    checkButton: "Verifica",
    fixButton: "Correggere",
    emptyInput: "Per favore inserisci un valore",
    isPalindrome: '${text} è un palindromo!',
    notPalindrome: '${text} non è un palindromo.',
    info: "💡 Un palindromo è una stringa o un parola che viene letta da sinistra a destra come da destra a sinistra, ignorando la punteggiatura, la maiuscola e lo spazio.",
  },
  ja: {
    title: "回文チェッカー",
    placeholder: "テキストを入力してください",
    checkButton: "確認",
    fixButton: "修正",
    emptyInput: "値を入力してください",
    isPalindrome: '${text}は回文です！',
    notPalindrome: '${text}は回文ではありません。',
    info: "💡 回文は、左から右に読んでも右から左に読んでも同じになる単語や文です。",
  },
};
