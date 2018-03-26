//creating variables and array of words
var wordArray = ["abyss", "boggle", "crpyt", "dizzying", "equip", "flapjack", "gazebo", "haphazard", "ivory", "jazz", "keyhole", "lengths", "megahertz", "numbskull", "oxygen", "pajama", "quiz", "razzmatazz", "scratch", "twelfth", "uptown", "vaporize", "wave", "xylophone", "zigzagging"];

var hangman = document.getElementById("hangman");
var content = document.getElementById("content");
var gameContent = document.getElementById("game-content");
var wrongGuess = document.getElementById("wrong-guess");
var header = document.getElementById("header");
var winContent = document.getElementById("wins");
var lossContent = document.getElementById("losses");

var winCount = 0;
var lossCount = 0;
var gameOver = false;

function run() {
    //selecting random word from array
    var word = wordArray[Math.floor(Math.random() * wordArray.length)];

    //creating array and variables for wrong answers
    var wrongArray = [];
    var mistakeCounter = 6;
    var goodGuess = false;

    //setting page 
    header.innerHTML = "Hangman"
    hangman.innerHTML =
        "  ________<br />" +
        "  |            <br />" +
        "  |             <br />" +
        "  |             <br />" +
        "_|_             <br />";

    //creating spaces for letters
    var answerArray = [];
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    }

    var letterSpaces = answerArray.toString();
    gameContent.innerHTML = letterSpaces.replace(/,/g, ' ');

    //main function
    document.onkeyup = function (event) {
        //setting user input to a variable
        var userGuess = event.key;

        //finding location of all instances of the users guessed letter in the word
        for (var j = 0; j < word.length; j++) {
            var guess = word.indexOf(userGuess, j);

            //if letter is in the word
            if (guess > -1) {
                //adding guessed letter to the correct location on the page
                answerArray[guess] = userGuess;
                goodGuess = true;
            }

            //if letter is not in the word
            if (guess == -1 && !goodGuess && userGuess != "Meta") {
                mistakeCounter = mistakeCounter - 1;
                //adds wrong guess to page
                wrongArray.push(userGuess);
                var wrongLetters = wrongArray.toString();
                wrongGuess.innerHTML = wrongLetters.replace(/,/g, ' ');
                goodGuess = true;

                //creating image of hangman
                if (mistakeCounter == 5) {
                    hangman.innerHTML =
                        "  ________<br />" +
                        "  |            O<br />" +
                        "  |             <br />" +
                        "  |             <br />" +
                        "_|_             <br />";
                }
                if (mistakeCounter == 4) {
                    hangman.innerHTML =
                        "  ________<br />" +
                        "  |            O<br />" +
                        "  |             |<br />" +
                        "  |             |<br />" +
                        "_|_             <br />";
                }
                if (mistakeCounter == 3) {
                    hangman.innerHTML =
                        "  ________<br />" +
                        "  |            O<br />" +
                        "  |             |_<br />" +
                        "  |             |<br />" +
                        "_|_             <br />";
                }
                if (mistakeCounter == 2) {
                    hangman.innerHTML =
                        "  ________<br />" +
                        "  |             O<br />" +
                        "  |            _|_<br />" +
                        "  |              |<br />" +
                        "_|_             <br />";
                }
                if (mistakeCounter == 1) {
                    hangman.innerHTML =
                        "  ________<br />" +
                        "  |             O<br />" +
                        "  |            _|_<br />" +
                        "  |              |<br />" +
                        "_|_           /<br />";
                }

            }
            //end screens
            if (answerArray.indexOf("_") == -1) {
                header.innerHTML = "<h1>YOU WIN!!! <br /> Press any key to play again</h1>";

                //resets game
                document.onkeyup = function restartGame() {
                    //adds one to win count
                    winCount = winCount + 1;
                    winContent.innerHTML = "Wins: " + winCount;
                    run();
                }

            } else if (mistakeCounter == 0) {
                header.innerHTML = "<h1>YOU LOSE!!! <br />The word was: " + word + "<br /> Press any key to play again</h1>";
                hangman.innerHTML =
                    "  ________<br />" +
                    "  |             O<br />" +
                    "  |            _|_<br />" +
                    "  |              |<br />" +
                    "_|_           /\\<br />";

                document.onkeyup = function restartGame() {
                    //adds one to loss count
                    lossCount = lossCount + 1;
                    lossContent.innerHTML = "Losses: " + lossCount;
                    run();
                }
            }

            //resets blank spaces for letters
            var letterSpaces = answerArray.toString();
            gameContent.innerHTML = letterSpaces.replace(/,/g, ' ');

        }
        goodGuess = false;

    }

}
//function to initialize game
document.onkeyup = function startGame() {
    run();
}
