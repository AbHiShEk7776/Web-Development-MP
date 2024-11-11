// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true, // Ensures that each Google ID is unique
    sparse: true, // Allows non-unique values, important for email/password sign-ups
  },
  username: {
    type: String,
    required: function() {
      console.log('Checking username required, googleId:', this.googleId);
      return !this.googleId;
    },
    unique: true,  // Ensures that the username is unique
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: function(){
      return !this.googleId;
    },
  },
  phoneNumber: {
    type: String,
    required: function() {
      // Only require phone number if googleId is not present (for non-Google users)
      return !this.googleId;
    },
    match: /^[0-9]{10}$/, // Validates a 10-digit phone number
  },
  otp: { 
    type: String,
    default:null,
  },
  otpExpires: { 
    type: Date,
    default:null,
  },

  // New fields
  riskTolerance: {
    type: String,
    enum: ["conservative", "moderate", "aggressive"],
    default: "moderate",
  },
  twoFactor: {
    type: Boolean,
    default: false,
  },
  notifications: {
    email: {
      type: Boolean,
      default: true,
    },
    push: {
      type: Boolean,
      default: false,
    },
    sms: {
      type: Boolean,
      default: false,
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;


