const clienteModel = require('../../model/models/cadastros/clienteModel');
const msgNotify = require('../../libs/msgNotify');
const { Op } = require('sequelize');
let dataMsg = null;


module.exports = {
    index: async function (req, res, msg = null) {
        let data = null;
        let countRowData = 0
        try {
            let clientes = await clienteModel.findAll({ limit: 20});
            countRowData = await clienteModel.count();
            let arrClientes = JSON.parse(JSON.stringify(clientes, null));

            if (arrClientes.length == 0) {
                dataMsg = msgNotify.getMsgWarning("Atenção", "nao há clientes cadastrado");
            } else {
                data = arrClientes;
            }

            if (msg != null) {
                dataMsg = msgNotify.getMsgRouter(msg.type, msg.title, msg.text);
            }


        } catch (error) {

            dataMsg = msgNotify.getMsgError("Erro", "Erro desconhecido favor contatar o administrador");

        }

        res.render('cadastros/cliente/index', {
            fileName: 'main',
            data: { arrData: data, countClientes: countRowData },
            msg: dataMsg
        });
        dataMsg = null;
    },
    search: async function (req, res) {
        let data = null;
        try {
            let clientes = await clienteModel.findAll({
                where: {
                    [Op.or]: [
                        { idCliente: { [Op.substring]: req.body.search } },
                        { nomeCliente: { [Op.substring]: req.body.search } }
                    ]
                }
            });
            let arrClientes = JSON.parse(JSON.stringify(clientes));            
            if (arrClientes.length == 0) {
                dataMsg = msgNotify.getMsgWarning("Atenção", "não a clientes cadastrado de acordo com a busca");
            } else {
                data = arrClientes;            
            }


        } catch (error) {
            dataMsg = msgNotify.getMsgError("Erro", "Erro desconhecido favor contatar o administrador")

        }

        res.render('cadastros/cliente/index', {
            fileName: 'main',
            data: { arrData: data, countClientes: arrClientes.length },
            msg: dataMsg
        });
        dataMsg = null;

    },
    pagination: async function (req, res) {

    }
}