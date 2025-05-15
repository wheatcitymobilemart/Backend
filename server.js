const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const emailRoutes = require("./routes/emailRoutes");
const mailRoute = require("./routes/mail");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", emailRoutes);           // Only use this if it exists
app.use("/api/contact", mailRoute);     // Contact form handler

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
