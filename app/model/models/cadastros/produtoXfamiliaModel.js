const connect = require('../../connect');
const { DataTypes } = require('sequelize');

const produtoXfamiliaModel = connect.define(
    'produto_x_familia',
    {
        id_produto_familia:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        id_familia:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        id_produto:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        ativo: {
            type: DataTypes.BOOLEAN
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    },
    {

        freezeTableName: true
    }
);

module.exports = produtoXfamiliaModel;