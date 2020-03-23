const rls = require('readline-sync');
const { cellValidator } = require('./helpers/validators');

let currentPlayer = 1;
let win = false;
const grid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const gridValidator = () => {
  console.log(grid[move[0]][move[2]]);
  return (grid[move[0]][move[2]] === 0);
};
function changePlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  return currentPlayer;
}
function checkLines(int) {
  let row;
  let col;
  for (let i = 0; i < grid.length; i++) {
    row = true;
    col = true;
    for (let j = 0; j < grid.length; j++) {
      row = row && (grid[i][j] === int);
      col = col && (grid[j][i] === int);
      // console.log(`row: [${i}][${j}] ${grid[i][j] === int}`);
      // console.log(`col: [${j}][${i}] ${grid[j][i] === int}`);
    }
    if (row || col) break;
  }
  return (row || col);
}
function checkDiags(int) {
  let forward = true;
  let backward = true;
  for (let i = 0; i < grid.length; i++) {
    forward = forward && (grid[i][i] === int);
    backward = backward && (grid[i][grid.length - 1 - i] === int);
    // console.log('['+ i +']'+'['+ (grid.length - 1 - i) +']')
    // console.log('forward ' + forward);
    // console.log('backward ' + backward);
  }
  return (forward || backward);
}
function checkWin(player) {
  return (checkLines(player) || checkDiags(player));
}

const makeMove = (move) => {
  grid[move[0]][move[2]] = currentPlayer;
  win = checkWin(currentPlayer);
  if (win) {
    console.log(grid.join('|'));
    console.log(grid);
    console.log('Winner is Player ', currentPlayer);
  }
  changePlayer();
};

while (!win) {
  console.log('Player ', currentPlayer);
  const tempGrid = grid.join('|');
  console.log(tempGrid);
  let move = rls.question('Input the cell like x,y using comma, where x - row, y -collumn: ');
  while (!cellValidator(move) && gridValidator()) {
    move = rls.question('Wrong cell. Take a look at the grid: ');
  }
  makeMove(move);
  // console.log(grid.join('|'));
}
