const reservationService = require('../services/reservationService');

const getMyReservations = async (req, res, next) => {
  try {
    const reservations = await reservationService.getMyReservations(req.user.id);
    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

const getAllReservations = async (req, res, next) => {
  try {
    const reservations = await reservationService.getAllReservations();
    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

const createReservation = async (req, res, next) => {
  try {
    const { resourceId, startTime, endTime } = req.body;
    if (!resourceId || !startTime || !endTime) {
      return res.status(400).json({ error: 'Resource ID, startTime, endTime required' });
    }
    const reservation = await reservationService.createReservation(req.user.id, resourceId, startTime, endTime);
    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
};

const cancelReservation = async (req, res, next) => {

  try {
    const deleted = await reservationService.cancelReservation(req.params.id, req.user.id, req.user.role === 'admin');
    if (!deleted) {
      return res.status(404).json({ error: 'Reservation not found or not authorized' });
    }
    res.json({ msg: 'Reservation cancelled successfully' });
  } catch (error) {
    next(error);
  }
};

const getReservationByUserId = async(req,res,next)=>{
      try {
    const reservations = await reservationService.getMyReservations(req.params.userId);
    res.json(reservations);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMyReservations,
  getAllReservations,
  createReservation,
  cancelReservation,
  getReservationByUserId
};
