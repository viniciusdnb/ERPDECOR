const { validationResult } = require('express-validator');
const msgNotify = require('../msgNotify');
//funcao que padrao para verificar se ha erros na validação e gera mensagem na sessao e retorna true se contiver erro
module.exports = {
    getResult: function (req) {
        let errorResult = validationResult(req);
        if (!errorResult.isEmpty()) {
            let arrMsgError = errorResult.array();
            let msg = "";
            arrMsgError.forEach(msgError => {
                msg += msgError.msg + " - ";
            });

            if (!req.session.msg) {
                req.session.msg = msgNotify.getMsgWarning("Atenção", msg)
            }

           return true;
        }

        return false;
    }
}