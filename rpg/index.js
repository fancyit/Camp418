const rls         = require('readline-sync');
let monster = require ('./monster.js');
let user    = require ('./user');
let state   = require ('./initState');
let idx = 0;
const randomize = () =>{
    return Math.floor(Math.random()*3);
};
const checkMonstersMove = (idx) =>{
    if(state.monster.moves[idx].cooldown==monster.moves[idx].cooldown){state.monster.moves[idx].cooldown=0}
    return state.monster.moves[idx].cooldown!=0||
       state.monster.moves[idx].cooldown!=monster.moves[idx].cooldown;
};
const checkUsersMove = (c) =>{
    if(state.user.moves[c].cooldown==user.moves[c].cooldown){state.user.moves[c].cooldown=0}
    return state.user.moves[c].cooldown===0
    //||state.user.moves[c].cooldown!=user.moves[c].cooldown;
};
const userAvailableMoves = (s) => {   
    s.moves.map((el, index)=>{
        console.log(index+': '+ el.name + `(Физ. урон: ${el.physicalDmg}, физ. броня: ${el.physicArmorPercents}, Маг.урон: ${el.magicDmg}, маг.броня: ${el.magicArmorPercents}, кд: ${el.cooldown}`);        
    });    
};
const monstersMove = () =>{
    idx = randomize();
    while(!checkMonstersMove(idx)){
        checkMonstersMove(randomize());        
    }
    state.monster.moves[idx].cooldown++;
    state.monster.currentAction = state.monster.moves[idx].name;
};
const action = () => {

}

console.log(`Добро пожаловать в игру! Пожалуйста, выберите сложность, указав кол-во здровья вашего персонажа от 10 до 5
            (чкм меньше - тем сложнее ;-) ) У монстра 10 здоровья, по умолчанию у вас тоже. Во время боя выбирайте цифру доступного действия`);

const initUserHealth = rls.question(`Укажите здоровье: `);
state.user.health = initUserHealth === '' ? 10: initUserHealth;

while(state.user.health>0 && state.monster.health>0){
    monstersMove();
    console.log(`Дествие монстра: ${state.monster.currentAction},
    Чем ответишь, герой?
    Доступны следующие действия:`);
    userAvailableMoves(state.user);    

    //console.log(state.monster.moves);
    //console.log(state.user.moves); 
    break;   
}

 