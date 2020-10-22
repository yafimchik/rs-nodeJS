const PrototypeService = require('../../common/prototype.service');
const Task = require('./task.model');
const BadRequestError = require('../../errors/bad-request.error');
const NotFoundError = require('../../errors/not-found.error');
const TaskMysqlRepository = require('./task.mysql.repository');

class TasksService extends PrototypeService {
  async getAllByBoardId(boardId) {
    const boardTasks = await this.repo.getAllByBoardId(boardId);
    if (!boardTasks) {
      throw new BadRequestError();
    }
    return boardTasks;
  }

  async getAllByUserId(userId) {
    const userTasks = await this.repo.getAllByUserId(userId);
    if (!userTasks) {
      throw new BadRequestError();
    }
    return userTasks;
  }

  async getById(boardId, taskId) {
    const task = await this.repo.getById(boardId, taskId);
    if (!task) {
      throw new NotFoundError('task not found');
    }
    return task;
  }

  async deleteById(boardId, taskId) {
    const result = await this.repo.deleteById(boardId, taskId);
    if (!result) {
      throw new NotFoundError('task not found');
    }
    return result;
  }
}

const tasksService = new TasksService(TaskMysqlRepository, Task.model);

module.exports = tasksService;
