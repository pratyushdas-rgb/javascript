const authService = require('../services/authService');

const register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const user = await authService.register(username, password, role);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};


module.exports = { register, login, profile };
