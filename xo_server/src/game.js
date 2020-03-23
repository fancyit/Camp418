const validate = require('./helpers/validators');
const { checkLines, checkDiags } = require('./helpers/winChecker');
let field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let currentPlayer = 1;
let win = false;

function getField() {
  return field;
}

function checkWin(player, field) {
  return (checkLines(player, field) || checkDiags(player, field));
}

function makeMove(x, y) {
  if(validate(x,y, getField())) {
    field[x-1][y-1] = currentPlayer;
    if (checkWin(currentPlayer, field)){
      return 'Win'
    }
    setCurrentPlayer();
    return 'OK'
  }
  return false
}
function reset() {
  field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  currentPlayer = 1;
}

function presetField(newField) {
  field = newField;
}
function setCurrentPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}
function  getCurrentPlayer(){
  return  currentPlayer;
}
module.exports = {
  getField,
  makeMove,
  reset,
  presetField,
  setCurrentPlayer,
  getCurrentPlayer,
};
