// =========================================================
// CART.JS - change quantities, remove items, totals, checkout
// =========================================================

const VAT_RATE = 0.075; // 7.5% VAT
const DELIVERY_FEE = 2500;
const FREE_DELIVERY_FROM = 50000;

const cartContent = document.querySelector("#cart-content");
let products = [];


// ---------- 1. Join the cart with the product details ----------
// The cart only stores { id, qty }. We need the name, price, image...
function getCartItems() {
  const user = getCurrentUser();

  return user.cart.map((item) => {
    const product = products.find((product) => product.id === item.id);
    return { ...product, qty: item.qty }; // copy the product and add qty
  });
}


// ---------- 2. Work out all the money ----------
function getTotals(items) {
  const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0);
  const vat = Math.round(subtotal * VAT_RATE);
  const delivery = subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
  const total = subtotal + vat + delivery;

  return { subtotal, vat, delivery, total };
}


// ---------- 3. Show the cart ----------
function showCart() {
  const items = getCartItems();

  // Empty cart
  if (items.length === 0) {
    cartContent.innerHTML = `
      <div class="card empty-state">
        <i class="fa-solid fa-cart-shopping"></i>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <a href="shop.html" class="btn">Start shopping</a>
      </div>`;
    return;
  }

  const { subtotal, vat, delivery, total } = getTotals(items);
  const itemCount = items.reduce((count, item) => count + item.qty, 0);
  const amountForFree = FREE_DELIVERY_FROM - subtotal;

  cartContent.innerHTML = `
    <div class="cart-layout">
      <section class="card">
        <div class="card-header">
          <h2>Shopping cart (${itemCount} items)</h2>
          <button class="btn btn-danger btn-sm" id="clear-cart">
            <i class="fa-solid fa-trash"></i> Clear cart
          </button>
        </div>

        ${items
          .map(
            (item) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" />
            <div>
              <h3><a href="product.html?id=${item.id}">${item.name}</a></h3>
              <p>${formatPrice(item.price)} each</p>
            </div>
            <div class="qty-control">
              <button class="decrease" data-id="${item.id}" aria-label="Decrease" ${item.qty <= 1 ? "disabled" : ""}>
                <i class="fa-solid fa-minus"></i>
              </button>
              <span>${item.qty}</span>
              <button class="increase" data-id="${item.id}" aria-label="Increase" ${item.qty >= item.stock ? "disabled" : ""}>
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <p class="item-total">${formatPrice(item.price * item.qty)}</p>
            <button class="remove-btn" data-id="${item.id}" aria-label="Remove item">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>`
          )
          .join("")}
      </section>

      <aside class="card">
        <div class="card-header">
          <h2>Order summary</h2>
        </div>

        <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row"><span>VAT (7.5%)</span><span>${formatPrice(vat)}</span></div>
        <div class="summary-row">
          <span>Delivery</span>
          <span>${delivery === 0 ? "Free" : formatPrice(delivery)}</span>
        </div>
        <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>

        <p class="summary-note">
          <i class="fa-solid fa-truck-fast"></i>
          ${
            delivery === 0
              ? "You get free delivery on this order!"
              : `Add ${formatPrice(amountForFree)} more to get free delivery.`
          }
        </p>

        <div class="summary-actions">
          <button class="btn btn-block" id="checkout-btn">
            <i class="fa-solid fa-lock"></i> Checkout
          </button>
          <a href="shop.html" class="btn btn-outline btn-block">Continue shopping</a>
        </div>
      </aside>
    </div>`;
}


// ---------- 4. Change the cart ----------
function changeQty(productId, change) {
  const user = getCurrentUser();
  const item = user.cart.find((cartItem) => cartItem.id === productId);
  item.qty += change;

  saveCurrentUser(user);
  updateBadges();
  showCart();
}

function removeItem(productId) {
  const user = getCurrentUser();
  user.cart = user.cart.filter((item) => item.id !== productId);

  saveCurrentUser(user);
  updateBadges();
  showCart();
  showToast("Item removed");
}

function clearCart() {
  if (!confirm("Remove everything from your cart?")) return;

  const user = getCurrentUser();
  user.cart = [];

  saveCurrentUser(user);
  updateBadges();
  showCart();
}


// ---------- 5. Checkout: turn the cart into an order ----------
function checkout() {
  const user = getCurrentUser();
  const items = getCartItems();
  const totals = getTotals(items);

  if (!confirm(`Place this order for ${formatPrice(totals.total)}?`)) return;

  const newOrder = {
    id: "CT-" + (1001 + user.orders.length), // CT-1001, CT-1002 ...
    date: new Date().toISOString(),
    status: "processing",
    // keep a copy of the name & price, in case prices change later
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      qty: item.qty,
    })),
    ...totals, // adds subtotal, vat, delivery and total
  };

  user.orders.unshift(newOrder); // newest order goes first
  user.cart = [];
  saveCurrentUser(user);

  showToast("Order placed successfully!");
  setTimeout(() => (window.location.href = "orders.html"), 1200);
}


// ---------- 6. One click listener for every button in the cart ----------
cartContent.addEventListener("click", (event) => {
  const decreaseBtn = event.target.closest(".decrease");
  const increaseBtn = event.target.closest(".increase");
  const removeBtn = event.target.closest(".remove-btn");

  if (decreaseBtn) changeQty(Number(decreaseBtn.dataset.id), -1);
  if (increaseBtn) changeQty(Number(increaseBtn.dataset.id), 1);
  if (removeBtn) removeItem(Number(removeBtn.dataset.id));
  if (event.target.closest("#clear-cart")) clearCart();
  if (event.target.closest("#checkout-btn")) checkout();
});


// ---------- 7. Start ----------
async function startCart() {
  products = await getProducts();
  showCart();
}

if (currentUser) {
  startCart();
}
