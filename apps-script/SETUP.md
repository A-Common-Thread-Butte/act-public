# Apps Script setup — landing page signups

This is the one-time setup that connects the landing page form to a private Google Sheet in your Drive.

The Sheet stays private to your account. Visitors only ever see the public `/exec` URL of the Apps Script, which writes to the Sheet on your behalf — they never have access to the Sheet itself.

## 1. Create the sheet

1. In Google Drive, create a new Google Sheet named **Landing Page Signups**.
2. Rename the first tab to **Signups**.
3. Add this header row (required — row 1, exactly these four columns in this order):

   | submitted_at | email | source | user_agent |
   |--------------|-------|--------|------------|

   The duplicate-email check reads column B starting at row 2, so the header row must be present.

4. Leave the Sheet's sharing on the default ("Restricted"). Do not set it to "Anyone with the link."

## 2. Add the script

1. From the Sheet menu, choose **Extensions → Apps Script**.
2. Delete the placeholder `Code.gs` content and paste in the contents of `Code.gs` from this folder.
3. Save the project (⌘S / Ctrl+S). Name it something like "ACT signups".

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon → choose **Web app**.
3. Set:
   - **Description:** "Landing page signups v1"
   - **Execute as:** **Me** (your account)
   - **Who has access:** **Anyone**
4. Click **Deploy**. Authorize the script when prompted (you'll see a "this app isn't verified" warning — that's expected for a personal Apps Script; click **Advanced → Go to ACT signups (unsafe)**).
5. Copy the **Web app URL** (ends in `/exec`).

## 4. Wire it into the landing page

1. Open `form.js` in the repo root.
2. Replace the `FORM_ENDPOINT` placeholder with the `/exec` URL you just copied:

   ```js
   const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfy.../exec";
   ```

3. Commit and push. Vercel will redeploy automatically.

## 5. Test it

1. Open the deployed site.
2. Submit a test email.
3. Confirm a row appears in the Sheet within a few seconds.
4. Submit the same email again. The form should show "You're already on the list — thanks!" and **no** new row should be added (the server treats duplicates as an idempotent success).

## Updating the script later

If you change `Code.gs`, you must redeploy:

- **Deploy → Manage deployments → (pencil icon) → Version: New version → Deploy**
- The `/exec` URL stays the same across versions, so you don't need to re-update `form.js`.

## Notes

- The form posts as `application/x-www-form-urlencoded`, which is a "simple" request — the browser doesn't send a CORS preflight, so no special CORS headers are needed in the script.
- `doGet` is intentionally minimal and never returns sheet data. Only `doPost` writes.
- `LockService` prevents concurrent submissions from colliding on `appendRow`.
