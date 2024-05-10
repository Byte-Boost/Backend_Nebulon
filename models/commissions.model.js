module.exports = (sequelize, DataTypes) => {
  const Commission = sequelize.define("Commission", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
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
    clientCNPJ: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sellerCPF: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Commission.associate = function(models) {
    Commission.belongsTo(models.Client, {
      foreignKey: 'clientCNPJ',
      onDelete: 'CASCADE'
    })
    Commission.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    })
    Commission.belongsTo(models.Seller, {
      foreignKey: 'sellerCPF',
      onDelete: 'CASCADE'
    })
  };
  return Commission;
};
