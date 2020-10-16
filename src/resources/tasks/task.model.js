class Task {
  constructor({
    title = 'title',
    order = 'order',
    description = 'description',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static get modelName() {
    return 'Task';
  }

  static toSchemaType() {
    const type = {
      title: {
        type: String,
        required: true
      },
      order: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      userId: {
        type: String
      },
      boardId: {
        type: String,
        required: true
      },
      columnId: {
        type: String
      }
    };
    return type;
  }
}

module.exports = Task;
