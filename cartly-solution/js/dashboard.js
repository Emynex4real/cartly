// =========================================================
// DASHBOARD.JS
// The shared layout code for EVERY dashboard page:
//   - kick out visitors who are not logged in
//   - show the user's name and initials in the top bar
//   - open / close the sidebar on mobile
//   - log out
// Load it after helpers.js and before the page's own script.
// =========================================================

// ---------- 1. Protect the page ----------
const currentUser = getCurrentUser();

if (!currentUser) {
  // not logged in -> go to the login page
  window.location.href = "login.html";
}


// ---------- 2. Show the user's name & initials ----------
// "Ada Obi" -> "AO"
function getInitials(fullName) {
  return fullName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

if (currentUser) {
  document.querySelectorAll(".user-name").forEach((el) => {
    el.textContent = currentUser.fullName;
  });

  document.querySelectorAll(".user-initials").forEach((el) => {
    el.textContent = getInitials(currentUser.fullName);
  });

  updateBadges();
}


// ---------- 3. Sidebar open / close (mobile) ----------
const sidebar = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu-btn");
const sidebarClose = document.querySelector(".sidebar-close");
const overlay = document.querySelector(".overlay");

menuBtn.addEventListener("click", () => sidebar.classList.add("show-sidebar"));
sidebarClose.addEventListener("click", () => sidebar.classList.remove("show-sidebar"));
overlay.addEventListener("click", () => sidebar.classList.remove("show-sidebar"));


// ---------- 4. Log out ----------
document.querySelector(".logout-btn").addEventListener("click", () => {
  const sure = confirm("Are you sure you want to log out?");
  if (sure) logout();
});
