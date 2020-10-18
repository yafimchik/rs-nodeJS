class JwtService {
  constructor() {
    // TODO jwt package
  }

  generateJWT(user) {
    // TODO jwt gen
    return user;
  }

  verifyJWT(jwt) {
    // TODO check jwt;
    return !!jwt;
  }

  getUserFromJWT(jwt) {
    // TODO parse jwt
    return jwt;
  }
}

const jwtService = new JwtService();

module.exports = jwtService;
