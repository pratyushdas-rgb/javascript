const User = require('../models/User');

// const findByUsername = async (username) =>{
//     return await User.findOne({where : {username}});
// };





// const findById = async (id) => {
//     return await User.findByPk(id,{attributes: {exclude: ['password']}});
// };


// const createUser = async (username, password, role) => {
//     return await User.create({username , password, role})
// };

// module.exports = {
//     findByUsername,
//     findById,
//     createUser
// }


const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'argusadmin',
    database: 'reservation',
    port: 5432, 
});


client.connect();

const findByUsername = async (username) => {

    const result = await client.query(

        'SELECT * FROM users WHERE username = $1 LIMIT 1',
        [username]
    );
    
    return result.rows[0];
};

const findById = async (id) => {
    const result = await client.query(
        'SELECT id, username, role FROM users WHERE id = $1 LIMIT 1',
        [id]
    );

    return result.rows[0];
};

const createUser = async (username, password, role) => {
    const result = await client.query(

        'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
        [username,  password, role]
    );

    return result.rows[0];
};

module.exports = {
    findByUsername,
    findById,
    createUser
};