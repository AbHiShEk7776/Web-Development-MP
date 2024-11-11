  const bcrypt = require("bcrypt");
  require('dotenv').config();
  const passport = require('passport');
  const jwt = require("jsonwebtoken");
  const User = require("../models/User");
  const nodemailer = require("nodemailer");
  const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP

  // Nodemailer Transporter Setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER ||'abhishek.dudhpachare777@gmail.com',
      pass: process.env.EMAIL_PASS||'gofp dztq druu oslo',
    },
  });

  // Register function (without OTP)
  const register = async (req, res) => {
    const { username, email, password, phoneNumber, } = req.body;

    try {
      // Check if user exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save user
      const user = new User({
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        
      });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
      });
      res
        .status(201)
        .json({ message: "Registration successful. Please log in.",token });
    } catch (error) {
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };

  // Login function 
  const login = async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      const otp = generateOTP();
      const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

      // Update user record with OTP and expiry
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();

      // Send OTP to user's email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Your OTP for Login",
        text: `Your OTP for login is: ${otp}. It will expire in 10 minutes.`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "OTP sent to your email. Please verify." });
    } catch (error) {
      console.log("Error Details:",error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };
  // Generate token after successful login
  // const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // res.status(200).json({ token });
  // } catch (error) {
  // res.status(500).json({ message: 'Server error. Please try again later.' });
  // }
  // };
  const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email" });
      }

      // Check if OTP is valid and not expired
      if (user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      // Clear OTP and expiry from the user's record after successful verification
      user.otp = null;
      user.otpExpires = null;
      await user.save();

      // Generate a token after successful OTP verification
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };
  const googleLogin = passport.authenticate('google', {
    scope: ['profile', 'email']
  });

  // Route to handle Google callback
  const googleCallback = async (req, res) => {
    try {
      // Log the incoming request data
      console.log(req.user);
      

      // Check if req.user is null
      if (!req.user) {
        console.error('No user found in request:', req.user);
        return res.status(400).json({ error: 'User  not found in request' });
      }

      const profileId = req.user.googleId
      const profileEmail = req.user.email;

      // Ensure Google ID and Email are correctly retrieved
      console.log("Google Profile ID:", profileId);
      console.log("Google Profile Email:", profileEmail);

      let user = await User.findOne({ googleId: profileId });

      // Debug log for user lookup
      console.log("Searching for user with Google ID:", profileId);

      // If no user is found by Google ID, try finding by email to prevent duplicate accounts
      if (!user) {
        console.log("No user found with Google ID. Checking for email:", profileEmail);
        user = await User.findOne({ email: profileEmail });

        if (user) {
          // Link Google account to existing user if email matches
          console.log('Found existing user by email:', user.email);
          user.googleId = profileId;
          await user.save();
          console.log('Linked existing user to Google account:', user.email);
        } else {
          // Create new user if no existing user is found
          console.log('No existing user found. Creating a new user...');
          user = await createUser(profileId, profileEmail);
          console.log('Created new Google user:', user.email);
        }
      } else {
        console.log('Found existing user with Google ID:', user.email);
      }

      // Generate JWT Token
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      const redirectUrl = `${req.query.state || 'http://localhost:3000/dashboard'}?token=${encodeURIComponent(token)}`;

      console.log('JWT Token generated for user:', token, user.username);

      // return res.status(200).json({ user, token });
      return res.redirect(`${redirectUrl}`);
    } catch (error) {
      console.error('Error during Google callback:', error);
      return res.status(500).json({ error: 'Google authentication failed' });
    }
  };


  module.exports = { register, login, verifyOtp ,googleLogin,googleCallback};
