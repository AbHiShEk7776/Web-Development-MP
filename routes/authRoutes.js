const express = require('express');
// const { register,login,verifyOtp  } = require('../controllers/authController');
const passport = require("passport");
const router = express.Router();
const { register, login, verifyOtp, googleCallback, googleLogin } = require('../controllers/authController');
const session = require('express-session');
// POST /api/auth/register
router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp',verifyOtp);
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleCallback);
router.get('/google', googleLogin);

module.exports = router;
