# Cartly: Teacher Guide

This is for you, not the students. It explains what's in this folder, what to hand out,
a suggested schedule and a marking rubric.

---

## What's in this folder

```
frontend project/
├── TEACHER-GUIDE.md      ← this file
├── cartly-starter/       ← GIVE THIS TO STUDENTS (zip it)
│   ├── README.md         ← the full project brief (everything on one page)
│   ├── design/           ← 12 desktop + 12 mobile designs + 7 active states
│   ├── data/products.json
│   └── images/           ← logo, favicon, hero/about/contact/auth photos, avatars, 24 products
└── cartly-solution/      ← YOUR reference solution (don't share until after marking)
    ├── 12 HTML pages
    ├── css/style.css, css/dashboard.css
    ├── js/helpers.js + one file per page
    ├── data/, images/    ← copies of the starter assets
```

Run the solution with **Live Server** from inside `cartly-solution/` (open `index.html`).
To see the dashboard, sign up with any email. Everything is saved in your browser's localStorage.
To reset, open DevTools → Application → Local Storage and clear it.

---

## How it fits what they've learned

The JavaScript stays within what's in `web development/`: functions, DOM, events, form
validation (like `form.js`), `map` / `filter` / `reduce` / `find` / `some` / `sort` / `slice`
(array-methods-class), and `fetch` + `async/await` + `try/catch` (fetch-api-class).
The accordion, modal, sidebar and nav toggle match the `practice/` projects
(questions, modal, side-bar, nav-bar).

A few things are **new on purpose**, and the brief lists them under "Things to research":
`localStorage` + `JSON`, `URLSearchParams`, `new Set()`, object spread, `closest()` / `dataset`
(event delegation), `toLocaleString`, `localeCompare` and `confirm()`.
It's worth giving a 20-minute intro to **localStorage + JSON** before week 2, since
everything in the dashboard depends on it.

---

## Suggested schedule (4 weeks)

| Week | Students build | Check-in |
|---|---|---|
| 1 | Setup, CSS variables, navbar, footer, Home, About, Contact (HTML + CSS, responsive) | Landing pages match the designs on desktop and mobile |
| 2 | Landing-page JS (menu, accordion, contact validation, featured products with fetch), Sign up, Log in | Can sign up, log in, and see a "logged in" state |
| 3 | Dashboard layout + page guard, Shop (search / filter / sort), product cards, product page, cart, wishlist | Cart badge updates; search + filter + sort work together |
| 4 | Cart totals + checkout, Orders + modal, Overview stats, Profile, polish, deploy to GitHub Pages | Live link + GitHub repo submitted |

For a shorter course, make **Wishlist** and **Profile → Delete account / Change password** optional.

---

## Marking rubric (100 marks)

| Area | Marks | What to look for |
|---|---|---|
| **Design accuracy** | 15 | Matches the designs: colours, font, spacing, images and icons in the right places |
| **Responsive** | 10 | Works at 375px and 1440px, hamburger menu, slide-in sidebar, no sideways scroll |
| **Landing pages** | 10 | Home, About, Contact complete; contact validation; FAQ accordion; featured products from fetch |
| **Auth** | 15 | Sign up validation, duplicate email check, login with find(), redirects, page protection, logout |
| **Shop** | 15 | Cards built from data; search, category and sort work **together**; out-of-stock handling; URL category |
| **Cart & checkout** | 15 | Qty limits, remove / clear, correct subtotal / VAT / delivery / total, checkout creates an order |
| **Orders, wishlist, overview, profile** | 10 | Tabs + modal + status change; wishlist toggle; stats correct; profile updates |
| **Code quality** | 10 | Clear names, no copy-paste of the same logic everywhere (shared helpers), comments, indentation, no console errors |

**Quick test script for marking (about 5 minutes per student):**

1. Open at 375px: menu opens, no sideways scroll.
2. Open `dashboard.html` while logged out → should go to login.
3. Sign up with wrong data (see errors), then correctly → dashboard.
4. Shop: Beauty + type "parfum" + sort high → low. You should see Noir (₦150,000) then Bloom.
5. Add 2 × Wireless Earbuds + 1 × Red Lipstick → cart total must be **₦191,888**.
6. Try to add Mini Tablet (out of stock) → must be blocked.
7. Checkout → order CT-1001 appears; open the modal; cancel it → Total spent goes back to ₦0.
8. Log out, sign up a second user → cart and orders must be empty (data is per user).

---

## Common mistakes to watch for

- Opening the HTML with `file://` → `fetch` fails. They must use Live Server.
- Saving to localStorage without `JSON.stringify` (they get `"[object Object]"`).
- Sorting the original products array, so "Featured" order is lost. Use `[...products].sort()`.
- Forgetting `Number()` when reading ids from `dataset` or the URL. `"3" === 3` is false.
- Adding listeners to cards **before** the cards exist. Use event delegation on the grid.
- One global cart for everybody instead of a cart **per user**.
- Typing product cards straight into the HTML instead of building them with JavaScript.

---

## Assets and credits

- Product photos come from DummyJSON (made for test projects). A few show real brand
  labels (e.g. the perfume bottles, the body wash). That's fine for a classroom project; the
  product names in the data are generic.
- Lifestyle photos are from Unsplash (free licence); portraits are from randomuser.me.
- Icons: Font Awesome 6 free (CDN). Font: Poppins (Google Fonts).
- Both CDNs need internet. If your lab is offline, download Font Awesome and Poppins and link
  them locally.
