const { Op } = require('sequelize');
const Reservation = require('../models/Reservation');
const Resource = require('../models/Resource');
const User = require('../models/User');

const getReservationsByUser = async (userId) => {
  return await Reservation.findAll({

    where: { userId },
    include: [
      { model: Resource, attributes: ['id', 'name', 'description'] },
      { model: User, attributes: ['id', 'username'] },
    ],

  });


};

const getAllReservations = async () => {
  return await Reservation.findAll({
    include: [

      { model: Resource, attributes: ['id', 'name', 'description'] },
      { model: User, attributes: ['id', 'username'] },
    ],

  });
};

const createReservation = async (data) => {
  return await Reservation.create(data);
};


const findReservationById = async (id) => {
  return await Reservation.findByPk(id);
};


const deleteReservation = async (reservation) => {
  await reservation.destroy();
  return true;
};


const hasConflict = async (resourceId, start, end) => {
  return await Reservation.findOne({
    where: {
      resourceId,
      [Op.or]: [
        { startTime: { [Op.lt]: end, [Op.gte]: start } },
        { endTime: { [Op.gt]: start, [Op.lte]: end } },
        { [Op.and]: [{ startTime: { [Op.lte]: start } }, { endTime: { [Op.gte]: end } }] },
      ],
    },
  });
};




module.exports = {
  getReservationsByUser,
  getAllReservations,
  createReservation,
  findReservationById,
  deleteReservation,
  hasConflict,
};
