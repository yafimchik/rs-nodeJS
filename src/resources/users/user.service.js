const User = require('./user.model');
const PrototypeService = require('../../common/prototype.service');
const tasksService = require('../tasks/task.service');
const cryptService = require('../../common/crypt.service');
const UsersMongodbRepository = require('./user.mongodb.repository');
const NotFoundError = require('../../errors/not-found.error');

class UsersService extends PrototypeService {
  constructor(repo, model, tasksServ, cryptServ) {
    super(repo, model);
    this.tasksService = tasksServ;
    this.cryptService = cryptServ;
  }

  async create(obj) {
    const { password, ...userObj } = obj;
    userObj.password = await this.cryptService.toHash(password);
    const result = await super.create(userObj);
    return result;
  }

  async update(id, obj) {
    const { password, ...userObj } = obj;
    userObj.password = await this.cryptService.toHash(password);
    const result = await super.update(id, userObj);
    return result;
  }

  async deleteById(userId) {
    await this.tasksService.untieTasksFromUser(userId);

    const result = await super.deleteById(userId);
    return result;
  }

  async getByLogin(login) {
    const user = await this.repo.getByLogin(login);
    if (!user) {
      throw new NotFoundError('no any user with such login');
    }
    return user;
  }
}

const usersService = new UsersService(
  UsersMongodbRepository,
  User,
  tasksService,
  cryptService
);

module.exports = usersService;
