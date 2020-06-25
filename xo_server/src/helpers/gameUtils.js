
function checkLines(player, grid) {
  let row, col; // vert and horizontal lines
  let forward = true, backward = true; // diagonals  
  for (let i = 0; i < grid.length; i += 1) {
    row = true, col = true;    
    for (let j = 0; j < grid.length; j += 1) {
      row = row && (grid[i][j] === player);
      col = col && (grid[j][i] === player);
    }
    if (row || col) break;
    forward = forward && (grid[i][i] === player);
    backward = backward && (grid[i][grid.length - 1 - i] === player);
  }
  return (row || col) || (forward || backward);
}
const moveValidate = (x, y, field) => (x - 1 >= 0
    && y - 1 >= 0
    && x - 1 < field.length
    && y - 1 < field.length
    && field[x - 1][y - 1] === 0
);

module.exports = {
  checkLines,  
  moveValidate,
};
