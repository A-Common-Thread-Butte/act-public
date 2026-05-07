// Paste the Apps Script /exec URL here after deploying (see apps-script/SETUP.md).
const FORM_ENDPOINT = "REPLACE_WITH_APPS_SCRIPT_EXEC_URL";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const form = document.getElementById("signup");
  if (!form) return;

  const input = form.querySelector('input[name="email"]');
  const button = form.querySelector('button[type="submit"]');
  const status = document.getElementById("signup-status");

  function setStatus(state, message) {
    status.dataset.state = state;
    status.textContent = message;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = (input.value || "").trim();

    if (!EMAIL_RE.test(email)) {
      setStatus("error", "That email doesn't look right. Mind checking it?");
      input.focus();
      return;
    }

    if (FORM_ENDPOINT === "REPLACE_WITH_APPS_SCRIPT_EXEC_URL") {
      setStatus("error", "Form isn't connected yet. Check back soon.");
      return;
    }

    button.disabled = true;
    setStatus("", "Sending…");

    const body = new URLSearchParams({
      email,
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
      done.textContent = "Thanks. We’ll be in touch when we launch.";
      form.replaceWith(done);
    } catch (err) {
      button.disabled = false;
      setStatus("error", "Something went wrong on our end. Try again in a moment?");
    }
  });
})();
