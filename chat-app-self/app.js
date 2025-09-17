const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/db');
const http = require('http')
const { Server } = require('socket.io');

const dotenv = require('dotenv');
const routes = require('./src/routes/index')

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json())

app.use('/api', routes)
const PORT = 3000;

sequelize.sync({force: false}).then(()=>{
    
    console.log('Database Synced');
    app.listen(PORT,()=>{
        console.log(`Server is running at port ${PORT}`);
    })
    
})
.catch((error)=>{
        console.error('Database sync Error: ',error);
        process.exit();
    })

