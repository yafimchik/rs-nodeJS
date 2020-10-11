function tasksByBoardIdFilter(id) {
  const boardId = id;
  function filter(task) {
    return task.boardId === boardId;
  }

  return filter;
}

function tasksByUserIdFilter(id) {
  const userId = id;
  function filter(task) {
    return task.userId === userId;
  }

  return filter;
}

module.exports = {
  tasksByBoardIdFilter,
  tasksByUserIdFilter
};
