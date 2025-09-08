const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Resource = sequelize.define( 'Resource', {
    id: {
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name:{
        type : DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

},{
    tableName:'resources',
    timestamps:true
}
)

module.exports = Resource;