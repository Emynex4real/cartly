// =========================================================
// PRODUCT.JS - show ONE product using the ?id= in the URL
// e.g. product.html?id=7
// =========================================================

const detailsBox = document.querySelector("#product-details");
const relatedGrid = document.querySelector("#related");

let quantity = 1;


async function showProduct() {
  const products = await getProducts();

  // ---------- 1. Read the id from the URL ----------
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  // ---------- 2. Find the product ----------
  const product = products.find((item) => item.id === id);

  if (!product) {
    detailsBox.innerHTML = `
      <div class="card empty-state">
        <i class="fa-solid fa-circle-exclamation"></i>
        <h3>Product not found</h3>
        <p>This product does not exist or has been removed.</p>
        <a href="shop.html" class="btn btn-sm">Back to shop</a>
      </div>`;
    document.querySelector("#related-section").remove();
    return;
  }

  document.title = `${product.name} | Cartly`;

  // ---------- 3. Show the details ----------
  const user = getCurrentUser();
  const inWishlist = user.wishlist.includes(product.id);
  const inStock = product.stock > 0;

  detailsBox.innerHTML = `
    <div class="card product-details">
      <div class="details-img">
        <img src="${product.image}" alt="${product.name}" />
      </div>

      <div class="details-info">
        <p class="product-category">${product.category}</p>
        <h2>${product.name}</h2>
        <div class="rating">
          ${createStars(product.rating)}
          <span>${product.rating} (${product.reviews} reviews)</span>
        </div>
        <p class="details-price">${formatPrice(product.price)}</p>
        <p class="details-desc">${product.description}</p>

        <p class="stock ${inStock ? "in" : "out"}">
          <i class="fa-solid ${inStock ? "fa-circle-check" : "fa-circle-xmark"}"></i>
          ${inStock ? `In stock (${product.stock} left)` : "Out of stock"}
        </p>

        <div class="details-actions">
          <div class="qty-control">
            <button id="minus" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
            <span id="qty">1</span>
            <button id="plus" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
          </div>

          <button class="btn" id="add-btn" ${inStock ? "" : "disabled"}>
            <i class="fa-solid fa-cart-shopping"></i> Add to cart
          </button>

          <button class="btn btn-outline" id="wish-btn">
            <i class="fa-${inWishlist ? "solid" : "regular"} fa-heart"></i>
            <span>${inWishlist ? "Saved" : "Save"}</span>
          </button>
        </div>

        <ul class="perks">
          <li><i class="fa-solid fa-truck-fast"></i> Free delivery on orders above ₦50,000</li>
          <li><i class="fa-solid fa-rotate-left"></i> 7-day easy returns</li>
          <li><i class="fa-solid fa-shield-halved"></i> 100% original product</li>
        </ul>
      </div>
    </div>`;

  setupButtons(product);

  // ---------- 4. Related products: same category, not this one ----------
  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  relatedGrid.innerHTML = related.map((item) => createProductCard(item)).join("");
  handleProductButtons(relatedGrid);
}


function setupButtons(product) {
  const qtyText = document.querySelector("#qty");
  const minusBtn = document.querySelector("#minus");
  const plusBtn = document.querySelector("#plus");
  const addBtn = document.querySelector("#add-btn");
  const wishBtn = document.querySelector("#wish-btn");

  // You can't pick less than 1 or more than what's in stock
  function updateQty() {
    qtyText.textContent = quantity;
    minusBtn.disabled = quantity <= 1;
    plusBtn.disabled = quantity >= product.stock;
  }

  minusBtn.addEventListener("click", () => {
    quantity--;
    updateQty();
  });

  plusBtn.addEventListener("click", () => {
    quantity++;
    updateQty();
  });

  addBtn.addEventListener("click", () => {
    addToCart(product.id, quantity);
    quantity = 1;
    updateQty();
  });

  wishBtn.addEventListener("click", () => {
    const added = toggleWishlist(product.id);
    wishBtn.innerHTML = `
      <i class="fa-${added ? "solid" : "regular"} fa-heart"></i>
      <span>${added ? "Saved" : "Save"}</span>`;
  });

  updateQty();
}


if (currentUser) {
  showProduct();
}
