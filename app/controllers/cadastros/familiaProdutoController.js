const { Op } = require('sequelize');
const simpleControl = require('../../libs/controller/simpleControl');
let options = {
    pathModelView: 'cadastros',
    nameModel: 'familiaProduto'
    
}
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
        /*await simpleControl.index(req, res, {
            pathModelView: 'cadastros',
            nameModel: 'familiaProduto',
            fileNameView: 'main',
            queryOptions: {
                where: {
                    [Op.or]: [
                        { id_tipo_produto: { [Op.substring]: req.body.search } },
                        { nome_tipo_produto: { [Op.substring]: req.body.search } }
                    ]
                }
            }
        });*/
    },
    create: async function (req, res) { },
    edit: async function (req, res) { },
    update: async function (req, res) { },
    delete: async function (req, res) { }
}