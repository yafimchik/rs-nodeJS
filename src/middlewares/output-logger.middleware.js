const logger = require('../utils/logger');

async function outputLogger(req, res, next) {
  const oldJson = res.json;

  res.json = function json(data) {
    logger.addOutput({
      method: req.method,
      url: req.originalUrl,
      reqBody: req.body,
      OUTPUT: data
    });
    oldJson.apply(res, arguments);
  };
  next();
}

module.exports = outputLogger;
