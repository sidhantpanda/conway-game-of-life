const GameOfLife = require('./gameOfLife');
const game = new GameOfLife();

let TOTAL_ROWS = 20;
let TOTAL_COLUMNS = 16;
var args = process.argv.slice(2);
if (args.length > 1) {
  TOTAL_ROWS = parseInt(args[0]);
  TOTAL_COLUMNS = parseInt(args[1]);
}

game.init(TOTAL_ROWS, TOTAL_COLUMNS);
game.printBoard();
game.printStats();

interval = setInterval(() => {
  game.tick();
  if (!game.hasChanged) {
    clearInterval(interval);
  }
  game.printBoard();
  game.printStats();
}, 300);