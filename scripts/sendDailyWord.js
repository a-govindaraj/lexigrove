// Daily word email sender.
//
// Run by .github/workflows/daily-word.yml on a cron schedule. For each subscriber
// it works out today's word for their chosen track and emails it to them.
//
// Required environment variables (set as GitHub Actions secrets):
//   RESEND_API_KEY   API key for https://resend.com (free tier covers small lists)
//   FROM_EMAIL       Verified sender, e.g. "Lexigrove <hello@yourdomain.com>"
//   SUBSCRIBERS_URL  URL returning a JSON array of { email, track } objects
//                    (e.g. a published Google Sheet, a serverless endpoint, a gist).
//
// Optional:
//   DRY_RUN=1        Build emails and log them, but don't call the email API.
//
// Run locally:  RESEND_API_KEY=... FROM_EMAIL=... SUBSCRIBERS_URL=... node scripts/sendDailyWord.js
//        or:    DRY_RUN=1 SUBSCRIBERS_URL=file:./scripts/subscribers.sample.json node scripts/sendDailyWord.js

import { readFile } from 'node:fs/promises';
import { TRACKS } from '../src/config/tracks.js';

const capitalise = (w) => w.charAt(0).toUpperCase() + w.slice(1);

// Deterministic "word of the day" index — must match src/services/wordService.js.
const dayIndex = (length) => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((today - startOfYear) / 86400000);
  return dayOfYear % length;
};

const getWordForTrack = (track) => {
  if (!track || track.words.length === 0) return null;
  return track.words[dayIndex(track.words.length)];
};

const trackById = (id) => TRACKS.find((t) => t.id === id) || null;

// Load subscribers from a URL or a local file:// path. Each item: { email, track }.
const loadSubscribers = async (source) => {
  if (!source) throw new Error('SUBSCRIBERS_URL is not set');
  let raw;
  if (source.startsWith('file:')) {
    raw = await readFile(source.replace('file:', ''), 'utf8');
  } else {
    const res = await fetch(source);
    if (!res.ok) throw new Error(`Failed to load subscribers: ${res.status}`);
    raw = await res.text();
  }
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) throw new Error('Subscribers source must be a JSON array');
  return data.filter((s) => s && s.email && s.track);
};

const renderEmail = (track, entry) => {
  const word = capitalise(entry.word);
  const syn = (entry.synonyms || []).join(', ') || '—';
  const ant = (entry.antonyms || []).join(', ') || '—';
  const subject = `Lexigrove · ${word} — your word for today`;
  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#243027">
    <div style="background:linear-gradient(135deg,#4E9070,#1F4D38);color:#fff;padding:24px;border-radius:12px 12px 0 0">
      <div style="font-size:13px;opacity:.85;letter-spacing:.5px;text-transform:uppercase">${track.name}</div>
      <div style="font-size:34px;font-weight:700;margin-top:6px">${word}</div>
      <div style="font-style:italic;opacity:.9">${entry.partOfSpeech}</div>
    </div>
    <div style="border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px;padding:24px">
      <p style="font-size:17px;margin:0 0 16px">${entry.meaning}</p>
      <p style="margin:0 0 8px"><strong>Synonyms:</strong> ${syn}</p>
      <p style="margin:0 0 16px"><strong>Antonyms:</strong> ${ant}</p>
      <p style="font-style:italic;background:#f4f7f5;padding:14px;border-radius:8px;margin:0">“${entry.sentence}”</p>
      <p style="font-size:12px;color:#888;margin-top:24px">
        You're getting this because you subscribed to Lexigrove daily words.
      </p>
    </div>
  </div>`;
  return { subject, html };
};

const sendEmail = async ({ to, subject, html }) => {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: process.env.FROM_EMAIL, to, subject, html }),
  });
  if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
};

const main = async () => {
  const dryRun = process.env.DRY_RUN === '1';
  const subscribers = await loadSubscribers(process.env.SUBSCRIBERS_URL);
  console.log(`Loaded ${subscribers.length} subscriber(s). DRY_RUN=${dryRun ? 'yes' : 'no'}`);

  let sent = 0;
  let skipped = 0;
  for (const sub of subscribers) {
    const track = trackById(sub.track);
    const entry = getWordForTrack(track);
    if (!track || !entry) {
      console.warn(`Skipping ${sub.email}: unknown or empty track "${sub.track}"`);
      skipped += 1;
      continue;
    }
    const { subject, html } = renderEmail(track, entry);
    if (dryRun) {
      console.log(`[dry-run] -> ${sub.email}: ${subject}`);
    } else {
      await sendEmail({ to: sub.email, subject, html });
      console.log(`Sent -> ${sub.email}: ${subject}`);
    }
    sent += 1;
  }
  console.log(`Done. ${sent} prepared/sent, ${skipped} skipped.`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
