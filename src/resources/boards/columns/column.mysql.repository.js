const MysqlRepository = require('../../../common/prototype.mysql.repository');

class ColumnMysqlRepository extends MysqlRepository {
  async deleteAllByBoardId(boardId) {
    const result = await this.model.destroy({
      where: { boardId }
    });
    return result;
  }

  async getAllByBoardId(boardId) {
    const result = await this.model.find({
      where: { boardId }
    });
    return result;
  }

  async postAllByBoardId(boardId, objArray) {
    if (!objArray || !objArray.length) {
      return [];
    }
    const posts = objArray.map(obj => {
      const newRec = { ...obj, boardId };
      return this.post(newRec);
    });
    const result = Promise.all(posts);
    return result;
  }
}

module.exports = ColumnMysqlRepository;
