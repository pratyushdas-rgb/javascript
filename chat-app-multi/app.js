const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./src/routes');
const sequelize = require('./src/config/db');
const User = require('./src/models/User');
const Room = require('./src/models/Room');
const Message = require('./src/models/Message');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

User.hasMany(Message);
Room.hasMany(Message);
Message.belongsTo(User);
Message.belongsTo(Room);

sequelize.sync({ force: true }).then(() => console.log('DB synced')); 

app.listen(3000, () => console.log('Server on 3000'));