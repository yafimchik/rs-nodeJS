const PrototypeService = require('../../common/prototype.service');
const tasksRepo = require('./task.memory.repository');
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

  async update(obj) {
    const entity = await this.getById(obj.boardId, obj.id);
    if (!entity) return null;

    const newEntity = new this.model(obj);
    const result = await this.repo.put(newEntity);
    return result;
  }

  async deleteAllBoardTasks(boardId) {
    const result = await this.repo.deleteBoardId(boardId);
    return result;
  }

  async untieUserTasks(userId) {
    const result = await this.repo.deleteUserId(userId);
    return result;
  }
}

const tasksService = new TasksService(tasksRepo, Task);

module.exports = tasksService;
