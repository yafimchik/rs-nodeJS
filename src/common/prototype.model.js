class Model {
  constructor({ id = '', _id = '' } = {}) {
    if (_id) {
      this.id = _id;
    }
    if (id) {
      this.id = id;
    }
    this.idToString();
  }

  idToString() {
    if (!this.id) {
      return;
    }
    if (typeof this.id === 'object') {
      this.id = this.id.toString();
    }
  }
}

module.exports = Model;
