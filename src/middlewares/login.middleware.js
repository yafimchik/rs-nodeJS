// const logger = require('../common/logger');

const loginService = require('../common/login.service');

const loginHandler = async (req, res) => {
  const { login, password } = req.body;

  console.log('login middleware is running');
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
