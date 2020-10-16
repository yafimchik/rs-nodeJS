const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAllByBoardId(req.params.boardId);

  res.json(tasks);
});

router.route('/').post(async (req, res) => {
  const task = req.body;
  task.boardId = req.params.boardId;
  const tasks = await tasksService.create(task);
  res.json(tasks);
});

router.route('/:taskId').get(async (req, res) => {
  const task = await tasksService.getById(
    req.params.boardId,
    req.params.taskId
  );
  if (!task) {
    res.status(404);
    res.json({ message: 'not found' });
    return;
  }
  res.json(task);
});

router.route('/:taskId').put(async (req, res) => {
  const task = req.body;
  task.boardId = req.params.boardId;
  task.taskId = req.params.taskId;
  const result = await tasksService.update(task);
  res.json(result);
});

router.route('/:taskId').delete(async (req, res) => {
  const result = await tasksService.deleteById(
    req.params.boardId,
    req.params.taskId
  );
  res.json(result);
});

module.exports = {
  taskRouter: router
};
