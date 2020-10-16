const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const mongoose = require('mongoose');
const logger = require('./common/logger');

process.on('uncaughtException', logger.addUncaughtException.bind(logger));
process.on('unhandledRejection', logger.addUnhandledRejection.bind(logger));

const app = require('./app');

async function startApp() {
  logger.addStatus('ready to connect to DB');
  await mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  logger.addStatus('DB connected');
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
  logger.addStatus('Server is running');
}

startApp();
