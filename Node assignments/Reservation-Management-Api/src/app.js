const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {sequelize} = require('./config/db');
const authRoutes = require('./routes/auth');
const resourceRoutes= require('./routes/resourses');
const reservationRoutes = require('./routes/reservations');
const { authenticateToken, isAdmin } = require('./middleware/auth');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/resources', authenticateToken,isAdmin, resourceRoutes);
app.use('/reservations',authenticateToken, reservationRoutes);

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({error: 'Server Error'});
})

const PORT = process.env.PORT || 3000;

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