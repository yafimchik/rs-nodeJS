const jwtService = require('../common/jwt.service');

function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    if (jwtService.verifyJWT(bearerToken)) {
      next();
      return;
    }
  }
  res.sendStatus(401);
}

module.exports = verifyToken;
