const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./common/logger');

process.on('uncaughtException', logger.addUncaughtException.bind(logger));

process.on('unhandledRejection', logger.addUnhandledRejection.bind(logger));

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
