// routes/authRoutes.js

const express = require('express');
const { registerUser } = require('../controllers/authController');
const { login ,logoutUser} = require('../controllers/authController');
const { validateRegister } = require('../validators/authValidator');
const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', login);
router.post('/logout', logoutUser);
module.exports = router;
