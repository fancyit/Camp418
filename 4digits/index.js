const readlineSync = require('readline-sync');
const numLength = Math.floor(Math.random() * (3)) + 3;//разрядность числа
let attempts = numLength + 1, guess = 0;// количество попыток равное кол-ву разрядов, можно поменять, я так сделал для примера
let j = Math.floor(Math.random() * (9)) + 1;// первая цифра числа
let num = [j];// представляем число в виде массива цифр
let bulls = []; // быки
let cows = []; // коровы
let success = false;
for (let k = 0; k < numLength; k++) {   // генерим массив случайных чисел дразмером, соответствующим разрядности, полученной выше
    while (num.toString().indexOf(j) != -1) {
        j = Math.floor(Math.random() * (9)) + 1;
    }
    num.push(j);
}
let test = num.join(''); // приводим массив к строке, со строками работать легче, чем с числами из-за неявного приведения типов при мат операциях
console.log(test);// в тестовых целях отображаем загаданное число
console.log(`Начнем? Загадано число, ${test.length} разрядное, цифры не должны повторяться! =) Попытки: ${attempts}`);
while (attempts > 0) {    
    guess = readlineSync.question(`Попытка № ${attempts}: `);
    if (guess === test) {
        console.log(`Наши поздравления, вы угадали!`); //первым делом проверяем на точное совпадение, чтобы не делать лишнего.
        success = true;
        break;
    }    
    for (let c = 0; c < test.length; c++) {        
        if (test.indexOf(guess[c]) !== -1) {           
            if (test.indexOf(guess[c]) === c){                      
                bulls.push(guess[c]);
            }
            else {                     
                cows.push(guess[c]);
            }
        }       
    }
    console.log(`ответ: совпавших цифр не на своих местах - ${cows.length} (${cows.join(' и ')}), цифр на своих местах - ${bulls.length} (${bulls.join(' и ')})`);    
    attempts--;
    bulls = [];
    cows = [];
}
!success ? console.log(`Вам повезет в следующий раз!!!`) : '';