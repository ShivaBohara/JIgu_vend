// quickpick.js
// ONE keypad, two jobs:
//  - Short input (1-2 digits): looks up a product by its slot number.
//  - Longer input (4-6 digits): silently checked against the machine's
//    real admin PIN in the background. If it matches, jumps straight
//    to the admin panel — no separate "owner" button needed.

// ⚠️ Must match the API_BASE used in admin.js
const QUICKPICK_API_BASE = "http://localhost:5000";

function initQuickPick(machineId) {
  const fab = document.getElementById("quickpick-fab");
  const modal = document.getElementById("quickpick-modal");
  const display = document.getElementById("quickpick-display");
  const closeBtn = document.getElementById("quickpick-close");
  const goBtn = document.getElementById("quickpick-go");

  let typed = "";
  let checkedPins = new Set(); // avoids re-checking the same PIN attempt twice

  fab.addEventListener("click", function () {
    modal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", closeModal);

  function closeModal() {
    modal.classList.add("hidden");
    typed = "";
    display.textContent = "";
  }

  modal.querySelectorAll(".key").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const key = btn.dataset.key;
      if (key === "clear") {
        typed = "";
      } else if (key === "back") {
        typed = typed.slice(0, -1);
      } else if (typed.length < 6) {
        typed += key;
      }
      display.textContent = typed;

      // Once 4+ digits are typed, silently try it as an admin PIN.
      // Nothing visible happens if it's wrong — a normal customer
      // typing a random long number never sees anything unusual.
      if (typed.length >= 4 && !checkedPins.has(typed)) {
        checkedPins.add(typed);
        tryAsAdminPin(typed);
      }
    });
  });

  async function tryAsAdminPin(pin) {
    try {
      const res = await fetch(QUICKPICK_API_BASE + "/api/admin/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ machineId, pin }),
      });

      if (res.ok) {
        // Correct PIN — store it for admin.html to pick up automatically,
        // then go straight there without a second PIN screen.
        sessionStorage.setItem("jigu_admin_verified_" + machineId, "true");
        sessionStorage.setItem("jigu_admin_pin_" + machineId, pin);
        window.location.href = "admin.html?machine=" + machineId;
      }
      // If wrong, do nothing — stay on the product-lookup keypad silently.
    } catch (err) {
      // Backend not reachable — fail silently here too, this keypad's
      // main job (product lookup) should never break because of this.
      console.error("Admin PIN check failed:", err);
    }
  }

  goBtn.addEventListener("click", function () {
    if (!typed) return;

    // Product slot lookup (only meaningful for short numbers)
    const card = Array.from(document.querySelectorAll(".product-card")).find(function (c) {
      const slotText = c.querySelector(".product-slot").textContent.trim();
      return slotText === typed;
    });

    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.add("flash-highlight");
      setTimeout(function () { card.classList.remove("flash-highlight"); }, 1200);
      closeModal();
    } else {
      display.textContent = typed + " — not found";
    }
  });
}