const express = require('express');
const operadorRouter = express.Router();
const operadorController = require('../../controllers/producao/operadorController');
const {checkSchema} = require('express-validator');
const verifyErrorValidator = require('../../libs/auth/verifyErrorValidator');
const idQueryValidator = require('../../libs/auth/checkSchema/idQueryValidator');
const searchValidator = require('../../libs/auth/checkSchema/searchValidator');

operadorRouter.get('/operador', function(req, res){
    operadorController.index(req,res);
});

operadorRouter.post('/operador/search', 
    searchValidator,
    function(req, res){
        if(verifyErrorValidator(req)){
            return operadorController.index(req, res);
        }

        operadorController.search(req, res);
});

operadorRouter.get('operador/new',
    function(req, res){
        res.render('producao/operador/index', {fileName: 'new'});
    }
);
