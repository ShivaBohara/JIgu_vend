// productdata.js
// This file holds FAKE product data for now.
// Later, this gets replaced by real data coming from a database/backend.
// Structure: machineProducts[machineId] = array of product objects

const machineProducts = {

  // ============================
  // MACHINE 1 — vm001 (25 products so far — you have 5 more slots to fill to reach 30)
  // ============================
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

  // ============================
  // MACHINE 2 — vm002
  // ============================
  vm002: [
    { slot: "1",  name: "5 Star",                       price: 40,  stock: 5, image: "assets/image/product/vm002/5_star.png" },
    { slot: "2",  name: "Bounty",                        price: 50,  stock: 5, image: "assets/image/product/vm002/bounty.jpg" },
    { slot: "3",  name: "Britannia Bourbon",             price: 30,  stock: 5, image: "assets/image/product/vm002/britannia_bourbon.webp" },
    { slot: "4",  name: "Britannia Good Day Butter",     price: 30,  stock: 5, image: "assets/image/product/vm002/britannia_good_day_butter.png" },
    { slot: "5",  name: "Britannia Good Day Cashew",     price: 35,  stock: 5, image: "assets/image/product/vm002/britannia_good_day_cashew.jpeg" },
    { slot: "6",  name: "Britannia Marie Gold",          price: 25,  stock: 5, image: "assets/image/product/vm002/britannia_marie_gold.jpeg" },
    { slot: "7",  name: "Dairy Milk Silk",               price: 90,  stock: 5, image: "assets/image/product/vm002/dairy_milk_silk.webp" },
    { slot: "8",  name: "Dairy Milk",                    price: 40,  stock: 5, image: "assets/image/product/vm002/dairy_milk.webp" },
    { slot: "9",  name: "Ferrero Rocher (3 Pack)",       price: 150, stock: 5, image: "assets/image/product/vm002/ferrero_rocher_3pack.avif" },
    { slot: "10", name: "Galaxy Chocolate",              price: 60,  stock: 5, image: "assets/image/product/vm002/galaxy_chocolate.png" },
    { slot: "11", name: "Hershey's Cookies 'n' Creme",   price: 80,  stock: 5, image: "assets/image/product/vm002/hersheys_cookies_n_creme.webp" },
    { slot: "12", name: "Hide & Seek Chocolate Chip",    price: 35,  stock: 5, image: "assets/image/product/vm002/hide_seek_chocolate_chip.avif" },
    { slot: "13", name: "Kinder Bueno",                  price: 70,  stock: 5, image: "assets/image/product/vm002/kinder_bueno.jpg" },
    { slot: "14", name: "KitKat",                        price: 40,  stock: 5, image: "assets/image/product/vm002/kitkat.jpeg" },
    { slot: "15", name: "Mars Bar",                      price: 60,  stock: 5, image: "assets/image/product/vm002/mars_bar.jpeg" },
    { slot: "16", name: "Milkybar",                      price: 40,  stock: 5, image: "assets/image/product/vm002/milkybar.avif" },
    { slot: "17", name: "Monaco Biscuits",                price: 25,  stock: 5, image: "assets/image/product/vm002/monaco_biscuits.jpeg" },
    { slot: "18", name: "Munch",                          price: 20,  stock: 5, image: "assets/image/product/vm002/munch.png" },
    { slot: "19", name: "Nutella B-Ready",                price: 90,  stock: 5, image: "assets/image/product/vm002/nutella_b_ready.avif" },
    { slot: "20", name: "Oreo Chocolate Creme",           price: 40,  stock: 5, image: "assets/image/product/vm002/oreo_chocolate_creme.webp" },
    { slot: "21", name: "Oreo Original",                  price: 35,  stock: 5, image: "assets/image/product/vm002/oreo_original.png" },
    { slot: "22", name: "Oreo Red Velvet",                price: 45,  stock: 5, image: "assets/image/product/vm002/oreo_red_velvet.jpeg" },
    { slot: "23", name: "Parle-G",                        price: 20,  stock: 5, image: "assets/image/product/vm002/parle_g.png" },
    { slot: "24", name: "Perk",                           price: 30,  stock: 5, image: "assets/image/product/vm002/perk.jpeg" },
    { slot: "25", name: "Reese's Peanut Butter Cups",     price: 100, stock: 5, image: "assets/image/product/vm002/reeses_peanut_butter_cups.jpeg" },
    { slot: "26", name: "Snickers",                       price: 60,  stock: 5, image: "assets/image/product/vm002/snickers.png" },
    { slot: "27", name: "Sunfeast Dark Fantasy",          price: 40,  stock: 5, image: "assets/image/product/vm002/sunfeast_dark_fantasy.webp" },
    { slot: "28", name: "Sunfeast Mom's Magic",           price: 30,  stock: 5, image: "assets/image/product/vm002/sunfeast_moms_magic.jpg" },
    { slot: "29", name: "Toblerone",                      price: 180, stock: 5, image: "assets/image/product/vm002/toblerone.png" },
    { slot: "30", name: "Twix",                           price: 55,  stock: 5, image: "assets/image/product/vm002/twix.jpeg" },
  ],

  // ============================
  // MACHINE 3 — vm003 (only 3 filled in — add slots 4-30 the same way)
  // ============================
  vm003: [
    { slot: "1", name: "Face Mask",        price: 10, stock: 20, image: "assets/image/product/mask.png" },
    { slot: "2", name: "Hand Sanitizer",   price: 50, stock: 10, image: "assets/image/product/sanitizer.png" },
    { slot: "3", name: "Tissue Pack",      price: 30, stock: 15, image: "assets/image/product/tissue.png" },
    // TODO: add slots 4-30 the same way
  ],

};