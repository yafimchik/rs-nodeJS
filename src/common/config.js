const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const LOG_MODES = {
  CONSOLE: 'CONSOLE',
  FILE: 'FILE'
};

let LOG_MODE = LOG_MODES.CONSOLE;
if (process.env.LOG_MODE === LOG_MODES.FILE) {
  LOG_MODE = LOG_MODES.FILE;
}

const LOG_FILE_PATH = path.resolve(__dirname, '../', process.env.LOG_FILE_PATH);
console.log('LOG FILE PATH = ', LOG_FILE_PATH);

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOG_MODE,
  LOG_MODES,
  LOG_FILE_PATH,
  RESPONSE_DELETED: { message: 'deleted successfully' },
  MYSQL_DB_NAME: process.env.MYSQL_DB_NAME,
  MYSQL_USER_NAME: process.env.MYSQL_USER_NAME,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_HOST_NAME: process.env.MYSQL_HOST_NAME
};
