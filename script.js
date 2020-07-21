const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", " interface"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// show hidden word
function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ""}
            </span>
            `
      )
      .join("")}`;

  const innerWord = wordElement.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = " Congratulation! you won!";
    popup.style.display = "flex";
    playable = false;
  }
}

// update wrong letters
function updateWrongLetterElement() {
  // display wrong letters
  wrongLettersElement.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong guesses:</p" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}, </span`)}
  `;

  // display parts
  figureParts.forEach((part, index) => {
    const error = wrongLetters.length;
    if (index < error) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "You lost";
    popup.style.display = "flex";
    playable = false;
  }
}

// show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// keydown letter press
window.addEventListener("keydown", (event) => {
  if (playable) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      const letter = event.key.toLowerCase();

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLetterElement();
        } else {
          showNotification();
        }
      }
    }
  }
});

// restart the game
playAgainBtn.addEventListener("click", () => {
  playable = true;

  // empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLetterElement();

  popup.style.display = "";
});

displayWord();
