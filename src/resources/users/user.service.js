const User = require('./user.model');
const PrototypeService = require('../../common/prototype.service');
const tasksService = require('../tasks/task.service');
const cryptService = require('../../utils/crypt.service');
const NotFoundError = require('../../errors/not-found.error');
const MysqlRepository = require('../../common/prototype.mysql.repository');

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

  async getByLogin(login) {
    const user = await this.repo.getByLogin(login);
    if (!user) {
      throw new NotFoundError('no any user with such login');
    }
    return user;
  }
}

const usersService = new UsersService(
  MysqlRepository,
  User.model,
  tasksService,
  cryptService
);

module.exports = usersService;
