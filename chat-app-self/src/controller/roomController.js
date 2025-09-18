const {create,list} = require('../service/roomService')

const createRoom = async (req,res) =>{
    try{
        const {name} = req.body;
        const room = await create(name)
        res.json(room);
    }catch(err){
        res.status(400).json({Error: 'room exists'});
        }
    }

const getRooms = async (req,res) =>{
    const rooms = await list();
    res.json(rooms)
}

module.exports= {createRoom, getRooms}