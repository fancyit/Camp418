const fs = require('fs');
const users = require('../lib/localDB.json');

function saveNewUser(user) {
  return new Promise((resolve, reject) => {
    users.push(user);
    fs.writeFile('src/lib/localDB.json', JSON.stringify(users), (err) => {
      if (err) reject(console.log(err));
      resolve(console.log('File saved.'));
    });
  }).catch(err => console.log(err));
}
module.exports = saveNewUser;
