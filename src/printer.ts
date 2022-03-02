import GameOfLife, { TickStat } from './game';

interface DispayCell {
  (message?: any, ...optionalParams: any[]): void;
}

enum EMOJI {
  ALIVE = '🔴',
  DEAD = '⚪️',
}

export default class GamePrinter {
  public displayRows: DispayCell[];

  public displayStats = {
    generation: console.draft(),
    alive: console.draft(),
    deaths: console.draft(),
    births: console.draft(),
  };

  constructor(private readonly game: GameOfLife) {
    this.game = game;
    this.displayRows = this.game.board.cells.map((_) => console.draft());
  }

  public printBoard = (): void => {
    this.displayRows.forEach((row, i) => {
      row(
        this.game
          .board
          .cells[i].map((cell) => (cell ? EMOJI.ALIVE : EMOJI.DEAD))
          .join('')
      );
    });
  };

  public printStats = (): void => {
    let stats: TickStat;
    if (this.game.tickStats.length > 0) {
      stats = this.game.tickStats[this.game.tickStats.length - 1];
    } else {
      stats = {
        numAlive: this.game.board.getNumAlive(),
        deaths: 0,
        births: 0,
      };
    }
    this.displayStats.generation(`Generation:\t${this.game.numGenerations}`);
    this.displayStats.alive(`Alive:\t\t${stats.numAlive}`);
    this.displayStats.births(`Births:\t\t${stats.births}`);
    this.displayStats.deaths(`Deaths:\t\t${stats.deaths}`);
  };
}
