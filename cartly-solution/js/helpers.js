// =========================================================
// HELPERS.JS
// Small functions that MANY pages need.
// This file is loaded before every other script, so the
// functions below can be used in any page's own JS file.
// =========================================================


// ---------------------------------------------------------
// 1. PRODUCTS
// ---------------------------------------------------------

// Load all products from data/products.json
// (Remember: fetch only works through Live Server, not file://)
async function getProducts() {
  try {
    const response = await fetch("data/products.json");

    if (!response.ok) {
      throw new Error("Could not load products");
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
    return []; // give back an empty array so the page does not crash
  }
}

// Turn a number into Naira:  85000  ->  "₦85,000"
function formatPrice(amount) {
  return "₦" + amount.toLocaleString();
}

// Make the first letter a capital:  "electronics" -> "Electronics"
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Build the star icons for a rating like 4.6
// 4 full stars + 1 half star (because 0.6 is 0.5 or more)
function createStars(rating) {
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars += `<i class="fa-solid fa-star"></i>`;
    } else if (rating >= i - 0.5) {
      stars += `<i class="fa-solid fa-star-half-stroke"></i>`;
    } else {
      stars += `<i class="fa-regular fa-star"></i>`;
    }
  }

  return stars;
}

// Build the HTML for ONE product card.
// showActions = false is used on the public Home page (no cart / wishlist buttons).
function createProductCard(product, showActions = true) {
  const outOfStock = product.stock === 0;

  // Is this product already in the user's wishlist?
  const user = getCurrentUser();
  const inWishlist = user ? user.wishlist.includes(product.id) : false;

  const badge = outOfStock ? `<span class="badge">Out of stock</span>` : "";

  const wishlistButton = showActions
    ? `<button class="wishlist-btn ${inWishlist ? "active" : ""}" data-id="${product.id}" aria-label="Add to wishlist">
         <i class="fa-${inWishlist ? "solid" : "regular"} fa-heart"></i>
       </button>`
    : "";

  const cartButton = showActions
    ? `<button class="add-cart-btn" data-id="${product.id}" aria-label="Add to cart" ${outOfStock ? "disabled" : ""}>
         <i class="fa-solid fa-cart-shopping"></i>
       </button>`
    : `<a href="login.html" class="btn btn-outline btn-sm">Shop now</a>`;

  return `
    <article class="product-card">
      ${badge}
      ${wishlistButton}
      <a href="product.html?id=${product.id}" class="product-img">
        <img src="${product.image}" alt="${product.name}" />
      </a>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="rating">
          ${createStars(product.rating)}
          <span>(${product.reviews})</span>
        </div>
        <div class="product-footer">
          <p class="price">${formatPrice(product.price)}</p>
          ${cartButton}
        </div>
      </div>
    </article>
  `;
}


// ---------------------------------------------------------
// 2. USERS & LOCAL STORAGE
// ---------------------------------------------------------
// We save everything in localStorage:
//   "users"         -> an array of every user that signed up
//   "currentUserId" -> the id of the user who is logged in
//
// Each user looks like this:
// {
//   id: 1731150000000,
//   fullName: "Ada Obi",
//   email: "ada@mail.com",
//   password: "secret123",   <- NEVER do this on a real website!
//   phone: "", address: "",
//   cart: [ { id: 1, qty: 2 } ],
//   wishlist: [ 3, 7 ],
//   orders: [ ... ]
// }

function getUsers() {
  // If "users" doesn't exist yet, start with an empty array
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
  const id = Number(localStorage.getItem("currentUserId"));
  const users = getUsers();
  return users.find((user) => user.id === id);
}

// Replace the old copy of the user with the updated one
function saveCurrentUser(updatedUser) {
  const users = getUsers().map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );
  saveUsers(users);
}

function logout() {
  localStorage.removeItem("currentUserId");
  window.location.href = "login.html";
}


// ---------------------------------------------------------
// 3. CART & WISHLIST
// ---------------------------------------------------------

function addToCart(productId, qty = 1) {
  const user = getCurrentUser();
  const item = user.cart.find((cartItem) => cartItem.id === productId);

  if (item) {
    item.qty += qty; // already in cart -> just increase the quantity
  } else {
    user.cart.push({ id: productId, qty: qty });
  }

  saveCurrentUser(user);
  updateBadges();
  showToast("Added to cart");
}

// Add if it's not there, remove if it is. Returns true if it was ADDED.
function toggleWishlist(productId) {
  const user = getCurrentUser();

  if (user.wishlist.includes(productId)) {
    user.wishlist = user.wishlist.filter((id) => id !== productId);
    showToast("Removed from wishlist");
  } else {
    user.wishlist.push(productId);
    showToast("Added to wishlist");
  }

  saveCurrentUser(user);
  updateBadges();
  return user.wishlist.includes(productId);
}

// Total number of items in the cart (2 earbuds + 1 lamp = 3)
function getCartCount(user) {
  return user.cart.reduce((total, item) => total + item.qty, 0);
}

// Update the little red numbers on the cart & wishlist icons
function updateBadges() {
  const user = getCurrentUser();
  if (!user) return;

  document.querySelectorAll(".cart-count").forEach((badge) => {
    badge.textContent = getCartCount(user);
  });

  document.querySelectorAll(".wishlist-count").forEach((badge) => {
    badge.textContent = user.wishlist.length;
  });
}

// Listen for clicks on cart / heart buttons inside a product grid.
// (Event delegation: ONE listener on the parent instead of one per button.)
function handleProductButtons(container, onWishlistChange) {
  container.addEventListener("click", (event) => {
    const cartBtn = event.target.closest(".add-cart-btn");
    const heartBtn = event.target.closest(".wishlist-btn");

    if (cartBtn) {
      addToCart(Number(cartBtn.dataset.id));
    }

    if (heartBtn) {
      const added = toggleWishlist(Number(heartBtn.dataset.id));
      heartBtn.classList.toggle("active", added);
      heartBtn.innerHTML = `<i class="fa-${added ? "solid" : "regular"} fa-heart"></i>`;

      if (onWishlistChange) onWishlistChange();
    }
  });
}


// ---------------------------------------------------------
// 4. SMALL UI HELPERS
// ---------------------------------------------------------

// A small message that pops up at the bottom of the screen
function showToast(message) {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
  toast.classList.add("show");

  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => toast.classList.remove("show"), 2000);
}

// Show (or clear) the red error text under an input.
// The error box must have the id "<input id>-error", e.g. "email-error"
function setError(input, message) {
  const errorBox = document.querySelector(`#${input.id}-error`);
  errorBox.textContent = message;

  if (message) {
    input.classList.add("invalid");
  } else {
    input.classList.remove("invalid");
  }
}

// Make every eye icon show / hide the password next to it
function setupPasswordToggles() {
  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.previousElementSibling;
      const icon = button.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        icon.className = "fa-regular fa-eye-slash";
      } else {
        input.type = "password";
        icon.className = "fa-regular fa-eye";
      }
    });
  });
}

// Simple email check: something@something.something
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// "2026-11-09T10:00:00.000Z" -> "9 Nov 2026"
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
