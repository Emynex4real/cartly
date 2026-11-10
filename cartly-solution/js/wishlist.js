// =========================================================
// WISHLIST.JS - products the user saved with the heart button
// =========================================================

const wishlistGrid = document.querySelector("#wishlist-grid");
const wishlistText = document.querySelector("#wishlist-text");
const addAllBtn = document.querySelector("#add-all-btn");

let products = [];


function showWishlist() {
  const user = getCurrentUser();

  // keep only the products whose id is in the wishlist array
  const saved = products.filter((product) => user.wishlist.includes(product.id));

  if (saved.length === 0) {
    wishlistText.textContent = "";
    addAllBtn.style.display = "none";
    wishlistGrid.innerHTML = `
      <div class="card empty-state" style="grid-column: 1 / -1">
        <i class="fa-regular fa-heart"></i>
        <h3>Your wishlist is empty</h3>
        <p>Tap the heart on any product to save it for later.</p>
        <a href="shop.html" class="btn">Browse products</a>
      </div>`;
    return;
  }

  wishlistText.textContent = `You have ${saved.length} saved item${saved.length === 1 ? "" : "s"}`;
  addAllBtn.style.display = "inline-flex";
  wishlistGrid.innerHTML = saved.map((product) => createProductCard(product)).join("");
}


// When a heart is clicked here, the item is removed, so draw the list again
handleProductButtons(wishlistGrid, showWishlist);


// Add every in-stock wishlist item to the cart
addAllBtn.addEventListener("click", () => {
  const user = getCurrentUser();

  const inStock = products.filter(
    (product) => user.wishlist.includes(product.id) && product.stock > 0
  );

  inStock.forEach((product) => {
    const item = user.cart.find((cartItem) => cartItem.id === product.id);
    if (!item) user.cart.push({ id: product.id, qty: 1 });
  });

  saveCurrentUser(user);
  updateBadges();
  showToast(`${inStock.length} item(s) added to cart`);
});


async function startWishlist() {
  products = await getProducts();
  showWishlist();
}

if (currentUser) {
  startWishlist();
}
