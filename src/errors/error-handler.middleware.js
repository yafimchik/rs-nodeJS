const logger = require('../common/logger');
const ServerError = require('./server-error.error');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  logger.addError(err);

  console.log(err);

  if (err instanceof ServerError) {
    res.status(err.responseStatus).json({ message: err.shortMsg });
    return;
  }

  res.status(500).json({
    message: 'Internal Server Error'
  });
}

module.exports = errorHandler;