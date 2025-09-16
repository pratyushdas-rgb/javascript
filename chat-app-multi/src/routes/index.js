const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { createRoom, getRooms } = require('../controllers/roomController');
const { sendMessage, getMessages } = require('../controllers/messageController');
const jwt = require('jsonwebtoken');

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
router.get('/rooms', authenticate, getRooms);
router.post('/rooms', authenticate, createRoom);
router.get('/messages/:roomId', authenticate, getMessages);
router.post('/messages', authenticate, sendMessage);

module.exports = router;