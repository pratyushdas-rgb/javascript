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

//  async getMessagesBetweenUsers(user1Id, user2Id) {
//     const query = `
//       SELECT 
//         m.*, 
//         sender.id AS "sender.id", sender.username AS "sender.username",
//         receiver.id AS "receiver.id", receiver.username AS "receiver.username"
//       FROM 
//         messages m
//       JOIN users sender ON m.sender_id = sender.id
//       JOIN users receiver ON m.receiver_id = receiver.id
//       WHERE 
//         (m.sender_id = :user1Id AND m.receiver_id = :user2Id)
//         OR
//         (m.sender_id = :user2Id AND m.receiver_id = :user1Id)
//       ORDER BY m."timestamp" ASC;
//     `;

//     const messages = await sequelize.query(query, {
//       replacements: { user1Id, user2Id },
//       type: sequelize.QueryTypes.SELECT
//       
//     });

//     return messages;
//   }

}

module.exports = new MessageRepository();