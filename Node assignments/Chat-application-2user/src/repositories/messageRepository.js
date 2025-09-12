const Message = require("../models/Messages");
const User = require("../models/User");

class MessageRepository {
async createMessage(senderId, receiverId, text) {
  const msg = await Message.create({
    sender_id: senderId,
    receiver_id: receiverId,
    messageText: text,
  });
  
  
  return await Message.findByPk(msg.id, {
    include: [
      { model: User, as: "sender", attributes: ["id", "username"] },
      { model: User, as: "receiver", attributes: ["id", "username"] },
    ],
  });
}

  async getMessagesBetweenUsers(user1Id, user2Id) {
    return await Message.findAll({
      where: {
        sender_id: [user1Id, user2Id],
        receiver_id: [user1Id, user2Id],
      },
      include: [
        { model: User, as: "sender", attributes: ["id", "username"] },
        { model: User, as: "receiver", attributes: ["id", "username"] },
      ],
      order: [["timestamp", "ASC"]],
    });
  }
}

module.exports = new MessageRepository();