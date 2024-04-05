module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    bonus: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  Product.associate = function(models) {
    Product.hasMany(models.Commission, {
      foreignKey: 'productId',
    })
  };
  return Product;
};
