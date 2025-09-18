const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/db');
const http = require('http')
const { Server } = require('socket.io');

const dotenv = require('dotenv');
const routes = require('./src/routes/index')
const User = require('./src/model/user');
const Room = require('./src/model/Room');
const Message = require('./src/model/Message');
const path = require('path')


const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(cors());


app.use(express.json())

app.use('/api', routes)
const PORT = 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('Database Synced');
  
  server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
})

.catch((error)=>{
        console.error('Database sync Error: ',error);
        process.exit();
    })


User.hasMany(Message);
Room.hasMany(Message);
Message.belongsTo(User);
Message.belongsTo(Room);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


app.set('io', io);

