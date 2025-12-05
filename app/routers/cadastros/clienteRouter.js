const express = require('express');
const clienteRouter = express.Router();
const { checkSchema } = require('express-validator');
const clienteController = require('../../controllers/cadastros/clienteController');
const msgNotify = require('../../libs/msgNotify');
const verifyErrorValidator = require('../../libs/auth/verifyErrorValidator');
const searchValidator = require('../../libs/auth/checkSchema/searchValidator');

clienteRouter.get('/cliente', function (req, res) {
    clienteController.index(req, res);
});

clienteRouter.post('/cliente/search',
    searchValidator,
    /*checkSchema({
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
    }),*/
    function (req, res) {
        /*let errorResult = validationResult(req);
        if (!errorResult.isEmpty()) {
            let arrMsgError = errorResult.array();
            let msg = "";
            arrMsgError.forEach(msgError => {
                msg += msgError.msg + " - ";
            });

            if (!req.session.msg) {
                req.session.msg = msgNotify.getMsgWarning("Atenção", msg)
            }
            
            clienteController.index(req, res);
            return;
        }*/

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
    checkSchema({
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
    }),
    function (req, res) {
        if (verifyErrorValidator.getResult(req)) {
            return clienteController.index(req, res);
        }


        clienteController.edit(req, res);
    });

clienteRouter.post('/cliente/edit', checkSchema({
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
    checkSchema({
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

    }),
    function (req, res) { 
        if(verifyErrorValidator.getResult(req)){
            return clienteController.index(req, res);
        }

        clienteController.delete(req, res);
    });



module.exports = clienteRouter;


/*clienteRouter.get('/cliente/page',
    checkSchema({
        num: {
            in: ['query'],
            escape: true,
            trim: true,
            notEmpty: {
                errorMessage: "não é permitido pagina vazia"
            },
            isNumeric: {
                errorMessage: "é permitido apenas numeros"
            }

        }
    }),
    function (req, res) {
        let errorResult = validationResult(req);
        if (!errorResult.isEmpty()) {
            let arrMsgError = errorResult.array();
            let msg = "";
            arrMsgError.forEach(msgError => {
                msg += msgError.msg + " - ";
            });
            let dataMsg = { type: "error", title: "erro", text: msg };
            clienteController.index(req, res, dataMsg);
            return;
        }

        clienteController.pagination(req, res);
    }
);*/