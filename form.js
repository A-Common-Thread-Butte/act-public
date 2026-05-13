const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const form = document.getElementById("signup");
  if (!form) return;

  const firstNameInput = form.querySelector('input[name="first_name"]');
  const lastNameInput = form.querySelector('input[name="last_name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const websiteInput = form.querySelector('input[name="website"]');
  const status = document.getElementById("signup-status");

  function setStatus(state, message) {
    status.dataset.state = state;
    status.textContent = message;
  }

  function normalizeWebsite(value) {
    if (!value) return "";
    return /^https?:\/\//i.test(value) ? value : `https://${value}`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = (firstNameInput.value || "").trim();
    const lastName = (lastNameInput.value || "").trim();
    const email = (emailInput.value || "").trim();
    // website is normalized for the future backend; currently unused.
    normalizeWebsite((websiteInput.value || "").trim());

    if (!firstName) {
      setStatus("error", "Please add your first name.");
      firstNameInput.focus();
      return;
    }

    if (!lastName) {
      setStatus("error", "Please add your last name.");
      lastNameInput.focus();
      return;
    }

    if (!EMAIL_RE.test(email)) {
      setStatus("error", "That email doesn't look right. Mind checking it?");
      emailInput.focus();
      return;
    }

    // TODO: send the form data to the new data-collection backend here.
    // The signup is currently a no-op — we only show the thank-you state.

    const done = document.createElement("p");
    done.className = "signup--done";
    done.textContent = "Thanks. We’ll be in touch when we launch.";
    form.replaceWith(done);
  });
})();
