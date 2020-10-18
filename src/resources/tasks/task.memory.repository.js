const MemoryRepository = require('../../common/prototype.memory.repository');

class TasksRepository extends MemoryRepository {
  getAllByBoardId(boardId) {
    const result = this.objectsArray.filter(obj => obj.boardId === boardId);
    return result;
  }

  deleteById(boardId, taskId) {
    let result = false;
    this.objectsArray = this.objectsArray.filter(task => {
      const idCheck = task.boardId === boardId && task.id === taskId;
      result = result || idCheck;
      return !idCheck;
    });

    return result;
  }

  getById(boardId, taskId) {
    const result = this.objectsArray.find(
      item => item.boardId === boardId && item.id === taskId
    );
    return result;
  }

  getAllByUserId(userId) {
    const result = this.objectsArray.filter(obj => obj.userId === userId);
    return result;
  }

  deleteUserId(userId) {
    this.objectsArray.forEach(obj => {
      if (obj.userId === userId) {
        obj.userId = null;
      }
    });
    return true;
  }

  deleteBoardId(boardId) {
    this.objectsArray = this.objectsArray.filter(
      obj => obj.boardId !== boardId
    );
    return true;
  }
}

const tasksRepo = new TasksRepository();

module.exports = tasksRepo;
