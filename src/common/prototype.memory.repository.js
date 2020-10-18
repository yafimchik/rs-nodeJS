class MemoryRepository {
  constructor(objectsArray = []) {
    this.objectsArray = objectsArray;
  }

  getAll() {
    const result = this.objectsArray.map(obj => ({ ...obj }));
    return result;
  }

  getById(id) {
    const obj = this.objectsArray.find(o => o.id === id);
    return obj;
  }

  post(obj) {
    this.objectsArray.push(obj);
    return obj;
  }

  put(obj) {
    const index = this.objectsArray.findIndex(o => o.id === obj.id);
    if (index === -1) {
      return null;
    }
    this.objectsArray.splice(index, 1, obj);
    return obj;
  }

  deleteById(id) {
    let result = false;
    this.objectsArray = this.objectsArray.filter(obj => {
      const idCheck = obj.id === id;
      result = result || idCheck;
      return !idCheck;
    });

    return result;
  }
}

module.exports = MemoryRepository;
