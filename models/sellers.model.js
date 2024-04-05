module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define("Seller", {
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
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Seller.associate = function(models) {
    Seller.hasMany(models.Commission, {
      foreignKey: 'sellerId',
    })
  };
  return Seller;
};
