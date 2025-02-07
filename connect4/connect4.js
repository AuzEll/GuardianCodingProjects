const repl = require('node:repl');
const prompt = require('prompt-sync')({ sigint: true });

var connectNumber = 4;
var width = 6;
var height = 7;

// Candidiate = x
// Interviewer = o

function newGame() {
    var grid = [];

    for (var i = 0; i < height; i++) {
        let row = [];
        for (var j = 0; j < width; j++) row.push(".");
        grid.push(row);
    }

    printGridString(grid);
    ongoingGame(grid);
}

function ongoingGame(grid) {
    var playerWins = false;
    var candidateTurn = true;
    var token;

    while (!playerWins) {
        var selectedColumn = "0";

        while (parseInt(selectedColumn) < 1 || parseInt(selectedColumn) > width || isNaN(selectedColumn) || grid[0][selectedColumn - 1] != ".") {
            switch (candidateTurn) {
                case true:
                    selectedColumn = prompt("Candidate's turn. Input a number between 1 and " + width + ": ");
                    token = "x";
                    break;
                case false:
                    selectedColumn = prompt("Interviewer's turn. Input a number between 1 and " + width + ": ");
                    token = "o";
                    break;
            }

            if (parseInt(selectedColumn) < 1 || parseInt(selectedColumn) > width || isNaN(selectedColumn)) console.log("Invalid input. Try again.");
            if (grid[0][selectedColumn - 1] != ".") console.log("That column is full. Try again.");
        }

        for (var i = 0; i < grid.length - 1; i++) {
            if (grid[i + 1][selectedColumn - 1] != ".") {
                grid[i][selectedColumn - 1] = token;
                break;
            }
            if (i + 2 == grid.length) {
                grid[i + 1][selectedColumn - 1] = token;
                break;
            }
        }

        printGridString(grid);
        candidateTurn = !candidateTurn;
    }
}

function printGridString(grid) {
    for (var i = 0; i < grid.length; i++) {
        let string = "";
        for (var j = 0; j < grid[i].length; j++) string += (grid[i][j] + " ");
        console.log(string);
    }
}

newGame();

//repl.start();