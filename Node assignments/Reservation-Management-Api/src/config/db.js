const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('reservation', 'postgres', 'argusadmin', {
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

module.exports = { sequelize };