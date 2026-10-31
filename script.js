// CityCare Hospital - front-end interactions

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {
  menuBtn.addEventListener("click", () => {
    const open = navbar.classList.toggle("active");
    menuBtn.textContent = open ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  navbar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
      menuBtn.textContent = "☰";
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Appointment date: past dates disabled
const dateInput = document.getElementById("appointment-date");

if (dateInput) {
  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  ).toISOString().slice(0, 10);

  dateInput.min = localDate;
}

// Appointment form validation
const form = document.getElementById("appointment-form");
const message = document.getElementById("form-message");

if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const phone = form.elements.phone.value.trim();

    if (!/^[0-9]{10}$/.test(phone)) {
      message.textContent =
        "Please enter a valid 10-digit mobile number.";

      message.style.color = "#b42318";
      form.elements.phone.focus();
      return;
    }

    message.textContent =
      "Thank you! Your enquiry form is complete. This demo does not send or store bookings. Please call the hospital to confirm.";

    message.style.color = "#167b78";

    form.reset();

    if (dateInput) {
      const today = new Date();

      dateInput.min = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
      ).toISOString().slice(0, 10);
    }
  });
}

// Automatic current year in footer
const year = document.getElementById("current-year");

if (year) {
  year.textContent = new Date().getFullYear();
}