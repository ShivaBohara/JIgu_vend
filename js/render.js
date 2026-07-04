// render.js
// This file's ONE job: take a list of products, turn each one into
// an HTML "card", and inject them into the page.

function renderProducts(products) {
  const grid = document.getElementById("product-grid");

  // Clear anything already in the grid (important if this ever re-runs)
  grid.innerHTML = "";

  products.forEach(function (product, index) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = (index * 0.03) + "s";

    const isSoldOut = product.stock === 0;
    if (isSoldOut) {
      card.classList.add("sold-out");
    }

    card.innerHTML = `
      <span class="product-slot">${product.slot}</span>
      <div class="product-image-wrap">
        <img
          src="${product.image}"
          alt="${product.name}"
          class="product-image"
          onerror="this.onerror=null; this.src='assets/image/placeholder.png';"
        >
      </div>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">Rs. ${product.price}</p>
      <p class="product-stock">${isSoldOut ? "Sold out" : product.stock + " left"}</p>
      <button class="buy-btn" ${isSoldOut ? "disabled" : ""}>
        ${isSoldOut ? "Unavailable" : "Buy"}
      </button>
    `;

    grid.appendChild(card);
  });
}