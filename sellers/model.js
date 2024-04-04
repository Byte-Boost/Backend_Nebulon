const {DataTypes} = require('sequelize')
const sequelize = require('../sequelize')

const Seller = sequelize.define('Seller', {
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
    salary_value:{
        type: DataTypes.FLOAT,
        allowNull: false,
    }
})

sequelize.sync();
module.exports = Seller;