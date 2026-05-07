// Paste the Apps Script /exec URL here after deploying (see apps-script/SETUP.md).
const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycby8ql6nhlFDtke9lkEdAzdTHoobrFmk38x5ugeOb4AbNO2DYpkb3RczsGWv4ImPNWu4/exec";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const form = document.getElementById("signup");
  if (!form) return;

  const firstNameInput = form.querySelector('input[name="first_name"]');
  const lastNameInput = form.querySelector('input[name="last_name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const businessInput = form.querySelector('input[name="business"]');
  const websiteInput = form.querySelector('input[name="website"]');
  const button = form.querySelector('button[type="submit"]');
  const status = document.getElementById("signup-status");

  function setStatus(state, message) {
    status.dataset.state = state;
    status.textContent = message;
  }

  function normalizeWebsite(value) {
    if (!value) return "";
    return /^https?:\/\//i.test(value) ? value : `https://${value}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const firstName = (firstNameInput.value || "").trim();
    const lastName = (lastNameInput.value || "").trim();
    const email = (emailInput.value || "").trim();
    const business = (businessInput.value || "").trim();
    const website = normalizeWebsite((websiteInput.value || "").trim());

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

    if (FORM_ENDPOINT === "REPLACE_WITH_APPS_SCRIPT_EXEC_URL") {
      setStatus("error", "Form isn't connected yet. Check back soon.");
      return;
    }

    button.disabled = true;
    setStatus("", "Sending…");

    const body = new URLSearchParams({
      first_name: firstName,
      last_name: lastName,
      email,
      business,
      website,
      source: "landing",
      user_agent: navigator.userAgent || "",
    });

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok !== true) throw new Error(data.error || "submit_failed");

      const done = document.createElement("p");
      done.className = "signup--done";
      done.textContent = data.status === "already_subscribed"
        ? "You’re already on the list — thanks!"
        : "Thanks. We’ll be in touch when we launch.";
      form.replaceWith(done);
    } catch (err) {
      button.disabled = false;
      setStatus("error", "Something went wrong on our end. Try again in a moment?");
    }
  });
})();
