const Message = require('../models/message');
const User = require('../models/user');


class MessageRepository {
  async getAllMessages() {
    return await Message.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'ASC']],
    });
  }

  // class MessageRepository {
  // async getAllMessages() {
  //   const [results] = await sequelize.query(`
  //     SELECT messages.*, users.username
  //     FROM messages
  //     JOIN users ON messages."userId" = users.id
  //     ORDER BY messages."createdAt" ASC
  //   `);
  //   return results;
  // }

  async createMessage(userId, content) {
    return await Message.create({ userId, content });
  }

  //   async createMessage(userId, content) {
  //   const [results] = await sequelize.query(
  //     `
  //     INSERT INTO messages ("userId", content, "createdAt", "updatedAt")
  //     VALUES (:userId, :content, NOW(), NOW())
  //     RETURNING *;
  //     `,
  //     {
  //       replacements: { userId, content },
  //     }
  //   );
  //   return results[0]; // Return the inserted message
  // }
}

module.exports = new MessageRepository();