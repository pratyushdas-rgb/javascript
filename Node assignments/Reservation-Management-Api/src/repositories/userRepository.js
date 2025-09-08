const User = require('../models/User');

const findByUsername = async (username) =>{
    return await User.findOne({where : {username}});
};

const findById = async (id) => {
    return await User.findByPk(id,{attributes: {exclude: ['password']}});
};


const createUser = async (username, password, role) => {
    return await User.create({username , password, role})
};

module.exports = {
    findByUsername,
    findById,
    createUser
}