const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  messageText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: "messages",
  timestamps: true
});

Message.belongsTo(User, { as: "sender", foreignKey: "sender_id" });
Message.belongsTo(User, { as: "receiver", foreignKey: "receiver_id" });

module.exports = Message;