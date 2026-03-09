// ==============================================================
// TAILWIND CUSTOM CONFIGURATION
// Pinapalawak ang default Tailwind colors at fonts para sa custom theme mo
// ==============================================================
tailwind.config = {
  theme: {
    extend: {
      colors: {
        forest: "#194517", // Pangunahing dark green
        "forest-light": "#2a6b26", // Mas maliwanag na green
        "forest-lighter": "#3d8a38", // Pinakamaliwanag na green shade
        sunny: "#e8ea00", // Bright yellow / main accent color
        "sunny-light": "#f0f240", // Lighter sunny variant
        cream: "#f7f6d9", // Off-white / background cream
        "cream-light": "#fdfcf0", // Mas maliwanag na cream
        "cream-dark": "#e8e5a8", // Darker cream para sa text/icons
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Body text font
        space: ["Space Grotesk", "sans-serif"], // Headings & brand font
      },
    },
  },
};

// ==============================================================
// MOBILE MENU TOGGLE
// Para sa hamburger menu sa mobile view
// ==============================================================
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden"); // Toggle visibility ng mobile menu
});

// Isara ang mobile menu kapag clinick ang kahit anong link
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// ==============================================================
// PRICE TABLE TABS SWITCHER
// Lumilipat ng ipinapakitang price table kapag clinick ang tab
// ==============================================================
function showPriceTable(tableId) {
  // Itago lahat ng price tables muna
  document.querySelectorAll(".price-table").forEach((table) => {
    table.classList.add("hidden");
  });

  // Ipakita lang yung hiniling na table
  document.getElementById(`table-${tableId}`).classList.remove("hidden");

  // I-reset lahat ng tab styles
  document.querySelectorAll(".price-tab").forEach((tab) => {
    tab.classList.remove("bg-sunny", "text-forest");
    tab.classList.add("bg-forest-light", "text-cream");
  });

  // I-highlight yung active tab
  const activeTab = document.getElementById(`tab-${tableId}`);
  activeTab.classList.remove("bg-forest-light", "text-cream");
  activeTab.classList.add("bg-sunny", "text-forest");
}

// ==============================================================
// MODAL OPEN/CLOSE FUNCTIONS
// Para sa Bluetooth, Message, at Rate Us pop-ups
// ==============================================================
function openBluetoothModal() {
  document.getElementById("bluetooth-modal").classList.remove("hidden");
}

function closeBluetoothModal() {
  document.getElementById("bluetooth-modal").classList.add("hidden");
}

function openMessageModal() {
  document.getElementById("message-modal").classList.remove("hidden");
}

function closeMessageModal() {
  document.getElementById("message-modal").classList.add("hidden");
}

function openRateModal() {
  document.getElementById("rate-modal").classList.remove("hidden");
}

function closeRateModal() {
  document.getElementById("rate-modal").classList.add("hidden");
}

// ==============================================================
// BLUETOOTH FORM SUBMISSION
// Nagpapakita lang ng toast (demo lang, walang tunay na Bluetooth)
// ==============================================================
function submitBluetoothForm(event) {
  event.preventDefault();
  const deviceName = document.getElementById("bluetooth-device").value;

  showToast(
    `Looking for device: ${deviceName}. Please ensure Bluetooth is enabled!`,
  );

  closeBluetoothModal();
  document.getElementById("bluetooth-form").reset();
}

// ==============================================================
// MESSAGE / INQUIRY FORM SUBMISSION
// Demo submission na may success toast
// ==============================================================
function submitMessageForm(event) {
  event.preventDefault();
  showToast("Message sent successfully! We'll get back to you soon.");
  closeMessageModal();
  document.getElementById("message-form").reset();
}

// ==============================================================
// SIMPLE URL VALIDATION PARA SA CLOUD LINK
// Ginagamit sa order form para i-check kung valid link
// ==============================================================
function handleFileUpload(fileLink) {
  if (!fileLink || fileLink.trim() === "") {
    showToast("Please provide a file link or upload a document.");
    return false;
  }

  try {
    new URL(fileLink); // Sinusubukan kung valid URL
    return true;
  } catch (e) {
    showToast("Please enter a valid link.");
    return false;
  }
}

// ==============================================================
// STAR RATING SYSTEM LOGIC
// Para sa Rate Us modal – nagbabago ng kulay ng stars
// ==============================================================
let currentRating = 0;

function setRating(rating) {
  currentRating = rating;
  document.getElementById("rating-value").value = rating;

  // Update stars visual
  const stars = document.querySelectorAll(".star-rating .star svg");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.remove("text-cream-dark");
      star.classList.add("text-sunny");
    } else {
      star.classList.remove("text-sunny");
      star.classList.add("text-cream-dark");
    }
  });

  // Update text description ng rating
  const ratingTexts = [
    "Click to rate",
    "Poor",
    "Fair",
    "Good",
    "Very Good",
    "Excellent!",
  ];
  document.getElementById("rating-text").textContent = ratingTexts[rating];
}

// ==============================================================
// RATE FORM SUBMISSION
// Nagpapakita ng thank you toast base sa napiling rating
// ==============================================================
function submitRateForm(event) {
  event.preventDefault();

  if (currentRating === 0) {
    showToast("Please select a rating first!");
    return;
  }

  showToast(
    `Thank you for your ${currentRating}-star rating! We appreciate your feedback.`,
  );

  closeRateModal();
  document.getElementById("rate-form").reset();
  setRating(0); // I-reset ang stars
}

// ==============================================================
// MAIN ORDER FORM SUBMISSION
// Nagha-handle ng form validation at toast messages
// ==============================================================
document
  .getElementById("order-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const customerName = document.getElementById("customer-name").value;
    const paymentMethod = document.getElementById("payment-method").value;
    const cloudLink = document.getElementById("cloud-link").value;

    if (!paymentMethod) {
      showToast("Please select a payment method.");
      return;
    }

    if (cloudLink && !handleFileUpload(cloudLink)) {
      return;
    }

    if (paymentMethod === "counter") {
      showToast(
        `Print request submitted! You'll pay at the counter when picking up. Thank you, ${customerName}!`,
      );
    } else if (paymentMethod === "gcash" || paymentMethod === "bank") {
      showToast(
        `Payment method selected: ${
          paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)
        }. Feature coming soon!`,
      );
    }

    this.reset(); // I-clear ang form pagkatapos mag-submit
  });

// ==============================================================
// TOAST NOTIFICATION SYSTEM
// Temporary success/error message sa bottom-right
// ==============================================================
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  toastMessage.textContent = message;
  toast.classList.remove("translate-y-full", "opacity-0");

  // Auto-hide after 4 seconds
  setTimeout(() => {
    toast.classList.add("translate-y-full", "opacity-0");
  }, 4000);
}

// ==============================================================
// SMOOTH SCROLL PARA SA ANCHOR LINKS
// Kapag clinick ang menu links (#home, #printing, etc.)
// ==============================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
