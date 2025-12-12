const connect = require('../../connect');
const { DataTypes } = require('sequelize');

const operadorModel = connect.define(
    'operador', {
    id_operador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_operador: {
        type: DataTypes.CHAR(100),
        allowNull: false
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updateAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    freezeTableName: true
}
);

module.exports = operadorModel;