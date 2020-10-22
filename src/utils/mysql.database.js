const { Sequelize } = require('sequelize');
const {
  MYSQL_DB_NAME,
  MYSQL_USER_NAME,
  MYSQL_PASSWORD,
  MYSQL_HOST_NAME
} = require('../common/config');
const logger = require('./logger');

const sequelize = new Sequelize(
  MYSQL_DB_NAME,
  MYSQL_USER_NAME,
  MYSQL_PASSWORD,
  {
    host: MYSQL_HOST_NAME,
    dialect: 'mysql'
  }
);

async function connectToMysql() {
  await sequelize.sync();
  logger.addStatus('DB connected');
}

module.exports = {
  connectToMysql,
  sequelize
};
