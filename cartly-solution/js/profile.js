// =========================================================
// PROFILE.JS - update personal info, change password, delete account
// =========================================================

const infoForm = document.querySelector("#info-form");
const infoAlert = document.querySelector("#info-alert");
const passwordForm = document.querySelector("#password-form");
const passwordAlert = document.querySelector("#password-alert");

const fullNameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const addressInput = document.querySelector("#address");

const currentPasswordInput = document.querySelector("#currentPassword");
const newPasswordInput = document.querySelector("#newPassword");
const confirmNewPasswordInput = document.querySelector("#confirmNewPassword");


// ---------- 1. Fill the page with the user's details ----------
function showProfile() {
  const user = getCurrentUser();

  document.querySelector("#profile-email").textContent = user.email;
  document.querySelector("#profile-phone").textContent = user.phone || "No phone number yet";
  document.querySelector("#profile-address").textContent = user.address || "No address yet";
  document.querySelector("#profile-joined").textContent = `Joined ${formatDate(user.createdAt)}`;

  document.querySelectorAll(".user-name").forEach((el) => (el.textContent = user.fullName));
  document.querySelectorAll(".user-initials").forEach((el) => (el.textContent = getInitials(user.fullName)));

  fullNameInput.value = user.fullName;
  emailInput.value = user.email;
  phoneInput.value = user.phone;
  addressInput.value = user.address;
}


// ---------- 2. Save personal information ----------
infoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  infoAlert.classList.remove("show");

  const fullName = fullNameInput.value.trim();
  const phone = phoneInput.value.trim();
  let isFormValid = true;

  if (fullName.length < 3) {
    setError(fullNameInput, "Please enter your full name");
    isFormValid = false;
  } else {
    setError(fullNameInput, "");
  }

  // Phone is optional, but if typed it must be 11 digits (e.g. 08012345678)
  const digits = phone.replaceAll(" ", "");
  if (phone !== "" && (digits.length !== 11 || isNaN(digits))) {
    setError(phoneInput, "Enter an 11-digit phone number");
    isFormValid = false;
  } else {
    setError(phoneInput, "");
  }

  if (!isFormValid) return;

  const user = getCurrentUser();
  user.fullName = fullName;
  user.phone = phone;
  user.address = addressInput.value.trim();
  saveCurrentUser(user);

  showProfile();
  infoAlert.classList.add("show");
});


// ---------- 3. Change password ----------
passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  passwordAlert.className = "alert";

  const user = getCurrentUser();
  const current = currentPasswordInput.value;
  const newPassword = newPasswordInput.value;
  const confirmPassword = confirmNewPasswordInput.value;
  let isFormValid = true;

  if (current !== user.password) {
    setError(currentPasswordInput, "Current password is not correct");
    isFormValid = false;
  } else {
    setError(currentPasswordInput, "");
  }

  if (newPassword.length < 6) {
    setError(newPasswordInput, "Password must be at least 6 characters");
    isFormValid = false;
  } else {
    setError(newPasswordInput, "");
  }

  if (confirmPassword !== newPassword || confirmPassword === "") {
    setError(confirmNewPasswordInput, "Passwords do not match");
    isFormValid = false;
  } else {
    setError(confirmNewPasswordInput, "");
  }

  if (!isFormValid) return;

  user.password = newPassword;
  saveCurrentUser(user);
  passwordForm.reset();

  passwordAlert.textContent = "Your password has been changed.";
  passwordAlert.className = "alert alert-success show";
});


// ---------- 4. Delete account ----------
document.querySelector("#delete-account").addEventListener("click", () => {
  const sure = confirm("This will delete your account, cart and orders. Continue?");
  if (!sure) return;

  const user = getCurrentUser();

  // keep every user EXCEPT this one
  const users = getUsers().filter((item) => item.id !== user.id);
  saveUsers(users);

  logout();
});


if (currentUser) {
  showProfile();
}
