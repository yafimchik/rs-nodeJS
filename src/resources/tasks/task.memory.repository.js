const {
  tasksByBoardIdFilter,
  tasksByUserIdFilter
} = require('../../common/filters');
const MemoryRepository = require('../../common/prototype.memory.repository');

class TasksRepository extends MemoryRepository {
  async getAllByBoardId(boardId) {
    const filterByBoard = tasksByBoardIdFilter(boardId);

    return this.objectsArray.filter(filterByBoard);
  }

  async deleteById(boardId, taskId) {
    const task = await this.getById(boardId, taskId);
    if (!task) {
      return false;
    }
    return super.deleteById(taskId);
  }

  async getById(boardId, taskId) {
    const filterByBoard = tasksByBoardIdFilter(boardId);
    const filteredRepo = this.objectsArray.getFilteredContainer(filterByBoard);
    return filteredRepo.getById(taskId);
  }

  async getAllByUserId(userId) {
    const filterByUser = tasksByUserIdFilter(userId);
    return this.objectsArray.filter(filterByUser);
  }
}

const tasksRepo = new TasksRepository();

module.exports = tasksRepo;
