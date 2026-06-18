# Daily Email Delivery — Setup (Google Sheet)

Three parts. The code is already in place — you just create accounts and paste a
few values.

```
 [Subscribe form]  ->  [Google Sheet]  ->  [GitHub Actions cron]  ->  [Resend]
  Subscribe.jsx        Apps Script           daily-word.yml          email API
```

The Google Sheet is **private to you**. The form can only *add* rows (write-only);
reading the list back requires a secret key, so subscribers can never see each
other's details.

---

## Part 1 — Google Sheet capture (Phase 3)

1. Create a blank **Google Sheet**.
2. **Extensions → Apps Script**. Delete the sample code and paste the entire
   contents of [`google-apps-script.gs`](./google-apps-script.gs).
3. Change `SECRET_KEY` (top of the script) to a long random string. Keep it —
   you'll need it in Part 3. (Tip: generate one with `openssl rand -hex 16`.)
4. **Deploy → New deployment → Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy**, authorize, and copy the **Web app `/exec` URL**.
5. Paste that bare URL into [`src/config/integrations.js`](../src/config/integrations.js)
   as `SUBSCRIBE_ENDPOINT`, then rebuild/redeploy the site.
6. Test: submit the form at `/subscribe` — a row should appear in your Sheet.

> Note: after editing the script you must **Deploy → Manage deployments → Edit →
> New version** for changes to take effect.

## Part 2 — The subscriber URL for the cron

The same Apps Script also serves the list as JSON, but only with the key:

```
https://script.google.com/macros/s/AKfy.../exec?key=YOUR_SECRET_KEY
```

That full URL (with `?key=...`) is your `SUBSCRIBERS_URL`. Test it in a browser:
the right key returns a JSON array; a wrong/absent key returns
`{"ok":false,"error":"unauthorized"}`.

## Part 3 — Daily send (Phase 4: GitHub Actions + Resend)

1. Create a **Resend** account (https://resend.com), verify a sending domain, and
   make an API key. (A custom domain makes this nicer — e.g. `hello@yourdomain.com`.)
2. In the GitHub repo: **Settings → Secrets and variables → Actions**, add:
   - `RESEND_API_KEY` — your Resend key
   - `FROM_EMAIL` — e.g. `Lexigrove <hello@yourdomain.com>` (verified sender)
   - `SUBSCRIBERS_URL` — the `/exec?key=...` URL from Part 2
3. The workflow [`.github/workflows/daily-word.yml`](../.github/workflows/daily-word.yml)
   runs daily at 07:00 UTC. Trigger it manually first: **Actions tab → Daily Word
   Email → Run workflow**.

## Test locally (no real emails)

```bash
# Uses a sample list, prints emails instead of sending:
DRY_RUN=1 SUBSCRIBERS_URL=file:./scripts/subscribers.sample.json node scripts/sendDailyWord.js

# Or dry-run against your real Sheet:
DRY_RUN=1 SUBSCRIBERS_URL="https://script.google.com/macros/s/AKfy.../exec?key=YOUR_SECRET_KEY" node scripts/sendDailyWord.js
```

## Swapping email providers

`sendEmail()` in [`sendDailyWord.js`](./sendDailyWord.js) is the only Resend-specific
part — replace that one function to use SendGrid, Postmark, Mailgun, etc.
