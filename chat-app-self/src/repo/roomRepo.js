const Room = require('../model/Room')

const createRoom = async (name)=>{
    return Room.create({name})
}

const getRooms = async ()=>{
    return Room.findAll();
}

module.exports = {createRoom, getRooms}