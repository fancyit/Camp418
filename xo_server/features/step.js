const { Given, When, Then } = require('cucumber');
const request = require('supertest');
const assert = require('assert');
const controller = require('../src/game');
const server = require('../src/server');

let lastRez = {};
let lastErr = null;
let currentPlayer = 1;

Given('пустое поле', () => {
  return request(server)
      .post('/reset')
      .then(res => lastRez =res)
      .catch(err => lastErr = err)
});

Given('ходит игрок {int}', (int) => {
    return request(server)
        .post('/setCurrentPlayer')
        .send({ player: int })
        .then(res => currentPlayer =res)
        .catch(err => lastErr = err); 
});

Given('поле {string}', function (str){    
    return request(server)
        .post('/presetField')
        .send({field: str})
        .then(value => {
            lastRez = value;
        }).catch(err => {
            lastErr = err;
        });        
});

When('игрок ходит в клетку {int}, {int}', (x, y) => {
  return request(server)
      .post('/move')
      .send({ x, y })
      .then((res) => {
        lastRez = res;
      }).catch(err => {
          lastErr = err;
      });
});
Then('поле становится {string}', (rez) => {
    let data = request(server).get('/getField')
    return assert(data , rez);
});

Then('победил игрок {int}', (currentPlayer) => {
   const data =  request(server).get('/getWinner');
   return assert(currentPlayer, data);
});
Then(/^возвращается ошибка$/, function () {
    return lastErr;
});
