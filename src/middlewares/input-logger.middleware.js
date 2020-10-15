const logger = require('../common/logger');

const inputLogger = (req, res, next) => {
  logger.addInput(req);
  next();
};

module.exports = inputLogger;
