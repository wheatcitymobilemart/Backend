const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Nodemailer transport setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify the transporter before sending email
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ Email transporter error:", error);
    } else {
      console.log("✅ Server is ready to send emails");
    }
  });

  // Mail content
  const mailOptions = {
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.TO_EMAIL,
    subject: "New Contact Form Submission",
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully!");
    res.status(200).json({ message: "📧 Message sent successfully!" });
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
