const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(req.body);
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = req.body;
  user.id = req.params.id;
  const newUser = await usersService.update(user);
  if (!newUser) {
    res.json({ message: 'no such user in base' });
  }
  res.json(User.toResponse(newUser));
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.deleteById(req.params.id);
  res.json(User.toResponse(user));
});

module.exports = {
  userRouter: router
};
