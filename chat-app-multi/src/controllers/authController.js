const { register, login } = require('../services/authService');

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await register(username, password);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Username taken' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await login(username, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser };