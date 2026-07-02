// productdata.js
// This file holds FAKE product data for now.
// Later, this gets replaced by real data coming from a database/backend.
// Structure: machineProducts[machineId] = array of product objects

const machineProducts = {

  // ============================
  // MACHINE 1 — vm001 (30 products, 5 rows x 6 columns)
  // ============================
vm001: [
  // Row A - Namkeen/Traditional
  { slot: "A1", name: "Chana Jor Garam",              price: 20, stock: 8,  image: "assets/image/product/vm001/Chana Jor Garam.png" },
  { slot: "A2", name: "Haldiram's Aloo Bhujia",       price: 30, stock: 6,  image: "assets/image/product/vm001/Haldiram's Aloo Bhujia.png" },
  { slot: "A3", name: "Current Khatta Meetha Kurkure",price: 20, stock: 5,  image: "assets/image/product/vm001/currentkhatamethakurkurey.png" },
  { slot: "A4", name: "Current Kurkure",              price: 20, stock: 7,  image: "assets/image/product/vm001/currentkurkure.png" },
  { slot: "A5", name: "Current Kurkure Achaar",       price: 20, stock: 4,  image: "assets/image/product/vm001/currentkurkureachar.jpeg" },
  { slot: "A6", name: "Current Cheese Balls",         price: 25, stock: 6,  image: "assets/image/product/vm001/currentcheeseballs.png" },

  // Row B - Kurkure Variants
  { slot: "B1", name: "Kurkure",                      price: 20, stock: 10, image: "assets/image/product/vm001/kurkure.png" },
  { slot: "B2", name: "Kurkure Chilli Chatka",        price: 20, stock: 6,  image: "assets/image/product/vm001/Kurkure Chilli Chatka.jpeg" },
  { slot: "B3", name: "Kurkure Green Chutney Rajasthani Style", price: 20, stock: 5, image: "assets/image/product/vm001/Kurkure Green Chutney Rajasthani Style.jpeg" },
  { slot: "B4", name: "Kurkure Masala Munch",         price: 20, stock: 7,  image: "assets/image/product/vm001/Kurkure Masala Munch.png" },
  { slot: "B5", name: "Kwink Cheese Balls",           price: 25, stock: 5,  image: "assets/image/product/vm001/kwinkscheeseballs.webp" },
  { slot: "B6", name: "Cheetos Crunchy",              price: 30, stock: 6,  image: "assets/image/product/vm001/Cheetos Crunchy.jpeg" },

  // Row C - Lay's / Doritos
  { slot: "C1", name: "Lay's Classic",                price: 20, stock: 8,  image: "assets/image/product/vm001/laysclassic.jpeg" },
  { slot: "C2", name: "Lay's",                        price: 20, stock: 8,  image: "assets/image/product/vm001/lays.png" },
  { slot: "C3", name: "Lay's American Style Cream & Onion", price: 30, stock: 5, image: "assets/image/product/vm001/Lay's American Style Cream & Onion.jpeg" },
  { slot: "C4", name: "Lay's Magic Masala",           price: 20, stock: 6,  image: "assets/image/product/vm001/Lay's Magic Masala.jpeg" },
  { slot: "C5", name: "Doritos Nacho Cheese",         price: 40, stock: 4,  image: "assets/image/product/vm001/Doritos Nacho Cheese.jpeg" },
  { slot: "C6", name: "Doritos Sweet Chilli",         price: 40, stock: 4,  image: "assets/image/product/vm001/Doritos Sweet Chilli.jpeg" },

  // Row D - Chips / Pretzels
  { slot: "D1", name: "Potato Chips",                 price: 20, stock: 7,  image: "assets/image/product/vm001/patatochips.png" },
  { slot: "D2", name: "Potato Chips Mint",             price: 20, stock: 6,  image: "assets/image/product/vm001/patatochips_mint.png" },
  { slot: "D3", name: "Pretzels",                     price: 35, stock: 5,  image: "assets/image/product/vm001/Pretzels.avif" },
  { slot: "D4", name: "Pringles Original",            price: 60, stock: 4,  image: "assets/image/product/vm001/Pringles Original.jpeg" },
  { slot: "D5", name: "Pringles Sour Cream & Onion",  price: 60, stock: 4,  image: "assets/image/product/vm001/Pringles Sour Cream & Onion.jpeg" },
  { slot: "D6", name: "Walkers",                      price: 45, stock: 5,  image: "assets/image/product/vm001/walkers.png" },

  // Row E - Extras
  { slot: "E1", name: "Roasted Peanuts",              price: 20, stock: 8,  image: "assets/image/product/vm001/Roasted Peanuts.jpeg" },
],

  // ============================
  // MACHINE 2 — vm002 (fill in the remaining slots yourself using the same pattern)
  // ============================
  vm002: [
    { slot: "A1", name: "Pen",          price: 20,  stock: 10,image: "assets/image/product/pen.png" },
    { slot: "A2", name: "Notebook",     price: 60,  stock: 8, image: "assets/image/product/notebook.png" },
    { slot: "A3", name: "Pencil",       price: 15,  stock: 12,image: "assets/image/product/pencil.png" },
    // TODO: add A4, A5, A6, then Row B through Row E (27 more products to reach 30)
  ],

  // ============================
  // MACHINE 3 — vm003 (fill in the remaining slots yourself using the same pattern)
  // ============================
  vm003: [
    { slot: "A1", name: "Face Mask",    price: 10,  stock: 20,image: "assets/image/product/mask.png" },
    { slot: "A2", name: "Hand Sanitizer",price: 50, stock: 10,image: "assets/image/product/sanitizer.png" },
    { slot: "A3", name: "Tissue Pack",  price: 30,  stock: 15,image: "assets/image/product/tissue.png" },
    // TODO: add A4, A5, A6, then Row B through Row E (27 more products to reach 30)
  ],

};