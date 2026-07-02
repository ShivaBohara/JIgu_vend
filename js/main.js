// main.js
// This is the "controller" — it decides WHICH machine's products to show,
// then hands off the actual display work to render.js

// Step 1: Read the machine ID from the URL
// Example URL this expects: product.html?machine=vm001
const params = new URLSearchParams(window.location.search);
const machineId = params.get("machine");

// Step 2: Update the header label so we can visually confirm which machine loaded
const machineLabel = document.getElementById("machine-label");
machineLabel.textContent = "Machine: " + (machineId || "unknown");

// Step 3: Look up this machine's products from productdata.js
const productsToShow = machineProducts[machineId];

// Step 4: Handle the "no machine ID" or "unknown machine" case
// (e.g. someone opens product.html directly without a ?machine= in the URL)
if (!machineId || !productsToShow || productsToShow.length === 0) {
  document.getElementById("no-products-message").classList.remove("hidden");
} else {
  // Step 5: Hand off to render.js to actually build and show the product cards
  renderProducts(productsToShow);
}