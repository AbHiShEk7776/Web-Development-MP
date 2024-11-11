const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust based on your project structure
const dotenv = require('dotenv');

dotenv.config();
// Serialize user information into session
passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    done(null, user.id);
});

// Deserialize user information from session
passport.deserializeUser(async (id, done) => {
    try {
        console.log('Deserializing user with ID:', id);
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        console.error('Error during deserialization:', error);
        done(error, null);
    }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/google/callback',
    scope: [
        'openid',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('OAuth Profile Data:', profile);

        const email = profile.emails?.[0]?.value;
        if (!email) {
            console.error('No email found in profile:', profile);
            return done(new Error('No email associated with this Google account'), null);
        }

        let user = await User.findOne({ googleId: profile.id });
        console.log("User look like this: ", user);

        if (!user) {
            user = await User.findOne({ email });
            if (!user) {
                user = await createUser(profile.id, email);
            } else {
                console.log('User with this email already exists:', email);
                if (!user.googleId) {
                    user.googleId = profile.id;
                    await user.save();
                    console.log('Linked Google account to existing user:', email);
                }
            }
        }

        return done(null,user); // Returning user only
    } catch (error) {
        console.error('Error during Google authentication:', error);
        return done(error, null);
    }
}));

const createUser = async (googleId, email) => {
    console.log('Creating user with Google ID:', googleId);
    console.log('User email from Google OAuth:', email);

    let username = email.split('@')[0]; // Generate a base username from the email prefix
    console.log('Initial username generated from email:', username);

    try {
        // Check if the generated username already exists in the database
        let usernameExists = await User.findOne({ username });
        let counter = 1;

        // Loop to generate a unique username if a collision occurs
        while (usernameExists) {
            username = `${email.split('@')[0]}_${counter++}`; // Append counter to avoid username collision
            console.log(`Username collision detected, trying new username: ${username}`);
            usernameExists = await User.findOne({ username });
        }

        console.log('Final generated username after collision check:', username);

        // Create the new user object for Google sign-up
        const newUser = new User({
            googleId,
            email,
            username,
            password: null, // No password needed for Google users
            phoneNumber: null, // No phone number required for Google users
            riskTolerance: 'moderate', // Default risk tolerance
            twoFactor: false, // Default 2FA set to false
            notifications: {
                email: true, // Default email notifications enabled
                push: false, // Default push notifications disabled
                sms: false, // Default SMS notifications disabled
            },
        });

        console.log('New user object before saving:', newUser);

        // Save the new user to the database
        const savedUser = await newUser.save();
        console.log('User saved successfully:', savedUser);

        return savedUser; // Return the created user
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.name === 'ValidationError') {
            console.error('Validation error details:', error.errors);
        }
        throw new Error('Error creating new user');
    }
};

// const User = require('../models/User'); // Adjust based on your project structure

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token Error: ", err);  // Log the error for debugging
      return res.status(403).json({ message: 'Invalid token' });
    }

    console.log("Decoded User: ", user);  // Log the decoded user to verify if the user ID is there
    req.user = user; // Attach the user object to the request
    next();
  });
};

module.exports = {authenticateToken,passport,};
