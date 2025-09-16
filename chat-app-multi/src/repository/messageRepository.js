const Message = require('../models/Message');
const User = require('../models/User');

const createMessage = async (content, userId, roomId) => {
  return Message.create({ content, UserId: userId, RoomId: roomId });
};

const getMessagesByRoom = async (roomId) => {
  return Message.findAll({
    where: { RoomId: roomId },
    include: [User],
    order: [['createdAt', 'ASC']],
  });
};

module.exports = { createMessage, getMessagesByRoom };