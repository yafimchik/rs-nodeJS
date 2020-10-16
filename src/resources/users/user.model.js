class User {
  constructor({ name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
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

  static toSchemaType() {
    const type = {
      name: {
        type: String,
        required: true
      },
      login: {
        type: String,
        required: true
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
