const router = require('express').Router();
const { RESPONSE_DELETED } = require('../../common/config');
const asyncHandler = require('../../middlewares/async-handler.middleware');
const User = require('./user.model');
const usersService = require('./user.service');
const userValidator = require('./user.validator');

router.route('/').get(
  asyncHandler(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  asyncHandler(async (req, res) => {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  asyncHandler(userValidator),
  asyncHandler(async (req, res) => {
    const user = await usersService.create(req.body);
    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  asyncHandler(userValidator),
  asyncHandler(async (req, res) => {
    const userObj = req.body;
    const id = req.params.id;
    const newUser = await usersService.update(id, userObj);
    res.json(User.toResponse(newUser));
  })
);

router.route('/:id').delete(
  asyncHandler(async (req, res) => {
    await usersService.deleteById(req.params.id);
    res.json(RESPONSE_DELETED);
  })
);

module.exports = {
  userRouter: router
};
