// const logger = require('../common/logger');
const cryptService = require('../common/crypt.service');
const jwtService = require('../common/jwt.service');
const usersService = require('../resources/users/user.service');

const LoginService = require('../common/login.service');

const loginHandler = async (req, res) => {
  const { login, password } = req.body;
  const loginService = new LoginService(usersService, jwtService, cryptService);

  const loginResult = await loginService.login(login, password);
  if (loginResult) {
    res.status(200);
    res.json(loginResult);
  } else {
    res.status(403);
    res.json({ message: 'Incorrect login or password' });
  }
  return;
};

module.exports = loginHandler;
