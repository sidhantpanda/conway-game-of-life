const GameOfLife = require('../gameOfLife');
const samples = require('./sampleConfigs');
const game = new GameOfLife();

game.loadBoardConfig(samples.BEACON);
game.start();
