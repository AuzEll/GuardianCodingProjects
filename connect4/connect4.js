const repl = require('node:repl');
const prompt = require('prompt-sync')();

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
}

function ongoingGame(grid) {

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