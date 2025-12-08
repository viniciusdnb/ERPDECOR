const { Op } = require('sequelize');
const simpleControl = require('../../libs/controller/simpleControl');
let options = {
    pathModelView: 'cadastros',
    nameModel: 'tipoProduto'
};

module.exports = {
    index: async function (req, res) {
        options.fileNameView = 'main';
        simpleControl.index(req, res, options);
    },
    search: async function (req, res) {
        options.fileNameView = 'main';
        options.queryOptions = {
            where: {
                [Op.or]: [
                    { id_tipo_produto: { [Op.substring]: req.body.search } },
                    { nome_tipo_produto: { [Op.substring]: req.body.search } }
                ]
            }
        }

        await simpleControl.index(req, res, options);
    },
    create: async function (req, res) {
        options.columnsValue = {
            nome_tipo_produto: req.body.nome_tipo_produto
        };

        await simpleControl.create(req, res, options);
    },
    edit: async function (req, res) {
        options.fileNameView = 'edit';
        options.queryOptions = { where: { id_tipo_produto: req.query.id } };
        await simpleControl.index(req, res, options);
    },
    update: async function (req, res) {
        options.fileNameView = 'main';
        options.queryOptions = {
            where: { id_tipo_produto: req.body.id_tipo_produto },
            columnsValue: { nome_tipo_produto: req.body.nome_tipo_produto }
        };

        await simpleControl.update(req, res, options);
    },
    delete: async function (req, res) {
        options.fileNameView = 'main';
        options.queryOptions = { where: { id_tipo_produto: req.query.id } };
        simpleControl.delete(req, res, options);
    }
}