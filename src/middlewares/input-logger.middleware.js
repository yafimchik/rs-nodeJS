const logger = require('../common/logger');

const inputLogger = async (req, res, next) => {
  logger.addInput(req);
  next();
};

module.exports = inputLogger;
