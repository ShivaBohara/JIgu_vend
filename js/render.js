// render.js
// This file's ONE job: take a list of products, turn each one into
// an HTML "card", and inject them into the page.

function renderProducts(products, machineId) {
  const grid = document.getElementById("product-grid");
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
      <div class="card-actions">
        <button class="add-cart-btn" ${isSoldOut ? "disabled" : ""}>Add to Cart</button>
        <button class="buy-now-btn" ${isSoldOut ? "disabled" : ""}>Buy Now</button>
      </div>
    `;

    if (!isSoldOut) {
      const addBtn = card.querySelector(".add-cart-btn");
      const buyBtn = card.querySelector(".buy-now-btn");

      // "Add to Cart" — adds it, customer keeps browsing
      addBtn.addEventListener("click", function () {
        addToCart(machineId, product);
        addBtn.textContent = "Added ✓";
        setTimeout(function () { addBtn.textContent = "Add to Cart"; }, 800);
      });

      // "Buy Now" — adds it, then jumps straight to the cart/checkout page
      buyBtn.addEventListener("click", function () {
        addToCart(machineId, product);
        window.location.href = "cart.html?machine=" + machineId;
      });
    }

    grid.appendChild(card);
  });
}