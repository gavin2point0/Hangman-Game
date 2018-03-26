
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
    var letterLocation = [];
    var wrongArray = [];
    var mistakeCounter = 6;
    var goodGuess = false;
    var word = wordArray[Math.floor(Math.random() * wordArray.length)];
    header.innerHTML = "Hangman"
    hangman.innerHTML =
        "  ________<br />" +
        "  |            <br />" +
        "  |             <br />" +
        "  |             <br />" +
        "_|_             <br />";




    var answerArray = [];
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    }
    var letterSpaces = answerArray.toString();
    gameContent.innerHTML = letterSpaces.replace(/,/g, ' ');

    document.onkeyup = function (event) {
        var userGuess = event.key;

        for (var j = 0; j < word.length; j++) {
            var guess = word.indexOf(userGuess, j);
            console.log(guess);
            if (guess > -1) {
                answerArray[guess] = userGuess;
                console.log(answerArray[guess])
                goodGuess = true;
            }
            if (guess == -1 && !goodGuess && userGuess != "Meta") {
                mistakeCounter = mistakeCounter - 1;

                wrongArray.push(userGuess);
                var wrongLetters = wrongArray.toString();
                wrongGuess.innerHTML = wrongLetters.replace(/,/g, ' ');
                goodGuess = true;
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
            if (answerArray.indexOf("_") == -1) {
                header.innerHTML = "<h1>YOU WIN!!! <br /> Press any key to play again</h1>";

                document.onkeyup = function restartGame() {
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
                    lossCount = lossCount + 1;
                    lossContent.innerHTML = "Losses: " + lossCount;
                    run();
                }
            }

            var letterSpaces = answerArray.toString();
            gameContent.innerHTML = letterSpaces.replace(/,/g, ' ');

        }
        goodGuess = false;

    }

}
document.onkeyup = function startGame() {
    run();
}
