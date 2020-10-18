const User = require('./user.model');
const PrototypeService = require('../../common/prototype.service');
const MongodbRepository = require('../../common/prototype.mongodb.repository');
const tasksService = require('../tasks/task.service');
const cryptService = require('../../common/crypt.service');

class UsersService extends PrototypeService {
  constructor(repo, model, tasksServ, cryptServ) {
    super(repo, model);
    this.tasksService = tasksServ;
    this.cryptService = cryptServ;
  }

  async create(obj) {
    obj.password = cryptService.toHash(obj.password);
    const result = super.create(obj);
    return result;
  }

  async update(id, obj) {
    obj.password = cryptService.toHash(obj.password);
    const result = super.create(obj);
    return result;
  }

  async deleteById(userId) {
    const untieTasksResult = await this.tasksService.untieTasksFromUser(userId);

    if (!untieTasksResult) return false;

    const result = await super.deleteById(userId);
    return result;
  }
}

const usersService = new UsersService(
  MongodbRepository,
  User,
  tasksService,
  cryptService
);

module.exports = usersService;
