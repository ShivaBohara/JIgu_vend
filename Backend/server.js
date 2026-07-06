// server.js
// This is the entry point — starts the server, connects to the database,
// and defines the API routes the frontend will talk to.

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product");

const app = express();
app.use(cors());        // allows your Netlify frontend to call this server
app.use(express.json()); // lets the server read JSON sent from the frontend

// ============================================
// Connect to MongoDB Atlas
// ============================================
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ============================================
// ROUTE: Get all products for one machine
// This REPLACES what productdata.js used to do —
// now the frontend asks the server, instead of reading a static file.
// ============================================
app.get("/api/products/:machineId", async (req, res) => {
  try {
    const { machineId } = req.params;
    const products = await Product.find({ machineId }).sort({ slot: 1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ============================================
// ROUTE: Health check — just confirms the server is alive
// Visit this in your browser to test: http://localhost:5000/api/health
// ============================================
app.get("/api/health", (req, res) => {
  res.json({ status: "Jigu Vend backend is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});