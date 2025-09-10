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
  getReservationsByUser,
  getAllReservations
};



// const { Client } = require('pg');

// const client = new Client({
//   host: 'localhost',
//   user: 'postgres',
//   password: 'argusadmin',
//   database: 'reservation',
//   port: 5432,
// });

// client.connect();

// const getReservationsByUser = async (userId) => {
//   const result = await client.query(
//     `SELECT r.id, r.start_time, r.end_time, r.resource_id, r.user_id,
//   res.id AS resource_id, res.name AS resource_name, res.description AS resource_description,
//   u.id AS user_id, u.username
//      FROM reservations r
//      JOIN resources res ON r.resource_id = res.id
//      JOIN users u ON r.user_id = u.id
//      WHERE r.user_id = $1`,
//     [userId]
//   );
//   return result.rows;
// };

// const getAllReservations = async () => {
//   const result = await client.query(
//     `SELECT r.id, r.start_time, r.end_time, r.resource_id, r.user_id,
//   res.id AS resource_id, res.name AS resource_name, res.description AS resource_description,
//             u.id AS user_id, u.username
//      FROM reservations r
//      JOIN resources res ON r.resource_id = res.id
//   JOIN users u ON r.user_id = u.id`
//   );
//   return result.rows;
// };

// const createReservation = async (data) => {


//   const { resourceId, userId, startTime, endTime } = data;


//   const result = await client.query(
//     `INSERT INTO reservations (resource_id, user_id, start_time, end_time)
//      VALUES ($1, $2, $3, $4)
//      RETURNING *`,
//     [resourceId, userId, startTime, endTime]
//   );


//   return result.rows[0];
// };

// const findReservationById = async (id) => {


//   const result = await client.query(
//     `SELECT * FROM reservations WHERE id = $1 LIMIT 1`,
//     [id]
//   );


//   return result.rows[0];
// };

// const deleteReservation = async (id) => {

//   await client.query(`DELETE FROM reservations WHERE id = $1`, [id]);
//   return true;
// };

// const hasConflict = async (resourceId, start, end) => {

//   const result = await client.query(

//     `SELECT * FROM reservations
    
//      WHERE resource_id = $1
     
//      AND (
//        (start_time < $3 AND start_time >= $2) OR
//        (end_time > $2 AND end_time <= $3) OR
//        (start_time <= $2 AND end_time >= $3)
//      )
//      LIMIT 1`,
//     [resourceId, start, end]
//   );


//   return result.rows[0];
// };

// module.exports = {
  
//   createReservation,
//   findReservationById,
//   deleteReservation,
//   hasConflict,
//   getReservationsByUser,
//   getAllReservations
// };
