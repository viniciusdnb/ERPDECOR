const express = require('express');
const produtoRouter = express.Router();
const produtoController = require('../../controllers/cadastros/produtoController');
const { checkSchema } = require('express-validator');
const verifyErrorValidator = require('../../libs/auth/verifyErrorValidator');
const searchValidator = require('../../libs/auth/checkSchema/searchValidator');
const idQueryValidator = require('../../libs/auth/checkSchema/idQueryValidator');
var baseValidator = {
    nome_produto: {
        in: ['body'],
        escape: true,
        trim: true,
        notEmpty: {
            errorMessage: "campo de nome de produto não é permitido vazio"
        },
        isLength: {
            options: {
                min: 4,
                max: 150
            },
            errorMessage: "quantidade de caracter não é permitido"
        }
    },
    codigo_cliente: {
        in: ['body'],
        escape: true,
        trim: true,
        isLength: {
            options: {
                max: 50
            },
            errorMessage: "quantidade de caracter do campo codigo cliente não é permitido"
        },
        matches: {
            options: /^(|.+)$/,
            errorMessage: 'O campo codigo de cliente esta com valor invalido'
        }
    },
    ativo: {
        in: ['body'],
        escape: true,
        trim: true,
        matches: {
            options: /^(on)?$/,
            errorMessage: 'O campo ativo esta com valor invalido'
        }

    },
    id_tipo: {
        in: ["body"],
        trim: true,
        escape: true,
        notEmpty: {
            errorMessage: "campo tipo não é permitido id vazio"
        },
        isNumeric: {
            errorMessage: "campo tipo é permitido somente numeros"
        }
    },
    id_familia: {
        in: ["body"],
        trim: true,
        escape: true,
        notEmpty: {
            errorMessage: "campo familia não é permitido id vazio"
        },
        isNumeric: {
            errorMessage: "campo familia é permitido somente numeros"
        }
    }
};
var baseIdValidator = {
        in: ["body"],
        trim: true,
        escape: true,
        notEmpty: {
            errorMessage: "não é permitido id vazio"
        },
        isNumeric: {
            errorMessage: "é permitido somente numeros"
        }
};

const formValidatorNew = checkSchema(baseValidator);
const formValidatorUpdate = checkSchema(baseValidatorUpdate(baseValidator))
function baseValidatorUpdate(base){
     base.id_produto_familia = baseIdValidator;
     base.id_produto_tipo = baseIdValidator;

     return base;
}

produtoRouter.get('/produto',
    function (req, res) {
        produtoController.index(req, res);
    }
);

produtoRouter.post('/produto/search',
    searchValidator,
    function (req, res) {
        if (verifyErrorValidator.getResult(req)) {
            return produtoController.index(req, res);
        }

        produtoController.search(req, res);
    }
);

produtoRouter.get('/produto/new',
    function (req, res) {
        produtoController.new(req, res);
    }
);

produtoRouter.post('/produto/new', formValidatorNew,

    function (req, res) {

        if (verifyErrorValidator.getResult(req)) {
            return produtoController.index(req, res);
        }

        produtoController.create(req, res);
    }

);

produtoRouter.get('/produto/edit',
    idQueryValidator,
    function (req, res) {
        if (verifyErrorValidator.getResult(req)) {
            return produtoController.index(req, res);
        }

        produtoController.edit(req, res);
    }
);

produtoRouter.post('/produto/edit',
    formValidatorUpdate,
    function (req, res) {
        if (verifyErrorValidator.getResult(req)) {
            return produtoController.index(req, res);
        }

        produtoController.update(req, res);
    }
);

produtoRouter.get('/produto/delete',
    idQueryValidator,
    function (req, res) {
        if (verifyErrorValidator.getResult(req)) {
            return produtoController.index(req, res);
        }

        produtoController.delete(req, res);
    }
);

module.exports = produtoRouter;