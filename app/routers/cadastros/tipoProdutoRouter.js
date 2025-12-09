const express = require('express');
const tipoProdutoRouter = express.Router();
const tipoProdutoController = require('../../controllers/cadastros/tipoProdutoController');
const { checkSchema } = require('express-validator');
const verifyErrorValidator = require('../../libs/auth/verifyErrorValidator');
const searchValidator = require('../../libs/auth/checkSchema/searchValidator');
const idQueryValidator = require('../../libs/auth/checkSchema/idQueryValidator');

tipoProdutoRouter.get('/tipoProduto',
    function (req, res) {
        tipoProdutoController.index(req, res);
    }
);

tipoProdutoRouter.post('/tipoProduto/search',
    searchValidator,
    function (req, res) {
        if (verifyErrorValidator.getResult(req)) {
            return tipoProdutoController.index(req, res);
        }

        tipoProdutoController.search(req, res);
    }
);

tipoProdutoRouter.get('/tipoProduto/new',
    function (req, res) {
        res.render('cadastros/tipoProduto/index', { fileName: 'new' });
    }
);

tipoProdutoRouter.post('/tipoProduto/new',
    checkSchema({
        nome_tipo_produto: {
            in: ['body'],
            escape: true,
            trim: true,
            notEmpty: {
                errorMessage: "campo não é permitido vazio"
            },
            isLength: {
                options: {
                    min: 4,
                    max: 50
                },
                errorMessage: "quantidade de caracter não permitido"
            }
        }
    }),
    function(req, res){
        if(verifyErrorValidator.getResult(req)){
            return tipoProdutoController.index(req, res);
        }

        tipoProdutoController.create(req, res);
    }
);

tipoProdutoRouter.get('/tipoProduto/edit',
    idQueryValidator,
    function(req, res){
        if(verifyErrorValidator.getResult(req)){
            return tipoProdutoController.index(req, res);
        }

        tipoProdutoController.edit(req, res);
    }
);

tipoProdutoRouter.post('/tipoProduto/edit', 
    checkSchema({
        nome_tipo_produto: {
            in: ['body'],
            escape: true,
            trim: true,
            notEmpty: {
                errorMessage: "campo não é permitido vazio"
            },
            isLength: {
                options: {
                    min: 4,
                    max: 50
                },
                errorMessage: "quantidade de caracter não permitido"
            }
        },
        id_tipo: {
            in: ['body'],
            trim: true,
            escape: true,
            notEmpty: {
                errorMessage: "não é permitido id vazio"
            },
            isNumeric: {
                errorMessage: "é permitido somente numeros"
            }
        }
    }),
    function(req, res){
        if(verifyErrorValidator.getResult(req)){
            return tipoProdutoController.index(req, res);
        }

        tipoProdutoController.update(req, res);
    }
);

tipoProdutoRouter.get('/tipoProduto/delete',
    idQueryValidator,
    function(req, res){
        if(verifyErrorValidator.getResult(req)){
            return tipoProdutoController.index(req, res);
        }

        tipoProdutoController.delete(req, res);
    }
)


module.exports = tipoProdutoRouter;