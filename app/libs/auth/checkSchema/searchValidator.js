const { checkSchema } = require('express-validator');

const searchValidator = checkSchema({
    search: {
        in: ['body'],
        escape: true,
        trim: true,
        notEmpty: {
            errorMessage: "o campo de busca é obrigatorio"
        },
        isString: {
            errorMessage: "dados invalido"
        },
        isLength: {
            options: { min: 1 },
            errorMessage: "texto muito curto"
        }

    }
});

module.exports = searchValidator;
