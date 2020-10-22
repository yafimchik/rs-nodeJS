const PrototypeService = require('../../common/prototype.service');
const tasksService = require('../tasks/task.service');
const Board = require('./board.model');
const BoardMysqlRepository = require('./board.mysql.repository');
class BoardsService extends PrototypeService {
  constructor(repo, model, tasksServ) {
    super(repo, model);
    this.tasksService = tasksServ;
  }

  async deleteById(boardId) {
    await this.tasksService.deleteAllBoardTasks(boardId);

    const result = await super.deleteById(boardId);

    return result;
  }
}

const boardsService = new BoardsService(
  BoardMysqlRepository,
  Board.model,
  tasksService
);

module.exports = boardsService;
