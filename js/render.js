// render.js
// This file's ONE job: take a list of products, turn each one into
// an HTML "card", and inject them into the page.

function renderProducts(products) {
  const grid = document.getElementById("product-grid");

  // Clear anything already in the grid (important if this ever re-runs)
  grid.innerHTML = "";

  // Loop through every product and build a card for each one
  products.forEach(function (product) {
    const card = document.createElement("div");
    card.className = "product-card";

    // If stock is 0, mark it visually as sold out and disable buying
    const isSoldOut = product.stock === 0;
    if (isSoldOut) {
      card.classList.add("sold-out");
    }

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-slot">Slot: ${product.slot}</p>
      <p class="product-price">Rs. ${product.price}</p>
      <p class="product-stock">${isSoldOut ? "Sold Out" : "Stock: " + product.stock}</p>
      <button class="buy-btn" ${isSoldOut ? "disabled" : ""}>
        ${isSoldOut ? "Unavailable" : "Buy"}
      </button>
    `;

    grid.appendChild(card);
  });
}