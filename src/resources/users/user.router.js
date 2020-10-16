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
  if (!user) {
    res.status(404);
    res.json({ message: 'not found' });
  }
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
    res.status(404);
    res.json({ message: 'no such user in base' });
    return;
  }
  res.json(User.toResponse(newUser));
});

router.route('/:id').delete(async (req, res) => {
  const result = await usersService.deleteById(req.params.id);
  if (!result) {
    res.json({ message: 'nothing to delete' });
  }
  res.json({ message: 'deleted successfully' });
});

module.exports = {
  userRouter: router
};
