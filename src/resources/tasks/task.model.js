const Model = require('../../common/prototype.model');

class Task extends Model {
  constructor(obj = {}) {
    super(obj);
    const {
      title = 'title',
      order = 'order',
      description = 'description',
      userId = null,
      boardId = null,
      columnId = null
    } = obj;
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

  static toPropsArray() {
    return ['title', 'order', 'description', 'userId', 'boardId', 'columnId'];
  }

  static toSchemaType() {
    const type = {
      title: {
        type: String,
        required: true
      },
      order: {
        type: Number,
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
