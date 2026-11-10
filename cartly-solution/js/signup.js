// =========================================================
// SIGNUP.JS - create a new account and save it in localStorage
// =========================================================

// If someone is already logged in, send them straight to the dashboard
if (getCurrentUser()) {
  window.location.href = "dashboard.html";
}

setupPasswordToggles();

// ---------- 1. Grab the elements ----------
const signupForm = document.querySelector("#signup-form");
const signupAlert = document.querySelector("#signup-alert");

const fullNameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirmPassword");
const termsInput = document.querySelector("#terms");


// ---------- 2. Validate the form ----------
function validateSignup() {
  let isFormValid = true;

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmInput.value;

  if (fullName.length < 3) {
    setError(fullNameInput, "Please enter your full name");
    isFormValid = false;
  } else {
    setError(fullNameInput, "");
  }

  if (!isValidEmail(email)) {
    setError(emailInput, "Please enter a valid email");
    isFormValid = false;
  } else {
    setError(emailInput, "");
  }

  if (password.length < 6) {
    setError(passwordInput, "Password must be at least 6 characters");
    isFormValid = false;
  } else {
    setError(passwordInput, "");
  }

  if (confirmPassword !== password || confirmPassword === "") {
    setError(confirmInput, "Passwords do not match");
    isFormValid = false;
  } else {
    setError(confirmInput, "");
  }

  if (!termsInput.checked) {
    setError(termsInput, "You must accept the terms");
    isFormValid = false;
  } else {
    setError(termsInput, "");
  }

  return isFormValid;
}


// ---------- 3. Submit ----------
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  signupAlert.classList.remove("show");

  if (!validateSignup()) return;

  const users = getUsers();
  const email = emailInput.value.trim().toLowerCase();

  // some() answers a yes / no question: "does ANY user already have this email?"
  const emailTaken = users.some((user) => user.email === email);

  if (emailTaken) {
    signupAlert.textContent = "An account with this email already exists.";
    signupAlert.classList.add("show");
    return;
  }

  // Build the new user object
  const newUser = {
    id: Date.now(), // a quick way to get a unique number
    fullName: fullNameInput.value.trim(),
    email: email,
    password: passwordInput.value,
    phone: "",
    address: "",
    createdAt: new Date().toISOString(),
    cart: [],
    wishlist: [],
    orders: [],
  };

  users.push(newUser);
  saveUsers(users);

  // Log them in straight away and go to the dashboard
  localStorage.setItem("currentUserId", newUser.id);
  window.location.href = "dashboard.html";
});
