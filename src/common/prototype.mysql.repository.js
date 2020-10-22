class MysqlRepository {
  constructor(model) {
    this.model = model;
  }
  async getAll() {
    const list = await this.model.findAll();
    return list;
  }

  async getById(id) {
    const entity = await this.model.findByPk(id);
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
    const entity = await this.getById(id);
    const result = await entity.destroy();
    return result;
  }
}

module.exports = MysqlRepository;
