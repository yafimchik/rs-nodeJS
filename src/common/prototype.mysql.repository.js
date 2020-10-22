const { Model } = require('sequelize');

class MysqlRepository {
  constructor(model) {
    this.model = model;
  }
  async getAll() {
    const list = await this.model.findAll();
    return this.toObject(list);
  }

  async getById(id) {
    const entity = await this.model.findByPk(id);
    return this.toObject(entity);
  }

  async post(obj) {
    const entity = await this.model.create(obj);
    return this.toObject(entity);
  }

  async put(id, obj) {
    const entity = await this.model.findByPk(id);
    if (!entity) return false;
    const result = await entity.update(obj);
    return this.toObject(result);
  }

  async deleteById(id) {
    const entity = await this.model.findByPk(id);
    if (!entity) return false;
    const result = await entity.destroy();
    return this.toObject(result);
  }

  toObject(val) {
    if (!val) return val;
    if (val instanceof Array) {
      return val.map(this.toObject.bind(this));
    }
    if (typeof val === 'object') {
      let result = val;
      if (val instanceof Model) {
        result = val.toJSON();
      }
      delete result.createdAt;
      delete result.updatedAt;
      const keys = Object.keys(result);
      keys.forEach(k => {
        result[k] = this.toObject.bind(this)(result[k]);
      });
      return result;
    }
    return val;
  }
}

module.exports = MysqlRepository;
