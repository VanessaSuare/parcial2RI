const { Sequelize } = require('sequelize');
const setupModels = require('../database/models');

const sequelize = new Sequelize({
  database: 'taskmanager',
  username: 'root',
  password: 'password',
  dialect: 'mariadb',
});

setupModels(sequelize);

module.exports = sequelize;
