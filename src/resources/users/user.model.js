const Model = require('../../common/prototype.model');

class User extends Model {
  constructor(obj = {}) {
    super(obj);
    const { name = 'USER', login = 'user', password = 'P@55w0rd' } = obj;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static get modelName() {
    return 'User';
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static toPropsArray() {
    return ['name', 'login', 'password'];
  }

  static toSchemaType() {
    const type = {
      name: {
        type: String,
        required: true
      },
      login: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      }
    };
    return type;
  }
}

module.exports = User;
