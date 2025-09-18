const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/authController');

const jwt = require('jsonwebtoken');
const { createRoom, getRooms } = require('../controller/roomController');
const { sendMessage, getMessages } = require('../controller/messageController');


const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/rooms',authenticate,createRoom)
router.get('/rooms',authenticate,getRooms)
router.get('/messages/:roomId', authenticate,getMessages)
router.post('/messages',authenticate, sendMessage)

module.exports = router;
