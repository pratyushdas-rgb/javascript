const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./src/config/database');
const User = require('./src/models/user');
const MessageController = require('./src/controller/messageController');
const routes = require('./src/routes');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static('public'));
app.use('/', routes);


const messageController = new MessageController(io);

(async () => {
  try {
    await sequelize.sync({ alter: true });

    const [user] = await User.findOrCreate({
      where: { username: 'User1' },
      defaults: { username: 'User1' },
    });
    console.log('Default user ready:', user.id);

    server.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });

    io.on('connection', (socket) => {
      messageController.handleConnection(socket);
    });
  } catch (error) {
    console.error('Error during startup:', error);
  }
})();

