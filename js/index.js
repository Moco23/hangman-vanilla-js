"use strict";

let quote = "";
let quoteId = "";
let errors = 0;
let maxErrors = 6;
let uniqueChars = new Set();
let startTime;

// start game function
function startGame() {
  // get the username
  const username = document.querySelector("#username").value.traim();

  // set if statmen
  if (!username) {
    alert("Please fill the name!");
    return;
  }

  // get and set style on name screen
  document.querySelector("#name-screen").style.display = "none";
  // get and set style on game screen
  document.querySelector("#game-screen").style.display = "block";

  // fetch quote
  fetchQuote();
  startTime = Date.now();
}

// fetch quote function
function fetchQuote() {
  // fetch url
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      quote = data.content;
      quoteId = data._id;
      displayQuote();
    });
}

// display quote function
function displayQuote() {
  // const and get quote
  const quoteDisplay = document.querySelector("#quote");
  let maskedQuote = quote.replace(/[a-zA-Z]/g, "_");

  // Counting unique letters in the quote
  uniqueChars = new Set(quote.toLowerCase().match(/[a-z]/g));

  quoteDisplay.textContent = maskedQuote;
}

// set event listener on input
document.querySelector("#letter-input").addEventListener("input", function (e) {
  const letter = e.target.value.toLowerCase();
  e.target.value = "";

  if (quote.toLowerCase().includes(letter)) {
    revealLetter(letter);
  } else {
    errors++;
    document.querySelector("#errors").textContent = errors;
    if (errors >= maxErrors) {
      endGame(false);
    }
  }
});
