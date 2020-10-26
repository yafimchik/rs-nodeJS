const Model = require('../../common/prototype.model');
const Column = require('./column.model');

class Board extends Model {
  constructor(obj = {}) {
    const { title = 'title', columns = [] } = obj;
    super(obj);

    this.title = title;
    this.columns = columns.map(col => new Column(col));
  }

  static get columnModel() {
    return Column;
  }

  static get modelName() {
    return 'Board';
  }

  static toSchemaType() {
    const type = {
      title: {
        type: String,
        required: true
      },
      columns: [Column.toSchemaType()]
    };
    return type;
  }

  static toPropsArray() {
    return ['title', 'columns'];
  }
}

module.exports = Board;
