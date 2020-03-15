const Table = require('cli-table');

const grid = new Table({
  colWidths: [5, 5, 5],
  style: { 'padding-left': 2 },
});

grid.push(
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
);
console.log(grid.toString());
