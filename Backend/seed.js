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
    { slot: "1",  name: "Chana Jor Garam",              price: 20, stock: 8,  image: "assets/image/product/vm001/Chana Jor Garam.png" },
    { slot: "2",  name: "Haldiram's Aloo Bhujia",       price: 30, stock: 6,  image: "assets/image/product/vm001/Haldiram's Aloo Bhujia.png" },
    { slot: "3",  name: "Current Khatta Meetha Kurkure",price: 20, stock: 5,  image: "assets/image/product/vm001/currentkhatamethakurkurey.png" },
    { slot: "4",  name: "Current Kurkure",              price: 20, stock: 7,  image: "assets/image/product/vm001/currentkurkure.png" },
    { slot: "5",  name: "Current Kurkure Achaar",       price: 20, stock: 4,  image: "assets/image/product/vm001/currentkurkureachar.jpeg" },
    { slot: "6",  name: "Current Cheese Balls",         price: 25, stock: 6,  image: "assets/image/product/vm001/currentcheeseballs.png" },
    { slot: "7",  name: "Kurkure",                      price: 20, stock: 10, image: "assets/image/product/vm001/kurkure.png" },
    { slot: "8",  name: "Kurkure Chilli Chatka",        price: 20, stock: 6,  image: "assets/image/product/vm001/Kurkure Chilli Chatka.jpeg" },
    { slot: "9",  name: "Kurkure Green Chutney Rajasthani Style", price: 20, stock: 5, image: "assets/image/product/vm001/Kurkure Green Chutney Rajasthani Style.jpeg" },
    { slot: "10", name: "Kurkure Masala Munch",         price: 20, stock: 7,  image: "assets/image/product/vm001/Kurkure Masala Munch.png" },
    { slot: "11", name: "Kwink Cheese Balls",           price: 25, stock: 5,  image: "assets/image/product/vm001/kwinkscheeseballs.webp" },
    { slot: "12", name: "Cheetos Crunchy",              price: 30, stock: 6,  image: "assets/image/product/vm001/Cheetos Crunchy.jpeg" },
    { slot: "13", name: "Lay's Classic",                price: 20, stock: 8,  image: "assets/image/product/vm001/laysclassic.jpeg" },
    { slot: "14", name: "Lay's",                        price: 20, stock: 8,  image: "assets/image/product/vm001/lays.png" },
    { slot: "15", name: "Lay's American Style Cream & Onion", price: 30, stock: 5, image: "assets/image/product/vm001/Lay's American Style Cream & Onion.jpeg" },
    { slot: "16", name: "Lay's Magic Masala",           price: 20, stock: 6,  image: "assets/image/product/vm001/Lay's Magic Masala.jpeg" },
    { slot: "17", name: "Doritos Nacho Cheese",         price: 40, stock: 4,  image: "assets/image/product/vm001/Doritos Nacho Cheese.jpeg" },
    { slot: "18", name: "Doritos Sweet Chilli",         price: 40, stock: 4,  image: "assets/image/product/vm001/Doritos Sweet Chilli.jpeg" },
    { slot: "19", name: "Potato Chips",                 price: 20, stock: 7,  image: "assets/image/product/vm001/patatochips.png" },
    { slot: "20", name: "Potato Chips Mint",            price: 20, stock: 6,  image: "assets/image/product/vm001/patatochips_mint.png" },
    { slot: "21", name: "Pretzels",                     price: 35, stock: 5,  image: "assets/image/product/vm001/Pretzels.avif" },
    { slot: "22", name: "Pringles Original",            price: 60, stock: 4,  image: "assets/image/product/vm001/Pringles Original.jpeg" },
    { slot: "23", name: "Pringles Sour Cream & Onion",  price: 60, stock: 4,  image: "assets/image/product/vm001/Pringles Sour Cream & Onion.jpeg" },
    { slot: "24", name: "Walkers",                      price: 45, stock: 5,  image: "assets/image/product/vm001/walkers.png" },
    { slot: "25", name: "Roasted Peanuts",              price: 20, stock: 8,  image: "assets/image/product/vm001/Roasted Peanuts.jpeg" },
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
    // Remove old entries for this machine first — avoids leaving orphaned
    // "A1"-style documents behind after switching to numeric slots.
    await Product.deleteMany({ machineId });

    const products = machineProducts[machineId];
    for (let i = 0; i < products.length; i++) {
      const product = { ...products[i], slot: String(i + 1) };
      await Product.findOneAndUpdate(
        { machineId, slot: product.slot },
        { machineId, ...product },
        { upsert: true, new: true }
      );
      console.log(`Seeded ${machineId} - slot ${product.slot}: ${product.name}`);
    }
  }

  console.log("✅ Done seeding!");
  mongoose.disconnect();
}

seedDatabase();