const userService = require("../services/userService");

class UserController {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const user = await userService.registerUser(username, password);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await userService.login(username, password);
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      res.json(user);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new UserController();
