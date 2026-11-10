// =========================================================
// ORDERS.JS - order history, status tabs and a details modal
// =========================================================

const ordersContent = document.querySelector("#orders-content");
const orderTabs = document.querySelector("#order-tabs");
const modal = document.querySelector("#order-modal");
const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector("#modal-body");

let activeStatus = "all";


// ---------- 1. Show the tab counts, e.g. "Processing (2)" ----------
function showTabCounts() {
  const orders = getCurrentUser().orders;

  orderTabs.querySelectorAll(".category-btn").forEach((tab) => {
    const status = tab.dataset.status;
    const count =
      status === "all"
        ? orders.length
        : orders.filter((order) => order.status === status).length;

    tab.textContent = `${capitalize(status)} (${count})`;
    tab.classList.toggle("active", status === activeStatus);
  });
}


// ---------- 2. Show the orders table ----------
function showOrders() {
  const orders = getCurrentUser().orders;

  const filtered =
    activeStatus === "all"
      ? orders
      : orders.filter((order) => order.status === activeStatus);

  showTabCounts();

  if (filtered.length === 0) {
    ordersContent.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-box-open"></i>
        <h3>No orders here</h3>
        <p>${orders.length === 0 ? "You haven't placed any orders yet." : "No orders with this status."}</p>
        <a href="shop.html" class="btn btn-sm">Go to shop</a>
      </div>`;
    return;
  }

  ordersContent.innerHTML = `
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${filtered
            .map((order) => {
              const itemCount = order.items.reduce((count, item) => count + item.qty, 0);
              return `
              <tr>
                <td><strong>${order.id}</strong></td>
                <td>${formatDate(order.date)}</td>
                <td>${itemCount}</td>
                <td>${formatPrice(order.total)}</td>
                <td><span class="status ${order.status}">${capitalize(order.status)}</span></td>
                <td><button class="link-btn view-btn" data-id="${order.id}">View</button></td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>`;
}


// ---------- 3. The order details modal ----------
function openModal(orderId) {
  const order = getCurrentUser().orders.find((order) => order.id === orderId);

  modalTitle.textContent = `Order ${order.id}`;

  const actions =
    order.status === "processing"
      ? `<div class="summary-actions">
           <button class="btn" data-action="delivered" data-id="${order.id}">
             <i class="fa-solid fa-circle-check"></i> Mark as received
           </button>
           <button class="btn btn-danger" data-action="cancelled" data-id="${order.id}">
             Cancel order
           </button>
         </div>`
      : "";

  modalBody.innerHTML = `
    <p class="results-text">
      Placed on ${formatDate(order.date)} &middot;
      <span class="status ${order.status}">${capitalize(order.status)}</span>
    </p>

    ${order.items
      .map(
        (item) => `
      <div class="modal-item">
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <h4>${item.name}</h4>
          <p>${item.qty} x ${formatPrice(item.price)}</p>
        </div>
        <strong>${formatPrice(item.price * item.qty)}</strong>
      </div>`
      )
      .join("")}

    <div style="margin-top: 1.25rem">
      <div class="summary-row"><span>Subtotal</span><span>${formatPrice(order.subtotal)}</span></div>
      <div class="summary-row"><span>VAT (7.5%)</span><span>${formatPrice(order.vat)}</span></div>
      <div class="summary-row"><span>Delivery</span><span>${order.delivery === 0 ? "Free" : formatPrice(order.delivery)}</span></div>
      <div class="summary-row total"><span>Total</span><span>${formatPrice(order.total)}</span></div>
    </div>

    ${actions}`;

  modal.classList.add("open");
}

function closeModal() {
  modal.classList.remove("open");
}


// ---------- 4. Change an order's status ----------
function updateStatus(orderId, newStatus) {
  if (newStatus === "cancelled" && !confirm("Cancel this order?")) return;

  const user = getCurrentUser();

  // map() returns a new array: the matching order gets the new status
  user.orders = user.orders.map((order) =>
    order.id === orderId ? { ...order, status: newStatus } : order
  );

  saveCurrentUser(user);
  closeModal();
  showOrders();
  showToast(`Order ${orderId} is now ${newStatus}`);
}


// ---------- 5. Event listeners ----------
orderTabs.addEventListener("click", (event) => {
  const tab = event.target.closest(".category-btn");
  if (!tab) return;

  activeStatus = tab.dataset.status;
  showOrders();
});

ordersContent.addEventListener("click", (event) => {
  const viewBtn = event.target.closest(".view-btn");
  if (viewBtn) openModal(viewBtn.dataset.id);
});

modalBody.addEventListener("click", (event) => {
  const actionBtn = event.target.closest("[data-action]");
  if (actionBtn) updateStatus(actionBtn.dataset.id, actionBtn.dataset.action);
});

document.querySelector(".modal-close").addEventListener("click", closeModal);

// clicking the dark background (not the white box) closes the modal
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});


// ---------- 6. Start ----------
if (currentUser) {
  showOrders();
}
