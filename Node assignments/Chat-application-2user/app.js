const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const sequelize = require("./src/config/db");
const messageRoutes = require("./src/routes/messageRoutes");
const messageService = require("./src/services/messageService");
const authenticateToken = require("./src/middleware/auth");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use("/api/messages",authenticateToken, messageRoutes);

io.on("connection", (socket) => {
  console.log(" User connected:", socket.id);

  socket.on("chatMessage", async ({ senderId, receiverId, text }) => {
    try {
      const msg = await messageService.sendMessage(senderId, receiverId, text);

      io.emit("chatMessage", msg);
    } catch (err) {
      console.error(" Socket error:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log(" User disconnected:", socket.id);
  });
});

sequelize
  .sync()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" DB Connection error:", err);
  });
