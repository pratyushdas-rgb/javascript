const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", (req, res) => userController.register(req, res));

router.post("/login", (req, res) => userController.login(req, res));

router.get("/:id", (req, res) => userController.getUser(req, res));

module.exports = router;
