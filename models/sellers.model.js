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
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });
  Seller.associate = function(models) {
    Seller.hasMany(models.Commission, {
      foreignKey: 'sellerId',
    })
  };
  return Seller;
};
