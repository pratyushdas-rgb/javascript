const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(

   process.env.DB_NAME,
   process.env.DB_USERNAME, 
   process.env.DB_PASSWORD,{

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

// const connectDB = async()=> {
//   try{
//     await sequelize.authenticate();
//     console.log("Connected");
    
//   }
//   catch(error){
//     console.log("Error:" , error);
    
//   }
// }

// connectDB();

module.exports = { sequelize };