const MongodbRepository = require('../../common/prototype.mongodb.repository');

class ColumnsMongodbRepository extends MongodbRepository {
  toObject(result) {
    return result;
  }
}

module.exports = ColumnsMongodbRepository;
