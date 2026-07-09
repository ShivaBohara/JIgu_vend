// admin.js
// Handles: reading the machine ID, the on-screen keypad, checking the PIN
// against the backend (only when "Go" is pressed), and loading/editing stock.

// ⚠️ Change this to your real backend URL once deployed

const params = new URLSearchParams(window.location.search);
const machineId = (params.get("machine") || "").toLowerCase();
document.getElementById("machine-label").textContent = "Machine: " + (machineId || "unknown");
document.getElementById("back-to-products").href = "product.html?machine=" + machineId;

// If no machine was specified in the URL, show a clear warning immediately
// and disable the Go button — no point letting them type a PIN that can never work.
if (!machineId) {
  document.getElementById("machine-warning").classList.remove("hidden");
  document.getElementById("go-btn").disabled = true;
}

let enteredPin = "";

// If the quick-pick keypad on product.html already verified the PIN,
// skip straight to the Stock Management screen — no need to type it twice.
const alreadyVerified = sessionStorage.getItem("jigu_admin_verified_" + machineId);
const savedPin = sessionStorage.getItem("jigu_admin_pin_" + machineId);
if (machineId && alreadyVerified === "true" && savedPin) {
  enteredPin = savedPin;
  document.getElementById("pin-screen").classList.add("hidden");
  document.getElementById("stock-screen").classList.remove("hidden");
  loadStock();
}

// ============================================
// Keypad handling — ONLY updates the display, never auto-submits
// ============================================
document.querySelectorAll(".key").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const key = btn.dataset.key;

    if (key === "clear") {
      enteredPin = "";
    } else if (key === "back") {
      enteredPin = enteredPin.slice(0, -1);
    } else if (enteredPin.length < 6) {
      enteredPin += key;
    }

    document.getElementById("pin-display").textContent = "•".repeat(enteredPin.length);
    document.getElementById("pin-error").classList.add("hidden");
  });
});

// ============================================
// Explicit "Go" button — this is the ONLY thing that submits the PIN
// ============================================
document.getElementById("go-btn").addEventListener("click", checkPin);

async function checkPin() {
  if (!machineId) return; // safety net, button is disabled anyway in this case

  if (enteredPin.length === 0) {
    document.getElementById("pin-error").textContent = "Enter a PIN first";
    document.getElementById("pin-error").classList.remove("hidden");
    return;
  }

  try {
    const res = await fetch(API_BASE + "/api/admin/verify-pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ machineId, pin: enteredPin }),
    });

    if (res.ok) {
      document.getElementById("pin-screen").classList.add("hidden");
      document.getElementById("stock-screen").classList.remove("hidden");
      loadStock();
    } else {
      document.getElementById("pin-error").textContent = "Incorrect PIN — try again";
      document.getElementById("pin-error").classList.remove("hidden");
      enteredPin = "";
      document.getElementById("pin-display").textContent = "";
    }
  } catch (err) {
    alert("Could not reach the server. Is the backend running?");
    console.error(err);
  }
}

// ============================================
// Stock Management screen
// ============================================
async function loadStock() {
  const list = document.getElementById("stock-list");
  list.innerHTML = "Loading...";

  const res = await fetch(API_BASE + "/api/products/" + machineId);
  const products = await res.json();

  list.innerHTML = "";
  products.forEach(function (product) {
    const state = { stock: product.stock, price: product.price };

    const row = document.createElement("div");
    row.className = "stock-row";
    row.innerHTML = `
      <img src="${product.image}" alt="${product.name}"
           onerror="this.onerror=null; this.src='assets/image/placeholder.png';">
      <div class="stock-row-info">
        <p class="stock-row-name">${product.name} <span style="color:var(--ink-soft)">(${product.slot})</span></p>
        <div class="stock-controls">
          <div class="stock-control-line">
            Qty:
            <button class="qty-minus">−</button>
            <span class="value qty-value">${state.stock}</span>
            <button class="qty-plus">+</button>
          </div>
          <div class="stock-control-line">
            Price Rs.
            <button class="price-minus">−</button>
            <span class="value price-value">${state.price}</span>
            <button class="price-plus">+</button>
          </div>
        </div>
      </div>
      <button class="save-btn">Save</button>
    `;

    const qtyValue = row.querySelector(".qty-value");
    const priceValue = row.querySelector(".price-value");
    const saveBtn = row.querySelector(".save-btn");

    row.querySelector(".qty-minus").addEventListener("click", function () {
      state.stock = Math.max(0, state.stock - 1);
      qtyValue.textContent = state.stock;
      saveBtn.classList.remove("saved");
      saveBtn.textContent = "Save";
    });
    row.querySelector(".qty-plus").addEventListener("click", function () {
      state.stock += 1;
      qtyValue.textContent = state.stock;
      saveBtn.classList.remove("saved");
      saveBtn.textContent = "Save";
    });
    row.querySelector(".price-minus").addEventListener("click", function () {
      state.price = Math.max(0, state.price - 1);
      priceValue.textContent = state.price;
      saveBtn.classList.remove("saved");
      saveBtn.textContent = "Save";
    });
    row.querySelector(".price-plus").addEventListener("click", function () {
      state.price += 1;
      priceValue.textContent = state.price;
      saveBtn.classList.remove("saved");
      saveBtn.textContent = "Save";
    });

    saveBtn.addEventListener("click", async function () {
      saveBtn.textContent = "Saving...";
      try {
        const res = await fetch(
          API_BASE + "/api/admin/products/" + machineId + "/" + product.slot,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pin: enteredPin, price: state.price, stock: state.stock }),
          }
        );
        if (res.ok) {
          saveBtn.textContent = "Saved ✓";
          saveBtn.classList.add("saved");
        } else {
          saveBtn.textContent = "Failed";
        }
      } catch (err) {
        saveBtn.textContent = "Failed";
        console.error(err);
      }
    });

    list.appendChild(row);
  });
}