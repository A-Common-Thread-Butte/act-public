// A Common Thread — landing page signup endpoint.
// Deploy as a Web App: Execute as = Me, Who has access = Anyone.
// See SETUP.md for step-by-step instructions.

const SHEET_NAME = "Signups";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const params = (e && e.parameter) || {};
    const email = String(params.email || "").trim();
    const source = String(params.source || "landing").trim().slice(0, 64);
    const userAgent = String(params.user_agent || "").slice(0, 500);

    if (!EMAIL_RE.test(email)) {
      return json({ ok: false, error: "invalid_email" });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.getSheets()[0];

    sheet.appendRow([new Date().toISOString(), email, source, userAgent]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: "server_error" });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function doGet() {
  // Intentionally minimal — never expose sheet contents through the web app.
  return json({ ok: true });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
