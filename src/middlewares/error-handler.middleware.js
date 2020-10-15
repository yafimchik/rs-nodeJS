const logger = require('../common/logger');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  logger.addError(err);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error'
  });
}

module.exports = errorHandler;
