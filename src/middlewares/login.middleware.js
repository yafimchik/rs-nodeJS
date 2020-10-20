// const logger = require('../common/logger');

const loginService = require('../common/login.service');
const BadLoginError = require('../errors/bad-login.error');

const loginHandler = async (req, res) => {
  const { login, password } = req.body;

  const loginResult = await loginService.login(login, password);
  if (!loginResult) {
    throw new BadLoginError();
  }
  res.status(200);
  res.json(loginResult);
};

module.exports = loginHandler;
