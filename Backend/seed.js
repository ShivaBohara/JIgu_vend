// seed.js
// RUN THIS ONCE to copy your existing productdata.js products into the database.
// Usage:  node seed.js
//
// After this, productdata.js in your frontend becomes unnecessary —
// the frontend will fetch live data from the server instead.

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

// ⚠️ PASTE your machineProducts object from productdata.js below,
// replacing the example data. Keep the same field names (slot, name, price, stock, image).
const machineProducts = {
  vm001: [
    { slot: "A1", name: "Lays Classic", price: 50, stock: 5, image: "assets/image/product/vm001/lays.png" },
    // ... paste the rest of your vm001 products here
  ],
  vm002: [
    // ... paste your vm002 products here
  ],
  vm003: [
    // ... paste your vm003 products here
  ],
};

async function seedDatabase() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB. Seeding...");

  for (const machineId of Object.keys(machineProducts)) {
    for (const product of machineProducts[machineId]) {
      await Product.findOneAndUpdate(
        { machineId, slot: product.slot },
        { machineId, ...product },
        { upsert: true, new: true } // creates if missing, updates if it already exists
      );
      console.log(`Seeded ${machineId} - ${product.slot}: ${product.name}`);
    }
  }

  console.log("✅ Done seeding!");
  mongoose.disconnect();
}

seedDatabase();