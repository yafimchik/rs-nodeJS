const {
  tasksByBoardIdFilter,
  tasksByUserIdFilter
} = require('../../common/filters');
const MemoryRepository = require('../../common/prototype.memory.repository');

class TasksRepository extends MemoryRepository {
  getAllByBoardId(boardId) {
    const filterByBoard = tasksByBoardIdFilter(boardId);

    return this.filter(filterByBoard);
  }

  deleteById(boardId, taskId) {
    const task = this.getById(boardId, taskId);
    if (!task) {
      return false;
    }
    return super.deleteById(taskId);
  }

  getById(boardId, taskId) {
    const filterByBoard = tasksByBoardIdFilter(boardId);
    const filteredRepo = this.getFilteredRepository(filterByBoard);
    return filteredRepo.getById(taskId);
  }

  getAllByUserId(userId) {
    const filterByUser = tasksByUserIdFilter(userId);
    return this.filter(filterByUser);
  }
}

const tasksRepo = new TasksRepository();

module.exports = tasksRepo;
