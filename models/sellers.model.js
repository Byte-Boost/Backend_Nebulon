module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define("Seller", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
      validate: {
        len: [11, 11],
        is: {
          args: /^\d{11}$/,
          msg: "Invalid CPF format",
        },
      }
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
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  });
  Seller.associate = function(models) {
    Seller.hasMany(models.Commission, {
      foreignKey: 'sellerCPF',
    })
  };
  return Seller;
};
