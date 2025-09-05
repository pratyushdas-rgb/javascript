const MessageRepository = require('../repository/messageRepository');

class MessageService {
  async getAllMessages() {
    return await MessageRepository.getAllMessages();
  }

  async createMessage(userId, content) {
    if (!content || content.trim() === '') {
      throw new Error('Message content cannot be empty');
    }
    return await MessageRepository.createMessage(userId, content);
  }
}

module.exports = new MessageService();