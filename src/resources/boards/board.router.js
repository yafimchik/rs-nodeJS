const router = require('express').Router();
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
    if (!board) {
      res.status(404);
      res.json({ message: 'not found' });
      return;
    }
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
    board.id = req.params.boardId;
    const result = await boardsService.update(board);

    res.json(result);
  })
);

router.route('/:boardId').delete(
  asyncHandler(async (req, res) => {
    const result = await boardsService.deleteById(req.params.boardId);

    res.json(result);
  })
);

module.exports = {
  boardRouter: router
};
