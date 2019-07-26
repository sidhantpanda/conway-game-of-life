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

    start: function () {
      this.print();
      let interval = setInterval(() => {
        this.tick();
        if (!this.hasChanged) {
          clearInterval(interval);
        }
        this.print();
      }, 300);
    },

    print: function () {
      this.printBoard();
      this.printStats();
    },

    loadBoardConfig: function (config) {
      if (config.length > 0) {
        this.rows = config.length;
        this.columns = config[0].length;
        this.board = config;
        for (let i = 0; i < this.rows; i++) {
          this.displayMatrix.push(console.draft());
        }

        this.statsDisplayMatrix['alive'] = console.draft();
        this.statsDisplayMatrix['dead'] = console.draft();
        this.statsDisplayMatrix['kills'] = console.draft();
        this.statsDisplayMatrix['births'] = console.draft();

        this.updateCurrentStats();
      }
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
          const aliveCount = this.getAliveNeighbourCount(i, j);
          if (this.board[i][j] === true) {
            if (aliveCount < 2) {
              matrixCopy[i][j] = false;
              this.stats.kills++;
              hasChanged = true;
            } else if (aliveCount > 3) {
              matrixCopy[i][j] = false;
              this.stats.kills++;
              hasChanged = true;
            }
          } else {
            if (aliveCount === 3) {
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

    getAliveNeighbourCount: function (row, column) {
      let aliveCount = 0;

      for (let ni = row - 1; ni <= row + 1; ni++) {
        for (let nj = column - 1; nj <= column + 1; nj++) {
          if (ni < 0 || ni >= this.board.length) {
            continue;
          }
          if (nj < 0 || nj >= this.board[0].length) {
            continue;
          }
          if (ni === row && nj === column) {
            continue;
          }
          if (this.board[ni][nj]) {
            aliveCount++;
          }
        }
      }

      return aliveCount;
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