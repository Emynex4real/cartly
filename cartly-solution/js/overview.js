// =========================================================
// OVERVIEW.JS - the main dashboard page
// =========================================================

async function showOverview() {
  const user = getCurrentUser();
  const products = await getProducts();

  // ---------- 1. Welcome banner ----------
  // "Ada Obi" -> split(" ") -> ["Ada", "Obi"] -> [0] -> "Ada"
  document.querySelector("#first-name").textContent = user.fullName.split(" ")[0];

  document.querySelector("#today").textContent = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // ---------- 2. Stat cards ----------
  // Cancelled orders don't count towards money spent
  const totalSpent = user.orders
    .filter((order) => order.status !== "cancelled")
    .reduce((total, order) => total + order.total, 0);

  document.querySelector("#stat-orders").textContent = user.orders.length;
  document.querySelector("#stat-spent").textContent = formatPrice(totalSpent);
  document.querySelector("#stat-cart").textContent = getCartCount(user);
  document.querySelector("#stat-wishlist").textContent = user.wishlist.length;

  // ---------- 3. Recent orders (newest 3) ----------
  const recentBox = document.querySelector("#recent-orders");
  const recentOrders = user.orders.slice(0, 3);

  if (recentOrders.length === 0) {
    recentBox.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-box-open"></i>
        <h3>No orders yet</h3>
        <p>When you place an order, it will show up here.</p>
        <a href="shop.html" class="btn btn-sm">Start shopping</a>
      </div>`;
  } else {
    recentBox.innerHTML = `
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr><th>Order</th><th>Date</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${recentOrders
              .map(
                (order) => `
              <tr>
                <td><strong>${order.id}</strong></td>
                <td>${formatDate(order.date)}</td>
                <td>${formatPrice(order.total)}</td>
                <td><span class="status ${order.status}">${capitalize(order.status)}</span></td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>`;
  }

  // ---------- 4. Top rated (highest 4 ratings) ----------
  // [...products] makes a COPY so sort() doesn't change the original array
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  document.querySelector("#top-rated").innerHTML = topRated
    .map(
      (product) => `
      <li>
        <img src="${product.image}" alt="${product.name}" />
        <div>
          <h4><a href="product.html?id=${product.id}">${product.name}</a></h4>
          <p><i class="fa-solid fa-star" style="color: var(--accent)"></i> ${product.rating}</p>
        </div>
        <strong>${formatPrice(product.price)}</strong>
      </li>`
    )
    .join("");

  // ---------- 5. Popular right now (most reviews, in stock) ----------
  const popularGrid = document.querySelector("#popular");

  const popular = products
    .filter((product) => product.stock > 0)
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 4);

  popularGrid.innerHTML = popular.map((product) => createProductCard(product)).join("");

  handleProductButtons(popularGrid);

  // after any click on a card button, update the stat cards too
  popularGrid.addEventListener("click", refreshStats);
}

function refreshStats() {
  const user = getCurrentUser();
  document.querySelector("#stat-cart").textContent = getCartCount(user);
  document.querySelector("#stat-wishlist").textContent = user.wishlist.length;
}

if (currentUser) {
  showOverview();
}
