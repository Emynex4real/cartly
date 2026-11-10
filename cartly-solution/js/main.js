// =========================================================
// MAIN.JS
// Used on the public pages: Home, About and Contact.
// =========================================================

// ---------- 1. Mobile menu (hamburger) ----------
const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

navToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("show-menu");

  // Swap the icon between "bars" and "X"
  const icon = navToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});


// ---------- 2. If the user is logged in, show "Dashboard" instead of Login / Sign up ----------
if (getCurrentUser()) {
  document.querySelectorAll(".auth-links").forEach((box) => {
    box.innerHTML = `<a href="dashboard.html" class="btn">
      <i class="fa-solid fa-gauge"></i> My Dashboard
    </a>`;
  });
}


// ---------- 3. Footer year ----------
document.querySelector("#year").textContent = new Date().getFullYear();


// ---------- 4. Newsletter form (Home page only) ----------
const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  const newsletterMessage = document.querySelector(".newsletter-message");

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = newsletterForm.email.value.trim();

    if (!isValidEmail(email)) {
      newsletterMessage.textContent = "Please enter a valid email address.";
      return;
    }

    newsletterMessage.textContent = `Thank you! Deals will be sent to ${email}.`;
    newsletterForm.reset();
  });
}


// ---------- 5. Featured products (Home page only) ----------
const featuredGrid = document.querySelector("#featured-products");

async function showFeaturedProducts() {
  const products = await getProducts();

  // filter() keeps only the products where featured is true
  const featured = products.filter((product) => product.featured);

  // map() turns every product into HTML, join("") glues it together
  featuredGrid.innerHTML = featured
    .map((product) => createProductCard(product, false))
    .join("");
}

if (featuredGrid) {
  showFeaturedProducts();
}
