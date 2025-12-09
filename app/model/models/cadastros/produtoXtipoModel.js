const connect = require('../../connect');
const { DataTypes } = require('sequelize');

const produtoXtipoModel = connect.define(
    'produto_x_tipo',
    {
        id_produto_tipo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_tipo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_produto: {
            type: DataTypes.INTEGER,
            allowNull: false
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

module.exports = produtoXtipoModel;
