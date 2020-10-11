class MemoryRepository {
  constructor(objectsArray = []) {
    this.objectsArray = objectsArray;
  }

  log() {
    console.log(this.objectsArray);
  }

  getAll() {
    const result = this.objectsArray.map(obj => ({ ...obj }));
    return result;
  }

  getById(id) {
    let obj = this.objectsArray.find(o => o.id === id);
    if (obj) {
      obj = { ...obj };
    }
    return obj;
  }

  post(obj) {
    if (typeof obj !== 'object') {
      return null;
    }
    this.objectsArray.push(obj);
    // TODO: mock implementation. should be replaced during task development
    return { ...obj };
  }

  put(obj) {
    const index = this.objectsArray.findIndex(o => o.id === obj.id);
    if (index === -1) {
      return null;
    }
    this.objectsArray[index] = { ...obj };
    return obj;
  }

  deleteById(id) {
    const index = this.objectsArray.findIndex(o => o.id === id);
    if (index === -1) {
      return false;
    }

    this.objectsArray.splice(index, 1);
    return true;
  }

  filter(filterFn) {
    const result = this.objectsArray.filter(filterFn);
    return result;
  }

  getFilteredRepository(filterFn) {
    const filteredTasks = this.filter(filterFn);
    return new this(filteredTasks);
  }
}

module.exports = MemoryRepository;
