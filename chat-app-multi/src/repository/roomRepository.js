const Room = require('../models/Room');

const createRoom = async (name) => {
  return Room.create({ name });
};

const getAllRooms = async () => {
  return Room.findAll();
};

module.exports = { createRoom, getAllRooms };