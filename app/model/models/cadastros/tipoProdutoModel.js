const connect = require('../../connect');
const { DataTypes } = require('sequelize');

const tipoProdutoModel = connect.define(
    'tipo_produto', {
    id_tipo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_tipo_produto: {
        type: DataTypes.CHAR(50),
        allowNull: false
    }
},
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = tipoProdutoModel;