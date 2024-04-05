const Commission = require("./commissions.model");

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define("Client", {
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
    segment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bonus: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  Client.associate = function(models) {
    Client.hasMany(models.Commission, {
      foreignKey: 'clientId',
    })
  };
  return Client;
};
