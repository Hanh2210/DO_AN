const bcrypt = require('bcrypt');

const hash = input => bcrypt.hashSync(input, bcrypt.genSaltSync(10));

const compare = (input, encrypted) => bcrypt.compareSync(input, encrypted);

module.exports = { hash, compare }