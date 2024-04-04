const {DataTypes} = require('sequelize')
const sequelize = require('../sequelize')

const Product = sequelize.define('Commissions', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    value:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
})

sequelize.sync();
module.exports = Product;