class CryptService {
  constructor() {
    // TODO init crypt lib
  }

  toHash(str = '') {
    // TODO hash;
    const hash = str;
    return hash;
  }

  compareStringWithHash(str, hash) {
    // TODO compare
    return str === hash;
  }
}

const cryptService = new CryptService();

module.exports = cryptService;
