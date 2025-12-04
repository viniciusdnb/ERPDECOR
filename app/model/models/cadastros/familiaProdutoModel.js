const connect = require('../../connect');
const {DataTypes} = require('sequelize');

const familiaProdutoModel = connect.define(
    'familia_produto',{
        id_familia_produto:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        nome_familia:{
            type: DataTypes.CHAR(50),
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = familiaProdutoModel;