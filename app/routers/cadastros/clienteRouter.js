const express = require('express');
const clienteRouter = express.Router();
const { checkSchema, validationResult } = require('express-validator');
const clienteController = require('../../controllers/cadastros/clienteController');
const msgNotify = require('../../libs/msgNotify');

clienteRouter.get('/cliente', function (req, res) {
    clienteController.index(req, res);
});

clienteRouter.post('/cliente/search',
    checkSchema({
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
    }),
    function (req, res) {
        let errorResult = validationResult(req);
        if (!errorResult.isEmpty()) {
            let arrMsgError = errorResult.array();
            let msg = "";
            arrMsgError.forEach(msgError =>{
                msg +=  msgError.msg + " - ";
            });
            let dataMsg = {type: "error", title: "erro", text: msg};
            clienteController.index(req, res, dataMsg);
            return;
        }

        clienteController.search(req, res);
    }
)



module.exports = clienteRouter;
