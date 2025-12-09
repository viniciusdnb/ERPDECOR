const connect = require('../../connect');
const { DataTypes } = require('sequelize');

const produtoModel = connect.define(
    'produto',
    {
        id_produto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome_produto: {
            type: DataTypes.CHAR(150),
            allowNull: false
        },
        codigo_cliente: {
            type: DataTypes.CHAR(50)
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

module.exports = produtoModel