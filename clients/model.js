const {DataTypes} = require('sequelize')
const sequelize = require('../sequelize')

const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull: false,
    },
})

sequelize.sync();
module.exports = Client;