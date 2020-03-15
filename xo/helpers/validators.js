const inputValidator = (ch) => (ch === 'x' || ch === 'o');
const gridValidator = (x, y, a) => (a[x][y] !== '');
module.exports = {
  inputValidator,
  gridValidator,
};
