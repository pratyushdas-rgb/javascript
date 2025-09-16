const { createMessage, getMessagesByRoom } = require('../repository/messageRepository');

const send = async (content, userId, roomId) => {
  return createMessage(content, userId, roomId);
};

const getByRoom = async (roomId) => {
  const messages = await getMessagesByRoom(roomId);
  return messages.map(m => ({
    id: m.id,
    content: m.content,
    username: m.User.username,
    createdAt: m.createdAt,
  }));
};

module.exports = { send, getByRoom };