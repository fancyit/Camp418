const { checkLines, checkDiags, moveValidate } = require('./helpers/gameUtils');

let field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let currentPlayer = 1;
let movesCounter = 0;
let winner = null;
const maxMoves = field.length ** 2;

function getField() {
  return field;
}
function setCurrentPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}
function checkWin(player, grid) {
  return (checkLines(player, grid) || checkDiags(player, grid));
}
function makeMove(x, y) {
  if (movesCounter === maxMoves) {
    return 'Tie';
  }
  if (moveValidate(x, y, getField())) {
    field[x - 1][y - 1] = currentPlayer;
    if (checkWin(currentPlayer, field)) {
      winner = currentPlayer;
      return 'Win';
    }
    setCurrentPlayer();
    movesCounter += 1;
    return 'OK';
  }
  return false;
}
function reset() {
  field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  currentPlayer = 1;
  movesCounter = 0;
}
function presetField(newField) {
  field = newField;
}
function getCurrentPlayer() {
  return currentPlayer;
}
function getWinner() {
  return winner;
}
module.exports = {
  getField,
  makeMove,
  reset,
  presetField,
  setCurrentPlayer,
  getCurrentPlayer,
  getWinner,
};
