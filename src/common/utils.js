function toString(value, indent = '') {
  if (value === undefined) return "''";

  let str = '';

  if (typeof value === 'string') {
    str = value.split('\\n').join('\n');
    str = `"${str}"`;
    return str;
  }

  if (typeof value !== 'object' || value instanceof Array) {
    str += JSON.stringify(value);
    return str;
  }

  let curIndent = indent;

  str += '{\n';
  curIndent += '  ';

  const props = Object.keys(value);

  props.forEach(prop => {
    str += `${curIndent}${prop}: ${toString(value[prop], curIndent)},\n`;
  });

  str += `${indent}}`;
  return str;
}

module.exports = {
  toString
};
