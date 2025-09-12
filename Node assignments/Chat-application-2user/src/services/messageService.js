const messageRepository = require("../repositories/messageRepository");

class MessageService {
  async sendMessage(senderId, receiverId, text) {
    if (!text || text.trim() === "") {
      throw new Error("Message cannot be empty");
    }

    return await messageRepository.createMessage(senderId, receiverId, text);
  }

  async getChatHistory(user1Id, user2Id) {
    return await messageRepository.getMessagesBetweenUsers(user1Id, user2Id);
  }
}

module.exports = new MessageService();