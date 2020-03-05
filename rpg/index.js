const rls         = require('readline-sync');
const lib = require('./helpers');
let monster = require ('./monster.js');
let user    = require ('./user');
let state   = require ('./initState');

console.log(`Добро пожаловать в игру! Пожалуйста, выберите сложность, указав кол-во здровья вашего персонажа от 10 до 5
            (чкм меньше - тем сложнее ;-) ) У монстра 10 здоровья, по умолчанию у вас тоже. Во время боя выбирайте цифру доступного действия`);
const initUserHealth = rls.question(`Укажите здоровье: `);
user.maxHealth = initUserHealth === '' ? 10: initUserHealth;
while(user.maxHealth>0 && monster.maxHealth>0){
    state.monster.currentAction = monster.moves[lib.randomize()].name;
    console.log(`Дествие монстра: ${state.monster.currentAction},
Чем ответишь, герой?
Доступны следующие действия:`); 

    break;   
}
// console.log(monster);
// console.log(user);
// const action = (k,v) =>{
//     console.log(initMonster.moves.find((k) => {return }));
// }
// action('Удар боевым кадилом',0);
// console.log(randomize());
 