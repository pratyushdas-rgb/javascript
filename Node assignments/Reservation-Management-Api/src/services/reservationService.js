const reservationRepo = require('../repositories/reservationRepository');
const Resource = require('../models/Resource');

const getMyReservations = async (userId) => {
  return await reservationRepo.getReservationsByUser(userId);
};

const getAllReservations = async () => {
  return await reservationRepo.getAllReservations();
};

const createReservation = async (userId, resourceId, startTime, endTime) => {
  const resource = await Resource.findByPk(resourceId);
  if (!resource) {
    return { error: "Resource not found" };
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
    return { error: "Invalid time. endTime must be after startTime" };
  }

  const conflict = await reservationRepo.hasConflict(resourceId, start, end);
  if (conflict) {
    return { error: "Resource already reserved for this time slot" };
  }

  const reservation = await reservationRepo.createReservation({
    userId,
    resourceId,
    startTime,
    endTime,
  });

  return { reservation };
};

module.exports = {
  createReservation,
};



const cancelReservation = async (reservationId, userId, isAdmin) => {
  const reservation = await reservationRepo.findReservationById(reservationId);
  if (!reservation) return false;

  if (!isAdmin && reservation.userId !== userId) return false;

  await reservationRepo.deleteReservation(reservation);
  return true;
};

const getReservationByUserId = async (userId)=>{
  return await reservationRepo.getReservationsByUser(userId);
}

module.exports = {

  getMyReservations,
  getAllReservations,
  createReservation,
  cancelReservation,
  getReservationByUserId
};
