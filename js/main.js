// main.js
// This is the "controller" — it decides WHICH machine's products to show,
// then hands off the actual display work to render.js
//
// UPDATED: products now come live from the backend API instead of the
// static productdata.js file, so admin edits (price/stock) show up here.

// ⚠️ Same backend URL used in admin.js — change this once for both files
// (or better: move it into one shared config.js later)


// How often to re-check the server for price/stock changes, in ms.
// 5000 = check every 5 seconds. Lower = feels more instant, but more requests.
const POLL_INTERVAL_MS = 5000;

// Keeps track of the last data we rendered, so we can skip re-rendering
// (and interrupting someone mid-click) when nothing has actually changed.
let lastProductsJSON = null;
let pollTimer = null;

// Step 1: Read the machine ID from the URL
// Example URL this expects: product.html?machine=vm001
// (case-insensitive: ?machine= or ?Machine= both work, and the
//  machine ID itself is lowercased so "VM001" still matches "vm001")
const params = new URLSearchParams(window.location.search);
let machineId = null;
for (const [key, value] of params) {
  if (key.toLowerCase() === "machine") {
    machineId = value.toLowerCase();
    break;
  }
}

// Step 2: Update the header label so we can visually confirm which machine loaded
const machineLabel = document.getElementById("machine-label");
machineLabel.textContent = "Machine: " + (machineId || "unknown");

// Step 3: Handle the "no machine ID" case immediately — no point calling the API
if (!machineId) {
  document.getElementById("no-products-message").classList.remove("hidden");
} else {
  init();
}

async function init() {
  const products = await fetchProducts(machineId);

  if (!products || products.length === 0) {
    document.getElementById("no-products-message").classList.remove("hidden");
    return;
  }

  lastProductsJSON = JSON.stringify(products);
  renderProducts(products, machineId);
  updateCartBar(machineId);

  // Start polling for changes (admin panel price/stock edits)
  pollTimer = setInterval(pollForChanges, POLL_INTERVAL_MS);

  // Pause polling when the tab isn't visible (saves requests/battery),
  // and immediately re-check when the person comes back to the tab.
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      clearInterval(pollTimer);
    } else {
      pollForChanges();
      pollTimer = setInterval(pollForChanges, POLL_INTERVAL_MS);
    }
  });
}

async function fetchProducts(machineId) {
  try {
    const res = await fetch(API_BASE + "/api/products/" + machineId);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Could not reach the server for products:", err);
    return null;
  }
}

async function pollForChanges() {
  const products = await fetchProducts(machineId);
  if (!products) return; // server hiccup — just try again next tick

  const newJSON = JSON.stringify(products);
  if (newJSON !== lastProductsJSON) {
    lastProductsJSON = newJSON;
    renderProducts(products, machineId); // re-render with fresh prices/stock
    updateCartBar(machineId);
  }
}