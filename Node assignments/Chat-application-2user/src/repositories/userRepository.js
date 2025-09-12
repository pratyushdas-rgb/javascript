const User = require("../models/User");

class UserRepository {
async createUser(data) {
return await User.create(data);
}

async findByUsername(username) {
return await User.findOne({ where: { username } });
}

async findById(id) {
return await User.findByPk(id);
}
}

module.exports = new UserRepository();
