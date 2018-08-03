const DraftLog = require('draftlog');
DraftLog(console);

let TOTAL_ROWS = 20;
let TOTAL_COLUMNS = 16;
const DEAD = ' ⚪️ ';
const LIVE = ' 🔴 ';
let interval = null;

var args = process.argv.slice(2);
if (args.length > 1) {
  TOTAL_ROWS = parseInt(args[0]);
  TOTAL_COLUMNS = parseInt(args[1]);
}

let GAME_MATRIX = [];
const DISPLAY_MATRIX = [];
let iterationNumber = 0;

for (let i = 0; i < TOTAL_ROWS; i++) {
  GAME_MATRIX.push(getRow());
  DISPLAY_MATRIX.push(console.draft());
}

let currentIteration = 0;
iterationLog = console.draft();

printGameMatrix();

interval = setInterval(() => {
  currentIteration++;
  transitionToNextPhase();
  printGameMatrix();
}, 200);

function transitionToNextPhase() {
  let hasChanged = false;
  let matrixCopy = JSON.parse(JSON.stringify(GAME_MATRIX));
  // Any live cell with fewer than two live neighbors dies, as if by under population.
  // Any live cell with two or three live neighbors lives on to the next generation.
  // Any live cell with more than three live neighbors dies, as if by overpopulation.
  // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
  for (let row = 0; row < TOTAL_ROWS; row++) {
    const thisRow = [];
    for (let column = 0; column < TOTAL_COLUMNS; column++) {
      const info = getNeighbourInfo(matrixCopy, row, column);
      if (matrixCopy[row][column] === LIVE) {
        if (info.live < 2) {
          GAME_MATRIX[row][column] = DEAD;
          hasChanged = true;
        } else if (info.live > 3) {
          GAME_MATRIX[row][column] = DEAD;
          hasChanged = true;
        }
      } else {
        if (info.live === 3) {
          GAME_MATRIX[row][column] = LIVE;
          hasChanged = true;
        }
      }
      thisRow.push
    }
  }

  if (!hasChanged) {
    console.log('FIN!');
    clearInterval(interval);
  }
}

function getNeighbourInfo(matrix, row, column) {
  const info = {
    live: 0,
    dead: 0
  }

  if (row > 0) {
    if (matrix[row - 1][column] === DEAD) {
      info.dead++;
    } else {
      info.live++;
    }
  }

  if (column > 0) {
    if (matrix[row][column - 1] === DEAD) {
      info.dead++;
    } else {
      info.live++;
    }
  }

  if (row < TOTAL_ROWS - 1) {
    if (matrix[row + 1][column] === DEAD) {
      info.dead++;
    } else {
      info.live++;
    }
  }

  if (column < TOTAL_COLUMNS - 1) {
    if (matrix[row][column + 1] === DEAD) {
      info.dead++;
    } else {
      info.live++;
    }
  }

  if (row > 0 && column > 0) {
    if (matrix[row - 1][column - 1] === DEAD) {
      info.dead++;
    } else {
      info.live++;
    }
  }

  if (row > 0 && column < TOTAL_COLUMNS - 1) {
    if (matrix[row - 1][column + 1] === DEAD) {
      info.dead++;
    } else {
      info.live++;
    }
  }

  if (row < TOTAL_ROWS - 1 && column < TOTAL_COLUMNS - 1) {
    if (matrix[row + 1][column + 1] === DEAD) {
      info.dead++;
    } else {
      info.live++;
    }
  }

  if (row < TOTAL_ROWS - 1 && column > 0) {
    if (matrix[row + 1][column - 1] === DEAD) {
      info.dead++;
    } else {
      info.live++;
    }
  }

  return info;
}

function printGameMatrix() {
  const reducer = (acc, val) => acc + val;
  for (let i = 0; i < TOTAL_ROWS; i++) {
    const toPrint = GAME_MATRIX[i].reduce(reducer);
    DISPLAY_MATRIX[i](toPrint);
  }
  iterationLog('Iteration # ' + currentIteration);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRow() {
  const row = [];
  for (let i = 0; i < TOTAL_COLUMNS; i++) {
    if (getRandomNumber(0, 1) === 0) {
      row.push(DEAD);
    } else {
      row.push(LIVE);
    }
  }
  return row;
}