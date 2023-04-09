// guessed letters list
const guessedLettersList = document.querySelector("ul.guessed-letters");
// guess button
const guessBtn = document.querySelector("button.guess");
// guess input
const guessInput = document.querySelector("input.letter");
// word guessing progress
const progress = document.querySelector("p.word-in-progress");
// span to style the remaining guesses
const span = document.querySelector("p.remaining span");
// messages for user during guessing
const message = document.querySelector("p.message");
// button to play again
const playAgainBtn = document.querySelector("button.play-again");
// starting word until API is added
const word = "magnolia";
// array of user's guessed letters
const guessedLetters = [];

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

// event listener for guess button click
guessBtn.addEventListener("click", function(e) {
    /* prevents the default behavior of clicking a button, the form submitting,
     * and then reloading the page
     */
    e.preventDefault(); 

    const input = guessInput.value;
    guessInput.value = "";
    message.value = "";
    makeGuess(inputValidate(input));
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
    }
    return input;
}

// function to check for already guessed letters
// new letters saved to array
const makeGuess = function(letter) {
    letter = letter.toUpperCase();
    if(guessedLetters.includes(letter)) {
        message.innerHTML = `You've already guessed ${letter}`;
    } else {
        guessedLetters.push(letter);
    }
    console.log(guessedLetters);
}

addPlaceholders(word);