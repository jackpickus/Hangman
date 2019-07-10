const words = [
  "apple",
  "pineapple",
  "cappuccino",
  "steak",
  "beer",
  "asparagus",
  "avocado",
  "persimmon",
  "broccoli",
  "spinach",
  "gherkin",
  "pizza",
  "sourdough",
  "coffee",
  "lemon"
];

function selectWord() {
  let num = Math.floor(Math.random() * 15) + 1;
  return words[num];
}

let word = selectWord();
let wordSpaces = "";

function printSpaces(answer) {
  for(i = 0; i < answer.length; i++) {
    if (i == answer.length - 1) {
      wordSpaces += "_";
    } else {
      wordSpaces += "_ ";
    }
  }
  document.write(wordSpaces);
}

printSpaces(word);

let strikes = 0;
let isWrong = false; // boolean marked true after first wrong guess
let counter = 0; // counter increased once after each guess
let newWord = [word.length];
let wrongGuesses = "";

// Check to see if the word has been completed
function gameOver() {
  for (i = 0; i < newWord.length; i++) {
    if (newWord[i] != word[i]) {
      return false;
    }
  }
  return true;
}

function playAgain() {
  if (confirm('Would you like to play again?')) {
    location.reload();
  } else {
    // Do nothing!
  }
}

// will loop through word to see if guessed letter is present
function check() {
  let letter = document.getElementById("guess").value;
	document.getElementById("guess").value=''; // reset text field so empty for next guess
  let newDiv = document.createElement("div");

	if (newWord.indexOf(letter) >= 0 || wrongGuesses.indexOf(letter) >= 0) { // letter has already been guessed
		alert("You already guessed this letter");
		return;
	}

  for (i = 0; i < word.length; i++) {
		if (word[i] == letter && newWord[i] != letter) { // true if very first time letter correctly guessed
      newWord[i] = letter;
			console.log("If statement: " + letter);
		} else if (newWord[i] == null) { // This statement is only reached and it's on first guess to construct string
			newWord[i] = "_";              // to output the underscores and correctly guessed letters
			console.log("Else if statement: " + letter);
    } else {
			console.log('Else statement of loop reached on letter: ' + letter);
      continue; // means the correct letter has already been guessed
    }
  }

  if (newWord[0] == newWord.length) {
    newWord[0] = "_";
  }

	if (word.indexOf(letter) < 0 && wrongGuesses.indexOf(letter) < 0) {
    strikes++;
    isWrong = true;
    wrongGuesses += letter + " ";
	}

  document.getElementById("strike-count").innerHTML = strikes;
  document.getElementById("wrong").innerHTML = wrongGuesses;

  let newContent;
  // give div the updated word
  if (counter <= 0 && isWrong) {
    newContent = document.createTextNode(wordSpaces);
  } else {
    newContent = document.createTextNode(newWord);
    counter++;
  }
  newDiv.appendChild(newContent); // add the text to the new div

  // add the newly created element and its content into the DOM
  let currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);

  // reset boolean to detect next wrong guess and increase strike count
  isWrong = false;

  if (gameOver()) {
    document.getElementById("gg").innerHTML = "You Won!";
    document.getElementById("playBtn").disabled = true;
    playAgain();
  }
  if (strikes >= 7) {
    document.getElementById("gg").innerHTML = "You Lose!";
    document.getElementById("playBtn").disabled = true;
    playAgain();
  }

}
