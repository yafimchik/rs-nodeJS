const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:boardId').get(async (req, res) => {
  const board = await boardsService.getById(req.params.boardId);
  if (!board) {
    res.status(404);
    res.json({ message: 'not found' });
    return;
  }
  res.json(board);
});

router.route('/').post(async (req, res) => {
  const board = { ...req.body };
  const result = await boardsService.create(board);

  res.json(result);
});

router.route('/:boardId').put(async (req, res) => {
  const board = { ...req.body };
  board.id = req.params.boardId;
  const result = await boardsService.update(board);

  res.json(result);
});

router.route('/:boardId').delete(async (req, res) => {
  const result = await boardsService.deleteById(req.params.boardId);

  res.json(result);
});

module.exports = {
  boardRouter: router
};
