// require('dotenv').config();
// const nodemailer = require("nodemailer");

// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL_USER, // e.g. your Gmail address
// //     pass: process.env.EMAIL_PASS  // Gmail App Password (16 chars, no spaces)
// //   }
// // });

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465, // you can also test 587 if 465 fails
//   secure: true, // true for port 465, false for port 587
//   auth: {
//     user: process.env.EMAIL_USER,  // your Gmail address
//     pass: process.env.EMAIL_PASS   // your 16-character App Password
//   },
//   connectionTimeout: 10000, // optional safety
// });


// const sendEmail = async (to, subject, text) => {
//   try {
//     await transporter.sendMail({
//       from: `"RetroMiner System" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//     });
//     console.log(`✅ Email sent to ${to}`);
//   } catch (err) {
//     console.error("❌ Email send failed:", err.message);
//   }
// };

// module.exports = sendEmail;
