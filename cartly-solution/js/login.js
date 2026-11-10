// =========================================================
// LOGIN.JS - check the email & password against saved users
// =========================================================

// If someone is already logged in, send them straight to the dashboard
if (getCurrentUser()) {
  window.location.href = "dashboard.html";
}

setupPasswordToggles();

// ---------- 1. Grab the elements ----------
const loginForm = document.querySelector("#login-form");
const loginAlert = document.querySelector("#login-alert");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");


// ---------- 2. Submit ----------
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loginAlert.className = "alert"; // hide any old message

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  // Simple "is it empty?" checks first
  setError(emailInput, email === "" ? "Please enter your email" : "");
  setError(passwordInput, password === "" ? "Please enter your password" : "");

  if (email === "" || password === "") return;

  // find() gives back the FIRST user that matches, or undefined
  const user = getUsers().find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    loginAlert.textContent = "Incorrect email or password.";
    loginAlert.className = "alert alert-error show";
    return;
  }

  localStorage.setItem("currentUserId", user.id);

  loginAlert.textContent = `Welcome back, ${user.fullName}! Redirecting...`;
  loginAlert.className = "alert alert-success show";

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1000);
});
