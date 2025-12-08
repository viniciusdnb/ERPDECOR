const { Op } = require('sequelize');
const simpleControl = require('../../libs/controller/simpleControl');
let options = {
    pathModelView: 'cadastros',
    nameModel: 'familiaProduto'    
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
                        { id_familia_produto: { [Op.substring]: req.body.search } },
                        { nome_familia: { [Op.substring]: req.body.search } }
                    ]
                }
            }
            await simpleControl.index(req, res, options);
    },
    create: async function (req, res) {
        options.columnsValue = {
            nome_familia: req.body.nome_familia
        };

        await simpleControl.create(req, res, options);
     },
    edit: async function (req, res) { 
        options.fileNameView = 'edit';
        options.queryOptions = {where: {id_familia_produto: req.query.id}};
      await  simpleControl.index(req, res, options);
    },
    update: async function (req, res) {
        options.fileNameView = 'main';
        options.queryOptions = {
            where: {id_familia_produto: req.body.id_familia_produto},
            columnsValue: {nome_familia: req.body.nome_familia}
        };

       await simpleControl.update(req, res, options);
     },
    delete: async function (req, res) { 
        options.fileNameView = 'main';
        options.queryOptions = {where:{id_familia_produto: req.query.id}};
        simpleControl.delete(req, res, options);
    }
}