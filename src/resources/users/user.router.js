const router = require('express').Router();
const { RESPONSE_DELETED } = require('../../common/config');
const asyncHandler = require('../../middlewares/async-handler.middleware');
const { userToResponse } = require('../../utils/utils');

const usersService = require('./user.service');

router.route('/').get(
  asyncHandler(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(userToResponse));
  })
);

router.route('/:id').get(
  asyncHandler(async (req, res) => {
    const user = await usersService.getById(req.params.id);
    res.json(userToResponse(user));
  })
);

router.route('/').post(
  asyncHandler(async (req, res) => {
    const user = await usersService.create(req.body);
    res.json(userToResponse(user));
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res) => {
    const userObj = req.body;
    const id = req.params.id;
    const newUser = await usersService.update(id, userObj);
    res.json(userToResponse(newUser));
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
