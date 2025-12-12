import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: process.env.Email_HOST,
  port: process.env.Email_PORT,
  secure: false,
  auth: {
    user: process.env.Email_USER,
    pass: process.env.Email_PASS,
  },
});

export default transporter