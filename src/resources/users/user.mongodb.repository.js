const MongodbRepository = require('../../common/prototype.mongodb.repository');

class UsersMongodbRepository extends MongodbRepository {
  async getByLogin(login) {
    const user = await this.dbModel
      .findOne({ login })
      .select(this.props)
      .exec();
    return user;
  }
}

module.exports = UsersMongodbRepository;
