// server.js
const passport = require('passport');
const session = require('express-session');
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const portfolioRoutes = require('./routes/portfolioRoutes');
dotenv.config();
require('./middleware/authMiddleware'); 
 // Adjust the path as needed

const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
app.use(cors());
 // Middleware to parse JSON
app.use(express.json());
app.use(session({
  secret: 'your_secret_key', // Change this to a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using HTTPS
}));
app.use(passport.initialize());
app.use(passport.session()); 

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use("/api/user", userRoutes);
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ error: "An internal server error occurred" });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err));
