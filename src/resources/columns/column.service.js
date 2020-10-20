const PrototypeService = require('../../common/prototype.service');
const BadRequestError = require('../../errors/bad-request.error');
const NotFoundError = require('../../errors/not-found.error');
const ColumnsMongodbRepository = require('./column.mongodb.repository');
const Column = require('./column.model');

class ColumnsService extends PrototypeService {
  async getAllByBoardId(boardId) {
    const boardTasks = await this.repo.getAllByBoardId(boardId);
    if (!boardTasks) {
      throw new BadRequestError();
    }
    return boardTasks;
  }

  async getAllByUserId(userId) {
    const userTasks = await this.repo.getAllByUserId(userId);
    if (!userTasks) {
      throw new BadRequestError();
    }
    return userTasks;
  }

  async getById(boardId, taskId) {
    const task = await this.repo.getById(boardId, taskId);
    if (!task) {
      throw new NotFoundError('task not found');
    }
    return task;
  }

  async deleteById(boardId, taskId) {
    const result = await this.repo.deleteById(boardId, taskId);
    if (!result) {
      throw new NotFoundError('task not found');
    }
    return result;
  }

  async deleteAllBoardColumns(boardId) {
    const result = await this.repo.deleteAllByBoardId(boardId);
    return result;
  }

  async untieTasksFromUser(userId) {
    const result = await this.repo.untieFromUserId(userId);
    return result;
  }
}

const columnsService = new ColumnsService(ColumnsMongodbRepository, Column);

module.exports = columnsService;
