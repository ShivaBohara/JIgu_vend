// cart.js
// Handles ALL cart logic: adding items, updating quantity, calculating totals.
// Cart is stored in the browser's localStorage — separate cart per machine,
// since a customer only shops at one machine at a time.

function getCartKey(machineId) {
  return "jigu_cart_" + machineId;
}

// Returns the current cart as an array: [{ slot, name, price, qty }, ...]
function getCart(machineId) {
  const raw = localStorage.getItem(getCartKey(machineId));
  return raw ? JSON.parse(raw) : [];
}

function saveCart(machineId, cart) {
  localStorage.setItem(getCartKey(machineId), JSON.stringify(cart));
}

// Adds one unit of a product to the cart (or increases qty if already added)
function addToCart(machineId, product) {
  const cart = getCart(machineId);
  const existing = cart.find(function (item) { return item.slot === product.slot; });

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      slot: product.slot,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
    });
  }

  saveCart(machineId, cart);
  updateCartBar(machineId);
}

// Changes quantity by a delta (+1 or -1). Removes item entirely if qty hits 0.
function changeQty(machineId, slot, delta) {
  let cart = getCart(machineId);
  const item = cart.find(function (i) { return i.slot === slot; });
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(function (i) { return i.slot !== slot; });
  }

  saveCart(machineId, cart);
  updateCartBar(machineId);
}

function getCartTotal(machineId) {
  const cart = getCart(machineId);
  return cart.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
}

function getCartItemCount(machineId) {
  const cart = getCart(machineId);
  return cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
}

// Updates the floating cart bar at the bottom of product.html
// (safe to call even if the bar doesn't exist on the current page)
function updateCartBar(machineId) {
  const bar = document.getElementById("cart-bar");
  if (!bar) return;

  const count = getCartItemCount(machineId);
  const total = getCartTotal(machineId);

  if (count === 0) {
    bar.classList.add("hidden");
    return;
  }

  bar.classList.remove("hidden");
  document.getElementById("cart-bar-count").textContent = count + (count === 1 ? " item" : " items");
  document.getElementById("cart-bar-total").textContent = "Rs. " + total;
  bar.href = "cart.html?machine=" + machineId;
}