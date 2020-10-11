const PrototypeService = require('../../common/prototype.service');
const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

class TasksService extends PrototypeService {
  async getAllByBoardId(boardId) {
    const tasks = this.repo.getAllByBoardId(boardId);
    return tasks;
  }

  async getAllByUserId(userId) {
    return this.repo.getAllByUserId(userId);
  }

  async getById(boardId, taskId) {
    const tasks = this.repo.getTaskById(boardId, taskId);
    return tasks;
  }

  async deleteById(boardId, taskId) {
    const result = await this.repo.deleteById(boardId, taskId);
    return result;
  }

  async deleteAllBoardTasks(boardId) {
    const tasks = await this.getAllByBoardId(boardId);
    if (!tasks.length) {
      return true;
    }
    const deleteQueue = tasks.map(task => this.deleteById(boardId, task.id));
    return Promise.all(deleteQueue).then(results => !results.includes(false));
  }
}

const tasksService = new TasksService(tasksRepo, Task);

module.exports = tasksService;
