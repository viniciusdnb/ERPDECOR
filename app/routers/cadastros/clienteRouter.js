const express = require('express');
const clienteRouter = express.Router();
const { checkSchema } = require('express-validator');
const clienteController = require('../../controllers/cadastros/clienteController');
const msgNotify = require('../../libs/msgNotify');
const verifyErrorValidator = require('../../libs/auth/verifyErrorValidator');
const searchValidator = require('../../libs/auth/checkSchema/searchValidator');
const idQueryValidator = require('../../libs/auth/checkSchema/idQueryValidator');


clienteRouter.get('/cliente', function (req, res) {
    clienteController.index(req, res);
});

clienteRouter.post('/cliente/search',
    searchValidator,
    function (req, res) {

        if (verifyErrorValidator.getResult(req)) {
            return clienteController.index(req, res);
        }

        clienteController.search(req, res);
    });

clienteRouter.get('/cliente/new', function (req, res) {
    res.render('cadastros/cliente/index', {
        fileName: 'new'
    });
});

clienteRouter.post('/cliente/new',
    checkSchema({
        nome_cliente: {
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
            },
            matches: {
                options: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ]+$/,
                errorMessage: 'O campo deve conter apenas letras, números e espaços'
            }
        }
    }),
    function (req, res) {
        if (verifyErrorValidator.getResult(req)) {
            return clienteController.index(req, res);
        }

        clienteController.create(req, res);
    });

clienteRouter.get('/cliente/edit',
    idQueryValidator,
    function (req, res) {
        if (verifyErrorValidator.getResult(req)) {
            return clienteController.index(req, res);
        }


        clienteController.edit(req, res);
    });

clienteRouter.post('/cliente/edit',
    checkSchema({
        nome_cliente: {
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
            },
            matches: {
                options: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ]+$/,
                errorMessage: 'O campo deve conter apenas letras, números e espaços'
            }
        },
        id_cliente: {
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
    function (req, res) {
        if (verifyErrorValidator.getResult(req)) {
            return clienteController.index(req, res);
        }

        clienteController.update(req, res);
    });

clienteRouter.get('/cliente/delete',
    idQueryValidator,
    function (req, res) {
        if (verifyErrorValidator.getResult(req)) {
            return clienteController.index(req, res);
        }

        clienteController.delete(req, res);
    });



module.exports = clienteRouter;

