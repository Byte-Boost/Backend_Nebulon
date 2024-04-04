const {DataTypes} = require('sequelize')
const sequelize = require('../sequelize')

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    value:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    commission_value:{
        type: DataTypes.FLOAT,
        allowNull: false,
    }
})

sequelize.sync();
module.exports = Product;