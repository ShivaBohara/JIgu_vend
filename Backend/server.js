// server.js
// This is the entry point — starts the server, connects to the database,
// and defines the API routes the frontend will talk to.

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product");

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
// PIN verification — each machine has its own admin PIN,
// stored ONLY in the server's .env file (never sent to the browser
// except as a yes/no result). This is what makes it actually secure.
// ============================================
function isPinValid(machineId, pin) {
  // Looks up an env var named like PIN_VM001, PIN_VM002, etc.
  const expectedPin = process.env["PIN_" + machineId.toUpperCase()];
  return expectedPin && pin === expectedPin;
}

// ROUTE: Check if a PIN is correct for a given machine
// The frontend calls this first, before showing the Stock Management screen.
app.post("/api/admin/verify-pin", (req, res) => {
  const { machineId, pin } = req.body;
  if (isPinValid(machineId, pin)) {
    res.json({ valid: true });
  } else {
    res.status(401).json({ valid: false, error: "Incorrect PIN" });
  }
});

// ROUTE: Update a single product's price and/or stock
// Requires the correct PIN to be sent along with every request —
// this is checked on the SERVER every time, not just once on login.
app.put("/api/admin/products/:machineId/:slot", async (req, res) => {
  const { machineId, slot } = req.params;
  const { pin, price, stock } = req.body;

  if (!isPinValid(machineId, pin)) {
    return res.status(401).json({ error: "Incorrect PIN" });
  }

  try {
    const updated = await Product.findOneAndUpdate(
      { machineId, slot },
      { $set: { price, stock } },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product" });
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