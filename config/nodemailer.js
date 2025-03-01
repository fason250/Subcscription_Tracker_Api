import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jeyfason58@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;
