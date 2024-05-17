const Commission = require("./commissions.model");

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define("Client", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    tradingName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
      validate: {
        len: [14, 14],
        is: {
          args: /^\d{14}$/,
          msg: "Invalid CNPJ format",
        },
      }
    },
    segment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 11],
        is: {
          args: /^\d+$/,
          msg: "Invalid phone number format",
        },
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Client.associate = function(models) {
    Client.hasMany(models.Commission, {
      foreignKey: 'clientCNPJ',
    })
  };
  return Client;
};
