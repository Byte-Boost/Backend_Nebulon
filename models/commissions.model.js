module.exports = (sequelize, DataTypes) => {
  const Commission = sequelize.define("Commission", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Commission.associate = function(models) {
    Commission.belongsTo(models.Client, {
      foreignKey: 'clientId',
      onDelete: 'CASCADE'
    })
    // Doesn't exists for now
    // Commission.belongsTo(models.Product, {
    //   foreignKey: 'productId',
    //   onDelete: 'CASCADE'
    // })
    Commission.belongsTo(models.Seller, {
      foreignKey: 'sellerId',
      onDelete: 'CASCADE'
    })
  };
  return Commission;
};
