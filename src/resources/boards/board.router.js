const router = require('express').Router();
const { RESPONSE_DELETED } = require('../../common/config');
const asyncHandler = require('../../middlewares/async-handler.middleware');
const boardsService = require('./board.service');

router.route('/').get(
  asyncHandler(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
);

router.route('/:boardId').get(
  asyncHandler(async (req, res) => {
    const board = await boardsService.getById(req.params.boardId);
    res.json(board);
  })
);

router.route('/').post(
  asyncHandler(async (req, res) => {
    const board = { ...req.body };
    const result = await boardsService.create(board);

    res.json(result);
  })
);

router.route('/:boardId').put(
  asyncHandler(async (req, res) => {
    const board = { ...req.body };
    const id = req.params.boardId;
    const result = await boardsService.update(id, board);

    res.json(result);
  })
);

router.route('/:boardId').delete(
  asyncHandler(async (req, res) => {
    await boardsService.deleteById(req.params.boardId);

    res.json(RESPONSE_DELETED);
  })
);

module.exports = {
  boardRouter: router
};
