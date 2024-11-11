const express = require("express");
const router = express.Router();
const { getUser, updateUser, updateSecurity, updateNotifications, updatePreferences } = require("../controllers/userController");
const {authenticateToken}= require('../middleware/authMiddleware');
const User=require("../models/User");
router.use(authenticateToken);
// Route to get user data
router.get("/",authenticateToken, getUser);

// Route to update user data
router.put("/",authenticateToken, updateUser);
router.put("/security",authenticateToken, updateSecurity);
router.put("/notifications",authenticateToken, updateNotifications);
router.put("/preferences",authenticateToken, updatePreferences);
router.post('/risk-tolerance', authenticateToken, async (req, res) => {
    try {
      const { riskTolerance } = req.body; // Get the risk tolerance from the request body
      const userId = req.user.id; // Get the user ID from the token (from authenticateToken middleware)
  
      // Validate the riskTolerance value
      if (!["conservative", "moderate", "aggressive"].includes(riskTolerance)) {
        return res.status(400).json({ message: "Invalid risk tolerance value" });
      }
  
      // Update the user's risk tolerance in the database
      const user = await User.findByIdAndUpdate(userId, { riskTolerance }, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "Risk tolerance updated successfully", user });
    } catch (error) {
      console.error("Error updating risk tolerance:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });



module.exports = router;
