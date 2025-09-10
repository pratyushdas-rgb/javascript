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


const createReservation = async (req, res) => {
  try {
    const { resourceId, startTime, endTime } = req.body;

    if (!resourceId || !startTime || !endTime) {
      return res.status(400).json({
        error: "Resource ID, startTime, and endTime are required",
      });
    }

    const result = await reservationService.createReservation(
      req.user.id,
      resourceId,
      startTime,
      endTime
    );

    if (result.error) {
      let status = 400;
      if (result.error.includes("not found")) status = 404;
      if (result.error.includes("reserved")) status = 409;
      return res.status(status).json({ error: result.error });
    }

    return res.status(201).json(result.reservation);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
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
