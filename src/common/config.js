const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const LOG_MODES = {
  CONSOLE: 'CONSOLE',
  FILE: 'FILE'
};

const LOG_FILE_PATH = path.resolve(__dirname, '../', process.env.LOG_FILE_PATH);
console.log(LOG_FILE_PATH);

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOG_MODE:
    process.env.LOG_MODE === LOG_MODES.FILE
      ? LOG_MODES.FILE
      : LOG_MODES.CONSOLE,
  LOG_MODES,
  LOG_FILE_PATH
};
