const DraftLog = require('draftlog');
DraftLog(console);

const DEAD = ' ⚪️ ';
const LIVE = ' 🔴 ';

function GameOfLife() {
  return {
    rows: 0,
    columns: 0,
    init: function (rows, columns) {
      this.rows = rows;
      this.columns = columns;
      this.board = getRandomBoard(rows, columns);
      this.displayMatrix = [];
      for (let i = 0; i < rows; i++) {
        this.displayMatrix.push(console.draft());
      }

      this.statsDisplayMatrix['alive'] = console.draft();
      this.statsDisplayMatrix['dead'] = console.draft();
      this.statsDisplayMatrix['kills'] = console.draft();
      this.statsDisplayMatrix['births'] = console.draft();

      this.updateCurrentStats();
    },
    board: [],
    displayMatrix: [],
    hasChanged: true,
    stats: {
      alive: 0,
      dead: 0,
      kills: 0,
      births: 0
    },
    statsDisplayMatrix: [],
    tick: function () {
      let hasChanged = false;
      let matrixCopy = JSON.parse(JSON.stringify(this.board));
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          const info = this.getNeighbourInfo(i, j);
          if (this.board[i][j] === true) {
            if (info.live < 2) {
              matrixCopy[i][j] = false;
              this.stats.kills++;
              hasChanged = true;
            } else if (info.live > 3) {
              matrixCopy[i][j] = false;
              this.stats.kills++;
              hasChanged = true;
            }
          } else {
            if (info.live === 3) {
              matrixCopy[i][j] = true;
              this.stats.births++;
              hasChanged = true;
            }
          }
        }
      }

      this.hasChanged = hasChanged;
      this.updateCurrentStats();
      this.board = matrixCopy;
    },
    printBoard: function () {
      for (let i = 0; i < this.rows; i++) {
        const toPrint = this.board[i].reduce((acc, val) => {
          if (acc === false) {
            acc = DEAD;
          } else if (acc === true) {
            acc = LIVE;
          }
          if (val === false) {
            return acc + DEAD;
          } else {
            return acc + LIVE;
          }
        });
        this.displayMatrix[i](toPrint);
      }
    },
    printStats: function () {
      this.statsDisplayMatrix['alive']('Alive: ' + this.stats.alive);
      this.statsDisplayMatrix['dead']('Dead: ' + this.stats.dead);
      this.statsDisplayMatrix['kills']('Kills: ' + this.stats.kills);
      this.statsDisplayMatrix['births']('Births: ' + this.stats.births);
    },
    updateCurrentStats: function () {
      this.stats.alive = 0;
      this.stats.dead = 0;
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (this.board[i][j]) {
            this.stats.alive++;
          } else {
            this.stats.dead++;
          }
        }
      }
    },
    getNeighbourInfo: function (row, column) {
      const info = {
        live: 0,
        dead: 0
      }

      let mRow = row;
      let mColumn = column;


      // 1. Top left neighbour
      if (mRow === 0) {
        mRow = this.rows - 1;
      } else {
        mRow--;
      }
      if (mColumn === 0) {
        mColumn = this.columns - 1;
      } else {
        mColumn--;
      }
      if (this.board[mRow][mColumn]) {
        info.live++;
      } else {
        info.dead++;
      }

      // 2. Directly above neigbour
      mRow = row;
      mColumn = column;
      if (mRow === 0) {
        mRow = this.rows - 1;
      } else {
        mRow = mRow - 1;
      }
      if (this.board[mRow][mColumn]) {
        info.live++;
      } else {
        info.dead++;
      }

      // 3. Top right neighbour
      mRow = row;
      mColumn = column;
      if (mRow === 0) {
        mRow = this.rows - 1;
      } else {
        mRow--;
      }
      if (mColumn === this.columns - 1) {
        mColumn = 0;
      } else {
        mColumn++;
      }
      if (this.board[mRow][mColumn]) {
        info.live++;
      } else {
        info.dead++;
      }

      // 4. Directly right neighbour
      mRow = row;
      mColumn = column;
      if (mColumn === this.columns - 1) {
        mColumn = 0;
      } else {
        mColumn++;
      }
      if (this.board[mRow][mColumn]) {
        info.live++;
      } else {
        info.dead++;
      }

      // 5. Bottom right neighbour
      mRow = row;
      mColumn = column;
      if (mRow === this.rows - 1) {
        mRow = 0;
      } else {
        mRow++;
      }
      if (mColumn === this.columns - 1) {
        mColumn = 0;
      } else {
        mColumn++;
      }
      if (this.board[mRow][mColumn]) {
        info.live++;
      } else {
        info.dead++;
      }

      // 6. Directly bottom neighbour
      mRow = row;
      mColumn = column;
      if (mRow === this.rows - 1) {
        mRow = 0;
      } else {
        mRow++;
      }
      if (this.board[mRow][mColumn]) {
        info.live++;
      } else {
        info.dead++;
      }

      // 7. Bottom left neighbour
      mRow = row;
      mColumn = column;
      if (mRow === this.rows - 1) {
        mRow = 0;
      } else {
        mRow++;
      }
      if (mColumn === 0) {
        mColumn = this.rows - 1;
      } else {
        mColumn--;
      }
      if (this.board[mRow][mColumn]) {
        info.live++;
      } else {
        info.dead++;
      }

      // 8. Directly left neighbour
      mRow = row;
      mColumn = column;
      if (mColumn === 0) {
        mColumn = this.rows - 1;
      } else {
        mColumn--;
      }
      if (this.board[mRow][mColumn]) {
        info.live++;
      } else {
        info.dead++;
      }

      // if (column > 0) {
      //   if (this.board[row][column - 1] === false) {
      //     info.dead++;
      //   } else {
      //     info.live++;
      //   }
      // }

      // if (row < this.rows - 1) {
      //   if (this.board[row + 1][column] === false) {
      //     info.dead++;
      //   } else {
      //     info.live++;
      //   }
      // }

      // if (column < this.columns - 1) {
      //   if (this.board[row][column + 1] === false) {
      //     info.dead++;
      //   } else {
      //     info.live++;
      //   }
      // }

      // if (row > 0 && column > 0) {
      //   if (this.board[row - 1][column - 1] === false) {
      //     info.dead++;
      //   } else {
      //     info.live++;
      //   }
      // }

      // if (row > 0 && column < this.columns - 1) {
      //   if (this.board[row - 1][column + 1] === false) {
      //     info.dead++;
      //   } else {
      //     info.live++;
      //   }
      // }

      // if (row < this.rows - 1 && column < this.columns - 1) {
      //   if (this.board[row + 1][column + 1] === false) {
      //     info.dead++;
      //   } else {
      //     info.live++;
      //   }
      // }

      // if (row < this.rows - 1 && column > 0) {
      //   if (this.board[row + 1][column - 1] === false) {
      //     info.dead++;
      //   } else {
      //     info.live++;
      //   }
      // }

      return info;
    }
  }
}

function getRandomBoard(rows, columns) {
  const board = [];
  for (let i = 0; i < rows; i++) {
    board.push(getRow(columns));
  }
  return board;
}

function getRow(columns) {
  const row = [];
  for (let i = 0; i < columns; i++) {
    if (getRandomNumber(0, 1) === 0) {
      row.push(false);
    } else {
      row.push(true);
    }
  }
  return row;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = GameOfLife;