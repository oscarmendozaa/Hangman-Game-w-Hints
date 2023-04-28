// Set up the game
const words = ["javascript", "html", "css", "node", "react"];
let word = chooseWord();
let guessedLetters = [];
let remainingGuesses = 6;
let hintCount = 3;

// Select the relevant HTML elements
const wordDisplay = document.querySelector(".word-display");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const hangmanDisplay = document.querySelector(".hangman-display");
const hintCountDisplay = document.getElementById("hint-count");
const hintButton = document.getElementById("hint-button");
const messageDisplay = document.querySelector(".message-display");

// Display the initial word with blanks for unguessed letters
displayWord();
hintCountDisplay.textContent = hintCount;



// Event listener for the guess button
guessButton.addEventListener("click", function(event) {
    event.preventDefault();
    const guess = guessInput.value.toLowerCase();
    guessInput.value = "";
    handleGuess(guess);
});

// Event listener for the hint button
hintButton.addEventListener("click", useHint);

// Function to select a random word from the array
function chooseWord() {
    const index = Math.floor(Math.random() * words.length);
    // console.log(words[index]);
    return words[index];    
}

// Function to display the current word with blanks for unguessed letters
function displayWord() {
    const letters = word.split("");
    // console.log(letters)
    const formattedWord = letters
        .map(letter => guessedLetters.includes(letter) ? letter : "_")
        .join(" "); 
    wordDisplay.textContent = formattedWord
    return formattedWord;
    // console.log(guessedLetters)

}

function displayMessage(message) {
    messageDisplay.textContent = message;
}

// Function to handle a user guess
function handleGuess(guess) {
    if (guessedLetters.includes(guess)) {
        displayMessage("You've already guessed that letter!");
        return;
    }
    guessedLetters.push(guess);
    if (word.includes(guess)) {
        displayMessage("Correct!");
    } else {
        remainingGuesses--;
        updateHangman();
        displayMessage("Incorrect!");
    }
    displayWord();
    checkGameOver();
}

// Function to update the hangman display
function updateHangman() {
    const bodyParts = ["head", "body", "left-arm", "right-arm", "left-leg", "right-leg"];
    const nextBodyPart = bodyParts[5 - Math.min(remainingGuesses, 6)];
    hangmanDisplay.querySelector(`.${nextBodyPart}`).classList.add("show");
}


// Function to use a hint
function useHint() {
    if (hintCount === 0) {
      displayMessage("You don't have any hints left.");
      return;
    }
  
    hintCount--;
    document.getElementById("hint-count").textContent = hintCount;
  
    const remainingLetters = word
      .split("")
      .filter(letter => !guessedLetters.includes(letter));
  
    const hintLetterIndex = Math.floor(Math.random() * remainingLetters.length);
    const hintLetter = remainingLetters[hintLetterIndex];
  
    guessedLetters.push(hintLetter);
    displayWord();
    displayMessage(`Hint: the word contains the letter "${hintLetter}".`);
  }
  
  function checkGameOver() {
    if (!displayWord().includes("_")) {
      displayMessage("Congratulations, you won!");
      guessInput.disabled = true;
      guessButton.disabled = true;
    } else if (remainingGuesses === 0) {
      displayMessage(`Game over! The word was "${word}".`);
      guessInput.disabled = true;
      guessButton.disabled = true;
    }
  }
  

