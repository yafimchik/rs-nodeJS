const mongoose = require('mongoose');

class MongodbRepository {
  constructor(model) {
    this.model = model;
    this.propsArray = model.toPropsArray();
    this.props = this.propsArray.join(' ');
    const schema = new mongoose.Schema(model.toSchemaType(), { id: false });
    this.dbModel = mongoose.model(model.modelName, schema);
  }

  async getAll() {
    const result = await this.dbModel
      .find()
      .select(this.props)
      .exec();
    return this.toObject(result);
  }

  async getById(id) {
    const result = await this.dbModel
      .findById(id)
      .select(this.props)
      .exec();
    return this.toObject(result);
  }

  async post(obj) {
    if (typeof obj !== 'object') {
      return null;
    }

    const newRecord = new this.dbModel(obj);
    const result = await newRecord.save();

    return this.toObject(result);
  }

  async put(id, obj) {
    const result = await this.dbModel.findByIdAndUpdate(id, obj).exec();

    return this.toObject(result);
  }

  async deleteById(id) {
    const result = await this.dbModel.findByIdAndDelete(id).exec();

    return this.toObject(result);
  }

  toObject(result) {
    if (!result) return result;

    if (result instanceof Array) {
      return result.map(rec => {
        const entity = new this.model(rec);
        const newRec = { id: entity.id };
        this.propsArray.forEach(prop => {
          newRec[prop] = entity[prop];
        });
        return newRec;
      });
    }

    if (typeof result === 'object') {
      const entity = new this.model(result);
      const newRec = { id: entity.id };
      this.propsArray.forEach(prop => {
        newRec[prop] = entity[prop];
      });
      return newRec;
    }
    return result;
  }
}

module.exports = MongodbRepository;
