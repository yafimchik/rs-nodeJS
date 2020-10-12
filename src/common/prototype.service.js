class PrototypeService {
  constructor(repo, model) {
    this.repo = repo;
    this.model = model;
  }

  async getAll() {
    const result = await this.repo.getAll();
    return result;
  }

  async getById(id) {
    const result = await this.repo.getById(id);
    return result;
  }

  async create(obj) {
    const modelEntity = new this.model(obj);
    const result = await this.repo.post(modelEntity);
    return result;
  }

  async update(obj) {
    const entity = await this.getById(obj.id);
    if (!entity) return null;

    const newEntity = new this.model(obj);
    const result = await this.repo.put(newEntity);
    return result;
  }

  async deleteById(id) {
    const result = await this.repo.deleteById(id);
    return result;
  }
}

module.exports = PrototypeService;
