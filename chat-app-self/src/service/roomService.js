const {createRoom, getRooms} = require('../repo/roomRepo')

const create = async (name) =>{
    return createRoom(name);
}

const list = async () =>{
    return getRooms();
}

module.exports = {create,list};