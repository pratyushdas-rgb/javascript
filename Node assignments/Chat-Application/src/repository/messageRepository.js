const Message = require('../models/message');
const User = require('../models/user');


class MessageRepository {
  async getAllMessages() {
    return await Message.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'ASC']],
    });
  }

  async createMessage(userId, content) {
    return await Message.create({ userId, content });
  }
}

module.exports = new MessageRepository();