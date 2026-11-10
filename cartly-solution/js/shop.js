// =========================================================
// SHOP.JS - search, filter by category and sort products
// =========================================================

// ---------- 1. Grab the elements ----------
const searchInput = document.querySelector("#search");
const sortSelect = document.querySelector("#sort");
const categoryBox = document.querySelector("#category-buttons");
const resultsText = document.querySelector("#results-text");
const productsGrid = document.querySelector("#products");

// ---------- 2. Page "state" (what the user has chosen) ----------
let allProducts = [];
let activeCategory = "all";


// ---------- 3. Make the category buttons from the data ----------
function showCategoryButtons() {
  // map() gets every category, new Set() removes duplicates
  const categories = ["all", ...new Set(allProducts.map((product) => product.category))];

  categoryBox.innerHTML = categories
    .map(
      (category) => `
      <button class="category-btn ${category === activeCategory ? "active" : ""}" data-category="${category}">
        ${capitalize(category)}
      </button>`
    )
    .join("");
}


// ---------- 4. Filter + sort + show the products ----------
function showProducts() {
  const searchText = searchInput.value.trim().toLowerCase();
  const sortBy = sortSelect.value;

  // Step A: filter by category
  let results = allProducts.filter(
    (product) => activeCategory === "all" || product.category === activeCategory
  );

  // Step B: filter by search text
  results = results.filter((product) =>
    product.name.toLowerCase().includes(searchText)
  );

  // Step C: sort (on a copy, so allProducts stays in its original order)
  results = [...results];

  if (sortBy === "price-low") {
    results.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    results.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name") {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "rating") {
    results.sort((a, b) => b.rating - a.rating);
  }

  // Step D: show them
  resultsText.textContent = `Showing ${results.length} of ${allProducts.length} products`;

  if (results.length === 0) {
    productsGrid.innerHTML = `
      <div class="card empty-state" style="grid-column: 1 / -1">
        <i class="fa-solid fa-magnifying-glass"></i>
        <h3>No products found</h3>
        <p>Try a different search word or category.</p>
      </div>`;
    return;
  }

  productsGrid.innerHTML = results.map((product) => createProductCard(product)).join("");
}


// ---------- 5. Event listeners ----------
searchInput.addEventListener("input", showProducts);
sortSelect.addEventListener("change", showProducts);

categoryBox.addEventListener("click", (event) => {
  const button = event.target.closest(".category-btn");
  if (!button) return;

  activeCategory = button.dataset.category;
  showCategoryButtons(); // redraw so the right button is green
  showProducts();
});

handleProductButtons(productsGrid);


// ---------- 6. Start ----------
async function startShop() {
  productsGrid.innerHTML = `<p class="results-text">Loading products...</p>`;
  allProducts = await getProducts();

  // Allow links like shop.html?category=fashion
  const params = new URLSearchParams(window.location.search);
  activeCategory = params.get("category") || "all";

  showCategoryButtons();
  showProducts();
}

if (currentUser) {
  startShop();
}
