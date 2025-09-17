const User = require('../model/user');
const bcrypt = require('bcryptjs');

const createUser = async (username, password) => {
  const hashed = await bcrypt.hash(password, 10);
  return User.create({ username, password: hashed });
};

const findUserByUsername = async (username) => {
  return User.findOne({ where: { username } });
};

module.exports = { createUser, findUserByUsername };