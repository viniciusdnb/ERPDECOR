const clienteModel = require('../../model/models/cadastros/clienteModel');
const msgNotify = require('../../libs/msgNotify');
const { Op } = require('sequelize');
const sessionMsg = require('../../libs/sessionMsg');
let dataMsg = null;

module.exports = {
    index: async function (req, res) {

        let data = null;
        let arrClientes = null;
        try {
            let clientes = await clienteModel.findAll({ order: [['nomeCliente', 'ASC']] });
           
            arrClientes = JSON.parse(JSON.stringify(clientes, null));

            if (arrClientes.length == 0) {

                sessionMsg.setMessage(req, msgNotify.getMsgWarning("Atenção", "nao há clientes cadastrado"));

            } else {
                data = arrClientes;
            }

        } catch (error) {
            sessionMsg.setMessage(req, msgNotify.getMsgError("Erro", "Erro desconhecido favor contatar o administrador"));
        }
        
        res.render('cadastros/cliente/index', {
            fileName: 'main',
            data: { arrData: data },
            msg: sessionMsg.getSessionMessage(req)
        });
        sessionMsg.cleanMessage(req);

    },
    search: async function (req, res) {

        let data = null;
        let arrClientes = null;
        try {
            let clientes = await clienteModel.findAll({
                where: {
                    [Op.or]: [
                        { idCliente: { [Op.substring]: req.body.search } },
                        { nomeCliente: { [Op.substring]: req.body.search } }
                    ]
                }
            });
            arrClientes = JSON.parse(JSON.stringify(clientes));

            if (arrClientes.length == 0) {

                sessionMsg.setMessage(req, msgNotify.getMsgWarning("Atenção", "não a clientes cadastrado de acordo com a busca"));

            } else {
                data = arrClientes;
            }


        } catch (error) {
            sessionMsg.setMessage(req, msgNotify.getMsgError("Erro", "Erro desconhecido favor contatar o administrador"))


        }

        res.render('cadastros/cliente/index', {
            fileName: 'main',
            data: { arrData: data },
            msg: sessionMsg.getSessionMessage(req)
        });
        sessionMsg.cleanMessage(req);

    },
    create: async function (req, res) {
        try {
            await clienteModel.create({ nomeCliente: req.body.nome_cliente });
            sessionMsg.setMessage(req, msgNotify.getMsgSuccess("Sucesso", "cliente cadastrado com sucesso"));

        } catch (error) {
            sessionMsg.setMessage(req, msgNotify.getMsgError("Erro", "Erro desconhecido favor contatar o administrador"));

        }

        this.index(req, res);
    },
    edit: async function (req, res) {
        let data = null;
        let arrClientes = null;
        try {
            let clientes = await clienteModel.findAll({where:{idCliente: req.query.id} });
          
            arrClientes = JSON.parse(JSON.stringify(clientes, null));

            if (arrClientes.length == 0) {

                sessionMsg.setMessage(req, msgNotify.getMsgWarning("Atenção", "nao há clientes cadastrado"));

            } else {
                data = arrClientes;
            }

        } catch (error) {
            sessionMsg.setMessage(req, msgNotify.getMsgError("Erro", "Erro desconhecido favor contatar o administrador"));
        }
        
        res.render('cadastros/cliente/index', {
            fileName: 'edit',
            data: { arrData: data },
            msg: sessionMsg.getSessionMessage(req)
        });
        sessionMsg.cleanMessage(req);
    },
    update: async function (req, res) { 
          try {
            await clienteModel.update({ nomeCliente: req.body.nome_cliente }, {where:{idCliente: req.body.id_cliente}});
            sessionMsg.setMessage(req, msgNotify.getMsgSuccess("Sucesso", "cliente alterado com sucesso"));

        } catch (error) {
            sessionMsg.setMessage(req, msgNotify.getMsgError("Erro", "Erro desconhecido favor contatar o administrador"));

        }

        this.index(req, res);

    },
    delete: async function (req, res) { 
        try {
            await clienteModel.destroy({where:{idCliente: req.query.id}});
            sessionMsg.setMessage(req, msgNotify.getMsgSuccess("Sucesso", "cliente excluido com sucesso"));
        } catch (error) {
            sessionMsg.setMessage(req, msgNotify.getMsgError("Erro", "não foi possivel excluir no momento, talvez o registro esta sendo usado"));
        }

         this.index(req, res);
    }
}