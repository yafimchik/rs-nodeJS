const Model = require('../../common/prototype.model');
const { v4: uuid } = require('uuid');

class Column extends Model {
  constructor(obj = {}) {
    super(obj);
    const { id = uuid(), title = 'title', order = 1 } = obj;
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static get modelName() {
    return 'Column';
  }

  static toSchemaType() {
    const type = {
      id: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      order: {
        type: Number,
        required: true
      }
    };
    return type;
  }

  static toPropsArray() {
    return ['id', 'title', 'order'];
  }
}

module.exports = Column;
