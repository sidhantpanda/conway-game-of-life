const GameOfLife = require('../gameOfLife');
const samples = require('./sampleConfigs');
const game = new GameOfLife();

game.loadBoardConfig(samples.BLINKER);
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