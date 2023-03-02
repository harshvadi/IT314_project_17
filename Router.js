const express = require('express');
const router = express.Router();

// import controller functions
const {
    RegisterUser,
    LoginUser
} = require('./auth/Register');

// import middleware functions
// const { protect } = require('./middleware/authMiddleware');

// define routes
router.post('/authregister', RegisterUser);
router.post('/auth/login', LoginUser);

module.exports = router;
