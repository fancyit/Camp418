
function checkLines(player, grid) {
  let row;
  let col;
  for (let i = 0; i < grid.length; i += 1) {
    row = true;
    col = true;
    for (let j = 0; j < grid.length; j += 1) {
      row = row && (grid[i][j] === player);
      col = col && (grid[j][i] === player);
    }
    if (row || col) break;
  }
  return (row || col);
}
function checkDiags(player, grid) {
  let forward = true;
  let backward = true;
  for (let i = 0; i < grid.length; i += 1) {
    forward = forward && (grid[i][i] === player);
    backward = backward && (grid[i][grid.length - 1 - i] === player);
  }
  return (forward || backward);
}
const moveValidate = (x, y, field) => (x - 1 >= 0
    && y - 1 >= 0
    && x - 1 < field.length
    && y - 1 < field.length
    && field[x - 1][y - 1] === 0
);

module.exports = {
  checkLines,
  checkDiags,
  moveValidate,
};
