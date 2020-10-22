const { PORT } = require('./common/config');

const logger = require('./utils/logger');

process.on('uncaughtException', logger.addUncaughtException.bind(logger));
process.on('unhandledRejection', logger.addUnhandledRejection.bind(logger));

const app = require('./app');
const { connectToMysql } = require('./utils/mysql.database');

async function startApp() {
  logger.addStatus('ready to connect to DB');
  await connectToMysql();
  logger.addStatus('DB connected');
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
  logger.addStatus('Server is running');
}

startApp();
