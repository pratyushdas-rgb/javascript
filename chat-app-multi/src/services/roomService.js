const { createRoom, getAllRooms } = require('../repository/roomRepository');

const create = async (name) => {
  return createRoom(name);
};

const list = async () => {
  return getAllRooms();
};

module.exports = { create, list };