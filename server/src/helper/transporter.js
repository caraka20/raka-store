const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "carakawijaya20@gmail.com",
    pass: "pucaekrxhigjoamf",
  },
  tls: {
    rejectUnauthorized: false,
  },
  port: 587, // Menggunakan port 587 untuk koneksi TLS SMTP
});

module.exports = transporter;

// pass: "pucaekrxhigjoamf",
// host: "smtp.gmail.com",
// port: 587,
// secure: false,
