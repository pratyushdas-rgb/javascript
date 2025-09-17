const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(

   'chatdb',
   'postgres', 
   'Rinku@143',{

  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});

sequelize.authenticate()
  .then(() => {
    console.log("Connected to db using Sequelize");
  })
  .catch((error) => {
    console.error("Connection error: ", error);
  });

  module.exports= sequelize;