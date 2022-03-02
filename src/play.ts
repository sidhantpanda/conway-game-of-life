import { getRandomBoard } from './board';
import GameOfLife from './game';
import GamePrinter from './printer';

const asyncAwait = (timeInMs: number) =>
  new Promise((res) => {
    setTimeout(res, timeInMs);
  });

const playGame = async () => {
  const rando = getRandomBoard(5, 5);
  const game = new GameOfLife(rando);
  const printer = new GamePrinter(game);
  printer.printStats();
  printer.printBoard();
  while (!game.isFinished) {
    await asyncAwait(1000);
    game.tick();
    printer.printStats();
    printer.printBoard();
  }

  const totals = game.tickStats.reduce(
    (prevTotal, stat) => {
      prevTotal.births += stat.births;
      prevTotal.deaths += stat.deaths;
      return prevTotal;
    },
    {
      births: 0,
      deaths: 0,
    }
  );

  console.log('Played ', game.numGenerations, ' generations');
  console.log('Total Births ', totals.births);
  console.log('Total Deaths ', totals.deaths);
};

playGame();
