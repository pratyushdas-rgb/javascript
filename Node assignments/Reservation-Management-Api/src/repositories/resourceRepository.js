const { SELECT } = require('sequelize/lib/query-types');
const Resource = require('../models/Resource');




// const findAll = async () => {
//   return await Resource.findAll(); 
// };


// const findById = async (id) => {
//   return await Resource.findByPk(id); 
// };

// const findByName = async(name) =>{
//       return await Resource.findOne({where : {name}});

// }

// const findByUpdatedDate = async(updatedAt)=>{
//   return await Resource.findOne({where : {updatedAt}})
// }


// const create = async (data) => {
//   return await Resource.create(data);
// };


// const update = async (resource, data) => {
//   return await resource.update(data);
// };

// const remove = async (resource) => {
//   return await resource.destroy();
// };

// module.exports = { findAll, findById, create, update, remove, findByName, findByUpdatedDate };


const { Client } = require('pg');
const Reservation = require('../models/Reservation');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'argusadmin',
    database: 'reservation',
    port: 5432, 
});


client.connect();

const findAll = async () =>{

      const result = await client.query(
  'SELECT * FROM resources');
      return result.rows;

}

const findById = async (id) => {


  const result = await client.query(
    'SELECT * FROM resources WHERE id = $1 LIMIT 1', [id]
  );

  return result.rows[0];
};

const findByName = async (name) => {


const result = await client.query(
    'SELECT * FROM resources WHERE name = $1 LIMIT 1',[name]
  );

return result.rows[0];
};

const create = async (data) => {

  const { name, type, description } = data;


  const result = await client.query(

    `INSERT INTO resources (name, type, description) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [name, type, description]
  );

  return result.rows[0];
};

const update = async (id, data) => {

  const { name, type, description } = data;

  const result = await client.query(

`UPDATE resources 
     SET name = $1, description = $2, updated_at = NOW()
    WHERE id = $3 
     RETURNING *`,

    [name, description, id]

  );

  return result.rows[0];
};



const remove = async (id) => {


await client.query('DELETE FROM resources WHERE id = $1', [id]);


  return { message: 'Resource deleted successfully' };
};

module.exports = { findAll, findById, findByName, create, update, remove}