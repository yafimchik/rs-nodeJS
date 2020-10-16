const MongodbRepository = require('../../common/prototype.mongodb.repository');

class TasksMongodbRepository extends MongodbRepository {
  async getAllByBoardId(boardId) {
    const result = await this.dbModel.find({ boardId }).exec();

    return result;
  }

  async deleteById(boardId, taskId) {
    const result = await this.dbModel
      .deleteOne({ _id: taskId, boardId })
      .exec();

    return result;
  }

  async getById(boardId, taskId) {
    const result = await this.dbModel.find({ _id: taskId, boardId }).exec();

    return result;
  }

  async getAllByUserId(userId) {
    const result = await this.dbModel.find({ userId }).exec();
    return result;
  }

  async deleteAllByBoardId(boardId) {
    const result = await this.dbModel.deleteMany({ boardId }).exec();

    return result;
  }

  async untieFromUserId(userId) {
    const result = await this.dbModel
      .updateMany({ userId }, {})
      .set({ userId: null })
      .exec();

    return result;
  }
}

module.exports = TasksMongodbRepository;
