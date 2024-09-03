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
