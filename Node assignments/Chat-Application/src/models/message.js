const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {   
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', 
      key: 'id'
    }
  }
}, {
  tableName: 'messages',
  timestamps: true
});

User.hasMany(Message, { foreignKey: 'userId', sourceKey: 'id' });
Message.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

module.exports = Message;