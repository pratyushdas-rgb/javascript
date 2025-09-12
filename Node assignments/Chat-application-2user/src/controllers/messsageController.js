const messageService = require("../services/messageService");

class MessageController {
  async sendMessage(req, res) {
    try {
      const { senderId, receiverId, text } = req.body;
      const msg = await messageService.sendMessage(senderId, receiverId, text);
      res.status(201).json(msg);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getChatHistory(req, res) {
    try {
      const { user1Id, user2Id } = req.params;
      const messages = await messageService.getChatHistory(user1Id, user2Id);
      res.json(messages);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new MessageController();