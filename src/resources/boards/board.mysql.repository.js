const MysqlRepository = require('../../common/prototype.mysql.repository');
const Column = require('./columns/column.model');
const ColumnMysqlRepository = require('./columns/column.mysql.repository');

class BoardMysqlRepository extends MysqlRepository {
  constructor(model) {
    super(model);
    this.columnModel = Column.model;
    this.columnRepo = new ColumnMysqlRepository(this.columnModel);
  }

  async getAll() {
    const list = await this.model.findAll({
      include: {
        model: this.columnModel,
        as: 'columns',
        through: { attributes: [''] }
      }
    });
    return list;
  }

  async getById(id) {
    const entity = await this.model.findByPk(id, {
      include: { model: this.columnModel, as: 'columns' }
    });
    return entity;
  }

  async post(obj) {
    const entity = await this.model.create(obj);
    return entity;
  }

  async put(id, obj) {
    const entity = await this.getById(id);
    const result = await entity.update(obj);
    return result;
  }

  async deleteById(id) {
    // await this.columnRepo.deleteAllByBoardId(id);
    const result = await super.deleteById(id);
    return result;
  }
}

module.exports = BoardMysqlRepository;
