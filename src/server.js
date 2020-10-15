const { PORT } = require('./common/config');
const logger = require('./common/logger');

process.on('uncaughtException', logger.addUncaughtException.bind(logger));
process.on('unhandledRejection', logger.addUnhandledRejection.bind(logger));

const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
