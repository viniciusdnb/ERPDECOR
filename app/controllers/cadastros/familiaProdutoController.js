const { Op } = require('sequelize');
const simpleControl = require('../../libs/controller/simpleControl');

module.exports = {
     getOptions: function () {
        return {
            pathModelView: 'cadastros',
            nameModel: 'familiaProduto'
        };
    },
    index: async function (req, res) {
        let options = this.getOptions();
        options.fileNameView = 'main';
        simpleControl.index(req, res, options);
    },
    search: async function (req, res) {
        let options = this.getOptions();
        options.fileNameView = 'main';
        options.queryOptions = {
                where: {
                    [Op.or]: [
                        { id_familia: { [Op.substring]: req.body.search } },
                        { nome_familia: { [Op.substring]: req.body.search } }
                    ]
                }
            }
            await simpleControl.index(req, res, options);
    },
    create: async function (req, res) {
        let options = this.getOptions();
        options.columnsValue = {
            nome_familia: req.body.nome_familia
        };

        await simpleControl.create(req, res, options);
     },
    edit: async function (req, res) { 
        let options = this.getOptions();
        options.fileNameView = 'edit';
        options.queryOptions = {where: {id_familia: req.query.id}};
      await  simpleControl.index(req, res, options);
    },
    update: async function (req, res) {
        let options = this.getOptions();
        options.fileNameView = 'main';
        options.queryOptions = {
            where: {id_familia: req.body.id_familia},
            columnsValue: {nome_familia: req.body.nome_familia}
        };

       await simpleControl.update(req, res, options);
     },
    delete: async function (req, res) { 
        let options = this.getOptions();
        options.fileNameView = 'main';
        options.queryOptions = {where:{id_familia: req.query.id}};
        simpleControl.delete(req, res, options);
    }
}