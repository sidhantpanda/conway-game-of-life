const GameOfLife = require('./gameOfLife');
const game = new GameOfLife();

// Default grid size
let TOTAL_ROWS = 20;
let TOTAL_COLUMNS = 16;

// Check if grid size provided in command line
var args = process.argv.slice(2);
if (args.length > 1) {
  TOTAL_ROWS = parseInt(args[0]);
  TOTAL_COLUMNS = parseInt(args[1]);
}

game.init(TOTAL_ROWS, TOTAL_COLUMNS);
game.start();
