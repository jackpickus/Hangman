var words = [
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
  var num = Math.floor(Math.random() * 15) + 1;
  return words[num];
}

var word = selectWord();
var wordSpaces = "";

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

var strikes = 0;
var isPresent = false;
var isWrong = false; // boolean marked true after first wrong guess
var counter = 0; // counter increased once after each guess
var newWord = [word.length];
var wrongGuesses = "";

// Check to see if the word has been completed
function gameOver() {
  for (i = 0; i < newWord.length; i++) {
    if (newWord[i] != word[i]) {
      return false;
    }
  }
  return true;
}

// will loop through word to see if guessed letter is present
function check() {
  var letter = document.getElementById("guess").value;
  var newDiv = document.createElement("div");
  for (i = 0; i < word.length; i++) {
    if (word[i] == letter) {
      newWord[i] = letter;
      isPresent = true;
    } else if (newWord[i] == null) {
      newWord[i] = "_";
    } else {
      continue; // means the correct letter has already been guessed
    }
  }

  if (!isPresent) { // means letter guessed was never present in word
    strikes++;
    isWrong = true;
    wrongGuesses += letter + " ";
  }
  document.getElementById("strike-count").innerHTML = strikes;
  document.getElementById("wrong").innerHTML = wrongGuesses;


  var newContent;
  // give div the updated word
  if (counter <= 0 && isWrong) {
    newContent = document.createTextNode(wordSpaces);
  } else {
    newContent = document.createTextNode(newWord);
    counter++;
  }
  //var newContent = document.createTextNode(newWord); // IF FIRST GUESS IS WRONG, WILL PRINT OUT LENTGTH!
  newDiv.appendChild(newContent); // add the text to the new div

  // add the newly created element and its content into the DOM
  var currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);

  // reset boolean to detect next wrong guess and increase strike count
  isPresent = false;
  isWrong = false;

  if (gameOver()) {
    document.getElementById("gg").innerHTML = "You Won!";
    document.getElementById("playBtn").disabled = true;
  }
  if (strikes >= 7) {
    document.getElementById("gg").innerHTML = "You Lose!";
    document.getElementById("playBtn").disabled = true;
  }

}
