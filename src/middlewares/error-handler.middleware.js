// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || 'unknown server error'
  });
}

module.exports = { errorHandler };
