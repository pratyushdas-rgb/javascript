const { send, getByRoom } = require('../service/messageService');

const sendMessage = async (req, res) => {
  try {
    const { roomId, content } = req.body;
    const userId = req.userId;
    const message = await send(content, userId, parseInt(roomId, 10));


    const io = req.app.get('io');
    io.to(roomId).emit('newMessage', {
      id: message.id,
      content: message.content,
      username: message.User.username,
      createdAt: message.createdAt,
    });

    
    res.json(message);
  } catch (err) {
    console.error('Error in sendMessage:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

const getMessages = async (req, res) => {
  try {
    const roomId = parseInt(req.params.roomId, 10);
    if (isNaN(roomId)) {
      return res.status(400).json({ error: 'Invalid roomId parameter' });
    }
    console.log('Fetching messages for room:', roomId);

    const messages = await getByRoom(roomId);
    res.json(messages);
  } catch (err) {
    console.error('Error in getMessages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};


module.exports = { sendMessage, getMessages };
