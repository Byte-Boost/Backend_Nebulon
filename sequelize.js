const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_USER || 'nebulon_db'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || 'fatec'

const sequelize = new Sequelize(DB_NAME, DB_USER ,DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;