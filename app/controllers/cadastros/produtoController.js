const { Op } = require('sequelize');
const simpleControl = require('../../libs/controller/simpleControl');
const msgNotify = require('../../libs/msgNotify');
const sessionMsg = require('../../libs/sessionMsg');
const familiaProdutoModel = require('../../model/models/cadastros/familiaProdutoModel');
const tipoProdutoModel = require('../../model/models/cadastros/tipoProdutoModel');
const produtoModel = require('../../model/models/cadastros/produtoModel');
const produtoXfamiliaModel = require('../../model/models/cadastros/produtoXfamiliaModel');
const produtoXtipoModel = require('../../model/models/cadastros/produtoXtipoModel');


//tras os dados de produto e os dados da dabela de associação
produtoModel.hasMany(produtoXfamiliaModel, { foreignKey: "id_produto" });
produtoModel.hasMany(produtoXtipoModel, { foreignKey: "id_produto" });

//tras os dados de familia e tipo que esta associado na tabela de associal 
produtoXfamiliaModel.belongsTo(familiaProdutoModel, { foreignKey: "id_familia" });
produtoXtipoModel.belongsTo(tipoProdutoModel, { foreignKey: "id_tipo" });

module.exports = {
    getOption: function () {
        return {
            pathModelView: 'cadastros',
            nameModel: 'produto'
        };
    },
    index: async function (req, res) {

        let produtosModel = await produtoModel.findAll({
            include: [
                {
                    model: produtoXfamiliaModel,
                    include: { model: familiaProdutoModel }
                },
                {
                    model: produtoXtipoModel,
                    include: { model: tipoProdutoModel }
                },

            ],
            order: [['nome_produto', 'ASC']]
        });

        let produtos = JSON.parse(JSON.stringify(produtosModel, null));

        simpleControl.render(req, res,
            this.getOption().pathModelView,
            this.getOption().nameModel,
            "main",
            produtos
        );



    },
    search: async function (req, res) {
        let options = this.getOption();
        options.queryOptions = {
            where: {
                [Op.or]: [
                    { id_produto: { [Op.substring]: req.body.search } },
                    { nome_produto: { [Op.substring]: req.body.search } },
                    { codigo_cliente: { [Op.substring]: req.body.search } },
                    { ativo: { [Op.substring]: req.body.search } }
                ]
            }
        };

        await simpleControl.index(req, res, options);
    },
    new: async function (req, res) {
        try {
            let familias = await familiaProdutoModel.findAll();
            let tipos = await tipoProdutoModel.findAll();
            let arrFamilias = JSON.parse(JSON.stringify(familias, null));
            let arrTipos = JSON.parse(JSON.stringify(tipos, null));

            if (arrFamilias.length == 0 || arrTipos.length == 0) {
                sessionMsg.setMessage(req, msgNotify.getMsgWarning("Atenção", "para incluir um produto é obrigatorio o cadastro da famila e tipo"));
                return res.render('cadastros/produto/index', {
                    fileName: 'main',
                    data: { arrData: null },
                    msg: sessionMsg.getSessionMessage(req)
                }
                );
            }

            return res.render('cadastros/produto/index', {
                fileName: 'new',
                data: { 'arrFamilias': arrFamilias, 'arrTipos': arrTipos }
            }
            )


        } catch (error) {
            sessionMsg.setMessage(req, msgNotify.getMsgError("Erro", "erro desconhecido contate o administrador"));
            this.index(req, res);
            /*return res.render('cadastros/produto/index', {
                fileName: 'main',
                data: { arrData: null },
                msg: sessionMsg.getSessionMessage(req)
            }
            );*/
        }



    },
    create: async function (req, res) {
        console.log(req.body);
        let nome_produto = req.body.nome_produto
        let codigo_cliente = req.body.codigo_cliente
        let id_tipo = req.body.id_tipo
        let id_familia = req.body.id_familia
        let ativo = req.body.ativo == 'on' ? true : false;

        try {
            let produto = await produtoModel.create({
                nome_produto: nome_produto,
                codigo_cliente: codigo_cliente,
                ativo: ativo
            });
            let id_produto = produto.id_produto;

            await produtoXfamiliaModel.create({
                id_familia: id_familia,
                id_produto: id_produto,
                ativo: true
            });
            await produtoXtipoModel.create({
                id_tipo: id_tipo,
                id_produto: id_produto,
                ativo: true
            })
        } catch (error) {
            console.log(error);
            sessionMsg.setMessage(req, msgNotify.getMsgError("Erro", "não foi possivel adicionar um produto no momento. contate o administrador"));
            return this.index(req, res)
        }

        sessionMsg.setMessage(req, msgNotify.getMsgSuccess("Erro", "produto inserido com sucesso"));
        return this.index(req, res);
    },
    edit: async function (req, res) { },
    update: async function (req, res) { },
    delete: async function (req, res) { }
}