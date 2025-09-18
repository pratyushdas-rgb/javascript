const { createMessage, getMessagesByRoom } = require('../repo/messageRepo');
const User = require('../model/user');
const Room = require('../model/Room');

const send = async (content, userId, roomId) => {
  console.log('send called with:', { content, userId, roomId });

  if (!content || !userId || !roomId) {
    throw new Error('Missing required fields');
  }


const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
}
  const room = await Room.findByPk(roomId);
  if (!room) {

    throw new Error('Room not found');
  }

  return createMessage(content, userId, roomId);
};

const getByRoom = async (roomId) => {
  const messages = await getMessagesByRoom(parseInt(roomId, 10));
  
  return messages.map(m => ({

    id: m.id,
    content: m.content,
    username: m.User.username,
    createdAt: m.createdAt,
  }));
};

module.exports = { send, getByRoom };