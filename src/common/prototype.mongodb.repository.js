const mongoose = require('mongoose');

class MongodbRepository {
  constructor(model) {
    const schema = new mongoose.Schema(model.toSchema());
    this.dbModel = mongoose.model(model.modelName, schema);
  }

  async getAll() {
    const result = await this.dbModel.find().exec();
    return result;
  }

  async getById(id) {
    const result = await (await this.dbModel.findById(id)).exec();
    return result;
  }

  async post(obj) {
    if (typeof obj !== 'object') {
      return null;
    }

    const newRecord = new this.dbModel(obj);
    const result = await newRecord.save();

    return result;
  }

  async put(id, obj) {
    const result = await this.dbModel.findByIdAndUpdate(id, obj).exec();

    return result;
  }

  async deleteById(id) {
    const result = await this.dbModel.findByIdAndDelete(id).exec();

    return result;
  }
}

module.exports = MongodbRepository;
