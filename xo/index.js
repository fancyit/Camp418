const Table = require('cli-table');
const rls = require('readline-sync');
const { inputValidator } = require('./helpers/validators');

const grid = new Table({
  colWidths: [5, 5, 5],
  style: { 'padding-left': 2 },
});

grid.push(
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
);
const sign = () => {
  let choice = rls.question('select your sign: ');
  while (!inputValidator(choice)) {
    console.log('You need to input x or o, not 0');
    choice = rls.question('input your sign: ');
  }
  return choice;
};
const p1Sign = sign();
const p2Sign = p1Sign === 'x' ? 'o' : 'x';

console.log(grid.toString());
console.log(p1Sign, p2Sign);
