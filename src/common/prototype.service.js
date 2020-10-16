class PrototypeService {
  constructor(repo, model) {
    this.repo = new repo(model);
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

  async update(id, obj) {
    const newEntity = new this.model(obj);
    const result = await this.repo.put(id, newEntity);
    return result;
  }

  async deleteById(id) {
    const result = await this.repo.deleteById(id);
    return result;
  }
}

module.exports = PrototypeService;
