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
    const results = await Promise.all([
      this.tasksService.untieUserTasks(userId),
      super.deleteById(userId)
    ]);
    return !results.includes(false);
  }
}

const usersService = new UsersService(usersRepo, User, tasksService);

module.exports = usersService;
