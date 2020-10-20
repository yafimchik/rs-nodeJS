const { AUTH_MODE } = require('../common/config');
const jwtService = require('../common/jwt.service');

async function verifyToken(req, res, next) {
  if (!AUTH_MODE) {
    next();
    return;
  }
  const bearerHeader = req.headers.authorization;

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    const result = await jwtService.verifyJWT(bearerToken);

    if (result) {
      next();
      return;
    }
  }
  res.sendStatus(401);
}

module.exports = verifyToken;
