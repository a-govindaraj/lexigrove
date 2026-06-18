/**
 * Lexigrove — subscriber capture + read, backed by a Google Sheet.
 *
 * Two doors:
 *   doPost  — the website's Subscribe form writes here. WRITE-ONLY: it adds a row
 *             and returns no list data, so it's safe to expose publicly.
 *   doGet   — the daily-email GitHub Action reads here. Returns the subscriber
 *             list as JSON ONLY when the correct ?key= is supplied.
 *
 * Sheet columns (auto-created on first submit):
 *   timestamp | email | track | trackName | source
 *
 * SETUP:
 *   1. Create a blank Google Sheet.
 *   2. Extensions -> Apps Script. Delete any sample code, paste this whole file.
 *   3. Change SECRET_KEY below to a long random string of your own.
 *   4. Deploy -> New deployment -> type "Web app".
 *        Execute as: Me        Who has access: Anyone
 *      Copy the /exec Web app URL.
 *   5. Use that URL as SUBSCRIBE_ENDPOINT (the bare URL) and, for the daily
 *      email, as SUBSCRIBERS_URL with "?key=YOUR_SECRET_KEY" appended.
 */

// CHANGE THIS to your own long random string before deploying.
var SECRET_KEY = 'CHANGE_ME_TO_A_LONG_RANDOM_STRING';

var HEADERS = ['timestamp', 'email', 'track', 'trackName', 'source'];

function sheet_() {
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// --- Capture (write-only, public) ---
function doPost(e) {
  try {
    var sheet = sheet_();
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else {
      data = (e && e.parameter) || {};
    }

    var email = String(data.email || '').trim().toLowerCase();
    var track = String(data.track || '').trim();
    if (!email || email.indexOf('@') === -1) {
      return json_({ ok: false, error: 'invalid email' });
    }

    // De-dupe: don't add an email that's already on the list.
    var lastRow = sheet.getLastRow();
    var existing = [];
    if (lastRow >= 2) {
      existing = sheet
        .getRange(2, 2, lastRow - 1, 1)
        .getValues()
        .map(function (r) {
          return String(r[0]).toLowerCase();
        });
    }
    if (existing.indexOf(email) === -1) {
      sheet.appendRow([new Date(), email, track, data.trackName || '', data.source || '']);
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// --- Read (key-protected, for the daily cron) ---
function doGet(e) {
  if (!e || !e.parameter || e.parameter.key !== SECRET_KEY) {
    return json_({ ok: false, error: 'unauthorized' });
  }
  var sheet = sheet_();
  var values = sheet.getDataRange().getValues();
  values.shift(); // drop header row
  var subscribers = values
    .filter(function (r) {
      return r[1]; // has an email
    })
    .map(function (r) {
      return { email: String(r[1]), track: String(r[2]) };
    });
  return json_(subscribers);
}
