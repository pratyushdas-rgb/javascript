const userRepository = require("../repositories/userRepository");

class UserService {
  async registerUser(username, password) {
    const existingUser = await userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error("Username already taken");
    }

    return await userRepository.createUser({ username, password });
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async login(username, password) {
    const user = await userRepository.findByUsername(username);
    if (!user || user.password !== password) {
      throw new Error("Invalid username or password");
    }
    return user;
  }
}

module.exports = new UserService();
