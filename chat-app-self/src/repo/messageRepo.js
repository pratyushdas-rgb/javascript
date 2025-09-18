const Message = require('../model/Message');
const User = require('../model/user');

const createMessage = async (content, userId, roomId) => {
  const message = await Message.create({ content, UserId: userId, RoomId: roomId });
  return Message.findByPk(message.id, { include: [User] });
};

const getMessagesByRoom = async (roomId) => {
  return Message.findAll({
    where: { RoomId: roomId },
    include: [User],
    order: [['createdAt', 'ASC']],
  });
};

module.exports = { createMessage, getMessagesByRoom };