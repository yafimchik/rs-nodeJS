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
    const result = await this.repo.post(new this.model(obj));
    return result;
  }

  async update(obj) {
    const result = await this.repo.put(new this.model(obj));
    return result;
  }

  async deleteById(id) {
    const result = await this.repo.deleteById(id);
    return result;
  }
}

module.exports = PrototypeService;
