const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userRepo = require('../repositories/userRepository');

const simpleHash = (str) => crypto.createHash('sha256').update(str).digest('hex');

const register = async (username, password, role) => {
  const existingUser = await userRepo.findByUsername(username);
  if (existingUser) throw new Error('Username already exists');

  return await userRepo.createUser(username, simpleHash(password), role === 'admin' ? 'admin' : 'user');
};

const login = async (username, password) => {
  const user = await userRepo.findByUsername(username);
  if (!user || user.password !== simpleHash(password)) throw new Error('Invalid credentials');

  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

const getProfile = async (id) => {
  return await userRepo.findById(id);
};

module.exports = { register, login, getProfile };
