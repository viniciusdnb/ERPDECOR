

const simpleModel = require('../model/simpleModel');
const msgNotify = require('../msgNotify');
const sessionMsg = require('../sessionMsg');
//let arrData = null;
let queryResult = null
module.exports = {
    /**
     * 
     * @param {express} req 
     * @param {express} res 
     * @param {string} pathModelView 
     * @param {string} nameModel 
     * @param {string} fileNameView 
     * @param {object} arrData 
     */
    render: function (req, res, pathModelView, nameModel, fileNameView, arrData = null) {
        res.render(`${pathModelView}/${nameModel}/index`, {
            fileName: fileNameView,
            data: { arrData: arrData },
            msg: sessionMsg.getSessionMessage(req)
        });
         
        
        sessionMsg.cleanMessage(req);
    },
    /**
     * 
     * @param {{pathModelView: string,  nameModel: string, fileNameView: string, queryOptions: Sequelize}} options 
     * 
     * 
     * pathModelView: nome da pasta da view e do model -> /cadastros    
     * nameModel: nome do model sem o sufixo model -> cliente
     * fileNameView: nome do arquivo que sera chamado na view -> main
     * queryOptions: objeto do tipo queryOptions do sequielize omite ou envia o obj
     */
    index: async function (req, res, options) {
        let arrData = null;
        if ('queryOptions' in options) {
            queryResult = await simpleModel.findAll(options.pathModelView, options.nameModel, options.queryOptions);
        } else {
            queryResult = await simpleModel.findAll(options.pathModelView, options.nameModel);
        }

        if (queryResult.result) {
            arrData = queryResult.data;

        } else if (queryResult.result == null) {
            //se o resultado é null significa que a consulta ocorreu mas  nao retornou dados validos
            sessionMsg.setMessage(req, msgNotify.getMsgWarning("Atenção", `nao há ${options.nameModel} cadastrado`));
            let dataModel = await simpleModel.findAll(options.pathModelView, options.nameModel);
            return this.render(req, res,
                options.pathModelView,
                options.nameModel,
                'main',
                dataModel.data
            );
        } else {
            //se retornar false ouve erro ao fazer a consulta
            sessionMsg.setMessage(req, msgNotify.getMsgError("Erro", "Erro  desconhecido favor contatar o administrador"));
            return this.render(req, res,
                options.pathModelView,
                options.nameModel,
                'main'
            );
        }

        this.render(req, res, options.pathModelView, options.nameModel, options.fileNameView, arrData);

    },
    /**
    * 
    * @param {{pathModelView: string,  nameModel: string, fileNameView: string, columnsValue: {nameColumn: value}}} options 
    * 
    * 
    * pathModelView: nome da pasta da view e do model -> /cadastros    
    * nameModel: nome do model sem o sufixo model -> cliente
    * fileNameView: nome do arquivo que sera chamado na view -> main
    * columnsValue: objeto com chaves sendo nome da coluna e value os valores
    */
    create: async function (req, res, options) {
        queryResult = await simpleModel.create(options.pathModelView, options.nameModel, options.columnsValue);

        if (queryResult.result) {
            sessionMsg.setMessage(req, msgNotify.getMsgSuccess("Sucesso", `${options.nameModel} cadastrado com sucesso`));

            return res.redirect(`/${options.nameModel}`);
        } else {
            sessionMsg.setMessage(req, msgNotify.getMsgError("Erro", "Erro desconhecido favor contatar o administrador"));
            return res.redirect(`/${options.nameModel}`);
        }



    },
    /**
     * 
     * @param {{
     *  pathModelView: string,
     *  nameModel: string,
     *  fileNameView: string,
     *  queryOptions:{
     *  where: {nameColumnId: Id}, 
     *  columnsValue: {nameColumn: value}}
     * }} options      * 
     * 
     * pathModelView: nome da pasta da view e do model -> /cadastros    
     * nameModel: nome do model sem o sufixo model -> cliente
     * fileNameView: nome do arquivo que sera chamado na view -> main
     * 
     */
    update: async function (req, res, options) {
        queryResult = await simpleModel.update(options.pathModelView, options.nameModel,
            options.queryOptions);

        if (queryResult.result) {
            sessionMsg.setMessage(req, msgNotify.getMsgSuccess("Sucesso", `${options.nameModel} cadastrado atualizado com sucesso`));
            return res.redirect(`/${options.nameModel}`);
        } else {
            sessionMsg.setMessage(req, msgNotify.getMsgError("Erro", "Erro desconhecido favor contatar o administrador"));
            return res.redirect(`/${options.nameModel}`);
        }
    },
    delete: async function (req, res, options) {
        queryResult = await simpleModel.delete(options.pathModelView, options.nameModel,
            options.queryOptions);

        if (queryResult.result) {
            sessionMsg.setMessage(req, msgNotify.getMsgSuccess("Sucesso", `${options.nameModel} cadastrado excluido com sucesso`));
            return res.redirect(`/${options.nameModel}`);
        } else {
            sessionMsg.setMessage(req, msgNotify.getMsgError("Erro", "Erro desconhecido favor contatar o administrador"));
            return res.redirect(`/${options.nameModel}`);
        }
    }




}