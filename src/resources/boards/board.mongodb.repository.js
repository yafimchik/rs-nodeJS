const MongodbRepository = require('../../common/prototype.mongodb.repository');
const Column = require('../columns/column.model');
const ColumnsMongodbRepository = require('../columns/column.mongodb.repository');

class BoardsMongodbRepository extends MongodbRepository {
  constructor(model) {
    super(model);
    this.columnRepo = new ColumnsMongodbRepository(Column);
  }

  async getAll() {
    const result = await this.dbModel
      .find()
      .populate('columns', this.columnRepo.props)
      .select(this.props)
      .exec();
    return this.toObject(result);
  }

  async getById(id) {
    const result = await this.dbModel
      .findById(id)
      .populate('columns', this.columnRepo.props)
      .select(this.props)
      .exec();
    return this.toObject(result);
  }

  async post(obj) {
    if (typeof obj !== 'object') {
      return null;
    }

    const objColumns = obj.columns;
    delete obj.columns;

    const newRecord = new this.dbModel(obj);

    console.log(objColumns);
    const dbColumns = await this.postColumns(objColumns);
    console.log(dbColumns);

    dbColumns.forEach(dbColModel => {
      newRecord.columns.push(dbColModel);
    });

    const result = await MongodbRepository.safeWrite(newRecord.save());
    return this.toObject(result);
  }

  async postColumns(objColumns) {
    const postTasks = objColumns.map(colObj => this.columnRepo.post(colObj));
    const dbColumns = await Promise.all(postTasks);
    return dbColumns;
  }

  async getColumns(BoardId) {
    const { columns } = await this.dbModel
      .findById(BoardId)
      .populate('columns')
      .select(this.props)
      .exec();
    return columns;
  }

  async deleteColumns(dbColumns) {
    const deleteTasks = dbColumns.map(dbColumn => dbColumn.remove());
    const result = await Promise.all(deleteTasks);
    return result;
  }

  async put(id, obj) {
    const oldDbColumns = await this.getColumns(id);
    console.log(oldDbColumns);
    await this.deleteColumns(oldDbColumns);

    const { columns, ...objBoard } = obj;
    const dbColumns = await this.postColumns(columns);

    objBoard.columns = dbColumns.map(dbCol => dbCol._id);
    const updDbBoard = await this.dbModel.findByIdAndUpdate(id, {
      $set: objBoard
    });

    return this.toObject(updDbBoard);
  }

  async deleteById(id) {
    const dbColumns = await this.getColumns(id);
    await this.deleteColumns(dbColumns);

    const result = await this.dbModel.findByIdAndDelete(id).exec();

    return this.toObject(result);
  }

  static async safeWrite(action) {
    try {
      const result = await action;
      return result;
    } catch (err) {
      return MongodbRepository.handleMongodbErrors(err);
    }
  }
}

module.exports = BoardsMongodbRepository;
