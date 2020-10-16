const Column = require('./column.model');

class Board {
  constructor({ title = 'title', columns = [] } = {}) {
    this.title = title;
    this.columns = columns.map(col => new Column(col));
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
}

module.exports = Board;
