const moveValidate = (x, y, field) => (x - 1 >= 0
    && y - 1 >= 0
    && x - 1 < field.length
    && y - 1 < field.length
    && field[x - 1][y - 1] === 0
);
module.exports = moveValidate;
