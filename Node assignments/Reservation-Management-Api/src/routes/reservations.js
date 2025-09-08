const express = require('express');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const reservationController = require('../controllers/reservationController');

const router = express.Router();

router.get('/my', reservationController.getMyReservations);
router.post('/', reservationController.createReservation);
router.delete('/:id', reservationController.cancelReservation);
router.get('/user/:userId',reservationController.getReservationByUserId);

router.get('/',isAdmin, reservationController.getAllReservations);

module.exports = router;
