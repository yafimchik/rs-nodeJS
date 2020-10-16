const PrototypeService = require('../../common/prototype.service');
const TasksMongodbRepository = require('./task.mongodb.repository');
const Task = require('./task.model');

class TasksService extends PrototypeService {
  async getAllByBoardId(boardId) {
    const boardTasks = await this.repo.getAllByBoardId(boardId);
    return boardTasks;
  }

  async getAllByUserId(userId) {
    const userTasks = await this.repo.getAllByUserId(userId);
    return userTasks;
  }

  async getById(boardId, taskId) {
    const tasks = await this.repo.getById(boardId, taskId);
    return tasks;
  }

  async deleteById(boardId, taskId) {
    const result = await this.repo.deleteById(boardId, taskId);
    return result;
  }

  async deleteAllBoardTasks(boardId) {
    const result = await this.repo.deleteAllByBoardId(boardId);

    return result;
  }

  async untieTasksFromUser(userId) {
    const result = await this.repo.untieFromUserId(userId);

    return result;
  }
}

const tasksService = new TasksService(TasksMongodbRepository, Task);

module.exports = tasksService;
