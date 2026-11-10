# Cartly: Online Shopping Website (Final Frontend Project)

Build **Cartly**, an online store where people can browse products, sign up, log in and
shop from their own dashboard.

You will use **HTML, CSS and JavaScript only**. There is no backend. Everything a user does
(signing up, adding to cart, placing orders) is saved in the browser with `localStorage`.

Everything you need is in this folder and on this page: designs, images, product data,
colours, fonts, icons and the full list of features. Read the whole page once before you
start coding.

---

## Table of contents

1. [What's in this folder](#1-whats-in-this-folder)
2. [How to run your project](#2-how-to-run-your-project)
3. [The pages you will build](#3-the-pages-you-will-build)
4. [Page-by-page requirements](#4-page-by-page-requirements)
5. [The data](#5-the-data)
6. [Shop rules (money, stock, orders)](#6-shop-rules-money-stock-orders)
7. [JavaScript you must use](#7-javascript-you-must-use)
8. [Style guide](#8-style-guide)
9. [Which image goes where](#9-which-image-goes-where)
10. [Which icon goes where](#10-which-icon-goes-where)
11. [Things to research](#11-things-to-research)
12. [Suggested build order](#12-suggested-build-order)
13. [Final checklist](#13-final-checklist)
14. [Bonus challenges](#14-bonus-challenges)
15. [Credits](#15-credits)

---

## 1. What's in this folder

```
cartly-starter/
├── README.md                ← this page (your project brief)
├── data/
│   └── products.json        ← 24 products (load them with fetch)
├── design/
│   ├── desktop-*.jpg        ← every page at 1440px wide
│   ├── mobile-*.jpg         ← every page at 375px wide
│   └── active-states/       ← open menus, error messages, modal, empty cart...
└── images/
    ├── logo-mark.svg        ← the logo icon
    ├── favicon.svg          ← the browser tab icon
    ├── hero.jpg, about-*.jpg, contact-support.jpg, auth-*.jpg
    ├── avatars/             ← team members and customer photos
    └── products/            ← 24 product photos (.webp)
```

**Create your own files next to these.** We suggest:

```
index.html  about.html  contact.html  signup.html  login.html
dashboard.html  shop.html  product.html  cart.html  wishlist.html  orders.html  profile.html
css/style.css        ← shared styles (landing pages + auth pages)
css/dashboard.css    ← dashboard-only styles
js/helpers.js        ← functions many pages share (getProducts, formatPrice, getCurrentUser...)
js/...               ← one JS file per page (shop.js, cart.js, ...)
```

Keep every HTML file in the **same folder** (no sub-folders for pages). That way every page
can use the same paths like `images/hero.jpg` and `data/products.json`.

> **Tip:** open the designs side by side with your code. Match the layout, spacing and
> colours as closely as you can. They don't need to be pixel-perfect.

---

## 2. How to run your project

Open the folder in VS Code and use **Live Server** (right-click `index.html` → *Open with Live Server*).

> **Why?** `fetch("data/products.json")` does **not** work if you double-click the HTML file
> (the address starts with `file://`). It only works through a server, such as Live Server
> (the address starts with `http://`).

---

## 3. The pages you will build

There are **12 pages** in 3 groups.

| Group | Page | File | Design |
|---|---|---|---|
| **Landing pages** (anyone can visit) | Home | `index.html` | `desktop-home.jpg` |
| | About | `about.html` | `desktop-about.jpg` |
| | Contact | `contact.html` | `desktop-contact.jpg` |
| **Auth pages** | Sign up | `signup.html` | `desktop-signup.jpg` |
| | Log in | `login.html` | `desktop-login.jpg` |
| **Dashboard** (must be logged in) | Overview | `dashboard.html` | `desktop-dashboard-overview.jpg` |
| | Shop | `shop.html` | `desktop-dashboard-shop.jpg` |
| | Product details | `product.html?id=3` | `desktop-dashboard-product.jpg` |
| | Cart | `cart.html` | `desktop-dashboard-cart.jpg` |
| | Wishlist | `wishlist.html` | `desktop-dashboard-wishlist.jpg` |
| | Orders | `orders.html` | `desktop-dashboard-orders.jpg` |
| | Profile | `profile.html` | `desktop-dashboard-profile.jpg` |

Each page also has a `mobile-*.jpg` design.

**How a user moves through the site:**

```
Home / About / Contact ──► Sign up ──► Dashboard (Overview)
                         ► Log in  ──►    ├── Shop ──► Product details
                                          ├── Cart ──► Checkout ──► Orders
                                          ├── Wishlist
                                          ├── Orders
                                          └── Profile ──► Log out ──► Log in page
```

---

## 4. Page-by-page requirements

### Every landing page (Home, About, Contact)

- [ ] **Navbar** with the logo, links (Home, About, Contact) and **Log in** / **Sign up** buttons.
      The link for the current page is green.
- [ ] On screens **900px or smaller**, the links are hidden and a **hamburger button** (☰) shows.
      Clicking it opens and closes the menu, and the icon changes to an **X**.
      See `active-states/mobile-menu-open.jpg`.
- [ ] If the user is **already logged in**, replace Log in / Sign up with a **My Dashboard** button.
- [ ] **Footer** with logo, short text, social icons, two link columns and contact details.
      The year in `© 2026 Cartly` must come from JavaScript (`new Date().getFullYear()`).

### Home (`index.html`)

- [ ] **Hero**: tag, big heading, text, two buttons, three stats, hero image with a small
      "Free delivery" card on top of it.
- [ ] **Shop by category**: 4 cards. Each card links to `shop.html?category=electronics`
      (or `fashion`, `home`, `beauty`).
- [ ] **Featured products**: load `products.json` with `fetch`, then use `filter()` to keep
      only products where `featured` is `true` and show them as cards. **Don't type these
      cards in HTML. Build them with JavaScript.**
- [ ] **Why shop with Cartly?**: 4 features with icons.
- [ ] **Testimonials**: 3 customer cards with stars, text, photo, name and city.
- [ ] **Newsletter**: email input + Subscribe button. Check the email is valid.
      Show an error message or a thank-you message under the form.

### About (`about.html`)

- [ ] Page header with breadcrumb (`Home / About`).
- [ ] "Our story" section: image left, text right with a check list.
- [ ] "What drives us": 3 cards (Mission, Vision, Values).
- [ ] Dark stats band with 4 numbers.
- [ ] "How we work": text left, image right.
- [ ] "Meet the team": 4 team cards with photo, name, role and social icons.
- [ ] Green call-to-action box with a button to Sign up.

### Contact (`contact.html`)

- [ ] Page header with breadcrumb.
- [ ] 4 info cards (address, phone, email, opening hours).
- [ ] Contact form: full name, email, subject (dropdown), message.
  - Name must not be empty.
  - Email must be valid.
  - A subject must be chosen.
  - Message must be at least 10 characters.
  - Show each error in red **under its input** and give the input a red border.
  - If everything is OK, show a green success message and clear the form.
- [ ] **FAQ accordion**: 4 questions. Clicking a question opens its answer and closes the
      others. The **+** icon rotates into an **x**. See `active-states/desktop-faq-open.jpg`.

### Sign up (`signup.html`)

- [ ] Two halves: image on the left, form on the right. On mobile the image is hidden.
- [ ] Fields: full name, email, password, confirm password, "I agree to the Terms" checkbox.
- [ ] **Eye icon** inside each password box to show / hide the password.
- [ ] Validation (errors under each input, see `active-states/desktop-signup-errors.jpg`):
  - Full name: at least 3 characters
  - Email: valid format
  - Password: at least 6 characters
  - Confirm password: must match
  - Terms must be ticked
- [ ] If the email is **already used** by another user, show "An account with this email already exists."
      (use `some()`).
- [ ] If all is good: save the new user (see [section 5](#5-the-data)), log them in and go to `dashboard.html`.
- [ ] If someone who is already logged in opens this page, send them to the dashboard.

### Log in (`login.html`)

- [ ] Same layout as Sign up.
- [ ] Email + password (with eye icon). Show an error if a box is empty.
- [ ] Use `find()` to look for a user with that email **and** password.
  - Not found → red message "Incorrect email or password."
  - Found → save their id as the current user, show a green "Welcome back" message, then go
    to the dashboard after 1 second (`setTimeout`).

### Every dashboard page

- [ ] **Protected**: if nobody is logged in, send the visitor to `login.html` straight away.
- [ ] **Sidebar** (left): logo, links with icons (Overview, Shop, Cart, Wishlist, Orders,
      Profile) and **Log out** at the bottom. The current page's link is highlighted.
- [ ] **Top bar**: page title, wishlist icon and cart icon, each with a **red number badge**,
      and the user's **initials** in a green circle plus their name ("Ada Obi" → "AO").
- [ ] The badges must update straight away when something is added or removed.
- [ ] **Log out** asks "Are you sure?" (`confirm()`), then logs the user out and goes to the login page.
- [ ] On screens **900px or smaller**, the sidebar is hidden. The ☰ button slides it in from the left
      with a dark overlay behind it. Clicking the overlay or the X closes it.
      See `active-states/mobile-sidebar-open.jpg`.
- [ ] Clicking **Add to cart** or the **heart** shows a small pop-up message at the bottom
      ("Added to cart") that disappears after 2 seconds.

### Overview (`dashboard.html`)

- [ ] Green welcome banner: "Welcome back, **Ada**!" (first name only) and today's date.
- [ ] 4 stat cards: **Total orders**, **Total spent** (don't count cancelled orders),
      **Items in cart**, **Wishlist** count.
- [ ] **Recent orders**: a table of the newest 3 orders. If there are none, show an empty
      message with a "Start shopping" button.
- [ ] **Top rated**: the 4 products with the highest rating.
- [ ] **Popular right now**: the 4 in-stock products with the most reviews, as product cards.

### Shop (`shop.html`)

- [ ] Search box: filters products **as you type** (by name, not case-sensitive).
- [ ] Sort dropdown: Featured (original order), Price low → high, Price high → low, Name A → Z, Top rated.
- [ ] Category buttons: **All**, Electronics, Fashion, Home, Beauty. **Build them from the data**,
      not by hand. The active one is green.
- [ ] Search, category and sort must **work together** (e.g. Beauty + "parfum" + price high → low).
- [ ] "Showing 6 of 24 products" text.
- [ ] If nothing matches, show a "No products found" message.
- [ ] If the URL is `shop.html?category=fashion`, start with Fashion selected.
- [ ] **Product card**: image, heart button, category, name, star rating + number of reviews,
      price, and a cart button.
  - Products with `stock: 0` show an **"Out of stock"** badge and a grey, disabled cart button.
  - A filled red heart means the product is in the wishlist.
  - Clicking the image or name opens `product.html?id=THE_ID`.

### Product details (`product.html?id=7`)

- [ ] Read the `id` from the URL and use `find()` to get the product.
- [ ] Show the big image, category, name, stars, price, description and stock
      ("In stock (18 left)" in green or "Out of stock" in red).
- [ ] Quantity control (− 1 +). It can't go below 1 or above the stock.
- [ ] **Add to cart** adds the chosen quantity. **Save** / **Saved** toggles the wishlist.
- [ ] **You may also like**: up to 4 other products from the **same category**.
- [ ] If the id doesn't exist (e.g. `?id=999`), show a "Product not found" message.

### Cart (`cart.html`)

- [ ] Each cart line: image, name, price each, quantity control, line total, trash button.
- [ ] Quantity can't go below 1 or above the stock.
- [ ] **Clear cart** button (ask first with `confirm()`).
- [ ] **Order summary**: Subtotal, VAT (7.5%), Delivery, Total (see [section 6](#6-shop-rules-money-stock-orders)).
- [ ] A note under the total: "Add ₦X more to get free delivery." or "You get free delivery on this order!"
- [ ] **Checkout** asks for confirmation, then turns the cart into a new **order**, empties the
      cart and goes to the Orders page.
- [ ] Empty cart → show the empty message (`active-states/desktop-cart-empty.jpg`).

### Wishlist (`wishlist.html`)

- [ ] Show every saved product as a product card. "You have 4 saved items".
- [ ] Clicking the heart removes the product from the page straight away.
- [ ] **Add all to cart** button adds every **in-stock** wishlist item that is not already in the cart.
- [ ] Empty wishlist → show an empty message.

### Orders (`orders.html`)

- [ ] Tabs: **All (3)**, **Processing (1)**, **Delivered (1)**, **Cancelled (1)** with live counts.
- [ ] Table: Order ID, Date, Number of items, Total, coloured Status badge, **View** button.
- [ ] **View** opens a **modal** with the items, the money summary and, for *processing*
      orders only, two buttons: **Mark as received** (→ delivered) and **Cancel order** (→ cancelled).
- [ ] The modal closes with the X or by clicking the dark background.
      See `active-states/desktop-order-modal.jpg`.

### Profile (`profile.html`)

- [ ] Left card: big initials, name, email, phone, address, "Joined 9 Nov 2026",
      and a red **Delete account** button.
- [ ] **Personal information** form: full name, email (disabled, can't be changed), phone, address.
  - Name at least 3 characters. Phone is optional, but if typed it must be 11 digits.
  - After saving, the new name shows everywhere (top bar, profile card).
- [ ] **Change password** form: current password, new password, confirm new password.
  - Current password must be correct. New password at least 6 characters and must match.
- [ ] **Delete account**: confirm, remove the user from the users array (`filter()`), log out.

---

## 5. The data

### Products: `data/products.json`

There are 24 products, 6 in each category. Each one looks like this:

```json
{
  "id": 1,
  "name": "Wireless Earbuds",
  "category": "electronics",
  "price": 85000,
  "rating": 4.6,
  "reviews": 312,
  "stock": 25,
  "image": "images/products/wireless-earbuds.webp",
  "featured": true,
  "description": "Compact true-wireless earbuds with clear sound..."
}
```

- `price` is in **Naira** as a plain number. Show it as `₦85,000` using `toLocaleString()`.
- `category` is one of `electronics`, `fashion`, `home`, `beauty`.
- `stock: 0` means **out of stock** (product id 5 is out of stock, so test with it).
- **Do not change this file.** Read it with `fetch` + `async/await`:

```js
async function getProducts() {
  const response = await fetch("data/products.json");
  const products = await response.json();
  return products;
}
```

(Add `try/catch` and check `response.ok`, like we did in the fetch lessons.)

### Users: saved in `localStorage`

Use **two** keys:

| Key | What it holds |
|---|---|
| `"users"` | An **array** of every user that has signed up (saved with `JSON.stringify`) |
| `"currentUserId"` | The `id` of the user who is logged in. Remove it on log out. |

Each user object should look like this:

```js
{
  id: 1731150000000,          // Date.now() when they signed up
  fullName: "Ada Obi",
  email: "ada@mail.com",      // save it in lowercase
  password: "secret123",
  phone: "",
  address: "",
  createdAt: "2026-11-09T10:00:00.000Z",
  cart: [ { id: 1, qty: 2 }, { id: 13, qty: 1 } ],   // product id + quantity
  wishlist: [ 7, 19 ],                               // just product ids
  orders: [ /* see below */ ]
}
```

Each order (newest order goes **first** in the array):

```js
{
  id: "CT-1001",                     // CT-1001, CT-1002, CT-1003 ...
  date: "2026-11-09T10:00:00.000Z",
  status: "processing",              // "processing" | "delivered" | "cancelled"
  items: [
    { id: 15, name: "Kitchen Blender", image: "images/products/kitchen-blender.webp", price: 55000, qty: 1 }
  ],
  subtotal: 55000,
  vat: 4125,
  delivery: 0,
  total: 59125
}
```

> **Why copy the name and price into the order?** If the shop changes a price next week,
> old orders should still show what the customer actually paid.

> ⚠️ **Important:** saving passwords in `localStorage` is **only OK for learning**. Real websites
> never do this. They use a server and encrypt passwords.

Write small helper functions so you don't repeat yourself, for example:

```js
getUsers()               // read the users array from localStorage (or [] if empty)
saveUsers(users)         // write the users array to localStorage
getCurrentUser()         // find() the user whose id matches currentUserId
saveCurrentUser(user)    // put the updated user back into the users array (map) and save
```

---

## 6. Shop rules (money, stock, orders)

| Rule | Value |
|---|---|
| Currency | Naira, e.g. `₦85,000` |
| VAT | **7.5%** of the subtotal, rounded to the nearest Naira (`Math.round`) |
| Delivery fee | **₦2,500** |
| Free delivery | when the subtotal is **₦50,000 or more** |
| Total | subtotal + VAT + delivery |
| Max quantity | the product's `stock` |
| Order IDs | `"CT-" + (1001 + number of orders the user already has)` |
| New order status | `"processing"` |

**Example:** 2 × Wireless Earbuds (₦85,000) + 1 × Red Lipstick (₦8,500)

```
Subtotal  = 2 × 85,000 + 8,500 = ₦178,500
VAT       = 178,500 × 0.075   = ₦13,388 (rounded)
Delivery  = free (over ₦50,000)
Total     = ₦191,888
```

---

## 7. JavaScript you must use

This project is about **arrays** and the **DOM**. Your code must use all of these:

| JavaScript | Where you will use it |
|---|---|
| `fetch` + `async/await` + `try/catch` | Loading `products.json` |
| `map()` + `join("")` | Turning products / cart items / orders into HTML |
| `filter()` | Featured products, category filter, search, removing from cart / wishlist, deleting an account |
| `find()` | Login, product details page, finding an item in the cart |
| `some()` | "Is this email already taken?" |
| `includes()` | "Is this product in the wishlist?", search text |
| `reduce()` | Cart subtotal, cart item count, total spent |
| `sort()` (on a copy!) | Sorting by price, name and rating, top rated, popular |
| `slice()` | Newest 3 orders, top 4 products |
| `forEach()` | Adding listeners to many buttons, "Add all to cart" |
| `push()` / `unshift()` | Adding to cart / wishlist / users, adding a new order to the front |
| `addEventListener` | `click`, `submit`, `input`, `change` |
| `classList` add / remove / toggle | Menus, active buttons, errors, modal |
| Template literals | Building the HTML for cards |
| `localStorage` + `JSON` | Saving users, cart, wishlist, orders |
| `setTimeout` | Redirect after login, hiding the pop-up message |

---

## 8. Style guide

### Colours

| Name | Hex | Used for |
|---|---|---|
| Primary (green) | `#0E7C66` | Buttons, links, active items, logo |
| Primary dark | `#0A5C4C` | Button hover |
| Primary light | `#E7F4F1` | Hero background, icon circles, active sidebar link |
| Accent (orange) | `#F59E0B` | Stars, stats numbers, footer icons |
| Dark | `#1F2937` | Headings, main text, footer background |
| Grey | `#6B7280` | Paragraphs, labels |
| Light grey | `#9CA3AF` | Category labels on cards |
| Border | `#E5E7EB` | Card borders, input borders |
| Background | `#F5F7F6` | Grey sections, dashboard background, image boxes |
| White | `#FFFFFF` | Cards, navbar, sidebar |
| Error (red) | `#DC2626` | Error text, badges, delete buttons, hearts |
| Success | `#16A34A` | Success messages, "In stock" |

Status badges: **Processing** `#FEF3C7` background / `#B45309` text, **Delivered** `#DCFCE7` / `#16A34A`,
**Cancelled** `#FEE2E2` / `#DC2626`.

> **Tip:** put the colours in CSS variables at the top of your CSS:
> ```css
> :root {
>   --primary: #0e7c66;
>   --dark: #1f2937;
>   /* ... */
> }
> ```

### Font

**Poppins** from Google Fonts, weights **400, 500, 600, 700**. Put this in the `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

| Text | Size | Weight |
|---|---|---|
| Hero heading | 52px (`3.25rem`), 38px on mobile | 700 |
| Page header heading | 40px (`2.5rem`) | 700 |
| Section heading | 32px (`2rem`) | 700 |
| Card heading | 16 to 18px | 600 |
| Body text | 16px (`1rem`) | 400 |
| Small text / labels | 13 to 14px | 400 to 500 |

### Sizes and spacing

- Page content width: **max 1200px**, centred, 90% wide on small screens.
- Section padding: **80px** top and bottom (56px on mobile).
- Corner radius: buttons and inputs **8px**, cards **12px**, big images and CTA boxes **24px**.
- Card shadow (on hover): `0 4px 20px rgba(17, 24, 39, 0.06)`.
- Navbar and dashboard top bar height: **76px**. Sidebar width: **250px**.

### Breakpoints (the designs are 1440px and 375px wide)

| Screen width | What changes |
|---|---|
| ≤ 1024px | 4-column grids become 2 columns |
| ≤ 900px | Navbar links → hamburger menu; dashboard sidebar → slide-in menu |
| ≤ 768px | Two-column sections (hero, about, contact, auth) stack into one column; auth image is hidden |
| ≤ 560px | Feature, team, footer and form-row grids become 1 column |
| ≤ 420px | Product grid becomes 1 column |

**No sideways scrolling on any page at 375px.** Wide tables go inside a box with `overflow-x: auto`.

---

## 9. Which image goes where

| File | Where it goes |
|---|---|
| `images/logo-mark.svg` | Logo icon in the navbar, footer, auth pages and sidebar (next to the word **Cartly**) |
| `images/favicon.svg` | Browser tab icon: `<link rel="icon" type="image/svg+xml" href="images/favicon.svg" />` |
| `images/hero.jpg` | Home: hero image (right side) |
| `images/products/wireless-earbuds.webp` | Home: Electronics category card |
| `images/products/high-top-sneakers.webp` | Home: Fashion category card |
| `images/products/table-lamp.webp` | Home: Home category card |
| `images/products/noir-perfume.webp` | Home: Beauty category card |
| `images/avatars/customer-funmi.jpg` | Home: testimonial 1 (Funmi Adebayo, Lagos) |
| `images/avatars/customer-chidi.jpg` | Home: testimonial 2 (Chidi Okafor, Enugu) |
| `images/avatars/customer-grace.jpg` | Home: testimonial 3 (Grace Musa, Abuja) |
| `images/about-store.jpg` | About: "Our story" image |
| `images/about-warehouse.jpg` | About: "How we work" image |
| `images/about-team.jpg` | Spare image. Use it anywhere you like (e.g. a bonus "Careers" section) |
| `images/avatars/team-daniel.jpg` | About: Daniel Okon, Founder & CEO |
| `images/avatars/team-amaka.jpg` | About: Amaka Eze, Head of Operations |
| `images/avatars/team-tunde.jpg` | About: Tunde Bakare, Lead Developer |
| `images/avatars/team-zainab.jpg` | About: Zainab Bello, Customer Support Lead |
| `images/contact-support.jpg` | Contact: image next to the form |
| `images/auth-signup.jpg` | Sign up: left half |
| `images/auth-login.jpg` | Log in: left half |
| `images/products/*.webp` | Product cards, product page, cart, wishlist, order modal (the path is in `products.json`) |

The user's profile picture is **not an image**. It is their initials in a green circle, made with JavaScript.

Always write a helpful `alt` text, e.g. `alt="Woman holding shopping bags"`.

---

## 10. Which icon goes where

We use **Font Awesome 6** (free). Put this in the `<head>` of every page:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
```

Then use an icon like this: `<i class="fa-solid fa-cart-shopping"></i>`.

| Where | Icon class |
|---|---|
| Hamburger menu / close | `fa-solid fa-bars` / `fa-solid fa-xmark` |
| Arrow on "Start shopping" | `fa-solid fa-arrow-right` |
| Free delivery, fast delivery | `fa-solid fa-truck-fast` |
| Secure payment, original product | `fa-solid fa-shield-halved` |
| Easy returns | `fa-solid fa-rotate-left` |
| 24/7 support | `fa-solid fa-headset` |
| Full star / half star / empty star | `fa-solid fa-star` / `fa-solid fa-star-half-stroke` / `fa-regular fa-star` |
| Facebook / Instagram / X / LinkedIn / GitHub | `fa-brands fa-facebook-f` / `fa-brands fa-instagram` / `fa-brands fa-x-twitter` / `fa-brands fa-linkedin-in` / `fa-brands fa-github` |
| Address / phone / email / hours | `fa-solid fa-location-dot` / `fa-solid fa-phone` / `fa-solid fa-envelope` / `fa-solid fa-clock` |
| Check list ticks, success message | `fa-solid fa-circle-check` |
| Mission / Vision / Values | `fa-solid fa-bullseye` / `fa-solid fa-eye` / `fa-solid fa-handshake` |
| Send message button | `fa-solid fa-paper-plane` |
| FAQ open / close | `fa-solid fa-plus` (rotate it 45° when open) |
| Show / hide password | `fa-regular fa-eye` / `fa-regular fa-eye-slash` |
| Sidebar: Overview, Shop, Cart, Wishlist, Orders, Profile, Log out | `fa-house`, `fa-store`, `fa-cart-shopping`, `fa-heart`, `fa-box`, `fa-user`, `fa-right-from-bracket` (all `fa-solid`) |
| My Dashboard button | `fa-solid fa-gauge` |
| Wishlist heart: not saved / saved | `fa-regular fa-heart` / `fa-solid fa-heart` |
| Add to cart button | `fa-solid fa-cart-shopping` |
| Stat cards: orders, spent, cart, wishlist | `fa-solid fa-box`, `fa-solid fa-wallet`, `fa-solid fa-cart-shopping`, `fa-solid fa-heart` |
| Search box | `fa-solid fa-magnifying-glass` |
| Quantity − / + | `fa-solid fa-minus` / `fa-solid fa-plus` |
| Remove from cart / clear cart / delete account | `fa-solid fa-trash-can` / `fa-solid fa-trash` |
| Checkout | `fa-solid fa-lock` |
| Add all to cart | `fa-solid fa-cart-plus` |
| Back to shop | `fa-solid fa-arrow-left` |
| In stock / out of stock | `fa-solid fa-circle-check` / `fa-solid fa-circle-xmark` |
| Empty states | `fa-solid fa-box-open`, `fa-solid fa-cart-shopping`, `fa-regular fa-heart`, `fa-solid fa-magnifying-glass` |
| Profile details: phone, address, joined | `fa-solid fa-phone`, `fa-solid fa-location-dot`, `fa-solid fa-calendar` |

**No emojis in place of icons or images.**

---

## 11. Things to research

We haven't covered everything below in class. That's on purpose: finding answers is part of
being a developer. Look them up on **MDN** (developer.mozilla.org) or **W3Schools**.

| Topic | Search for | You need it for |
|---|---|---|
| `localStorage` | "MDN localStorage setItem getItem" | Saving users, cart, orders |
| `JSON.stringify` / `JSON.parse` | "MDN JSON.stringify" | localStorage can only save **text** |
| `URLSearchParams` | "MDN URLSearchParams get" | Reading `?id=7` and `?category=fashion` |
| `window.location.href` | "MDN window.location" | Moving to another page with JavaScript |
| `new Set()` | "MDN Set remove duplicates array" | Making the category list from the data |
| Spread on objects `{ ...obj }` | "MDN spread syntax object" | Copying a product and adding `qty` |
| `toLocaleString()` | "MDN Number toLocaleString" | `85000` → `85,000` |
| `toLocaleDateString()` | "MDN toLocaleDateString options" | `9 Nov 2026`, `Monday, 9 November 2026` |
| `localeCompare()` | "MDN localeCompare sort strings" | Sorting names A → Z |
| `element.closest()` + `data-*` attributes | "MDN closest", "MDN dataset" | Knowing **which** card button was clicked |
| Event delegation | "javascript event delegation" | One listener for many cards made by JS |
| `confirm()` | "MDN window.confirm" | "Are you sure?" pop-ups |
| Regular expression for email | "javascript validate email regex" | Checking emails |
| `position: sticky` / `fixed` | "MDN position" | Sticky navbar, fixed sidebar |
| CSS Grid `repeat()` / `aspect-ratio` / `object-fit` | "MDN grid-template-columns repeat" | Product grids and square product images |
| CSS `transform: translateX()` + `transition` | "MDN transform translateX" | Sliding sidebar |

---

## 12. Suggested build order

Don't try to build everything at once. Finish and test each step before moving on.

1. **Set up.** Create the files and folders, link the CSS, fonts and icons. Write your CSS
   variables, reset, buttons and container.
2. **Landing pages (HTML + CSS).** Navbar, footer, Home, About, Contact. Make them responsive.
3. **Landing page JavaScript.** Hamburger menu, footer year, newsletter, contact form
   validation, FAQ accordion, featured products with `fetch`.
4. **Sign up and Log in.** Validation, saving users to `localStorage`, logging in, the
   eye icon, redirects.
5. **Dashboard layout.** Sidebar, top bar, protecting pages, log out, mobile sidebar.
6. **Shop.** Product cards from the data, search, categories, sort.
7. **Cart and wishlist.** Add / remove, badges, product details page, cart page with totals.
8. **Checkout and orders.** Create orders, orders table, tabs, modal, status changes.
9. **Overview and profile.** Stats, recent orders, top rated, profile forms, delete account.
10. **Polish.** Test on mobile, fix spacing, test every empty state and error, clean up your code.

---

## 13. Final checklist

Before you submit, check every item:

- [ ] All 12 pages exist and every link works (no broken links).
- [ ] Every page looks right at **1440px** and **375px** (use DevTools device mode). No sideways scrolling.
- [ ] No errors in the browser console (F12 → Console).
- [ ] Product cards, category buttons, cart, wishlist and orders are **built with JavaScript** from data.
- [ ] Opening any dashboard page while logged out sends you to the login page.
- [ ] Sign up → log out → log in again works, and your cart, wishlist and orders are still there.
- [ ] Two different users have **separate** carts, wishlists and orders.
- [ ] Cart totals are correct (test with the example in [section 6](#6-shop-rules-money-stock-orders)).
- [ ] Out-of-stock products can't be added to the cart.
- [ ] All images have `alt` text. No emojis are used as icons.
- [ ] Your code is neat: good names, indentation, and short comments that explain each section.
- [ ] Your project is pushed to **GitHub** and live on **GitHub Pages** (or Netlify / Vercel).

---

## 14. Bonus challenges

Finished early? Try some of these:

- **Dark mode** toggle that is remembered (`localStorage`).
- **Price range filter** on the Shop page (min / max inputs).
- **Pagination**: show 8 products per page with Next / Previous buttons.
- **Password strength meter** on Sign up (weak / medium / strong).
- **Promo code** on the cart page: `CARTLY10` takes 10% off the subtotal.
- **Reduce stock** when an order is placed (hint: you'll need to save stock changes in `localStorage`).
- **Loading skeletons**: grey placeholder cards while products load.
- **Write a `README.md`** for your project with a screenshot and a link to the live site.

---

## 15. Credits

- Product photos: [DummyJSON](https://dummyjson.com) (test data for learning projects).
  Some photos show real brand labels. Cartly is a learning project and is not connected to these brands.
- Lifestyle photos: [Unsplash](https://unsplash.com) (free to use).
- Portraits: [randomuser.me](https://randomuser.me).
- Icons: [Font Awesome](https://fontawesome.com) (free). Font: [Poppins](https://fonts.google.com/specimen/Poppins).

Good luck, and have fun building!
