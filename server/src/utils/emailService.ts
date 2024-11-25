// server/src/utils/emailService.ts

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (subject: string, text: string) => {

  const transporter = nodemailer.createTransport({
    host: "smpt.gmail.com",
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASSWORD, // Your email password or app password for Gmail
    },
  });

  const mailOptions = {
    from: `"Leave Management System" <${process.env.EMAIL_USER}>`,
    to: 'krisha4972@gmail.com', // Admin email address
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
