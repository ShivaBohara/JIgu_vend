// models/Product.js
// This defines the SHAPE of a product record in the database.
// Same fields you already have in productdata.js — just now living
// in a real shared database instead of a file copied to every browser.

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  machineId: { type: String, required: true },   // e.g. "vm001"
  slot: { type: String, required: true },          // e.g. "A1"
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  image: { type: String, required: true },
});

// One product is uniquely identified by its machine + slot combo
productSchema.index({ machineId: 1, slot: 1 }, { unique: true });

module.exports = mongoose.model("Product", productSchema);