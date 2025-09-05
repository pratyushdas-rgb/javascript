const MessageService = require('../service/messageService');

class MessageController {
  constructor(io) {
    this.io = io;
  }

  async handleConnection(socket) {
    console.log('A user connected:', socket.id);


    const messages = await MessageService.getAllMessages();
    socket.emit('load messages', messages.map(m => ({
      username: m.User.username,
      content: m.content,
    })));

    socket.on('chat message', async (msg) => {
      try {
        await MessageService.createMessage(1, msg);
        this.io.emit('chat message', { username: 'USER', content: msg });
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  }
}

module.exports = MessageController;