const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messsageController");


router.post("/", (req, res) => messageController.sendMessage(req, res));


router.get("/:user1Id/:user2Id", (req, res) => messageController.getChatHistory(req, res));

module.exports = router;