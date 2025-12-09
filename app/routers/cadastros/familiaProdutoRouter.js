const express = require('express');
const familiaProdutoRouter = express.Router();
const { checkSchema } = require('express-validator');
const familiaProdutoController = require('../../controllers/cadastros/familiaProdutoController');
const msgNotify = require('../../libs/msgNotify');
const verifyErrorValidator = require('../../libs/auth/verifyErrorValidator');
const searchValidator = require('../../libs/auth/checkSchema/searchValidator');
const idQueryValidator = require('../../libs/auth/checkSchema/idQueryValidator');

familiaProdutoRouter.get('/familiaProduto', 
    function(req, res){
    familiaProdutoController.index(req, res);
});

familiaProdutoRouter.post('/familiaProduto/search', 
    searchValidator,
    function(req, res){
        if(verifyErrorValidator.getResult(req)){
            return familiaProdutoController.index(req, res);
        }

        familiaProdutoController.search(req, res);
});

familiaProdutoRouter.get('/familiaProduto/new', 
    function(req, res){
    res.render('cadastros/familiaProduto/index',
        {fileName:'new'}
    );
});

familiaProdutoRouter.post('/familiaProduto/new',
    checkSchema({
        nome_familia: {
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
            return familiaProdutoController.index(req, res);
        }

        familiaProdutoController.create(req, res);
});

familiaProdutoRouter.get('/familiaProduto/edit', 
    idQueryValidator,
    function(req, res){
        if(verifyErrorValidator.getResult(req)){
            return familiaProdutoController.index(req, res);
        }

        familiaProdutoController.edit(req, res);
});

familiaProdutoRouter.post('/familiaProduto/edit',
    checkSchema({
        nome_familia: {
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
        id_familia: {
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
            return familiaProdutoController.index(req, res);
        }

        familiaProdutoController.update(req, res);
});

familiaProdutoRouter.get('/familiaProduto/delete', 
    idQueryValidator,
    function(req, res){
        if(verifyErrorValidator.getResult(req)){
            return familiaProdutoController.index(req, res);
        }

        familiaProdutoController.delete(req, res);
});



module.exports = familiaProdutoRouter;
