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
        var candidateName = candidateTurn ? "Candidate" : "Interviewer";

        while (parseInt(selectedColumn) < 1 || parseInt(selectedColumn) > grid[0].length || isNaN(selectedColumn) || grid[0][selectedColumn - 1] != ".") {
            selectedColumn = prompt(candidateName + "'s turn. Input a number between 1 and " + grid[0].length + ": ");

            switch (candidateTurn) {
                case true:
                    token = "x";
                    break;
                case false:
                    token = "o";
                    break;
            }

            if (parseInt(selectedColumn) < 1 || parseInt(selectedColumn) > grid[0].length || isNaN(selectedColumn)) console.log("Invalid input. Try again.");
            else if (grid[0][selectedColumn - 1] != ".") console.log("That column is full. Try again.");
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

        if (checkForConnection(grid, token)) {
            console.log(candidateName + " Wins!");
            playerWins = true;
        }

        candidateTurn = !candidateTurn;
    }
}

function checkForConnection(grid, token) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            let tokenCount = 0;

            // Check for across connection
            for (var k = 0; k < connectNumber; k++) if (j + k < grid[0].length && grid[i][j + k] == token) tokenCount++;
            if (tokenCount == connectNumber) return true;
            tokenCount = 0;

            // Check for up/down connection
            for (var k = 0; k < connectNumber; k++) if (i + k < grid.length && grid[i + k][j] == token) tokenCount++;
            if (tokenCount == connectNumber) return true;
            tokenCount = 0;

            // Check for downwards diagonal connection
            for (var k = 0; k < connectNumber; k++) if (j + k < grid[0].length && i + k < grid.length && grid[i + k][j + k] == token) tokenCount++;
            if (tokenCount == connectNumber) return true;
            tokenCount = 0;

            // Check for upwards diagonal connection
            for (var k = 0; k < connectNumber; k++) if (j + k < grid[0].length && i - k >= 0 && grid[i - k][j + k] == token) tokenCount++;
            if (tokenCount == connectNumber) return true;
            tokenCount = 0;

        }
    }
    return false;
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