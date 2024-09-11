"use strict";
let quote = "";
let quoteId = "";
let errors = 0;
let maxErrors = 6;
let uniqueChars = new Set();
let startTime;

function startGame() {
  const username = document.querySelector("#username").value.trim();
  if (!username) {
    alert("Please enter a username");
    return;
  }

  document.querySelector("#name-screen").style.display = "none";
  document.querySelector("#game-screen").style.display = "block";

  fetchQuote();
  startTime = Date.now();
}

function fetchQuote() {
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      quote = data.content;
      quoteId = data._id;
      displayQuote();
    });
}

function displayQuote() {
  const quoteDisplay = document.querySelector("#quote");
  let maskedQuote = quote.replace(/[a-zA-Z]/g, "_");

  // Brojanje jedinstvenih slova u citatu
  uniqueChars = new Set(quote.toLowerCase().match(/[a-z]/g));

  quoteDisplay.textContent = maskedQuote;
}

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

function revealLetter(letter) {
  const quoteDisplay = document.querySelector("#quote");
  let maskedQuote = quoteDisplay.textContent.split("");

  for (let i = 0; i < quote.length; i++) {
    if (quote[i].toLowerCase() === letter) {
      maskedQuote[i] = quote[i];
    }
  }

  quoteDisplay.textContent = maskedQuote.join("");

  if (!quoteDisplay.textContent.includes("_")) {
    endGame(true);
  }
}

function endGame(won) {
  const duration = Date.now() - startTime;
  if (won) {
    alert("Čestitamo, pobijedili ste!");
    sendScore(duration);
  } else {
    alert("Izgubili ste! Pokušajte ponovno.");
  }
}

function sendScore(duration) {
  const username = document.querySelector("#username").value.trim();
  const scoreData = {
    quoteId: quoteId,
    length: quote.length,
    uniqueCharacters: uniqueChars.size,
    userName: username,
    errors: errors,
    duration: duration,
  };

  fetch(
    "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scoreData),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Score sent:", data);
      fetchHighScores();
    });
}

function fetchHighScores() {
  fetch(
    "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("High scores:", data);
    });
}

function restartGame() {
  errors = 0;
  document.querySelector("#errors").textContent = errors;
  fetchQuote();
}
