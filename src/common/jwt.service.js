const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

class JwtService {
  constructor(jwtLib, secret) {
    this.jwt = jwtLib;
    this.secret = secret;
  }

  async generateJWT(user) {
    const payload = { userId: user.id, login: user.login };
    const token = await this.jwt.sign(payload, this.secret);
    return token;
  }

  async verifyJWT(token) {
    const result = await this.jwt.verify(token, this.secret);
    return result;
  }
}

const jwtService = new JwtService(jwt, JWT_SECRET_KEY);

module.exports = jwtService;
