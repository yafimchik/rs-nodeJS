const User = require('./user.model');
const PrototypeService = require('../../common/prototype.service');
const tasksService = require('../tasks/task.service');
const usersRepo = require('./user.memory.repository');

class UsersService extends PrototypeService {
  constructor(repo, model, tasksServ) {
    super(repo, model);
    this.tasksService = tasksServ;
  }

  async deleteById(userId) {
    const userTasks = await this.tasksService.getAllByUserId(userId);

    if (userTasks.length) {
      const clearTaskQueue = userTasks.map(task => {
        const newTask = { ...task };
        newTask.userId = null;
        return this.tasksService.update(newTask);
      });
      const clearTasksResults = await Promise.all(clearTaskQueue);

      if (clearTasksResults.includes(false)) {
        return false;
      }
    }

    const result = await super.deleteById(userId);
    return result;
  }
}

const usersService = new UsersService(usersRepo, User, tasksService);

module.exports = usersService;
