
//funcao para criar e apagar a variavel de mensagem na sessao
module.exports = {
    setMessage: function(req, msg){
        if(!req.session.msg){
            req.session.msg = msg;
        }

        req.session.msg = msg;
    },
    cleanMessage: function(req){
         if(!req.session.msg){
            req.session.msg = null;
        }

        req.session.msg = null;
    },
    getSessionMessage: function(req){
        return req.session.msg;

    }

}