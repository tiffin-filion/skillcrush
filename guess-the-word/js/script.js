// guessed letters list
const guessedLettersList = document.querySelector("ul.guessed-letters");
// guess button
const guessBtn = document.querySelector("button.guess");
// guess input
const guessInput = document.querySelector("input.letter");
// word guessing progress
const progress = document.querySelector("p.word-in-progress");
// remaining guesses message
const remaining = document.querySelector("p.remaining");
// span to style the remaining guesses
const span = document.querySelector("p.remaining span");
// messages for user during guessing
const message = document.querySelector("p.message");
// button to play again
const playAgainBtn = document.querySelector("button.play-again");
// starting word until API is added
let word = "";
// array of user's guessed letters
const guessedLetters = [];
// keep track of number of guesses
let remainingGuesses = 8;

// fetch list of words
const getWord = async function() {
  const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const data = await request.text();
  const wordArray = data.split("\n");
  const randomWordIndex = Math.floor(Math.random() * wordArray.length);
  const randomWord = wordArray[randomWordIndex];
  word = randomWord.trim();
  addPlaceholders(word);
}

// add placeholders for each letter
const addPlaceholders = function(word) {
    // create array to hold each letter separately
    // convert to placeholder symbols & display
    const letters = [];
    for(let i = 0; i < word.length; i++) {
        letters[i] = "●";
    }

    const placeholder = letters.join("");
    progress.innerHTML = placeholder;
}

getWord();

// event listener for guess button click
guessBtn.addEventListener("click", function(e) {
    /* prevents the default behavior of clicking a button, the form submitting,
     * and then reloading the page
     */
    e.preventDefault(); 

    let input = guessInput.value;
    guessInput.value = "";
    message.value = "";
    input = inputValidate(input);
    makeGuess(input);
})

// function to validate player's input
const inputValidate = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if(input.length === 0){
        message.innerHTML = "Please enter a letter for your guess.";
    } else if(input.length > 1) {
        message.innerHTML = "Only one letter a time is accepted.";
    } else if(!input.match(acceptedLetter)) {
        message.innerHTML = "Only letters from the alphabet are allowed.";
    } else {
        return input;
    }
}

// function to check for already guessed letters
// new letters saved to array
const makeGuess = function(letter) {
    letter = letter.toUpperCase();
    if(guessedLetters.includes(letter)) {
        message.innerHTML = `You've already guessed ${letter}`;
    } else {
        countGuesses(letter);
        guessedLetters.push(letter);
        currentGuesses();
    }
    updateWIP(guessedLetters);
}

// function to update page to show the user what they've already guessed
const currentGuesses = function() {
    guessedLettersList.innerHTML = "";
    for(let key of guessedLetters) {
        let li = document.createElement("li");
        li.innerText = key;
        guessedLettersList.append(li);
    }
}

// update word in progress to replace placeholders with guessed letters
const updateWIP = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for(let letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    progress.innerHTML = revealWord.join("");
    winOrLose();
}

// count number of guesses player has tried
const countGuesses = function(guess) {
    let wordUpper = word.toUpperCase();
    if(wordUpper.includes(guess)) {
        message.innerHTML = `Yes! ${guess} is in the word!`;
    } else {
        message.innerHTML = "Sorry, that letter isn't in the word.";
        remainingGuesses -= 1;
    }

    if(remainingGuesses === 0) {
        remaining.innerHTML = `Sorry, you ran out of guesses. The word was ${word}`;
    } else if(remainingGuesses > 1) {
        remaining.innerHTML = `You have ${remainingGuesses} guesses remaining.`;
    } else {
        remaining.innerHTML = "You have one guess left!";
    }
}

// check if the player has won
const winOrLose = function() {
    if(progress.innerHTML === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = "<p class='highlight'>You correctly guessed the word! Congrats!</p>";
        remaining.classList.add("hide");
    }
}