const User = require('./user.model');
const PrototypeService = require('../../common/prototype.service');
const MongodbRepository = require('../../common/prototype.mongodb.repository');
const tasksService = require('../tasks/task.service');

class UsersService extends PrototypeService {
  constructor(repo, model, tasksServ) {
    super(repo, model);
    this.tasksService = tasksServ;
  }

  async deleteById(userId) {
    const untieTasksResult = await this.tasksService.untieTasksFromUser(userId);

    if (!untieTasksResult) return false;

    const result = await super.deleteById(userId);
    return result;
  }
}

const usersService = new UsersService(MongodbRepository, User, tasksService);

module.exports = usersService;
