const { Op } = require('sequelize');
const simpleControl = require('../../libs/controller/simpleControl');

module.exports = {
    getOptions: function () {
        return {
            pathModelView: 'cadastros',
            nameModel: 'tipoProduto'
        };
    },
    index: async function (req, res) {
        let options = this.getOptions();
        options.fileNameView = 'main';
            options.queryOptions = { order: [['nomeCliente', 'ASC']] };
        await simpleControl.index(req, res, options);
    },
    search: async function (req, res) {
        let options = this.getOptions();
        options.queryOptions = {
            where: {
                [Op.or]: [
                    { idCliente: { [Op.substring]: req.body.search } },
                    { nomeCliente: { [Op.substring]: req.body.search } }
                ]
            }
        };

        await simpleControl.index(req, res, options);

    },
    create: async function (req, res) {
        let options = this.getOptions();
        options.columnsValue = { nomeCliente: req.body.nome_cliente }

        await simpleControl.create(req, res, options);

    },
    edit: async function (req, res) {
        let options = this.getOptions();
        options.fileNameView = 'edit';
        options.queryOptions = { where: { idCliente: req.query.id } }
        simpleControl.index(req, res, options);

    },
    update: async function (req, res) {
        let options = this.getOptions();
        options.fileNameView = 'main';
        options.queryOptions = {
            where: { idCliente: req.body.id_cliente },
            columnsValue: { nomeCliente: req.body.nome_cliente }
        };
        simpleControl.update(req, res, options);


    },
    delete: async function (req, res) {
        let options = this.getOptions();
         options.fileNameView = 'main';
         options.queryOptions = { where: { idCliente: req.query.id }}
        simpleControl.delete(req, res, options);
    }
}