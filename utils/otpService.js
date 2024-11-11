// const nodemailer = require('nodemailer');
// const User = require('../models/User');

// // Create a Nodemailer transporter
// const transporter = nodemailer.createTransport({
//     service: 'gmail', // Use 'gmail' for Gmail service
//     auth: {
//         user: 'abhishek.dudhpachare777@gmail.com', // Your email address
//         pass: 'gofp dztq druu oslo', // Your email password or app password
//     },
// });

// // Function to generate a 6-digit OTP
// const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// // Function to send OTP via Email
// const sendOTP = async (email,otp) => {
//     // Retrieve the user from the database using email
//     const user = await User.findOne({ email });
//     console.log(user); // Note: fix the typo from 'consoler.log' to 'console.log'
//     if (!user) {
//         throw new Error('User not found');
//     }

//     // Prepare the OTP
//     // const otp = generateOTP();
//     // const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // Set OTP expiry time to 5 minutes

//     // // Save OTP and expiration in the user document
//     // user.otp = otp;
//     // user.otpExpires = otpExpires;
//     // await user.save();

//     const message = {
//         from: 'abhishek.dudhpachare777@gmail.com',
//         to: user.email, // Use the user's email from the database
//         subject: 'Your OTP Code',
//         text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
//     };

//     return new Promise((resolve, reject) => {
//         transporter.sendMail(message, (error, info) => {
//             if (error) {
//                 console.error('Error sending OTP:', error);
//                 reject(new Error('Failed to send OTP'));
//             } else {
//                 console.log(`OTP sent to ${user.email}`);
//                 resolve(info);
//             }
//         });
//     });
// };

// // Function to verify OTP
// const verifyOTP = async (email, otp) => {
//     const user = await User.findOne({ email });
//     if (!user) {
//         throw new Error('User not found.');
//     }

//     // Check if the OTP matches and is not expired
//     if (user.otp !== otp || user.otpExpires < Date.now()) {
//         throw new Error('Invalid or expired OTP.');
//     }

//     // Clear OTP after verification
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     return user; // Return the user for further processing (like generating a token)
// };

// module.exports = { generateOTP, sendOTP, verifyOTP };