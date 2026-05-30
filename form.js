const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykoakbz";

(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const form = document.getElementById("signup");
  if (!form) return;

  const firstNameInput = form.querySelector('input[name="first_name"]');
  const lastNameInput = form.querySelector('input[name="last_name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const websiteInput = form.querySelector('input[name="website"]');
  const submitBtn = form.querySelector('button[type="submit"]');
  const status = document.getElementById("signup-status");

  function setStatus(state, message) {
    status.dataset.state = state;
    status.textContent = message;
  }

  function normalizeWebsite(value) {
    if (!value) return "";
    return /^https?:\/\//i.test(value) ? value : `https://${value}`;
  }

  function showDone() {
    const done = document.createElement("p");
    done.className = "signup--done";
    done.textContent = "You’re on the list — welcome aboard!";
    form.replaceWith(done);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const firstName = (firstNameInput.value || "").trim();
    const lastName = (lastNameInput.value || "").trim();
    const email = (emailInput.value || "").trim();
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

    submitBtn.disabled = true;
    setStatus("", "Sending…");

    const formData = new FormData(form);
    if (website) formData.set("website", website);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        showDone();
        return;
      }

      const data = await response.json().catch(() => null);
      const message =
        (data && Array.isArray(data.errors) && data.errors[0] && data.errors[0].message) ||
        "Something went wrong. Please try again.";
      setStatus("error", message);
      submitBtn.disabled = false;
    } catch (_err) {
      setStatus("error", "Couldn't connect. Please try again in a moment.");
      submitBtn.disabled = false;
    }
  });
})();
