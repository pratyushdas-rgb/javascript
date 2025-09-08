const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({
    dialect:'postgres',
    host:'localhost',
    database:'chatdb',
    username:'postgres',
    password:'argusadmin'
});

module.exports= sequelize;

