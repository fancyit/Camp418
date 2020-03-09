const path = require('path');
const filesStorage = './questions/';
const fs = require('fs');
const rl = require('readline-sync');
let questions = [];
let answers = [];
let num = []; // массив рандомных цифр, с помощью которого будем определять задаваемые вопросы
//проверка ввода
const rangeValidator = (min, max, v) => {
    return (v > min && v < max);
}
//массив из 5и случайных чисел, по ним будем задавать вопросы из массива вопросов
const randomNums = () => {
    for (let k = 0; k < 5; k++) {
        j = Math.floor(Math.random() * (questions.length));//максимальна длина определяется кол-вом файлов с вопросами
        while (num.toString().indexOf(j) != -1) {
            j = Math.floor(Math.random() * (questions.length));
        }
        num.push(j);
    }
}
//функция для чтения файлов в директории
const getFiles = (dir, files_) => {
    files_ = files_ || [];
    let files = fs.readdirSync(dir);
    for (let i in files) {
        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
};
const _files = getFiles(filesStorage);
//ф-я linereader возвращающая массив строк из переданного файла
const lr = (f) => {
    let arr = [];
    fs.readFileSync(f, 'utf-8').split(/\r?\n/).forEach(function (l, i) {
        arr.push(l);
    });
    return arr;
}
//помещаем все наши вопросы в массив
for (let i = 0; i < _files.length; i++) {
    questions.push(lr(_files[i]));
};
//получаем массив случайных чисел, по которым будем задавать вопросы
randomNums();
console.log(num);

// console.log(questions[num[0]].length);
for (let i = 0; i < num.length; i++) {
    console.log(`Вопрос № ${i + 1}: ${questions[num[i]][0]}`);
    console.log(`варианты ответов: `);
    for (let c = 2; c < questions[num[i]].length; c++) {
        console.log(`${c - 1}: ${questions[num[i]][c]}`);
    }
    answers[i] = parseInt(rl.question(`Ваш ответ: `)) + 1;
    while (!rangeValidator(1, questions[num[i]].length, answers[i])) {
        answers[i] = parseInt(rl.question(`Ваш ответ: `)) + 1;
    }
};
console.log(`Проверка ответов`);
for (let i = 0; i < num.length; i++) {
    console.log(`Вопрос № ${i + 1}: ${questions[num[i]][0]}`);
    if (questions[num[i]][answers[i]] === questions[num[i]][1]) {
        console.log(`Ваш ответ: ${questions[num[i]][answers[i]]} - правильный, поздравляем!`);
    }
    else {
        console.log(`Ваш ответ: ${questions[num[i]][answers[i]]} - неверный,
        правильный ответ: ${questions[num[i]][1]}`);
    }
};





