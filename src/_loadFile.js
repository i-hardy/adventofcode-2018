const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

const sanitizeInput = path =>
  readFileAsync(path).then(buff => buff.toString().split('\n'));

module.exports = sanitizeInput;
