const { checkSchema } = require('express-validator');

const idQueryValidator = checkSchema({
    id: {
        in: ["query"],
        trim: true,
        escape: true,
        notEmpty: {
            errorMessage: "não é permitido id vazio"
        },
        isNumeric: {
            errorMessage: "é permitido somente numeros"
        }
    }
});

module.exports = idQueryValidator;