const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


router.post('/login', userCtrl.loginUser);
router.post('/logout', userCtrl.logoutUser);


module.exports = router;