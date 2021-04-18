/* eslint-disable global-require */
const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
const {DB_NAME, DB_PORT, DB_HOST, DB_USER_NAME, DB_PASSWORD } = require('../../config');
console.log(DB_NAME, DB_PORT, DB_HOST, DB_USER_NAME, DB_PASSWORD);
const sequelize = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  port: DB_PORT,
});

const modelDefiners = [
  require('../models/users'),

  require('../models/users_info'),

  // Add more models here...
];

// eslint-disable-next-line no-restricted-syntax
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

module.exports = sequelize;
