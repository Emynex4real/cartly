// =========================================================
// CONTACT.JS - contact form validation + FAQ accordion
// =========================================================

// ---------- 1. Grab the elements ----------
const contactForm = document.querySelector("#contact-form");
const successAlert = document.querySelector("#contact-success");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const subjectInput = document.querySelector("#subject");
const messageInput = document.querySelector("#message");


// ---------- 2. Validate on submit ----------
// (setError() lives in helpers.js)
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let isFormValid = true;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value;
  const message = messageInput.value.trim();

  if (name === "") {
    setError(nameInput, "Please enter your name");
    isFormValid = false;
  } else {
    setError(nameInput, "");
  }

  if (!isValidEmail(email)) {
    setError(emailInput, "Please enter a valid email");
    isFormValid = false;
  } else {
    setError(emailInput, "");
  }

  if (subject === "") {
    setError(subjectInput, "Please choose a subject");
    isFormValid = false;
  } else {
    setError(subjectInput, "");
  }

  if (message.length < 10) {
    setError(messageInput, "Message must be at least 10 characters");
    isFormValid = false;
  } else {
    setError(messageInput, "");
  }

  if (isFormValid) {
    successAlert.classList.add("show");
    contactForm.reset();

    // hide the success message after 4 seconds
    setTimeout(() => successAlert.classList.remove("show"), 4000);
  }
});


// ---------- 3. FAQ accordion ----------
const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  const question = faq.querySelector(".faq-question");

  question.addEventListener("click", () => {
    // close every other FAQ first, so only one is open at a time
    faqs.forEach((item) => {
      if (item !== faq) item.classList.remove("open");
    });

    faq.classList.toggle("open");
  });
});
