const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const mongoose = require('mongoose');
const logger = require('./common/logger');

process.on('uncaughtException', logger.addUncaughtException.bind(logger));
process.on('unhandledRejection', logger.addUnhandledRejection.bind(logger));

const app = require('./app');

async function startApp() {
  await mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });

  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
}

startApp();
