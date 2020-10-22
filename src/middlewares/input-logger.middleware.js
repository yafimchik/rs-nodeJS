const logger = require('../utils/logger');

const inputLogger = async (req, res, next) => {
  logger.addInput(req);
  next();
};

module.exports = inputLogger;
