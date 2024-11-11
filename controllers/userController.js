// controllers/UserController.js
const User = require("../models/User");

// Controller to get user data
const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password"); // Exclude password or sensitive fields

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

// Controller to update user data
const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const allowedUpdates = ["username", "email", "phoneNumber", "twoFactor", "notifications", "riskTolerance"];
    const updates = Object.keys(req.body).filter(key => allowedUpdates.includes(key));

    const updateData = updates.reduce((acc, key) => {
      acc[key] = req.body[key];
      return acc;
    }, {});

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "Failed to update user data" });
  }
};

const updateSecurity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { twoFactor } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, { twoFactor }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating security settings:", error);
    res.status(500).json({ error: "Failed to update security settings" });
  }
};

// Controller to update notification preferences
const updateNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { notifications } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, { notifications }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating notification settings:", error);
    res.status(500).json({ error: "Failed to update notification settings" });
  }
};

// Controller to update investment preferences
const updatePreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const { riskTolerance } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, { riskTolerance }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating preferences:", error);
    res.status(500).json({ error: "Failed to update preferences" });
  }
};


module.exports = { getUser, updateUser, updateSecurity, updateNotifications, updatePreferences };