const clienteModel = require('../../model/models/cadastros/clienteModel');
const msgNotify = require('../../libs/msgNotify');
const { Op } = require('sequelize');
const sessionMsg = require('../../libs/sessionMsg');
const simpleControl = require('../../libs/controller/simpleControl');


module.exports = {
    index: async function (req, res) {
        await simpleControl.index(req, res, {
            pathModelView: 'cadastros',
            nameModel: 'cliente',
            fileNameView: 'main',
            queryOptions: { order: [['nomeCliente', 'ASC']] }
        });
    },
    search: async function (req, res) {
        await simpleControl.index(req, res, {
            pathModelView: 'cadastros',
            nameModel: 'cliente',
            fileNameView: 'main',
            queryOptions: {
                where: {
                    [Op.or]: [
                        { idCliente: { [Op.substring]: req.body.search } },
                        { nomeCliente: { [Op.substring]: req.body.search } }
                    ]
                }
            }
        });

    },
    create: async function (req, res) {
        simpleControl.create(req, res, {
            pathModelView: 'cadastros',
            nameModel: 'cliente',
            fileNameView: 'main',
            columnsValue: {
                nomeCliente: req.body.nome_cliente
            }
        });

    },
    edit: async function (req, res) {

        simpleControl.index(req, res, {
            pathModelView: 'cadastros',
            nameModel: 'cliente',
            fileNameView: 'edit',
            queryOptions: {
                where: { idCliente: req.query.id }
            }
        });

    },
    update: async function (req, res) {
        simpleControl.update(req, res, {
            pathModelView: 'cadastros',
            nameModel: 'cliente',
            fileNameView: 'main',
            queryOptions: {
                where: { idCliente: req.body.id_cliente },
                columnsValue: { nomeCliente: req.body.nome_cliente }
            }
        }
        );


    },
    delete: async function (req, res) {
        simpleControl.delete(req, res, {
            pathModelView: 'cadastros',
            nameModel: 'cliente',
            fileNameView: 'main',
            queryOptions: {
                where: { idCliente: req.query.id }
            }
        });
    }
}