const {op} = require('sequelize');
const simpleControl = require('../../libs/controller/simpleControl');

module.exports = {
    getOptions: function () {
        return {
            pathModelView: 'producao',
            nameModel: 'operador'
        };
    },
    index: async function (req, res) {
        
    },
    search: async function(req, res){

    },
    create: async function(req, res){

    },
    update: async function(req, res){

    },
    delete: async function(req, res){
        
    }
}