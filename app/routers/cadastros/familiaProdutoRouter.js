const express = require('express');
const familiaProdutoRouter = express.Router();
const { checkSchema } = require('express-validator');
const familiaProdutoController = require('../../controllers/cadastros/familiaProdutoController');
const msgNotify = require('../../libs/msgNotify');
const verifyErrorValidator = require('../../libs/auth/verifyErrorValidator');

familiaProdutoRouter.get('/familia-produto', function(req, res){
    familiaProdutoController.index(req, res);
});




module.exports = familiaProdutoRouter;
