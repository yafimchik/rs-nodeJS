class LoginService {
  constructor(usersServ, jwtServ, cryptServ) {
    this.jwtService = jwtServ;
    this.usersService = usersServ;
    this.cryptService = cryptServ;
    // TODO jwt
  }

  async login(login, pswd) {
    if (!login || pswd) {
      return null;
    }

    const user = await this.usersService.findUserByLogin(login);

    if (!user) return null;

    if (this.cryptService.compareStringWithHash(pswd, user.password)) {
      const jwt = this.jwtService.generateJWT(user);
      return { token: jwt };
    }
    return null;
  }
}

module.exports = LoginService;
