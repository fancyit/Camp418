const rls = require('readline-sync');
let monster = require('./monster.js'); //определим модель монстра
let user = require('./user'); //определеим модел пользователя(Евстафий)
let state = require('./initState'); //Я использую паттерн состояния приложения, каждое действие его меняет
let idx = 0;
let movesCounter = 0;
let msg = '';
//рандомайзер до максимального значения max
const randomize = (max) => {
    return Math.floor(Math.random() * max);
};
//проверка ввода
const rangeValidator = (min, max, v) => {
    return (v && v > min && v < max);
}
//отображаем доступные действия пользователя и действия на кулдауне
const userAvailableMoves = (s) => {
    s.moves.map((el, index) => {
        console.log(index + ': ' + el.name + `(Физ. урон: ${el.physicalDmg}, физ. броня: ${el.physicArmorPercents}, Маг.урон: ${el.magicDmg}, маг.броня: ${el.magicArmorPercents}, кд: ${el.cooldown})`);
    });
    console.log('На КД: ');
    s.movesCD.map((el, index) => {
        console.log(`${el.name} (Физ. урон: ${el.physicalDmg}, физ. броня: ${el.physicArmorPercents}, Маг.урон: ${el.magicDmg}, маг.броня: ${el.magicArmorPercents}, кд: ${el.cooldown})`);
    });
};
//ход монстра
const monstersMove = () => {
    idx = randomize(state.monster.moves.length - 1);
    let curMove = state.monster.moves[idx];
    console.log(`Выбор монстра - ${curMove.name} (Физ. урон: ${curMove.physicalDmg}, физ. броня: ${curMove.physicArmorPercents}, Маг.урон: ${curMove.magicDmg}, маг.броня: ${curMove.magicArmorPercents})`);
    state.monster.currentAction = state.monster.moves[idx].name;
    if (monster.moves[idx].cooldown != 0) {
        state.monster.movesCD.push(state.monster.moves[idx]);
        state.monster.moves.splice(idx, 1);
    }
};
//ход юзера
const usersMove = (idx) => {
    let s = state.user;
    s.currentAction = s.moves[idx].name;
    if (user.moves[idx].cooldown != 0) {
        s.movesCD.push(s.moves[idx]);
        s.moves.splice(idx, 1);
    }
};
//пробегаем по всем экшнам на куладуне, проверяем, если кулдаун прошел, возвращаем в доступные
const cooldownIterator = (obj) => {
    let model;
    //console.log("iterator 1", obj);
    if (obj === 'monster') {
        obj = state.monster;
        model = monster;
    }
    else {
        obj = state.user;
        model = user;
    }
    if (movesCounter != 0) {
        obj.movesCD.forEach((element, i) => {
            let cd = model.moves.filter(o => {
                return o.name === element.name
            });
            if (element.cooldown - 1 === 0) {
                obj.moves.push(cd[0]);
                obj.movesCD.splice(i, 1);
                i--;
            }
            else {
                element.cooldown--;
            }
        });
    }
};
//считаем нанесенный урон
const damageCalc = () => {
    let usersHealth = state.user.health;
    let monstersHealth = state.monster.health;
    let usersAction = user.moves.filter(o => {
        return o.name === state.user.currentAction;
    })[0];
    let monstersAction = monster.moves.filter(o => {
        return o.name === state.monster.currentAction;
    })[0];
    state.user.health = usersHealth - (monstersAction.physicalDmg -
        (monstersAction.physicalDmg * (usersAction.physicArmorPercents / 100)) +
        monstersAction.magicDmg - (monstersAction.magicDmg * (usersAction.magicArmorPercents / 100)));

    state.monster.health = monstersHealth - (usersAction.physicalDmg -
        (usersAction.physicalDmg * (monstersAction.physicArmorPercents / 100)) +
        usersAction.magicDmg - (usersAction.magicDmg * (monstersAction.magicArmorPercents / 100)));
};
//вызываем все функции по факту получения экшна от юзера
const fight = (userChoice) => {
    cooldownIterator('monster');
    cooldownIterator('');
    console.log(`Твой выбор - ${state.user.moves[parseInt(userChoice)].name}, отлично!`);
    usersMove(userChoice);
    damageCalc();
};
//приветствие(видно только вначале игры)
console.log(`Добро пожаловать в игру! Пожалуйста, выберите сложность, указав кол-во здровья вашего персонажа от 5 до 10
            (чкм меньше - тем сложнее ;-) ) У монстра 10 здоровья, по умолчанию у вас тоже. Во время боя выбирайте цифру доступного действия`);
//задаем сложность
let initUserHealth = rls.question(`Укажите здоровье: `);
while (!rangeValidator(4, 11, initUserHealth)) {
    console.log(`Здоровье может быть от 5 до 10 !!!`);
    initUserHealth = rls.question(`Укажите здоровье: `);
}
state.user.health = initUserHealth === '' ? 10 : initUserHealth;
// в цикле будет происходить сама игра
while (state.user.health > 0 && state.monster.health > 0) {
    console.log(`###################   Раунд ${movesCounter + 1}  ###################`);
    console.log(`Монстр имеет ${state.monster.health} здоровья, ты ${state.user.health}`);
    monstersMove();
    console.log(`Чем ответишь, герой? Доступны следующие действия: `);
    userAvailableMoves(state.user);
    let choice = rls.question(`Выбери действие, нажав номер: `);
    while (!rangeValidator(-1, state.user.moves.length, choice)) {
        choice = rls.question(`Выбери действие, нажав номер: `);
    }
    fight(choice);
    //console.log(state.monster);
    //console.log(state.user);
    movesCounter++;
    //break;   
}
//финальное сообщение
msg = state.user.health > 0 ? `################# Отличная работ! Ты победил!!! #################`
    : state.monster.health > 0 ? `################# Монстр оказался хитрее... #################`
        : `################# Вы оба сдохли!!! #################`;
console.log(msg);






