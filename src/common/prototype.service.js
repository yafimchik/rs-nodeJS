class PrototypeService {
  constructor(repo, model) {
    this.repo = repo;
    this.model = model;
  }

  getAll() {
    return this.repo.getAll();
  }

  getById(id) {
    return this.repo.getById(id);
  }

  create(obj) {
    const modelEntity = new this.model(obj);
    return this.repo.post(modelEntity);
  }

  update(obj) {
    const Entity = this.getById(obj.id);
    if (!Entity) return null;

    const newEntity = new this.model(obj);
    return this.repo.put(newEntity);
  }

  deleteById(id) {
    return this.repo.deleteById(id);
  }
}

module.exports = PrototypeService;
