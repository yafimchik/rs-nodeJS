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
      include: [
        {
          association: this.model.Columns,
          separate: true,
          order: [
            ['order', 'ASC'] // Sorts by COLUMN_NAME_EXAMPLE in ascending order
          ]
        }
      ]
    });
    return this.toObject(list);
  }

  async getById(id) {
    const entity = await this.model.findByPk(id, {
      include: [
        {
          association: this.model.Columns,
          separate: true,
          order: [
            ['order', 'ASC'] // Sorts by COLUMN_NAME_EXAMPLE in ascending order
          ]
        }
      ]
    });
    console.log(this.toObject(entity));
    return this.toObject(entity);
  }

  async post(obj) {
    const entity = await this.model.create(obj, {
      include: [this.model.Columns]
    });
    return this.toObject(entity);
  }

  async put(id, obj) {
    const entity = await this.model.findByPk(id);
    if (!entity) return false;
    const result = await entity.update(obj, { include: [this.model.Columns] });
    return this.toObject(result);
  }
}

module.exports = BoardMysqlRepository;
