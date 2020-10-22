const MysqlRepository = require('../../common/prototype.mysql.repository');

class TaskMysqlRepository extends MysqlRepository {
  async getAllByBoardId(boardId) {
    const list = await this.model.findAll({ where: { boardId } });
    return this.toObject(list);
  }

  async deleteById(boardId, taskId) {
    const list = await this.model.destroy({ where: { boardId, id: taskId } });
    return this.toObject(list);
  }

  async getById(boardId, taskId) {
    const list = await this.model.findOne({ where: { boardId, id: taskId } });
    return this.toObject(list);
  }
}

module.exports = TaskMysqlRepository;
