const inputValidator = (ch) => (ch === 'x' || ch === 'o');
const cellValidator = (s) => (s.split(',').length === 2);
const gridValidator = (x, y, g) => {
  console.log(g[x][y]);
  return (g[x][y] === 0);
};
const winCheck = (g) => {
  return null;
};
module.exports = {
  inputValidator,
  gridValidator,
  winCheck,
  cellValidator,
};
