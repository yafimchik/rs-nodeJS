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
    const userTasks = this.tasksService.getAllByUserId(userId);
    if (userTasks.length) {
      return super.deleteById(userId);
    }
    const deleteTasksQueue = userTasks.map(task => {
      const newTask = { ...task };
      newTask.userId = null;
      return this.put(newTask);
    });
    const clearTasksResult = Promise.all(deleteTasksQueue).then(
      results => !results.includes(false)
    );

    if (!clearTasksResult) {
      return false;
    }

    return super.deleteById(userId);
  }
}

const usersService = new UsersService(usersRepo, User, tasksService);

module.exports = usersService;
