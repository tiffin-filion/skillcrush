// guessed letters list
const guessedLetters = document.querySelector("ul.guessed-letters");
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

addPlaceholders(word);

// event listener for guess button click
guessBtn.addEventListener("click", function(e) {
    /* prevents the default behavior of clicking a button, the form submitting,
     * and then reloading the page
     */
    e.preventDefault(); 

    const input = guessInput.value;
    console.log(input);
    guessInput.value = "";
})