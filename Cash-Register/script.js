// START freecodecamp exercises

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueDiv = document.getElementById("change-due");

const CENT_MULTIPLIER = 100;
const CURRENCY_VALUES = {
  "ONE HUNDRED": 100 * CENT_MULTIPLIER,
  TWENTY: 20 * CENT_MULTIPLIER,
  TEN: 10 * CENT_MULTIPLIER,
  FIVE: 5 * CENT_MULTIPLIER,
  ONE: 1 * CENT_MULTIPLIER,
  QUARTER: 0.25 * CENT_MULTIPLIER,
  DIME: 0.1 * CENT_MULTIPLIER,
  NICKEL: 0.05 * CENT_MULTIPLIER,
  PENNY: 0.01 * CENT_MULTIPLIER,
};

function checkCashRegister(price, cash, cid) {
  const changeDue = Math.round((cash - price) * CENT_MULTIPLIER);
  let totalCID = 0;

  for (let i = 0; i < cid.length; i++)
    totalCID += Math.round(cid[i][1] * CENT_MULTIPLIER);

  if (changeDue === totalCID) return { status: "CLOSED", change: [...cid] };
  if (changeDue > totalCID) return { status: "INSUFFICIENT_FUNDS", change: [] };

  const sortedCID = [...cid].reverse();
  let changeArray = [];
  let remainingChange = changeDue;

  for (let i = 0; i < sortedCID.length; i++) {
    const coinName = sortedCID[i][0];
    const coinValue = CURRENCY_VALUES[coinName];
    const availableValue = Math.round(sortedCID[i][1] * CENT_MULTIPLIER);

    const maxCoinsToUse = Math.min(
      Math.floor(remainingChange / coinValue),
      Math.floor(availableValue / coinValue)
    );

    const valueDispensedForThisCoin = maxCoinsToUse * coinValue;

    if (valueDispensedForThisCoin > 0) {
      remainingChange -= valueDispensedForThisCoin;
      changeArray.push([coinName, valueDispensedForThisCoin / CENT_MULTIPLIER]);
    }
  }

  if (remainingChange > 0) return { status: "INSUFFICIENT_FUNDS", change: [] };
  return { status: "OPEN", change: changeArray };
}

purchaseBtn.addEventListener("click", () => {
  const cashValue = parseFloat(cashInput.value);

  if (cashValue < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cashValue === price) {
    changeDueDiv.textContent = "No change due - customer paid with exact cash";
    return;
  }

  const result = checkCashRegister(price, cashValue, cid);

  changeDueDiv.innerHTML = "";

  const statusElement = document.createElement("p");
  statusElement.textContent = `Status: ${result.status}`;
  changeDueDiv.appendChild(statusElement);

  if (result.status === "CLOSED" || result.status === "OPEN") {
    result.change
      .filter((item) => item[1] > 0)
      .forEach((item) => {
        const formattedValue = item[1].toFixed(2);
        const displayValue = formattedValue.replace(/\.?0+$/, "");
        const itemElement = document.createElement("p");
        itemElement.textContent = `${item[0]}: $${displayValue}`;
        changeDueDiv.appendChild(itemElement);
      });
  }
});

// END freecodecamp exercises

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

function displayRegisterContent() {
  const currentPriceElement = document.getElementById("current-price");
  const drawerContentElement = document.getElementById("drawer-content");

  currentPriceElement.value = price.toFixed(2);

  drawerContentElement.innerHTML = "";
  cid.forEach(([denomination, amount]) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "drawer-item";
    itemDiv.innerHTML = `
      <span class="denomination">${denomination}</span>
      <span class="amount">$${amount.toFixed(2)}</span>
    `;
    drawerContentElement.appendChild(itemDiv);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setTheme(currentTheme);
  displayRegisterContent();

  const priceInput = document.getElementById("current-price");
  priceInput.addEventListener("change", () => {
    const newPrice = parseFloat(priceInput.value);
    if (!isNaN(newPrice) && newPrice > 0) price = newPrice;
    else {
      alert("Please enter a valid price greater than 0");
      priceInput.value = price.toFixed(2);
    }
  });

  cashInput.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" ||
      event.key === "NumpadEnter" ||
      (event.key === " " && event.ctrlKey)
    ) {
      event.preventDefault();
      purchaseBtn.click();
    }
  });
});
