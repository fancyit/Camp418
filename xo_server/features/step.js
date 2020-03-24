const { Given, When, Then } = require('cucumber');
const request = require('supertest');
const assert = require('assert');
const controller = require('../src/game');
const server = require('../src/server');

let rez = {};
Given('пустое поле', () => {
  controller.reset();
});
Given('ходит игрок {int}', (int) => {
  controller.setCurrentPlayer(int);
});
Given('игрок ходит в клетку {int}, {int}', (x, y) => {
  return request(server)
      .post('/move')
      .send({ x, y })
      .then((res) => {
        rez = res;
      });
});
Then('поле становится {string}', (rez) => {
  let data = request(server)
      .get('/getField')
      .then((res) => {
        res;
      });
  return assert(data,rez);
});
// Given('поле {string}', function (str){
//     str = controller.presetField(("100|200|102").split('|'));
//     let currentPlayer = 1;
//     return data = request(server)
//         .post('/move')
//         .send({ x, y })
//         .then((res) => {
//             rez = res;
//         });
// });
Then(/^возвращается ошибка$/, function () {
    let field = "100|200|102";
    let data = request(server)
        .get('/getField')
        .then((res) => {
            res;
        });
    return assert(data,field.split('|'));
});
Given('поле {string}', function (str){
    let currentPlayer = 1;
    return data = request(server)
        .post('/move')
        .send({ x, y })
        .then((res) => {
            rez = res;
        });
});
Then('победил игрок {int}', (currentPlayer) => {
   let res = data = request(server)
       .post('/move')
       .send({ x, y })
       .then((res) => {
           rez = res;
       });
   if(res.data.data === 'Win'){
       return 'победил игрок' + currentPlayer
   }
   else
       return res;
});