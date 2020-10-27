const BadRequestError = require('../errors/bad-request.error');

function toString(value, indent = '') {
  if (value === undefined || value === null) return "''";

  let str = '';

  if (typeof value === 'string') {
    str = value.split('\\n').join('\n');
    str = `"${str}"`;
    return str;
  }

  if (typeof value !== 'object') {
    str += JSON.stringify(value);
    return str;
  }

  let curIndent = indent;

  if (value instanceof Array) {
    str += '[\n';
    curIndent += '  ';
    value.forEach(item => {
      str += `${curIndent}${toString(item, curIndent)},\n`;
    });
    str += `${indent}]`;
    return str;
  }

  curIndent += '  ';

  const props = Object.keys(value);

  if (!props.length) {
    return '{}';
  }

  str += '{\n';

  props.forEach(prop => {
    str += `${curIndent}${prop}: ${toString(value[prop], curIndent)},\n`;
  });

  str += `${indent}}`;
  return str;
}

function generateValidator(schema) {
  return async (req, res, next) => {
    const { error } = schema.validate(res.body);
    if (error) {
      throw new BadRequestError();
    }
    next();
  };
}

module.exports = {
  toString,
  generateValidator
};
