const MongodbRepository = require('../../common/prototype.mongodb.repository');

class TasksMongodbRepository extends MongodbRepository {
  async getAllByBoardId(boardId) {
    const result = await this.dbModel
      .find({ boardId })
      .select(this.props)
      .exec();

    return this.toObject(result);
  }

  async deleteById(boardId, taskId) {
    const result = await this.dbModel
      .deleteOne({ _id: taskId, boardId })
      .exec();

    return this.toObject(result);
  }

  async getById(boardId, taskId) {
    let result = await this.dbModel
      .find({ _id: taskId, boardId })
      .select(this.props)
      .exec();

    if (result instanceof Array) {
      result = result[0];
    }

    return this.toObject(result);
  }

  async getAllByUserId(userId) {
    const result = await this.dbModel
      .find({ userId })
      .select(this.props)
      .exec();
    return this.toObject(result);
  }

  async deleteAllByBoardId(boardId) {
    const result = await this.dbModel.deleteMany({ boardId }).exec();

    return this.toObject(result);
  }

  async untieFromUserId(userId) {
    const result = await this.dbModel
      .updateMany({ userId }, {})
      .set({ userId: null })
      .exec();

    return this.toObject(result);
  }
}

module.exports = TasksMongodbRepository;
