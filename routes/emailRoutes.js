require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const { EMAIL_USER, EMAIL_PASS, RECEIVER_EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

router.post("/send-booking", async (req, res) => {
  const { name, email, phone, date, time,screenOption,selectedDevice, selectedModel, selectedRepairOption,repairPrices } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !date || !time || !selectedModel || !selectedRepairOption) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: `${RECEIVER_EMAIL}, ${email}`,
    subject: "Device Repair Booking Confirmation",
    html: `
      <h3>Booking Details</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Device:</strong> ${selectedDevice}</p>
      <p><strong>Selected Model:</strong> ${selectedModel}</p>
      <p><strong>Selected Repair Option:</strong> ${selectedRepairOption}</p>
      <p><strong>Repair Prices:</strong> ${repairPrices}</p>
      ${screenOption ? `<p><strong>Screen Option:</strong> ${screenOption}</p>` : ""}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Booking email sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;