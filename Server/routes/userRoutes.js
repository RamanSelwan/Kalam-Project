const express = require('express');
const router = express.Router();
const { getAllUsers,getUserById } = require('../controllers/userController');

// Define the route to get all users
router.get('/', getAllUsers);
router.get('/:id', getUserById);

module.exports = router;