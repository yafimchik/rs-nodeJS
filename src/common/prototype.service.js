const BadRequestError = require('../errors/bad-request.error');
const NotFoundError = require('../errors/not-found.error');

class PrototypeService {
  constructor(repo, model) {
    this.repo = new repo(model);
    this.model = model;
  }

  async getAll() {
    const result = await this.repo.getAll();
    if (!result) {
      throw new BadRequestError('get all query error');
    }
    return result;
  }

  async getById(id) {
    const result = await this.repo.getById(id);
    if (!result) {
      throw new NotFoundError();
    }
    return result;
  }

  async create(obj) {
    const modelEntity = new this.model(obj);
    const result = await this.repo.post(modelEntity);
    if (!result) {
      throw new BadRequestError('create entity error');
    }
    return result;
  }

  async update(id, obj) {
    const newEntity = new this.model(obj);
    const result = await this.repo.put(id, newEntity);
    if (!result) {
      throw new BadRequestError('update entity error');
    }
    return result;
  }

  async deleteById(id) {
    const result = await this.repo.deleteById(id);
    if (!result) {
      throw new NotFoundError();
    }
    return result;
  }
}

module.exports = PrototypeService;
