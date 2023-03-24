"use strict mode";

const czkEl = document.querySelector(".czk");
const usdEl = document.querySelector(".usd");
const gbpEl = document.querySelector(".gbp");
const eurEl = document.querySelector(".eur");
const currenciesEl = [czkEl, usdEl, gbpEl, eurEl];
const currenciesDsc = ["CZK", "USD", "GBP", "EUR"];
const currenciesDscDef = document.querySelectorAll(".defaut");
const currenciesExDef = document.querySelectorAll(".exchange");
let active = czkEl;
let main = currenciesDsc[0];
let index = 0;
const convertBtn = document.querySelector(".convert");
const exchanges = [
  //        CZK, USD, GBP, EUR
  /*CZK:*/ [1, 0.046, 0.033, 0.039],
  /*USD:*/ [21.69, 1, 0.73, 0.84],
  /*GBP:*/ [29.82, 1.37, 1, 1.15],
  /*EUR:*/ [25.91, 1.19, 0.87, 1],
];
let currenciesValue = [];
let value;

// Function for changing the currency
const changeCurrency = function (newCurrency) {
  active.classList.remove("active");
  active = newCurrency;
  newCurrency.classList.add("active");

  index = currenciesEl.indexOf(newCurrency);
  main = currenciesDsc[index];
  addingMainCurrencyEverywhere();
  for (let i = 0; i < currenciesValue.length; i++) {
    if (i !== index) currenciesValue[i].value = "";
    else continue;
  }
};

// Function for adding the main currency properties everywhere
const addingMainCurrencyEverywhere = function () {
  for (let i = 0; i < currenciesDsc.length; i++) {
    currenciesDscDef[i].textContent = main;
  }
};

// Function for correct exchange
const correctExchange = function () {
  for (let i = 0; i < currenciesExDef.length; i++) {
    currenciesExDef[i].textContent = exchanges[index][i];
  }
};

const correctExchangeValue = function () {
  for (let i = 0; i < currenciesValue.length; i++) {
    if (i !== index)
      currenciesValue[i].value = (value * exchanges[index][i]).toFixed(2);
    else continue;
  }
};

// Function for correct exchanged value
const correctValue = function () {
  currenciesValue = [
    document.querySelector("#czech_crown"),
    document.querySelector("#dollar"),
    document.querySelector("#pound"),
    document.querySelector("#euro"),
  ];

  value = Number(currenciesValue[index].value);

  switch (index) {
    case 0:
      correctExchangeValue();
      break;
    case 1:
      correctExchangeValue();
      break;
    case 2:
      correctExchangeValue();
      break;
    case 3:
      correctExchangeValue();
      break;
  }
};

// Starting values
document.querySelector(".date").textContent = new Date().toLocaleDateString();

for (let i = 0; i < currenciesExDef.length; i++) {
  currenciesExDef[i].textContent = exchanges[0][i];
}

addingMainCurrencyEverywhere();

// Event for changing the currency
currenciesEl.forEach((item) => {
  item.addEventListener("click", function () {
    changeCurrency(item);
    correctExchange();
  });
});

// Events for converting
convertBtn.addEventListener("click", function () {
  correctValue();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") correctValue();
  else if (e.key === "Escape") {
    for (let i = 0; i < currenciesValue.length; i++) {
      currenciesValue[i].value = "";
    }
  }
});
