const PrototypeService = require('../../common/prototype.service');
const tasksService = require('../tasks/task.service');
const Board = require('./board.model');
const BoardsMongodbRepository = require('./board.mongodb.repository');

class BoardsService extends PrototypeService {
  constructor(boardRepo, boardModel, tasksServ) {
    super(boardRepo, boardModel);
    this.tasksService = tasksServ;
  }

  async deleteById(boardId) {
    await this.tasksService.deleteAllBoardTasks(boardId);

    const result = await super.deleteById(boardId);

    return result;
  }
}

const boardsService = new BoardsService(
  BoardsMongodbRepository,
  Board,
  tasksService
);

module.exports = boardsService;
