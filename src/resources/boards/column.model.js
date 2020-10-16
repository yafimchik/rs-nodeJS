class Column {
  constructor({ title = 'title', order = 1 } = {}) {
    this.title = title;
    this.order = order;
  }

  static get modelName() {
    return 'Column';
  }

  static toType() {
    const type = {
      title: {
        type: String,
        required: true
      },
      order: {
        type: String,
        required: true
      }
    };
    return type;
  }
}

module.exports = Column;
