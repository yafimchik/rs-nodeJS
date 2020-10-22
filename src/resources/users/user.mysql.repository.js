const MysqlRepository = require('../../common/prototype.mysql.repository');

class UsersMysqlRepository extends MysqlRepository {
  async getByLogin(login) {
    const result = await this.model.findOne({ where: { login } });
    return result;
  }
}

module.exports = UsersMysqlRepository;
