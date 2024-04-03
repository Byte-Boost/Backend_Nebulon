const {DataTypes} = require('sequelize')
const sequelize = require('../sequelize')

const Product = sequelize.define('Product', {
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
      product_id:{
        type: DataTypes.INTEGER,
        references:{
            model: Product,
            key:'id'
        }
    },
      seller_id:{
        type: DataTypes.INTEGER,
        references:{
            model:Seller,
            key:'id'
        }
      }
})

sequelize.sync();
module.exports = Product;