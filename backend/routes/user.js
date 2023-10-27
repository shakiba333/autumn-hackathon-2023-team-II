const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
router.post("/", userCtrl.create);
router.get("/:email", userCtrl.show);
// POST /api/users/login
// router.post("/login", userCtrl.login);

module.exports = router;
