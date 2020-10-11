const PrototypeService = require('../../common/prototype.service');
const { tasksService } = require('../tasks/task.service');
const boardsRepo = require('./board.memory.repository');
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

    return super.deleteById(boardId);
  }
}

const boardsService = new BoardsService(boardsRepo, Board, tasksService);

module.exports = boardsService;
