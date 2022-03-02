import DraftLog from 'draftlog';
import Board from './board';
DraftLog(console);

export interface TickStat {
  births: number;
  deaths: number;
  numAlive: number;
}

export default class GameOfLife {
  public board: Board;
  public numGenerations = 0;
  public tickStats: TickStat[] = [];

  public isFinished = false;

  constructor(board: Board) {
    this.board = board;
  }

  public tick = () => {
    if (this.isFinished) {
      return;
    }

    const tickStat: TickStat = {
      births: 0,
      deaths: 0,
      numAlive: 0,
    };

    let hasChanged = false;
    const nextBoard = new Board(this.board.cells);
    for (const cell of this.board.iterateCells()) {
      let aliveNeighbors = 0;
      for (const n of this.board.iterateNeighbors(cell.row, cell.column)) {
        if (n.isAlive) {
          aliveNeighbors++;
        }
      }

      if (cell.isAlive) {
        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
          nextBoard.cells[cell.row][cell.column] = false;
          tickStat.deaths++;
          hasChanged = true;
        } else {
          tickStat.numAlive++;
        }
      } else {
        if (aliveNeighbors === 3) {
          nextBoard.cells[cell.row][cell.column] = true;
          tickStat.births++;
          hasChanged = true;
          tickStat.numAlive++;
        }
      }
    }
    if (!hasChanged) {
      this.isFinished = true;
    } else {
      this.board = nextBoard;
      this.numGenerations += 1;
      this.tickStats.push(tickStat);
    }
  };
}
