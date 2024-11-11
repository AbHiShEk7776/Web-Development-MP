const express = require('express');
const router = express.Router();
const {getPortfolio,savePortfolio,updatePortfolio} = require('../controllers/portfolioController');
const {authenticateToken}= require('../middleware/authMiddleware'); // Import authentication middleware if you have it

// Middleware to authenticate requests (optional but recommended)
router.use(authenticateToken);

// Route to get a user's portfolio
router.get('/',getPortfolio);

// Route to create or update a user's portfolio
router.put('/save', savePortfolio);

// Route to update a user's portfolio
router.put('/update', updatePortfolio);

module.exports = router;
