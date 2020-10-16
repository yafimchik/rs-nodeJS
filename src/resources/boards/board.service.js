const MongodbRepository = require('../../common/prototype.mongodb.repository');
const PrototypeService = require('../../common/prototype.service');
const tasksService = require('../tasks/task.service');
const Board = require('./board.model');

class BoardsService extends PrototypeService {
  constructor(repo, model, tasksServ) {
    super(repo, model);
    this.tasksService = tasksServ;
  }

  async deleteById(boardId) {
    const deleteTasksResult = await this.tasksService.deleteAllBoardTasks(
      boardId
    );
    if (!deleteTasksResult) {
      return false;
    }
    const result = await super.deleteById(boardId);
    return result;
  }
}

const boardsService = new BoardsService(MongodbRepository, Board, tasksService);

module.exports = boardsService;
