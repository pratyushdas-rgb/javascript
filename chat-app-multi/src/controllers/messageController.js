const { send, getByRoom } = require('../services/messageService');

const sendMessage = async (req, res) => {
  const { roomId, content } = req.body;
  const userId = req.userId;
  const message = await send(content, userId, roomId);
  res.json(message);
};

const getMessages = async (req, res) => {
  const messages = await getByRoom(req.params.roomId);
  res.json(messages);
};

module.exports = { sendMessage, getMessages };