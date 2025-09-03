const express = require('express');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const reservationController = require('../controllers/reservationController');

const router = express.Router();

router.get('/my', authenticateToken, reservationController.getMyReservations);
router.post('/', authenticateToken, reservationController.createReservation);
router.delete('/:id', authenticateToken, reservationController.cancelReservation);

router.get('/', authenticateToken, isAdmin, reservationController.getAllReservations);

module.exports = router;
