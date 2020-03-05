const rls   = require('readline-sync');
const lib   = require('./helpers');
const monsterMove = (idx) => {
    state.monster.currentAction = monster.moves[idx].name;
    if(state.monster.moves[idx].cooldown===monster.moves[idx].cooldown){
        monster.moves[idx].cooldown=0;
    }
    else{
        state.monster.moves[idx].cooldown++;
    }
};
const userMove = (idx) => {
    state.user.currentAction = user.moves[idx].name;
    if(state.user.moves[idx].cooldown===user.moves[idx].cooldown){
        user.moves[idx].cooldown=0;
    }
    else{
        state.user.moves[idx].cooldown++;
    }
};
let monster = require ('./monster.js');
let user    = require ('./user');
let state   = require ('./initState');
let idx=0;
console.log(state.monster.moves[idx]);
console.log(`Добро пожаловать в игру! Пожалуйста, выберите сложность, указав кол-во здровья вашего персонажа от 10 до 5
            (чкм меньше - тем сложнее ;-) ) У монстра 10 здоровья, по умолчанию у вас тоже. Во время боя выбирайте цифру доступного действия`);
const initUserHealth = rls.question(`Укажите здоровье: `);
user.maxHealth = initUserHealth === '' ? 10: initUserHealth;
while(user.maxHealth>0 && monster.maxHealth>0){
    while(state.monster.moves[idx].cooldown != monster.moves[idx].cooldown
        || state.monster.moves[idx].cooldown!=0){ //пока не найдем мув не на кд, генерим случайный индекс
        idx = lib.randomize();
    }
    monsterMove(idx);
    console.log(`Дествие монстра: ${state.monster.currentAction},
Чем ответишь, герой?
Доступны следующие действия:`);
    console.log(this.state.monster);
    break;
}
// console.log(monster);
// console.log(user);
// const action = (k,v) =>{
//     console.log(initMonster.moves.find((k) => {return }));
// }
// action('Удар боевым кадилом',0);
// console.log(randomize());
 