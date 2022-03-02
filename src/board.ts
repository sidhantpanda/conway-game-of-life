import DraftLog from 'draftlog';
DraftLog(console);

const is2DMatrixEqual = <T>(a?: T[][], b?: T[][]) => {
  if (!a || !b) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  if (a.length === 0) {
    return true;
  }
  if (a[0].length !== b[0].length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[0].length; j++) {
      if (a[i][j] !== b[i][j]) {
        return false;
      }
    }
  }
  return true;
};

export const getRandomBoard = (rows: number, columns: number) => {
  const cells = [];
  for (let i = 0; i < rows; i++) {
    cells.push(getRandomRow(columns));
  }
  const board = new Board(cells);
  return board;
};

function getRandomRow(columns: number) {
  const row = [];
  for (let i = 0; i < columns; i++) {
    row.push(getRandomNumber(0, 1) !== 0);
  }
  return row;
}

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export interface Cell {
  row: number;
  column: number;
  isAlive: boolean;
}

export default class Board {
  public readonly numRows: number;
  public readonly numColumns: number;
  public cells: boolean[][];

  constructor(initialCells: boolean[][]) {
    this.cells = JSON.parse(JSON.stringify(initialCells));
    this.numRows = initialCells.length;
    if (initialCells.length > 0) {
      this.numColumns = initialCells[0].length;
    } else {
      this.numColumns = -1;
    }
  }

  /**
   * Internal method to get the neighbors of a cell
   * @param rowIndex Cell row index
   * @param columnIndex Cell column index
   * @return One of the neighbour for the cell
   */
  *iterateNeighbors(
    rowIndex: number,
    columnIndex: number
  ): IterableIterator<Cell> {
    for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
      for (let j = columnIndex - 1; j <= columnIndex + 1; j++) {
        if (i >= 0 && i < this.numRows && j >= 0 && j < this.numColumns) {
          if (i !== rowIndex || j !== columnIndex) {
            yield { row: i, column: j, isAlive: this.cells[i][j] };
          }
        }
      }
    }
  }

  /**
   * Iterate through all the cells
   */
  *iterateCells(): IterableIterator<Cell> {
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numColumns; j++) {
        yield { row: i, column: j, isAlive: this.cells[i][j] };
      }
    }
  }

  public getNumAlive = () => {
    let count = 0;
    for (const cell of this.iterateCells()) {
      if (cell.isAlive) {
        count++;
      }
    }
    return count;
  };

  public isSame = (otherBoard?: Board) =>
    is2DMatrixEqual(this.cells, otherBoard?.cells);
}
